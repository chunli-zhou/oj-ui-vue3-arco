<template>
  <a-form
    ref="formRef"
    :model="formData"
    class="form"
    :label-col-props="{ span: 8 }"
    :wrapper-col-props="{ span: 16 }"
  >
    <a-form-item field="email" label="邮箱">
      <a-input v-model="formData.email" placeholder="请输入邮箱" />
    </a-form-item>
    <a-form-item field="nickName" label="昵称">
      <a-input v-model="formData.nickName" placeholder="请输入昵称" />
    </a-form-item>
    <a-form-item field="realName" label="姓名">
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
        <a-button type="primary" @click="handleSubmit">保存</a-button>
        <a-button type="secondary" @click="reset">重置</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { SysUserUpdateRequest } from '@/api/gen-api/models/sys/SysUserUpdateRequest.ts';
import { useUserStore } from '@/store';
import { SysUserService } from '@/api/gen-api';
import { Message } from '@arco-design/web-vue';

const userStore = useUserStore();
const formRef = ref<FormInstance>();
const formData = ref<SysUserUpdateRequest>({
  id: userStore.id,
  email: userStore.email,
  nickName: userStore.nickName,
  realName: userStore.realName,
  introduce: userStore.introduce
});

const handleSubmit = async () => {
  SysUserService.updateUserInfo(formData.value).then(res => {
    if (res) {
      Message.success('更新成功');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      Message.error('更新失败，请联系管理员');
    }
  });
};

onMounted(() => {
  userStore.info();
});

const reset = async () => {
  formData.value = {} as SysUserUpdateRequest;
};
</script>

<style scoped lang="less">
.form {
  width: 540px;
  margin: 0 auto;
}
</style>
