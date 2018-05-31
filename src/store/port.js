import Vue from 'vue'
import Vuex from 'vuex'

import messages from './modules/message';
Vue.use(Vuex)

const state=new Vuex.Store({
  modules: {
    messages
  },
	state:{
		token:localStorage.getItem("token") || "",
    uid:localStorage.getItem("uid") || "",
    menuIndex:sessionStorage.getItem("INDEXNUM") || 0,
    userInfo:JSON.parse(localStorage.getItem("USERINFO"))||{},
	},
	mutations:{
    setToken(state,apptoken){
      state.token=apptoken
    },
    setUID(state,appuid){
      state.uid=appuid
    },
    setIndex(state,tabs){
      state.menuIndex=tabs
    },
    setLoginUser(state,data){
      state.userInfo=data
    }
	},
	actions:{
    addToken({commit},token){
      commit("setToken",token)
    },
    addUID({commit},uid){
      commit("setUID",uid)
    },
    changetabs({commit},num){
      commit("setIndex",num)
    },
    addLoginInfo({commit},obj){
      commit("setLoginUser",obj)
    }
	}
})

export default state
