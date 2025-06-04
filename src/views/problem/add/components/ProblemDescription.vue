<template>
  <div class="problem-description">
    <div class="section-title">
      <h3>题目描述</h3>
      <p class="subtitle">请输入题目描述</p>
    </div>

    <div class="editor-container">
      <a-textarea
        :model-value="form"
        placeholder="请输入题目描述"
        :auto-size="{ minRows: 10, maxRows: 20 }"
        @update:model-value="val => emit('update:form', val)"
      />
    </div>

    <div class="preview-container">
      <div class="preview-title">预览</div>
      <div class="markdown-preview" v-html="renderedMarkdown"></div>
    </div>

    <div class="form-actions">
      <a-button @click="handlePrev">上一步</a-button>
      <a-button type="primary" @click="handleNext">下一步</a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import MarkdownIt from 'markdown-it';

const props = defineProps<{
  form: string;
}>();

const emit = defineEmits(['update:form', 'prev', 'next']);

const md = new MarkdownIt();

const renderedMarkdown = computed(() => {
  return md.render(props.form || '');
});

const handlePrev = () => {
  emit('prev');
};

const handleNext = () => {
  emit('next');
};
</script>

<style scoped>
.problem-description {
  max-width: 800px;
  padding: 24px;
  margin: 0 auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgb(0 0 0 / 8%);
}

.section-title {
  margin-bottom: 32px;
  text-align: center;
}

.section-title h3 {
  margin-bottom: 12px;
  font-size: 24px;
  font-weight: 600;
  color: #1d2129;
}

.subtitle {
  font-size: 14px;
  color: #86909c;
}

.editor-container {
  margin-bottom: 32px;
}

:deep(.arco-textarea) {
  font-size: 14px;
  line-height: 1.6;
  border-radius: 4px;
}

.preview-container {
  padding: 24px;
  margin-bottom: 32px;
  background: #f7f8fa;
  border: 1px solid #e5e6eb;
  border-radius: 8px;
}

.preview-title {
  padding-bottom: 12px;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 500;
  color: #1d2129;
  border-bottom: 1px solid #e5e6eb;
}

.markdown-preview {
  min-height: 200px;
  line-height: 1.6;
  color: #1d2129;
}

.markdown-preview :deep(h1),
.markdown-preview :deep(h2),
.markdown-preview :deep(h3),
.markdown-preview :deep(h4) {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  color: #1d2129;
}

.markdown-preview :deep(p) {
  margin-bottom: 16px;
}

.markdown-preview :deep(code) {
  padding: 2px 6px;
  font-family: 'Fira Code', monospace;
  background: #f2f3f5;
  border-radius: 4px;
}

.markdown-preview :deep(pre) {
  padding: 16px;
  overflow-x: auto;
  color: #fff;
  background: #1d1d1d;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  margin-top: 40px;
  text-align: right;
}

:deep(.arco-btn) {
  height: 40px;
  padding: 0 24px;
  font-size: 16px;
  border-radius: 4px;
}
</style>
