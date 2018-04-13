<template>
  <div class="goods_andy">
    <div class="el-message-box__wrapper">
      <div class="el-message-box">
        <div class="message-box_header">
          <div class="message-box_title"><span v-text='msgtitle'></span></div>
          <div class="message-box_closebtn" @click="closepop"><i class="el-message-box__close el-icon-close"></i></div>
        </div>
        <div class="message-box_content">
          <div class="addpop">
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle"><em>*</em>姓名</div>
                <div class="itemcontent"><input type="text" v-model="real_name"></div>
              </div>
            </div>
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle"><em>*</em>手机号码</div>
                <div class="itemcontent"><input type="tel" v-model="phone"></div>
              </div>
            </div>
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle"><em>*</em>电子邮箱</div>
                <div class="itemcontent"><input type="email" v-model="email"></div>
              </div>
            </div>
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle" >角色名称</div>
                <div class="itemcontent"><el-select v-model="usevalue" value-key="id" placeholder="请选择">
                  <el-option v-for="item in useoptions" :key="item.id" :label="item.role_name" :value="item">
                  </el-option>
                </el-select></div>
              </div>
            </div>
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle">角色描述</div>
                <div class="itemcontent">
                  <div class="mytextarea"><textarea v-model="username"></textarea></div>
                </div>
              </div>
            </div>
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle"><em>*</em>登录密码</div>
                <div class="itemcontent"><input type="text" v-model="password"></div>
              </div>
            </div>
            <div class="popsaveline" @click="addroleFn">
              <span>保存</span>
            </div>
          </div>
        </div>
        <div class="message-box_btns">

        </div>
      </div>
    </div>
    <div class="v-modal" tabindex="0" style="z-index: 99;"></div>
  </div>
  


</template>

<script>
  export default {
    name: 'takeawayDialog',
    data () {
        return {
            value1: true,
            value2: true,
            displayShow: true
        }
    },
    mounted:function(){
       this.getlistData()
    },
    methods:{
        getlistData(){
            let vm = this,url='/api/web/product/create'

            vm.$axios({
                method:'post',
                url:url
            }).then((res)=>{
                if(res.data.error_code=='0'){
                if(res.data.data){
                    vm.ListData=res.data.data
                }
                console.log(res.data.data)
                }else{
                vm.$message.error(res.data.message);
                console.log(res.data.message)
                }
            }).catch(err => {
                console.log(err);
            });
        },
        clickDialogHide () {
            this.displayShow = false
        }
    }
  }
</script>

<style scoped>
    .main{
        width: 420px;
        margin: 0 auto;
        color: #606266;
        background: rgb(52,32,59);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .main-title{
        background: -webkit-gradient(linear, 0 0, 0 bottom, from(#433249), to(#38293d));
        width: 100%;
        height: 44px;
        line-height: 44px;
        text-align: center;
        position: relative;
    }
    .title-lf{
        color: #ffffff;
        font-size: 14px;
        line-height: 1
    }
    .title-rt{
        font-size: 20px;
        position: absolute;
        right: 10px;
    }
    .main-body{

        position: relative;
        padding: 10px 27px;
        color: #606266;
        font-size: 14px;
    }

    .public{
        width: 100%;
        height: 50px;
        position: relative;
        margin: 10px 0;
    }
    .public span{
        display: block;
    }
    .public input{
        outline: none;
        background: #2e1c34;
        border: 1px solid #3d2b43;
        margin-right: 10px;
        color: #fff;
        margin: 5px 0;
        height: 23px;
        line-height: 23px;
        width: 100%;
        text-indent: 8px;
    }
    .sharing{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 45%;
    }
    .sharing span{
        display: block;
    }
    .sharing select{
        outline: none;
        background: #2e1c34;
        border: 1px solid #3d2b43;
        margin-right: 10px;
        color: #fff;
        margin: 5px 0;
        height: 23px;
        line-height: 23px;
        width: 100%;
        text-indent: 8px;
    }
    .sharings{
        position: absolute;
        bottom: 0;
        right: 0;
        width: 45%;
    }
    .sharings span{
        display: block;
    }
    .sharings input{

    }


    .special{
        position: absolute;
        bottom: 0;
        right: 0;
        width: 45%;
    }
    .special input{
        width: 70%;
    }

    .inventory{
        width: 45%;
        height: 50px;
        line-height: 50px;
        position: absolute;
        bottom: 0;
        left: 0;
        position: relative;
    }
    .el_span{
        position: absolute;
        right: 0;
        bottom: 8px;
    }
    .el_spans{
        position: absolute;
        right: 0;
        top: 0;
    }

    .bottom-btn{
        width: 100%;
        height: 30px;
        line-height: 30px;
        margin: 20px 0;
    }
    .bottom-btn input{
        width: 100%;
        height: 30px;
        font-size: 12px;
        color: #fff;
        background: #ac5397;
        text-align: center;
        border: 0;
        outline: none;
    }
</style>
