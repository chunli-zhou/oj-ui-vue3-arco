<template>
  <div class="container">
    <a-spin :loading="loading">
      <a-card class="card" title="请输入题目描述">
        <MdEditor
          v-model="formData.content"
          toolbarsExclude="['link', 'mermaid', 'katex', 'github']"
          @onUploadImg="onUploadImg"
          @onSave="codeSave"
        ></MdEditor>
      </a-card>
      <div style="margin-top: 20px; text-align: center">
        <a-space>
          <a-button type="secondary" @click="goPrev">上一步</a-button>
          <a-button type="primary" @click="onNextClick">下一步</a-button>
        </a-space>
      </div>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, unref, watch } from 'vue';
import { OjProblemAddRequest, OjProblemVo } from '@/api/gen-api';
import { MdEditor } from 'md-editor-v3';
import { Message } from '@arco-design/web-vue';

const emits = defineEmits(['changeStep', 'update:data']);
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

const props = defineProps<{
  data?: OjProblemVo;
}>();

const loading = ref(true);

watch(
  () => formData.value,
  () => {
    if (props.data) {
      emits('update:data', { ...formData.value });
    }
  }
);

onMounted(() => {
  if (props.data) {
    const form = unref(formData);
    const { content } = props.data;
    form.content = content;
  }
  loading.value = false;
});
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

:deep(.card) {
  background-color: #f7f8fa;
  border-radius: 5px;
}
</style>
