<template>
  <a-card class="general-card" hoverable title="公告">
    <template #extra>
      <a-link v-if="canPublish" @click="showDialog">发布公告</a-link>
    </template>
    <a-scrollbar style="height: 250px; overflow: auto">
      <div class="list">
        <div v-for="(item, idx) in list" :key="idx" class="item">
          <a-tag :color="item.type" size="small">
            {{ getTypeLabel(item.type) }}
          </a-tag>
          <span
            style="cursor: pointer"
            class="content-link"
            @click="showDetail(item)"
          >
            {{ item.content }}
          </span>
        </div>
      </div>
    </a-scrollbar>

    <!-- 发布公告弹框 -->
    <a-modal
      v-model:visible="visible"
      title="发布公告"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form :model="form" layout="vertical">
        <a-form-item label="公告类型" field="type">
          <a-select v-model="form.type">
            <a-option value="blue" label="功能"></a-option>
            <a-option value="orangered" label="修复"></a-option>
            <a-option value="cyan" label="消息"></a-option>
          </a-select>
        </a-form-item>

        <a-form-item label="公告内容" field="content">
          <a-textarea
            v-model="form.content"
            placeholder="请输入公告内容"
            :auto-size="{ minRows: 3, maxRows: 5 }"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 公告详情弹框 -->
    <a-modal
      v-model:visible="detailVisible"
      title="公告详情"
      :footer="false"
      :mask-closable="true"
    >
      <a-form :model="detailForm" layout="vertical">
        <a-form-item label="公告类型" field="type">
          <a-input v-model="detailForm.type" readonly />
        </a-form-item>

        <a-form-item label="发布时间" field="datetime">
          <a-input v-model="detailForm.datetime" readonly />
        </a-form-item>

        <a-form-item label="公告内容" field="content">
          <a-scrollbar style="height: 200px">
            <div class="content-box">
              {{ detailForm.content }}
            </div>
          </a-scrollbar>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { Message } from '@arco-design/web-vue';
import {
  getNoticeList,
  getUserPermission,
  addNotice,
  getNotice
} from '@/api/gen-api/services/FindQuestionElement';
import useUserStore from '@/store/modules/user/index';

const userStore = useUserStore();
const userId = userStore.id; // 当前登录用户ID
interface NoticeItem {
  type: string;
  content: string;
  datetime: string;
  id: number;

  [key: string]: any;
}

const list = ref<NoticeItem[]>([]);

const visible = ref(false); // 发布公告弹框显示隐藏
const detailVisible = ref(false); // 公告详情弹框隐藏
const canPublish = ref(false); // 发布公告文字显示隐藏
const form = reactive({
  type: 'blue',
  content: ''
});

const detailForm = reactive<Partial<NoticeItem>>({
  type: '',
  datetime: '',
  content: ''
});

const fetchNotices = async () => {
  try {
    const response = await getNoticeList();
    // response.data.data 就是公告数组
    console.log('getNoticeList response:', response);
    list.value = response.data.data as NoticeItem[];
  } catch (error) {
    console.log('Failed to fetch notices:', error);
    Message.error('获取公告列表失败');
  }
};

const getTypeLabel = (typeValue: string): string => {
  switch (typeValue) {
    case 'blue':
      return '功能';
    case 'orangered':
      return '修复';
    case 'cyan':
      return '消息';
    default:
      return typeValue;
  }
};

const showDialog = () => {
  form.type = 'blue';
  form.content = '';
  visible.value = true;
};

const handleOk = async () => {
  if (!form.content.trim()) {
    Message.warning('公告内容不能为空');
    return;
  }
  try {
    const noticeData = {
      type: form.type,
      content: form.content
    };
    const response = await addNotice(noticeData);
    console.log('Add notice response:', response);
    Message.success('公告发布成功');
    visible.value = false;
    await fetchNotices();
  } catch (error) {
    console.error('Failed to publish notice:', error);
    Message.error('公告发布失败');
  }
};

const handleCancel = () => {
  visible.value = false;
};

// 显示公告详情
const showDetail = async (item: NoticeItem) => {
  try {
    if (!item.id) {
      Message.error('公告ID不存在');
      return;
    }
    const response = await getNotice(item.id);
    const noticeData = response.data.data;

    detailForm.type = getTypeLabel(noticeData.type);
    // 转换时区，处理datetime为null的情况
    detailForm.datetime = noticeData.datetime
      ? new Date(noticeData.datetime).toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        })
      : '暂无时间';
    detailForm.content = noticeData.content;
    detailVisible.value = true;
  } catch (error) {
    console.error('Failed to fetch notice details:', error);
    Message.error('获取公告详情失败');
  }
};

// 检查当前用户的权限，如果权限为2或以上，就不显示
const arr = [0, 1];
const checkUserPermissions = async () => {
  try {
    if (userId) {
      const response = await getUserPermission(userId);
      const permission = response.data.data;
      console.log('permission', permission);
      // permission 就是后端返回的数字
      if (arr.includes(permission)) {
        canPublish.value = true;
      } else {
        canPublish.value = false;
      }
    }
  } catch (error) {
    console.error('Failed to get user permissions:', error);
    canPublish.value = false;
  }
};
onMounted(async () => {
  await fetchNotices();
  await checkUserPermissions();
});
</script>

<style scoped lang="less">
.general-card {
  width: 350px;
  height: 350px;
  border-radius: 10px;
}

.general-card:hover {
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 10%);
}

.list {
  padding: 4px;
}

.item {
  display: flex;
  gap: 8px;
  width: 100%;
  max-width: 100%;
  margin-bottom: 8px;

  .content-link {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
