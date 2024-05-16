<template>
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
              <a-input v-model="queryReq.title" placeholder="请输入帖子标题" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item field="zone" label="分区">
              <a-select
                v-model="queryReq.zone"
                placeholder="请选择帖子分区"
                allow-clear
                :options="zoneOptions"
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item field="tags" label="标签">
              <a-input-tag
                v-model="queryReq.tags"
                allow-clear
                placeholder="请输入帖子标签并回车"
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
  <a-table
    bordered
    row-key="id"
    :columns="columns"
    :data="data.postList"
    :loading="loading"
    :pagination="pagination"
    @page-change="handlePageNumberChange"
    @page-size-change="handlePageSizeChange"
  >
    <template #Tags="{ rowIndex }">
      <a-space wrap>
        <span
          v-for="tag in data.postList[rowIndex].tags"
          :key="tag"
          style="text-align: center"
        >
          <a-tag>
            {{ tag }}
          </a-tag>
        </span>
      </a-space>
    </template>
    <template #Avatar="{ record }">
      <a-image width="40px" :src="record.avatar"></a-image>
    </template>
    <template #Controls="{ record }">
      <a-link @click="handleEdit(record)">编辑</a-link>
      <a-popconfirm content="确定要删除吗？" @ok="handleDel(record)">
        <a-link status="danger">删除</a-link>
      </a-popconfirm>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import {
  Message,
  PaginationProps,
  TableColumnData
} from '@arco-design/web-vue';
import { OjPostQueryRequest, OjPostVo, Paging } from '@/api/gen-api';
import { onMounted, reactive, ref, unref } from 'vue';
import { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
import { OjPostService } from '@/api/gen-api/services/OjPostService.ts';
import { useRouter } from 'vue-router';

const zoneOptions = ref<SelectOptionData[]>([
  {
    label: '综合',
    value: 'synthesis'
  },
  {
    label: '前端',
    value: 'frontend'
  },
  {
    label: '后端',
    value: 'backend'
  },
  {
    label: '鸿蒙',
    value: 'harmony'
  },
  {
    label: 'AIGC',
    value: 'aigc'
  }
]);
const columns: TableColumnData[] = [
  {
    title: '标题',
    dataIndex: 'title',
    align: 'center'
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    align: 'center',
    slotName: 'Avatar'
  },
  {
    title: '分区',
    dataIndex: 'zoneName',
    align: 'center'
  },
  {
    title: '标签',
    dataIndex: 'tags',
    slotName: 'Tags',
    align: 'center'
  },
  {
    title: '点赞数',
    dataIndex: 'thumbNum',
    align: 'center'
  },
  {
    title: '收藏数',
    dataIndex: 'favourNum',
    align: 'center'
  },
  {
    title: '观看数',
    dataIndex: 'viewNum',
    align: 'center'
  },
  {
    slotName: 'Controls',
    title: '操作',
    fixed: 'right',
    align: 'center'
  }
];

const paging: Paging = reactive({
  pageNum: 1,
  pageSize: 5
});

const handlePageSizeChange = (pageSize: number) => {
  paging.pageSize = pageSize;
  pageData();
};

const handlePageNumberChange = (pageNumber: number) => {
  paging.pageNum = pageNumber;
  pageData();
};

const loading = ref(false);
const queryReq = ref<OjPostQueryRequest>({
  title: '',
  zone: '',
  tags: []
});
const data = reactive({
  postList: [] as OjPostVo[]
});
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
  await OjPostService.pageSelf({ page: paging, req: unref(queryReq) })
    .then(res => {
      const result = res.result;
      data.postList = result.records;
      pagination.total = result.totalRow;
      pagination.current = paging.pageNum;
      pagination.pageSize = paging.pageSize;
    })
    .finally(() => {
      loading.value = false;
    });
};
const handleDel = (record: OjPostVo) => {
  OjPostService.remove(record.id).then(() => {
    Message.success('删除成功');
    pageData();
  });
};

const router = useRouter();
const handleEdit = (record: OjPostVo) => {
  router.push({ name: 'EditPost', query: { id: record.id } });
};

/**
 * 重置查询条件
 */
const reset = () => {
  queryReq.value = {};
  paging.pageNum = 1;
  pageData();
};

onMounted(() => {
  pageData();
});
</script>

<style scoped lang="less"></style>
