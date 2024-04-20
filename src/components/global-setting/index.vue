<template>
  <div v-if="!appStore.navbar" class="fixed-settings" @click="setVisible">
    <a-button type="primary">
      <template #icon>
        <icon-settings />
      </template>
    </a-button>
  </div>
  <a-drawer
    :width="410"
    unmount-on-close
    :visible="visible"
    @ok="copySettings"
    @cancel="cancel"
  >
    <template #title>应用配置</template>
    <a-alert type="warning">
      当前更改仅是实时预览配置效果。要真正作用于项目，点击下方的「复制配置」按钮，将配置粘贴到
      src/config/settings.ts 中即可。
    </a-alert>
    <Block :options="contentOpts" title="内容区域" />
    <Block :options="othersOpts" title="其他设置" />
    <template #footer>
      <a-button type="primary" style="margin: 0" shape="round" long>
        复制配置
      </a-button>
    </template>
  </a-drawer>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Message } from '@arco-design/web-vue';
import { useI18n } from 'vue-i18n';
import { useClipboard } from '@vueuse/core';
import { useAppStore } from '@/store';
import Block from './block.vue';

const emit = defineEmits(['cancel']);

const appStore = useAppStore();
const { t } = useI18n();
const { copy } = useClipboard();
const visible = computed(() => appStore.globalSettings);
const contentOpts = computed(() => [
  { name: 'settings.navbar', key: 'navbar', defaultVal: appStore.navbar },
  {
    name: 'settings.menu',
    key: 'menu',
    defaultVal: appStore.menu
  },
  {
    name: 'settings.topMenu',
    key: 'topMenu',
    defaultVal: appStore.topMenu
  },
  { name: 'settings.footer', key: 'footer', defaultVal: appStore.footer },
  { name: 'settings.tabBar', key: 'tabBar', defaultVal: appStore.tabBar },
  {
    name: 'settings.menuWidth',
    key: 'menuWidth',
    defaultVal: appStore.menuWidth,
    type: 'number'
  }
]);
const othersOpts = computed(() => [
  {
    name: 'settings.colorWeak',
    key: 'colorWeak',
    defaultVal: appStore.colorWeak
  }
]);

const cancel = () => {
  appStore.updateSettings({ globalSettings: false });
  emit('cancel');
};
const copySettings = async () => {
  const text = JSON.stringify(appStore.$state, null, 2);
  await copy(text);
  Message.success(t('settings.copySettings.message'));
};
const setVisible = () => {
  appStore.updateSettings({ globalSettings: true });
};
</script>

<style scoped lang="less">
.fixed-settings {
  position: fixed;
  top: 280px;
  right: 0;

  svg {
    font-size: 18px;
    vertical-align: -4px;
  }

  .arco-drawer-footer > .arco-btn {
    margin-left: 0;
  }
}
</style>
