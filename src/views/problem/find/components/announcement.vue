<template>
  <a-card class="general-card" hoverable title="公告">
    <template #extra>
      <a-link>查看更多</a-link>
    </template>
    <a-scrollbar style="height: 250px; overflow: auto">
      <a-space direction="vertical">
        <div v-for="(item, idx) in list" :key="idx" class="item">
          <a-space>
            <a-tag :color="item.type" size="small">{{ item.label }}</a-tag>
            <a-link style="color: #4e5969">
              {{ item.content }}
            </a-link>
          </a-space>
        </div>
      </a-space>
    </a-scrollbar>
  </a-card>
</template>

<script setup lang="ts">
const list = [
  {
    type: 'blue',
    label: '功能',
    content: '✨ 帖子评论功能即将上线'
  },
  {
    type: 'orangered',
    label: '修复',
    content: '🐛 题目编辑 bug 已修复 2024-04-08'
  },
  {
    type: 'orangered',
    label: '修复',
    content: '🐛 组件库样式问题 已修复 2024-04-21'
  },
  {
    type: 'orangered',
    label: '修复',
    content: '🐛 帖子点赞、收藏 bug 已修复 2024-05-18'
  },
  {
    type: 'blue',
    label: '功能',
    content: '✨ 题目评论功能 已上线'
  },
  {
    type: 'cyan',
    label: '消息',
    content: '🆕 如有任何建议，请联系管理员：123456789@qq.com'
  }
];
</script>

<style scoped lang="less">
.general-card {
  height: 350px;
  border-radius: 10px;
}

.general-card:hover {
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}
</style>
