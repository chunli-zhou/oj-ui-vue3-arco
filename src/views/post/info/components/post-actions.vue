<template>
  <a-drawer
    v-model:visible="visible"
    :width="500"
    unmountOnClose
    :footer="false"
  >
    <template #title>评论区</template>
    <post-comment />
  </a-drawer>
  <a-affix :offset-top="200">
    <a-space direction="vertical" size="large">
      <a-badge
        :max-count="999"
        :offset="[-35, 0]"
        :count="post.thumbNum"
        :dotStyle="{ background: '#E5E6EB', color: '#86909C' }"
      >
        <a-button
          v-if="!post.thumbFlag"
          class="affix-button"
          shape="circle"
          @click="handleThumb"
        >
          <icon-thumb-up />
        </a-button>
        <a-button
          v-else
          class="affix-button-thumb"
          shape="circle"
          @click="handleCancelThumb"
        >
          <icon-thumb-up-fill />
        </a-button>
      </a-badge>
      <a-badge
        :max-count="999"
        :offset="[-35, 0]"
        :count="post.favourNum"
        :dotStyle="{ background: '#E5E6EB', color: '#86909C' }"
      >
        <a-button
          v-if="!post.favourFlag"
          class="affix-button"
          shape="circle"
          @click="handleFavour"
        >
          <icon-star />
        </a-button>
        <a-button
          v-else
          class="affix-button-favour"
          shape="circle"
          @click="handleCancelFavour"
        >
          <icon-star-fill />
        </a-button>
      </a-badge>
      <a-badge
        :offset="[-35, 0]"
        :max-count="999"
        :count="commentNum"
        :dotStyle="{ background: '#E5E6EB', color: '#86909C' }"
      >
        <a-button class="affix-button" shape="circle" @click="visible = true">
          <icon-message />
        </a-button>
      </a-badge>
      <a-button class="affix-button" shape="circle">
        <icon-reply />
      </a-button>
      <a-button class="affix-button" shape="circle">
        <icon-exclamation-circle-fill />
      </a-button>
    </a-space>
  </a-affix>
</template>

<script setup lang="ts">
import { OjPostVo } from '@/api/gen-api';
import { onMounted, ref, watch } from 'vue';
import { OjThumbPostService } from '@/api/gen-api/services/OjThumbPostService.ts';
import { OjFavourPostService } from '@/api/gen-api/services/OjFavourPostService.ts';
import { Message } from '@arco-design/web-vue';
import PostComment from '@/views/post/info/components/post-comment.vue';
import { OjPostCommentService } from '@/api/gen-api/services/OjPostCommentService.ts';
import { useRoute } from 'vue-router';

const visible = ref(false);

const props = defineProps<{
  postInfo: OjPostVo;
}>();

const post = ref<OjPostVo>({
  thumbNum: 0,
  favourNum: 0,
  thumbFlag: false,
  favourFlag: false
});
watch(
  () => props.postInfo,
  () => {
    post.value = props.postInfo;
  },
  {
    deep: true
  }
);
const commentNum = ref<number>(0);
onMounted(() => {
  const postId = useRoute().query.postId as string;
  OjPostCommentService.getNum(postId).then(res => {
    commentNum.value = res.result;
  });
});

const handleThumb = () => {
  OjThumbPostService.thumb(post.value.id).then(res => {
    if (res.result) {
      post.value.thumbFlag = true;
      post.value.thumbNum++;
    }
  });
};
const handleCancelThumb = () => {
  OjThumbPostService.cancel(post.value.id).then(res => {
    if (res.result) {
      post.value.thumbFlag = false;
      post.value.thumbNum--;
    }
  });
};

const handleFavour = () => {
  OjFavourPostService.favour(post.value.id).then(res => {
    if (res.result) {
      Message.success('收藏成功');
      post.value.favourFlag = true;
      post.value.favourNum++;
    }
  });
};
const handleCancelFavour = () => {
  OjFavourPostService.cancel(post.value.id).then(res => {
    if (res.result) {
      Message.success('取消收藏');
      post.value.favourFlag = false;
      post.value.favourNum--;
    }
  });
};
</script>

<style scoped lang="less">
.affix-button {
  background-color: white;
  width: 50px;
  height: 50px;
  font-size: 20px;

  &-thumb {
    color: #165dff;
    background-color: white;
    width: 50px;
    height: 50px;
    font-size: 20px;
  }

  &-favour {
    color: #ffb800;
    background-color: white;
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
}
</style>
