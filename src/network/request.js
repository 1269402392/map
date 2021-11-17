import axios from "axios";
import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);
const instance = axios.create({
  baseURL: 'http://122.112.218.153:8095/',
  timeout: 0
})

instance.interceptors.request.use(config => {
  // Toast.loading({
  //   message: '加载中...',
  //   forbidClick: true,
  // });
  return config
})

instance.interceptors.response.use(config => {
  // if(config.data.status === 200) {
  //   Toast.loading({
  //     message: '加载中...',
  //     forbidClick: false,
  //   });
  // }
  return config.data
})


export default instance