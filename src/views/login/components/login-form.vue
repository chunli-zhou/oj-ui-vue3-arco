<template>
  <a-form
    ref="formRef"
    class="login-form-wrapper"
    layout="horizontal"
    :model="form"
    :rules="rules"
  >
    <div class="login-form-title">欢迎登录</div>
    <a-tabs v-model:active-key="tabActiveKey" animation :justify="true">
      <a-tab-pane
        class="login-form-tab1"
        key="1"
        title="账号登录"
        destroy-on-hide
      >
        <a-form-item field="username" validate-trigger="blur" hide-label>
          <a-input
            v-model="form.username"
            style="height: 40px"
            autocomplete="username"
            placeholder="账号/邮箱"
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
      </a-tab-pane>
    </a-tabs>
    <a-button
      type="primary"
      style="margin: 32px 0 6px"
      long
      :loading="loading"
      @click="handleSubmit"
    >
      登录
    </a-button>
    <a-button type="text" long class="login-form-register-btn">注册</a-button>
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
import { nextTick, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStorage } from '@vueuse/core';
import { useUserStore } from '@/store';
import useLoading from '@/hooks/useLoading';
import type { LoginData } from '@/api/user';
import { pick } from 'lodash';
import { Message } from '@arco-design/web-vue';
import { nanoid } from 'nanoid';

const router = useRouter();
const userStore = useUserStore();
const formRef = ref();
const tabActiveKey = ref('1');
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
  password: [
    { required: true, message: '请输入密码' }
    // {
    //   // 密码格式：6-32位，包含大小写字母、数字、特殊字符(除空格)两种以上
    //   match:
    //     /^(?![\d]+$)(?![a-z]+$)(?![A-Z]+$)(?![~!@#$%^&*.]+$)[\da-zA-z~!@#$%^&*.]{6,32}$/,
    //   message: '密码格式不正确'
    // }
  ],
  phone: [
    { required: true, message: '请输入手机号' },
    { length: 11, message: '手机号格式不正确' }
  ]
};

const handleSubmit = () => {
  if (loading.value) return;

  if (tabActiveKey.value === '1') {
    formRef.value.validateField(['username', 'password']).then(async res => {
      if (res) return;
      if (!form.agreement) {
        return Message.info('请阅读并同意服务协议和隐私政策');
      }
      setLoading(true);
      try {
        const userInfoForm: LoginData = pick(form, [
          'username',
          'password',
          'captcha',
          'uuid'
        ]);
        await userStore.login(userInfoForm as LoginData);

        const { redirect, ...othersQuery } = router.currentRoute.value.query;
        router.push({
          name: (redirect as string) || 'Workplace',
          query: {
            ...othersQuery
          }
        });
        Message.success('登录成功！');
        const { rememberPassword } = loginConfig.value;
        const { username, password } = userInfoForm;
        // 实际生产环境需要进行加密存储。
        loginConfig.value.username = rememberPassword ? username : '';
        loginConfig.value.password = rememberPassword ? password : '';
      } catch (error) {
        await getCaptcha();
      } finally {
        setLoading(false);
      }
    });
  }

  if (tabActiveKey.value === '2') {
    formRef.value.validateField(['phone', 'captcha']).then(res => {
      if (res) return;
      if (!form.agreement)
        return Message.info('请阅读并同意服务协议和隐私政策');
      //   setLoading(true);
    });
  }
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
  &-wrapper {
    width: 450px;
    height: 100%;
    padding: 24px 24px 12px;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid var(--color-border-2);
    border-radius: var(--border-radius-large);
  }

  &-title {
    margin-bottom: 16px;
    font-size: 24px;
    font-weight: 500;
    line-height: 32px;
    color: var(--color-text-1);
  }

  &-actions {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 24px;
    margin-bottom: 6px;
  }

  &-register-btn {
    color: var(--color-text-3) !important;
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

:deep(.arco-tabs-content) {
  height: 155px;
}
</style>
