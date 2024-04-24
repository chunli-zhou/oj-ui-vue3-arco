<template>
  <a-row>
    <a-col :flex="1">
      <a-form
        :model="queryReq"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 18 }"
        label-align="left"
      >
        <a-row>
          <a-col :span="6">
            <a-form-item field="roleCode" label="角色标识">
              <a-input
                v-model="queryReq.roleCode"
                placeholder="请输入角色标识"
              />
            </a-form-item>
          </a-col>
          <a-col :flex="1" style="text-align: right">
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
      </a-form>
    </a-col>
  </a-row>
  <a-divider />
  <add-role-modal @add-flag="addFlag" />
  <a-table
    bordered
    row-key="id"
    :columns="columns"
    :data="data.roleList"
    :loading="loading"
    :pagination="pagination"
    @page-change="handlePageNumberChange"
    @page-size-change="handlePageSizeChange"
  >
    <template #Controls="{ record }">
      <a-link @click="handleEdit(record)">编辑</a-link>
      <a-popconfirm content="确定要删除吗？" @ok="handleDel(record)">
        <a-link status="danger">删除</a-link>
      </a-popconfirm>
    </template>
  </a-table>
  <edit-role-modal v-model:visible="visibleEdit" :req="editReq" />
</template>

<script setup lang="ts">
import {
  Message,
  PaginationProps,
  TableColumnData
} from '@arco-design/web-vue';
import {
  Paging,
  SysRoleRequest,
  SysRoleResponse,
  SysRoleService
} from '@/api/gen-api';
import { onMounted, reactive, ref, unref } from 'vue';
import AddRoleModal from '@/views/sys/role/components/add-role-modal.vue';
import EditRoleModal from '@/views/sys/role/components/edit-role-modal.vue';

const columns: TableColumnData[] = [
  {
    title: '角色标识',
    dataIndex: 'roleCode',
    align: 'center'
  },
  {
    title: '备注',
    dataIndex: 'remark',
    ellipsis: true,
    align: 'center'
  },
  {
    title: '部门ID',
    dataIndex: 'deptId',
    slotName: 'Tags',
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
const queryReq = ref<SysRoleRequest>({
  roleCode: ''
});
const data = reactive({
  roleList: [] as SysRoleResponse[]
});
const pagination = reactive<PaginationProps>({
  showTotal: true,
  showPageSize: true,
  pageSizeOptions: [5, 10, 50, 100]
});
const addFlag = (param: boolean) => {
  if (param) {
    pageData();
  }
};
// 编辑
const visibleEdit = ref(false);
const editReq = ref<SysRoleRequest>({
  roleCode: '',
  remark: ''
});
/**
 * 查询数据
 */
const pageData = async () => {
  loading.value = true;
  await SysRoleService.page1(paging, unref(queryReq))
    .then(res => {
      const result = res.result;
      data.roleList = result.records;
      pagination.total = result.totalRow;
      pagination.current = paging.pageNum;
      pagination.pageSize = paging.pageSize;
    })
    .finally(() => {
      loading.value = false;
    });
};
const handleDel = (record: SysRoleResponse) => {
  SysRoleService.remove(record.id).then(() => {
    Message.success('删除成功');
    pageData();
  });
};

const handleEdit = (record: SysRoleResponse) => {
  visibleEdit.value = true;
  editReq.value = record;
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
