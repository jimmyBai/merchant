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
              <span>￥100<span>.00</span></span>
            </span>
            <span class="moneytext">账户余额</span>
          </div>
        </div>
        <div class="moneyright">
          <div class="moneyshow">
            <span class="moneynum smallmy">
              <span>￥100<span>.00</span></span>
            </span>
            <span class="moneytext smalltxt">客户充值卡金额</span>
          </div>
        </div>
      </div>
      <!-- tab -->
      <div class="datatab">
        <div class="tabslist">
          <div class="lineflex">
            <div class="tabslist-head">
              <div :class="{'is-active':activenum=='bankCardlist'}" @click="changetabs('bankCardlist')" class="tabtar-item ">银行卡</div>
              <div :class="{'is-active':activenum=='extractlist'}" @click="changetabs('extractlist')" class="tabtar-item">提取</div>
              <div :class="{'is-active':activenum=='recordslist'}" @click="changetabs('recordslist')" class="tabtar-item">交易记录</div>
              <div :class="{'is-active':activenum=='certificationlist'}" @click="changetabs('certificationlist')" class="tabtar-item">企业认证</div>
              <div :class="{'is-active':activenum=='extractPwdlist'}" @click="changetabs('extractPwdlist')" class="tabtar-item">提取密码</div>
            </div>
          </div>
          <div class="tabslist-content">
            <router-view></router-view>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MerchantWallet',
  data () {
    return {
      activenum:'bankCardlist',
      ListData:[]
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
    }else if(this.$route.path=='/certificationlist'){
      this.activenum='certificationlist'
    }else if(this.$route.path=='/extractPwdlist'){
      this.activenum='extractPwdlist'
    }
  },
  methods:{
    changetabs(way){
      this.activenum=way
      this.$router.push('/'+way)
    },
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
  .moneyright{
    width: 75%;
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
  .smalltxt{
    padding: 10px 0 0 2px;
  }
  .smallmy{
    display: block;
    font-size: 16px;
    color: #cccccc;
  }
</style>