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
            </div>
          </div>
        </div>
        <div class="ls-right"></div>
      </div>
      <el-table stripe :data="ListData">
        <el-table-column label="下单时间" prop="create_time"></el-table-column>
        <el-table-column label="订单编号" prop="order_sn"></el-table-column>
        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="手机号" prop="phone"></el-table-column>
        <el-table-column label="商品数量" prop="totalnum"></el-table-column>
        <el-table-column label="配送费" prop="delivery_fee"></el-table-column>
        <el-table-column label="付款金额" prop="order_paid_price"></el-table-column>
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
      <el-pagination v-if="total_page" @size-change="" @current-change="handleCurrentChange" :page-size="per_page" background small layout="prev, pager, next" :total="total"> </el-pagination>
    </div>
    <!--详情-->
    <pop-view  v-if="popdiv" :orderinfo="orderinfo" @sievent = "frompop"></pop-view>
  </div>
</template>

<script>
import popView from './Poptakeout'
  export default {
    name: 'Member',
    components:{popView},
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
        total_page:0,
        popdiv:false,
        orderinfo:{},
      }
    },
    created(){

    },
    mounted:function(){
      this.getMemberOrder()
      //orderstatus:0未付款,1已付款,2待派送，3派送中，4座位使用中，5已完成，6已取消，7超时未付款，8待退款，9已退款
    },
    methods:{
      getMemberOrder(){
        let vm =this,url='/api/web/order/list',params={
          user_id: "",    //为空表示所有
          type: "1",      //订单类型 1[外卖] 2[订座] 3[店铺消费] 4[直播会员]
          search: {
            content: vm.content,
            min_price:vm.min_price,
            max_price:vm.max_price,
            create_start:vm.create_start,
            create_end:vm.create_end
          },
          page: vm.page,
        };
        vm.ListData=[];
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
            //遍历商品数量
            vm.ListData.forEach(item=>{
              if(item.products&&item.products.length>0){
                var totalnum=0
                item.products.forEach(goods=>{
                  totalnum+=goods.num
                })
                vm.$set(item,'totalnum',totalnum)
              }
            })



          }else{
            vm.$message.error(res.data.message);
          }

        }).catch(err => {
          console.log(err);
        });
      },
      viewMore(scope){
        this.orderinfo={
          orderid:scope.order_sn.toString(),
          title:scope.order_status_name,
        }
        this.popdiv=!this.popdiv
      },
      frompop(...data){
        let vm = this;
        vm.popdiv=data[0].popstatus
        if(data[0].status&&data[0].status=='refresh'){
          vm.getMemberOrder()
        }
      },
      //分页
      handleCurrentChange(val){
        this.page=val
        this.getMemberOrder()
      },
      //查询
      searchFn(){
        this.getMemberOrder()
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
