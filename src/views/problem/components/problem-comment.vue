<template>
  <a-card :bordered="false" class="comment-container">
    <Comment :comments="commentList" />
    <template #actions>
      <a-tooltip v-if="!commentVisible" content="参与评论">
        <span v-if="!commentVisible" @click="commentVisible = !commentVisible">
          <IconMessage />
          评论
        </span>
      </a-tooltip>
    </template>
    <div v-if="commentVisible" class="md-editor-container">
      <MdEditor
        v-model="comment"
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

const commentVisible = ref(false);
const comment = ref('');
const props = defineProps({
  problemId: {
    type: Number,
    default: null
  }
});

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
