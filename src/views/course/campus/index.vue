<template>
  <div class="container">
    <Breadcrumb :items="['课程管理', '校区安排']" />
    <a-card class="general-card" title="校区列表">
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
                <a-form-item field="name" label="校区名称">
                  <a-input
                    v-model="searchForm.name"
                    placeholder="请输入校区名称"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="status" label="状态">
                  <a-select
                    v-model="searchForm.status"
                    placeholder="请选择状态"
                  >
                    <a-option value="1">正常</a-option>
                    <a-option value="0">关闭</a-option>
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
                    <a-button type="primary" @click="handleAdd">
                      <template #icon><icon-plus /></template>
                      新增
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
        @page-change="onPageChange"
      >
        <template #columns>
          <a-table-column title="校区名称" data-index="name" />
          <a-table-column title="地址" data-index="address" />
          <a-table-column title="联系电话" data-index="phone" />
          <a-table-column title="状态" data-index="status">
            <template #cell="{ record }">
              <a-tag :color="record.status === '1' ? 'green' : 'red'">
                {{ record.status === '1' ? '正常' : '关闭' }}
              </a-tag>
            </template>
          </a-table-column>
          <a-table-column title="操作" align="center">
            <template #cell="{ record }">
              <a-space>
                <a-button type="text" size="small" @click="handleView(record)">
                  查看
                </a-button>
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
    </a-card>

    <!-- 校区表单对话框 -->
    <a-modal
      v-model:visible="formVisible"
      :title="formType === 'add' ? '新增校区' : '编辑校区'"
      @ok="handleSubmit"
      @cancel="handleCancel"
    >
      <a-form ref="formRef" :model="formData">
        <a-form-item
          field="name"
          label="校区名称"
          :rules="[{ required: true, message: '请输入校区名称' }]"
        >
          <a-input v-model="formData.name" placeholder="请输入校区名称" />
        </a-form-item>
        <a-form-item
          field="address"
          label="地址"
          :rules="[{ required: true, message: '请输入地址' }]"
        >
          <a-input v-model="formData.address" placeholder="请输入地址" />
        </a-form-item>
        <a-form-item
          field="phone"
          label="联系电话"
          :rules="[{ required: true, message: '请输入联系电话' }]"
        >
          <a-input v-model="formData.phone" placeholder="请输入联系电话" />
        </a-form-item>
        <a-form-item
          field="status"
          label="状态"
          :rules="[{ required: true, message: '请选择状态' }]"
        >
          <a-select v-model="formData.status" placeholder="请选择状态">
            <a-option value="1">正常</a-option>
            <a-option value="0">关闭</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="description" label="校区描述">
          <a-textarea
            v-model="formData.description"
            placeholder="请输入校区描述"
          />
        </a-form-item>
        <a-form-item field="openTime" label="开放时间">
          <a-time-picker v-model="formData.openTime" format="HH:mm" />
        </a-form-item>
        <a-form-item field="closeTime" label="关闭时间">
          <a-time-picker v-model="formData.closeTime" format="HH:mm" />
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
  getCampusList,
  createCampus,
  updateCampus,
  deleteCampus
} from '@/api/gen-api/services/course.ts';
import type { CampusData, CourseQuery } from '@/types/course';

const { loading, setLoading } = useLoading();
const searchForm = reactive<CourseQuery>({
  name: '',
  status: '',
  page: 1,
  pageSize: 10
});

const tableData = ref<CampusData[]>([]);
const pagination = reactive({
  total: 0,
  current: 1,
  pageSize: 10
});

const formVisible = ref(false);
const formType = ref<'add' | 'edit'>('add');
const formData = reactive<CampusData>({
  id: '',
  name: '',
  address: '',
  phone: '',
  status: '1',
  description: '',
  openTime: '',
  closeTime: '',
  facilities: []
});

const fetchData = async () => {
  try {
    setLoading(true);
    const { data } = await getCampusList(searchForm);
    tableData.value = data;
    pagination.total = data.length;
  } catch (error) {
    Message.error('获取校区列表失败');
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
  search();
};

const onPageChange = (current: number) => {
  pagination.current = current;
  searchForm.page = current;
  fetchData();
};

const handleAdd = () => {
  formType.value = 'add';
  formData.id = '';
  formData.name = '';
  formData.address = '';
  formData.phone = '';
  formData.status = '1';
  formData.description = '';
  formData.openTime = '';
  formData.closeTime = '';
  formData.facilities = [];
  formVisible.value = true;
};

const handleEdit = (record: CampusData) => {
  formType.value = 'edit';
  Object.assign(formData, record);
  formVisible.value = true;
};

const handleView = (record: CampusData) => {
  // TODO: 实现查看详情逻辑
  console.log('查看', record);
};

const handleDelete = (record: CampusData) => {
  Modal.warning({
    title: '确认删除',
    content: '确定要删除该校区吗？',
    async onOk() {
      try {
        await deleteCampus(record.id);
        Message.success('删除成功');
        await fetchData();
      } catch (error) {
        Message.error('删除失败');
      }
    }
  });
};

const handleSubmit = async () => {
  try {
    if (formType.value === 'add') {
      await createCampus(formData);
      Message.success('添加成功');
    } else {
      await updateCampus(formData.id, formData);
      Message.success('更新成功');
    }
    formVisible.value = false;
    await fetchData();
  } catch (error) {
    Message.error(formType.value === 'add' ? '添加失败' : '更新失败');
  }
};

const handleCancel = () => {
  formVisible.value = false;
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
