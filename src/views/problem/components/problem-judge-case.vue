<template>
  <div class="flex items-center">
    <a-spin :loading="loading">
      <a-form :model="formData" :style="{ width: '600px' }">
        <a-form-item
          v-for="(judgeCase, index) of formData.judgeCase"
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
      <div style="text-align: center">
        <a-button @click="handleAdd">添加判题用例</a-button>
      </div>

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
import { Message } from '@arco-design/web-vue';
import { onMounted, ref, unref, watch } from 'vue';
import {
  type JudgeCase,
  OjProblemAddRequest,
  OjProblemVo
} from '@/api/gen-api';

const emits = defineEmits(['changeStep', 'update:data']);
const formData = ref<OjProblemAddRequest>({
  judgeCase: [] as Array<JudgeCase>
});

const handleAdd = () => {
  formData.value.judgeCase.push({
    input: '',
    output: ''
  });
};
const handleDelete = (index: number) => {
  formData.value.judgeCase.splice(index, 1);
};

const goPrev = () => {
  emits('changeStep', 'backward');
};

const onNextClick = async () => {
  if (formData.value.judgeCase.length === 0) {
    Message.warning('请输入至少一个判题用例');
    return;
  }
  if (
    formData.value.judgeCase[0].input === '' ||
    formData.value.judgeCase[0].output === ''
  ) {
    Message.warning('请输入【输入/输出】');
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
      emits('update:data', { ...props.data, ...formData.value });
    }
  },
  { deep: true }
);

onMounted(() => {
  const { judgeCase } = props.data;
  if (props.data && judgeCase) {
    const form = unref(formData);
    const { judgeCase } = props.data;
    form.judgeCase = judgeCase;
  } else {
    handleAdd();
  }
  loading.value = false;
});
</script>

<style scoped lang="less"></style>
