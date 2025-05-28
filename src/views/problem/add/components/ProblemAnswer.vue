<template>
  <div class="problem-answer">
    <div class="section-title">
      <h3>题目答案</h3>
      <p class="subtitle">请输入题目答案</p>
    </div>

    <div class="editor-header">
      <div class="theme-selector">
        <span class="label">选择主题：</span>
        <a-select
          :model-value="localForm.theme"
          style="width: 120px"
          @update:model-value="val => updateForm('theme', val)"
        >
          <a-option value="Dark">Dark</a-option>
          <a-option value="Light">Light</a-option>
        </a-select>
      </div>

      <div class="language-selector">
        <span class="label">选择语言：</span>
        <a-select
          :model-value="localForm.language"
          style="width: 120px"
          @update:model-value="val => updateForm('language', val)"
        >
          <a-option value="java">Java</a-option>
          <a-option value="cpp">C++</a-option>
          <a-option value="python">Python</a-option>
        </a-select>
      </div>
    </div>

    <div class="editor-container">
      <a-textarea
        :model-value="localForm.code"
        :auto-size="{ minRows: 15, maxRows: 30 }"
        class="code-editor"
        @update:model-value="val => updateForm('code', val)"
      />
    </div>

    <div class="form-actions">
      <a-button @click="handlePrev">上一步</a-button>
      <a-button type="primary" @click="handleNext">下一步</a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue';

const props = defineProps<{
  form: {
    theme: string;
    language: string;
    code: string;
  };
}>();

const emit = defineEmits(['update:form', 'prev', 'next']);

const localForm = reactive({ ...props.form });

watch(
  () => props.form,
  newVal => {
    Object.assign(localForm, newVal);
  },
  { deep: true }
);

const updateForm = (key: keyof typeof localForm, value: any) => {
  localForm[key] = value;
  emit('update:form', { ...localForm });
};

const handlePrev = () => {
  emit('prev');
};

const handleNext = () => {
  emit('next');
};
</script>

<style scoped>
.problem-answer {
  max-width: 800px;
  margin: 0 auto;
}

.section-title {
  margin-bottom: 24px;
}

.section-title h3 {
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 500;
}

.subtitle {
  font-size: 14px;
  color: #86909c;
}

.editor-header {
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
}

.theme-selector,
.language-selector {
  display: flex;
  gap: 8px;
  align-items: center;
}

.label {
  color: #4e5969;
}

.editor-container {
  margin-bottom: 24px;
}

.code-editor {
  padding: 16px;
  font-family: 'Fira Code', monospace;
  color: #fff;
  background-color: #1d1d1d;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  margin-top: 32px;
  text-align: right;
}
</style>
