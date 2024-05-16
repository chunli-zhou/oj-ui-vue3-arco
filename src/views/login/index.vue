<template>
  <div class="container-login">
    <header class="header">
      <img style="width: 36px" src="@/assets/favicon.png" />
      <div class="header-text">Online Judge</div>
    </header>
    <div class="content">
      <div class="form-wrapper">
        <div class="form-title">欢迎使用</div>
        <a-tabs v-model:active-key="tabActiveKey" animation :justify="true">
          <a-tab-pane
            key="1"
            class="login-form-tab1"
            title="登录"
            destroy-on-hide
          >
            <LoginForm />
          </a-tab-pane>
          <a-tab-pane
            key="2"
            class="register-form-tab"
            title="注册"
            destroy-on-hide
          >
            <RegisterForm />
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import LoginForm from './components/login-form.vue';

import { ref } from 'vue';
import RegisterForm from '@/views/login/components/register-form.vue';

const tabActiveKey = ref('1');
</script>

<style lang="less" scoped>
.form {
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
}

.container-login {
  display: flex;
  height: 100vh;
  background-image: url('../../assets/images/background.png');
  background-repeat: no-repeat;
  background-size: cover;

  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    transform: translate(-50%, -50%);
  }

  .footer {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
  }

  .header {
    position: fixed;
    top: 0;
    left: 22px;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    width: 100%;
    padding: @spacing-7 @spacing-0;

    &-text {
      margin-right: 4px;
      margin-left: 4px;
      font-size: 26px;
      font-weight: 500;
      color: rgb(var(--color-text-1));
    }
  }
}

:deep(.arco-tabs-content) {
  height: 155px;
}

@media (max-height: @screen-md) {
  .footer {
    display: none;
  }
}
</style>
