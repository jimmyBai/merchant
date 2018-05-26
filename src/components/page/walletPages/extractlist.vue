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
            <!-- 可提取金额 -->
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle itemtitletwo">可提取金额：&nbsp;&nbsp;<span v-text="ListData.balance"></span>RMB</div>
              </div>
            </div>
            <!-- 提取金额 -->
            <div class="adduser-item">
              <div class="itemline itemlinetwo">
                <div class="itemtitle">提取金额：</div>
                <div class="itemcontent"><input type="text" v-model="trade_amount" @blur="autoval"></div>
              </div>
            </div>
            <!-- 银行账户 -->
            <div class="adduser-item">
              <div class="itemline itemlinetwo">
                <div class="itemtitle">银行账户：</div>
                <div class="classcontent">
                  <el-select v-model="account_id" value-key='id' placeholder="请选择">
                    <el-option v-for="item in usertions" :key="item.id" :label="item.name" :value='item'></el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <!-- 保存 -->
            <div class="btnbox">
              <div class="popsavelt" @click="subInfo('1')">
                <span>提交</span>
              </div>
              <div class="popsavert" @click="subInfo('2')">
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
import "../../../../static/css/newStyle.css"

export default {
  name: 'extractlist',
  data () {
    return {
      msgtitle: '申请提现',
      usertions: [],
      trade_amount: '',
      account_id: '',
      ListData: []
    }
  },
  watch:{
    trade_amount(nVal,oVal){
      if(nVal){
        this.trade_amount=nVal.toString().replace(/^\D*([0-9]\d*\.?\d{0,2})?.*$/,'$1');
      }
    }
  },
  mounted:function(){
    this.getclassinfo();
    this.getlistData();
  },
  methods:{
    // 控制小数
    autoval(){
      this.trade_amount=(this.trade_amount*1).toFixed(2)
    },
    // 获取银行卡列表
    getclassinfo(){
      let vm =this,url='/api/web/bank',params={};
      vm.$axios.get(url,{params}).then((res)=>{
        if(res.data.error_code=='0'){
          vm.usertions=res.data.data.list
        }else{
          vm.$message.error(res.data.message);
        }
      }).catch(err => {
        console.log(err);
      });
    },
    // 获取余额数据
    getlistData(){
      this.ListData = []
      let vm = this,url='/api/web/wallet/balance',
      params={};
      vm.$axios.get(url,{params}).then((res)=>{
        if(res.data.error_code=='0'){
          if(res.data.data[0]){
            vm.ListData=res.data.data[0]
          }
        }else{
          vm.$message.error(res.data.message);
        }
      }).catch(err => {
        console.log(err);
      });
    },
    // 提交审核
    subInfo(way){
      if(way==1){
        let vm =this,
        url='/api/web/withdrawal/create',
        params={
          trade_amount:vm.trade_amount,
          account_id:vm.account_id.id
        }
        if(!this.account_id){
          this.$message.error('请选择银行卡！');
          return false
        }else if(!this.trade_amount){
          this.$message.error('提现金额不能为空！');
          return false
        }
        vm.$axios({
          method:'post',
          url:url,
          data: params
        }).then((res)=>{
          if(res.data.error_code=='0'){
            
            vm.$message({
              message: '提交审核成功,请等待审核!',
              type: 'success'
            });
            // 刷新路由
            let NewPage = '_empty' + '?time=' + new Date().getTime()/1000
            this.$router.push(NewPage);
            this.$router.go(-1);

          }else{
            vm.$message.error(res.data.message);
          }
        }).catch(err => {
          console.log(err);
        });
      }
      if(way==2){
        //执行父组件关闭方法
        let data = {
          isexStatus: false
        };
        //执行父组件方法
        this.$emit('pviewex',data,'');
      }
      
    },
    closepop(){
      //执行父组件关闭方法
      let data = {
        isexStatus: false
      };
      //执行父组件方法
      this.$emit('pviewex',data,'');
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
  
      

  .itemtitletwo{
    margin-bottom: 15px;
  }
  .itemlinetwo{
    margin-bottom: 15px;
  }
  .btnbox{
    height: 30px;
    margin-top: 40px;
    padding: 0 10%;
  }
  .popsavelt{
    width: 40%;
    height: 30px;
    line-height: 30px;
    float: left;
    text-align: center;
    background: #ac5397;
    font-size: 12px;
    color: #fff;
  }
  .popsavert{ 
    width: 40%; 
    height: 30px;
    line-height: 30px;
    float: right;
    text-align: center;
    background: #ac5397;
    font-size: 12px;
    color: #fff;
  }   

</style>