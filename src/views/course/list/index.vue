<template>
  <div class="container-m">
    <Breadcrumb :items="['课程管理', '课程列表']" />
    <a-card class="general-card table-card-container" title="课程列表">
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
                <a-form-item field="name" label="课程名称">
                  <a-input
                    v-model="queryReq.name"
                    placeholder="请输入课程名称"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="type" label="课程类型">
                  <a-select
                    v-model="queryReq.type"
                    placeholder="请选择课程类型"
                  >
                    <a-option value="编程">编程</a-option>
                    <a-option value="算法">算法</a-option>
                    <a-option value="数据结构">数据结构</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="difficultyLevel" label="难度等级">
                  <a-select
                    v-model="queryReq.difficultyLevel"
                    placeholder="请选择难度等级"
                  >
                    <a-option value="初级">初级</a-option>
                    <a-option value="中级">中级</a-option>
                    <a-option value="高级">高级</a-option>
                  </a-select>
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
            <a-button type="primary" @click="handleAddCourse">
              <template #icon>
                <icon-plus />
              </template>
              新增
            </a-button>
          </a-space>
        </a-col>
      </a-row>

      <div class="table-wrapper">
        <a-table
          row-key="id"
          :bordered="false"
          table-layout-fixed
          :columns="columns"
          :data="data.courseList"
          :loading="loading"
          :pagination="pagination"
          @page-change="handlePageNumberChange"
          @page-size-change="handlePageSizeChange"
        >
          <template #avatar="{ record }">
            <a-avatar shape="square">
              <img
                v-if="record.avatar"
                alt="avatar"
                :src="getAvatarUrl(record.avatar)"
              />
              <icon-user v-else />
            </a-avatar>
          </template>
          <template #controls="{ record }">
            <a-link @click="handleEdit(record)">编辑</a-link>
            <a-popconfirm
              content="确定要删除吗？"
              type="warning"
              @ok="handleDel(record.id)"
            >
              <a-link status="danger">删除</a-link>
            </a-popconfirm>
          </template>
        </a-table>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, unref } from 'vue';
import {
  Message,
  PaginationProps,
  TableColumnData
} from '@arco-design/web-vue';
import { useRouter } from 'vue-router';
import Breadcrumb from '@/components/breadcrumb/index.vue';
import {
  getCourseList,
  deleteCourse,
  type CourseData,
  type CourseQuery
} from '@/api/gen-api/services/course.ts';

const router = useRouter();
const columns: TableColumnData[] = [
  // {
  //   title: 'ID',
  //   dataIndex: 'id',
  //   ellipsis: true,
  //   width: 0,
  //   cellStyle: {
  //     display: 'none'
  //   }
  // },
  {
    title: '头像',
    dataIndex: 'avatar',
    align: 'center',
    slotName: 'avatar'
  },
  {
    title: '课程名称',
    dataIndex: 'name',
    align: 'center'
  },
  {
    title: '授课教师',
    dataIndex: 'teacher',
    align: 'center'
  },
  {
    title: '课程类型',
    dataIndex: 'type',
    align: 'center'
  },
  {
    title: '难度等级',
    dataIndex: 'difficultyLevel',
    align: 'center'
  },
  {
    title: '价格',
    dataIndex: 'price',
    align: 'center',
    render: ({ record }) => `${record.price}元`
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
    align: 'center',
    render: ({ record }) => {
      return new Date(record.startTime).toLocaleDateString();
    }
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    align: 'center',
    render: ({ record }) => {
      return new Date(record.endTime).toLocaleDateString();
    }
  },
  {
    title: '学习时长',
    dataIndex: 'duration',
    align: 'center',
    render: ({ record }) => `${record.duration}天`
  },
  {
    slotName: 'controls',
    title: '操作',
    align: 'center'
  }
];

const getAvatarUrl = (avatarPath: string) => {
  if (!avatarPath || avatarPath.startsWith('http')) {
    return avatarPath;
  }
  const formattedPath = avatarPath.startsWith('/')
    ? avatarPath
    : `/${avatarPath}`;
  return `/api${formattedPath}`;
};

const queryReq = ref<CourseQuery>({
  name: '',
  type: '',
  difficultyLevel: ''
});

const paging = reactive({
  pageNum: 1,
  pageSize: 5
});

const loading = ref(false);
const data = reactive({
  courseList: [] as CourseData[]
});

const pagination = reactive<PaginationProps>({
  showTotal: true,
  showPageSize: true,
  pageSizeOptions: [5, 10, 25, 100],
  total: 0,
  current: 1,
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

const handleAddCourse = () => {
  router.push({ name: 'CourseAdd' });
};

const pageData = async () => {
  loading.value = true;
  try {
    const params = {
      ...unref(queryReq),
      page: paging.pageNum,
      pageSize: paging.pageSize
    };
    const res = await getCourseList(params);
    if (res.data.code === 200) {
      const result = res.data.result;
      console.log('课程列表数据:', result.records);
      data.courseList = result.records;
      pagination.total = result.totalRow;
      pagination.current = paging.pageNum;
      pagination.pageSize = paging.pageSize;
    } else {
      Message.error(`获取课程列表失败：${res.data.message}`);
    }
  } catch (error) {
    Message.error('获取课程列表失败');
  } finally {
    loading.value = false;
  }
};

const reset = () => {
  queryReq.value = {
    name: '',
    type: '',
    difficultyLevel: ''
  };
  paging.pageNum = 1;
  pageData();
};

const handleDel = async (id: string) => {
  try {
    await deleteCourse(id);
    Message.success('删除成功');
    await pageData();
    window.location.reload();
  } catch (error) {
    Message.error('删除失败');
  }
};

const handleEdit = (record: CourseData) => {
  router.push({ name: 'CourseEdit', query: { id: record.id } });
};

onMounted(async () => {
  await pageData();
});
</script>

<style scoped lang="less">
.container-m {
  padding: 0 20px 20px;
}
.table-card-container {
  :deep(.arco-card-body) {
    padding: 20px; /* 给卡片内容区一个统一的内边距，实现视觉居中 */
  }
}
.table-wrapper {
  display: flex;
  justify-content: center;
}
</style>
