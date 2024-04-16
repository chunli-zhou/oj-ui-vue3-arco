<template>
  <div class="container">
    <a-spin :loading="loading">
      <a-card class="card" title="请输入题目答案">
        <template #extra>
          <a-space>
            <span>
              <a-typography-text>选择主题：</a-typography-text>
              <a-select
                v-model="theme"
                style="width: 100px"
                placeholder="请选择主题"
              >
                <a-option value="vs-dark">Dark</a-option>
                <a-option value="vs-light">Light</a-option>
              </a-select>
            </span>
            <span>
              <a-typography-text>选择语言：</a-typography-text>
              <a-select
                v-model="formData.ansLanguage"
                style="width: 120px"
                placeholder="请选择语言"
              >
                <a-option value="java">Java</a-option>
                <a-option value="python">Python</a-option>
                <a-option value="cpp">Cpp</a-option>
                <a-option value="c">C</a-option>
              </a-select>
            </span>
          </a-space>
        </template>
        <CodeEditor
          v-model:value="formData.answer"
          :theme="theme"
          :language="formData.ansLanguage"
          @handle-change="handleChange"
        />
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
import { onMounted, ref, unref, watch } from 'vue';
import { Message } from '@arco-design/web-vue';
import { OjProblemAddRequest, OjProblemVo } from '@/api/gen-api';

const emits = defineEmits(['changeStep', 'update:data']);

const formData = ref<OjProblemAddRequest>({
  ansLanguage: 'java',
  answer: ''
});

const theme = ref('vs-dark');

const goPrev = () => {
  emits('changeStep', 'backward');
};

/**
 * 值发生改变
 */
const handleChange = (ans: string) => {
  formData.value.answer = ans;
};

const onNextClick = async () => {
  if (formData.value.answer === '') {
    Message.warning('请输入题目答案');
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
      const data = props.data;
      emits('update:data', { ...data, ...formData.value });
    }
  },
  { deep: true }
);

onMounted(() => {
  if (props.data) {
    const form = unref(formData);
    const { ansLanguage, answer } = props.data;
    form.ansLanguage = ansLanguage;
    form.answer = answer;
  }
  loading.value = false;
});
</script>

<style scoped lang="less">
:deep(.card) {
  background-color: #f7f8fa;
  border-radius: 5px;
}
</style>
