<template>
  <div class="container">
    <a-spin :loading="loading" tip="加载中...">
      <a-form
        ref="formRef"
        :model="formData"
        class="form"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 18 }"
      >
        <a-form-item
          field="title"
          label="题目标题"
          :rules="[
            {
              required: true,
              message: '请填写标题'
            }
          ]"
        >
          <a-input v-model="formData.title" placeholder="请输入标题" />
        </a-form-item>
        <a-form-item
          field="tags"
          label="题目标签"
          :rules="[
            {
              required: true,
              message: '请输入标签'
            }
          ]"
        >
          <a-input-tag
            v-model="formData.tags"
            placeholder="输入标签并点击回车"
          />
        </a-form-item>
        <a-form-item
          field="difficulty"
          label="题目难度"
          :rules="[
            {
              required: true,
              message: '请选择题目难度'
            }
          ]"
        >
          <a-select
            v-model="formData.difficulty"
            :options="contentTypeOptions"
          />
        </a-form-item>
        <div style="text-align: center">
          <a-button type="primary" @click="onNextClick">下一步</a-button>
        </div>
      </a-form>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, unref, watch } from 'vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { OjProblemAddRequest, OjProblemVo } from '@/api/gen-api';
import { SelectOptionData } from '@arco-design/web-vue/es/select/interface';

const emits = defineEmits(['changeStep', 'update:data']);
const formRef = ref<FormInstance>();
const formData = ref<OjProblemAddRequest>({
  title: '',
  tags: [],
  difficulty: 0
});
const contentTypeOptions: SelectOptionData[] = [
  {
    label: '简单',
    value: 0
  },
  {
    label: '中等',
    value: 1
  },
  {
    label: '困难',
    value: 2
  }
];

const onNextClick = async () => {
  const res = await formRef.value?.validate();
  if (!res) {
    emits('changeStep', 'forward', { ...formData.value });
  }
};

const props = defineProps<{
  data?: OjProblemVo;
}>();

const loading = ref(true);
watch(
  () => props.data,
  () => {
    nextTick(() => {
      if (props.data) {
        const form = unref(formData);
        const { title, tags, difficulty } = props.data;
        form.title = title;
        form.tags = tags;
        form.difficulty = difficulty;
      }
      loading.value = false;
    });
  }
);

watch(
  () => formData.value,
  () => {
    if (props.data) {
      emits('update:data', { ...formData.value });
    }
  }
);

onMounted(() => {
  if (!props.data) {
    loading.value = false;
  }
});
</script>

<style scoped lang="less">
.form {
  width: 457px;
}

.form-content {
  padding: 8px 50px 0 30px;
}
</style>
