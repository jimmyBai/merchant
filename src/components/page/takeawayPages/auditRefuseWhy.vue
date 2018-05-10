<template>
  <div class="auditWhy-andy">
    <div class="el-message-box__wrapper">
      <div class="el-message-box">

        <div class="message-box_header">
          <div class="message-box_title"><span v-text='msgtitle'></span></div>
          <div class="message-box_closebtn" @click="closepop"><i class="el-message-box__close el-icon-close"></i></div>
        </div>
        <div class="message-box_content">
          <div class="openpop">
            <!-- why -->
            <div class="auditbox">
              <span class="audittitle">原因&nbsp;:</span>
              <textarea class="auditinput" cols="" rows=""></textarea>
            </div>
            <div class="auditbtn">
              <span class="btnleft">
                <input type="button" value="确定">
              </span>
              <span class="btnright">
                <input type="button" value="重新递交">
              </span>
            </div>

          </div>
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
    name: 'viewGoods',
      data () {
        return {
          msgtitle: '查看产品审核拒绝原因'
            
        }
      },
      props: {
        
      },
      methods:{
        closepop(){
          //执行父组件关闭方法
          let data = {
            isAuditWhyStatus:false
          };
          //执行父组件方法
          this.$emit('refuseevent',data,'');
        },
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

  
  .audittitle{
    display: block;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
  }
  .auditinput{
    width: 100%;
    height: 140px;
    margin-top: 5px;
    outline: none;
    background: #2e1c34;
    border: 1px solid #3d2b43;
  }
  .auditbtn{
    padding: 20px 60px 0 60px;
    height: 30px;
  }
  .btnleft{
    display: block;
    width: 40%;
    height: 30px;
    float: left;
  }
  .btnleft input{
    width: 100%;
    height: 100%;
    border: 0;
    background: #ac5397;
    color: #ffffff;
    font-size: 12px;
  }
  .btnright{
    display: block;  
    width: 40%;
    height: 30px;
    float: right;
  }
  .btnright input{
    width: 100%;
    height: 100%;
    border: 0;
    background: #ac5397;
    color: #ffffff;
    font-size: 12px;
  }
</style>

