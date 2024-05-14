<template>
  <a-list class="tab-list">
    <a-list-item
      v-for="(item, index) in items"
      :key="index"
      class="tab-list-item"
      @click="handleItemClick(item.value)"
    >
      <a-space size="medium">
        <component :is="item.icon" />
        {{ item.text }}
      </a-space>
    </a-list-item>
  </a-list>
</template>

<script setup lang="ts">
import {
  IconBook,
  IconCode,
  IconCodeSquare,
  IconFire,
  IconRecord
} from '@arco-design/web-vue/es/icon';
import { ref } from 'vue';

const items = ref([
  { value: 'synthesis', icon: IconBook, text: '综合' },
  { value: 'frontend', icon: IconCode, text: '前端' },
  { value: 'backend', icon: IconCodeSquare, text: '后端' },
  { value: 'harmony', icon: IconRecord, text: 'Harmony OS' },
  { value: 'aigc', icon: IconFire, text: 'AIGC' }
]);

const emits = defineEmits(['tabValueChange']);

const handleItemClick = (value: string) => {
  emits('tabValueChange', value);
};
</script>

<style scoped lang="less">
.tab-list {
  background-color: #ffffff;
  border-radius: 10px;

  &-item {
    transition: background-color 0.5s;
  }

  &-item:hover {
    cursor: pointer;
    transition: background-color 0.3s;
    background-color: #f5f5f5;
    color: #333;
  }
}
</style>
