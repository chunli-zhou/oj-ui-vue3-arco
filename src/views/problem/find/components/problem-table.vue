<template>
  <a-card class="general-card problem">
    <a-form
      class="problem-form"
      :model="queryReq"
      :label-col-props="{ span: 6 }"
      :wrapper-col-props="{ span: 18 }"
      label-align="left"
    >
      <a-row :gutter="10">
        <a-col :span="6">
          <a-form-item field="title" label="标题">
            <a-input v-model="queryReq.title" placeholder="请输入标题" />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item field="tags" label="标签">
            <a-input-tag
              v-model="queryReq.tags"
              placeholder="请输入标签"
              allow-clear
            />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item field="difficulty" label="题目难度">
            <a-select
              v-model="queryReq.difficulty"
              :options="contentTypeOptions"
              placeholder="请选择题目难度"
              allow-clear
            />
          </a-form-item>
        </a-col>
        <a-col :span="1">
          <a-space size="mini">
            <a-button type="primary" @click="pageData">查询</a-button>
            <a-tooltip content="重置">
              <a-button type="primary" status="danger" @click="reset">
                <template #icon>
                  <icon-eraser />
                </template>
              </a-button>
            </a-tooltip>
          </a-space>
        </a-col>
      </a-row>
    </a-form>
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
        <a-link @click="handleDoProblem(record.id)">
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
  </a-card>
</template>

<script setup lang="ts">
import { PaginationProps, TableColumnData } from '@arco-design/web-vue';
import { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
import { onMounted, reactive, ref, unref } from 'vue';
import { OjProblemPageVo } from '@/api/gen-api/models/problem/OjProblemPageVo.ts';
import { OjProblemQueryRequest, OjProblemService, Paging } from '@/api/gen-api';
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
const contentTypeOptions: SelectOptionData[] = [
  {
    label: '简单',
    value: 0
  },
  {
    label: '中等',
    value: 1
  },
  {
    label: '困难',
    value: 2
  }
];
const handlePageSizeChange = (pageSize: number) => {
  paging.pageSize = pageSize;
  pageData();
};

const handlePageNumberChange = (pageNumber: number) => {
  paging.pageNum = pageNumber;
  pageData();
};

const loading = ref(false);
const data = reactive({
  problemList: [] as OjProblemPageVo[]
});
const pagination = reactive<PaginationProps>({
  showTotal: true,
  showPageSize: true,
  pageSizeOptions: [5, 10, 50, 100]
});

const queryReq = ref<OjProblemQueryRequest>({
  title: '',
  tags: [],
  difficulty: undefined
});

/**
 * 查询数据
 */
const pageData = async () => {
  loading.value = true;
  await OjProblemService.page2(paging, unref(queryReq))
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

const paging: Paging = reactive({
  pageNum: 1,
  pageSize: 5
});

onMounted(() => {
  pageData();
});

/**
 * 重置查询条件
 */
const reset = () => {
  queryReq.value = {};
  paging.pageNum = 1;
  pageData();
};

const router = useRouter();

/**
 * 跳转到做题页面
 */
const handleDoProblem = (problemId: any) => {
  router.push({ name: 'DoProblem', query: { id: problemId } });
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
