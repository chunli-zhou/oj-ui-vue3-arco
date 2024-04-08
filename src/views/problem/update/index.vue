<template>
  <div class="container">
    <Breadcrumb :items="['题库', '题目管理', '编辑题目']" />
    <a-spin style="width: 100%">
      <a-card class="general-card">
        <template #extra>
          <a-button type="primary" @click="handleSubmit">提交</a-button>
        </template>
        <template #title>编辑题目</template>
        <div class="wrapper">
          <a-steps v-model:current="step" line-less class="steps">
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
              v-if="step === 1"
              v-model:data="submitModel"
              @change-step="changeStep"
            />
            <ProblemDesc
              v-else-if="step === 2"
              v-model:data="submitModel"
              @change-step="changeStep"
            />
            <ProblemAnswer
              v-else-if="step === 3"
              v-model:data="submitModel"
              @change-step="changeStep"
            />
            <ProblemJudgeCase
              v-else-if="step === 4"
              v-model:data="submitModel"
              @change-step="changeStep"
            />
            <ProblemJudgeConfig
              v-else-if="step === 5"
              v-model:data="submitModel"
              @change-step="changeStep"
            />
          </keep-alive>
        </div>
      </a-card>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import ProblemJudgeConfig from '@/views/problem/components/problem-judge-config.vue';
import ProblemBaseInfo from '@/views/problem/components/problem-base-info.vue';
import ProblemDesc from '@/views/problem/components/problem-desc.vue';
import ProblemAnswer from '@/views/problem/components/problem-answer.vue';
import ProblemJudgeCase from '@/views/problem/components/problem-judge-case.vue';
import {
  OjProblemAddRequest,
  OjProblemService,
  OjProblemUpdateRequest
} from '@/api/gen-api';
import { Message } from '@arco-design/web-vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const step = ref(1);
const submitModel = ref({} as OjProblemAddRequest);
const route = useRoute();
const id = route.query.id as string;
const router = useRouter();

const changeStep = (direction: string | number, model: OjProblemAddRequest) => {
  if (typeof direction === 'number') {
    step.value = direction;
    return;
  }

  if (direction === 'forward' || direction === 'submit') {
    submitModel.value = {
      ...submitModel.value,
      ...model
    };
    if (direction === 'submit') {
      handleSubmit();
      return;
    }
    step.value += 1;
  } else if (direction === 'backward') {
    step.value -= 1;
  }
};

const handleSubmit = () => {
  const updateModel: OjProblemUpdateRequest = {
    id: id,
    ...submitModel.value
  };
  OjProblemService.update(updateModel).then(() => {
    Message.success('修改成功');
    setTimeout(() => {}, 500);
    router.push({ name: 'Manage' });
  });
};

onMounted(() => {
  OjProblemService.getInfo(id).then(res => {
    const { thumbNum, favourNum, submitNum, acceptedNum, ...result } =
      res.result;
    submitModel.value = { ...result };
  });
});
</script>

<style scoped lang="less">
.container {
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
</style>
