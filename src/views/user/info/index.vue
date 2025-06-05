<template>
  <div class="container-i">
    <Breadcrumb :items="['个人中心', '用户信息']" />
    <UserInfoHeader />
    <div class="content">
      <div class="content-left">
        <a-grid :cols="24" :col-gap="16" :row-gap="16">
          <a-grid-item :span="24">
            <user-posts />
          </a-grid-item>
          <a-grid-item :span="24">
            <has-do-problems />
          </a-grid-item>
        </a-grid>
      </div>
      <div class="content-right">
        <a-grid :cols="24" :row-gap="16">
          <a-grid-item :span="24">
            <thumb-posts />
          </a-grid-item>
          <a-grid-item class="panel" :span="24">
            <favour-posts />
          </a-grid-item>
        </a-grid>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import UserInfoHeader from './components/user-info-header.vue';
import UserPosts from '@/views/user/info/components/user-posts.vue';
import HasDoProblems from '@/views/user/info/components/has-do-problems.vue';
import ThumbPosts from '@/views/user/info/components/thumb-posts.vue';
import FavourPosts from '@/views/user/info/components/favour-posts.vue';
</script>

<script lang="ts">
export default {
  name: 'Info'
};
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px;
}

.content {
  display: flex;
  gap: 16px;
  margin-top: 12px;

  &-left {
    flex: 1;
    overflow: hidden;
    // background-color: var(--color-bg-2);

    :deep(.arco-tabs-nav-tab) {
      margin-left: 16px;
    }
  }

  &-right {
    width: 332px;
  }

  .tab-pane-wrapper {
    padding: 0 16px 16px;
  }
}
</style>

<style scoped lang="less">
.container-i {
  padding: 0 20px 20px;
}

.content {
  box-sizing: border-box;
  display: flex;
  gap: 16px;

  /* 添加以下样式使内容区域占满宽度 */
  width: 100%;
  margin-top: 12px;

  &-left {
    /* 确保内容区域占满可用空间 */
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;

    :deep(.arco-tabs-nav-tab) {
      margin-left: 16px;
    }
  }

  &-right {
    width: 332px;
  }

  .tab-pane-wrapper {
    padding: 0 16px 16px;
  }
}

/* 网格项占满宽度 */
:deep(.arco-grid-item) {
  width: 100%;
}

/* 移动端适配 */
.mobile {
  .content {
    display: block;

    &-left {
      margin-right: 0;
      margin-bottom: 16px;
    }

    &-right {
      width: 100%;
    }
  }
}
</style>
