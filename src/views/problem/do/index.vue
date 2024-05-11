<template>
  <div class="container-do">
    <Breadcrumb :items="['题库', '做题']" />
    <a-split>
      <template #resize-trigger>
        <div class="trigger-vertical">
          <div class="trigger-vertical-line" />
        </div>
      </template>
      <template #first>
        <problem-info :id="problemId" />
      </template>
      <template #second>
        <div>
          <a-split class="h-screen" direction="vertical">
            <template #resize-trigger>
              <div class="trigger-horizontal">
                <div class="trigger-horizontal-line" />
              </div>
            </template>
            <template #first>
              <do-problem :question-id="problemId" @submit="handleSubmitCode" />
            </template>
            <template #second>
              <judge-status
                :flag="flag"
                :req="req"
                @submit-error="handleSubmitError"
              />
            </template>
          </a-split>
        </div>
      </template>
    </a-split>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import ProblemInfo from '@/views/problem/do/components/problem-info.vue';
import DoProblem from '@/views/problem/do/components/do-problem.vue';
import JudgeStatus from '@/views/problem/do/components/judge-status.vue';
import { ProblemSubmitAddRequest } from '@/api/gen-api';

const problemId = ref();

const route = useRoute();
onMounted(() => {
  problemId.value = route.query.id;
});

const flag = ref('');
const req = ref<ProblemSubmitAddRequest>();
const handleSubmitCode = (param: string, obj: ProblemSubmitAddRequest) => {
  flag.value = param;
  req.value = obj;
};
const handleSubmitError = () => {
  flag.value = '';
};
</script>

<style lang="less" scoped>
.container-do {
  padding: 0 20px 20px 20px;
}

.general-card {
  border-radius: 10px;
}

.trigger-vertical {
  display: flex;
  position: relative;
  width: 3px;
  height: 100vh;
  flex-direction: column;

  &-line {
    flex: 1;
  }

  &-line:hover {
    background-color: rgb(var(--arcoblue-6));
  }
}

.trigger-horizontal {
  display: flex;
  position: relative;
  width: 100%;
  height: 3px;
  background-color: var(--color-bg-2);

  &-line {
    flex: 1;
  }

  &-line:hover {
    background-color: rgb(var(--arcoblue-6));
  }
}
</style>
