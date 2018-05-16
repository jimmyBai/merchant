<template>
  <div class="main">
    
    <div class="container">

      <div class="line">
        <span class="title">银行账户</span>
        <div class="bankselect">
          <el-select v-model="typelist" value-key='id' placeholder="请选择">
            <el-option v-for="item in usertions" :key="item.id" :label="item.name" :value='item'></el-option>
          </el-select>
        </div>
      </div>
      
      <div class="line">
        <span class="title">可提现金额</span>
        <input type="text" class="content" v-model="amount" />
      </div>

      <div class="btnbox">
        <input type="button" class="savebtn" value="提交">
        <input type="button" class="cancelbtn" value="取消">
      </div>

    </div>

  </div>
</template>

<script>
import "../../../../static/css/newStyle.css"

export default {
  name: 'live',
  data () {
    return {
      amount: '',
      typelist: '',
      usertions: []
    }
  },
  watch:{
    amount(nVal,oVal){
      if(nVal){
        this.amount=nVal.toString().replace(/[^0-9]*/g,'');
      }
    },
    typelist(nVal,oVal){
      if(nVal){
        this.typelist=nVal.toString().replace(/[^0-9]*/g,'');
      }
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
  .container{
    position: relative;
    top: 30px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 300px;
    height: 200px;
  }
  .line{
    padding: 10px 0;
  }
  .content{ 
    margin-left: 10px;
    background: #2e1c34;
    border: 1px solid #3d2b43;
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
    margin-left: 22px;
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
    width: 65%;
    height: 40px;
    position: absolute;
    right: 30px;
  }
  .savebtn{
    width: 60px;
    height: 25px;
    float: left;
    color: #fff;
    background: #ac5397;
    border: 0;
    border-radius: 3px;
  }
  .cancelbtn{
    width: 60px;
    height: 25px;
    float: left;
    color: #fff;
    background: rgb(242,86,86);
    border: 0;
    border-radius: 3px;
    margin-left: 40px;
  }

  .bankselect{
    display: inline;
    margin-left: 22px;
  }
  
      

</style>