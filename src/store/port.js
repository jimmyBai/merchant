import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state=new Vuex.Store({
	state:{
		token:localStorage.getItem("token") || "",
    uid:localStorage.getItem("uid") || "",
    menuIndex:sessionStorage.getItem("INDEXNUM") || 0,
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
    }
	}
})

export default state
