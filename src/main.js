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

import "../static/css/base.css"
// andy
import "../static/css/newStyle.css"

Vue.use(Vuex);
Vue.use(ElementUI);

Vue.config.productionTip = false;
let api;
if (process.env.NODE_ENV === 'development') {
  api = '/api/'
} else {
  api = 'http://dev.merchant.api.018eighteen.com'
}
/*if(window.location.origin.indexOf('localhost')>=0){
  api = 'http://dev.merchant.api.018eighteen.com'
}*/

//配置全局axios
Vue.prototype.$axios = axios;
// 基础url前缀
axios.defaults.baseURL = api;
// 请求头信息
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 超时时间
axios.defaults.timeout = 30000;
//返回数据类型
axios.defaults.responseType = 'json';
/*if(store.state.uid){
  axios.defaults.headers.common['uid'] = store.state.uid
}*/
//全局请求配置
axios.interceptors.request.use(config=>{
  if(store.state.token){
    Object.assign(config.headers, {'token': store.state.token,'uid': store.state.uid});
  }
  /*if(config.method === 'post'&&(config.url.indexOf('/api/web/setting/upload')>=0)) {
   // console.log(config)
    config.data = qs.stringify(config.data)
  }else{
  }*/
  /*let loading = Loading.service({
    fullscreen: true,
    text: '拼命加载中...',
  });*/
  return config;
},error=>{
 /* let loading = Loading.service({});
  loading.close();*/
  return Promise.reject(error);
})

axios.interceptors.response.use(function (response) {
  /*let loading = Loading.service({});
  loading.close();*/

  return response;
}, function (error) {

  loadinginstace.close()


  return Promise.reject(error);
});
//关闭生产模式下给出的提示
Vue.config.productionTip = false;


//生命周期路由拦截
router.beforeEach(({meta,path},from,next)=>{

	//doSomeThings

	next();
})


new Vue({
  router,
  store,
  render:h=>h(App)
}).$mount('#app')
