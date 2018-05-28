<template>
  <div class="ws-content">
    <div class="navbar">
      <h1 class="nav-bar-title">外卖<small> | 外卖商品信息设置</small></h1>
    </div>
    <div class="tabslist">
      <div class="lineflex">
        <div class="tabslist-head">
          <div :class="{'is-active':activenum=='takeawayAuditOne'}" @click="changetabs('takeawayAuditOne')" class="tabtar-item ">审核通过</div>
          <div :class="{'is-active':activenum=='takeawayAuditTwo'}" @click="changetabs('takeawayAuditTwo')" class="tabtar-item">待审核</div>
          <div :class="{'is-active':activenum=='takeawayAuditThree'}" @click="changetabs('takeawayAuditThree')" class="tabtar-item">审核拒绝</div>
        </div>
        <div class="ls-r-btn" @click="clickadd">
          <i class="el-icon-circle-plus-outline"></i><span>添加</span>
        </div>
      </div>
      <div class="tabslist-content">
        <router-view></router-view>
      </div>
    </div>

    <!-- 添加/查看商品 -->
    <view-goods v-if="isTakeawayShow" :fromParent="fromParent" @viewevent="viewevent"></view-goods>

  </div>
</template>

<script>
import viewGoods from './takeawayPages/viewGoods'

export default {
    name: 'takeaway',
    components:{
      viewGoods
    },
    data () {
      return {
        activenum:'takeawayAuditOne',
        ListData:[],
        isTakeawayShow: false,
        fromParent:''
      }
    },
    created(){

    },
    mounted:function(){
      if(this.$route.path=='/takeaway'){
        this.activenum='takeawayAuditOne'
      }else if(this.$route.path=='/takeawayAuditTwo'){
        this.activenum='takeawayAuditTwo'
      }else if(this.$route.path=='/takeawayAuditThree'){
        this.activenum='takeawayAuditThree'
      }
    },
    methods:{
      viewevent(...data){
        let vm = this;
        vm.isTakeawayShow=data.isTakeawayStatus;
        if(data[0].status&&data[0].status=='refresh'){
          let NewPage = '_empty' + '?time=' + new Date().getTime()/1000
          this.$router.push(NewPage)
          this.$router.go(-1)
        }
      },
      changetabs(way){
        this.activenum=way
        this.$router.push('/'+way)
      },
      clickadd(){
        this.fromParent=''
        this.isTakeawayShow = true;
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
    padding: 3px 8px;
    border-radius: 2px;
    cursor: pointer;
  }
  .ls-r-btn span{
    margin-left: 5px;
  }
</style>
