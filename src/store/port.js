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
    username:sessionStorage.getItem("USERNAME") || '',
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
    setName(state,name){
      state.username=name
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
    addusername({commit},name){
      commit("setName",name)
    }
	}
})

export default state
