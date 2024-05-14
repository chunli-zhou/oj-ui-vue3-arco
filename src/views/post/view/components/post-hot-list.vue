<template>
  <a-card style="border-radius: 10px">
    <template #title>
      <a-space>
        <icon-bookmark style="color: #ff783b" />
        文章榜
      </a-space>
    </template>
    <a-list size="small" :bordered="false" :split="false" hoverable>
      <a-list-item class="list-item">
        <a-row :gutter="24">
          <a-col :span="2">
            <a-typography-text bold type="danger">1</a-typography-text>
          </a-col>
          <a-col :span="20">
            <a-typography-text ellipsis>
              是时候放弃 Java 序列化了！！
            </a-typography-text>
          </a-col>
        </a-row>
      </a-list-item>
      <a-list-item class="list-item">
        <a-row :gutter="24">
          <a-col :span="2">
            <a-typography-text bold type="warning">2</a-typography-text>
          </a-col>
          <a-col :span="20">
            <a-typography-text ellipsis>
              你还在使用websocket实现实时消息推送吗？
            </a-typography-text>
          </a-col>
        </a-row>
      </a-list-item>
      <a-list-item class="list-item">
        <a-row :gutter="24">
          <a-col :span="2">
            <a-typography-text type="primary">3</a-typography-text>
          </a-col>
          <a-col :span="20">
            <a-typography-text ellipsis>
              利用 console.log 能玩出什么厉害的花活？
            </a-typography-text>
          </a-col>
        </a-row>
      </a-list-item>
      <a-list-item class="list-item">
        <a-row :gutter="24">
          <a-col :span="2">
            <a-typography-text>4</a-typography-text>
          </a-col>
          <a-col :span="20">
            <a-typography-text ellipsis>
              面试官问我：自己写String类，包名也是java.lang，这个类能编译成功吗，能运行成功吗
            </a-typography-text>
          </a-col>
        </a-row>
      </a-list-item>
      <a-list-item class="list-item">
        <a-row :gutter="24">
          <a-col :span="2">
            <a-typography-text>5</a-typography-text>
          </a-col>
          <a-col :span="20">
            <a-typography-text ellipsis>
              为了NullPointerException，你知道Java到底做了多少努力吗？
            </a-typography-text>
          </a-col>
        </a-row>
      </a-list-item>
    </a-list>
  </a-card>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.list-item {
  cursor: pointer;
}
</style>
