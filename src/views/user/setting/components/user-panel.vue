<template>
  <a-card :bordered="false">
    <a-space :size="54">
      <a-upload
        list-type="picture-card"
        :file-list="fileList"
        :show-file-list="false"
        @progress="upload"
      >
        <template #upload-button>
          <a-avatar trigger-type="mask" :size="100" class="info-avatar">
            <img v-if="fileList.length" :src="fileList[0].url" />
            <template #trigger-icon>
              <a-space>
                <icon-edit />
              </a-space>
            </template>
          </a-avatar>
        </template>
      </a-upload>
      <a-descriptions
        :data="renderData"
        :column="2"
        align="right"
        layout="inline-horizontal"
        :label-style="{
          width: '140px',
          fontWeight: 'normal',
          color: 'rgb(var(--gray-8))'
        }"
        :value-style="{
          width: '200px',
          paddingLeft: '8px',
          textAlign: 'left'
        }"
      >
        <template #label="{ label }">{{ $t(label) }} :</template>
      </a-descriptions>
    </a-space>
  </a-card>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import type { FileItem } from '@arco-design/web-vue/es/upload/interfaces';
import { useUserStore } from '@/store';
import type { DescData } from '@arco-design/web-vue/es/descriptions/interface';
import { SysUserService } from '@/api/gen-api';
import { Message } from '@arco-design/web-vue';

const userStore = useUserStore();
const file = {
  uid: '-2',
  name: 'avatar.png',
  url: userStore.avatar
};
const renderData = ref([
  {
    label: '姓名',
    value: userStore.realName
  },
  {
    label: '账户ID',
    value: userStore.id
  },
  {
    label: '手机号',
    value: userStore.mobile
  },
  {
    label: '邮箱',
    value: userStore.email
  },
  {
    label: '注册日期',
    value: userStore.registerTime
  }
]) as DescData[];
const fileList = ref<FileItem[]>([file]);

// 监听 userStore.avatar 变化，自动更新 fileList
watch(
  () => userStore.avatar,
  newAvatar => {
    if (newAvatar) {
      fileList.value = [
        {
          uid: '-2',
          name: 'avatar.png',
          url: newAvatar
        }
      ];
    }
  }
);

const upload = (fileItem: FileItem) => {
  fileList.value = [fileItem];
  SysUserService.upload({
    file: fileList.value[0].file
  }).then(res => {
    if (res.result) {
      Message.success('上传成功！');
      SysUserService.getInfo().then(res => {
        if (res.result) {
          userStore.setInfo(res.result);
        }
      });
    }
  });
};

const updateRenderData = () => {
  renderData.value = [
    { label: '姓名', value: userStore.realName },
    { label: '账户ID', value: userStore.id },
    { label: '手机号', value: userStore.mobile },
    { label: '邮箱', value: userStore.email },
    { label: '注册日期', value: userStore.registerTime }
  ];
};

onMounted(() => {
  SysUserService.getInfo().then(res => {
    if (res.result) {
      userStore.setInfo(res.result);
      updateRenderData();
    }
  });
});

watch(
  () => [
    userStore.realName,
    userStore.id,
    userStore.mobile,
    userStore.email,
    userStore.registerTime
  ],
  updateRenderData
);
</script>

<style scoped lang="less">
.arco-card {
  padding: 14px 0 4px 4px;
  border-radius: 4px;
}

:deep(.arco-avatar-trigger-icon-button) {
  width: 32px;
  height: 32px;
  line-height: 32px;
  background-color: #e8f3ff;

  .arco-icon-camera {
    margin-top: 8px;
    font-size: 14px;
    color: rgb(var(--arcoblue-6));
  }
}
</style>
