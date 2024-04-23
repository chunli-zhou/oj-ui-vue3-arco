<template>
  <a-card class="general-card h-screen problem-info">
    <a-typography>
      <a-typography-title heading="5">{{ problem.title }}</a-typography-title>
      <MdPreview :model-value="problem.content" />
    </a-typography>
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
import { OjProblemService, OjProblemVo } from '@/api/gen-api';

const problem = ref<OjProblemVo>({});

const props = defineProps({
  id: {
    type: String,
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
    OjProblemService.getInfo(props.id).then(res => {
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
  border-radius: 10px;
  margin-top: 2px;
}
</style>
