import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import type { PluginOption } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import removeConsole from 'vite-plugin-remove-console';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import configCompressPlugin from './plugin/compress';
import configVisualizerPlugin from './plugin/visualizer';
import autoImportPlugin from './plugin/autoImport';

export function pluginsList(): PluginOption[] {
  return [
    vue(),
    autoImportPlugin(),
    VueI18nPlugin({
      runtimeOnly: true,
      compositionOnly: true,
      include: [resolve('locales/**')]
    }),
    vueJsx(), // jsx支持
    removeConsole(), // 移除console
    svgLoader({ svgoConfig: {} }), // svg组件化支持
    configCompressPlugin('gzip'), // 压缩
    configVisualizerPlugin('none') // 打包分析
  ];
}
