<template>
  <a-card class="general-card h-full" title="判题状态">
    <div class="spin">
      <a-spin v-if="visible" dot>
        <template #tip>
          正在提交判题
          <transition-group name="fade" tag="span" class="dot-spinner">
            <span
              v-for="(dot, index) in dots"
              :key="index"
              :class="{ active: index < currentDot }"
            >
              {{ dot }}
            </span>
          </transition-group>
        </template>
        <template #icon></template>
      </a-spin>
      <div>
        <a-button v-if="visible" type="primary" @click="startJudge">
          开始判题
        </a-button>
        <a-progress
          v-if="!visible"
          animation
          :stroke-width="2"
          type="circle"
          :percent="judgePercent"
        />
      </div>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const dots = ['.', '.', '.', ''];
const visible = ref(true);
const currentDot = ref(0);
const judgePercent = ref(0);

const startJudge = () => {
  visible.value = !visible.value;
  setInterval(() => {
    judgePercent.value = judgePercent.value + 0.5;
  }, 1000);
};

onMounted(() => {
  const intervalId = setInterval(() => {
    currentDot.value = (currentDot.value + 1) % dots.length;
  }, 500);

  // 清理定时器，以防内存泄漏
  onUnmounted(() => clearInterval(intervalId));
});
</script>

<style scoped lang="less">
:deep(.arco-card-body) {
  height: 70%;
}

.spin {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.dot-spinner {
  display: inline-block;
  white-space: nowrap;
}

.dot-spinner span {
  opacity: 0;
  transition: opacity 0.5s;
}

.dot-spinner span.active {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
