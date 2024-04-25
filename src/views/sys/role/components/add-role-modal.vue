<template>
  <a-button type="primary" style="margin-bottom: 10px" @click="handleAdd">
    新增
    <template #icon>
      <icon-plus />
    </template>
  </a-button>
  <a-modal :visible="visible" @ok="handleOk" @cancel="handleCancel">
    <template #title>新增角色</template>
    <div>
      <a-form ref="formRef" :rules="rules" :model="req">
        <a-form-item field="roleCode" label="角色编码">
          <a-input v-model="req.roleCode" placeholder="请输入角色编码" />
        </a-form-item>
        <a-form-item field="remark" label="备注">
          <a-input v-model="req.remark" placeholder="请输入备注" />
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SysRoleRequest, SysRoleService } from '@/api/gen-api';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { Message } from '@arco-design/web-vue';

const emit = defineEmits(['addFlag']);
const visible = ref(false);
const req = ref<SysRoleRequest>({
  roleCode: '',
  remark: ''
});
const formRef = ref<FormInstance>();
const rules = {
  roleCode: [{ required: true, message: '请输入角色编码' }],
  remark: [{ required: true, message: '请输入备注' }]
};
const handleAdd = () => {
  visible.value = true;
};
const handleOk = async () => {
  const res = await formRef.value?.validate();
  if (!res) {
    visible.value = false;
    SysRoleService.save(req.value).then(res => {
      if (res.result) {
        Message.success('添加成功');
        emit('addFlag', true);
      }
    });
  }
};
const handleCancel = () => {
  visible.value = false;
};
</script>
