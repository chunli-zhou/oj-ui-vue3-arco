<template>
  <a-list :bordered="false">
    <a-list-item>
      <a-list-item-meta>
        <template #avatar>
          <a-typography-paragraph>登录密码</a-typography-paragraph>
        </template>
        <template #description>
          <div class="content">
            <a-typography-paragraph>
              已设置。密码至少6位字符，支持数字、字母和除空格外的特殊字符，且必须同时包含数字和大小写字母。
            </a-typography-paragraph>
          </div>
          <div class="operation">
            <a-link @click="showPwdModal = true">修改</a-link>
          </div>
        </template>
      </a-list-item-meta>
    </a-list-item>
    <a-list-item>
      <a-list-item-meta>
        <template #avatar>
          <a-typography-paragraph>密保问题</a-typography-paragraph>
        </template>
        <template #description>
          <div class="content">
            <a-typography-paragraph class="tip">
              {{
                securityQuestion
                  ? `已设置：${securityQuestion}`
                  : '您暂未设置密保问题，密保问题可以有效的保护账号的安全。'
              }}
            </a-typography-paragraph>
          </div>
          <div class="operation">
            <a-link @click="showQuestionModal = true">
              {{ securityQuestion ? '修改' : '设置' }}
            </a-link>
          </div>
        </template>
      </a-list-item-meta>
    </a-list-item>
    <a-list-item>
      <a-list-item-meta>
        <template #avatar>
          <a-typography-paragraph>安全手机</a-typography-paragraph>
        </template>
        <template #description>
          <div class="content">
            <a-typography-paragraph>
              已绑定：{{ maskedMobile }}
            </a-typography-paragraph>
          </div>
          <div class="operation">
            <a-link @click="showMobileModal = true">修改</a-link>
          </div>
        </template>
      </a-list-item-meta>
    </a-list-item>
    <a-list-item>
      <a-list-item-meta>
        <template #avatar>
          <a-typography-paragraph>安全邮箱</a-typography-paragraph>
        </template>
        <template #description>
          <div class="content">
            <a-typography-paragraph class="tip">
              {{
                userEmail
                  ? `已绑定：${userEmail}`
                  : '您暂未设置邮箱，绑定邮箱可以用来找回密码、接收通知等。'
              }}
            </a-typography-paragraph>
          </div>
          <div class="operation">
            <a-link @click="showEmailModal = true">
              {{ userEmail ? '修改' : '设置' }}
            </a-link>
          </div>
        </template>
      </a-list-item-meta>
    </a-list-item>
  </a-list>

  <!-- 修改密码弹窗 -->
  <a-modal
    v-model:visible="showPwdModal"
    title="修改密码"
    :ok-button-props="{ disabled: isPwdOkDisabled }"
    @ok="handlePwdOk"
    @cancel="resetPwdForm"
  >
    <a-form ref="pwdFormRef" :model="pwdForm" :rules="pwdRules">
      <a-form-item field="oldPwd" label="旧密码">
        <a-input-password v-model="pwdForm.oldPwd" placeholder="请输入旧密码" />
      </a-form-item>
      <a-form-item field="newPwd" label="新密码">
        <a-input-password v-model="pwdForm.newPwd" placeholder="请输入新密码" />
      </a-form-item>
      <a-form-item field="confirmPwd" label="确认新密码">
        <a-input-password
          v-model="pwdForm.confirmPwd"
          placeholder="请再次输入新密码"
        />
      </a-form-item>
    </a-form>
  </a-modal>

  <!-- 密保问题弹窗 -->
  <a-modal
    v-model:visible="showQuestionModal"
    title="设置密保问题"
    :ok-button-props="{ disabled: isQuestionOkDisabled }"
    @ok="handleQuestionOk"
    @cancel="resetQuestionForm"
  >
    <a-form ref="questionFormRef" :model="questionForm" :rules="questionRules">
      <a-form-item field="question" label="问题">
        <a-select v-model="questionForm.question" placeholder="请选择密保问题">
          <a-option value="你的出生地是？">你的出生地是？</a-option>
          <a-option value="你母亲的名字是？">你母亲的名字是？</a-option>
          <a-option value="你最喜欢的电影是？">你最喜欢的电影是？</a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="answer" label="答案">
        <a-input v-model="questionForm.answer" placeholder="请输入答案" />
      </a-form-item>
    </a-form>
  </a-modal>

  <!-- 修改手机弹窗 -->
  <a-modal
    v-model:visible="showMobileModal"
    title="修改手机"
    :ok-button-props="{ disabled: isMobileOkDisabled }"
    @ok="handleMobileOk"
    @cancel="resetMobileForm"
  >
    <a-form ref="mobileFormRef" :model="mobileForm" :rules="mobileRules">
      <a-form-item field="mobile" label="新手机号">
        <a-input v-model="mobileForm.mobile" placeholder="请输入新手机号" />
      </a-form-item>
      <a-form-item field="code" label="验证码">
        <a-input v-model="mobileForm.code" placeholder="请输入验证码" />
        <a-button
          type="primary"
          size="small"
          style="margin-left: 8px"
          :disabled="isGetMobileCodeDisabled"
          @click="sendMobileCode"
        >
          {{
            mobileCodeTimer > 0 ? `${mobileCodeTimer}秒后重试` : '获取验证码'
          }}
        </a-button>
      </a-form-item>
    </a-form>
  </a-modal>

  <!-- 修改邮箱弹窗 -->
  <a-modal
    v-model:visible="showEmailModal"
    title="修改邮箱"
    :ok-button-props="{ disabled: isEmailOkDisabled }"
    @ok="handleEmailOk"
    @cancel="resetEmailForm"
  >
    <a-form ref="emailFormRef" :model="emailForm" :rules="emailRules">
      <a-form-item field="email" label="新邮箱">
        <a-input v-model="emailForm.email" placeholder="请输入新邮箱" />
      </a-form-item>
      <a-form-item field="code" label="验证码">
        <template #label>验证码</template>
        <div style="display: flex; align-items: center">
          <a-input
            v-model="emailForm.code"
            placeholder="请输入验证码"
            style="flex: 1"
          />
          <a-button
            type="primary"
            size="small"
            style="margin-left: 8px"
            :disabled="isGetEmailCodeDisabled"
            @click="sendEmailCode"
          >
            {{
              emailCodeTimer > 0 ? `${emailCodeTimer}秒后重试` : '获取验证码'
            }}
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { Message } from '@arco-design/web-vue';
import { useUserStore } from '@/store';
import axios from 'axios';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const userEmail = computed(() => userStore.email);
const maskedMobile = computed(() => {
  const m = userStore.mobile || '';
  return m ? m.replace(/(\d{3})\d{4}(\d{4})/, '$1******$2') : '';
});
const securityQuestion = ref('');
const router = useRouter();

// 密码弹窗
const showPwdModal = ref(false);
const pwdFormRef = ref();
const pwdForm = ref({ oldPwd: '', newPwd: '', confirmPwd: '' });
const pwdRules = {
  oldPwd: [{ required: true, message: '请输入旧密码' }],
  newPwd: [
    { required: true, message: '请输入新密码' },
    {
      match: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      message: '密码必须为字母和数字组合且不少于6位'
    }
  ],
  confirmPwd: [
    { required: true, message: '请再次输入新密码' },
    {
      validator: (value: string, cb: any) => {
        if (value !== pwdForm.value.newPwd) {
          cb('两次输入的密码不一致');
        } else {
          cb();
        }
      }
    }
  ]
};

const isPwdOkDisabled = computed(() => {
  // 校验新密码必须为字母+数字组合且不少于6位，且两次输入一致，且旧密码不为空
  const newPwd = pwdForm.value.newPwd;
  const oldPwd = pwdForm.value.oldPwd;
  const confirmPwd = pwdForm.value.confirmPwd;
  const valid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(newPwd);
  return !oldPwd || !newPwd || !confirmPwd || !valid || newPwd !== confirmPwd;
});

const changePassword = async (oldPwd: string, newPwd: string) => {
  try {
    const res = await axios.post('/api/sys/sysUser/changePassword', {
      userId: userStore.id,
      oldPassword: oldPwd,
      newPassword: newPwd
    });
    // 标准Result格式
    if (
      res.data &&
      res.data.code === 200 &&
      res.data.result === '密码修改成功'
    ) {
      return { success: true };
    }
    return {
      success: false,
      msg: res.data?.result || res.data?.message || '未知错误'
    };
  } catch (e: any) {
    return {
      success: false,
      msg: e?.response?.data?.message || e?.message || '请求失败'
    };
  }
};

const handlePwdOk = async () => {
  await pwdFormRef.value?.validate();
  // 调用后端接口
  const res = await changePassword(pwdForm.value.oldPwd, pwdForm.value.newPwd);
  if (res && res.success) {
    Message.success('密码修改成功，请重新登录');
    showPwdModal.value = false;
    resetPwdForm();
    // 退出到登录界面
    setTimeout(() => {
      router.replace({ name: 'Login' });
    }, 1000);
  } else {
    Message.error('密码修改失败');
  }
};
const resetPwdForm = () => {
  pwdForm.value = { oldPwd: '', newPwd: '', confirmPwd: '' };
};

// 密保弹窗
const showQuestionModal = ref(false);
const questionFormRef = ref();
const questionForm = ref({ question: '', answer: '' });
const questionRules = {
  question: [{ required: true, message: '请选择密保问题' }],
  answer: [{ required: true, message: '请输入答案' }]
};
const isQuestionOkDisabled = computed(() => {
  return !questionForm.value.question || !questionForm.value.answer;
});
const setSecurityQuestion = async (question: string, answer: string) => {
  try {
    const res = await axios.post('/api/sys/sysUser/setSecurityQuestion', {
      userId: userStore.id,
      question,
      answer
    });
    // 假设后端返回Result格式
    if (res.data && res.data.code === 200) {
      return { success: true };
    }
    return {
      success: false,
      msg: res.data?.result || res.data?.message || '未知错误'
    };
  } catch (e: any) {
    return {
      success: false,
      msg: e?.response?.data?.message || e?.message || '请求失败'
    };
  }
};
const handleQuestionOk = async () => {
  await questionFormRef.value?.validate();
  // 调用后端接口
  const res = await setSecurityQuestion(
    questionForm.value.question,
    questionForm.value.answer
  );
  if (res && res.success) {
    Message.success('密保设置成功');
    securityQuestion.value = questionForm.value.question;
    showQuestionModal.value = false;
    resetQuestionForm();
  } else {
    Message.error(res?.msg || '密保设置失败');
  }
};
const resetQuestionForm = () => {
  questionForm.value = { question: '', answer: '' };
};

// 手机弹窗
const showMobileModal = ref(false);
const mobileFormRef = ref();
const mobileForm = ref({ mobile: '', code: '' });
const mobileRules = {
  mobile: [
    { required: true, message: '请输入新手机号' },
    { match: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
  ],
  code: [{ required: true, message: '请输入验证码' }]
};
const isMobileOkDisabled = computed(() => {
  const mobile = mobileForm.value.mobile;
  const code = mobileForm.value.code;
  const valid = /^1[3-9]\d{9}$/.test(mobile);
  return !mobile || !code || !valid;
});
const mobileCodeTimer = ref(0);
let mobileCodeInterval: any = null;
const mobileCodeServer = ref(''); // 保存后端返回的验证码
const sendMobileCode = async () => {
  try {
    const res = await axios.post('/api/sys/sysUser/sendMobileCode', {
      userId: userStore.id,
      mobile: mobileForm.value.mobile
    });
    if (res.data && res.data.code === 200) {
      Message.success('验证码已发送');
      mobileCodeServer.value = res.data.result;
      // 启动倒计时
      mobileCodeTimer.value = 60;
      mobileCodeInterval && clearInterval(mobileCodeInterval);
      mobileCodeInterval = setInterval(() => {
        mobileCodeTimer.value--;
        if (mobileCodeTimer.value <= 0) {
          clearInterval(mobileCodeInterval);
          mobileCodeInterval = null;
        }
      }, 1000);
    } else {
      Message.error(res.data?.message || '验证码发送失败');
      mobileCodeServer.value = '';
    }
  } catch (e: any) {
    Message.error(e?.response?.data?.message || e?.message || '验证码发送失败');
    mobileCodeServer.value = '';
  }
};
const isGetMobileCodeDisabled = computed(() => {
  const mobile = mobileForm.value.mobile;
  return !/^1[3-9]\d{9}$/.test(mobile) || mobileCodeTimer.value > 0;
});
const handleMobileOk = async () => {
  await mobileFormRef.value?.validate();
  if (mobileForm.value.code !== mobileCodeServer.value) {
    Message.error('验证码错误');
    setTimeout(() => {
      window.location.reload();
    }, 800);
    return;
  }
  // 发送绑定手机请求
  try {
    const res = await axios.post('/api/sys/sysUser/bindMobile', {
      userId: userStore.id,
      mobile: mobileForm.value.mobile,
      code: mobileForm.value.code
    });
    if (res.data && res.data.code === 200) {
      Message.success('手机号绑定成功');
      showMobileModal.value = false;
      resetMobileForm();
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      Message.error(res.data?.message || '手机号绑定失败');
    }
  } catch (e: any) {
    Message.error(e?.response?.data?.message || e?.message || '手机号绑定失败');
  }
};
const resetMobileForm = () => {
  mobileForm.value = { mobile: '', code: '' };
};

// 邮箱弹窗
const showEmailModal = ref(false);
const emailFormRef = ref();
const emailForm = ref({ email: '', code: '' });
const emailRules = {
  email: [
    { required: true, message: '请输入新邮箱' },
    { type: 'email', message: '请输入正确的邮箱格式' }
  ],
  code: [{ required: true, message: '请输入验证码' }]
};
const emailCodeTimer = ref(0);
let emailCodeInterval: any = null;
const emailCodeServer = ref(''); // 保存后端返回的邮箱验证码

const sendEmailCode = async () => {
  try {
    const res = await axios.post('/api/sys/sysUser/sendEmailCode', {
      userId: userStore.id,
      email: emailForm.value.email
    });
    if (res.data && res.data.code === 200) {
      Message.success('邮箱验证码已发送');
      emailCodeServer.value = res.data.result; // 保存后端验证码
      // 启动倒计时
      emailCodeTimer.value = 60;
      emailCodeInterval && clearInterval(emailCodeInterval);
      emailCodeInterval = setInterval(() => {
        emailCodeTimer.value--;
        if (emailCodeTimer.value <= 0) {
          clearInterval(emailCodeInterval);
          emailCodeInterval = null;
        }
      }, 1000);
    } else {
      Message.error(res.data?.message || '邮箱验证码发送失败');
      emailCodeServer.value = '';
    }
  } catch (e: any) {
    Message.error(
      e?.response?.data?.message || e?.message || '邮箱验证码发送失败'
    );
    emailCodeServer.value = '';
  }
};

const isGetEmailCodeDisabled = computed(() => {
  const email = emailForm.value.email;
  // 邮箱格式校验
  return (
    !/^([\w.-]+)@([\w-]+\.)+[\w-]{2,}$/.test(email) || emailCodeTimer.value > 0
  );
});

const isEmailOkDisabled = computed(() => {
  const email = emailForm.value.email;
  const code = emailForm.value.code;
  const valid = /^([\w.-]+)@([\w-]+\.)+[\w-]{2,}$/.test(email);
  return !email || !code || !valid;
});

const handleEmailOk = async () => {
  await emailFormRef.value?.validate();
  if (emailForm.value.code !== emailCodeServer.value) {
    Message.error('验证码错误');
    showEmailModal.value = false;
    resetEmailForm();
    return;
  }
  // 发送绑定邮箱请求
  try {
    const res = await axios.post('/api/sys/sysUser/bindEmail', {
      userId: userStore.id,
      email: emailForm.value.email,
      code: emailForm.value.code
    });
    if (res.data && res.data.code === 200) {
      Message.success('邮箱绑定成功');
      showEmailModal.value = false;
      resetEmailForm();
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      Message.error(res.data?.message || '邮箱绑定失败');
    }
  } catch (e: any) {
    Message.error(e?.response?.data?.message || e?.message || '邮箱绑定失败');
  }
};

const resetEmailForm = () => {
  emailForm.value = { email: '', code: '' };
  emailCodeServer.value = '';
  emailCodeTimer.value = 0;
  emailCodeInterval && clearInterval(emailCodeInterval);
  emailCodeInterval = null;
};

const fetchSecurityQuestion = async () => {
  try {
    const res = await axios.post('/api/sys/sysUser/viewThePassword', {
      userId: userStore.id
    });
    if (typeof res.data === 'string') {
      securityQuestion.value = res.data;
    } else if (res.data && typeof res.data === 'object') {
      securityQuestion.value = res.data.question || res.data.result || '';
    } else {
      securityQuestion.value = '';
    }
  } catch {
    securityQuestion.value = '';
  }
};

onMounted(() => {
  fetchSecurityQuestion();
});
</script>

<style scoped lang="less">
:deep(.arco-list-item) {
  border-bottom: none !important;

  .arco-typography {
    margin-bottom: 20px;
  }

  .arco-list-item-meta-avatar {
    margin-bottom: 1px;
  }

  .arco-list-item-meta {
    padding: 0;
  }
}

:deep(.arco-list-item-meta-content) {
  flex: 1;
  border-bottom: 1px solid var(--color-neutral-3);

  .arco-list-item-meta-description {
    display: flex;
    flex-flow: row;
    justify-content: space-between;

    .tip {
      color: rgb(var(--gray-6));
    }

    .operation {
      margin-right: 6px;
    }
  }
}
</style>
