<template>
  <a-form
    ref="formRef"
    :model="formData.judgeConfig"
    :style="{ width: '600px' }"
  >
    <a-form-item
      field="timeLimit"
      label="时间限制(ms)"
      :rules="[
        {
          required: true,
          message: '请输入时间限制'
        }
      ]"
    >
      <a-input-number
        v-model="formData.judgeConfig.timeLimit"
        :style="{ width: '250px' }"
        placeholder="请输入时间限制"
        mode="button"
        size="large"
      />
    </a-form-item>
    <a-form-item
      field="memoryLimit"
      label="空间限制(mb)"
      :rules="[
        {
          required: true,
          message: '请输入时间限制'
        }
      ]"
    >
      <a-input-number
        v-model="formData.judgeConfig.memoryLimit"
        :style="{ width: '250px' }"
        placeholder="请输入空间限制"
        mode="button"
        size="large"
        :rules="[
          {
            required: true,
            message: '请输入空间限制'
          }
        ]"
      />
    </a-form-item>
    <a-form-item
      field="stackLimit"
      label="栈限制(mb)"
      :rules="[
        {
          required: true,
          message: '请输入时间限制'
        }
      ]"
    >
      <a-input-number
        v-model="formData.judgeConfig.stackLimit"
        :style="{ width: '250px' }"
        placeholder="请输入栈限制"
        mode="button"
        size="large"
        :rules="[
          {
            required: true,
            message: '请输入栈限制'
          }
        ]"
      />
    </a-form-item>
    <a-form-item>
      <div style="margin-top: 20px; text-align: center">
        <a-space>
          <a-button type="secondary" @click="goPrev">上一步</a-button>
          <a-button type="primary" @click="onSubmit">提交</a-button>
        </a-space>
      </div>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { JudgeConfig, OjProblemAddRequest } from '@/api/gen-api';

const form = reactive({
  judgeConfig: {} as JudgeConfig
});

const formRef = ref();
const emits = defineEmits(['changeStep']);
const formData = ref<OjProblemAddRequest>({
  judgeConfig: {}
});

const goPrev = () => {
  emits('changeStep', 'backward');
};

const onSubmit = async () => {
  const res = await formRef.value?.validate();
  if (!res) {
    emits('changeStep', 'submit', { ...formData.value });
  }
};
</script>

<style scoped lang="less"></style>
