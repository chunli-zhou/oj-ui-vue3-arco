<template>
  <div class="container">
    <Breadcrumb :items="['异常页', '404']" />
    <div class="content">
      <a-result class="result" status="404" subtitle="找不到页面"></a-result>
      <div class="operation-row">
        <a-button key="again" style="margin-right: 16px">点击重试</a-button>
        <a-button key="back" type="primary">返回首页</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<script lang="ts">
export default {
  name: '404'
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
