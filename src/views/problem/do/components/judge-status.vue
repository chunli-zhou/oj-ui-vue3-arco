<template>
  <a-card class="general-card h-full" title="判题状态">
    <template #extra>
      <transition name="alert">
        <div v-if="status === 'submit'">
          <a-alert class="tip-alert" :show-icon="false">正在提交判题</a-alert>
        </div>
        <div v-else-if="status === 'judge'">
          <a-alert class="tip-alert" :show-icon="false" type="warning">
            正在判题中
          </a-alert>
        </div>
        <div v-else-if="status === 'finish'">
          <a-alert class="tip-alert" :show-icon="false" type="success">
            判题完成
          </a-alert>
        </div>
      </transition>
    </template>
    <div class="spin-container">
      <transition name="slide-up">
        <div v-if="status === ''">点击提交开始判题</div>
        <div v-else-if="status === 'submit'">
          <a-spin dot>
            <template #tip>
              <a-progress style="width: 100px" :percent="progressPercent" />
            </template>
            <template #icon></template>
          </a-spin>
        </div>
        <div v-else-if="status === 'judge'">
          <a-progress
            animation
            :stroke-width="2"
            type="circle"
            :percent="judgePercent"
          />
        </div>
        <div v-else-if="status === 'finish'">
          <a-space direction="vertical">
            <a-form-item label="执行消息">
              <a-alert class="alert" type="success" :show-icon="false">
                {{ submitInfo.judgeInfo?.message || '无' }}
              </a-alert>
            </a-form-item>
            <a-form-item label="消耗内存：">
              <a-alert class="alert" type="normal" :show-icon="false">
                <a-statistic
                  animation
                  :animation-duration="1000"
                  separator="."
                  :value="Number(submitInfo.judgeInfo?.memory || 0)"
                  :value-style="{ fontSize: '1.0em' }"
                  show-group-separator
                />
                mb
              </a-alert>
            </a-form-item>
            <a-form-item label="消耗时间：">
              <a-alert class="alert" type="warning" :show-icon="false">
                <a-statistic
                  animation
                  :animation-duration="1000"
                  separator="."
                  :value="Number(submitInfo.judgeInfo?.time || 0)"
                  :value-style="{ fontSize: '1.0em' }"
                  show-group-separator
                />
                ms
              </a-alert>
            </a-form-item>
          </a-space>
        </div>
      </transition>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue';
import { OjProblemSubmitService } from '@/api/gen-api/services/OjProblemSubmitService.ts';
import { ProblemSubmitAddRequest } from '@/api/gen-api';
import type { OjProblemSubmitVo } from '@/api/gen-api/models/problem/OjProblemSubmitVo.ts';
import type { JudgeInfo } from '@/api/gen-api/models/problem/JudgeInfo.ts';

const judgePercent = ref(0);
const props = defineProps({
  flag: {
    type: String,
    default: ''
  },
  req: {
    type: Object as PropType<ProblemSubmitAddRequest>,
    default: null
  },
  submitId: {
    type: Number,
    default: null
  }
});

const status = ref('');
const progressPercent = ref(0);
const emit = defineEmits(['submitError', 'judgeFinish']);
const problemSubmitId = ref<number>();

// 初始化 submitInfo
const submitInfo = ref<OjProblemSubmitVo>({
  judgeInfo: {
    message: '',
    memory: 0,
    time: 0
  }
});

// 监听 req 变化，当有新的提交时重置状态
watch(
  () => props.req,
  newVal => {
    if (newVal?.value) {
      // 重置所有状态
      status.value = 'submit';
      progressPercent.value = 0;
      judgePercent.value = 0;
      submitInfo.value = {
        judgeInfo: {
          message: '',
          memory: 0,
          time: 0
        }
      };
      // 开始新的提交
      handleSubmit();
    }
  },
  { deep: true, immediate: true }
);

/**
 * 提交判题
 */
const handleSubmit = async () => {
  if (!props.req?.value) return;

  try {
    const res = await OjProblemSubmitService.doQuestionSubmit(props.req.value);
    if (res.result) {
      problemSubmitId.value = res.result;
      progressPercent.value = 1;
      status.value = 'judge';
      judgePercent.value = 0.5;
      // 开始获取判题信息
      getJudgeInfo();
    }
  } catch (error) {
    emit('submitError');
  }
};

/**
 * 获取判题信息
 */
const getJudgeInfo = async () => {
  if (!problemSubmitId.value) return;

  try {
    const res = await OjProblemSubmitService.getInfo(problemSubmitId.value);
    if (res.result) {
      if ([0, 1].includes(res.result.status)) {
        // 如果还在判题中，继续轮询
        setTimeout(() => {
          getJudgeInfo();
        }, 1000); // 每秒检查一次
      } else {
        // 判题完成
        judgePercent.value = 1;
        status.value = 'finish';
        // 设置判题结果
        const judgeInfo: JudgeInfo = {
          message: res.result.judgeInfo?.message || '无',
          memory: res.result.judgeInfo?.memory || 0,
          time: res.result.judgeInfo?.time || 0
        };
        submitInfo.value = {
          ...res.result,
          judgeInfo
        };
        emit('judgeFinish');
      }
    }
  } catch (error) {
    emit('submitError');
  }
};

// 监听 submitId 变化（回显逻辑）
watch(
  () => props.submitId,
  newVal => {
    if (newVal) {
      loadExistingSubmit(newVal);
    }
  },
  { immediate: true }
);

// 加载已有提交记录
const loadExistingSubmit = async (submitId: number) => {
  status.value = 'judge';
  judgePercent.value = 0.8;
  try {
    const res = await OjProblemSubmitService.getInfo(submitId);
    if (res.result) {
      // 设置判题信息
      const judgeInfo: JudgeInfo = {
        message: res.result.judgeInfo?.message || '无',
        memory: res.result.judgeInfo?.memory || 0,
        time: res.result.judgeInfo?.time || 0
      };
      submitInfo.value = {
        ...res.result,
        judgeInfo
      };
      if ([0, 1].includes(res.result.status)) {
        getJudgeInfo();
      } else {
        status.value = 'finish';
        judgePercent.value = 1;
      }
    }
  } catch (error) {
    status.value = '';
  }
};
</script>

<style scoped lang="less">
.alert {
  width: 450px;
}

.tip-alert {
  border-radius: 10px;
}

:deep(.arco-card-body) {
  height: 70%;
}

.spin-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.2s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(-50%);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.alert-enter-active,
.alert-leave-active {
  transition: all 0.25s ease-out;
}

.alert-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.alert-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
