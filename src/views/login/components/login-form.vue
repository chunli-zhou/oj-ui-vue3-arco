<template>
  <a-form
    ref="formRef"
    layout="horizontal"
    :model="form"
    :rules="rules"
    @keyup.enter="handleSubmit"
  >
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
      <a-space size="large">
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
      </a-space>
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
    <div style="margin-top: 12px; text-align: center">
      <a-link @click="showForgotModal = true">忘记密码？</a-link>
    </div>
    <a-modal
      :visible="showForgotModal"
      :ok-button-props="{
        disabled: !(
          forgotForm.username.length >= 4 && forgotForm.username.length <= 12
        )
      }"
      @ok="handleForgotOk"
      @cancel="showForgotModal = false"
    >
      <template #title>找回密码</template>
      <a-form v-if="!showMethodSelect" ref="forgotFormRef" :model="forgotForm">
        <a-form-item
          field="username"
          label="账号"
          :rules="[{ required: true, message: '请输入4-12位账号' }]"
        >
          <a-input
            v-model="forgotForm.username"
            placeholder="请输入账号"
            maxlength="12"
            allow-clear
            @input="onForgotInput"
          />
        </a-form-item>
      </a-form>
      <a-row v-if="showMethodSelect" gutter="16" style="margin-top: 16px">
        <a-col :span="8">
          <a-card hoverable class="method-card" @click="chooseMethod('mobile')">
            <template #title>手机号验证</template>
            <div>
              已绑定手机号：{{
                forgotResult?.mobile
                  ? forgotResult.mobile.replace(
                      /^(\d{3})\d{4}(\d{4})$/,
                      '$1****$2'
                    )
                  : ''
              }}
            </div>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card
            hoverable
            class="method-card"
            @click="chooseMethod('question')"
          >
            <template #title>密保问题</template>
            <div>{{ forgotResult?.question }}</div>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card hoverable class="method-card" @click="chooseMethod('email')">
            <template #title>邮箱验证</template>
            <div>
              已绑定邮箱：{{
                forgotResult?.email
                  ? forgotResult.email.replace(/^(.{2}).+(@.+)$/, '$1****$2')
                  : ''
              }}
            </div>
          </a-card>
        </a-col>
      </a-row>
    </a-modal>
    <a-modal
      v-model:visible="mobileCodeModal"
      title="请输入手机验证码"
      :closable="false"
      @ok="onMobileCodeOk"
    >
      <a-input
        v-model="mobileCode"
        placeholder="请输入验证码"
        maxlength="6"
        style="margin-bottom: 12px"
      />
      <template #footer>
        <a-button @click="mobileCodeModal = false">取消</a-button>
        <a-button
          type="primary"
          :loading="mobileCodeLoading"
          @click="onMobileCodeOk"
        >
          确定
        </a-button>
      </template>
    </a-modal>
    <a-modal
      v-model:visible="resetPwdModal"
      title="重置密码"
      :closable="false"
      @ok="onResetPwdOk"
    >
      <a-form :model="resetPwdForm">
        <a-form-item label="新密码" required>
          <a-input-password
            v-model="resetPwdForm.password"
            placeholder="请输入新密码"
            maxlength="20"
          />
        </a-form-item>
        <a-form-item label="确认密码" required>
          <a-input-password
            v-model="resetPwdForm.confirmPassword"
            placeholder="请再次输入新密码"
            maxlength="20"
          />
        </a-form-item>
      </a-form>
      <template #footer>
        <a-button @click="resetPwdModal = false">取消</a-button>
        <a-button
          type="primary"
          :loading="resetPwdLoading"
          :disabled="
            !resetPwdForm.password ||
            !resetPwdForm.confirmPassword ||
            resetPwdForm.password !== resetPwdForm.confirmPassword
          "
          @click="onResetPwdOk"
        >
          确定
        </a-button>
      </template>
    </a-modal>
    <a-modal
      v-model:visible="questionModal"
      title="密保验证"
      :closable="false"
      @ok="onQuestionOk"
    >
      <div style="margin-bottom: 12px">{{ forgotResult?.question }}</div>
      <a-input v-model="questionAnswer" placeholder="请输入密保答案" />
      <template #footer>
        <a-button @click="questionModal = false">取消</a-button>
        <a-button
          type="primary"
          :loading="questionLoading"
          @click="onQuestionOk"
        >
          确定
        </a-button>
      </template>
    </a-modal>
    <a-modal
      v-model:visible="emailCodeModal"
      title="请输入邮箱验证码"
      :closable="false"
      @ok="onEmailCodeOk"
    >
      <a-input
        v-model="emailCode"
        placeholder="请输入验证码"
        maxlength="6"
        style="margin-bottom: 12px"
      />
      <template #footer>
        <a-button @click="emailCodeModal = false">取消</a-button>
        <a-button
          type="primary"
          :loading="emailCodeLoading"
          @click="onEmailCodeOk"
        >
          确定
        </a-button>
      </template>
    </a-modal>
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
import axios from 'axios';

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
        router.push({ name: 'UserSetting' });
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

const showForgotModal = ref(false);
const forgotForm = reactive({ username: '' });
const forgotFormRef = ref();
const forgotResult = ref<any>(null); // 保存后端返回的 result
const showMethodSelect = ref(false); // 控制方式选择卡片显示
const onForgotInput = (val: string) => {
  // 只允许输入数字或字母，最大12位
  forgotForm.username = val.replace(/[^a-zA-Z0-9]/g, '').slice(0, 12);
};
const handleForgotOk = async () => {
  await forgotFormRef.value?.validate();
  try {
    const { data } = await axios.post('/api/security/forgotPassword', {
      username: forgotForm.username
    });
    if (data.code === 200 && data.result) {
      forgotResult.value = data.result;
      showMethodSelect.value = true; // 显示方式选择
    } else {
      Message.error(data.message || '请求失败，请稍后重试');
      showForgotModal.value = false;
      showMethodSelect.value = false;
    }
  } catch (e) {
    Message.error('请求失败，请稍后重试');
    showForgotModal.value = false;
    showMethodSelect.value = false;
  }
  // if (!(forgotForm.username.length >= 6 && forgotForm.username.length <= 12))
  //   return;
};
const mobileCodeModal = ref(false); // 控制验证码输入弹窗
const mobileCode = ref(''); // 用户输入的验证码
const mobileCodeLoading = ref(false); // 发送验证码loading
const resetPwdModal = ref(false); // 控制重置密码弹窗
const resetPwdForm = reactive({
  password: '',
  confirmPassword: ''
});
const resetPwdLoading = ref(false);
const serverMobileCode = ref(''); // 保存后端返回的验证码
const questionModal = ref(false); // 控制密保问题弹窗
const questionAnswer = ref(''); // 用户输入的密保答案
const questionLoading = ref(false); // 密保验证loading
const emailCodeModal = ref(false); // 控制邮箱验证码输入弹窗
const emailCode = ref(''); // 用户输入的邮箱验证码
const emailCodeLoading = ref(false); // 邮箱验证码loading
const serverEmailCode = ref(''); // 保存后端返回的邮箱验证码

const chooseMethod = async (method: string) => {
  if (method === 'mobile') {
    mobileCodeLoading.value = true;
    try {
      const { data } = await axios.post('/api/sys/sysUser/sendMobileCode', {
        userId: forgotResult.value.id,
        mobile: forgotResult.value.mobile
      });
      if (data.code === 200 && data.result) {
        serverMobileCode.value = data.result;
        Message.success('验证码已发送到您的手机');
        mobileCodeModal.value = true;
      } else {
        Message.error(data.message || '验证码发送失败');
      }
    } catch (e) {
      Message.error('验证码发送失败');
    } finally {
      mobileCodeLoading.value = false;
    }
  } else if (method === 'question') {
    questionAnswer.value = '';
    questionModal.value = true;
  } else if (method === 'email') {
    emailCodeLoading.value = true;
    try {
      const { data } = await axios.post('/api/sys/sysUser/sendEmailCode', {
        userId: forgotResult.value.id,
        email: forgotResult.value.email
      });
      if (data.code === 200 && data.result) {
        serverEmailCode.value = data.result;
        Message.success('验证码已发送到您的邮箱');
        emailCodeModal.value = true;
      } else {
        Message.error(data.message || '验证码发送失败');
      }
    } catch (e) {
      Message.error('验证码发送失败');
    } finally {
      emailCodeLoading.value = false;
    }
  }
};

const onMobileCodeOk = () => {
  if (!mobileCode.value) {
    Message.warning('请输入验证码');
    return;
  }
  if (mobileCode.value === serverMobileCode.value) {
    Message.success('验证码校验成功，请设置新密码');
    mobileCodeModal.value = false;
    mobileCode.value = '';
    resetPwdModal.value = true;
  } else {
    Message.error('验证码错误');
    mobileCodeModal.value = false;
    mobileCode.value = '';
    showForgotModal.value = false;
    showMethodSelect.value = false;
  }
};

const onResetPwdOk = async () => {
  if (!resetPwdForm.password || !resetPwdForm.confirmPassword) {
    Message.warning('请输入新密码并确认');
    return;
  }
  if (resetPwdForm.password !== resetPwdForm.confirmPassword) {
    Message.error('两次输入的密码不一致');
    return;
  }
  resetPwdLoading.value = true;
  try {
    const { data } = await axios.post('/api/sys/sysUser/resetPassword', {
      userId: forgotResult.value.id,
      password: resetPwdForm.password
    });
    if (data.code === 200) {
      Message.success('密码重置成功，请使用新密码登录');
      resetPwdModal.value = false;
      resetPwdForm.password = '';
      resetPwdForm.confirmPassword = '';
      showForgotModal.value = false;
      showMethodSelect.value = false;
    } else {
      Message.error(data.message || '密码重置失败');
    }
  } catch (e) {
    Message.error('密码重置失败');
  } finally {
    resetPwdLoading.value = false;
  }
};

const onQuestionOk = async () => {
  if (!questionAnswer.value) {
    Message.warning('请输入密保答案');
    return;
  }
  questionLoading.value = true;
  try {
    const { data } = await axios.post('/api/security/verifyQuestion', {
      userId: forgotResult.value.id,
      answer: questionAnswer.value
    });
    if (data.code === 200) {
      Message.success('密保答案正确，请设置新密码');
      questionModal.value = false;
      resetPwdModal.value = true;
    } else {
      Message.error(data.message || '密保答案错误');
      questionModal.value = false;
      showForgotModal.value = false;
      showMethodSelect.value = false;
    }
  } catch (e) {
    Message.error('密保答案校验失败');
    questionModal.value = false;
    showForgotModal.value = false;
    showMethodSelect.value = false;
  } finally {
    questionLoading.value = false;
  }
};

const onEmailCodeOk = () => {
  if (!emailCode.value) {
    Message.warning('请输入验证码');
    return;
  }
  if (emailCode.value === serverEmailCode.value) {
    Message.success('验证码校验成功，请设置新密码');
    emailCodeModal.value = false;
    emailCode.value = '';
    resetPwdModal.value = true;
  } else {
    Message.error('验证码错误');
    emailCodeModal.value = false;
    emailCode.value = '';
    showForgotModal.value = false;
    showMethodSelect.value = false;
  }
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

.method-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 130px;
  text-align: center;
}
</style>
