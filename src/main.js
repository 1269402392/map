import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'amfe-flexible'
import axios from "./network/request";

import Vant from 'vant'
import 'vant/lib/index.css'

import './assets/font/iconfont.css'
import './assets/css/base.css'

import TabBar from "./components/common/tabBar/TabBar";
Vue.component('TabBar',TabBar)

Vue.config.productionTip = false
Vue.prototype.URL = 'http://122.112.218.153:8095'
Vue.prototype.$axios = axios
Vue.use(Vant)
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
