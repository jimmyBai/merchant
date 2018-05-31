<template>
  <div class="loginpage">
    <div class="loginbox">
        <div class="login-left">
          <img src='../../static/img/logo.png' alt="" title="018">
        </div>
        <div class="borderline"></div>
        <div class="login-right">
          <!--忘记密码-->
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
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      userphone:'',
      phonecard:'',
      candotime:true,

    }
  },
  watch:{
  },
  mounted: function() {
  },
  methods:{
    backlogin(){
      this.$router.push('/login')
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
            vm.$router.push({name:'changepwd',params:{phone:vm.userphone}});
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
          vm.$message({
            message: '验证码已发送成功！',
            type: 'success'
          });
          vm.timeCut(60)
          if(window.location.href.indexOf('uat.')<0||window.location.href.indexOf('dev.')<0){
            vm.phonecard='123456'
          }
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
          if(this.$refs.codetime){
            this.$refs.codetime.style.cssText='background-color: #7e6e7a;color: #fff;'
            this.$refs.codetime.innerText=time+'秒后重新获取';
          }
        }else{
          this.candotime=true;
          if(this.$refs.codetime){
            this.$refs.codetime.removeAttribute('style');
            this.$refs.codetime.innerText='获取验证码';
          }
          clearInterval(srv)
        }
      },1000)
    },
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
