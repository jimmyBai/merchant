<template>
  <div>
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
    name: 'addsrole',
    data () {
      return {
        msgtitle:'添加管理员',
        useoptions:[],
        usevalue:'',
        username:'',
        password:'',
        phone:'',
        real_name:'',
        email:''
      }
    },
    props: {
      fromParent: String
    },
    created(){

    },
    mounted:function(){
      //判断是修改页面还是新增页面
      if(this.fromParent){
        this.msgtitle='查看管理员信息'
        //获取详情信息
        this.geteditInfo()
      }else{
      }

      //获取角色列表枚举
      this.getrole()
    },
    methods:{
      //获取修改信息
      geteditInfo(){
        let vm =this,url='/api/web/authority/user/info',params={'id':this.fromParent};
        vm.$axios.get(url,{params}).then((res)=>{
          if(res.data.error_code=='0'){
              vm.real_name=res.data.data.username
              vm.phone=res.data.data.phone
              vm.real_name=res.data.data.real_name
              vm.email=res.data.data.email
          }else{
            vm.$message.error(res.data.message);

          }
        }).catch(err => {
          console.log(err);
        });
      },
      closepop(){
        let data = {
          popstatus:false
        };

        //执行父组件方法
        this.$emit('adminevent',data,'');
      },
      getrole(){
        let vm =this,url='/api/web/authority/role/for-user',params={};
        vm.$axios.get(url,{params}).then((res)=>{
          if(res.data.error_code=='0'){
            vm.useoptions=res.data.data
          }else{
            vm.$message.error(res.data.message);

          }
        }).catch(err => {
          console.log(err);
        });
      },
      getlistData(page){
        let vm =this,url='/api/web/authority/user/list',params={page:page};
        vm.$axios.get(url,{params}).then((res)=>{
          if(res.data.error_code=='0'){

          }else{
            vm.$message.error(res.data.message);

          }
        }).catch(err => {
          console.log(err);
        });
      },
      //添加角色
      addroleFn(){
        let vm =this,url='/api/web/authority/user/add',params={
          username:vm.username||'白愿',
          password:vm.password||'123456',
          phone:vm.phone||'13686844254',
          real_name:vm.real_name||'白',
          email:vm.email||'pasc@163.com',
          role_id:vm.usevalue.id
        };
        vm.$axios({
          method:'post',
          url:url,
          data: params
        }).then((res)=>{
          if(res.data.error_code=='0'){

          }else{
            vm.$message.error(res.data.message);

          }
        }).catch(err => {
          console.log(err);
        });
      }
    }
  }
</script>
<style scoped>
em{ font-style: normal; margin-right: 5px; color: #ac5397}
.itemtitle{ height: 20px; line-height: 20px; margin-bottom: 5px;}
.itemcontent input { height: 30px; line-height: 30px; }
.el-message-box__wrapper{ z-index: 100}
.message-box_header{ position: relative; height: 40px;justify-content: center; -webkit-justify-content: center; line-height: 40px; display: flex; display: -webkit-flex; background: -webkit-gradient(linear, 0 0, 0 bottom, from(#433249), to(#38293d));}
.message-box_closebtn{ position: absolute; right: 0; display: inline-block; height: 40px; width: 40px; text-align: center; cursor: pointer}
.message-box_title{ font-size: 16px;}
.message-box_content{ padding: 20px}
.popsaveline{ width: 80%; margin: 0 auto; margin-top: 20px}
.popsaveline span{ text-align: center}



</style>
