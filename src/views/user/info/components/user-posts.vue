<template>
  <a-card class="general-card" title="发布的帖子">
    <template #extra>
      <a-link @click="searchModalVisible = true">搜一下</a-link>
    </template>
    <user-post-list />
  </a-card>
  <a-modal :visible="searchModalVisible" @cancel="handleCancelSearchModal">
    <template #title>搜索帖子</template>
    <a-space direction="vertical" fill>
      <a-input-search
        v-model="postTitle"
        size="large"
        placeholder="请输入标题以搜索"
        @search="handleSearch"
        @keydown.enter="handleSearch"
      />
      <user-post-list ref="searchRef" @close-modal="handleCloseModalByChild" />
    </a-space>
    <template #footer>
      <a-button @click="handleCancelSearchModal">取消</a-button>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, unref } from 'vue';
import UserPostList from '@/views/user/info/components/user-post-list.vue';

const searchRef = ref<any>();

const postTitle = ref('');
const searchModalVisible = ref(false);
const handleCancelSearchModal = () => {
  searchModalVisible.value = false;
};
const handleSearch = () => {
  searchRef.value.searchPost(unref(postTitle));
};
// 点击帖子，关闭搜索框
const handleCloseModalByChild = (flag: boolean) => {
  if (flag) {
    searchModalVisible.value = false;
  }
};
</script>

<style scoped lang="less">
:deep(.arco-card-body) {
  min-height: 128px;
  padding-bottom: 0;
}

.my-project {
  &-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  &-title {
    margin-top: 0 !important;
    margin-bottom: 18px !important;
  }

  &-list {
    display: flex;
    justify-content: space-between;
  }

  &-item {
    // padding-right: 16px;
    margin-bottom: 16px;

    &:last-child {
      padding-right: 0;
    }
  }
}
</style>
