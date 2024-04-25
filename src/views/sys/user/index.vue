<template>
  <div class="container">
    <Breadcrumb :items="['系统管理', '用户管理']" />
    <a-card>
      <user-table />
    </a-card>
  </div>
</template>

<script setup lang="ts">
import UserTable from '@/views/sys/user/components/user-table.vue';
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px;
}
</style>
