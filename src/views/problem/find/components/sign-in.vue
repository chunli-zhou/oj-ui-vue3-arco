<template>
  <a-card class="general-card">
    <div class="flex items-center justify-center">签到</div>
    <transition>
      <div v-if="!signInFlag" class="flex items-center justify-center mt-12">
        <a-button class="signInBtn" type="primary" @click="handleClickSignIn">
          签到
        </a-button>
      </div>
      <div v-else class="flex items-center justify-center">
        <Lottie :animation-data="Animation"></Lottie>
      </div>
    </transition>
  </a-card>
</template>

<script lang="ts" setup>
import Lottie from '@/components/lottie/index.vue';
import Animation from '@/components/lottie/Animation.json';
import { storeToRefs } from 'pinia';
import { useSignInStore, useUserStore } from '@/store';
import { Notification } from '@arco-design/web-vue';

const signInStore = useSignInStore();
const userStore = useUserStore();
const { signInFlag } = storeToRefs(signInStore);
const handleClickSignIn = () => {
  signInStore.signInFlag = true;
  Notification.success({
    title: '来道题吧，' + userStore.realName,
    content: '在算法之旅的每一道挑战背后，都藏着通往智慧与成长的钥匙。',
    duration: 5000
  });
};
</script>

<style scoped lang="less">
.general-card {
  height: 240px;
  border-radius: 10px;
}

.general-card:hover {
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 10%);
}

.signInBtn {
  width: 100px;
  height: 50px;
  background: linear-gradient(135deg, #f2709c, #ff9472);
  border-radius: 12px;
}

.signInBtn:hover {
  background: linear-gradient(229deg, #f857a6, #ff5858);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
