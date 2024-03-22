<template>
  <a-form ref="formRef" layout="horizontal" :model="form" :rules="rules">
    <a-form-item field="username" validate-trigger="blur" hide-label>
      <a-input
        v-model="form.username"
        style="height: 40px"
        autocomplete="username"
        placeholder="请输入用户名"
      >
        <template #prefix>
          <icon-user />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item field="password" validate-trigger="blur" hide-label>
      <a-input-password
        v-model="form.password"
        style="height: 40px"
        autocomplete="current-password"
        placeholder="请输入密码"
        allow-clear
      >
        <template #prefix>
          <icon-lock />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item field="captcha" validate-trigger="blur" hide-label>
      <a-row>
        <a-col :span="17">
          <a-input
            v-model="form.captcha"
            style="height: 40px"
            placeholder="请输入验证码"
            allow-clear
          >
            <template #prefix>
              <icon-bold />
            </template>
          </a-input>
        </a-col>
        <a-col :span="6" :offset="1">
          <a-tooltip content="点击获取">
            <a-image
              style="cursor: pointer"
              alt="验证码"
              :src="captchaUrl"
              :preview="false"
              show-loader
              @click="getCaptcha"
            />
          </a-tooltip>
        </a-col>
      </a-row>
    </a-form-item>
    <a-checkbox
      checked="rememberPassword"
      :model-value="loginConfig.rememberPassword"
      @change="setRememberPassword"
    >
      记住密码
    </a-checkbox>
    <a-button
      type="primary"
      style="margin: 32px 0 6px"
      long
      :loading="loading"
      @click="handleSubmit"
    >
      登录
    </a-button>
    <a-divider orientation="center">更多方式</a-divider>
    <a-space class="login-form-more" :size="2" fill>
      <icon-alipay-circle style="color: #4b81ff" />
      <icon-wechat style="color: #38ad19" />
      <icon-lark-color />
      <icon-tiktok-color />
      <icon-github />
      <template #split>
        <a-divider direction="vertical" />
      </template>
    </a-space>
    <div class="login-form-actions">
      <a-checkbox v-model="form.agreement">我已阅读并同意</a-checkbox>
      <a-link>服务协议</a-link>
      <span>和</span>
      <a-link>隐私政策</a-link>
    </div>
  </a-form>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStorage } from '@vueuse/core';
import { useUserStore } from '@/store';
import useLoading from '@/hooks/useLoading';
import { pick } from 'lodash';
import { Message } from '@arco-design/web-vue';
import { nanoid } from 'nanoid';
import { LoginRequest } from '@/api/gen-api';

const router = useRouter();
const userStore = useUserStore();
const formRef = ref();
const { loading, setLoading } = useLoading();

const loginConfig = useStorage('login-config', {
  rememberPassword: true,
  username: '', // 演示默认值
  password: '' // 演示密码
});
const form = reactive({
  username: loginConfig.value.username,
  password: loginConfig.value.password,
  phone: '',
  captcha: '',
  uuid: '',
  agreement: false
});

const rules = {
  username: [{ required: true, message: '请输入账号/邮箱' }],
  captcha: [{ required: true, message: '请输入验证码' }],
  password: [{ required: true, message: '请输入密码' }],
  phone: [
    { required: true, message: '请输入手机号' },
    { length: 11, message: '手机号格式不正确' }
  ]
};

const handleSubmit = () => {
  if (loading.value) return;

  formRef.value.validateField(['username', 'password']).then(async res => {
    if (res) return;
    if (!form.agreement) {
      return Message.info('请阅读并同意服务协议和隐私政策');
    }
    setLoading(true);
    const userInfoForm: LoginRequest = pick(form, [
      'username',
      'password',
      'captcha',
      'uuid'
    ]);
    await userStore
      .login(userInfoForm as LoginRequest)
      .then(() => {
        const { redirect, ...othersQuery } = router.currentRoute.value.query;
        router.push({
          name: (redirect as string) || 'Info',
          query: {
            ...othersQuery
          }
        });
        Message.success('登录成功！');
        const { rememberPassword } = loginConfig.value;
        const { username, password } = userInfoForm;
        loginConfig.value.username = rememberPassword ? username : '';
        loginConfig.value.password = rememberPassword ? password : '';
      })
      .catch(() => {
        getCaptcha();
      })
      .finally(() => {
        setLoading(false);
      });
  });
};

const captchaUrl = ref('');

// 获取验证码
const getCaptcha = () => {
  form.uuid = nanoid();
  captchaUrl.value = `/api/security/captcha?uuid=${form.uuid}`;
};

const setRememberPassword = (value: boolean) => {
  loginConfig.value.rememberPassword = value;
};

onMounted(() => {
  getCaptcha();
});
</script>

<style lang="less" scoped>
.login-form {
  &-actions {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 24px;
    margin-bottom: 6px;
  }

  &-more {
    justify-content: center;

    .arco-icon {
      font-size: 20px;
      cursor: pointer;
      transition: transform 0.2s ease;

      &:hover {
        transform: scale(1.3);
      }
    }
  }
}
</style>
