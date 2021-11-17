<template>
  <!-- 轮播图 -->
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item class="banner-box" :key="item.id" v-for="item in banners">
      <img :src="getImg(item)"/>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import Login from "../../../views/login/Login";

export default {
  name: "Banners",
  props: ['banners'],
  methods: {
    getImg(imgSrc) {
      if(Object.prototype.toString.call(imgSrc) === '[object Object]') {
        return this.URL + imgSrc.imgSrc
      } else {
        return this.URL + imgSrc
      }
    }
  }
}
</script>

<style lang="less" scoped>
.banner-box{
  img{
    width: 100%;
    height: 180px;
    overflow: hidden;
  }
}
</style>