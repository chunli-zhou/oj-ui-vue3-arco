<template>
  <a-carousel
    class="carousel"
    :auto-play="true"
    :move-speed="1000"
    animation-name="fade"
    show-arrow="hover"
  >
    <a-carousel-item v-for="image in images" class="carousel-item">
      <img
        :src="image"
        :style="{
          width: '100%',
          height: '100%'
        }"
      />
    </a-carousel-item>
  </a-carousel>
</template>

<script>
export default {
  setup() {
    const images = [
      'http://127.0.0.1:9005/oj-bucket/zrxzrx-123615944728158208/2024-04-21/Dqc8Db9v4q-你的名字动漫壁纸_彼岸壁纸.jpg',
      'http://127.0.0.1:9005/oj-bucket/zrxzrx-123615944728158208/2024-04-21/HrMQ9L7zXP-报纸墙 可爱马尾辫少女粉色长发动漫壁纸_彼岸壁纸.jpg',
      'http://127.0.0.1:9005/oj-bucket/zrxzrx-123615944728158208/2024-04-21/lHrFioqYuD-《你的名字 》立花泷 宫水三叶桌面壁纸_彼岸壁纸.jpg'
    ];
    return {
      images
    };
  }
};
</script>

<style lang="less" scoped>
.carousel {
  width: 100%;
  height: 200px;

  &-item {
    border-radius: 10px;
  }
}
</style>
