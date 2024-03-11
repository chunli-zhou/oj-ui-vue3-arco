<template>
  <a-form
    ref="formRef"
    :model="formData"
    class="form"
    :label-col-props="{ span: 8 }"
    :wrapper-col-props="{ span: 16 }"
  >
    <a-form-item
      field="email"
      label="邮箱"
      :rules="[
        {
          required: true,
          message: '邮箱必填'
        }
      ]"
    >
      <a-input v-model="formData.email" placeholder="请输入邮箱" />
    </a-form-item>
    <a-form-item
      field="nickname"
      label="昵称"
      :rules="[
        {
          required: true,
          message: '昵称必填'
        }
      ]"
    >
      <a-input v-model="formData.nickname" placeholder="请输入昵称" />
    </a-form-item>
    <a-form-item
      field="countryRegion"
      label="国家/地区"
      :rules="[
        {
          required: true,
          message: '国家地区'
        }
      ]"
    >
      <a-select v-model="formData.countryRegion" placeholder="请选择">
        <a-option value="China">中国</a-option>
      </a-select>
    </a-form-item>
    <a-form-item
      field="area"
      label="所在区域"
      :rules="[
        {
          required: true,
          message: '城市必填'
        }
      ]"
    >
      <a-cascader
        v-model="formData.area"
        placeholder="请选择"
        :options="[
          {
            label: '山东',
            value: 'shandong',
            children: [
              {
                label: '济南',
                value: 'jinan',
                children: [
                  {
                    label: '济阳',
                    value: 'jiyang'
                  }
                ]
              }
            ]
          }
        ]"
        allow-clear
      />
    </a-form-item>
    <a-form-item field="address" label="家庭地址">
      <a-input v-model="formData.address" placeholder="请输入家庭地址" />
    </a-form-item>
    <a-form-item
      field="profile"
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
        v-model="formData.profile"
        placeholder="请输入个人简介，最多不超过200字"
      />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button type="primary" @click="validate">
          {{ $t('userSetting.save') }}
        </a-button>
        <a-button type="secondary" @click="reset">
          {{ $t('userSetting.reset') }}
        </a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { BasicInfoModel } from '@/api/user-center';

const formRef = ref<FormInstance>();
const formData = ref<BasicInfoModel>({
  email: '',
  nickname: '',
  countryRegion: '',
  area: '',
  address: '',
  profile: ''
});
const validate = async () => {
  const res = await formRef.value?.validate();
  if (!res) {
    // do some thing
    // you also can use html-type to submit
  }
};
const reset = async () => {
  await formRef.value?.resetFields();
};
</script>

<style scoped lang="less">
.form {
  width: 540px;
  margin: 0 auto;
}
</style>
