<template>
  <div class="collect">
    <nav-bar :nav-info="navInfo"/>
    <div class="collect-list" v-if="list.length > 0">
      <sheet-content v-for="item in list" :key="item.houseImg" :house="item" />
    </div>
    <van-empty v-else description="空空如也" />
  </div>
</template>

<script>
import NavBar from "components/common/navBar/NavBar";
import SheetContent from "components/content/SheetContent";
export default {
  name: "CollectHouse",
  data() {
    return {
      navInfo: { title: '我的收藏' },
      list: []
    }
  },
  activated() {
    this.list = this.$store.state.collectList
  },
  components: {SheetContent, NavBar}
}
</script>

<style lang="less" scoped>
  .collect-list{
    .content{
      &:last-of-type{
        border:none
      }
    }
  }
</style>