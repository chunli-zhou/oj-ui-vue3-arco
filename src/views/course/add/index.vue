<template>
  <div class="container">
    <Breadcrumb :items="['课程管理', '添加课程']" />
    <a-card class="general-card" title="添加课程">
      <a-form ref="formRef" :model="formData" :rules="rules">
        <a-form-item
          field="name"
          label="课程名称"
          :rules="[{ required: true, message: '请输入课程名称' }]"
        >
          <a-input v-model="formData.name" placeholder="请输入课程名称" />
        </a-form-item>
        <a-form-item
          field="teacher"
          label="授课教师"
          :rules="[{ required: true, message: '请输入授课教师' }]"
        >
          <a-input v-model="formData.teacher" placeholder="请输入授课教师" />
        </a-form-item>
        <a-form-item field="avatar" label="教师头像">
          <div style="display: flex; align-items: center; width: 100%">
            <a-input
              v-model="formData.avatar"
              placeholder="请输入教师头像URL"
              style="flex: 1"
              readonly
              @click="triggerFileInput"
            />
            <input
              ref="fileInputRef"
              type="file"
              accept="image/*"
              style="display: none"
              @change="handleFileChange"
            />
          </div>
        </a-form-item>
        <a-form-item field="type" label="课程类型">
          <a-select v-model="formData.type" placeholder="请选择课程类型">
            <a-option value="编程">编程</a-option>
            <a-option value="算法">算法</a-option>
            <a-option value="数据结构">数据结构</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="difficultyLevel" label="难度等级">
          <a-select
            v-model="formData.difficultyLevel"
            placeholder="请选择难度等级"
          >
            <a-option value="初级">初级</a-option>
            <a-option value="中级">中级</a-option>
            <a-option value="高级">高级</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="description" label="课程描述">
          <a-textarea
            v-model="formData.description"
            placeholder="请输入课程描述"
          />
        </a-form-item>
        <a-form-item
          field="price"
          label="课程价格"
          :rules="[{ required: true, message: '请输入课程价格' }]"
        >
          <a-input-number
            v-model="formData.price"
            placeholder="请输入课程价格"
          />
        </a-form-item>
        <a-form-item
          field="startTime"
          label="开始时间"
          :rules="[{ required: true, message: '请选择开始时间' }]"
        >
          <a-date-picker v-model="formData.startTime" show-time />
        </a-form-item>
        <a-form-item
          field="endTime"
          label="结束时间"
          :rules="[{ required: true, message: '请选择结束时间' }]"
        >
          <a-date-picker v-model="formData.endTime" show-time />
        </a-form-item>
        <a-form-item
          field="duration"
          label="学习时长"
          :rules="[{ required: true, message: '请输入学习时长' }]"
        >
          <a-input-number
            v-model="formData.duration"
            placeholder="请输入学习时长（天）"
          />
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary" @click="handleSubmit">保存</a-button>
            <a-button @click="handleCancel">取消</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { Message } from '@arco-design/web-vue';
import { useRouter } from 'vue-router';
import Breadcrumb from '@/components/breadcrumb/index.vue';
import {
  createCourse,
  type CourseCreateData,
  uploadTeacherAvatar
} from '@/api/gen-api/services/course.ts';

const fileInputRef = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);

const triggerFileInput = () => {
  fileInputRef.value?.click();
};

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    selectedFile.value = file;
    formData.avatar = file.name; // Display file name as placeholder
  }
};

const router = useRouter();
const formRef = ref();

const formData = reactive({
  name: '',
  teacher: '',
  avatar: '',
  type: '',
  difficultyLevel: '',
  description: '',
  price: 0,
  startTime: '',
  endTime: '',
  duration: 0
} as CourseCreateData);

const rules = {
  name: [{ required: true, message: '请输入课程名称' }],
  teacher: [{ required: true, message: '请输入授课教师' }],
  price: [{ required: true, message: '请输入课程价格' }],
  startTime: [{ required: true, message: '请选择开始时间' }],
  endTime: [{ required: true, message: '请选择结束时间' }],
  duration: [{ required: true, message: '请输入学习时长' }]
};

const handleSubmit = async () => {
  const validate = await formRef.value.validate();
  if (validate) {
    return;
  }

  // 格式化日期时间
  const formatDateTime = (dateTime: any) => {
    if (!dateTime) return '';
    if (typeof dateTime === 'string') return dateTime;
    if (dateTime instanceof Date) {
      const isoString = dateTime.toISOString();
      return isoString.slice(0, 19).replace('T', ' ');
    }
    // 如果是dayjs对象
    if (dateTime && typeof dateTime.format === 'function') {
      return dateTime.format('YYYY-MM-DD HH:mm:ss');
    }
    // 如果是dayjs对象但没有format方法，尝试转换为Date
    if (dateTime && dateTime.$d) {
      const date = new Date(dateTime.$d);
      const isoString = date.toISOString();
      return isoString.slice(0, 19).replace('T', ' ');
    }
    return '';
  };

  // 准备提交的数据
  const courseData: CourseCreateData = {
    name: formData.name,
    teacher: formData.teacher,
    avatar: '', // Avatar will be uploaded later
    type: formData.type || '',
    difficultyLevel: formData.difficultyLevel || '',
    description: formData.description || '',
    price: formData.price,
    startTime: formatDateTime(formData.startTime),
    endTime: formatDateTime(formData.endTime),
    duration: formData.duration
  };

  try {
    const response = await createCourse(courseData);
    if (response.data && response.data.code === 200) {
      const newCourse = response.data.result;
      if (selectedFile.value) {
        try {
          const uploadResponse = await uploadTeacherAvatar(
            newCourse.id,
            selectedFile.value
          );
          if (uploadResponse.data && uploadResponse.data.code === 200) {
            Message.success('课程添加成功，头像上传成功！');
          } else {
            Message.warning(
              `课程添加成功，但头像上传失败: ${
                uploadResponse.data.message || '未知错误'
              }`
            );
          }
        } catch (uploadError: any) {
          Message.warning(
            `课程添加成功，但头像上传失败: ${
              uploadError.response?.data?.message || '请检查上传服务'
            }`
          );
        }
      } else {
        Message.success('添加课程成功');
      }
      await router.push({ name: 'CourseList' });
    } else {
      Message.error(`添加课程失败：${response.data?.message || '未知错误'}`);
    }
  } catch (error: any) {
    console.error('添加课程错误:', error);
    if (error.response?.data?.message) {
      Message.error(`添加课程失败：${error.response.data.message}`);
    } else if (error.message) {
      Message.error(`添加课程失败：${error.message}`);
    } else {
      Message.error('添加课程失败，请检查网络连接');
    }
  }
};

const handleCancel = () => {
  router.push({ name: 'CourseList' });
};
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px;
}
</style>
