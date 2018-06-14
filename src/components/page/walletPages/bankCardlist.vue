<template>
  <div class="main">
    <!-- infoList -->
    <div class="listtable">
      <el-table stripe :data="ListData">
        <el-table-column width="100" prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="银行名称"></el-table-column>
        <el-table-column prop="account_sn" label="账户号码"></el-table-column>
        <el-table-column prop="account_name" label="支行"></el-table-column>
        <!-- <el-table-column prop="" label="单笔限额"></el-table-column>
        <el-table-column prop="" label="每日限额"></el-table-column> -->
        <el-table-column prop="create_time" label="递交时间"></el-table-column>
        <!-- <el-table-column prop="" label="审核时间"></el-table-column> -->
        <el-table-column label="操作" width="100" v-if="false">
          <template slot-scope="scope">
            <div class="tdBtn-box">
              <div class="tdBtn-view bkpages" @click="removeThis(scope.row.id)">
                <i class="el-icon-delete"></i>&nbsp;&nbsp;<span>删除</span>
              </div>
            </div>
          </template>
        </el-table-column>
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
import "../../../../static/css/newStyle.css"

export default {
  name: 'bankCardlist',
  components:{

  },
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
      this.ListData = []
      let vm = this,url='/api/web/bank',
      params={
        page: vm.page,
        length:vm.length
      };
      vm.$axios.get(url,{params}).then((res)=>{
        if(res.data.error_code=='0'){
          if(res.data.data.list){
            vm.ListData=res.data.data.list
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
    // 分页
    handleCurrentChange(val){
      this.page=val
      this.getlistData();
    },
    clickadd(){

    },
    addbankcard(){

    },
    // 删除
    removeThis(id){
      return
      let vm = this,
      url='/api/web/bank/del',
      params={'id':id}
      vm.$axios({
        method:'post',
        data:params,
        url:url
      }).then((res)=>{
        if(res.data.error_code=='0'){
          vm.$message({
            message: '删除成功!',
            type: 'success'
          });
          vm.getlistData()
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
