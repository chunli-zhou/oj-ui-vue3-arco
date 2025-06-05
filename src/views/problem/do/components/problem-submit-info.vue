<template>
  <a-card class="general-card h-screen problem-info">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" title="题目详情">
        <a-scrollbar
          v-if="problem.content !== ''"
          style="height: 80vh; overflow: auto"
        >
          <a-typography>
            <a-typography-title heading="5">
              {{ problem.title }}
            </a-typography-title>
            <MdPreview :model-value="problem.content" />
          </a-typography>
        </a-scrollbar>
        <a-skeleton v-if="problem.content === ''" animation :loading="true">
          <a-space direction="vertical" :style="{ width: '100%' }" size="large">
            <a-skeleton-line
              :rows="10"
              :widths="[800, 800, 800, 800, 800, 800, 800, 800, 800, 500]"
            />
          </a-space>
        </a-skeleton>
      </a-tab-pane>
      <a-tab-pane key="2" title="讨论">
        <a-scrollbar style="height: 80vh; overflow: auto">
          <problem-comment :problem-id="props.problemId" />
        </a-scrollbar>
      </a-tab-pane>
    </a-tabs>

    <a-card-meta>
      <template #title>
        <a-space size="mini">
          <span v-for="(tag, index) in problem.tags" :key="index" class="tags">
            <a-tag class="tag">{{ tag }}</a-tag>
          </span>
        </a-space>
      </template>
      <template #description>
        <a-space size="mini">
          <a-tag class="tag" :color="getDifficultyColor(problem.difficulty)">
            {{ getDifficulty(problem.difficulty) }}
          </a-tag>
        </a-space>
      </template>
    </a-card-meta>
  </a-card>
</template>

<script setup lang="ts">
import { MdPreview } from 'md-editor-v3';
import { nextTick, onMounted, ref } from 'vue';
import { OjProblemService } from '@/api/gen-api';
import ProblemComment from '@/views/problem/components/problem-comment.vue';
import type { ResultOjProblemNewSubmitVo } from '@/api/gen-api/models/problem/ResultOjProblemNewSubmitVo.ts';

const problem = ref<ResultOjProblemNewSubmitVo>({
  content: ''
});

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  problemId: {
    type: Number,
    required: true
  }
});

const getDifficulty = (difficulty: number) => {
  if (difficulty === 0) {
    return '简单';
  } else if (difficulty === 1) {
    return '中等';
  } else {
    return '困难';
  }
};

const getDifficultyColor = (difficulty: number) => {
  if (difficulty === 0) {
    return 'green';
  } else if (difficulty === 1) {
    return 'orange';
  } else {
    return 'red';
  }
};

onMounted(() => {
  nextTick(() => {
    OjProblemService.getInfoBySubmitId(props.id).then(res => {
      problem.value = res.result;
    });
  });
});
</script>

<style scoped lang="less">
.general-card {
  border-radius: 10px;
}

.tag {
  margin-top: 2px;
  border-radius: 10px;
}
</style>
