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
          <a-skeleton
            v-if="submitInfo.judgeInfo === null"
            animation
            :loading="true"
          >
            <a-space
              direction="vertical"
              :style="{ width: '100%' }"
              size="large"
            >
              <a-skeleton-line :rows="3" :widths="[450, 450, 450]" />
            </a-space>
          </a-skeleton>
          <a-space v-else direction="vertical">
            <a-form-item label="执行消息：">
              <a-alert class="alert" type="success" :show-icon="false">
                {{
                  submitInfo.judgeInfo.message === ''
                    ? '无'
                    : submitInfo.judgeInfo.message
                }}
              </a-alert>
            </a-form-item>
            <a-form-item label="消耗内存：">
              <a-alert class="alert" type="normal" :show-icon="false">
                {{
                  submitInfo.judgeInfo.memory === null
                    ? 'Non'
                    : submitInfo.judgeInfo.memory
                }}
                MB
              </a-alert>
            </a-form-item>
            <a-form-item label="消耗时间：">
              <a-alert class="alert" type="warning" :show-icon="false">
                {{
                  submitInfo.judgeInfo.time === null
                    ? 'Non'
                    : submitInfo.judgeInfo.time
                }}
                毫秒
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

const judgePercent = ref(0);
const props = defineProps({
  flag: {
    type: String,
    default: ''
  },
  req: {
    type: Object as PropType<ProblemSubmitAddRequest>,
    default: null
  }
});

const status = ref('');
const progressPercent = ref(0);
watch(
  () => props.flag,
  () => {
    status.value = props.flag;
    if (status.value === 'submit') {
      handleSubmit();
      setTimeout(() => {
        progressPercent.value = 0.8;
      }, 500);
    }
  }
);

const emit = defineEmits(['submitError']);
const problemSubmitId = ref<number>();

/**
 * 提交判题
 */
const handleSubmit = async () => {
  OjProblemSubmitService.doQuestionSubmit(props.req.value)
    .then(res => {
      if (res.result) {
        problemSubmitId.value = res.result;
        progressPercent.value = 1;
        setTimeout(() => {
          status.value = 'judge';
          setTimeout(() => {
            judgePercent.value = 0.5;
            setTimeout(() => {
              // setJudgeInterval();
              getJudgeInfo();
              judgePercent.value = 0.8;
            }, 500);
          }, 1000);
        }, 1000);
      }
    })
    .catch(() => {
      emit('submitError');
    });
};
const submitInfo = ref<OjProblemSubmitVo>({});
/**
 * 获取判题信息
 */
const getJudgeInfo = async () => {
  OjProblemSubmitService.getInfo(problemSubmitId.value).then(res => {
    // （0 - 待判题、1 - 判题中、2 - 成功、3 - 失败）
    if (res.result) {
      if ([0, 1].includes(res.result.status)) {
        getJudgeInfo();
        // TODO: 处理 code_status
      } else {
        setTimeout(() => {
          judgePercent.value = 1;
          setTimeout(() => {
            status.value = 'finish';
            submitInfo.value = res.result;
          }, 1000);
        }, 500);
      }
    }
  });
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
  left: 50%;
  top: 50%;
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
