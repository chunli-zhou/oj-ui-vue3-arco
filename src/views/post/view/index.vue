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
            src="http://127.0.0.1:9005/oj-bucket/zrxzrx-123615944728158208/2024-05-14/cFdSrOdKoa-harmonyNext.jpg"
          />
          <a-image
            style="border-radius: 10px"
            description="广告"
            src="http://127.0.0.1:9005/oj-bucket/zrxzrx-123615944728158208/2024-05-14/1eS_m06Rwc-R-C.jpg"
          />
        </a-space>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { OjPostVo } from '@/api/gen-api';
import PostList from '@/views/post/view/components/post-list.vue';
import PostHotList from '@/views/post/view/components/post-hot-list.vue';

const post = ref<OjPostVo>({
  title: '这是帖子标题'
});
</script>

<style scoped lang="less">
.container-post {
  padding: 0 20px 20px;
}
</style>
