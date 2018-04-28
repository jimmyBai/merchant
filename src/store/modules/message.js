/*
import Vue from 'vue';
import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client';
/!*Vue.use(VueSocketio, 'http://47.94.14.12:6001');*!/
Vue.use(VueSocketio, socketio('http://192.168.0.147:3000'));
const messages = {
  state: {
    connect: false,
    messages: [],
    chatRoomId:null
  },
  mutations: {
      SOCKET_CONNECT: (state, status) => {
          state.connect = true;
      },
      SOCKET_USER_MESSAGE: (state,  message) => {
        state.message = message;
      }
    },
  actions: {
    SocketConnect: (context) => {
      if (!Vue.prototype.$socket) {
        console.log(context)
        /!*Vue.use(VueSocketio, socketio('http://47.94.14.12:6001'));*!/
        Vue.use(VueSocketio, socketio('http://192.168.0.147:3000'));
      } else {
        console.log(2222)
        Vue.prototype.$socket.connect();
      }
    },
  }
}

export default messages
*/
