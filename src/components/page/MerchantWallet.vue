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
            <span class="moneytext">
              <span class="wenhaotext">账户余额</span>
              <input type="button" style="cursor:pointer;" class="moneybtn" value="提现" @click="openEX">
            </span>
          </div>
        </div>
        <div class="moneycontent">
          <div class="moneyshow">
            <span class="moneynum ctmy">
              <span>￥<span v-text="ListData.frozen_balance"></span></span>
            </span>
            <span class="moneytext">
              <span class="wenhaotext2">不可提现金额</span>
              <img class="wenhaoimg" style="cursor:pointer;" src="../../../static/img/wenhao.png" @click="showwenhao" />
            </span>
          </div>
          <span class="wenhaopt" v-if="iswenhaoHide">每笔收入金额需要七天时间解冻，解冻后转到账户余额即可提现</span>
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
              <!-- <div :class="{'is-active':activenum=='extractlist'}" @click="changetabs('extractlist')" class="tabtar-item">提取</div> -->

              <div :class="{'is-active':activenum=='incomelist'}" @click="changetabs('incomelist')" class="tabtar-item">收入</div>
              <div :class="{'is-active':activenum=='expendlist'}" @click="changetabs('expendlist')" class="tabtar-item">支出</div>
              <!-- <div :class="{'is-active':activenum=='recordslist'}" @click="changetabs('recordslist')" class="tabtar-item">交易记录</div> -->
              <div :class="{'is-active':activenum=='bankCardlist'}" @click="changetabs('bankCardlist')" class="tabtar-item ">银行卡</div>
              <div class="ls-r-btn" @click="clickadd">
                <i class="el-icon-circle-plus-outline"></i><span>添加</span>
              </div>
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

    <!-- 提现 -->
    <extractlist v-if="isexShow" @pviewex="viewex"></extractlist>


  </div>
</template>

<script>
import addBankCard from './walletPages/addBankCard'
import infoPrompt from './walletPages/infoPrompt'
import extractlist from './walletPages/extractlist'

export default {
  name: 'MerchantWallet',
  components:{
    addBankCard,
    infoPrompt,
    extractlist
  },
  data () {
    return {
      activenum: 'incomelist',
      ListData: [],
      isBankCardShow: false,
      isPromptShow: false,
      fromParent:'',
      isexShow: false,
      iswenhaoHide: false
    }
  },
  created(){

  },
  mounted:function(){
    if(this.$route.path=='/MerchantWallet'){
      this.activenum='incomelist'
    }else if(this.$route.path=='/expendlist'){
      this.activenum='expendlist'
    }else if(this.$route.path=='/bankCardlist'){
      this.activenum='bankCardlist'
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

        if(!this.$router.push('/bankCardlist')){
          this.$router.push('/bankCardlist');
          this.activenum='bankCardlist'
        }
        if(this.$router.push('/bankCardlist')==this.$router.push('/bankCardlist')){
          let NewPage = '_empty' + '?time=' + new Date().getTime()/1000
          this.$router.push(NewPage);
          this.$router.go(-1);
        }

        setTimeout(function(){
          vm.isPromptShow = false;
        },2000);
      }
    },
    viewprompt(...data){
      let vm = this;
      vm.isPromptShow=data[0].isPromptStatus;
    },
    viewex(...data){
      let vm = this;
      vm.isexShow=data[0].isexStatus;
    },
    openEX(){
      let vm = this;
      vm.isexShow = true;
    },
    clickadd(){
      let vm = this;
      vm.isBankCardShow = true;
      vm.isPromptShow = false;
    },
    // 金额提示
    showwenhao(){
      let vm = this;
      vm.iswenhaoHide = true;
      setTimeout(function(){
        vm.iswenhaoHide = false;
      },2000)
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
    /* width: 15%; */
    width: 75%;
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
    margin: 5px 0 0 5px;
    width: auto;
    height: 24px;
    line-height: 24px;
    position: relative;
  }

  .ctmy{
    display: block;
    font-size: 16px;
    color: #cccccc;
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

  .moneybtn{
    position: relative;
    bottom: 2px;
    right: 0;
    width: 60px;
    height: 20px;
    line-height: 20px;
    border: 0;
    border-radius: 0.5rem;
    font-size: 12px;
    background: #724480;
    color: #fff;
    border-color: #724480;
    -webkit-appearance:none;
  }

  .wenhaoimg{ width: 20px;  height: 20px; }
  .wenhaotext{ position: relative;  top: -2px; }
  .wenhaotext2{  position: relative; top: -4px; }
  .wenhaopt{ display: block;  position: absolute;   bottom: 30px;   color: #fff;   height: 20px;   line-height: 20px;    border: 1px solid #706375;
    text-align: center; padding:0 10px;border-radius: 0.5rem;  }
</style>
