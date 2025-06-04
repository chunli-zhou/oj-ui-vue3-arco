<template>
  <div class="basic-info">
    <div class="section-title">
      <h3>基本信息</h3>
      <p class="subtitle">输入题目基本信息</p>
    </div>

    <a-form :model="localForm" layout="vertical">
      <a-form-item field="title" label="题目标题">
        <a-input
          :model-value="localForm.title"
          placeholder="请输入标题"
          @update:model-value="val => updateForm('title', val)"
        />
      </a-form-item>

      <a-form-item field="tags" label="题目标签">
        <a-input-tag
          :model-value="localForm.tags"
          placeholder="请输入标签并点击回车"
          allow-clear
          @update:model-value="val => updateForm('tags', val)"
        />
      </a-form-item>

      <!-- 难度选择 -->
      <a-form-item
        field="difficulty"
        label="题目难度"
        validate-trigger="blur"
        :rules="[{ required: true, message: '请选择题目难度' }]"
      >
        <a-select
          :model-value="localForm.difficulty"
          placeholder="请选择难度"
          @update:model-value="val => updateForm('difficulty', val)"
        >
          <a-option value="0">简单</a-option>
          <a-option value="1">中等</a-option>
          <a-option value="2">困难</a-option>
        </a-select>
      </a-form-item>

      <div class="form-actions">
        <a-button type="primary" @click="handleNext">下一步</a-button>
      </div>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue';

const props = defineProps<{
  form: {
    title: string;
    tags: string[];
    difficulty: string;
  };
}>();

const emit = defineEmits(['update:form', 'next']);

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

const handleNext = () => {
  emit('update:form', { ...localForm });
  emit('next');
};
</script>

<style scoped>
.basic-info {
  max-width: 600px;
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

:deep(.arco-form-item) {
  margin-bottom: 24px;
}

:deep(.arco-input-wrapper) {
  border-radius: 4px;
}

:deep(.arco-input-tag) {
  border-radius: 4px;
}

:deep(.arco-select) {
  border-radius: 4px;
}

.form-actions {
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
