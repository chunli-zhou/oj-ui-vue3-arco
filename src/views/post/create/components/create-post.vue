<template>
  <a-drawer
    :width="380"
    :visible="visible"
    title="基础信息"
    @cancel="handleCloseDrawer"
  >
    <template #footer>
      <a-button type="primary" @click="handleCloseDrawer">确定</a-button>
    </template>
    <a-form ref="formRef" :model="post">
      <a-form-item
        field="title"
        label="标题"
        style="width: 20vw"
        :rules="[
          {
            required: true,
            message: '请输入标题'
          }
        ]"
      >
        <a-input v-model="post.title" placeholder="请输入标题" size="large" />
      </a-form-item>
      <a-form-item
        field="zone"
        label="分区"
        style="width: 20vw"
        :rules="[
          {
            required: true
          }
        ]"
      >
        <a-select
          v-model="post.zone"
          placeholder="请选择分区"
          allow-clear
          :options="zoneOptions"
        ></a-select>
      </a-form-item>
      <a-form-item
        field="tags"
        label="标签"
        style="width: 20vw"
        :rules="[
          {
            required: true
          }
        ]"
      >
        <a-input-tag
          v-model="post.tags"
          allow-clear
          placeholder="请输入标签并回车"
        />
      </a-form-item>
    </a-form>
  </a-drawer>
  <div class="base-info-button">
    <a-space>
      <a-popconfirm content="确定要发布吗？" @ok="handleSubmit">
        <a-button type="primary">
          <template #icon>
            <icon-share-internal />
          </template>
          发布
        </a-button>
      </a-popconfirm>
      <a-button type="primary" @click="handleOpenDrawer">基础信息</a-button>
    </a-space>
  </div>
  <MdEditor
    v-model="post.content"
    placeholder="请输入内容（支持 Markdown）"
    :preview="false"
    :auto-detect-code="true"
    @onUploadImg="onUploadImg"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { OjPostAddRequest } from '@/api/gen-api';
import { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
import { MdEditor } from 'md-editor-v3';
import { OjPostService } from '@/api/gen-api/services/OjPostService.ts';
import { Message } from '@arco-design/web-vue';

const formRef = ref();
const zoneOptions = ref<SelectOptionData[]>([
  {
    label: '综合',
    value: 'synthesis'
  },
  {
    label: '前端',
    value: 'frontend'
  },
  {
    label: '后端',
    value: 'backend'
  },
  {
    label: '鸿蒙',
    value: 'harmony'
  },
  {
    label: 'AIGC',
    value: 'aigc'
  }
]);
const post = ref<OjPostAddRequest>({
  title: '',
  content: '',
  tags: [],
  zone: ''
});
const visible = ref(true);
const handleOpenDrawer = () => {
  visible.value = true;
};
const handleCloseDrawer = () => {
  visible.value = false;
};
const handleSubmit = () => {
  OjPostService.save(post.value).then(res => {
    if (res.result) {
      Message.success('发布成功');
    }
  });
};
</script>

<style scoped lang="less">
.base-info-button {
  /*右对齐*/
  text-align: right;
  margin-bottom: 10px;
}
</style>
