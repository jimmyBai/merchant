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
      </div>
      <div class="tabslist-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'takeaway',
    data () {
      return {
        activenum:'takeawayAuditOne',
        ListData:[]
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
      //this.getlistData()
    },
    methods:{
      // getlistData(){
      //   let vm =this,url='/api/web/user/order-list',params={
      //     "user_id": "",
      //     "type": "2",
      //     "search": {
      //       "order_sn": ""
      //     },
      //     "page": "1",
      //     "length": "10"
      //   };
      //   vm.$axios({
      //     method:'post',
      //     url:url,
      //     data: params
      //   }).then((res)=>{
      //     if(res.data.error_code=='10000'||res.data.error_code=='200'){
      //       vm.ListData=res.data.data
      //     }else{
      //       vm.$message.error(res.data.message);
      //       console.log(res.data.message)
      //     }
      //   }).catch(err => {
      //     console.log(err);
      //   });
      // },
      viewMore(scope){
        // this.$router.push({
        //   name:"mdetail",
        //   params:{
        //     user_id:scope.id
        //   }
        // })
      },
      changetabs(way){
        this.activenum=way
        this.$router.push('/'+way)
      },
    }
  }

</script>
<style scoped>

</style>
