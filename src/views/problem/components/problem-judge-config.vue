<template>
  <div class="flex items-center">
    <a-spin :loading="loading">
      <a-form
        ref="formRef"
        :model="formData.judgeConfig"
        class="form"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 18 }"
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
        <div style="text-align: center">
          <a-space>
            <a-button type="secondary" @click="goPrev">上一步</a-button>
            <a-button type="primary" @click="onSubmit">提交</a-button>
          </a-space>
        </div>
      </a-form>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { OjProblemAddRequest, OjProblemVo } from '@/api/gen-api';

const formRef = ref();
const emits = defineEmits(['changeStep', 'update:data']);
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

const props = defineProps<{
  data?: OjProblemVo;
}>();

const loading = ref(true);

watch(
  () => formData.value,
  () => {
    if (props.data) {
      emits('update:data', { ...props.data, ...formData.value });
    }
  },
  { deep: true }
);

onMounted(() => {
  if (props.data && props.data.judgeConfig) {
    const form = formData.value;
    const { judgeConfig } = props.data;
    judgeConfig.stackLimit = Number(judgeConfig.stackLimit);
    judgeConfig.timeLimit = Number(judgeConfig.timeLimit);
    judgeConfig.memoryLimit = Number(judgeConfig.memoryLimit);
    form.judgeConfig = judgeConfig;
  }
  loading.value = false;
});
</script>

<style scoped lang="less">
.form {
  width: 467px;
}
</style>
