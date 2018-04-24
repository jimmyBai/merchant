<template>
  <div class="loginpage">
    <div class="loginbox">
        <div class="login-left">
          <img src='../../static/img/logo.png' alt="" title="018">
        </div>
        <div class="borderline"></div>
        <div class="login-right">
          <!--登录-->
            <h2 class="log-title">请登录你的账号</h2>
            <div class="loginput log-userName">
              <input type="text" v-model="phone" placeholder="请输入你的用户名">
            </div>
            <div class="errortips"></div>
            <div class="loginput log-userName">
              <input type="password" maxlength="18" v-model="password" placeholder="请输入你的密码">
            </div>
            <div class="errortips"></div>
            <div class="savepwd" @click="ischeck=!ischeck" :class="{'checkactive':ischeck}">
              <div class="checkbox"><i v-if="ischeck" class="el-icon-check"></i></div>
              <label>记住密码</label>
            </div>
            <div class="loginbtn" @click="goin">登录</div>
            <div class="forgetbtn"><span @click="forgetpwd">忘记密码?</span></div>
        </div>
    </div>
  </div>
</template>
<script>
import md5 from 'js-md5'
export default {
  name: 'Login',
  data () {
    return {
      ischeck:false,
      phone:'13800138222',
      password:'admin123',
      canLogin:false,
    }
  },
  watch:{
  },
  mounted: function() {
    if(localStorage.getItem('LOGININFO')){
      this.phone=JSON.parse(localStorage.getItem('LOGININFO')).phone
      this.password=JSON.parse(localStorage.getItem('LOGININFO')).password
    }
  },
  methods:{
  	goin(){
  		let vm =this,url='/api/web/login',KEY = '018server_user_1234567890';
  		let params={
        'phone':vm.phone,
        'password':md5(md5(vm.password)+KEY)
  		}
      if(vm.ischeck){
        localStorage.setItem("LOGININFO",JSON.stringify(params))
      }
      //为空不能请求
      if(vm.phone==''||vm.password==''){
        vm.$message('用户名和密码不能为空');
  		  return false
      }
      sessionStorage.removeItem('LOGIN_STATUS')
      vm.$axios({
        method:'post',
        url:url,
        data: params
      }).then((res)=>{
        if(res.data.error_code=='0'){
          //吧获取到的Token缓存到状态管理器
          if(res.data.data){
            localStorage.setItem("token",res.data.data.token)
            this.$store.dispatch('addToken',res.data.data.token);
            localStorage.setItem("uid",res.data.data.uid)
            this.$store.dispatch('addUID',res.data.data.uid);

            sessionStorage.setItem('USERNAME',res.data.data.name)
            this.$store.dispatch('addusername',res.data.data.name);
          }
          vm.$router.push('/main')
        }else{
          vm.$message.error(res.data.message);
          console.log(res.data.message)
        }

      }).catch(err => {
        console.log(err);
      });

  	},
    forgetpwd(){
      this.$router.push('/getphonecode')
    }
  }
}

</script>
<style scoped>
.loginpage{ position: absolute; height: 100%; width: 100%; background: #2E1C34; display: flex; display: -webkit-flex; align-items: center;-webkit-align-items: center;justify-content: center; -webkit-justify-content: center}
.loginpage .loginbox{ display: flex;display: -webkit-flex; color: #fff; width: 100%; max-width: 60em }
.loginbox .login-left{ display: flex;display: -webkit-flex; align-items: center;-webkit-align-items: center; flex: 0.5; -webkit-flex:0.5; padding: 0 20px; }
.login-left img{ width: 250px}
.loginbox .login-right{flex: 1.5; -webkit-flex:1.5; padding: 0 20px; }
.loginpage .log-title{ margin: 1em 0; }
.login-right input{ background: none;outline: none; border: 1px solid #48344d; color: #a896b0;  height: 36px; font-size: 12px; text-indent: 10px;  width: 100% }
.login-right input::-webkit-input-placeholder{color: #a795ad}
.log-title{ font-size: 12px; font-weight: normal; color: #f8e1fe; letter-spacing: 1px; }
.loginbtn{ background: #ac5397; cursor: pointer; font-size: 12px; text-align: center; color: #fae1ff; height: 36px; line-height: 36px; margin: 10px 0;}
.forgetbtn{ color: #ac5395; font-size: 11px; text-align: right; height: 20px; line-height: 20px}
.forgetbtn span{ display: inline-block; padding: 3px 0 3px 10px; cursor: pointer }
.savepwd{height: 20px; line-height: 20px; display: flex;width: 80px; display: -webkit-flex; align-items: center;-webkit-align-items: center;}
.savepwd label{ font-size: 12px; color: #a896b0; padding-left: 8px;}
.savepwd .checkbox{ border:1px solid #48344d; width: 13px; height: 13px; display: inline-block;}
.checkactive  label{ color:#ac5397 }
.checkactive .checkbox{ border: 1px solid #ac5397}
.borderline{background:linear-gradient(rgba(72,52,78,0),rgba(72,52,78,1),rgba(72,52,78,0)); width: 1px}
.el-icon-check{ color:#ac5397; position: relative; top:-3px;}
.errortips{ color:#ac5396;  height: 20px; line-height: 20px }
.callphonebar{ display: flex;display: -webkit-flex;align-items: center;-webkit-align-items: center}
.callphonebar .btncard{ min-width: 120px; text-align: center; margin-left: 20px;}
.callphonebar .btncard span{ display: block; height: 36px; line-height: 36px; background: #8b4d7c; cursor: pointer;color: #f8e2ff}
</style>
