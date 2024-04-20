<template>
  <div class="container">做题页面</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';

const route = useRoute();
onMounted(() => {
  console.log(route.query.id);
});
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}
</style>
