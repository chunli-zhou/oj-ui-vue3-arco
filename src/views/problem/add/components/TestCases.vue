<template>
  <div class="test-cases">
    <div class="section-title">
      <h3>判题用例</h3>
      <p class="subtitle">添加判题用例</p>
    </div>

    <div class="cases-container">
      <div v-for="(case_, index) in localForm" :key="index" class="case-item">
        <div class="case-header">
          <span class="case-title">判题用例-{{ index }}</span>
          <a-button
            v-if="localForm.length > 1"
            type="text"
            status="danger"
            @click="removeCase(index)"
          >
            删除
          </a-button>
        </div>

        <div class="case-content">
          <a-form-item label="输入数据">
            <a-textarea
              :model-value="case_.input"
              :auto-size="{ minRows: 3, maxRows: 6 }"
              placeholder="请输入输入数据"
              @update:model-value="val => updateCase(index, 'input', val)"
            />
          </a-form-item>

          <a-form-item label="答案">
            <a-textarea
              :model-value="case_.output"
              :auto-size="{ minRows: 3, maxRows: 6 }"
              placeholder="请输入答案"
              @update:model-value="val => updateCase(index, 'output', val)"
            />
          </a-form-item>
        </div>
      </div>
    </div>

    <div class="add-case">
      <a-button type="outline" @click="addCase">
        <template #icon>
          <icon-plus />
        </template>
        添加判题用例
      </a-button>
    </div>

    <div class="form-actions">
      <a-button @click="handlePrev">上一步</a-button>
      <a-button type="primary" @click="handleNext">下一步</a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue';
import { IconPlus } from '@arco-design/web-vue/es/icon';

const props = defineProps<{
  form: Array<{
    input: string;
    output: string;
  }>;
}>();

const emit = defineEmits(['update:form', 'prev', 'next']);

const localForm = reactive([...props.form]);

watch(
  () => props.form,
  newVal => {
    localForm.length = 0;
    localForm.push(...newVal);
  },
  { deep: true }
);

const updateCase = (index: number, key: 'input' | 'output', value: string) => {
  localForm[index][key] = value;
  emit('update:form', [...localForm]);
};

const addCase = () => {
  localForm.push({ input: '', output: '' });
  emit('update:form', [...localForm]);
};

const removeCase = (index: number) => {
  localForm.splice(index, 1);
  emit('update:form', [...localForm]);
};

const handlePrev = () => {
  emit('prev');
};

const handleNext = () => {
  emit('next');
};
</script>

<style scoped>
.test-cases {
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

.cases-container {
  margin-bottom: 24px;
}

.case-item {
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid #e5e6eb;
  border-radius: 4px;
}

.case-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.case-title {
  font-size: 16px;
  font-weight: 500;
}

.case-content {
  display: grid;
  gap: 16px;
}

.add-case {
  margin-bottom: 32px;
}

.form-actions {
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  margin-top: 32px;
  text-align: right;
}
</style>
