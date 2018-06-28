<template>
  <div class="ws-content">
    <div class="navbar">
      <h1 class="nav-bar-title">订单信息<small> | 订单详细信息</small></h1>
    </div>
    <div class="tabslist">
      <div class="lineflex">
        <div class="tabslist-head">
          <div :class="{'is-active':activenum=='orderitem1'}" @click="changetabs('orderitem1')" class="tabtar-item ">外送订单</div>
          <div v-if="false" :class="{'is-active':activenum=='orderitem2'}" @click="changetabs('orderitem2')" class="tabtar-item">订台订单</div>
          <div :class="{'is-active':activenum=='orderitem3'}" @click="changetabs('orderitem3')" class="tabtar-item">直播订单</div>
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
    name: 'order',
    data () {
      return {
        activenum:'orderitem1',
        ListData:[]
      }
    },
    created(){

    },
    mounted:function(){
      if(this.$route.path=='/order'){
        this.activenum='orderitem1'
      }else if(this.$route.path=='/orderitem2'){
        this.activenum='orderitem2'
      }else if(this.$route.path=='/orderitem3'){
        this.activenum='orderitem3'
      }
      //this.getlistData()
    },
    methods:{
      getlistData(){
        let vm =this,url='/api/web/user/order-list',params={
          "user_id": "",
          "type": "2",
          "search": {
            "order_sn": ""
          },
          "page": "1",
          "length": "10"
        };
        vm.$axios({
          method:'post',
          url:url,
          data: params
        }).then((res)=>{
          if(res.data.error_code=='10000'||res.data.error_code=='200'){
            vm.ListData=res.data.data
          }else{
            vm.$message.error(res.data.message);
            console.log(res.data.message)
          }
        }).catch(err => {
          console.log(err);
        });
      },
      viewMore(scope){
        this.$router.push({
          name:"mdetail",
          params:{
            user_id:scope.id
          }
        })
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
