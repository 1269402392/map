import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cityName: '' || localStorage.cityName,
    cityId: '' || localStorage.cityId,
    active: 0, //tabBar记录当前选中
    collectList: []
  },
  mutations: {
    add(state, payload) {
      state.cityName = localStorage.cityName = payload.label
      state.cityId = localStorage.cityId = payload.value
    },
    addActive(state, payload) {
      state.active = payload
    },
    //添加收藏
    addCollect(state, payload) {
      state.collectList.push(payload)
    },
    //删除收藏
    delCollect(state, payload) {
      state.collectList = state.collectList.filter(item => {
        return item.houseCode != payload.houseCode
      })
    }
  }
})
