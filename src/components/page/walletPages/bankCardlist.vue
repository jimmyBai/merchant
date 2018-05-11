<template>
  <div class="main">
    <div class="tabslist">
      <div class="lineflex">
        <div class="tabslist-head">
          <div :class="{'is-active':activenum=='auditStatusOne'}" @click="changetabs('auditStatusOne')" class="tabtar-item ">审核通过</div>
          <div :class="{'is-active':activenum=='auditStatusTwo'}" @click="changetabs('auditStatusTwo')" class="tabtar-item">待审核</div>
          <div :class="{'is-active':activenum=='auditStatusThree'}" @click="changetabs('auditStatusThree')" class="tabtar-item">审核拒绝</div>
        </div>
        <div class="ls-r-btn" @click="clickadd">
          <i class="el-icon-circle-plus-outline"></i><span>添加</span>
        </div>
      </div>
      <div class="tabslist-content">
        <router-view></router-view>
      </div>
    </div>

    <!-- 添加银行卡 -->
    <add-bank-card v-if="isBankCardShow" @pviewbankcard="viewbankcard"></add-bank-card>

  </div>
</template>

<script>
import addBankCard from './bankCardPages/addBankCard'

  export default {
    name: 'bankCardlist',
    components:{
      addBankCard
    },
    data () {
      return {
        activenum:'auditStatusOne',
        ListData:[],
        isBankCardShow: false
      }
    },
    created(){

    },
    mounted:function(){
      if(this.$route.path=='/bankCardlist'){
        this.activenum='auditStatusOne'
      }else if(this.$route.path=='/auditStatusTwo'){
        this.activenum='auditStatusTwo'
      }else if(this.$route.path=='/auditStatusThree'){
        this.activenum='auditStatusThree'
      }
    },
    methods:{
      changetabs(way){
        this.activenum=way
        this.$router.push('/'+way)
      },
      viewbankcard(...data){
        let vm = this;
        vm.isBankCardShow=data.isBankCardStatus;
      },
       clickadd(){
        this.isBankCardShow = true;

      }
    }
  }
</script>
<style scoped>
  .lineflex{
    width: 100%;
    height: 31px;
    position: relative;
  }
  .ls-r-btn{
    position: absolute;
    right: 20px;
    bottom: 5px;
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