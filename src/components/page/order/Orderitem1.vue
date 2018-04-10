<template>
  <div class="ws-content">
    <div class="listtable">
      <div class="list-search">
        <div class="ls-left">
          <div class="form-tabel">
            <div class="td-title">订单信息表</div>
            <div class="td-content"><input type="text" /><span class="search-icon"><i class="el-icon-search"></i></span></div>
          </div>
        </div>
        <div class="ls-right">

        </div>
      </div>
      <el-table stripe :row-key="getRowKeys" :expand-row-keys="expands" :data="ListData">
        <el-table-column label="下单时间" prop="create_time"></el-table-column>
        <el-table-column label="订单编号" prop="order_sn"></el-table-column>
        <el-table-column label="数量" prop="num"></el-table-column>
        <el-table-column label="积分" prop="total"></el-table-column>
        <el-table-column label="服务费" prop="service_fee"></el-table-column>
        <el-table-column label="付款金额" prop="order_paid_price"></el-table-column>
        <el-table-column label="订单状态">
          <template slot-scope="scope">
            <div class="tdbtn-box">
              <div v-if="scope.row.status==1" class="tdbtn-view btn-c-error" @click="viewMore(scope.row)"><span>待接单</span></div>
              <div v-if="scope.row.status==2" class="tdbtn-view btn-c-success" @click="viewMore(scope.row)"><span>派送中</span></div>
              <div v-if="scope.row.status==3" class="tdbtn-view btn-c-waring" @click="viewMore(scope.row)"><span>待派送</span></div>
              <div v-if="scope.row.status==4" class="tdbtn-view btn-c-waring" @click="viewMore(scope.row)"><span>待派送</span></div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="list-bottm"></div>
    </div>
    <div class="pagination">
      <el-pagination background small layout="prev, pager, next" :total="110"> </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Member',
    data () {
      return {
        getRowKeys(row) {
          return row.id;
        },
        expands: [],
        ListData:[]
      }
    },
    created(){

    },
    mounted:function(){

      this.getlistData()
    },
    methods:{
      getlistData(){
        let vm =this,url='/api/web/user/order-list',params={
          "user_id": "",    //为空表示所有
          "type": "1",      //订单类型 1[外卖] 2[订座] 3[店铺消费] 4[直播会员]
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
          if(res.data.error_code=='0'){
            if(res.data.data.list){
              vm.ListData=res.data.data.list
            }
          }else{
            vm.$message.error(res.data.message);
            console.log(res.data.message)
          }
        }).catch(err => {
          console.log(err);
        });
      },
      viewMore(scope){
      }
    }
  }
</script>
<style scoped>
  .list-search{ padding:0 10px; display: flex;display: -webkit-flex; justify-content: space-between;-webkit-justify-content: space-between}
  .ls-right .ls-r-btn{ color: #fff; font-size: 12px; background:#22baa0; padding: 3px 8px; border-radius: 2px; cursor: pointer}
  .ls-right .ls-r-btn span{ margin-left: 5px}
  .ls-left .form-tabel{ display: flex;display: -webkit-flex; align-items: center; -webkit-align-items: center; padding-bottom: 10px}
  .form-tabel .td-title{ margin-right: 5px; color: #f8e2ff}
  .form-tabel input {border-radius:1px;background: #2e1c34; padding: 3px; border: 1px solid #48344e; height: 18px; line-height: 18px; text-indent: 5px; color:#f8e2ff; width: 150px}
  .search-icon{ cursor: pointer; border-radius:1px;border: 1px solid #48344e; padding: 3px; height: 18px; display: inline-block; width: 18px; text-align: center; margin-left: 1px}

</style>
