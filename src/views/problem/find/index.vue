<template>
  <div class="container-f">
    <Breadcrumb :items="['题库', '找题']" />
    <div class="layout">
      <div class="layout-left-side">
        <a-row :gutter="[24, 12]">
          <a-col :span="23">
            <a-row>
              <a-col :span="16">
                <hot-spot-carousel />
              </a-col>
              <a-col :span="7" :offset="1">
                <sign-in />
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="23">
            <problem-table />
          </a-col>
        </a-row>
      </div>
      <div class="layout-right-side">
        <a-space size="medium" direction="vertical">
          <announcement />
          <images />
          <user-list />
        </a-space>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HotSpotCarousel from '@/views/problem/find/components/hot-spot-carousel.vue';
import ProblemTable from '@/views/problem/find/components/problem-table.vue';
import SignIn from '@/views/problem/find/components/sign-in.vue';
import Announcement from '@/views/problem/find/components/announcement.vue';
import Images from '@/views/problem/find/components/images.vue';
import UserList from '@/views/problem/find/components/user-list.vue';
</script>

<style scoped lang="less">
.container-f {
  padding: 0 20px 20px;
}

.layout {
  display: flex;
  justify-content: space-between;

  &-left-side {
    flex-basis: 75%;
  }

  &-right-side {
    flex-basis: 25%;
  }
}
</style>

<style lang="less" scoped>
// responsive
@media (max-width: @screen-lg) {
  .layout {
    flex-wrap: wrap;

    &-left-side {
      flex: 1;
      flex-basis: 100%;
      margin-bottom: 16px;
    }

    &-right-side {
      flex-basis: 100%;
    }
  }
}
</style>
