<template>
  <div class="main">
    <div class="el-message-box__wrapper">
      <div class="el-message-box">
        <div class="message-box_header">
          <div class="message-box_title"><span v-text='msgtitle'></span></div>
          <div class="message-box_closebtn" @click="closept"><i class="el-message-box__close el-icon-close"></i></div>
        </div>
        <div class="message-box_content">
          <span>递交成功！我们会在1-2天内完成审核，如果有问题请联系我们的客服，谢谢！</span>
        </div>  
      </div>
    </div>

    <div class="v-modal" style="z-index: 99;"></div>
  </div>
    
</template>
<script>
// andy
import "../../../../../static/css/newStyle.css"

  export default {
    name: 'infoPrompt',
    data () {
      return {
        msgtitle: '添加银行卡申请'
        
      }
    },
    methods:{
      closept(){
        //执行父组件关闭方法
        let data = {
          isPromptStatus:false
        };
        //执行父组件方法
        this.$emit('pviewprompt',data,'');
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
  .message-box_content{ padding: 20px; font-size: 14px;}
  .popsaveline{ width: 80%; margin: 0 auto; margin-top: 20px}
  .popsaveline span{ text-align: center}
</style>