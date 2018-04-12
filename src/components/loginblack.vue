<template>
  <div class="loginpage">
    <div class="loginbox">
        <div class="login-left">
          <img src='../../static/img/logo.png' alt="" title="018">
        </div>
        <div class="borderline"></div>
        <div class="login-right">
          <!--登录-->
          <div v-if="islogin">
            <h2 class="log-title">请登录你的账号</h2>
            <div class="loginput log-userName">
              <input type="text" v-model="username" placeholder="请输入你的用户名">
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
          <!--忘记密码-->
          <div v-if="isforgetpwd">
            <h2 class="log-title">找回登录密码</h2>
            <div class="loginput log-userName">
              <input type="text" maxlength="11" v-model="userphone" placeholder="请输入你的手机号码">
            </div>
            <div class="errortips" ref="errphone"></div>
            <div class="loginput log-userName callphonebar">
              <input type="text" class="phonecard" v-model="phonecard" placeholder="请输入验证码">
              <div class="btncard" @click="candotime&&getcode()"><span ref="codetime">获取验证码</span></div>
            </div>
            <div class="errortips"></div>
            <div class="savepwd">
              <label></label>
            </div>
            <div class="loginbtn" @click="setpwdfn">下一步</div>
            <div class="forgetbtn"><span @click="backlogin">记起密码，返回登录</span></div>
          </div>
          <!--重置密码-->
          <div v-if="issetpwd">
            <h2 class="log-title">重置密码</h2>
            <div class="loginput log-userName">
              <input type="password" v-model="newpwd1" placeholder="请设置6-15位的数字和和字母的混合密码">
            </div>
            <div class="errortips"></div>
            <div class="loginput log-userName">
              <input type="password" v-model="newpwd2" placeholder="请再输入你的密码">
            </div>
            <div class="errortips" v-text="setpwdtips"></div>
            <div class="savepwd" @click="ischeck=!ischeck" :class="{'checkactive':ischeck}">

            </div>
            <div class="loginbtn" @click="postnepwd">确认提交，进入用户中心</div>
            <div class="forgetbtn"><span @click="backlogin">记起密码，返回登录</span></div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      ischeck:false,
      username:JSON.parse(localStorage.getItem('LOGININFO')).username||'13800138222',
      password:JSON.parse(localStorage.getItem('LOGININFO')).password||'123456',
      userphone:'',
      phonecard:'',
      newpwd1:'',
      newpwd2:'',
      canLogin:false,
      islogin:true,
      isforgetpwd:false,
      issetpwd:false,
      candotime:true,
      setpwdtips:'',
      tipstext:'',
    }
  },
  watch:{
    userphone(cval,oval){
      this.$refs.errphone.innerHTML=''
    },
    password(cval,oval){

    },
  },
  mounted: function() {
    /*if(localStorage.getItem('LOGININFO')){
        this.username=JSON.parse(localStorage.getItem('LOGININFO')).username||'13800138222'
        this.password=JSON.parse(localStorage.getItem('LOGININFO')).password||'123456'
    }else{
      this.username='13800138222'
      this.password='123456'
    }
    if(sessionStorage.getItem('LOGIN_STATUS')){
      let loginstatus=sessionStorage.getItem('LOGIN_STATUS')
      if(loginstatus==0){
        this.islogin=true
        this.isforgetpwd=false
        this.issetpwd=false
      }else if(loginstatus==1){
        this.islogin=false
        this.isforgetpwd=true
        this.issetpwd=false
      }else{
        this.islogin=false
        this.isforgetpwd=false
        this.issetpwd=true
      }
    }else{
      this.islogin=true
      this.isforgetpwd=false
      this.issetpwd=false
    }*/
  },
  methods:{
  	goin(){
  		let vm =this,url='/api/web/login';
  		let params={
        'phone':vm.username,
        'password':vm.password
  		}
      if(vm.ischeck){
        localStorage.setItem("LOGININFO",JSON.stringify(params))
      }
      //为空不能请求
      if(vm.username==''||vm.username==''){
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
      this.islogin=false
      this.isforgetpwd=!this.isforgetpwd
      this.phonecard=''
      sessionStorage.setItem('LOGIN_STATUS','1')
    },
    backlogin(){
  	  this.islogin=true
      this.issetpwd=false
      this.isforgetpwd=false
      sessionStorage.setItem('LOGIN_STATUS','0')
    },
    setpwdfn(){
  	  //判断所有元素是否已填写
      let vm = this,url='/api/web/sms/verify',params={'phone':vm.userphone,'type':1,code:vm.phonecard};
      if(vm.userphone&&vm.phonecard){
        //校验短信验证码 跳转到重置密码
        vm.candotime=false;
        vm.$axios({
          method:'post',
          url:url,
          data: params
        }).then((res)=>{
          if(res.data.error_code=='0'){
            vm.issetpwd=!vm.issetpwd
            vm.isforgetpwd=false
            sessionStorage.setItem('LOGIN_STATUS','2')
          }else{
            vm.$message.error(res.data.message);
          }

        }).catch(err => {
          console.log(err);
        });
      }else{
        vm.$message.error('请完善信息');
      }

    },
    //获取验证码格式验证
    getcode(){
  	  let vm= this;
  	  if(vm.userphone.length<11){
        vm.$refs.errphone.innerText='手机号码格式有误'
      }else{
  	    if((/^1[3|4|5|7|8]\d{9}$/).test(vm.userphone)){
          //发送手机验证码
          this.sendphonecdoe()
        }else{
          vm.$refs.errphone.innerText='手机号码格式有误'
        }
      }
    },
    //获取验证码
    sendphonecdoe(){
      let vm =this,url='/api/web/sms/send',params={'phone':vm.userphone,'type':1};
      this.candotime=false;
      vm.$axios({
        method:'post',
        url:url,
        data: params
      }).then((res)=>{
        if(res.data.error_code=='0'){
          vm.timeCut(6)
          vm.phonecard='123456'
        }else{
          vm.$message.error(res.data.message);
          vm.candotime=true;
        }
      }).catch(err => {
        console.log(err);
      });

    },
    //计时器
    timeCut:function(time){
      var srv = setInterval(()=>{
        if(time>=1){
          time--;
          this.$refs.codetime.style.cssText='background-color: #7e6e7a;color: #fff;'
          this.$refs.codetime.innerText=time+'秒后重新获取';
        }else{
          this.candotime=true;
          this.$refs.codetime.removeAttribute('style');
          this.$refs.codetime.innerText='获取验证码';
          clearInterval(srv)
        }
      },1000)
    },
    //提交新密码
    postnepwd(){
  	  if(this.newpwd1.toLowerCase()==this.newpwd2.toLowerCase()){
  	    //发送请求返回登录
        this.backlogin()
      }else{
        this.setpwdtips='密码与第一次输入的不一致，请重新输入'
        setTimeout(()=>{
          this.setpwdtips=''
        },2000)
      }
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
