<template>
  <a-affix :offset-top="200">
    <a-space direction="vertical" size="large">
      <a-badge
        :max-count="999"
        :count="post.thumbNum"
        :dotStyle="{ background: '#E5E6EB', color: '#86909C' }"
      >
        <a-button
          v-if="!hasThumb"
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
        :count="post.favourNum"
        :dotStyle="{ background: '#E5E6EB', color: '#86909C' }"
      >
        <a-button
          v-if="!hasFavour"
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
        :max-count="999"
        :count="post.favourNum"
        :dotStyle="{ background: '#E5E6EB', color: '#86909C' }"
      >
        <a-button class="affix-button" shape="circle">
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
import { ref, watch } from 'vue';
import { OjThumbPostService } from '@/api/gen-api/services/OjThumbPostService.ts';
import { OjFavourPostService } from '@/api/gen-api/services/OjFavourPostService.ts';
import { Message } from '@arco-design/web-vue';

const props = defineProps<{
  postInfo: OjPostVo;
}>();

const post = ref<OjPostVo>({
  thumbNum: 0,
  favourNum: 0
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

const hasThumb = ref(false);
const handleThumb = () => {
  OjThumbPostService.thumb(post.value.id).then(res => {
    if (res.result) {
      hasThumb.value = true;
      post.value.thumbNum++;
    }
  });
};
const handleCancelThumb = () => {
  OjThumbPostService.cancel(post.value.id).then(res => {
    if (res.result) {
      hasThumb.value = false;
      post.value.thumbNum--;
    }
  });
};

const hasFavour = ref(false);
const handleFavour = () => {
  OjFavourPostService.favour(post.value.id).then(res => {
    if (res.result) {
      Message.success('收藏成功');
      hasFavour.value = true;
      post.value.favourNum++;
    }
  });
};
const handleCancelFavour = () => {
  OjFavourPostService.cancel(post.value.id).then(res => {
    if (res.result) {
      Message.success('取消收藏');
      hasFavour.value = false;
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
