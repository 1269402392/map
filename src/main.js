import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//添加事件总线
import VueBus from "vue-bus";
Vue.use(VueBus)

import 'amfe-flexible'
import axios from "./network/request";

import Vant from 'vant'
import 'vant/lib/index.css'

import './assets/font/iconfont.css'
import './assets/css/base.css'

import TabBar from "./components/common/tabBar/TabBar";
import Scroll from "./components/common/scroll/Scroll";
Vue.component('TabBar',TabBar)
Vue.component('Scroll',Scroll)


Vue.config.productionTip = false
Vue.prototype.URL = 'http://122.112.218.153:8095'
Vue.prototype.$axios = axios
Vue.use(Vant)
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
