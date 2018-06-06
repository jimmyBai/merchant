import Vue from 'vue';
import Vuex from 'vuex';


import axios from 'axios';
import qs from 'qs';
/*import {Loading} from 'element-ui'*/

import App from './App';

import router from './router';

import store from './store/port.js';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import "../static/css/base.css";

Vue.use(Vuex);
Vue.use(ElementUI);

Vue.config.productionTip = false;


//配置全局axios
Vue.prototype.$axios = axios;
// 基础url前缀
if (process.env.NODE_ENV === 'development') {
 axios.defaults.baseURL  = '/api/'
} else {
  if(window.location.host.indexOf('dev.')>=0){
    axios.defaults.baseURL  = 'http://dev.merchant.api.018eighteen.com/'
  }else if(window.location.host.indexOf('uat.')>=0){
    axios.defaults.baseURL = 'http://uat.merchant.api.018eighteen.com/'
  }else if(window.location.host.indexOf('pro.')>=0){
    axios.defaults.baseURL = 'http://pro.merchant.api.018eighteen.com/'
  }

}




// 请求头信息
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 超时时间
axios.defaults.timeout = 30000;
//返回数据类型
axios.defaults.responseType = 'json';
//全局请求配置
axios.interceptors.request.use(config=>{
  store.dispatch('changeLoading',true);
  if(store.state.token){
    Object.assign(config.headers, {'token': store.state.token,'uid': store.state.uid});
  }
  return config;
},error=>{
  store.dispatch('changeLoading',false);
  return Promise.reject(error);
})

axios.interceptors.response.use(function (response) {
  store.dispatch('changeLoading',false);
  //code=100005 令牌错误
  if(response.request.response.error_code=='100005'){
    localStorage.clear()
    sessionStorage.clear()
    store.state.token=''
    store.state.uid=''
    store.state.menuIndex='0'
    router.push('/login');
  }
  //超时处理

  return response;
}, function (error) {

  store.dispatch('changeLoading',false);
  return Promise.reject(error);
});
//关闭生产模式下给出的提示
Vue.config.productionTip = false;


//生命周期路由拦截
router.beforeEach(({meta,path},from,next)=>{
	next();
})


new Vue({
  router,
  store,
  render:h=>h(App)
}).$mount('#app')
