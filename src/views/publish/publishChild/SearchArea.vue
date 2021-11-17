<template>
  <div class="search">
    <van-search @input="searchArea" v-model="area.name" placeholder="请输入搜索关键词" />
    <van-cell :title="item.communityName" is-link @click="toPublish(item)" :key="item.community" v-for="item in areaList" />
  </div>
</template>

<script>
import {debounce} from '@/utils/utils'
export default {
  name: "SearchArea",
  data() {
    return {
      area: {
        id: 'AREA|88cff55c-aaa4-e2e0',
        name: '',
      },
      timer: '',
      areaList: []
    }
  },
  methods: {
    searchArea() {
      if(this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(_ => {
        this.$axios.get('area/community',{
          params: this.area
        }).then(res => {
          this.areaList = res.body
        })
      }, 500)
    },
    toPublish(community) {
      this.$router.push({
        name: 'publish',
        params: community
      })
    }
  }
}
</script>

<style scoped>

</style>