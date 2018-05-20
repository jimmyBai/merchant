<template>
  <div class="main">
    
    <div class="container">

      <div class="line">
        <span class="title">银行账户</span>
        <div class="bankselect">
          <el-select v-model="name" value-key='id' placeholder="请选择">
            <el-option v-for="item in usertions" :key="item.id" :label="item.name" :value='item'></el-option>
          </el-select>
          <span v-text="account_id"></span>
        </div>
      </div>
      
      <div class="line">
        <span class="title">可提现金额</span>
        <input type="text" class="content" v-model="amount" />
        <span v-text="trade_amount"></span>
      </div>

      <div class="btnbox">
        <input type="button" class="savebtn" value="提交" @click="subaudit">
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
      name: '',
      usertions: [],
      trade_amount: '',
      account_id: ''
    }
  },
  watch:{
    amount(nVal,oVal){
      if(nVal){
        this.amount=nVal.toString().replace(/[^0-9]*/g,'');
      }
    }
      
  },
  mounted:function(){
    this.getclassinfo();
  },
  methods:{

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
    // 提交审核
    subaudit(){
      // let vm =this,
      // url='/api/web/withdrawal/create',
      // params={}
      // // params={}
      // vm.$axios({
      //   method:'post',
      //   url:url,
      //   data: params
      // }).then((res)=>{
      //   if(res.data.error_code=='0'){
          
      //     vm.$message({
      //       message: '提交审核成功,请等待审核!',
      //       type: 'success'
      //     });

      //   }else{
      //     vm.$message.error(res.data.message);
      //   }
      // }).catch(err => {
      //   console.log(err);
      // });
    }


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