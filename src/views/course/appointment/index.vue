<template>
  <div class="container">
    <Breadcrumb :items="['课程管理', '课程预约']" />
    <a-card class="general-card" title="课程预约">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="searchForm"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="name" label="课程名称">
                  <a-input
                    v-model="searchForm.name"
                    placeholder="请输入课程名称"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="status" label="预约状态">
                  <a-select
                    v-model="searchForm.status"
                    placeholder="请选择状态"
                  >
                    <a-option value="1">已预约</a-option>
                    <a-option value="0">未预约</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item>
                  <a-space>
                    <a-button type="primary" @click="search">
                      <template #icon><icon-search /></template>
                      搜索
                    </a-button>
                    <a-button @click="reset">
                      <template #icon><icon-refresh /></template>
                      重置
                    </a-button>
                  </a-space>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-table
        :data="tableData"
        :loading="loading"
        :pagination="pagination"
        :scroll="{ x: 1200 }"
        @page-change="onPageChange"
      >
        <template #columns>
          <a-table-column title="课程ID" data-index="id" />
          <a-table-column title="课程名称" data-index="courseName" />
          <a-table-column title="学生姓名" data-index="userName" />
          <a-table-column title="联系方式" data-index="contactInfo" />
          <a-table-column title="预约校区" data-index="location" />
          <a-table-column title="所在城市" data-index="city" />
          <a-table-column title="预约状态" data-index="status" />
          <a-table-column title="预约时间" data-index="appointmentTime" />
          <a-table-column title="备注" data-index="remark" />
          <a-table-column title="操作" align="center">
            <template #cell="{ record }">
              <a-space>
                <a-button
                  type="text"
                  size="small"
                  @click="handleCancel(record)"
                >
                  取消预约
                </a-button>
                <a-button type="text" size="small" @click="handleEdit(record)">
                  编辑
                </a-button>
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { Message, Modal } from '@arco-design/web-vue';
import useLoading from '@/hooks/useLoading';
import Breadcrumb from '@/components/breadcrumb/index.vue';
import {
  getCourseReservationList,
  deleteCourseReservation
} from '@/api/gen-api/services/course.ts';

// 定义本地类型接口，匹配实际使用的数据结构
interface AppointmentData {
  id: string;
  courseId: string;
  courseName: string;
  teacher: string;
  time: string;
  location: string;
  status: string;
  appointmentTime: string;
  userId: string;
  userName: string;
  contactInfo?: string;
  city?: string;
  remark?: string;
}

interface SearchForm {
  name?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}

const { loading, setLoading } = useLoading();
const searchForm = reactive<SearchForm>({
  name: '',
  status: '',
  page: 1,
  pageSize: 10
});

const tableData = ref<AppointmentData[]>([]);
const pagination = reactive({
  total: 0,
  current: 1,
  pageSize: 10,
  showTotal: true,
  showPageSize: true,
  pageSizeOptions: [10, 20, 50, 100]
});

const fetchData = async () => {
  try {
    setLoading(true);
    const { data } = await getCourseReservationList(searchForm);
    // 转换数据格式以匹配本地类型
    tableData.value = (data || []).map((item: any) => ({
      id: item.Course_id || item.id,
      courseId: item.Course_id || item.courseId,
      courseName: item.courseName || item.name,
      teacher: item.teacher || '',
      time: item.time || item.appointmentTime,
      location: item.school || item.location,
      status: item.status || '已预约',
      appointmentTime: item.appointmentTime || item.time,
      userId: item.userId || '',
      userName: item.studentName || item.userName,
      contactInfo: item.contactInfo,
      city: item.city,
      remark: item.remark
    }));
    pagination.total = data?.length || 0;
  } catch (error) {
    console.error('获取预约列表失败:', error);
    Message.error('获取预约列表失败');
  } finally {
    setLoading(false);
  }
};

const search = () => {
  searchForm.page = 1;
  fetchData();
};

const reset = () => {
  searchForm.name = '';
  searchForm.status = '';
  searchForm.page = 1;
  search();
};

const onPageChange = (current: number) => {
  pagination.current = current;
  searchForm.page = current;
  fetchData();
};

const handleEdit = (record: AppointmentData) => {
  // TODO: 实现编辑功能
  console.log('编辑预约:', record);
};

const handleCancel = (record: AppointmentData) => {
  Modal.warning({
    title: '确认取消',
    content: '确定要取消该课程预约吗？',
    async onOk() {
      try {
        await deleteCourseReservation(record.courseId);
        Message.success('取消预约成功');
        await fetchData();
      } catch (error) {
        Message.error('取消预约失败');
      }
    }
  });
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px;
}
</style>
