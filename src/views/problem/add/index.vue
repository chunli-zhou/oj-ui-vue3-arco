<template>
  <div class="container-u">
    <Breadcrumb :items="['题库', '题目管理', '添加题目']" />
    <a-spin style="width: 100%">
      <a-card class="general-card">
        <template #extra>
          <a-button type="primary" @click="handleSubmit">提交</a-button>
        </template>
        <template #title>添加题目</template>
        <div class="wrapper">
          <a-steps v-model:current="currentStep" line-less class="steps">
            <a-space :size="75">
              <a-step description="输入题目基本信息">基本信息</a-step>
              <a-step description="输入题目描述">题目描述</a-step>
              <a-step description="题目的标准答案">题目答案</a-step>
              <a-step description="输入判题用例">判题用例</a-step>
              <a-step description="输入判题配置">判题配置</a-step>
            </a-space>
          </a-steps>
          <a-divider style="margin: 35px" />
          <keep-alive>
            <ProblemBaseInfo
              v-if="currentStep === 0"
              v-model:data="submitModel"
              :add-flag="true"
              @change-step="changeStep"
            />
            <ProblemDesc
              v-else-if="currentStep === 1"
              v-model:data="submitModel"
              @change-step="changeStep"
            />
            <ProblemAnswer
              v-else-if="currentStep === 2"
              v-model:data="submitModel"
              @change-step="changeStep"
            />
            <ProblemJudgeCase
              v-else-if="currentStep === 3"
              v-model:data="submitModel"
              @change-step="changeStep"
            />
            <ProblemJudgeConfig
              v-else-if="currentStep === 4"
              v-model:data="submitModel"
              @change-step="changeStep"
            />
          </keep-alive>
        </div>
      </a-card>
    </a-spin>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Message } from '@arco-design/web-vue';
import ProblemBaseInfo from '@/views/problem/components/problem-base-info.vue';
import ProblemDesc from '@/views/problem/components/problem-desc.vue';
import ProblemAnswer from '@/views/problem/components/problem-answer.vue';
import ProblemJudgeCase from '@/views/problem/components/problem-judge-case.vue';
import ProblemJudgeConfig from '@/views/problem/components/problem-judge-config.vue';
import { useRouter } from 'vue-router';
import { OjProblemAddRequest, OjProblemService } from '@/api/gen-api';

const currentStep = ref(0);
const submitModel = ref({} as OjProblemAddRequest);
const router = useRouter();

const changeStep = (direction: string | number) => {
  if (typeof direction === 'number') {
    currentStep.value = direction;
    return;
  }
  if (direction === 'forward') {
    currentStep.value += 1;
  } else if (direction === 'submit') {
    handleSubmit();
    return;
  } else if (direction === 'backward') {
    currentStep.value -= 1;
  }
};

const handleSubmit = async () => {
  try {
    const response = await OjProblemService.save(submitModel.value);
    if (response) {
      Message.success('题目添加成功');
      router.push('/problem/manage').catch(() => {});
    } else {
      Message.error('题目添加失败');
    }
  } catch (error) {
    console.error('添加题目失败，详细错误:', error);
    console.error('错误响应数据:', error.response?.data);
    console.error('错误状态码:', error.response?.status);

    if (error.response?.data?.message) {
      Message.error(`添加失败: ${error.response.data.message}`);
    } else if (error.response?.data?.error) {
      Message.error(`添加失败: ${error.response.data.error}`);
    } else {
      Message.error(error?.message || '题目添加失败，请检查数据格式是否正确');
    }
  }
};
</script>

<style scoped lang="less">
.container-u {
  padding: 0 20px 20px;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  background-color: var(--color-bg-2);

  :deep(.arco-form) {
    .arco-form-item {
      &:last-child {
        margin-top: 20px;
      }
    }
  }
}

.steps {
  width: 100%;
  max-width: 800px;
}

.general-card {
  border-radius: 10px;
}
</style>
