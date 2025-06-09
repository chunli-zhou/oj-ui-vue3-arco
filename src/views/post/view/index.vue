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
          <a
            href="http://localhost:8996/problem/do?id=282011102005497856"
            rel="noopener noreferrer"
          >
            <a-image
              style="width: 300px; border-radius: 10px"
              description="广告"
              src="/1.png"
              :preview="false"
            />
          </a>
          <!--          <a-image-->
          <!--            style="border-radius: 10px; width: 200px; height: 150px"-->
          <!--            description="广告"-->
          <!--            src="/1.jpg"-->
          <!--          />-->
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
