<template>
  <van-tabbar v-model="active">
    <van-tabbar-item
        :to="item.path"
        :icon="item.icon"
        v-for="item in barList">{{ item.label }}</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: "TabBar",
  props:['tabList'],
  data() {
    return {
      active: 0,
      barList: [
        {
          path: '/home',
          label: '首页',
          icon: 'home-o'
        },
        {
          path: '/searchHouse',
          label: '找房',
          icon: 'search'
        },
        {
          path: '/news',
          label: '资讯',
          icon: 'newspaper-o'
        },
        {
          path: '/mine',
          label: '我的',
          icon: 'user-o'
        },
      ],
    }
  },
  activated() {
    this.active = this.$store.state.active
  },
  deactivated() {
    this.$store.commit('addActive',this.active)
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
/deep/ .van-tabbar-item--active{
  color: #5ec19e;
}
</style>