import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from "axios"
import VueAxios from "vue-axios"
Vue.use(VueAxios,axios)
// 配置axios网络请求的基础路径
axios.defaults.baseURL="http://101.96.128.94:9999/mfresh/data/";

Vue.config.productionTip = false

// 全局过滤器
import {date} from "./filter"
// 注册为全局过滤器
Vue.filter('date',date)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
