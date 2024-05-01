<template>
  <a-card :bordered="false" class="comment-container">
    <Comment :comments="commentList" />
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
      <MdEditor
        v-model="commentContent"
        placeholder="支持 Markdown"
        style="height: 250px"
        :preview="false"
        :toolbars="['preview', 'pageFullscreen', 'uploadImg']"
        @onUploadImg="onUploadImg"
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
import {
  ProblemCommentControllerService,
  type ProblemCommentVo
} from '@/api/gen-api';
import { nextTick, onMounted, ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import { IconMessage } from '@arco-design/web-vue/es/icon';
import { Message } from '@arco-design/web-vue';

const commentVisible = ref(false);
const commentContent = ref('');
const props = defineProps({
  problemId: {
    type: Number,
    default: null
  }
});

const submitComment = () => {
  ProblemCommentControllerService.save({
    content: commentContent.value,
    problemId: props.problemId
  }).then(res => {
    if (res.result) {
      Message.success('评论成功');
      commentVisible.value = false;
      commentContent.value = '';
      getRootComment();
    }
  });
};

const commentList = ref<ProblemCommentVo[]>([]);
onMounted(() => {
  nextTick(() => {
    getRootComment();
  });
});

/**
 * 获取根节点评论
 */
const getRootComment = () => {
  ProblemCommentControllerService.list(props.problemId).then(res => {
    commentList.value = res.result;
  });
};
</script>

<style scoped lang="less"></style>
