<template>
  <a-card :title="props.post.title"></a-card>
</template>

<script setup lang="ts">
import { OjPostVo } from '@/api/gen-api';

const props = defineProps<{
  post: OjPostVo;
}>();
</script>

<style scoped lang="less"></style>
