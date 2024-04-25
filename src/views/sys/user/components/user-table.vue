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
            <a-form-item field="username" label="用户名">
              <a-input v-model="queryReq.username" placeholder="请输入用户名" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item field="realName" label="姓名">
              <a-input v-model="queryReq.realName" placeholder="请输入姓名" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item field="gender" label="性别">
              <a-select
                v-model="queryReq.gender"
                allow-clear
                placeholder="请选择性别"
              >
                <a-option :value="0">男</a-option>
                <a-option :value="1">女</a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item allow-clear field="status" label="状态">
              <a-select
                v-model="queryReq.status"
                allow-clear
                placeholder="请选择状态"
              >
                <a-option :value="0">正常</a-option>
                <a-option :value="1">停用</a-option>
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
  <a-table
    bordered
    row-key="id"
    :columns="columns"
    :data="data.userList"
    :loading="loading"
    :pagination="pagination"
    @page-change="handlePageNumberChange"
    @page-size-change="handlePageSizeChange"
  >
    <template #Username="{ record }">
      <a-link>{{ record.username }}</a-link>
    </template>
    <template #Avatar="{ record }">
      <a-image width="40px" :src="record.avatar"></a-image>
    </template>
    <template #Gender="{ record }">
      <span>{{ record.gender === 0 ? '男' : '女' }}</span>
    </template>
    <template #Roles="{ record }">
      <a-space size="mini">
        <a-tag v-for="(item, index) in record.roles" :key="index">
          {{ item }}
        </a-tag>
      </a-space>
    </template>
    <template #Status="{ record }">
      <a-tag :color="record.status === 0 ? 'green' : 'red'">
        {{ record.status === 0 ? '正常' : '停用' }}
      </a-tag>
    </template>
    <template #Online="{ record }">
      <a-badge v-if="record.online" status="success" text="在线" />
      <a-badge v-else status="normal" text="离线" />
    </template>
    <template #Controls="{ record }">
      <a-space size="mini">
        <span>
          <a-link @click="handleEditRole(record)">赋权</a-link>
        </span>
        <span>
          <a-link :disabled="!record.online" @click="handleKick(record)">
            强制下线
          </a-link>
        </span>
        <span>
          <a-popconfirm
            v-if="record.status === 0"
            content="确定要停用吗？"
            @ok="handleDisable(record)"
          >
            <a-link status="danger">停用</a-link>
          </a-popconfirm>
          <a-link v-else @click="handleEnable(record)">启用</a-link>
        </span>
      </a-space>
    </template>
  </a-table>
  <a-modal
    v-model:visible="roleVisible"
    :mask-closable="false"
    width="320px"
    title="赋权"
    @ok="handleOk"
  >
    <a-form-item label="角色">
      <a-select
        v-model="roleUser.roleIds"
        multiple
        allow-search
        allow-clear
        placeholder="请选择角色"
        :options="roleOptions"
      ></a-select>
    </a-form-item>
  </a-modal>
</template>

<script setup lang="ts">
import { Message, PaginationProps } from '@arco-design/web-vue';
import {
  Paging,
  SysRoleResponse,
  SysRoleService,
  SysUserRequest,
  SysUserResponse,
  SysUserService,
  UpdateUserRoleRequest
} from '@/api/gen-api';
import { onMounted, reactive, ref, unref } from 'vue';
import columns from '@/views/sys/user/data.d';
import { SelectOptionData } from '@arco-design/web-vue/es/select/interface';

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
const queryReq = ref<SysUserRequest>({
  username: '',
  realName: '',
  gender: null,
  email: '',
  mobile: '',
  status: null
});
const data = reactive({
  userList: [] as SysUserResponse[]
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
  await SysUserService.page(paging, unref(queryReq))
    .then(res => {
      const result = res.result;
      data.userList = result.records;
      pagination.total = result.totalRow;
      pagination.current = paging.pageNum;
      pagination.pageSize = paging.pageSize;
    })
    .finally(() => {
      loading.value = false;
    });
};
const handleDisable = (record: SysRoleResponse) => {
  SysUserService.disable(record.id).then(() => {
    Message.success('停用成功');
    pageData();
  });
};

const handleEnable = (record: SysRoleResponse) => {
  SysUserService.enable(record.id).then(() => {
    Message.success('启用成功');
    pageData();
  });
};

const handleKick = (record: SysRoleResponse) => {
  SysUserService.kick(record.id).then(res => {
    if (res.result) {
      Message.success('强制下线成功');
      pageData();
    }
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

// 赋权弹窗
const roleVisible = ref(false);
const roleUser = ref<UpdateUserRoleRequest>({
  userId: 0,
  roleIds: []
});
/**
 * 赋权操作
 */
const handleOk = () => {
  SysRoleService.updateUserRole(roleUser.value).then(res => {
    if (res.result) {
      Message.success('赋权成功');
      roleVisible.value = false;
      pageData();
    }
  });
};
const roleOptions = ref<SelectOptionData[]>();
const getAllRole = () => {
  SysRoleService.list().then(res => {
    if (res.result) {
      roleOptions.value = res.result.map(item => {
        return {
          label: item.remark,
          value: item.id
        };
      });
    }
  });
};

const handleEditRole = (record: SysUserResponse) => {
  roleVisible.value = true;
  getAllRole();
  roleUser.value.userId = record.id;
};

onMounted(() => {
  pageData();
});
</script>

<style scoped lang="less"></style>
