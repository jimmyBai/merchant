<template>
  <div class="tipcontainer">

    <div class="tipcontent">
      <div class="title">小费设置</div>
      <div class="formbox">
        <div class="line">
          <div class="title"><em>*&nbsp;&nbsp;</em>默认小费金额</div>
          <div class="content">
            <input type="text" class="firstIp" v-model="amount_setting[0]" placeholder="0.00" /><span>元</span>
            <input type="text" v-model="amount_setting[1]" placeholder="0.00" /><span>元</span>
            <input type="text" v-model="amount_setting[2]" placeholder="0.00" /><span>元</span>
            <input type="text" v-model="amount_setting[3]" placeholder="0.00" /><span>元</span>
            <input type="text" v-model="amount_setting[4]" placeholder="0.00" /><span>元</span>
            <span class="tipprompt">请输入5个默认可选小费金额</span>
          </div>
        </div>
        <div class="switch">
          <div class="title"><em>*&nbsp;&nbsp;</em>顾客可修改金额</div>
          <div class="content">
            <el-switch v-model="is_custom" active-color="rgb(96,58,108)" inactive-color="#7e7c7c" class="el_switch"></el-switch>
          </div>
        </div>
        <div class="blessing">
          <div class="title"><em>*&nbsp;&nbsp;</em>默认祝福语</div>
          <div class="content">
            <textarea v-model="greetings" placeholder="您的满意，是我们最大的动力！"></textarea>
          </div>
        </div>
        <div class="charge">
          <div class="title"><em>*&nbsp;&nbsp;</em>收费状态</div>
          <div class="content">
            <el-switch v-model="status" active-color="rgb(96,58,108)" inactive-color="#7e7c7c" class="el_switch"></el-switch>
          </div>
        </div>
        
        <div class="savebtn" @click="savetipdata">
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
      ListData: [],
      is_custom: '',
      status: '',
      greetings: '您的满意，是我们最大的动力！',
      amount_setting: []
    }
  },
  mounted:function(){
    this.getclassinfo();
  },
  methods:{
    // 获取小费设置
    getclassinfo(){
      this.ListData=[]
      let vm =this,url='/api/web/tip/get-setting',params={};
      vm.$axios.get(url,{params}).then((res)=>{
        if(res.data.error_code=='0'){
          if(res.data.data){
            // vm.ListData=res.data.data
            vm.is_custom=res.data.data.is_custom?true:false
            vm.status=res.data.data.status?true:false
            vm.greetings=res.data.data.greetings
            vm.amount_setting=res.data.data.amount_setting.replace(/\[/g,'').replace(/\]/g,'').split(',')
          }
        }else{
          vm.$message.error(res.data.message);
        }
      }).catch(err => {
        console.log(err);
      });
    },
    // 保存
    savetipdata(){
      let vm=this,url='/api/web/tip/save',
      params={
        amount_setting:vm.amount_setting,
        greetings:vm.greetings,
        is_custom:vm.is_custom?1:0,
        status:vm.status?1:0
      }
      vm.$axios({
        method:'post',
        url:url,
        data:params
      }).then((res)=>{
        if(res.data.error_code=='0'){
          
          vm.$message({
            message: '修改数据成功,请等待审核!',
            type: 'success'
          });
          
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
    height: 40px;
    line-height: 40px;
    color: #fff;
    display: inline-block;
    width: 400px;
    text-align: center;
    border: 0;
    font-size: 12px;
    -webkit-appearance: none;
  }

  ::-webkit-input-placeholder{
  　font-size: 12px;
  }
  :-moz-placeholder{
  　font-size: 12px;
  }
  ::-moz-placeholder{
  　font-size: 12px;
  }
  :-ms-input-placeholder{
  　font-size: 12px;
  }

</style>