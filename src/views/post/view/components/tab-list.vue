<template>
  <a-list class="tab-list">
    <a-list-item class="tab-list-item">
      <a-space size="medium">
        <icon-book />
        综合
      </a-space>
    </a-list-item>
    <a-list-item class="tab-list-item">
      <a-space size="medium">
        <icon-code />
        前端
      </a-space>
    </a-list-item>
    <a-list-item class="tab-list-item">
      <a-space size="medium">
        <icon-code-square />
        后端
      </a-space>
    </a-list-item>
    <a-list-item class="tab-list-item">
      <a-space size="medium">
        <icon-record />
        Harmony OS
      </a-space>
    </a-list-item>
    <a-list-item class="tab-list-item">
      <a-space size="medium">
        <icon-fire />
        AIGC
      </a-space>
    </a-list-item>
  </a-list>
</template>

<script setup lang="ts"></script>

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
