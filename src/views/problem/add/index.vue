<template>
  <div class="container">
    <Breadcrumb :items="['题库', '题目管理', '添加题目']" />
    <a-spin style="width: 100%">
      <a-card class="general-card">
        <template #title>添加题目</template>
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
            <ProblemBaseInfo v-if="step === 1" @change-step="changeStep" />
            <ProblemDesc v-else-if="step === 2" @change-step="changeStep" />
            <ProblemAnswer v-else-if="step === 3" @change-step="changeStep" />
            <ProblemJudgeCase
              v-else-if="step === 4"
              @change-step="changeStep"
            />
            <ProblemJudgeConfig
              v-else-if="step === 5"
              @change-step="changeStep"
            />
          </keep-alive>
        </div>
      </a-card>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ProblemBaseInfo from '@/views/problem/add/components/problem-base-info.vue';
import { OjProblemAddRequest, OjProblemService } from '@/api/gen-api';
import ProblemDesc from '@/views/problem/add/components/problem-desc.vue';
import ProblemAnswer from '@/views/problem/add/components/problem-answer.vue';
import ProblemJudgeCase from '@/views/problem/add/components/problem-judge-case.vue';
import ProblemJudgeConfig from '@/views/problem/add/components/problem-judge-config.vue';
import { Message } from '@arco-design/web-vue';
import { useRouter } from 'vue-router';

const step = ref(1);
const submitModel = ref<OjProblemAddRequest>({} as OjProblemAddRequest);
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
      OjProblemService.save(submitModel.value).then(() => {
        Message.success('添加成功');
        router.push({ name: 'Manage' });
      });
      return;
    }
    step.value += 1;
  } else if (direction === 'backward') {
    step.value -= 1;
  }
};
</script>

<script lang="ts">
export default {
  name: 'ProblemAdd'
};
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
