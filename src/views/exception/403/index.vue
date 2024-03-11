<template>
  <div class="container">
    <Breadcrumb :items="['异常', '403']" />
    <div class="content">
      <a-result class="result" status="403" subtitle="无权限" />
      <a-button key="back" type="primary">返回首页</a-button>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<script lang="ts">
export default {
  name: '403'
};
</script>

<style scoped lang="less">
.container {
  height: calc(100% - 40px);
  padding: 0 20px 20px;

  :deep(.content) {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    background-color: var(--color-bg-1);
    border-radius: 4px;
  }
}
</style>
