<template>
  <a-modal :visible="innerVisible" @ok="handleOk" @cancel="handleCancel">
    <template #title>新增角色</template>
    <div>
      <a-form ref="formRef" :rules="rules" :model="role">
        <a-form-item field="roleCode" label="角色编码">
          <a-input v-model="role.roleCode" placeholder="请输入角色编码" />
        </a-form-item>
        <a-form-item field="remark" label="备注">
          <a-input v-model="role.remark" placeholder="请输入备注" />
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { SysRoleRequest, SysRoleService } from '@/api/gen-api';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { Message } from '@arco-design/web-vue';

const emit = defineEmits(['update:visible']);
const role = ref<SysRoleRequest>({
  roleCode: '',
  remark: ''
});
const innerVisible = ref(false);

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  req: {
    type: Object,
    default: () => {}
  }
});
watch(
  () => props.req,
  () => {
    role.value = props.req;
  },
  {
    deep: true
  }
);
watch(
  () => props.visible,
  () => {
    if (props.visible) {
      innerVisible.value = true;
    }
  }
);
const formRef = ref<FormInstance>();
const rules = {
  roleCode: [{ required: true, message: '请输入角色编码' }],
  remark: [{ required: true, message: '请输入备注' }]
};
const handleOk = async () => {
  const res = await formRef.value?.validate();
  if (!res) {
    innerVisible.value = false;
    emit('update:visible', false);
    SysRoleService.update(role.value).then(res => {
      if (res.result) {
        Message.success('修改成功');
      }
    });
  }
};
const handleCancel = () => {
  innerVisible.value = false;
  emit('update:visible', false);
};
</script>

<style scoped lang="less"></style>
