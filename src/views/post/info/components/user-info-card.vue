<template>
  <a-card>
    <a-space size="medium">
      <a-avatar
        trigger-type="mask"
        :image-url="post.avatar"
        @click="handleToUserInfo"
      >
        <template #trigger-icon>
          <icon-user />
        </template>
      </a-avatar>
      <a-space direction="vertical">
        <a-typography-title bold style="font-size: 17px">
          {{ post.creatorName }}
        </a-typography-title>
        <a-typography-paragraph
          type="secondary"
          style="width: 100px; font-size: 13px"
          :ellipsis="{
            rows: 1,
            showTooltip: {
              type: 'tooltip',
              props: {
                position: 'bottom'
              }
            }
          }"
        >
          {{ post.introduce }}
        </a-typography-paragraph>
      </a-space>
    </a-space>
  </a-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { OjPostVo } from '@/api/gen-api';
import { useRouter } from 'vue-router';

const props = defineProps<{
  postInfo: OjPostVo;
}>();

const post = ref<OjPostVo>({
  avatar: '',
  creatorName: '',
  introduce: ''
});

const router = useRouter();
const handleToUserInfo = () => {
  router.push({
    name: 'UserInfo',
    query: {
      id: post.value.creator
    }
  });
};

watch(
  () => props.postInfo,
  () => {
    if (props.postInfo) {
      post.value = {
        ...props.postInfo,
        avatar: props.postInfo.avatar.replace(/^\/api/, '') // 移除开头的 `/api`
      };
    }
  },
  {
    deep: true
  }
);
</script>

<style scoped lang="less"></style>
