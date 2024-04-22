<template>
  <div class="container-do">
    <Breadcrumb :items="['题库', '做题']" />
    <a-split>
      <template #resize-trigger>
        <div class="trigger-vertical">
          <div class="trigger-vertical-line" />
        </div>
      </template>
      <template #first>
        <a-card class="general-card h-screen" title="题目详情" />
      </template>
      <template #second>
        <div>
          <a-split class="h-screen" direction="vertical">
            <template #resize-trigger>
              <div class="trigger-horizontal">
                <div class="line" />
              </div>
            </template>
            <template #first>
              <a-card class="general-card h-full" title="做题" />
            </template>
            <template #second>
              <a-card class="general-card h-full" title="判题状态" />
            </template>
          </a-split>
        </div>
      </template>
    </a-split>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';

const route = useRoute();
onMounted(() => {
  console.log(route.query.id);
});
</script>

<style lang="less" scoped>
.container-do {
  padding: 0 20px 20px 20px;
}

.general-card {
  border-radius: 10px;
}

.trigger-vertical {
  display: flex;
  position: relative;
  width: 3px;
  height: 100vh;
  flex-direction: column;

  &-line {
    flex: 1;
  }

  &-line:hover {
    background-color: rgb(var(--arcoblue-6));
  }
}

.trigger-horizontal {
  display: flex;
  position: relative;
  width: 100%;
  height: 3px;
  background-color: var(--color-bg-2);

  &-line {
    flex: 1;
  }

  &-line:hover {
    background-color: rgb(var(--arcoblue-6));
  }
}

.line {
  flex: 1;
}

.line:hover {
  background-color: rgb(var(--arcoblue-6));
}
</style>
