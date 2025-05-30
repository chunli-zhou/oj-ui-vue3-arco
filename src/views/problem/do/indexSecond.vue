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
        <problem-info :id="SubmitId" :problemId="problemId" />
      </template>
      <template #second>
        <div>
          <a-split class="h-screen" direction="vertical">
            <!--            <template #resize-trigger>
              <div class="trigger-horizontal">
                <div class="trigger-horizontal-line" />
              </div>
            </template>-->
            <template #first>
              <do-problem
                :question-id="problemId"
                :submit-id="SubmitId"
                @submit="handleSubmitCode"
              />
            </template>
            <template #second>
              <judge-status
                :flag="flag"
                :req="req"
                :submit-id="SubmitId"
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
import ProblemInfo from '@/views/problem/do/components/problem-submit-info.vue';
import DoProblem from '@/views/problem/do/components/do-problem.vue';
import JudgeStatus from '@/views/problem/do/components/judge-status.vue';
import { ProblemSubmitAddRequest } from '@/api/gen-api';

const SubmitId = ref();
const problemId = ref();

const route = useRoute();
onMounted(() => {
  SubmitId.value = route.query.id;
  problemId.value = route.query.problemId;
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
  padding: 0 20px 20px;
}

.general-card {
  border-radius: 10px;
}

.trigger-vertical {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 3px;
  height: 100vh;

  &-line {
    flex: 1;
  }

  &-line:hover {
    background-color: rgb(var(--arcoblue-6));
  }
}

.trigger-horizontal {
  position: relative;
  display: flex;
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
