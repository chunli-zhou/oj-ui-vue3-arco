<template>
  <a-card style="border-radius: 10px">
    <template #title>
      <a-space>
        <icon-bookmark style="color: #ff783b" />
        文章榜
      </a-space>
    </template>
    <a-list
      v-if="!loading"
      size="small"
      :bordered="false"
      :split="false"
      hoverable
    >
      <a-list-item
        v-for="(item, index) in hotPost"
        :key="index"
        class="list-item"
        @click="handleToPostDetail(item.id)"
      >
        <a-row :gutter="10">
          <a-col :span="2">
            <a-typography-text bold :type="getType(index + 1)">
              {{ index + 1 }}
            </a-typography-text>
          </a-col>
          <a-col :span="22">
            <a-typography-text ellipsis="true">
              {{ item.title }}
            </a-typography-text>
          </a-col>
        </a-row>
      </a-list-item>
    </a-list>
    <a-skeleton v-else animation>
      <a-space direction="vertical" :style="{ width: '100%' }" size="large">
        <a-skeleton-line :rows="5" />
      </a-space>
    </a-skeleton>
  </a-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { OjPostSimpleVo } from '@/api/gen-api';
import { OjPostService } from '@/api/gen-api/services/OjPostService.ts';
import { useRouter } from 'vue-router';

const hotPost = ref<OjPostSimpleVo[]>([]);
const loading = ref(false);
onMounted(() => {
  loading.value = true;
  OjPostService.getFiveHotPost()
    .then(res => {
      hotPost.value = res.result;
    })
    .finally(() => {
      loading.value = false;
    });
});
const getType = (index: number) => {
  if (index == 1) {
    return 'danger';
  } else if (index == 2) {
    return 'warning';
  } else if (index == 3) {
    return 'primary';
  } else {
    return 'default';
  }
};
const router = useRouter();
const handleToPostDetail = (id: number) => {
  router.push({
    name: 'PostInfo',
    query: {
      postId: id
    }
  });
};
</script>

<style scoped lang="less">
.list-item {
  cursor: pointer;
}
</style>
