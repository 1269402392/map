import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cityName: '' || localStorage.cityName,
    cityId: '' || localStorage.cityId,
    active: 0, //tabBar记录当前选中
  },
  mutations: {
    add(state, payload) {
      state.cityName = localStorage.cityName = payload.label
      state.cityId = localStorage.cityId = payload.value
    },
    addActive(state, payload) {
      state.active = payload
    }
  }
})
