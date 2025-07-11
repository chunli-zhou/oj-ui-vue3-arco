<template>
  <a-card
    class="general-card"
    :header-style="{ paddingBottom: '18px' }"
    :body-style="{ paddingBottom: '12px' }"
  >
    <template #title>
      <a-space>
        <icon-thumb-up-fill style="font-size: 20px; color: #165dff" />
        帖子
      </a-space>
    </template>
    <a-list
      v-if="!loading"
      :max-height="300"
      :data="list"
      :bordered="false"
      hoverable
      @reach-bottom="handleLoadPost"
    >
      <template #item="{ item, index }">
        <a-list-item
          :key="index"
          class="content-list-item"
          action-layout="vertical"
          @click="handleClickItem(item)"
        >
          <a-list-item-meta :title="item.title">
            <template #avatar>
              <a-popover>
                <template #content>
                  <a-space size="medium">
                    <a-avatar :image-url="item.avatar" />
                    <a-space direction="vertical">
                      <a-typography-title bold style="font-size: 17px">
                        {{ item.creatorName }}
                      </a-typography-title>
                      <a-typography-paragraph
                        type="secondary"
                        style="width: 100px; font-size: 13px"
                        :ellipsis="{
                          rows: 1,
                          showTooltip: {
                            type: 'tooltip',
                            props: {
                              position: 'bottom'
                            }
                          }
                        }"
                      >
                        {{ item.introduce }}
                      </a-typography-paragraph>
                    </a-space>
                  </a-space>
                </template>
                <a-avatar shape="square" :image-url="item.avatar" />
              </a-popover>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
    <a-skeleton v-if="loading" :animation="true">
      <a-skeleton-line :rows="8" />
    </a-skeleton>
  </a-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { OjPostVo, Paging } from '@/api/gen-api';
import { useRoute } from 'vue-router';
import { Message } from '@arco-design/web-vue';
import router from '@/router';
import { OjThumbPostService } from '@/api/gen-api/services/OjThumbPostService.ts';

const list = ref<OjPostVo[]>([]);
const totalPage = ref();
const paging = ref<Paging>({
  pageNum: 1,
  pageSize: 10
});
const loading = ref(false);
const userId = useRoute().query.id as string;

const getPostList = () => {
  OjThumbPostService.getThumbPost(paging.value, userId)
    .then(res => {
      if (res.result.records) {
        res.result.records.forEach((item: any) => {
          if (item.avatar && !item.avatar.startsWith('http')) {
            item.avatar = '/api' + item.avatar;
          }
        });
        totalPage.value = res.result.totalPage;
        list.value.push(...res.result.records);
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

const handleLoadPost = () => {
  if (paging.value.pageNum >= totalPage.value) {
    Message.warning('没有更多了');
  } else {
    paging.value.pageNum++;
    getPostList();
  }
};

const handleClickItem = (item: OjPostVo) => {
  router.push({
    name: 'PostInfo',
    query: {
      postId: item.id
    }
  });
};
</script>

<style scoped lang="less">
.content-list {
  background-color: #fff;
  border-radius: 10px;

  &-item {
    transition: background-color 0.5s;
  }

  &-item:hover {
    color: #333;
    cursor: pointer;
    background-color: #f5f5f5;
    transition: background-color 0.3s;
  }
}
</style>
