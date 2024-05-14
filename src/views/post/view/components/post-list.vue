<template>
  <a-row :gutter="10">
    <a-col :span="4">
      <tab-list />
    </a-col>
    <a-col :flex="1">
      <content-list />
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import TabList from '@/views/post/view/components/tab-list.vue';
import ContentList from '@/views/post/view/components/content-list.vue';
</script>

<style scoped lang="less"></style>
