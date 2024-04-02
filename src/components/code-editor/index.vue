<template>
  <div
    id="code-editor"
    ref="codeEditorRef"
    class="code-editor"
    style="height: 60vh; min-height: 400px"
  />
</template>

<script setup lang="ts">
import * as monaco from 'monaco-editor';
import { onMounted, ref, toRaw, withDefaults, defineProps, watch } from 'vue';

/**
 * 定义组件属性类型
 */
interface Props {
  language?: string;
  theme?: string;
  handleChange: (v: string) => void;
}

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  language: () => 'java',
  theme: () => 'vs-dark',
  handleChange: (v: string) => {
    console.log(v);
  }
});

const emits = defineEmits(['handleChange']);

const codeEditorRef = ref();
const codeEditor = ref();

watch(
  () => props.language,
  () => {
    if (codeEditor.value) {
      monaco.editor.setModelLanguage(
        toRaw(codeEditor.value).getModel(),
        props.language
      );
    }
  }
);

watch(
  () => props.theme,
  () => {
    if (codeEditor.value) {
      monaco.editor.setTheme(props.theme);
    }
  }
);

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: '',
    language: props.language,
    automaticLayout: true,
    colorDecorators: true,
    minimap: {
      enabled: true
    },
    readOnly: false,
    theme: props.theme
    // lineNumbers: "off",
    // roundedSelection: false,
    // scrollBeyondLastLine: false,
  });

  // 编辑 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    emits('handleChange', toRaw(codeEditor.value).getValue());
  });
});
</script>

<style scoped>
.code-editor {
  min-width: 60vw;
  min-height: 50vh;
  border-radius: 10px;
}
</style>
