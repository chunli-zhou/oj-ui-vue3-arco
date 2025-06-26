<template>
  <div class="container">
    <Breadcrumb :items="['课程管理', '编辑课程']" />
    <a-card class="general-card" title="编辑课程">
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
import { ref, reactive, watch } from 'vue';
import { Message } from '@arco-design/web-vue';
import { useRouter, useRoute } from 'vue-router';
import Breadcrumb from '@/components/breadcrumb/index.vue';
import {
  getCourseDetail,
  updateCourse,
  uploadTeacherAvatar
} from '@/api/gen-api/services/course';

const fileInputRef = ref<HTMLInputElement | null>(null);

const triggerFileInput = () => {
  fileInputRef.value?.click();
};

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    try {
      // 确保 formData.id 存在
      if (!formData.id) {
        Message.error('无法获取课程ID，请刷新页面后重试');
        return;
      }
      const response = await uploadTeacherAvatar(formData.id, file);
      if (response.data && response.data.code === 200) {
        formData.avatar = response.data.result; // 设置头像URL
        Message.success('头像上传成功');
      } else {
        Message.error(response.data.message || '头像上传失败');
      }
    } catch (error: any) {
      Message.error(
        error.response?.data?.message || '头像上传失败，请检查上传服务'
      );
    } finally {
      target.value = ''; // 清空文件选择
    }
  }
};

// 定义课程数据类型
interface CourseFormData {
  id: string;
  name: string;
  teacher: string;
  avatar: string;
  type: string;
  difficultyLevel: string;
  description: string;
  price: number;
  startTime: string;
  endTime: string;
  duration: number;
}

const router = useRouter();
const route = useRoute();
const formRef = ref();

const formData = reactive({
  id: '',
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
} as CourseFormData);

const rules = {
  name: [{ required: true, message: '请输入课程名称' }],
  teacher: [{ required: true, message: '请输入授课教师' }],
  price: [{ required: true, message: '请输入课程价格' }],
  startTime: [{ required: true, message: '请选择开始时间' }],
  endTime: [{ required: true, message: '请选择结束时间' }],
  duration: [{ required: true, message: '请输入学习时长' }]
};

const loadCourseData = async () => {
  try {
    const courseId = route.query.id as string;
    if (courseId) {
      // getCourseDetail 返回的是 AxiosResponse，其 data 属性才是后端返回的 Result 对象
      const response = await getCourseDetail(courseId);
      // 检查返回的数据和code
      if (response.data && response.data.code === 200) {
        const courseDetails = response.data.result;
        // 使用 Object.assign 来更新响应式对象，确保视图更新
        Object.assign(formData, courseDetails);
      } else {
        Message.error(response.data.message || '获取课程信息失败');
      }
    }
  } catch (error: any) {
    console.error('获取课程信息失败:', error);
    const errorMessage =
      error.response?.data?.message || '获取课程信息失败，请重试';
    Message.error(errorMessage);
  }
};

const handleSubmit = async () => {
  try {
    await formRef.value.validate();

    // 格式化日期时间
    const formatDateTime = (dateTime: any) => {
      if (!dateTime) return '';
      if (typeof dateTime === 'string') {
        // 如果已经是 'YYYY-MM-DD HH:mm:ss' 格式，直接返回
        if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(dateTime)) {
          return dateTime;
        }
        // 否则，尝试将其作为ISO字符串处理
        const date = new Date(dateTime);
        if (!Number.isNaN(date.getTime())) {
          const isoString = date.toISOString();
          return isoString.slice(0, 19).replace('T', ' ');
        }
        return dateTime; // 如果无法解析，返回原始值
      }
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

    // 确保传递给API的数据符合CourseData类型
    const courseData = {
      id: formData.id,
      name: formData.name,
      teacher: formData.teacher,
      avatar: formData.avatar || '',
      type: formData.type || '',
      difficultyLevel: formData.difficultyLevel || '',
      description: formData.description || '',
      price: formData.price,
      startTime: formatDateTime(formData.startTime),
      endTime: formatDateTime(formData.endTime),
      duration: formData.duration
    };

    await updateCourse(courseData); // 再次确认，这里只传递一个参数

    Message.success('更新成功');
    // 跳转回课程列表页
    await router.push({ name: 'CourseList' });
  } catch (error: any) {
    console.error('更新失败:', error);
    const errorMessage = error.response?.data?.message || '更新失败，请重试';
    Message.error(errorMessage);
  }
};

const handleCancel = () => {
  // 跳转回课程列表页
  router.push({ name: 'CourseList' });
};

watch(
  () => route.query.id,
  newId => {
    if (newId) {
      // 当课程ID变化时，重新加载数据
      loadCourseData();
    }
  },
  { immediate: true } // immediate: true 确保组件加载时立即执行一次，可以替代onMounted
);
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px;
}
</style>
