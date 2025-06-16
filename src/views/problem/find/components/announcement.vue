<!--<template>
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

    &lt;!&ndash; 发布公告弹框 &ndash;&gt;
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

    &lt;!&ndash; 公告详情弹框 &ndash;&gt;
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
</template>-->
<template>
  <a-card class="general-card" hoverable title="公告">
    <template #extra>
      <a-button
        v-if="canPublish"
        type="primary"
        size="mini"
        class="publish-btn"
        @click="showDialog"
      >
        <template #icon><icon-plus /></template>
        发布
      </a-button>
    </template>
    <a-scrollbar style="height: 250px; overflow: auto">
      <div class="list">
        <div
          v-for="(item, idx) in list"
          :key="idx"
          class="item"
          @click="showDetail(item)"
        >
          <div class="item-content">
            <div class="item-main">
              <a-tag :color="item.type" size="small" class="type-tag">
                {{ getTypeLabel(item.type) }}
              </a-tag>
              <span class="content-link">
                {{ item.content }}
              </span>
            </div>
            <div class="item-time">
              <icon-clock-circle />
              {{ new Date(item.datetime).toLocaleDateString() }}
            </div>
          </div>
        </div>
      </div>
    </a-scrollbar>

    <!-- 发布公告弹框 -->
    <a-modal
      v-model:visible="visible"
      title="发布公告"
      :mask-closable="false"
      class="notice-modal publish-modal"
      :width="480"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form :model="form" layout="vertical" class="publish-form">
        <a-form-item label="公告类型" field="type">
          <a-select v-model="form.type" class="type-select">
            <a-option value="blue" label="功能">
              <template #icon><icon-bulb /></template>
              功能
            </a-option>
            <a-option value="orangered" label="修复">
              <template #icon><icon-bug /></template>
              修复
            </a-option>
            <a-option value="cyan" label="消息">
              <template #icon><icon-message /></template>
              消息
            </a-option>
          </a-select>
        </a-form-item>

        <a-form-item label="公告内容" field="content">
          <a-textarea
            v-model="form.content"
            placeholder="请输入公告内容"
            :auto-size="{ minRows: 3, maxRows: 5 }"
            class="content-textarea"
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
      class="notice-modal"
    >
      <a-form :model="detailForm" layout="vertical">
        <a-form-item label="公告类型" field="type">
          <a-input v-model="detailForm.type" readonly class="readonly-input" />
        </a-form-item>

        <a-form-item label="发布时间" field="datetime">
          <a-input
            v-model="detailForm.datetime"
            readonly
            class="readonly-input"
          />
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

<!--<style scoped lang="less">
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
</style>-->

<style scoped lang="less">
.general-card {
  width: 350px;
  height: 350px;
  background: var(--color-bg-2);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition: all 0.3s ease;

  :deep(.arco-card-header) {
    padding: 16px 20px;
    border-bottom: 1px solid var(--color-border);
  }

  :deep(.arco-card-body) {
    padding: 16px;
  }
}

.general-card:hover {
  box-shadow: 0 4px 20px rgb(0 0 0 / 8%);
  transform: translateY(-2px);
}

.list {
  padding: 4px;
}

.item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: var(--color-fill-2);
    border-color: var(--color-border);
  }

  .item-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .item-main {
    display: flex;
    gap: 8px;
    align-items: flex-start;
  }

  .type-tag {
    flex-shrink: 0;
    margin-top: 2px;
  }

  .content-link {
    flex: 1;
    overflow: hidden;
    font-size: 14px;
    line-height: 1.5;
    color: var(--color-text-1);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .item-time {
    display: flex;
    gap: 4px;
    align-items: center;
    margin-left: 198px;
    font-size: 13px;
    color: var(--color-text-3);

    :deep(.arco-icon) {
      font-size: 14px;
      color: var(--color-text-3);
    }
  }
}

.notice-modal {
  :deep(.arco-modal) {
    border-radius: 12px;
  }

  :deep(.arco-modal-header) {
    padding: 16px 20px;
    border-bottom: 1px solid var(--color-border);
  }

  :deep(.arco-modal-content) {
    padding: 20px;
  }
}

.type-select {
  width: 100%;
}

.content-textarea {
  :deep(.arco-textarea) {
    border-radius: 6px;
  }
}

.readonly-input {
  :deep(.arco-input) {
    cursor: default;
    background-color: var(--color-fill-2);
    border-color: var(--color-border);
  }
}

.content-box {
  padding: 12px;
  line-height: 1.6;
  color: var(--color-text-1);
  background: var(--color-fill-2);
  border-radius: 6px;
}

.publish-btn {
  height: 24px;
  padding: 0 8px;
  font-size: 12px;
  border-radius: 4px;

  :deep(.arco-icon) {
    margin-right: 4px;
    font-size: 12px;
  }
}

.publish-modal {
  :deep(.arco-modal) {
    overflow: hidden;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgb(0 0 0 / 10%);
  }

  :deep(.arco-modal-header) {
    padding: 16px 24px;
    background: var(--color-bg-2);
    border-bottom: 1px solid var(--color-border);

    .arco-modal-title {
      font-size: 16px;
      font-weight: 500;
    }
  }

  :deep(.arco-modal-content) {
    padding: 24px;
  }

  :deep(.arco-modal-footer) {
    padding: 16px 24px;
    background: var(--color-bg-2);
    border-top: 1px solid var(--color-border);
  }
}

.publish-form {
  .type-select {
    width: 100%;

    :deep(.arco-select-view) {
      padding: 4px 8px;
      border-radius: 6px;
    }
  }

  .content-textarea {
    :deep(.arco-textarea) {
      padding: 8px 12px;
      font-size: 14px;
      line-height: 1.6;
      border-color: var(--color-border);
      border-radius: 6px;
      transition: all 0.2s ease;

      &:hover {
        border-color: var(--color-primary-light-2);
      }

      &:focus {
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px var(--color-primary-light-1);
      }
    }
  }

  :deep(.arco-form-item-label) {
    margin-bottom: 8px;
    font-weight: 500;
  }
}
</style>
