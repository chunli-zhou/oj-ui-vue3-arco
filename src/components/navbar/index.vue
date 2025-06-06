<template>
  <div class="navbar">
    <div class="left-side">
      <a-space>
        <img style="width: 36px" src="@/assets/logo.png" alt="加载失败" />
        <a-typography-title
          :style="{ margin: 0, fontSize: '18px' }"
          :heading="5"
        >
          Online Judge
        </a-typography-title>
        <icon-menu-fold
          v-if="!topMenu && appStore.device === 'mobile'"
          style="font-size: 22px; cursor: pointer"
          @click="toggleDrawerMenu"
        />
      </a-space>
    </div>
    <div class="center-side">
      <Menu v-if="topMenu" />
    </div>
    <ul class="right-side">
      <li>
        <a-input-search
          style="width: 180px"
          placeholder="搜索帖子"
          @click="handleOpenSearchModal"
        />
      </li>
      <li>
        <a-tooltip content="发个帖子">
          <a-button type="primary" @click="handleCreatePost">
            <template #icon>
              <icon-edit />
            </template>
            发帖
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip content="重新加载">
          <div class="nav-btn" @click="handleReload">
            <icon-sync />
          </div>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip content="源码">
          <a
            class="nav-btn"
            href="https://gitee.com/zhang-rui-xin/oj-ui-vue3-arco"
            target="_blank"
          >
            <icon-github />
          </a>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip content="查看文档">
          <a class="nav-btn" href="http://www.7122teamblog.top" target="_blank">
            <icon-book />
          </a>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip :content="isFullscreen ? '退出全屏' : '全屏'">
          <div class="nav-btn" @click="toggleFullScreen">
            <icon-fullscreen-exit v-if="isFullscreen" />
            <icon-fullscreen v-else />
          </div>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip content="应用配置">
          <div class="nav-btn" @click="setVisible">
            <icon-settings />
          </div>
        </a-tooltip>
      </li>
      <li>
        <a-dropdown trigger="click">
          <a-avatar style="margin-right: 8px; cursor: pointer" :size="32">
            <img :src="userStore.avatar" />
          </a-avatar>
          <template #content>
            <a-doption>
              <a-space @click="switchRoles">
                <icon-tag />
                <span>切换权限</span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space
                @click="
                  $router.push({
                    name: 'UserInfo',
                    query: { id: userStore.id }
                  })
                "
              >
                <icon-user />
                <span>用户信息</span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="$router.push({ name: 'UserSetting' })">
                <icon-settings />
                <span>用户设置</span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="handleLogout">
                <icon-export />
                <span>退出登录</span>
              </a-space>
            </a-doption>
          </template>
        </a-dropdown>
      </li>
    </ul>
  </div>
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
      <search-post-list
        ref="searchRef"
        @close-modal="handleCloseModalByChild"
      />
    </a-space>
    <template #footer>
      <a-button @click="handleCancelSearchModal">取消</a-button>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
import { computed, inject, ref, unref } from 'vue';
import { Message } from '@arco-design/web-vue';
import { useFullscreen } from '@vueuse/core';
import { useAppStore, useUserStore } from '@/store';
import useUser from '@/hooks/useUser';
import Menu from '@/components/menu/index.vue';
import { useRouter } from 'vue-router';
import SearchPostList from '@/components/navbar/components/search-post-list.vue';

const userStore = useUserStore();
const appStore = useAppStore();
const { logout } = useUser();
const { isFullscreen, toggle: toggleFullScreen } = useFullscreen();
const topMenu = computed(() => appStore.topMenu && appStore.menu);
const setVisible = () => {
  appStore.updateSettings({ globalSettings: true });
};
const handleReload = () => {
  window.location.reload();
};
const handleLogout = () => {
  logout();
};
const switchRoles = async () => {
  const res = await userStore.switchRoles();
  Message.success(res as string);
};
const toggleDrawerMenu = inject('toggleDrawerMenu') as () => void;

const router = useRouter();
const handleCreatePost = () => {
  router.push({ name: 'CreatePost' });
};

const searchModalVisible = ref(false);
const postTitle = ref('');
const searchRef = ref<any>();
// 执行搜索
const handleSearch = () => {
  searchRef.value.searchPost(unref(postTitle));
};
// 点击帖子，关闭搜索框
const handleCloseModalByChild = (flag: boolean) => {
  if (flag) {
    searchModalVisible.value = false;
  }
};
const handleCancelSearchModal = () => {
  searchModalVisible.value = false;
};
const handleOpenSearchModal = () => {
  searchModalVisible.value = true;
};
</script>

<style scoped lang="less">
.navbar {
  display: flex;
  justify-content: space-between;
  height: 100%;
  background-color: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);
}

.left-side {
  display: flex;
  align-items: center;
  padding-left: 20px;
}

.center-side {
  flex: 1;
}

.right-side {
  display: flex;
  padding-right: 20px;
  list-style: none;

  :deep(.locale-select) {
    border-radius: 20px;
  }

  li {
    display: flex;
    align-items: center;
    padding: 0 4px;
  }

  a {
    color: var(--color-text-1);
    text-decoration: none;
  }

  .nav-btn {
    position: relative;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    // transition: all 0.1s cubic-bezier(0, 0, 1, 1);
    font-size: 18px;
    font-weight: 400;
    line-height: 1.5715;
    color: rgb(var(--gray-8));
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    border-radius: var(--border-radius-circle);
    outline: none;

    &:hover {
      border: 1px solid rgb(var(--gray-2));
    }
  }

  .trigger-btn,
  .ref-btn {
    position: absolute;
    bottom: 14px;
  }

  .trigger-btn {
    margin-left: 14px;
  }
}
</style>

<style lang="less">
.message-popover {
  .arco-popover-content {
    margin-top: 0;
  }
}
</style>
