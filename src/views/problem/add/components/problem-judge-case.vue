<template>
  <a-form :model="form" :style="{ width: '600px' }">
    <a-form-item
      v-for="(judgeCase, index) of form.judgeCases"
      :key="index"
      :field="`judgeCases[${index}]`"
      :label="`判题用例-${index}`"
    >
      <a-space>
        <a-textarea
          v-model="judgeCase.input"
          auto-size
          placeholder="请输入输入用例"
        />
        <a-textarea
          v-model="judgeCase.output"
          auto-size
          placeholder="请输入输出用例"
        />
      </a-space>
      <a-button
        status="danger"
        :style="{ marginLeft: '10px' }"
        @click="handleDelete(index)"
      >
        删除
      </a-button>
    </a-form-item>
  </a-form>
  <div>
    <a-button @click="handleAdd">添加判题用例</a-button>
  </div>

  <div style="margin-top: 20px; text-align: center">
    <a-space>
      <a-button type="secondary" @click="goPrev">上一步</a-button>
      <a-button type="primary" @click="onNextClick">下一步</a-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue';
import { onMounted, reactive, ref } from 'vue';
import { JudgeCase, OjProblemAddRequest } from '@/api/gen-api';

const emits = defineEmits(['changeStep']);

const form = reactive({
  judgeCases: [] as Array<JudgeCase>
});
const handleAdd = () => {
  form.judgeCases.push({
    input: '',
    output: ''
  });
};
const handleDelete = (index: number) => {
  form.judgeCases.splice(index, 1);
};

const formData = ref<OjProblemAddRequest>({
  judgeCase: []
});

const goPrev = () => {
  emits('changeStep', 'backward');
};

const onNextClick = async () => {
  if (form.judgeCases.length === 0) {
    Message.warning('请输入至少一个判题用例');
    return;
  }
  formData.value.judgeCase = form.judgeCases;
  if (
    formData.value.judgeCase[0].input === '' ||
    formData.value.judgeCase[0].output === ''
  ) {
    Message.warning('请输入【输入/输出】');
    return;
  }
  emits('changeStep', 'forward', { ...formData.value });
};

onMounted(() => {
  handleAdd();
});
</script>

<style scoped lang="less"></style>
