<template>
  <div class="tipcontainer">

    <div class="tipcontent">
      <div class="title">小费设置</div>
      <div class="formbox">
        <div class="line">
          <div class="title"><em>*&nbsp;&nbsp;</em>默认小费金额</div>
          <div class="content">
            <input type="text" class="firstIp" /><span>元</span>
            <input type="text" /><span>元</span>
            <input type="text" /><span>元</span>
            <input type="text" /><span>元</span>
            <input type="text" /><span>元</span>
            <span class="tipprompt">请输入5个默认可选小费金额</span>
          </div>
        </div>
        <div class="switch">
          <div class="title"><em>*&nbsp;&nbsp;</em>顾客可修改金额</div>
          <div class="content">
            <el-switch v-model="value1" active-color="rgb(96,58,108)" inactive-color="#7e7c7c" class="el_switch"></el-switch>
          </div>
        </div>
        <div class="blessing">
          <div class="title"><em>*&nbsp;&nbsp;</em>默认祝福语</div>
          <div class="content">
            <textarea></textarea>
          </div>
        </div>
        <div class="charge">
          <div class="title"><em>*&nbsp;&nbsp;</em>收费状态</div>
          <div class="content">
            <el-switch v-model="value2" active-color="rgb(96,58,108)" inactive-color="#7e7c7c" class="el_switch"></el-switch>
          </div>
        </div>

        <div class="savebtn">
          <input type="button" value="保存">
        </div>

      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'tiplist',
  data () {
    return {
      value1: false,
      value2: true
    }
  },
  methods:{
    
  }
}
</script>
<style scoped>
  
  .tipcontent{
    padding: 10px;
    background: #38213e;
  }
  .formbox{
    margin: 0 30px 100px 30px;
  }

  .line .title{ min-width: 80px;}
  .formbox .line{margin: 30px 0 15px 0;}
  .formbox .line input { border:1px solid #706375; background: none; outline:none; border-radius: 3px; height: 25px; line-height: 25px; width: 40px; padding: 0 10px; color: #fff; margin: 0 5px 0 20px; }
  .formbox .line textarea { resize: none }

  .line .content{
    margin-top: 20px;
  }
  .line .tipprompt{
    display: block;
    font-size: 12px;
  }
  .firstIp{
    margin: 0 5px 0 0!important;
  }
  .formbox .switch{
    margin: 15px 0;
  }
  .switch .content{
    margin-top: 10px;
  }
  .formbox .blessing{
    margin: 15px 0;
  }
  .blessing .content{
    margin: 15px 0;
  }
  .blessing .content textarea{
    width: 400px;
    height: 80px;
    /* background: #38213e;
    border: 1px solid #3d2b43; */
    border:1px solid #706375; 
    background: none; 
    outline:none; 
    border-radius: 3px;
    color: #fff;
    text-indent: 10px;
    -webkit-appearance: none;
  }
  .formbox .charge{
    margin: 15px 0;
  }
  .formbox .content{
    margin: 15px 0;
  }
  .savebtn{
    margin: 40px 0 15px 0;
  }
  .savebtn input{
    cursor: pointer;
    background: #ac5397;
    height: 30px;
    line-height: 30px;
    color: #fff;
    display: inline-block;
    width: 300px;
    text-align: center;
    border: 0;
    font-size: 12px;
    -webkit-appearance: none;
  }
</style>