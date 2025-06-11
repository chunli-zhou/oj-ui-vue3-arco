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
import { OjProblemPageVo } from '@/api/gen-api/models/problem/OjProblemPageVo.ts';
import { getQueryString } from '@/api/gen-api/core/request.ts';

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
    width: 150
  },
  {
    title: '标签',
    dataIndex: 'tags',
    slotName: 'tags',
    align: 'center',
    width: 170
  },
  {
    title: '难度',
    dataIndex: 'difficulty',
    align: 'center',
    slotName: 'difficulty',
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
    slotName: 'controls',
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

const tagOptions = ref<SelectOptionData[]>([]);

/**
 * 获取所有标签
 */
const getAllTags = async () => {
  try {
    const res = await OjProblemService.getAllTags();
    if (res.code === 0 && res.result) {
      const tags = JSON.parse(res.result);
      tagOptions.value = tags.map((tag: string) => ({
        label: tag,
        value: tag
      }));
    } else {
      console.error('获取标签失败:', res.message);
    }
  } catch (error) {
    console.error('获取标签失败:', error);
  }
};

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
  problemList: [] as OjProblemPageVo[]
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

const handleExport = () => {
  const url = '/ojProblem/export';
  // HACK: 待修改
  const proxy = 'http://localhost:8101/api';
  const query = getQueryString({
    ...queryReq.value,
    ...paging
  });
  window.location.href = proxy + url + query;
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

/**
 * 跳转编辑页面
 */
const handleEdit = (record: OjProblemVo) => {
  router.push({ name: 'ProblemEdit', query: { id: record.id } });
};

onMounted(async () => {
  await getAllTags();
  await pageData();
  data.problemList.forEach(() => popoverVisibleList.value.push(false));
});
</script>

<template>
  <div class="container-m">
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
                  <a-select
                    v-model="queryReq.tags"
                    :options="tagOptions"
                    placeholder="请选择标签"
                    multiple
                    allow-clear
                    allow-search
                    :style="{ width: '100%' }"
                  >
                    <template #option="{ data }">
                      <a-tag>{{ data.label }}</a-tag>
                    </template>
                    <template #empty>
                      <div style="padding: 8px 0; text-align: center">
                        {{
                          tagOptions.length
                            ? '没有匹配的标签'
                            : '正在加载标签...'
                        }}
                      </div>
                    </template>
                  </a-select>
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
          <a-button @click="handleExport">
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
        <template #tags="{ rowIndex }">
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
        <template #difficulty="{ record }">
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
        <template #controls="{ record, rowIndex }">
          <a-link @click="handleEdit(record)">编辑</a-link>
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
.container-m {
  padding: 0 20px 20px;
}
</style>
