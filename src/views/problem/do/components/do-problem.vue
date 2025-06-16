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
import { nextTick, ref, watch, onMounted } from 'vue';
import { OjProblemService } from '@/api/gen-api';
import { ProblemSubmitAddRequest } from '@/api/gen-api';

const ansLanguage = ref('java'); /*用户选择的语言*/
const answer = ref(''); /*用户输入的代码*/
const theme = ref('vs-light'); /*用户选择的主题*/
const loading = ref(false);
const editorReady = ref(false);
const editorKey = ref(0);

watch(ansLanguage, (newVal: string) => {
  getTemplate(newVal);
  editorKey.value++; // 强制重新渲染编辑器
});
const getTemplate = (ansLanguage: string) => {
  if (ansLanguage === 'java') {
    answer.value =
      'import java.util.Scanner;\n' +
      '// 1:无需package\n' +
      '// 2: 类名必须Main, 不可修改\n' +
      '\n' +
      'public class Main {\n' +
      '    public static void main(String[] args) {\n' +
      '        Scanner scan = new Scanner(System.in);\n' +
      '        //在此输入您的代码...\n' +
      '        scan.close();\n' +
      '    }\n' +
      '}';
  } else if (ansLanguage === 'python') {
    answer.value =
      'import os\n' + 'import sys\n' + '\n' + '# 请在此输入您的代码';
  } else if (ansLanguage === 'c') {
    answer.value =
      '#include <stdio.h>\n' +
      '#include <stdlib.h>\n' +
      '\n' +
      'int main(int argc, char *argv[])\n' +
      '{\n' +
      '  // 请在此输入您的代码\n' +
      '  return 0;\n' +
      '}';
  } else if (ansLanguage == 'cpp') {
    answer.value =
      '#include <bits/stdc++.h> \n' +
      'using namespace std;\n' +
      '\n' +
      'int main() {\n' +
      '    ios::sync_with_stdio(false);\n' +
      '    cin.tie(nullptr);\n' +
      '    \n' +
      '    // 解题代码写在这里\n' +
      '    \n' +
      '    return 0;\n' +
      '}';
  }
};

/**
 * 值发生改变
 */
const handleChange = (ans: string) => {
  answer.value = ans;
};
const submitButtonLoading = ref(false);
const emits = defineEmits(['submit', 'reset-submit']);
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
  if (submitButtonLoading.value) return; // 如果正在提交，直接返回
  submitButtonLoading.value = true;
  // 设置提交判题
  req.value = {
    code: answer.value,
    language: ansLanguage.value,
    questionId: props.questionId
  };
  emits('submit', 'submit', req);
};

// 添加重置提交状态的方法
const resetSubmitStatus = () => {
  submitButtonLoading.value = false;
};

// 暴露方法给父组件
defineExpose({
  resetSubmitStatus
});

// 监听父组件发送的重置事件
const handleReset = () => {
  resetSubmitStatus();
};

// 监听判题完成事件
const handleJudgeFinish = () => {
  resetSubmitStatus();
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
  getTemplate(ansLanguage.value);
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
