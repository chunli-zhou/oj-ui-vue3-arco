<template>
  <a-result
    v-if="props.comments.length === 0"
    status="404"
    subtitle="还木有评论哦~ 点击评论输入本题第一条评论"
  />
  <a-comment
    v-for="(comment, index) in props.comments"
    :key="index"
    :author="comment.authorName"
    :avatar="comment.authorAvatar"
    :content="comment.content"
    :datetime="comment.createTime"
  >
    <template #actions>
      <a-popover :popup-visible="comment.replyFlag" trigger="click">
        <template #content>
          <MdEditor
            v-model="recoverComment.content"
            placeholder="支持 Markdown"
            style="width: 250px; height: 200px"
            :preview="false"
            :toolbars="['preview', 'pageFullscreen', 'uploadImg']"
            @onUploadImg="onUploadImg"
          />
          <a-row class="pt-1.5">
            <a-col :flex="1" />
            <a-col :span="5.5">
              <a-button
                type="primary"
                style="text-align: right"
                @click="doRecoverComment(comment)"
              >
                提交
              </a-button>
            </a-col>
          </a-row>
        </template>
        <span class="action" @click="handleRecoverComment(comment)">
          <IconMessage />
          回复
        </span>
      </a-popover>
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
import {
  ProblemCommentControllerService,
  ProblemCommentRequest,
  ProblemCommentVo
} from '@/api/gen-api';
import { PropType, ref } from 'vue';
import { IconMessage } from '@arco-design/web-vue/es/icon';
import { MdEditor } from 'md-editor-v3';
import { Message } from '@arco-design/web-vue';

const props = defineProps({
  comments: {
    type: Array as PropType<ProblemCommentVo[]>,
    default: () => []
  }
});

const recoverComment = ref<ProblemCommentRequest>({
  content: '',
  problemId: null,
  parentId: null
});

const handleRecoverComment = (comment: ProblemCommentVo) => {
  recoverComment.value.parentId = comment.id;
  recoverComment.value.problemId = comment.problemId;
};

/**
 * 提交回复
 */
const doRecoverComment = (comment: ProblemCommentVo) => {
  ProblemCommentControllerService.save(recoverComment.value).then(res => {
    if (res.result) {
      recoverComment.value.content = '';
      Message.success('回复成功');
      comment.replyFlag = false;
      ProblemCommentControllerService.list(comment.problemId).then(res => {
        comment.children = res.result;
      });
    }
  });
};
</script>

<style scoped lang="less">
.action {
  display: inline-block;
  padding: 0 4px;
  line-height: 24px;
  color: var(--color-text-1);
  cursor: pointer;
  background: transparent;
  border-radius: 2px;
  transition: all 0.1s ease;
}

.action:hover {
  background: var(--color-fill-3);
}
</style>
