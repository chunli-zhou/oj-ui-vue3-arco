<template>
  <a-list
    class="content-list"
    :virtualListProps="{
      height: 560
    }"
    :data="list"
  >
    <template #item="{ item, index }">
      <a-list-item class="content-list-item" :key="index">
        <a-list-item-meta :title="item.title" :description="item.description">
          <template #avatar>
            <a-avatar shape="square">A</a-avatar>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const list = reactive(
  Array(10000)
    .fill(null)
    .map((_, index) => {
      const prefix = `0000${index}`.slice(-5);
      return {
        title: 'Beijing Bytedance Technology Co., Ltd.',
        description: `(${prefix}) Beijing ByteDance Technology Co., Ltd. is an enterprise located in China.`
      };
    })
);
</script>

<style scoped lang="less">
.content-list {
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
