<template>
  <a-card :bordered="false" class="comment-container">
    <inner-post-comment v-if="!loading" :comments="commentList" />
    <a-skeleton v-if="loading" animation>
      <a-space direction="vertical" :style="{ width: '100%' }" size="large">
        <a-skeleton-shape />
        <a-skeleton-line :rows="3" :widths="['40%', '100%', '100%']" />
      </a-space>
    </a-skeleton>
    <template #actions>
      <a-button
        v-if="!commentVisible"
        type="primary"
        shape="round"
        @click="commentVisible = !commentVisible"
      >
        <template #icon>
          <IconMessage />
        </template>
        评论
      </a-button>
    </template>
    <div v-if="commentVisible" class="md-editor-container">
      <a-textarea
        v-model="commentContent"
        placeholder="有好交流哦~"
        style="height: 100px"
      />
      <a-row class="pt-1.5">
        <a-col :flex="1" />
        <a-col :span="5.5">
          <a-space>
            <a-button @click="commentVisible = !commentVisible">取消</a-button>
            <a-button
              type="primary"
              style="text-align: right"
              @click="submitComment"
            >
              提交
            </a-button>
          </a-space>
        </a-col>
      </a-row>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { IconMessage } from '@arco-design/web-vue/es/icon';
import { Message } from '@arco-design/web-vue';
import { OjPostCommentService } from '@/api/gen-api/services/OjPostCommentService.ts';
import InnerPostComment from '@/views/post/info/components/inner-post-comment.vue';
import { useRoute } from 'vue-router';
import { PostCommentVo } from '@/api/gen-api/models/post/PostCommentVo.ts';

const commentVisible = ref(false);
const commentContent = ref('');
const postId = useRoute().query.postId as string;
const submitComment = () => {
  OjPostCommentService.save({
    content: commentContent.value,
    postId: postId
  }).then(res => {
    if (res.result) {
      Message.success('评论成功');
      commentVisible.value = false;
      commentContent.value = '';
      getRootComment();
    }
  });
};

const commentList = ref<PostCommentVo[]>([]);
onMounted(() => {
  nextTick(() => {
    getRootComment();
  });
});

const loading = ref(false);

/**
 * 获取根节点评论
 */
const getRootComment = () => {
  loading.value = true;
  OjPostCommentService.list(postId)
    .then(res => {
      commentList.value = res.result;
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<style scoped lang="less"></style>
