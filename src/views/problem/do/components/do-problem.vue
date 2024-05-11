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
    <CodeEditor
      v-model:value="answer"
      class="code-editor"
      :theme="theme"
      :language="ansLanguage"
      @handle-change="handleChange"
    />
  </a-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ProblemSubmitAddRequest } from '@/api/gen-api';

const answer = ref('');
const ansLanguage = ref('java');
const theme = ref('vs-light');

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
</script>

<style scoped lang="less">
.general-card-do {
  border-radius: 10px;
  overflow: hidden;
}

/* 为 .code-editor 添加样式以适应 .general-card 的高度 */
.code-editor {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: absolute;
  top: 45px;
  bottom: 0;
  left: 0;
  right: 0;
}

.submit-button {
  background: linear-gradient(to right, #ff6424, rgba(227, 45, 173, 0.89));
  border-radius: 4px;
  border: none;
  color: white;
}

.submit-button:active {
  transition: 1s;
  background: linear-gradient(to right, #9a3c15, rgba(154, 30, 121, 0.89));
}
</style>
