<template>
  <a-card class="general-card" title="已做题目">
    <template #extra>
      <a-link>查看所有</a-link>
    </template>
    <a-table
      class="problem-table"
      row-key="id"
      bordered
      :columns="columns"
      :data="data.problemList"
      :loading="loading"
      :pagination="pagination"
      @page-change="handlePageNumberChange"
      @page-size-change="handlePageSizeChange"
    >
      <template #Title="{ record }">
        <a-link @click="() => handleDoProblem(record.submitId, record.id)">
          {{ record.title }}
        </a-link>
      </template>
      <template #Tags="{ rowIndex }">
        <a-space wrap>
          <span
            v-for="tag in data.problemList[rowIndex].tags"
            :key="tag"
            style="text-align: center"
          >
            <a-tag>
              {{ tag }}
            </a-tag>
          </span>
        </a-space>
      </template>
      <template #Difficulty="{ record }">
        <a-tag v-if="record.difficulty === '简单'" color="green">
          {{ record.difficulty }}
        </a-tag>
        <a-tag v-else-if="record.difficulty === '中等'" color="orange">
          {{ record.difficulty }}
        </a-tag>
        <a-tag v-else color="red">
          {{ record.difficulty }}
        </a-tag>
      </template>
      <template #ThroughRate="{ record }">
        <a-statistic
          :value="record.submitNum / record.acceptedNum"
          :precision="2"
          :value-style="{ color: '#0fbf60', fontSize: '1.0em' }"
        >
          <template #suffix>%</template>
        </a-statistic>
      </template>
    </a-table>

    <!--    <a-result status="404">
          <template #subtitle>无数据</template>
        </a-result>-->
  </a-card>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { OjProblemService, Paging } from '@/api/gen-api';
import { PaginationProps, TableColumnData } from '@arco-design/web-vue';
import { OjProblemPageVo } from '@/api/gen-api/models/problem/OjProblemPageVo.ts';
import { useRouter } from 'vue-router';

const columns: TableColumnData[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    cellStyle: {
      display: 'none'
    }
  },
  {
    title: '标题',
    dataIndex: 'title',
    align: 'center',
    slotName: 'Title'
  },
  {
    title: '标签',
    dataIndex: 'tags',
    slotName: 'Tags',
    align: 'center'
  },
  {
    title: '难度',
    dataIndex: 'difficulty',
    align: 'center',
    slotName: 'Difficulty'
  },
  {
    title: '通过率',
    dataIndex: 'throughRate',
    align: 'center',
    slotName: 'ThroughRate'
  }
];
/**
 *  改变条数
 * @param pageSize
 */
const handlePageSizeChange = (pageSize: number) => {
  paging.pageSize = pageSize;
  pageData();
};
/**
 *  改变当前页码
 * @param pageNumber
 */
const handlePageNumberChange = (pageNumber: number) => {
  paging.pageNum = pageNumber;
  pageData();
};

const loading = ref(false);

/**
 *  数据结果集
 */
const data = reactive({
  problemList: [] as OjProblemPageVo[]
});
/**
 *  分页查询底部内容
 */
const pagination = reactive<PaginationProps>({
  showTotal: true,
  showPageSize: true,
  pageSizeOptions: [5, 10, 50, 100]
});

/**
 * 查询数据
 */
const pageData = async () => {
  loading.value = true;
  await OjProblemService.getSubProblemByUserId(paging)
    .then(res => {
      const result = res.result;
      data.problemList = result.records;
      pagination.total = result.totalRow;
      pagination.current = paging.pageNum;
      pagination.pageSize = paging.pageSize;
    })
    .finally(() => {
      loading.value = false;
    });
};
/**
 *  分页查询页码和条数
 */
const paging: Paging = reactive({
  pageNum: 1,
  pageSize: 5
});

onMounted(() => {
  /** 调用 */
  pageData();
});

const router = useRouter();

/**
 * 跳转到做题页面
 */
const handleDoProblem = (submitId: any, problemId: any) => {
  router.push({
    name: 'submitInfo',
    query: {
      id: submitId,
      problemId: problemId
    }
  });
};
</script>

<style scoped lang="less">
.problem {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--color-bg-2);

  &-form {
    flex: 1;
    margin: 20px 0;
  }

  &-table {
    flex: 1;
    margin: 20px 0;
  }
}
</style>
