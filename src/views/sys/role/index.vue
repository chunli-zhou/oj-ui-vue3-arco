<template>
  <div class="container">
    <Breadcrumb :items="['系统管理', '角色管理']" />
    <a-card>
      <role-table />
    </a-card>
  </div>
</template>

<script setup lang="ts">
import RoleTable from '@/views/sys/role/components/role-table.vue';
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px;
}
</style>
