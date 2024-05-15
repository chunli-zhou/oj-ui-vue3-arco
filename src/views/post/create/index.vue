<template>
  <div class="container-create">
    <Breadcrumb :items="['帖子', '发帖']" />
    <create-post />
  </div>
</template>

<script setup lang="ts">
import CreatePost from '@/views/post/create/components/create-post.vue';
</script>

<style scoped lang="less">
.container-create {
  padding: 0 20px 20px;
}
</style>
