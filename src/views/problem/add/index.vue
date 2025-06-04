<template>
  <div class="add-problem-container">
    <div class="page-header">
      <h2>添加题目</h2>
    </div>

    <!-- 步骤导航 -->
    <div class="steps-container">
      <a-steps :current="currentStep" :items="steps" />
    </div>

    <!-- 内容区域 -->
    <div class="content-container">
      <!-- 基本信息 -->
      <div v-show="currentStep === 0">
        <BasicInfo v-model:form="formData.basicInfo" @next="handleNext" />
      </div>

      <!-- 题目描述 -->
      <div v-show="currentStep === 1">
        <ProblemDescription
          v-model:form="formData.description"
          @prev="handlePrev"
          @next="handleNext"
        />
      </div>

      <!-- 题目答案 -->
      <div v-show="currentStep === 2">
        <ProblemAnswer
          v-model:form="formData.answer"
          @prev="handlePrev"
          @next="handleNext"
        />
      </div>

      <!-- 判题用例 -->
      <div v-show="currentStep === 3">
        <TestCases
          v-model:form="formData.testCases"
          @prev="handlePrev"
          @next="handleNext"
        />
      </div>

      <!-- 判题配置 -->
      <div v-show="currentStep === 4">
        <JudgeConfig
          v-model:form="formData.judgeConfig"
          @prev="handlePrev"
          @submit="handleSubmit"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { Message } from '@arco-design/web-vue';
import BasicInfo from './components/BasicInfo.vue';
import ProblemDescription from './components/ProblemDescription.vue';
import ProblemAnswer from './components/ProblemAnswer.vue';
import TestCases from './components/TestCases.vue';
import JudgeConfig from './components/JudgeConfig.vue';
import { useRouter } from 'vue-router';
import { OjProblemAddRequest, OjProblemService } from '@/api/gen-api';

interface TestCase {
  input: string;
  output: string;
}

interface BasicInfoForm {
  title: string;
  tags: string[];
  difficulty: string;
}

interface AnswerForm {
  theme: string;
  language: string;
  code: string;
}

interface JudgeConfigForm {
  timeLimit: number;
  memoryLimit: number;
  stackLimit: number;
}

const currentStep = ref(0);

const steps = [
  { title: '基本信息' },
  { title: '题目描述' },
  { title: '题目答案' },
  { title: '判题用例' },
  { title: '判题配置' }
];

const formData = reactive({
  basicInfo: {
    title: '',
    tags: [] as string[],
    difficulty: '0' // 使用字符串类型，与组件保持一致
  } as BasicInfoForm,
  description: '',
  answer: {
    theme: 'Dark',
    language: '',
    code: `import java.util.Scanner;
    // 1:无需package
    // 2: 类名必须Main, 不可修改

    public class Main {
        public static void main(String[] args) {
            Scanner scan = new Scanner(System.in);
            //在此输入您的代码...
            scan.close();
        }
    }`
  } as AnswerForm,
  testCases: [] as TestCase[],
  judgeConfig: {
    memoryLimit: 128,
    stackLimit: 128,
    timeLimit: 1000
  } as JudgeConfigForm
});

const router = useRouter();

const handleNext = () => {
  if (currentStep.value < 4) {
    currentStep.value++;
  }
};

const handlePrev = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};

// 映射 difficulty 的字符到数字
const difficultyMap = {
  '0': 0,
  '1': 1,
  '2': 2
};

// 验证表单数据
const validateForm = () => {
  // 验证标题
  if (!formData.basicInfo.title?.trim()) {
    Message.error('题目标题不能为空');
    return false;
  }

  // 验证内容
  if (!formData.description?.trim()) {
    Message.error('题目内容不能为空');
    return false;
  }

  // 验证标签
  if (!formData.basicInfo.tags?.length) {
    Message.error('请至少输入一个标签');
    return false;
  }

  // 验证难度
  if (!formData.basicInfo.difficulty) {
    Message.error('请选择题目难度');
    return false;
  }

  // 验证答案语言
  if (!formData.answer.language?.trim()) {
    Message.error('题目答案语言不能为空');
    return false;
  }

  // 验证答案代码
  if (!formData.answer.code?.trim()) {
    Message.error('题目答案不能为空');
    return false;
  }

  // 验证判题用例
  if (!formData.testCases?.length) {
    Message.error('请添加判题用例');
    return false;
  }

  // 验证判题配置
  if (!formData.judgeConfig) {
    Message.error('请配置判题参数');
    return false;
  }

  return true;
};

// 在表单提交时，将 difficulty 从字符转换为数字
const handleSubmit = async () => {
  try {
    // 表单验证
    if (!validateForm()) {
      return;
    }

    // 处理 judgeCase 数据
    const processedJudgeCase = formData.testCases.map(testCase => ({
      input: testCase.input?.trim() || '',
      output: testCase.output?.trim() || ''
    }));

    // 处理 judgeConfig 数据
    const processedJudgeConfig = {
      timeLimit: formData.judgeConfig.timeLimit || 1000,
      memoryLimit: formData.judgeConfig.memoryLimit || 128,
      stackLimit: formData.judgeConfig.stackLimit || 128
    };

    // 构建符合 OjProblemRequest 类型的请求数据
    const requestData: OjProblemAddRequest = {
      title: formData.basicInfo.title.trim(),
      content: formData.description.trim(),
      tags: formData.basicInfo.tags,
      difficulty:
        difficultyMap[
          formData.basicInfo.difficulty as keyof typeof difficultyMap
        ],
      ansLanguage: formData.answer.language.trim(),
      answer: formData.answer.code.trim(),
      judgeCase: processedJudgeCase,
      judgeConfig: processedJudgeConfig
    };

    console.log('开始提交数据:', JSON.stringify(requestData, null, 2));
    const response = await OjProblemService.save(requestData);
    console.log('提交响应:', response);

    if (response) {
      Message.success('题目添加成功');
      // 返回题目管理界面
      router.push('/problem/manage').catch(() => {});
    } else {
      Message.error('题目添加失败');
    }
  } catch (error: any) {
    console.error('添加题目失败，详细错误:', error);
    console.error('错误响应数据:', error.response?.data);
    console.error('错误状态码:', error.response?.status);

    // 显示更详细的错误信息
    if (error.response?.data?.message) {
      Message.error(`添加失败: ${error.response.data.message}`);
    } else if (error.response?.data?.error) {
      Message.error(`添加失败: ${error.response.data.error}`);
    } else {
      Message.error(error?.message || '题目添加失败，请检查数据格式是否正确');
    }
  }
};
</script>

<style scoped>
.add-problem-container {
  padding: 20px;
}

.page-header {
  margin-bottom: 24px;
}

.steps-container {
  margin-bottom: 32px;
}

.content-container {
  padding: 24px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 8%);
}
</style>
