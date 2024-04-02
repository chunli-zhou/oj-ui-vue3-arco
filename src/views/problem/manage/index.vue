<script setup lang="ts">
import { onMounted, reactive, ref, unref } from 'vue';
import {
  Message,
  PaginationProps,
  TableColumnData
} from '@arco-design/web-vue';
import {
  type OjProblemQueryRequest,
  OjProblemService,
  OjProblemVo,
  type Paging
} from '@/api/gen-api';
import { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
import { useRouter } from 'vue-router';

const router = useRouter();
const columns: TableColumnData[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 80,
    ellipsis: true
  },
  {
    title: '标题',
    dataIndex: 'title',
    align: 'center',
    width: 100
  },
  {
    title: '内容',
    dataIndex: 'content',
    ellipsis: true,
    align: 'center',
    width: 200
  },
  {
    title: '标签',
    dataIndex: 'tags',
    slotName: 'Tags',
    align: 'center',
    width: 120
  },
  {
    title: '难度',
    dataIndex: 'difficulty',
    align: 'center',
    width: 80
  },
  {
    title: '提交数',
    dataIndex: 'submitNum',
    align: 'center',
    width: 80
  },
  {
    title: '通过数',
    dataIndex: 'acceptedNum',
    align: 'center',
    width: 80
  },
  {
    title: '点赞数',
    dataIndex: 'thumbNum',
    align: 'center',
    width: 80
  },
  {
    title: '收藏数',
    dataIndex: 'favourNum',
    align: 'center',
    width: 80
  },
  {
    slotName: 'Controls',
    title: '操作',
    fixed: 'right',
    align: 'center',
    width: 80
  }
];
const queryReq = ref<OjProblemQueryRequest>({
  title: '',
  tags: [],
  difficulty: undefined
});
const paging: Paging = reactive({
  pageNum: 1,
  pageSize: 5
});
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
const loading = ref(false);
const data = reactive({
  problemList: [] as OjProblemVo[]
});
const pagination = reactive<PaginationProps>({
  showTotal: true,
  showPageSize: true,
  pageSizeOptions: [5, 10, 50, 100]
});

const scroll = {
  x: 1000,
  y: '100%'
};

const handlePageSizeChange = (pageSize: number) => {
  paging.pageSize = pageSize;
  pageData();
};

const handlePageNumberChange = (pageNumber: number) => {
  paging.pageNum = pageNumber;
  pageData();
};

/**
 * 跳转
 */
const handleAddProblem = () => {
  router.push({ name: 'ProblemAdd' });
};

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

/**
 * 重置查询条件
 */
const reset = () => {
  queryReq.value = {};
  paging.pageNum = 1;
  pageData();
};

const popoverVisibleList = ref([]);

/**
 * 取消删除操作
 */
const handleCancelDel = (rowIndex: number) => {
  popoverVisibleList.value[rowIndex] = false;
};

const handleDel = (record: OjProblemVo, rowIndex: number) => {
  OjProblemService.remove(record.id).then(() => {
    Message.success('删除成功');
    pageData();
  });
  popoverVisibleList.value[rowIndex] = false;
};

onMounted(async () => {
  await pageData();
  data.problemList.forEach(() => popoverVisibleList.value.push(false));
});
</script>

<template>
  <div class="container">
    <Breadcrumb :items="['题库', '题目管理']" />
    <a-card class="general-card" title="题目管理">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="queryReq"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="title" label="标题">
                  <a-input v-model="queryReq.title" placeholder="请输入标题" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="tags" label="标签">
                  <a-input-tag
                    v-model="queryReq.tags"
                    :style="{ width: '320px' }"
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
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 75px" direction="vertical" />
        <a-col :flex="'60px'" style="text-align: right">
          <a-space direction="vertical" :size="10">
            <a-button type="primary" @click="pageData">
              <template #icon>
                <icon-search />
              </template>
              查询
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              重置
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 12px" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-button type="primary" @click="handleAddProblem">
              <template #icon>
                <icon-plus />
              </template>
              新增
            </a-button>
          </a-space>
        </a-col>
        <a-col
          :span="12"
          style="display: flex; align-items: center; justify-content: end"
        >
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            下载
          </a-button>
        </a-col>
      </a-row>

      <a-table
        row-key="id"
        :bordered="false"
        :scroll="scroll"
        :columns="columns"
        :data="data.problemList"
        :loading="loading"
        :pagination="pagination"
        @page-change="handlePageNumberChange"
        @page-size-change="handlePageSizeChange"
      >
        <template #Tags="{ rowIndex }">
          <span
            v-for="tag in data.problemList[rowIndex].tags"
            :key="tag"
            style="margin: 2px"
          >
            <a-tag>
              {{ tag }}
            </a-tag>
          </span>
        </template>
        <template #Controls="{ record, rowIndex }">
          <a-link>编辑</a-link>
          <a-popover
            v-model:popup-visible="popoverVisibleList[rowIndex]"
            title="确定要删除吗？"
            trigger="click"
          >
            <template #content>
              <a-space>
                <a-button size="mini" @click="handleCancelDel(rowIndex)">
                  取消
                </a-button>
                <a-button
                  size="mini"
                  type="primary"
                  @click="handleDel(record, rowIndex)"
                >
                  确定
                </a-button>
              </a-space>
            </template>
            <a-link status="danger">删除</a-link>
          </a-popover>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<style scoped lang="less">
.container {
  padding: 0 20px 20px;
}
</style>
