<template>
  <a-comment
    v-for="(comment, index) in props.comments"
    :key="index"
    :author="comment.authorName"
    :avatar="comment.authorAvatar"
    :content="comment.content"
    :datetime="comment.createTime"
  >
    <template #actions>
      <span class="action">
        <IconMessage />
        回复
      </span>
      <a-link
        v-if="!comment.expandedFlag && comment.children"
        class="action"
        @click="comment.expandedFlag = !comment.expandedFlag"
      >
        <IconDown />
        展开
      </a-link>
      <span
        v-if="comment.expandedFlag"
        class="action"
        @click="comment.expandedFlag = !comment.expandedFlag"
      >
        <IconUp />
        收起
      </span>
    </template>
    <Comment v-if="comment.expandedFlag" :comments="comment.children" />
  </a-comment>
</template>

<script setup lang="ts">
import { ProblemCommentVo } from '@/api/gen-api';
import { PropType } from 'vue';
import { IconMessage } from '@arco-design/web-vue/es/icon';

const props = defineProps({
  comments: {
    type: Array as PropType<ProblemCommentVo[]>,
    default: () => []
  }
});

// const commentList = ref<ProblemCommentVo[]>();

// onMounted(() => {
//   nextTick(() => {
//     commentList.value = props.comments;
//   })
// })
</script>

<style scoped lang="less">
.action {
  display: inline-block;
  padding: 0 4px;
  color: var(--color-text-1);
  line-height: 24px;
  background: transparent;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.1s ease;
}

.action:hover {
  background: var(--color-fill-3);
}
</style>
