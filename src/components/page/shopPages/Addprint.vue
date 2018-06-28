<template>
  <div>
    <div class="el-message-box__wrapper">
      <div class="el-message-box">
        <div class="message-box_header">
          <div class="message-box_title"><span v-text='msgtitle'></span></div>
          <div class="message-box_closebtn" @click="closepop"><i class="el-icon-circle-close-outline"></i></div>
        </div>
        <div class="message-box_content">
          <div class="addpop">
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle"><em>*</em>打印机编号SN</div>
                <div class="itemcontent"><input type="text" maxlength="20" v-model="sn_num"></div>
              </div>
            </div>
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle"><em>*</em>KEY</div>
                <div class="itemcontent"><input type="text" v-model="key"></div>
              </div>
            </div>
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle">手机号码</div>
                <div class="itemcontent"><input type="tel" maxlength="11" v-model="phone"></div>
              </div>
            </div>
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle"><em>*</em>打印机备注</div>
                <div class="itemcontent"><input type="text" v-model="remark"></div>
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
        msgtitle:'添加打印设备',
        // sn_num:'918503233',
        // key:'fcah7zdm',
        sn_num:'',
        key:'',
        remark:'',
        phone:''
      }
    },
    props: {
      fromParent: String
    },
    watch:{
      phone(cVal,oVal){
        if(cVal){
          return this.phone=cVal.replace(/\D/,'')
        }
      }
    },
    created(){

    },
    mounted:function(){
       
    },
    methods:{
      closepop(){
        let data = {
          popstatus:false
        };
        //执行父组件方法
        this.$emit('sievent',data,'');
      },
      //绑定打印机
      addroleFn(){
        let vm =this,url,params;
        url='/api/web/printer/binding';
        params={
          sn_num:vm.sn_num,
          key:vm.key,
          remark:vm.remark,
          phone:vm.phone
        };
        if(!params.sn_num||!params.key||!params.remark){
          vm.$message.error('请完善打印设备信息');
          return
        }
        vm.$axios({
          method:'post',
          url:url,
          data: params
        }).then((res)=>{
          if(res.data.error_code=='0'){
            vm.$message({
              message: '打印机绑定成功！',
              type: 'success'
            });
            let data = {
              popstatus:false,
              status:'refresh'
            };
            this.$emit('sievent',data,'');
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
.itemcontent .el-select{ width: 100%}
</style>
