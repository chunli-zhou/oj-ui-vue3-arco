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
      topThreeUsers.value = users.slice(0, 3);
      topSevenUsers.value = users.slice(3, 10);
    }

    // 获取当前用户排名数据
    if (userId) {
      const currentUserResponse = await getCurrentUserRankingOther(userId);
      if (currentUserResponse.data.data) {
        const userData = currentUserResponse.data.data;
        currentUser.value = {
          avatar: userData.avatar || '',
          nickname: userData.nickname || '',
          submitCount: userData.totalSubmissions || 0,
          todaySubmissions: userData.todaySubmissions || 0,
          totalSubmissions: userData.totalSubmissions || 0
        };
      }

      const currentUserRankingResponse = await getCurrentUserRanking(userId);
      if (currentUserRankingResponse.data.data !== undefined) {
        const ranking = currentUserRankingResponse.data.data;
        // 先确保 ranking 是数字，再与 0 比较
        currentUserRanking.value =
          typeof ranking === 'number' && ranking < 0
            ? '暂无排名'
            : `${ranking}%`;
      }
    }
  } catch (error) {
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
  padding-right: 8px;
  overflow-y: auto;

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
  gap: 12px;
  align-items: center;
  padding: 8px 0;
}

.rank-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
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
  flex-shrink: 0;
  gap: 4px;
  width: 100px;
  min-width: 100px;
}

.nickname {
  overflow: hidden;
  font-size: 12px;
  color: var(--color-text-1);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.proficiency {
  display: flex;
  gap: 6px;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  span {
    overflow: hidden;
    font-size: 11px;
    color: var(--color-text-2);
    text-overflow: ellipsis;
  }

  img {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }
}

.submit-box {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 4px;
  font-size: 11px;
  color: var(--color-text-3);
  white-space: nowrap;
}

.fire-box {
  display: flex;
  flex-shrink: 0;
  align-items: center;
}

.fire-icon {
  width: 14px;
  height: 14px;
}

.current-user {
  position: sticky;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 12px;
  margin-top: 16px;
  background-color: rgb(0 0 0 / 3%);
  backdrop-filter: blur(4px);
  border-top: 1px solid var(--color-border);
}

.proficiency-rules {
  display: flex;
  flex-wrap: nowrap;
  gap: 16px;
  justify-content: space-between;
  padding: 24px;
}

.rule-item {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  min-width: 160px;

  img {
    width: 80px;
    height: 80px;
    margin-bottom: 12px;
  }

  .rule-text {
    width: 100%;
    font-size: 14px;
    color: var(--color-text-2);
    text-align: center;

    .threshold-text {
      margin-top: 4px;
      font-size: 11px;
      color: var(--color-text-3);
    }
  }
}
</style>
