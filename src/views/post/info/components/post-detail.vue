<template>
  <a-card>
    <a-card-meta>
      <template #title>
        <div>
          <a-typography-title v-if="post.title !== ''" :heading="2" bold>
            {{ post.title }}
          </a-typography-title>
          <a-skeleton v-else animation>
            <a-skeleton-line :rows="1" :widths="['40%']" />
          </a-skeleton>
        </div>
        <div>
          <a-row>
            <a-col :span="4">
              <div class="second-info">
                <a-space size="mini">
                  <icon-user />
                  <a-typography-text class="second-info-color">
                    {{ post.creatorName }}
                  </a-typography-text>
                </a-space>
              </div>
            </a-col>
            <a-col :span="3">
              <div class="second-info">
                <a-space size="mini">
                  <icon-clock-circle />
                  <a-typography-text class="second-info-color">
                    {{ post.createTime }}
                  </a-typography-text>
                </a-space>
              </div>
            </a-col>
            <a-col :span="3">
              <div class="second-info">
                <a-space size="mini">
                  <icon-eye />
                  <a-typography-text class="second-info-color">
                    {{ post.viewNum }}
                  </a-typography-text>
                </a-space>
              </div>
            </a-col>
          </a-row>
        </div>
      </template>
      <template #description>
        <MdPreview
          v-if="post.content !== ''"
          :modelValue="post.content"
          @on-get-catalog="handleGetCatalog"
        />
        <a-skeleton v-else animation>
          <a-space direction="vertical" fill size="large">
            <a-skeleton-line
              :rows="8"
              :widths="[
                '40%',
                '60%',
                '60%',
                '100%',
                '100%',
                '100%',
                '100%',
                '50%'
              ]"
            />
          </a-space>
        </a-skeleton>
      </template>
    </a-card-meta>
  </a-card>
</template>

<script setup lang="ts">
import { MdPreview } from 'md-editor-v3';
import { ref, watch } from 'vue';
import { OjPostVo } from '@/api/gen-api';

const props = defineProps<{
  postInfo: OjPostVo;
}>();

const emit = defineEmits(['catalogChange']);

const handleGetCatalog = (catalog: string) => {
  emit('catalogChange', catalog);
};

watch(
  () => props.postInfo,
  () => {
    if (props.postInfo) {
      post.value = props.postInfo;
      // 确保头像路径正确
      if (post.value.avatar && !post.value.avatar.startsWith('http')) {
        post.value.avatar = 'http://localhost:8996/api' + post.value.avatar;
      }
    }
  }
);

const post = ref<OjPostVo>({
  content: '',
  title: '',
  creatorName: '',
  createTime: '',
  viewNum: 0
});
</script>

<style scoped lang="less">
.second-info {
  margin-bottom: 4px;
  color: rgb(0 0 0 / 45%);

  &-color {
    color: rgb(0 0 0 / 45%);
  }
}
</style>
