<template>
  <div class="container">
    <Breadcrumb :items="['题目管理']" />
    <br />
    题目管理页
  </div>
</template>

<script setup lang="ts"></script>

<script lang="ts">
export default {
  name: 'Problem'
};
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px;
}
</style>
