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
            <!-- 银行名称 -->
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle">银行</div>
                <div class="itemcontent"><input type="text"></div>
              </div>
            </div>
            <!-- 银行号码 -->
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle">银行号码</div>
                <div class="itemcontent"><input type="text"></div>
              </div>
            </div>
            <!-- 支行描述 -->
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle">支行</div>
                <div class="itemcontent"><input type="text"></div>
              </div>
            </div>
            <!-- 保存/取消 -->
            <div class="btnBox">
              <div class="saveline" @click="clickSaveInfo()">
                <span>递交</span>
              </div>
              <div class="cancelline" @click="clickCancelInfo()">
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

    <!-- <div class="promptbox">
      <div class="ptitle">
        <span>添加银行卡成功</span>
      </div>
      <div class="pcontent">
        <span>递交成功！我们会在1-2天内完成审核，如果有问题请联系我们的客服，谢谢！</span>
      </div>
    </div> -->
    <!-- <div class="el-message-box__wrapper" v-show="ispromptShow">
      <div class="el-message-box">
        <div class="message-box_header">
          <div class="message-box_title"><span v-text='msgtitle'></span></div>
          <div class="message-box_closebtn" @click="closept"><i class="el-message-box__close el-icon-close"></i></div>
        </div>
        <div class="message-box_content">
          <span>222222</span>
        </div>  
      </div>
    </div> -->

    <!-- 递交提示 -->
    <!-- <info-prompt v-if="isPromptShow" @pviewprompt="viewprompt"></info-prompt> -->

  </div>

</template>

<script>
// andy
import "../../../../../static/css/newStyle.css"
// import infoPrompt from './infoPrompt'

  export default {
    name: 'addBankCard',
    components:{
      // infoPrompt
    },
    data () {
      return {
        msgtitle: '添加银行卡',
        priceStatus: true
        // isPromptShow: false
        
      }
    },
    methods:{
      viewprompt(...data){
        let vm = this;
        vm.isPromptShow=data.isPromptStatus;
      },
      
      closepop(){
        //执行父组件关闭方法
        let data = {
          isBankCardStatus:false
        };
        //执行父组件方法
        this.$emit('pviewbankcard',data,'');
      },
      clickSaveInfo(){
        //执行父组件关闭方法
        let data = {
          isBankCardStatus:false
        };
        //执行父组件方法
        this.$emit('pviewbankcard',data,'');
        
      },
      clickCancelInfo(){
        
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
