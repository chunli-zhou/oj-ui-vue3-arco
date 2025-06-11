<template>
  <a-card class="general-card">
    <template #title>
      <a-space>
        排行榜
        <a-tooltip content="点击查看熟练度规则">
          <icon-question-circle
            style="position: absolute; right: 30px"
            @click="showRulesModal = true"
          />
        </a-tooltip>
      </a-space>
    </template>

    <div class="user-list-container">
      <!-- 前三名 -->
      <a-list :data="topThreeUsers" :bordered="false">
        <template #item="{ item, index }">
          <a-list-item>
            <div class="user-list-item">
              <div class="rank-box">
                <img
                  :src="rankingImages[index]"
                  :alt="`第${index + 1}名`"
                  class="rank-image"
                />
              </div>
              <div class="avatar-box">
                <a-avatar :size="32" :image-url="item.avatar" />
              </div>
              <div class="info-box">
                <div class="nickname text-ellipsis">{{ item.nickname }}</div>
                <div class="proficiency">
                  <span>{{ getProficiencyTitle(item.totalSubmissions) }}</span>
                  <img
                    :src="getProficiencyImage(item.totalSubmissions)"
                    :alt="getProficiencyTitle(item.totalSubmissions)"
                  />
                </div>
              </div>
              <div class="submit-box">
                <span>提交数: {{ item.totalSubmissions }}</span>
              </div>
              <div class="fire-box">
                <a-tooltip content="当日题目提交数>=5">
                  <img
                    v-if="item.todaySubmissions >= 5"
                    src="/src/assets/proficiency/火.png"
                    class="fire-icon"
                  />
                </a-tooltip>
              </div>
            </div>
          </a-list-item>
        </template>
      </a-list>

      <!-- 第4-10名 -->
      <a-list :data="topSevenUsers" :bordered="false">
        <template #item="{ item, index }">
          <a-list-item>
            <div class="user-list-item">
              <div class="rank-box">
                {{ index + 4 }}
              </div>
              <div class="avatar-box">
                <a-avatar :size="32" :image-url="item.avatar" />
              </div>
              <div class="info-box">
                <div class="nickname text-ellipsis">{{ item.nickname }}</div>
                <div class="proficiency">
                  <span>{{ getProficiencyTitle(item.totalSubmissions) }}</span>
                  <img
                    :src="getProficiencyImage(item.totalSubmissions)"
                    :alt="getProficiencyTitle(item.totalSubmissions)"
                  />
                </div>
              </div>
              <div class="submit-box">
                <span>提交数: {{ item.totalSubmissions }}</span>
              </div>
              <div class="fire-box">
                <a-tooltip content="当日题目提交数>=5">
                  <img
                    v-if="item.todaySubmissions >= 5"
                    src="/src/assets/proficiency/火.png"
                    class="fire-icon"
                  />
                </a-tooltip>
              </div>
            </div>
          </a-list-item>
        </template>
      </a-list>

      <!-- 当前用户 -->
      <div v-if="currentUser" class="current-user">
        <div class="user-list-item">
          <!-- 排名显示 -->
          <div
            class="rank-box"
            :class="{ 'no-ranking': currentUserRanking == '暂无排名' }"
          >
            {{ currentUserRanking }}
          </div>
          <div class="avatar-box">
            <a-avatar :size="32" :image-url="currentUser.avatar" />
          </div>
          <div class="info-box">
            <div class="nickname text-ellipsis">{{ currentUser.nickname }}</div>
            <div class="proficiency">
              <span>{{ getProficiencyTitle(currentUser.submitCount) }}</span>
              <img
                :src="getProficiencyImage(currentUser.submitCount)"
                :alt="getProficiencyTitle(currentUser.submitCount)"
              />
            </div>
          </div>
          <div class="submit-box">
            <div>总提交数: {{ currentUser.totalSubmissions }}</div>
            <div>今日提交: {{ currentUser.todaySubmissions }}</div>
          </div>
          <div class="fire-box">
            <a-tooltip content="当日题目提交数>=5">
              <img
                v-if="currentUser.todaySubmissions >= 5"
                src="/src/assets/proficiency/火.png"
                class="fire-icon"
              />
            </a-tooltip>
          </div>
        </div>
      </div>
    </div>

    <!-- 熟练度规则 -->
    <a-modal
      v-model:visible="showRulesModal"
      title="熟练度规则"
      :footer="false"
      :width="1200"
    >
      <div class="proficiency-rules">
        <div
          v-for="(rule, index) in proficiencyRules"
          :key="index"
          class="rule-item"
        >
          <a-tooltip
            v-if="rule.title === '稳坐泰山'"
            content="用户首次达到做题次数一万时，可以和胜男舌吻"
          >
            <img :src="rule.image" :alt="rule.title" />
          </a-tooltip>
          <img v-else :src="rule.image" :alt="rule.title" />
          <div class="rule-text">
            {{ rule.title }}
            <p class="threshold-text">（做题次数>={{ rule.threshold }}）</p>
          </div>
        </div>
      </div>
    </a-modal>
  </a-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Message } from '@arco-design/web-vue';
import {
  getHotUser,
  getCurrentUserRankingOther,
  getCurrentUserRanking
} from '@/api/gen-api/services/FindQuestionElement';
import useUserStore from '@/store/modules/user/index';
const userStore = useUserStore();
const userId = userStore.id; // 当前登录用户ID
interface User {
  avatar: string;
  nickname: string;
  submitCount: number;
  todaySubmissions: number;
  totalSubmissions: number;
}

const showRulesModal = ref(false);
const topThreeUsers = ref<User[]>([]);
const topSevenUsers = ref<User[]>([]);
const currentUser = ref<User | null>(null);
const currentUserRanking = ref<string | number>('暂无排名');

const rankingImages = [
  '/src/assets/proficiency/1.png',
  '/src/assets/proficiency/2.png',
  '/src/assets/proficiency/3.png'
];

const proficiencyRules = [
  {
    title: '初出茅庐',
    threshold: 1,
    image: '/src/assets/proficiency/见习.png'
  },
  {
    title: '崭露头角',
    threshold: 25,
    image: '/src/assets/proficiency/精英.png'
  },
  {
    title: '小有成就',
    threshold: 100,
    image: '/src/assets/proficiency/超凡.png'
  },
  {
    title: '渐入佳境',
    threshold: 500,
    image: '/src/assets/proficiency/巅峰.png'
  },
  {
    title: '如日中天',
    threshold: 1500,
    image: '/src/assets/proficiency/传说.png'
  },
  {
    title: '稳坐泰山',
    threshold: 10000,
    image: '/src/assets/proficiency/神话.png'
  }
];

const getProficiencyImage = (submitCount: number) => {
  for (let i = proficiencyRules.length - 1; i >= 0; i--) {
    if (submitCount >= proficiencyRules[i].threshold) {
      return proficiencyRules[i].image;
    }
  }
  return proficiencyRules[0].image;
};

const getProficiencyTitle = (submitCount: number) => {
  for (let i = proficiencyRules.length - 1; i >= 0; i--) {
    if (submitCount >= proficiencyRules[i].threshold) {
      return proficiencyRules[i].title;
    }
  }
  return proficiencyRules[0].title;
};

const fetchUserData = async () => {
  try {
    const response = await getHotUser();
    if (response.data.data) {
      const users = response.data.data;
      // 处理头像路径
      const processedUsers = users.map(user => ({
        ...user,
        avatar:
          user.avatar && !user.avatar.startsWith('http')
            ? 'http://localhost:8996/api' + user.avatar
            : user.avatar || '',
        nickname: user.nickname || '匿名用户'
      }));

      topThreeUsers.value = processedUsers.slice(0, 3);
      topSevenUsers.value = processedUsers.slice(3, 10);
    }

    // 获取当前用户排名数据
    if (userId) {
      const currentUserResponse = await getCurrentUserRankingOther(userId);
      if (currentUserResponse.data.data) {
        const userData = currentUserResponse.data.data;
        currentUser.value = {
          avatar:
            userData.avatar && !userData.avatar.startsWith('http')
              ? 'http://localhost:8996/api' + userData.avatar
              : userData.avatar || '',
          nickname: userData.nickname || '匿名用户',
          submitCount: userData.totalSubmissions || 0,
          todaySubmissions: userData.todaySubmissions || 0,
          totalSubmissions: userData.totalSubmissions || 0
        };
      }

      const currentUserRankingResponse = await getCurrentUserRanking(userId);
      if (currentUserRankingResponse.data.data !== undefined) {
        const ranking = currentUserRankingResponse.data.data;
        currentUserRanking.value =
          typeof ranking === 'number' && ranking < 0
            ? '暂无排名'
            : `${ranking}%`;
      }
    }
  } catch (error) {
    console.error('获取用户数据失败:', error);
    Message.error('获取用户数据失败');
  }
};

onMounted(() => {
  fetchUserData();
});
</script>

<style scoped lang="less">
.general-card {
  border-radius: 10px;
}

.user-list-container {
  height: 300px;
  overflow-y: auto;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-fill-3);
    border-radius: 2px;
  }

  &::-webkit-scrollbar-track {
    background-color: var(--color-fill-1);
    border-radius: 2px;
  }
}

.user-list-item {
  display: flex;
  align-items: center;
  padding: 8px 0;
  gap: 12px;
}

.rank-box {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: var(--color-text-2);
}
.no-ranking {
  font-size: 10px;
  color: var(--color-text-3); /* 小字号显示 "暂无排名" */
}
.rank-image {
  width: 75%;
  height: 75%;
  object-fit: contain;
}

.avatar-box {
  display: flex;
  align-items: center;
}

.info-box {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100px;
  min-width: 100px;
  flex-shrink: 0;
}

.nickname {
  color: var(--color-text-1);
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.proficiency {
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  span {
    font-size: 11px;
    color: var(--color-text-2);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  img {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
}

.submit-box {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 11px;
  color: var(--color-text-3);
  white-space: nowrap;
  flex-shrink: 0;
}

.fire-box {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.fire-icon {
  width: 14px;
  height: 14px;
}

.current-user {
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: 16px;
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.03);
  border-top: 1px solid var(--color-border);
  backdrop-filter: blur(4px);
}

.proficiency-rules {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  gap: 16px;
  padding: 24px;
}

.rule-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 160px;

  img {
    width: 80px;
    height: 80px;
    margin-bottom: 12px;
  }

  .rule-text {
    font-size: 14px;
    text-align: center;
    color: var(--color-text-2);
    width: 100%;

    .threshold-text {
      font-size: 11px;
      color: var(--color-text-3);
      margin-top: 4px;
    }
  }
}
</style>
