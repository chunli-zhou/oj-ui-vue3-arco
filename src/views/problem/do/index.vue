<template>
  <div class="container">
    <Breadcrumb :items="['题库', '做题']" />

    <!--    <a-row :gutter="[6, 12]">-->
    <!--      <a-col :span="12">-->
    <!--        <a-card class="general-card h-screen" title="题目详情" />-->
    <!--      </a-col>-->
    <!--      <a-col :span="12">-->
    <!--        <div class="h-screen">-->
    <!--          <div class="h-3/5">-->
    <!--            <a-card class="general-card h-full" title="做题" />-->
    <!--          </div>-->
    <!--          <div class="h-2/5">-->
    <!--            <a-card class="general-card h-full" title="判题状态" />-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </a-col>-->
    <!--    </a-row>-->
    <a-grid :cols="3" :colGap="12" :rowGap="16">
      <a-grid-item class="demo-item">item</a-grid-item>
      <a-grid-item class="demo-item">item</a-grid-item>
      <a-grid-item class="demo-item">item</a-grid-item>
      <a-grid-item class="demo-item" :offset="1">item | offset - 1</a-grid-item>
    </a-grid>
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

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}
</style>
