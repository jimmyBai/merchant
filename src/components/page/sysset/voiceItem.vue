<template>
  <div class="ws-content">
    <div class="formbox voicebg">
      <div class="header">
        <span>消息声音设置</span>
      </div>
      <div class="contentBox">
        <ul>
          <li><em>*</em><span>外送订单付款声音通知</span></li>
          <li class="content">
            <el-switch v-model="payvolice.switch" active-color="rgb(96,58,108)" inactive-color="#7e7c7c" class="el_switch"></el-switch>
            <div class="textBox">
              <span>当付款订单一直未处理</span>
              <input maxlength="2" v-model="payvolice.interval" type="tel" />分钟提示一次
            </div>
          </li>
          <li class="line"><em>*</em><span>外送取消订单声音通知</span></li>
          <li class="content">
            <el-switch v-model="cancelvolice.switch" active-color="rgb(96,58,108)" inactive-color="#7e7c7c" class="el_switch"></el-switch>
            <div class="textBox">
              <span>当取消订单一直未查看</span>
              <input maxlength="2" v-model="cancelvolice.interval" type="tel" />分钟提示一次
            </div> 
          </li>
        </ul>
        <div class="bottonsaveBar">
          <span @click="saveVoiceSet">保存</span>
        </div>      
      </div>
    </div>  
  </div>
</template>
<script>
 export default {
  name: 'voiceSet',
  data () {
    return {  
      payvolice:{'switch':false,'interval':''},   
      cancelvolice:{'switch':false,'interval':''}    
    }
  },
  watch:{
    'payvolice.interval'(cVal,oVal){
      if(cVal){
        return this.payvolice.interval=cVal.toString().replace(/[^0-9\-]/,'')
      }
    },
    'cancelvolice.interval'(cVal,oVal){
      if(cVal){
        return this.cancelvolice.interval=cVal.toString().replace(/[^0-9\-]/,'')
      }
    }
  },
  mounted(){
    this.getData()
  },
  methods:{
    saveVoiceSet(){
      let vm=this;
      let url='/api/web/notification/save-setting';
      if((vm.payvolice.switch&&!vm.payvolice.interval)||(vm.cancelvolice.switch&&!vm.cancelvolice.interval)){
        vm.$message.error('请设置提醒时间！');
        return
      }  
      vm.payvolice.switch?vm.payvolice.switch=1:vm.payvolice.switch=0
      vm.cancelvolice.switch?vm.cancelvolice.switch=1:vm.cancelvolice.switch=0    
      let params={
        "data": {
            "paid_order_voice": vm.payvolice,
            "cancel_order_voice":vm.cancelvolice
        }
      }
      vm.$axios({
          method:'post',
          data:params,
          url:url
        }).then((res)=>{
          if(res.data.error_code=='0'){
            vm.$message({
              message: '声音提示设置成功!',
              type: 'success'
            });                        
            localStorage.setItem('voiceDate',JSON.stringify(params.data))
            vm.$store.dispatch('addVoice',params.data);           
            //缓存播放声音权限          
            vm.getData()
          }else{
            vm.$message.error(res.data.message);
          }
      }).catch(err => {
          console.log(err);
      }); 
    },
    getData(){
      this.ListData = []
      let vm = this,url='/api/web/notification/get-setting',
      params={};
      vm.$axios.get(url,{params}).then((res)=>{
        if(res.data.error_code=='0'){
          if(res.data.data&&res.data.data.cancel_order_voice&&res.data.data.paid_order_voice){ 
            vm.payvolice=res.data.data.paid_order_voice
            vm.cancelvolice=res.data.data.cancel_order_voice
            vm.payvolice.switch?vm.payvolice.switch=true:vm.payvolice.switch=false
            vm.cancelvolice.switch?vm.cancelvolice.switch=true:vm.cancelvolice.switch=false
          }
        }else{
          vm.$message.error(res.data.message);
        }
      }).catch(err => {
        console.log(err);
      });
    },
  }
}
</script>
<style scoped> 
.voicebg{ background:#38213e; padding: 10px; padding-bottom: 20px}
.header{ margin-bottom: 15px}
em{ color: #f00; font-style: normal; margin-right: 10px}
.contentBox{ margin-left: 20px}
.contentBox ul li{ margin-bottom: 15px}
.contentBox ul li.line{ padding-top: 15px}
.contentBox ul li.content{ display: flex;display: -webkit-flex;align-items: center; -webkit-align-items: center}
li.content .textBox{ margin-left: 10px}
li.content .textBox input{ width: 40px; margin: 0 5px; text-align: center; padding: 0 5px; background:#2e1c34; height: 21px; line-height: 21px; font-size: 12px; color: #aa96b1; border: none }
.el_switch{ cursor: pointer}
.bottonsaveBar{ padding: 10px 0;}
.bottonsaveBar span{ cursor:pointer; background:#ac5397; color: #fff; display: block; width: 300px; text-align: center; height: 30px; line-height: 30px; border-radius: 2px }
</style>
