<template>
  <div class="news">
    <nav-bar :nav-info="navInfo"/>
    <div class="news-list" >
      <news-item :item="item" v-for="item in newList" :key="item.id"/>
    </div>
    <tab-bar/>
  </div>
</template>

<script>
import NavBar from "components/common/navBar/NavBar";
import NewsItem from "./newsChildren/NewsItem";
export default {
  name: "News",
  data() {
    return {
      navInfo: { title: '新闻资讯' },
      newList: []
    }
  },

  activated() {
    this.$axios.get(`http://122.112.218.153:8095/home/news?area=${this.$store.state.cityId}`).then(res => {
      this.newList = res.body
    })
  },
  components: {NewsItem, NavBar},
}
</script>

<style lang="less" scoped>
  .news-list{
    padding: 0px 10px;
    margin-top: 15px;
  }
</style>