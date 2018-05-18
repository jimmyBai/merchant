<template>
  <div class="main">
    <!-- infoList -->
    <div class="listtable">
      <el-table stripe :data="ListData">
        <el-table-column prop="" label="账号"></el-table-column>
        <el-table-column prop="" label="户名"></el-table-column>
        <el-table-column prop="" label="开户行"></el-table-column>
        <el-table-column prop="" label="钱包余额"></el-table-column>
        <el-table-column prop="trade_amount" label="交易金额"></el-table-column>
        <el-table-column prop="balance" label="交易后余额"></el-table-column>
        <el-table-column prop="trade_time" label="提现时间"></el-table-column>
        <el-table-column prop="" label="操作"></el-table-column>
      </el-table>
      <div class="list-bottom"></div>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination v-if="total_page"  @size-change="" @current-change="handleCurrentChange" :page-size="per_page" background small layout="prev, pager, next" :total="total"> </el-pagination>
    </div>

  </div>

</template>

<script>
export default {
  name: 'recordslist',
  data () {
    return {
      ListData:[],
      page: "1", //页码，默认为1
      length: "10",//每页记录数，默认为10
      page:0,
      per_page:0,
      total:0,
      total_page:0,
    }
  },
  mounted:function(){
    this.getlistData()
  },
  methods:{
    getlistData(){
      let vm =this,url='/api/web/trade/list',params={
        page: vm.page,
        length:vm.length
      };
      vm.ListData=[]
      vm.$axios({
        method:'post',
        url:url,
        data: params
      }).then((res)=>{
        if(res.data.error_code=='0'){
          if(res.data.data.list) {
            vm.ListData = res.data.data.list
          }
          vm.total=Number(res.data.data.total);
          vm.pages=Number(res.data.data.pages);
          vm.page=Number(res.data.data.page);
          vm.per_page=Number(res.data.data.per_page);
          vm.total_page=Number(res.data.data.total_page);
        }else{
          vm.$message.error(res.data.message);
        }

      }).catch(err => {
        console.log(err);
      });
    },
    //分页
    handleCurrentChange(val){
      this.page=val
      this.getlistData()
    }
    
  }
}
</script>
<style scoped>

</style>