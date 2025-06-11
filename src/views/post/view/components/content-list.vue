<template>
  <a-card style="border-radius: 10px">
    <a-list
      v-if="list.length > 0"
      class="content-list"
      :max-height="600"
      :data="list"
      :bordered="false"
      @reach-bottom="handleLoadPost"
    >
      <template #item="{ item, index }">
        <a-list-item
          :key="index"
          class="content-list-item"
          action-layout="vertical"
          @click="handleClickItem(item)"
        >
          <template #actions>
            <a-space>
              <div>
                <a-space size="mini">
                  <icon-eye />
                  <span style="font-size: 12px">
                    {{ item.viewNum }}
                  </span>
                </a-space>
              </div>
              <div>
                <a-space size="mini">
                  <icon-thumb-up />
                  <span style="font-size: 12px">
                    {{ item.thumbNum }}
                  </span>
                </a-space>
              </div>
              <div>
                <a-space size="mini">
                  <icon-star />
                  <span style="font-size: 12px">
                    {{ item.favourNum }}
                  </span>
                </a-space>
              </div>
            </a-space>
          </template>
          <template #extra>
            <span style="font-size: 12px">{{ item.createTime }}</span>
          </template>
          <a-list-item-meta :title="item.title">
            <template #description>
              <a-typography-text ellipsis>
                {{ item.content }}
              </a-typography-text>
            </template>
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
    <a-skeleton v-else animation>
      <a-space direction="vertical" :style="{ width: '100%' }" size="large">
        <a-skeleton-line
          :rows="5"
          :widths="['40%', '100%', '100%', '100%', '50%']"
        />
      </a-space>
    </a-skeleton>
  </a-card>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { OjPostService } from '@/api/gen-api/services/OjPostService.ts';
import { OjPostQueryRequest, type OjPostVo, Paging } from '@/api/gen-api';
import { Message } from '@arco-design/web-vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  zone: {
    type: String,
    default: 'synthesis'
  },
  tag: {
    type: String,
    default: ''
  }
});

watch(
  () => props.zone,
  () => {
    if (props.zone) {
      req.value.zone = props.zone;
      list.value = [];
      paging.value.pageNum = 1;
      getPostList();
    }
  }
);

const paging = ref<Paging>({
  pageNum: 1,
  pageSize: 10
});
const req = ref<OjPostQueryRequest>({
  title: '',
  zone: '',
  tags: []
});

const list = ref<OjPostVo[]>([]);
const totalPage = ref();

const getPostList = () => {
  OjPostService.page({ page: paging.value, req: req.value })
    .then(res => {
      if (res.result.records) {
        res.result.records.forEach((item: any) => {
          if (item.avatar && !item.avatar.startsWith('http')) {
            item.avatar = 'http://localhost:8996/api' + item.avatar;
          }
        });
        totalPage.value = res.result.totalPage;
        if (res.result.records.length > 0) {
          const clone = { ...res.result.records[0] };
          clone.id = 'clone_' + clone.id;
          res.result.records.splice(1, 0, clone);
        }
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

onMounted(() => {
  getPostList();
});

const router = useRouter();
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
