<template>
  <a-card class="general-card" title="已做题目">
    <div ref="tableContainer" class="table-container" @scroll="handleScroll">
      <a-table
        v-if="!loading"
        :data="problemList"
        :pagination="false"
        :bordered="false"
        :scroll="{ y: 400 }"
        :loading="loading"
      >
        <template #columns>
          <a-table-column title="标题" data-index="title" align="center">
            <template #cell="{ record }">
              <div class="content-cell">
                <a-typography-paragraph>
                  {{ record.title }}
                </a-typography-paragraph>
              </div>
            </template>
          </a-table-column>
          <a-table-column title="题干" data-index="content" align="center">
            <template #cell="{ record }">
              <div class="content-cell">
                <a-typography-paragraph
                  :ellipsis="{
                    rows: 1,
                    showTooltip: true
                  }"
                >
                  {{ truncateContent(record.content) }}
                </a-typography-paragraph>
              </div>
            </template>
          </a-table-column>
          <a-table-column title="标签" data-index="tags" align="center">
            <template #cell="{ record }">
              <div class="content-cell">
                <a-space>
                  <a-tag v-for="tag in record.tags" :key="tag" color="blue">
                    {{ tag }}
                  </a-tag>
                </a-space>
              </div>
            </template>
          </a-table-column>
          <a-table-column
            title="难度"
            data-index="difficulty"
            align="center"
            width="100"
          >
            <template #cell="{ record }">
              <div class="content-cell">
                <a-tag :color="getDifficultyColor(record.difficulty)">
                  {{ getDifficultyLabel(record.difficulty) }}
                </a-tag>
              </div>
            </template>
          </a-table-column>
        </template>
      </a-table>
      <a-result v-else status="404">
        <template #subtitle>无数据</template>
      </a-result>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { OjProblemService } from '@/api/gen-api/services/OjProblemService';
import { Paging } from '@/api/gen-api';
import { Message } from '@arco-design/web-vue';

// 定义问题列表和状态
const problemList = ref([]);
const loading = ref(false);
const totalPage = ref(1);
const paging = ref<Paging>({
  pageNum: 1,
  pageSize: 5
});

// 截断内容
const truncateContent = (content: string) => {
  return content.length > 15 ? content.slice(0, 15) + '...' : content;
};

// 加载数据
const getProblems = () => {
  loading.value = true;
  OjProblemService.listById(paging.value)
    .then(res => {
      if (res.result.records) {
        totalPage.value = res.result.totalPage;
        problemList.value.push(...res.result.records);
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

// 滚动处理
const handleScroll = (event: Event) => {
  const { scrollHeight, scrollTop, clientHeight } = event.target as HTMLElement;

  // 向下滚动到底部时加载更多
  if (scrollHeight - scrollTop - clientHeight < 50) {
    if (paging.value.pageNum >= totalPage.value) {
      Message.warning('没有更多了');
    } else {
      paging.value.pageNum++;
      getProblems();
    }
  }
};

// 难度等级颜色映射
const getDifficultyColor = (difficulty: number) => {
  const colors = ['green', 'orange', 'red'];
  return colors[difficulty] || 'blue';
};

// 难度等级标签映射
const getDifficultyLabel = (difficulty: number) => {
  const labels = ['简单', '中等', '困难'];
  return labels[difficulty] || '未知';
};

// 初始加载
onMounted(() => getProblems());
</script>

<style scoped lang="less">
.general-card {
  height: 100%;

  .table-container {
    height: calc(100vh - 300px);
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  :deep(.arco-table) {
    .arco-table-tr {
      height: 60px;
    }

    .arco-table-td {
      padding: 12px 16px;
    }

    .content-cell {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      min-height: 36px;

      .arco-typography {
        margin-bottom: 0;
        line-height: 1.5;
        text-align: center;
      }

      .arco-space {
        justify-content: center;
        width: 100%;
      }
    }

    .arco-table-th {
      text-align: center;
      background-color: var(--color-fill-2);

      &-title {
        font-weight: 500;
      }
    }
  }
}
</style>
