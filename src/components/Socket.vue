<template>
  <div class="socketDiv">
    <ul>
      <li>请输入Socket地址</li>
      <li><input type="text" v-model="socketUrl" /></li>
      <li><span class="btn" @click="contentIo">连接</span></li>
    </ul>
  </div>
</template>
<script>

export default {
  name: 'print',
  data () {
    return {
      /*socketUrl:'ws://118.25.40.163:8088',
      socketUrl:'ws://192.168.0.140:6001',*/
      socketUrl:'ws://183.13.206.11:6001',
      id:''
    }
  },
  sockets:{
    connect: function(){
      //this.id=this.$socket.id
      console.log(this.$socket.id)
    },
    login:function(value) {
      console.log(value);//监听login(后端向前端emit  login的回调)
    }
  },
  mounted:function(){
    /*this.$socket.emit('connect', '请求连接')*/
  },

  methods: {
    contentIo(){
      console.log(this.$socket)
     // this.$socket.emit('SendMessage', this.socketUrl);
    },
  }
}
</script>

<style scoped>
.socketDiv{ width: 80%; margin: 0 auto}
ul ,li{ margin:0;padding: 0; list-style: none; text-align: left; width: 100%;}
input{ height: 36px; line-height: 36px; margin: 10px 0}
.btn{ display: inline-block; width: 80px; text-align: center; font-size: 12px; color:#fff; background: #67c23a; height: 36px; line-height: 36px; border-radius: 3px;  }
</style>
