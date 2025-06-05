<template>
  <a-card class="general-card-do h-full" title="Just Do It">
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
            v-model="ansLanguage"
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
    <template #actions>
      <a-button
        ref="submitButton"
        class="submit-button"
        :loading="submitButtonLoading"
        type="primary"
        @click="handleSubmit"
      >
        提交
        <template #icon>
          <icon-thunderbolt />
        </template>
      </a-button>
    </template>
    <a-spin :loading="loading">
      <CodeEditor
        v-if="editorReady"
        :key="editorKey"
        v-model:value="answer"
        class="code-editor"
        :theme="theme"
        :language="ansLanguage"
        @handle-change="handleChange"
      />
    </a-spin>
  </a-card>
</template>

<script setup lang="ts">
import { nextTick, ref, onMounted } from 'vue';
import { OjProblemService } from '@/api/gen-api';
import { ProblemSubmitAddRequest } from '@/api/gen-api';

const answer = ref(''); /*用户输入的代码*/
const ansLanguage = ref('java'); /*用户选择的语言*/
const theme = ref('vs-light'); /*用户选择的主题*/

const loading = ref(false);
const editorReady = ref(false);
const editorKey = ref(0);
/**
 * 值发生改变
 */
const handleChange = (ans: string) => {
  answer.value = ans;
};
const submitButtonLoading = ref(false);
const emits = defineEmits(['submit']);
const props = defineProps({
  questionId: {
    type: Number,
    default: 0
  },
  // 新增 submitId 属性用于回显
  submitId: {
    type: Number,
    default: null
  }
});

const req = ref<ProblemSubmitAddRequest>({
  code: '',
  language: '',
  questionId: null
});
const handleSubmit = () => {
  submitButtonLoading.value = true;
  setTimeout(() => {
    // 设置提交判题
    req.value.code = answer.value;
    req.value.language = ansLanguage.value;
    req.value.questionId = props.questionId;
    emits('submit', 'submit', req);
    submitButtonLoading.value = false;
  }, 1000);
};

onMounted(() => {
  nextTick(async () => {
    loading.value = true;
    try {
      if (props.submitId) {
        const res = await OjProblemService.getInfoBySubmitId(props.submitId);
        answer.value = res.result?.code || '';
        ansLanguage.value = res.result?.language || 'java';
      }
      editorReady.value = true;
      editorKey.value++;
    } finally {
      loading.value = false;
    }
  });
});
</script>

<style scoped lang="less">
.general-card-do {
  overflow: hidden;
  border-radius: 10px;
}

/* 为 .code-editor 添加样式以适应 .general-card 的高度 */
.code-editor {
  position: absolute;
  inset: 45px 0 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.submit-button {
  color: white;
  background: linear-gradient(to right, #ff6424, rgb(227 45 173 / 89%));
  border: none;
  border-radius: 4px;
}

.submit-button:active {
  background: linear-gradient(to right, #9a3c15, rgb(154 30 121 / 89%));
  transition: 1s;
}
</style>
