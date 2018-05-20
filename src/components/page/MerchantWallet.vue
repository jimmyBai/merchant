<template>
  <div class="main">
    <div class="navbar">
      <h1 class="nav-bar-title">钱包<small> | 详细信息</small></h1>
    </div>
    <div class="databox">
      <div class="databanner">
        <div class="moneyleft">
          <div class="moneyshow">
            <span class="moneynum">
              <span>￥<span v-text="ListData.balance"></span></span>
            </span>
            <span class="moneytext">账户余额</span>
          </div>
        </div>
        <div class="moneycontent">
          <div class="moneyshow">
            <span class="moneynum ctmy">
              <span>￥<span v-text="ListData.frozen_balance"></span></span>
            </span>
            <span class="moneytext cttxt">不可提现金额</span>
          </div>
        </div>
        <!-- <div class="moneyright">
          <div class="moneyshow">
            <span class="moneynum rtmy">
              <span>￥100<span>.00</span></span>
            </span>
            <span class="moneytext rttxt">客户充值卡金额</span>
          </div>
        </div> -->
      </div>
      <!-- tab -->
      <div class="datatab">
        <div class="tabslist">
          <div class="lineflex">
            <div class="tabslist-head">
              <div :class="{'is-active':activenum=='bankCardlist'}" @click="changetabs('bankCardlist')" class="tabtar-item ">银行卡</div>
              <div :class="{'is-active':activenum=='extractlist'}" @click="changetabs('extractlist')" class="tabtar-item">提取</div>
              <div :class="{'is-active':activenum=='recordslist'}" @click="changetabs('recordslist')" class="tabtar-item">交易记录</div>
              <!-- <div class="ls-r-btn" @click="clickadd">
                <i class="el-icon-circle-plus-outline"></i><span>添加</span>
              </div> -->
            </div>
          </div>
          <div class="tabslist-content">
            <router-view></router-view>
          </div>
        </div>

      </div>
    </div>

    <!-- 添加银行卡 -->
    <add-bank-card v-if="isBankCardShow" :fromParent="fromParent" @pviewbankcard="viewbankcard"></add-bank-card>
    <!-- 银行卡递交提示 -->
    <info-prompt v-if="isPromptShow" @pviewprompt="viewprompt"></info-prompt>

  </div>
</template>

<script>
import addBankCard from './walletPages/addBankCard'
import infoPrompt from './walletPages/infoPrompt'

export default {
  name: 'MerchantWallet',
  components:{
    addBankCard,
    infoPrompt
  },
  data () {
    return {
      activenum: 'bankCardlist',
      ListData: [],
      isBankCardShow: false,
      isPromptShow: false,
      fromParent:''
    }
  },
  created(){

  },
  mounted:function(){
    if(this.$route.path=='/MerchantWallet'){
      this.activenum='bankCardlist'
    }else if(this.$route.path=='/extractlist'){
      this.activenum='extractlist'
    }else if(this.$route.path=='/recordslist'){
      this.activenum='recordslist'
    }

    this.getlistData()
  },
  methods:{
    changetabs(way){
      this.activenum=way
      this.$router.push('/'+way)
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

    viewbankcard(...data){
      let vm = this;
      vm.isBankCardShow=data[0].isBankCardStatus;
      if(data[0].status&&data[0].status=='refresh'){
        vm.isPromptShow=!vm.isBankCardShow
        setTimeout(function(){
          vm.isPromptShow = false;
        },2000);
      }
    },
    viewprompt(...data){
      let vm = this;
      vm.isPromptShow=data[0].isPromptStatus;
    },
    clickadd(){
      let vm = this;
      vm.isBankCardShow = true;
      vm.isPromptShow = false;
    }
  }
}
</script>
<style scoped>
  .databanner{
    width: 100%;
    height: 160px;
    background: #38213e;
  }
  .moneyleft{
    width: 25%;
    height: 160px;
    float: left;
    position: relative;
    display: flex;
    justify-content: center;
  }
  .moneycontent{
    width: 15%;
    height: 160px;
    float: left;
    position: relative;
  }
  .moneyright{
    width: 60%;
    height: 160px;
    float: right;
    position: relative;
  }
  .moneyshow{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .moneynum{
    display: block;
    font-size: 24px;
    color: #ffffff;
  }
  .moneytext{
    display: block;
    padding: 5px 0 0 5px;
  }

  .ctmy{
    display: block;
    font-size: 16px;
    color: #cccccc;
  }
  .cttxt{
    padding: 10px 0 0 2px;
  }
  .rtmy{
    display: block;
    font-size: 16px;
    color: #cccccc;
  }
  .rttxt{
    padding: 10px 0 0 2px;
  }
  


  .ls-r-btn{
    position: absolute;
    right: 20px;
    bottom: 3px;
    color: #fff;
    font-size: 12px;
    background: rgb(242,86,86);
    padding: 3px 10px;
    border-radius: 2px;
    cursor: pointer;
  }
  .ls-r-btn span{
    margin-left: 5px;
  }
  
</style>