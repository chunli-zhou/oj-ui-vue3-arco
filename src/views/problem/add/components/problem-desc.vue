<template>
  <div class="container">
    <MdEditor
      v-model="formData.content"
      toolbarsExclude="['link', 'mermaid', 'katex', 'github']"
      @onUploadImg="onUploadImg"
      @onSave="codeSave"
    ></MdEditor>
    <div style="margin-top: 20px; text-align: center">
      <a-space>
        <a-button type="secondary" @click="goPrev">上一步</a-button>
        <a-button type="primary" @click="onNextClick">下一步</a-button>
      </a-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { OjProblemAddRequest } from '@/api/gen-api';
import { MdEditor } from 'md-editor-v3';
import { Message } from '@arco-design/web-vue';

const emits = defineEmits(['changeStep']);
const formData = ref<OjProblemAddRequest>({
  content: ''
});

const goPrev = () => {
  emits('changeStep', 'backward');
};

const onNextClick = async () => {
  if (formData.value.content === '') {
    Message.warning('请输入问题描述');
    return;
  }
  emits('changeStep', 'forward', { ...formData.value });
};
</script>

<style scoped lang="less">
.form {
  width: 720px;
  padding: 0 30px;
  margin: 0 auto;
}

.form-content {
  padding: 8px 50px 0 30px;
}
</style>
