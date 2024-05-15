<template>
  <a-card>
    <a-space size="medium">
      <a-avatar :image-url="post.avatar" />
      <a-space direction="vertical">
        <a-typography-title bold style="font-size: 17px">
          {{ post.creatorName }}
        </a-typography-title>
        <a-typography-paragraph
          type="secondary"
          style="font-size: 13px; width: 100px"
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

const props = defineProps<{
  postInfo: OjPostVo;
}>();

const post = ref<OjPostVo>({
  avatar: '',
  creatorName: '',
  introduce: ''
});

watch(
  () => props.postInfo,
  () => {
    if (props.postInfo) {
      post.value = props.postInfo;
    }
  },
  {
    deep: true
  }
);
</script>

<style scoped lang="less"></style>
