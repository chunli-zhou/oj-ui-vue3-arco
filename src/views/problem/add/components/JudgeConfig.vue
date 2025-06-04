<template>
  <div class="judge-config">
    <div class="section-title">
      <h3>判题配置</h3>
      <p class="subtitle">配置判题参数</p>
    </div>

    <div class="config-container">
      <div class="config-item">
        <span class="label">时间限制（ms）</span>
        <div class="input-group">
          <a-button
            type="outline"
            :disabled="localForm.timeLimit <= 100"
            @click="decreaseTimeLimit"
          >
            <template #icon>
              <icon-minus />
            </template>
          </a-button>
          <a-input-number
            :model-value="localForm.timeLimit"
            :min="100"
            :max="10000"
            :step="100"
            placeholder="请输入时间限制"
            @update:model-value="val => updateForm('timeLimit', val)"
          />
          <a-button
            type="outline"
            :disabled="localForm.timeLimit >= 10000"
            @click="increaseTimeLimit"
          >
            <template #icon>
              <icon-plus />
            </template>
          </a-button>
        </div>
      </div>

      <div class="config-item">
        <span class="label">空间限制（MB）</span>
        <div class="input-group">
          <a-button
            type="outline"
            :disabled="localForm.memoryLimit <= 32"
            @click="decreaseMemoryLimit"
          >
            <template #icon>
              <icon-minus />
            </template>
          </a-button>
          <a-input-number
            :model-value="localForm.memoryLimit"
            :min="32"
            :max="1024"
            :step="32"
            placeholder="请输入空间限制"
            @update:model-value="val => updateForm('memoryLimit', val)"
          />
          <a-button
            type="outline"
            :disabled="localForm.memoryLimit >= 1024"
            @click="increaseMemoryLimit"
          >
            <template #icon>
              <icon-plus />
            </template>
          </a-button>
        </div>
      </div>

      <div class="config-item">
        <span class="label">栈限制（MB）</span>
        <div class="input-group">
          <a-button
            type="outline"
            :disabled="localForm.stackLimit <= 32"
            @click="decreaseStackLimit"
          >
            <template #icon>
              <icon-minus />
            </template>
          </a-button>
          <a-input-number
            :model-value="localForm.stackLimit"
            :min="32"
            :max="1024"
            :step="32"
            placeholder="请输入栈限制"
            @update:model-value="val => updateForm('stackLimit', val)"
          />
          <a-button
            type="outline"
            :disabled="localForm.stackLimit >= 1024"
            @click="increaseStackLimit"
          >
            <template #icon>
              <icon-plus />
            </template>
          </a-button>
        </div>
      </div>
    </div>

    <div class="form-actions">
      <a-button @click="handlePrev">上一步</a-button>
      <a-button type="primary" @click="handleSubmit">提交</a-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue';
import { IconPlus, IconMinus } from '@arco-design/web-vue/es/icon';

const props = defineProps<{
  form: {
    timeLimit: number;
    memoryLimit: number;
    stackLimit: number;
  };
}>();

const emit = defineEmits(['update:form', 'prev', 'submit']);

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

const decreaseTimeLimit = () => {
  if (localForm.timeLimit > 100) {
    updateForm('timeLimit', localForm.timeLimit - 100);
  }
};

const increaseTimeLimit = () => {
  if (localForm.timeLimit < 10000) {
    updateForm('timeLimit', localForm.timeLimit + 100);
  }
};

const decreaseMemoryLimit = () => {
  if (localForm.memoryLimit > 32) {
    updateForm('memoryLimit', localForm.memoryLimit - 32);
  }
};

const increaseMemoryLimit = () => {
  if (localForm.memoryLimit < 1024) {
    updateForm('memoryLimit', localForm.memoryLimit + 32);
  }
};

const decreaseStackLimit = () => {
  if (localForm.stackLimit > 32) {
    updateForm('stackLimit', localForm.stackLimit - 32);
  }
};

const increaseStackLimit = () => {
  if (localForm.stackLimit < 1024) {
    updateForm('stackLimit', localForm.stackLimit + 32);
  }
};

const handlePrev = () => {
  emit('prev');
};

const handleSubmit = () => {
  emit('submit');
};
</script>

<style scoped>
/* 样式部分保持不变 */
</style>
