<template>
  <div class="main">
    <!-- title -->
    <div class="titlebox">
      <span class="titletext">设置提款密码</span>
      <input type="button" class="titleinput" value="导出">
    </div>

    <div class="container">
      <div class="line">
        <span class="title">提款密码：</span>
        <input type="text" class="content oldip" />
      </div>
      <div class="line">
        <span class="title">再次输入提款密码：</span>
        <input type="text" class="content" />
      </div>

      <div class="btnbox">
        <input type="button" class="savebtn" value="保存">
        <input type="button" class="cancelbtn" value="取消">
      </div>

    </div>

    

  </div>
</template>

<script>
export default {
  name: 'live',
  data () {
    return {
      
    }
  },
  methods:{
    
  }
}
</script>
<style scoped>
  .main{
    margin: 0;
    padding: 10px;
  }
  .titlebox{
    width: 100%;
    height: 40px;
    padding-top: 10px;
  }
  .titletext{
    font-size: 12px;
    color: #fff;
    float: left;
  }
  .titleinput{
    color: #fff;
    font-size: 12px;
    background: rgb(242,86,86);
    padding: 3px 12px;
    border-radius: 2px;
    cursor: pointer;
    border: 0;
    float: right;
  }
  .container{
    position: relative;
    top: 30px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 350px;
    height: 200px;
    /* text-align: center; */
  }
  .line{
    padding: 10px 0;
  }
  .content{ 
    margin-left: 10px;
    border:1px solid #706375; 
    background: none; 
    outline:none; 
    border-radius: 3px; 
    height: 30px; 
    line-height: 30px;
    width: 200px; 
    padding: 0 10px; 
    color: #fff 
  }
  .oldip{
    margin-left: 58px;
    border:1px solid #706375; 
    background: none; 
    outline:none; 
    border-radius: 3px; 
    height: 30px; 
    line-height: 30px;
    width: 200px; 
    padding: 0 10px; 
    color: #fff 
  }

  .btnbox{
    padding: 20px 0 0 0;
    width: 100%;
    height: 40px;
  }
  .savebtn{
    width: 60px;
    height: 25px;
    float: left;
    margin-left: 60px;
    color: #fff;
    background: #ac5397;
    border: 0;
    border-radius: 3px;
  }
  .cancelbtn{
    width: 60px;
    height: 25px;
    float: right;
    margin-right: 60px;
    color: #fff;
    background: rgb(242,86,86);
    border: 0;
    border-radius: 3px;
  }
</style>