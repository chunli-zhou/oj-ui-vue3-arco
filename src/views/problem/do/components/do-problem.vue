<template>
  <a-card class="general-card h-full" title="Just Do It">
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

const answer = ref('');
const ansLanguage = ref('java');
const theme = ref('vs-light');

/**
 * 值发生改变
 */
const handleChange = (ans: string) => {
  answer.value = ans;
};
</script>

<style scoped lang="less">
.general-card {
  border-radius: 10px;
  overflow: hidden;
}

/* 为 .code-editor 添加样式以适应 .general-card 的高度 */
.code-editor {
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
  position: absolute; /* 使 CodeEditor 脱离文档流，以便适应父容器 */
  top: 45px; /* 与 .general-card 顶部对齐 */
  bottom: 0; /* 与 .general-card 底部对齐 */
  left: 0; /* 与 .general-card 左侧对齐 */
  right: 0; /* 与 .general-card 右侧对齐 */
}
</style>
