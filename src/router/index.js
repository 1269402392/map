import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/login/loginChildren/Register')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/Home'),
  },
  {
    path: '/chooseCity',
    name: 'chooseCity',
    component: () => import('../views/home/homeChildren/chooseCity'),
  },
  {
    path: '/publish',
    name: 'publish',
    component: () => import('../views/publish/Publish')
  },
  {
    path: '/searchArea',
    name: 'searchArea',
    component: () => import('../views/publish/publishChild/SearchArea')
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('../views/home/homeChildren/Map')
  },
  {
    path: '/houseInfo',
    name: 'houseInfo',
    component: () => import('../components/content/HouseInfo')
  },
  {
    path: '/searchHouse',
    name: 'searchHouse',
    component: () => import('../views/search/SearchHouse')
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('../views/news/News')
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('../views/mine/Mine'),
  },
  {
    path: '/collect',
    name: 'collect',
    component: () => import('../views/mine/mineChildren/CollectHouse')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
