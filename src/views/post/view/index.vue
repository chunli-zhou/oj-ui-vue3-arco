<template>
  <div class="container-post">
    <Breadcrumb :items="['帖子', '首页']" />
    <a-row :gutter="10">
      <a-col :flex="1">
        <post-list />
      </a-col>
      <a-col :span="5">
        <a-space direction="vertical" fill>
          <post-hot-list />
          <a-image
            style="border-radius: 10px"
            description="广告"
            src="../cFdSrOdKoa-harmonyNext.jpg"
          />
          <a-image
            style="border-radius: 10px"
            description="广告"
            src="../1eS_m06Rwc-R-C.jpg"
          />
        </a-space>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import PostList from '@/views/post/view/components/post-list.vue';
import PostHotList from '@/views/post/view/components/post-hot-list.vue';
</script>

<style scoped lang="less">
.container-post {
  padding: 0 20px 20px;
}
</style>
