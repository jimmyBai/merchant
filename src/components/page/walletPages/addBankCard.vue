<template>
  <div class="viewgoods-andy">
    <div class="el-message-box__wrapper">
      <div class="el-message-box">
        <div class="message-box_header">
          <div class="message-box_title"><span v-text='msgtitle'></span></div>
          <div class="message-box_closebtn" @click="closepop"><i class="el-message-box__close el-icon-close"></i></div>
        </div>
        <div class="message-box_content">
          <div class="addpop">

            <!-- 银行id? -->
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle">银行卡</div>
                <el-select v-model="bank_id" value-key='id' placeholder="请选择">
                  <el-option v-for="item in usertions" :key="item.id" :label="item.name" :value='item'></el-option>
                </el-select>
              </div>
            </div>

            <!-- 户名 -->
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle">户名</div>
                <div class="itemcontent"><input type="text" v-model="account_name"></div>
              </div>
            </div>
            <!-- 开户行 -->
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle">开户行</div>
                <div class="itemcontent"><input type="text" v-model="account_bank"></div>
              </div>
            </div>
            <!-- 账号 -->
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle">账号</div>
                <div class="itemcontent"><input type="text" v-model="account_sn"></div>
              </div>
            </div>
            <!-- 预留手机号 -->
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle">预留手机号</div>
                <div class="itemcontent"><input type="text" v-model="phone"></div>
              </div>
            </div>
            <!-- 保存/取消 -->
            <div class="btnBox">
              <div class="saveline" @click="clickSaveInfo">
                <span>递交</span>
              </div>
              <div class="cancelline" @click="clickCancelInfo">
                <span>取消</span>
              </div>
            </div>

          </div>
        </div>
        <div class="message-box_btns">

        </div>
      </div>
    </div>
    <div class="v-modal" style="z-index: 99;"></div>

  </div>

</template>

<script>
// andy
import "../../../../static/css/newStyle.css"

  export default {
    name: 'addBankCard',
    data () {
      return {
        msgtitle: '添加银行卡',
        account_name: '',
        account_bank: '',
        account_sn: '',
        phone: '',
        bank_id: '',
        usertions: []
      
      }
    },
    watch:{
      account_name(nVal,oVal){
        if(nVal){
          this.account_name=nVal.toString().replace(/[^\u4e00-\u9fa5^A-Za-z]*/g,'');
        }
      },
      account_bank(nVal,oVal){
        if(nVal){
          this.account_name=nVal.toString().replace(/[^\u4e00-\u9fa5^A-Za-z]*/g,'');
        }
      },
      account_sn(nVal,oVal){
        if(nVal){
          this.account_sn=nVal.toString().replace(/[^0-9]*/g,'');
        }
      },
      phone(nVal,oVal){
        if(nVal){
          this.phone=nVal.toString().replace(/[^0-9]*/g,'');
        }
      }

    },
    props: {
      fromParent: String
    },
    mounted:function(){
      this.getclassinfo();
    },
    methods:{
      viewprompt(...data){
        let vm = this;
        vm.isPromptShow=data.isPromptStatus;
      },
      // 获取银行卡列表
      getclassinfo(){
        let vm =this,url='/api/web/bank/list',params={};
        vm.$axios.get(url,{params}).then((res)=>{
          if(res.data.error_code=='0'){
            vm.usertions=res.data.data
          }else{
            vm.$message.error(res.data.message);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 递交成功
      clickSaveInfo(){
        let vm=this,url='/api/web/bank/add',params={
          account_name:vm.account_name,
          account_bank:vm.account_bank,
          account_sn:vm.account_sn,
          phone:vm.phone,
          bank_id:vm.bank_id.id
        };
        if(!this.bank_id){
          this.$message.error('请选择银行卡！');
          return false
        }else if(!this.account_name){
          this.$message.error('户名不能为空！');
          return false
        }else if(!this.account_bank){
          this.$message.error("开户行不能为空！");
          return false
        }else if(!this.account_sn){
          this.$message.error("银行账户不能为空！");
          return false
        }else if(!this.phone){
          this.$message.error("手机号不能为空！");
          return false
        }
        vm.$axios({
          method:'post',
          url:url,
          data:params
        }).then((res)=>{
          if(res.data.error_code=='0'){
            
            vm.$message({
              message: '添加银行卡成功,请等待审核!',
              type: 'success'
            });
            
            //执行父组件关闭方法
            let data = {
              isBankCardStatus:false,
              status: 'refresh'
            };
            //执行父组件方法
            this.$emit('pviewbankcard',data,'');
          
          }else{
            vm.$message.error(res.data.message);
          }
        }).catch(err => {
          console.log(err);
        });

      },
      // 递交取消
      clickCancelInfo(){
        //执行父组件关闭方法
        let data = {
          isBankCardStatus:false
        };
        //执行父组件方法
        this.$emit('pviewbankcard',data,'');
      },
      // 关闭页面
      closepop(){
        //执行父组件关闭方法
        let data = {
          isBankCardStatus:false
        };
        //执行父组件方法
        this.$emit('pviewbankcard',data,'');
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


  .btnBox{
    width: 100%;
    height: 80px;
    position: relative;
  }
  .saveline{
    width: 30%;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
  }
  .saveline span{
    display: block;
    background: #ac5397;
    font-size: 12px;
    color: #fff;
    height: 30px;
    line-height: 30px;
  }

  .cancelline{
    width: 30%;
    text-align: center;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }
  .cancelline span{
    display: block;
    background: #ac5397;
    font-size: 12px;
    color: #fff;
    height: 30px;
    line-height: 30px;
  }
</style>
