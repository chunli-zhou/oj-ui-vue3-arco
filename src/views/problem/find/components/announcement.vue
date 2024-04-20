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
    type: 'orangered',
    label: '活动',
    content: '内容最新优惠活动'
  },
  {
    type: 'cyan',
    label: '消息',
    content: '新增内容尚未通过审核，详情请点击查看。'
  },
  {
    type: 'blue',
    label: '通知',
    content: '当前产品试用期即将结束，如需续费请点击查看。'
  },
  {
    type: 'blue',
    label: '通知',
    content: '1月新系统升级计划通知'
  },
  {
    type: 'cyan',
    label: '消息',
    content: '新增内容已经通过审核，详情请点击查看。'
  },
  {
    type: 'blue',
    label: '通知',
    content: '当前产品试用期即将结束，如需续费请点击查看。'
  },
  {
    type: 'blue',
    label: '通知',
    content: '1月新系统升级计划通知'
  },
  {
    type: 'cyan',
    label: '消息',
    content: '新增内容已经通过审核，详情请点击查看。'
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
