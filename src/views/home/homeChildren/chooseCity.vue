<template>
  <div class="choose">
    <nav-bar :nav-info="{title: '城市选择'}"/>
    <van-index-bar :index-list="letterList">
      <div :key="index" v-for="(item, index) in cityList">
        <van-index-anchor :index="item.title">{{item.title}}</van-index-anchor>
        <van-cell
            :title="line.label"
            :key="line.label"
            v-for="line in item.titleList"
            @click="lineClick(line)"/>
      </div>
    </van-index-bar>
  </div>

</template>

<script>
import { mapMutations } from 'vuex'
import NavBar from "components/common/navBar/NavBar";
export default {
  name: "chooseCity",
  data() {
    return {
      cityList: [], //存储城市信息
      letterList: [], //存储字母列表
    }
  },
  components: {NavBar},
  methods: {
    ...mapMutations(['add']),
    lineClick(line) {
      this.add(line)
      this.$router.go(-1)
    },
  },
  async created() {
    const { body : res } = await this.$axios.get('area/city?level=1') //获取城市列表
    let cityList = res.map(item => {
      item.short = item.short.substring(0,1).toUpperCase()
      return item
    })

    cityList.forEach(item => { //过滤重复字母
      if(!this.letterList.includes(item.short)) this.letterList.push(item.short)
    })
    this.letterList.sort(); // 对字母数组进行排序

    this.letterList.forEach(group => { // 循环字母对象
      let list = [] // 存储字母所拥有的所有城市对象
      cityList.forEach(item => { // 循环所有城市
          if(group === item.short) list.push(item) // 判断首城市标识(A = '北京 or 北海') 相同 -> 并添加到数组
      })
      this.cityList.push({ // 将每个字母转换为单独的对象
        title: group,
        titleList: list
      })
    })
  }
}
</script>

<style lang="less" scoped>
  .choose{
    /deep/.van-index-bar__index{
      margin-top: 8px;
    }
    /deep/ .van-nav-bar{
      position: sticky;
      top: 0;
      z-index: 99;
    }
  }
</style>