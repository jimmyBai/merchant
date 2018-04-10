<template>
    <div>
      锁屏
    </div>
</template>

<script>
  export default {
    name: 'myinfo',
    data () {
      return {
        ListData:[]
      }
    },
    created(){

    },
    mounted:function(){
    },
    methods:{
      getlistData(){
        let vm =this,url='/api/api/member/list',params={};
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
      }
    }
  }
</script>
<style scoped>

</style>
