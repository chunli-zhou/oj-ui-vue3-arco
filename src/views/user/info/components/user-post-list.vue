<template>
  <a-list
    v-if="!searchLoading"
    class="content-list"
    :max-height="300"
    :data="list.filter(item => item.creatorName === filterNickName)"
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
                  <a-avatar :image-url="'/api' + item.avatar" />
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
              <a-avatar shape="square" :image-url="'/api' + item.avatar" />
            </a-popover>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
  <a-skeleton v-else-if="searchLoading" animation>
    <a-space direction="vertical" :style="{ width: '100%' }" size="large">
      <a-skeleton-line
        :rows="5"
        :widths="['40%', '100%', '100%', '100%', '50%']"
      />
    </a-space>
  </a-skeleton>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';
import { OjPostService } from '@/api/gen-api/services/OjPostService.ts';
import { OjPostQueryRequest, type OjPostVo, Paging } from '@/api/gen-api';
import { Message } from '@arco-design/web-vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/store';
import { SysUserService } from '@/api/gen-api/services/SysUserService.ts';

const props = defineProps<{ creatorId?: string }>();

const userStore = useUserStore();
const list = ref<OjPostVo[]>([]);
const totalPage = ref();
const paging = ref<Paging>({
  pageNum: 1,
  pageSize: 10
});
const req = ref<OjPostQueryRequest>({
  title: '',
  userId: useRoute().query.id as string
});
const filterNickName = ref('省委沙瑞金'); // 默认值，后面会被接口返回值覆盖

const getPostList = () => {
  OjPostService.page({ page: paging.value, req: req.value })
    .then(res => {
      if (res.result.records) {
        totalPage.value = res.result.totalPage;
        list.value.push(...res.result.records);
      }
    })
    .finally(() => {
      searchLoading.value = false;
    });
};

const searchPost = (postTitle: string) => {
  paging.value.pageNum = 1;
  req.value.title = postTitle;
  list.value = [];
  searchLoading.value = true;
  getPostList();
};
defineExpose({
  searchPost
});

const handleLoadPost = () => {
  if (paging.value.pageNum >= totalPage.value) {
    Message.warning('没有更多了');
  } else {
    paging.value.pageNum++;
    getPostList();
  }
};

const emit = defineEmits(['closeModal']);
const handleCloseModal = () => {
  emit('closeModal', true);
};
const searchLoading = ref(false);
const router = useRouter();
const handleClickItem = (item: OjPostVo) => {
  handleCloseModal();
  router.push({
    name: 'PostInfo',
    query: {
      postId: item.id
    }
  });
};

onMounted(async () => {
  let creatorId = props.creatorId;
  // 如果没有传递props，则尝试用当前登录用户id
  if (!creatorId) {
    creatorId = userStore.id;
  }
  if (creatorId) {
    const res = await SysUserService.getInfoById(String(creatorId));
    if (res.result && res.result.nickName) {
      filterNickName.value = res.result.nickName;
    }
  }
  if (!userStore.id) {
    await userStore.info();
  }
});
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
