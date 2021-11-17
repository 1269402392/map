<template>
  <van-nav-bar
      :title="navInfo.title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"/>
</template>

<script>
export default {
  name: "NavBar",
  props: ['navInfo'],
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-nav-bar{
  position: fixed;
  top: 0;
  background-color: unset;
  width: 100%;
  z-index: 99;
}
</style>