<template>
  <div ref="postInfoRef" class="container-info">
    <Breadcrumb :items="['帖子', '详情']" />
    <a-row :gutter="10">
      <a-col :span="1">
        <post-actions :post-info="postInfo" />
      </a-col>
      <a-col flex="1">
        <post-detail
          ref="postDetailRef"
          :post-info="postInfo"
          @catalog-change="handleGetCatalog"
        />
      </a-col>
      <a-col :span="4">
        <a-space direction="vertical">
          <a-affix :offset-top="100">
            <user-info-card :post-info="postInfo" />
          </a-affix>
          <a-affix :offset-top="250">
            <a-card title="目录">
              <a-anchor
                :scroll-container="postInfoRef"
                smooth
                :change-hash="false"
              >
                <template v-for="(header, index) in headers" :key="index">
                  <a-anchor-link
                    :href="'#' + header.text"
                    :title="header.text"
                  />
                </template>
              </a-anchor>
            </a-card>
          </a-affix>
        </a-space>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import PostDetail from '@/views/post/info/components/post-detail.vue';
import { OjPostService } from '@/api/gen-api/services/OjPostService.ts';
import { OjPostVo } from '@/api/gen-api';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import UserInfoCard from '@/views/post/info/components/user-info-card.vue';
import { HeadList } from 'md-editor-v3';
import { nanoid } from 'nanoid';
import PostActions from '@/views/post/info/components/post-actions.vue';

const postInfoRef = ref<HTMLElement | null>(null);
const postInfo = ref<OjPostVo>({
  avatar: ''
});
const postDetailRef = ref();
const route = useRoute();
const postId = route.query.postId;

const getPostInfo = (postId: number) => {
  OjPostService.getInfo(String(postId)).then(res => {
    if (res.result) {
      postInfo.value = res.result;
    }
  });
};

interface Head {
  id: string;
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

const headers = ref<Head[]>([]);
const handleGetCatalog = (titleList: HeadList[]) => {
  // TODO: 实现子目录
  headers.value = titleList.map(item => {
    return {
      id: nanoid(),
      text: item.text,
      level: item.level
    };
  });
};

onMounted(() => {
  getPostInfo(postId);
});
</script>

<style scoped lang="less">
.container-info {
  padding: 0 20px 20px;
}
</style>
