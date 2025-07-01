<template>
  <div class="container">
    <Breadcrumb :items="['课程管理', '课程预约']" />
    <a-card class="general-card" title="课程预约">
      <div class="search-bar-row">
        <a-form :model="searchForm" layout="inline" class="search-form">
          <a-form-item field="name" label="课程名称" class="search-form-item">
            <a-input
              v-model="searchForm.name"
              placeholder="请输入课程名称"
              allow-clear
            />
          </a-form-item>
          <a-form-item
            field="userName"
            label="学生姓名"
            class="search-form-item"
          >
            <a-input
              v-model="searchForm.userName"
              placeholder="请输入学生姓名"
              allow-clear
            />
          </a-form-item>
          <a-form-item
            field="location"
            label="预约学校"
            class="search-form-item"
          >
            <a-input
              v-model="searchForm.location"
              placeholder="请输入预约学校"
              allow-clear
            />
          </a-form-item>
          <a-form-item class="search-form-btns">
            <a-button type="primary" @click="search">
              <template #icon><icon-search /></template>
              搜索
            </a-button>
            <a-button style="margin-left: 8px" @click="reset">
              <template #icon><icon-refresh /></template>
              重置
            </a-button>
          </a-form-item>
        </a-form>
        <div class="add-btn-wrapper">
          <a-button type="primary" @click="handleAdd">
            <template #icon><icon-plus /></template>
            新增
          </a-button>
        </div>
      </div>
      <a-divider style="margin-top: 0" />
      <a-table
        :data="tableData"
        :loading="loading"
        :pagination="false"
        :scroll="{ x: 1200 }"
        @page-change="onPageChange"
      >
        <template #columns>
          <a-table-column title="序号" data-index="id" />
          <a-table-column title="课程名称" data-index="courseName" />
          <a-table-column title="学生姓名" data-index="userName" />
          <a-table-column title="联系方式" data-index="contactInfo" />
          <a-table-column title="预约校区" data-index="location" />
          <a-table-column title="所在城市" data-index="city" />
          <a-table-column title="备注" data-index="remark" />
          <a-table-column title="操作" align="center">
            <template #cell="{ record }">
              <a-space>
                <a-button type="text" size="small" @click="handleEdit(record)">
                  编辑
                </a-button>
                <a-button
                  type="text"
                  size="small"
                  status="danger"
                  @click="handleDelete(record)"
                >
                  删除
                </a-button>
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>
      <div class="custom-pagination">
        <span>共{{ totalPage }}页</span>
        <a-button
          size="mini"
          :disabled="pageNumber <= 1"
          @click="changePage(pageNumber - 1)"
        >
          <template #default><span>&lt;</span></template>
        </a-button>
        <span class="page-num">{{ pageNumber }}</span>
        <a-button
          size="mini"
          :disabled="pageNumber >= totalPage"
          @click="changePage(pageNumber + 1)"
        >
          <template #default><span>&gt;</span></template>
        </a-button>
        <a-dropdown>
          <a-button size="mini" style="margin-left: 12px">
            {{ pageSize }}条/页
          </a-button>
          <template #content>
            <a-doption
              v-for="size in [5, 10, 15]"
              :key="size"
              @click="changePageSize(size)"
            >
              {{ size }}条/页
            </a-doption>
          </template>
        </a-dropdown>
      </div>
    </a-card>
    <a-modal
      v-model:visible="addVisible"
      title="新增预约"
      @ok="handleAddOk"
      @cancel="handleAddCancel"
    >
      <a-form ref="addFormRef" :model="addForm" layout="vertical">
        <a-form-item
          label="课程名称"
          field="courseName"
          :rules="[{ required: true, message: '请选择课程' }]"
        >
          <a-select v-model="addForm.courseName" placeholder="请选择课程">
            <a-option
              v-for="item in courseOptions"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </a-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="学生姓名"
          field="studentName"
          :rules="[{ required: true, message: '请输入学生姓名' }]"
        >
          <a-input v-model="addForm.studentName" placeholder="请输入学生姓名" />
        </a-form-item>
        <a-form-item
          label="联系方式"
          field="contactInfo"
          :rules="[{ required: true, message: '请输入联系方式' }]"
        >
          <a-input v-model="addForm.contactInfo" placeholder="请输入联系方式" />
        </a-form-item>
        <a-form-item
          label="预约学校"
          field="school"
          :rules="[{ required: true, message: '请输入预约学校' }]"
        >
          <a-input v-model="addForm.school" placeholder="请输入预约学校" />
        </a-form-item>
        <a-form-item label="所在城市" field="city">
          <a-input v-model="addForm.city" placeholder="请输入所在城市" />
        </a-form-item>
        <a-form-item label="备注" field="remark">
          <a-input v-model="addForm.remark" placeholder="请输入备注" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      v-model:visible="editVisible"
      title="编辑预约"
      @ok="handleEditOk"
      @cancel="handleEditCancel"
    >
      <a-form ref="editFormRef" :model="editForm" layout="vertical">
        <a-form-item label="ID" field="id">
          <a-input v-model="editForm.id" disabled />
        </a-form-item>
        <a-form-item label="课程名称" field="courseName">
          <a-input v-model="editForm.courseName" disabled />
        </a-form-item>
        <a-form-item label="学生姓名" field="studentName">
          <a-input v-model="editForm.studentName" disabled />
        </a-form-item>
        <a-form-item label="联系方式" field="contactInfo">
          <a-input
            v-model="editForm.contactInfo"
            placeholder="请输入联系方式"
          />
        </a-form-item>
        <a-form-item label="预约学校" field="school">
          <a-input v-model="editForm.school" placeholder="请输入预约学校" />
        </a-form-item>
        <a-form-item label="所在城市" field="city">
          <a-input v-model="editForm.city" placeholder="请输入所在城市" />
        </a-form-item>
        <a-form-item label="备注" field="remark">
          <a-input v-model="editForm.remark" placeholder="请输入备注" />
        </a-form-item>
      </a-form>
    </a-modal>
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
  userName?: string;
  location?: string;
  page?: number;
  pageSize?: number;
}

const { loading, setLoading } = useLoading();
const searchForm = reactive<SearchForm>({
  name: '',
  userName: '',
  location: '',
  page: 1,
  pageSize: 10
});

const tableData = ref<AppointmentData[]>([]);
const pageNumber = ref(1);
const pageSize = ref(5);
const totalPage = ref(1);
const totalRow = ref(0);

const addVisible = ref(false);
const addForm = reactive({
  courseName: '',
  studentName: '',
  contactInfo: '',
  school: '',
  city: '',
  remark: ''
});
const addFormRef = ref();
const courseOptions = ref<{ label: string; value: string }[]>([]);

const editVisible = ref(false);
const editForm = reactive({
  id: '',
  courseName: '',
  studentName: '',
  contactInfo: '',
  school: '',
  city: '',
  remark: ''
});
const editFormRef = ref();

const fetchData = async () => {
  try {
    setLoading(true);
    const params = {
      courseName: searchForm.name,
      studentName: searchForm.userName,
      school: searchForm.location,
      pageNum: pageNumber.value,
      pageSize: pageSize.value
    };
    console.log('分页请求参数:', params);
    const { data } = await getCourseReservationList(params);
    // 适配后端分页数据结构
    const result = data?.result || {};
    tableData.value = (result.records || []).map((item: any) => ({
      id: item.id,
      courseId: item.courseId,
      courseName: item.course || '',
      teacher: '',
      time: '',
      location: item.school,
      status: '',
      appointmentTime: '',
      userId: '',
      userName: item.studentName,
      contactInfo: item.contactInfo,
      city: item.city,
      remark: item.remark
    }));
    pageNumber.value = Number(result.pageNumber) || 1;
    totalPage.value = Number(result.totalPage) || 1;
    totalRow.value = Number(result.totalRow) || 0;
  } catch (error) {
    console.error('获取预约列表失败:', error);
    Message.error('获取预约列表失败');
  } finally {
    setLoading(false);
  }
};

const search = () => {
  pageNumber.value = 1;
  fetchData();
};

const reset = () => {
  searchForm.name = '';
  searchForm.userName = '';
  searchForm.location = '';
  searchForm.page = 1;
  search();
};

const handleEdit = (record: AppointmentData) => {
  editForm.id = record.id;
  editForm.courseName = record.courseName;
  editForm.studentName = record.userName;
  editForm.contactInfo = record.contactInfo || '';
  editForm.school = record.location || '';
  editForm.city = record.city || '';
  editForm.remark = record.remark || '';
  editVisible.value = true;
};

const handleDelete = (record: AppointmentData) => {
  Modal.warning({
    title: '确认删除',
    content: '确定要删除该课程预约记录吗？',
    async onOk() {
      try {
        const res = await fetch(
          `/api/course/courseReservation/deleteById?id=${record.id}`,
          {
            method: 'DELETE'
          }
        );
        const result = await res.json();
        if (result.code === 200) {
          Message.success('删除成功');
          await fetchData();
        } else {
          Message.error(result.message || '删除失败');
        }
      } catch (error) {
        Message.error('删除失败');
      }
    }
  });
};

const handleAdd = async () => {
  addVisible.value = true;
  // 获取课程下拉
  const res = await fetch('/api/course/courseReservation/courseNameList');
  const data = await res.json();
  courseOptions.value = (data?.result || []).map((name: string) => ({
    label: name,
    value: name
  }));
};

const handleAddCancel = () => {
  addVisible.value = false;
};

const handleAddOk = async () => {
  await addFormRef.value?.validate();
  // 发送POST请求
  const res = await fetch('/api/course/courseReservation/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(addForm)
  });
  const result = await res.json();
  if (result.code === 200) {
    Message.success('新增成功');
    addVisible.value = false;
    fetchData();
  } else {
    Message.error(result.message || '新增失败');
  }
};

const handleEditCancel = () => {
  editVisible.value = false;
};

const handleEditOk = async () => {
  await editFormRef.value?.validate?.();
  // 发送POST请求
  const res = await fetch('/api/course/courseReservation/modify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(editForm)
  });
  const result = await res.json();
  if (result.code === 200) {
    Message.success('编辑成功');
    editVisible.value = false;
    fetchData();
  } else {
    Message.error(result.message || '编辑失败');
  }
};

const changePage = (page: number) => {
  if (page < 1 || page > totalPage.value) return;
  pageNumber.value = page;
  fetchData();
};

const changePageSize = (size: number) => {
  console.log('切换pageSize:', size);
  if (pageSize.value !== size) {
    pageSize.value = size;
    pageNumber.value = 1;
    fetchData();
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped lang="less">
.container {
  box-sizing: border-box;
  width: 100%;
  min-width: 100vw;
  min-height: 100vh;
  padding: 0;
}

.search-bar-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
}

.search-form {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  gap: 0 12px;
  align-items: center;
}

.search-form-item {
  min-width: 180px;
  margin-bottom: 0 !important;
}

.search-form-item :deep(.arco-form-item-label) {
  margin-right: 4px;
  font-weight: 400;
  color: #666;
}

.search-form-btns {
  display: flex;
  align-items: center;
  min-width: 120px;
  margin-bottom: 0 !important;
}

.add-btn-wrapper {
  margin-left: 16px;
}

.general-card {
  display: flex;
  flex-direction: column;
  min-height: 600px;
}

.custom-pagination {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin-top: 16px;
}

.custom-pagination .page-num {
  margin: 0 8px;
  font-weight: bold;
}
</style>
