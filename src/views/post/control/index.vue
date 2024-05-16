<template>
  <div class="container-post">
    <Breadcrumb :items="['帖子', '帖子管理']" />
    <a-card>
      <post-table />
    </a-card>
  </div>
</template>

<script setup lang="ts">
import PostTable from '@/views/post/control/components/post-table.vue';
</script>

<style scoped lang="less">
.container-post {
  padding: 0 20px 20px;
}
</style>
