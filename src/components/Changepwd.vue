<template>
  <div class="loginpage">
    <div class="loginbox">
        <div class="login-left">
          <img src='../../static/img/logo.png' alt="" title="018">
        </div>
        <div class="borderline"></div>
        <div class="login-right">
          <!--登录-->
          <!--重置密码-->
            <h2 class="log-title">重置密码</h2>
            <div class="loginput log-userName">
              <input type="password" v-model="newpwd1" maxlength="15" placeholder="请设置6-15位的数字和字母的混合密码">
            </div>
            <div class="errortips"></div>
            <div class="loginput log-userName">
              <input type="password" v-model="newpwd2" maxlength="15" placeholder="请再输入你的密码">
            </div>
            <div class="errortips" v-text="setpwdtips"></div>
            <div class="savepwd" @click="ischeck=!ischeck" :class="{'checkactive':ischeck}">

            </div>
            <div class="loginbtn" @click="postnepwd">确认提交，进入用户中心</div>
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
      newpwd1:'',
      newpwd2:'',
      setpwdtips:'',
      ischeck:'',
      phone:''
    }
  },
  watch:{
  },
  mounted: function() {
    if(this.$route.params&&this.$route.params.phone){
      this.phone=this.$route.params.phone
    }
  },
  methods:{
    backlogin(){
      this.$router.push('/login')
    },
    //提交新密码
    postnepwd(){
      let vm =this,url='/api/web/reset-pwd',params={
        'phone':vm.phone,
        'password':vm.newpwd1
      };
      if(!this.newpwd1||!this.newpwd2){
        //密码为空
        return
      }else{
        if(this.newpwd1.length<6){
          //密码长度
          vm.setpwdtips='密码长度至少6位'
          setTimeout(()=>{
            vm.setpwdtips=''
          },2000)
        }else{
          var regx=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/
          //密码格式
          if(regx.test(this.newpwd1)){
            if(this.newpwd1.toLowerCase()==this.newpwd2.toLowerCase()){
              //发送请求返回登录
              vm.$axios({
                method:'post',
                url:url,
                data: params
              }).then((res)=>{
                if(res.data.error_code=='0'){
                  vm.$message({
                    message: '密码变更成功！',
                    type: 'success'
                  });
                  setTimeout(x=>{
                    this.backlogin()
                  },1000)

                }else{
                  vm.$message.error(res.data.message);
                }
              }).catch(err => {
                console.log(err);
              });
            }else{
              vm.setpwdtips='密码与第一次输入的不一致，请重新输入'
              setTimeout(()=>{
                vm.setpwdtips=''
              },2000)
            }
          }else{
            vm.setpwdtips='密码格式不对'
            setTimeout(()=>{
              vm.setpwdtips=''
            },2000)
          }
        }
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
