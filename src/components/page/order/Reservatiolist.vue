<template>
  <div class="ws-content">
    <div class="listtable">
      <div class="list-search">
        <div class="ls-left">
          <div class="form-tabel">
            <div class="td-title">订单信息表</div>
            <div class="td-content">
              <input type="text" v-model="content" />
              <span @click="searchFn" class="search-icon"><i class="el-icon-search"></i></span>
            </div></div>
        </div>
        <div class="ls-right">
          <!--<div class="ls-r-btn"><i class="el-icon-refresh"></i><span>刷新</span></div>-->
        </div>
      </div>
      <el-table stripe :data="ListData">
        <el-table-column prop="create_time" label="下单时间"></el-table-column>
        <el-table-column prop="username" label="订单编号"></el-table-column>
        <el-table-column prop="phone" label="用户名"></el-table-column>
        <el-table-column prop="seat_num" label="手机号码"></el-table-column>
        <el-table-column prop="takeout_num" label="订台类型"></el-table-column>
        <el-table-column prop="booking_time" label="预定时间"></el-table-column>
        <el-table-column prop="address" label="预定座位号"></el-table-column>
        <el-table-column prop="booking_price" label="订座费"></el-table-column>
        <el-table-column prop="phone" label="店铺现金"></el-table-column>
        <el-table-column prop="payment_method" label="付款方式"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div class="tdbtn-box">
              <div class="tdbtn-view" :class="'btn-color-'+scope.row.order_status" @click="viewMore(scope.row)"><span v-text="scope.row.order_status_name"></span></div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="list-bottm"></div>
    </div>
    <div class="pagination">
      <el-pagination v-if="total_page"  @size-change="" @current-change="handleCurrentChange" :page-size="per_page" background small layout="prev, pager, next" :total="total"> </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Member',
    data () {
      return {
        ListData:[],
        content:'',
        min_price:'',
        max_price:'',
        create_start:'',
        create_end:'',
        page:1,
        per_page:0,
        total:0,
        total_page:0
      }
    },
    created(){

    },
    mounted:function(){
      this.getlistData()
    },
    methods:{
      getlistData(){
        let vm =this,url='/api/web/order/list',params={
          user_id:"",    //为空表示所有
          type: "2",      //订单类型 1[外卖] 2[订座] 3[店铺消费] 4[直播会员]
          search: {
            content: vm.content,
            min_price:vm.min_price,
            max_price:vm.max_price,
            create_start:vm.create_start,
            create_end:vm.create_end
          },
          page: vm.page,
        };
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
        this.getlistData(this.page)
      },
      //查询
      searchFn(){
        this.getlistData()
      },
      viewMore(scope){
        /*this.$router.push({
          name:"mdetail",
          params:{
            user_id:scope.id
          }
        })*/
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
  .search-icon{ cursor: pointer; border-radius:1px;border: 1px solid #48344e; padding: 3px; height: 18px; display: inline-block; width: 18px; text-align: center; }
  .td-content{ display: flex; display: -webkit-flex;align-items: center;-webkit-align-items: center}

</style>
