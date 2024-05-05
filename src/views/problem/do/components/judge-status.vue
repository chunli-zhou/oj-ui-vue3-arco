<template>
  <a-card class="general-card h-full" title="判题状态">
    <div class="spin">
      <a-spin dot>
        <template #tip>
          判题中
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
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const dots = ['.', '.', '.', ''];
const currentDot = ref(0);

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
