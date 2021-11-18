<template>
  <van-search
      class="search"
      show-action
      :label="cityName"
      @click="searchClick"
      placeholder="点击选择地址">
    <template #action>
      <van-icon name="wap-home-o" @click="homeClick"/>
    </template>
  </van-search>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "SearchBar",
  computed: {
    ...mapState({
      cityName: 'cityName',
      cityId: 'cityId'
    })
  },
  methods: {
    searchClick() {
      this.$router.push('/chooseCity')
    },
    homeClick() {
      this.$router.push(({
        path: '/map',
        query: {
          cityId: this.cityId,
          cityName: this.cityName
        }
      }))
    }
  }
}
</script>

<style lang="less" scoped>
.search{
  position: absolute;
  top: 0;
  z-index: 1;
  width: 100%;
  .van-search__content{
    height: 30px;
    line-height: 30px;
    *{
      font-size: 13px;
    }
    .van-search__label{
      line-height: 30px;
    }
    .van-cell{
      padding: 3px 8px 5px 0;
    }
  }
  .van-search__action{
    .van-icon{
      font-size: 20px;
      position: relative;
      top: 3px;
    }
  }
}
</style>