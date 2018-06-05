<template>
  <div class="ws-content">
    <div class="navbar">
      <h1 class="nav-bar-title">直播总汇报表<small> | 查看直播报表情况</small></h1>
    </div>
    <div class="searchbar">

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  created(){

  },
  mounted:function(){
    //this.getlistData()
  },
  methods:{
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
    }
  }
}
</script>
<style scoped>
</style>
