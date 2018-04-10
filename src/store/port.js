import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state=new Vuex.Store({
	state:{
		token:localStorage.getItem("token") || "",
    uid:localStorage.getItem("uid") || "",
	},
	mutations:{
    setToken(state,apptoken){
      state.token=apptoken
    },
    setUID(state,appuid){
      state.uid=appuid
    }
	},
	actions:{
    addToken({commit},token){
      commit("setToken",token)
    },
    addUID({commit},uid){
      commit("setUID",uid)
    },
	}
})

export default state
