<template>
  <a-form
    ref="formRef"
    :model="formData"
    class="form"
    :label-col-props="{ span: 8 }"
    :wrapper-col-props="{ span: 16 }"
  >
    <a-form-item
      field="nickName"
      label="昵称"
      :rules="[{ required: true, message: '请输入昵称' }]"
    >
      <a-input v-model="formData.nickName" placeholder="请输入昵称" />
    </a-form-item>
    <a-form-item
      field="realName"
      label="姓名"
      :rules="[{ required: true, message: '请输入姓名' }]"
    >
      <a-input v-model="formData.realName" placeholder="请输入姓名" />
    </a-form-item>
    <a-form-item
      field="introduce"
      label="个人简介"
      :rules="[
        {
          maxLength: 200,
          message: '个人简介'
        }
      ]"
      row-class="keep-margin"
    >
      <a-textarea
        v-model="formData.introduce"
        placeholder="请输入个人简介，最多不超过200字"
      />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button
          type="primary"
          :disabled="isSaveDisabled"
          @click="handleSubmit"
        >
          保存
        </a-button>
        <a-button type="secondary" @click="reset">重置</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { SysUserUpdateRequest } from '@/api/gen-api/models/sys/SysUserUpdateRequest.ts';
import { useUserStore } from '@/store';
import { SysUserService } from '@/api/gen-api';
import { Message } from '@arco-design/web-vue';

const userStore = useUserStore();
const formRef = ref<FormInstance>();
const formData = ref<SysUserUpdateRequest>({
  id: userStore.id,
  nickName: userStore.nickName,
  realName: userStore.realName,
  introduce: userStore.introduce
});

// 新增：保存原始数据
const originalData = ref({
  nickName: userStore.nickName,
  realName: userStore.realName,
  introduce: userStore.introduce
});

const handleSubmit = async () => {
  await formRef.value?.validate();
  SysUserService.updateUserInfo(formData.value).then(async res => {
    if (res) {
      Message.success('更新成功');
      // 重新获取最新用户信息并更新表单
      await userStore.info();
      formData.value = {
        id: userStore.id,
        nickName: userStore.nickName,
        realName: userStore.realName,
        introduce: userStore.introduce
      };
      // 同步原始数据
      originalData.value = {
        nickName: formData.value.nickName,
        realName: formData.value.realName,
        introduce: formData.value.introduce
      };
    } else {
      Message.error('更新失败，请联系管理员');
    }
  });
};

onMounted(() => {
  userStore.info();
  // 同步原始数据
  originalData.value = {
    nickName: userStore.nickName,
    realName: userStore.realName,
    introduce: userStore.introduce
  };
});

const reset = async () => {
  await userStore.info();
  formData.value = {
    id: userStore.id,
    nickName: userStore.nickName,
    realName: userStore.realName,
    introduce: userStore.introduce
  };
  // 同步原始数据
  originalData.value = {
    nickName: formData.value.nickName,
    realName: formData.value.realName,
    introduce: formData.value.introduce
  };
};

const isSaveDisabled = computed(() => {
  // 只有内容变更后才可保存
  const changed =
    formData.value.nickName !== originalData.value.nickName ||
    formData.value.realName !== originalData.value.realName ||
    formData.value.introduce !== originalData.value.introduce;
  return !formData.value.nickName || !formData.value.realName || !changed;
});
</script>

<style scoped lang="less">
.form {
  width: 540px;
  margin: 0 auto;
}
</style>
