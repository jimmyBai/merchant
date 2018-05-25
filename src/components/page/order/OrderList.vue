<template>
  <div class="ws-content">
    <div class="listtable">
      <div class="list-search">
        <div class="ls-left">
          <div class="form-tabel">
            <div class="td-title">订单信息表</div>
            <div class="td-content">
              <input type="text" v-model="search.content" />
              <el-select v-model="order_status" placeholder="全部" class="osselect">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
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
        <el-table-column label="商品金额" prop="goodsprice"></el-table-column>
        <el-table-column label="付款金额" prop="payprice"></el-table-column>
        <el-table-column label="订单状态" align="right">
          <template slot-scope="scope">
            <div class="tdbtn-box">
              <div class="tdbtn-view" :class="'btn-color-'+scope.row.order_status" @click="viewMore(scope.row)">
                <span v-if="scope.row.order_status!=1" v-text="scope.row.order_status_name"></span>
                <span v-if="scope.row.order_status==1">待接单</span>
              </div>
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
    <!--更多查询-->
    <div class="right_seachBar">
      <div class="arrorbox" @click="ishowSearch=!ishowSearch"><span><i class="icon-toogle"></i></span></div>
      <search-view v-if="ishowSearch" :searchinfo="search" @tievent = "fromtip"></search-view>
    </div>
  </div>
</template>

<script>
import popView from './Poptakeout'
import searchView from './Seacrhtips'
  export default {
    name: 'Member',
    components:{popView,searchView},
    data () {
      return {
        ListData:[],
        search:{
          content: "",  //模糊搜索的内容，默认为空，可搜索用户名和手机号码
          min_balance: "",//余额最小值，默认为空，不能小于0
          max_balance: "",//余额最大值，默认为空，不能小于0
          create_start: "",//加入开始时间，默认为空，格式为'xxxx-xx-xx'，具体看详细说明
          create_end: ""  //加入结束时间，默认为空，格式为'xxxx-xx-xx'，具体看详细说明
        },
        page:1,
        per_page:0,
        total:0,
        total_page:0,
        popdiv:false,
        orderinfo:{},
        options: [{
          value: '-1',label: '全部'}, {
          value: '0',label: '待付款'}, {
          value: '1',label: '待接单'}, {
          value: '2',label: '待配送'}, {
          value: '3',label: '派送中'}, {
          value: '5',label: '已完成'}, {
          value: '6',label: '已取消'}
          ],
        order_status: '',
        ishowSearch:false
      }
    },
    created(){

    },
    mounted:function(){
      this.getMemberOrder()
      //orderstatus:0未付款,1已付款,2待配送，3派送中，4座位使用中，5已完成，6已取消，7超时未付款，8待退款，9已退款
    },
    methods:{
      getMemberOrder(){
        let vm =this,url='/api/web/order/list',params={
          user_id: "",    //为空表示所有
          type: "1",      //订单类型 1[外卖] 2[订座] 3[店铺消费] 4[直播会员]
          search: {
            order_status:vm.order_status=='-1'?'':vm.order_status,
            content: vm.search.content,
            min_price:vm.search.min_price,
            max_price:vm.search.max_price,
            create_start:vm.search.create_start,
            create_end:vm.search.create_end
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
            /*if(res.data.data.list) {
              let dateArray=[]
              if(res.data.data.list.length>0){
                res.data.data.list.forEach(item=>{
                  if(item.order_status==7||item.order_status==0){

                  }else{
                    dateArray.push(item)
                  }

                })
              }


            }*/
            vm.ListData = res.data.data.list
            vm.total=Number(res.data.data.total);
            vm.pages=Number(res.data.data.pages);
            vm.page=Number(res.data.data.page);
            vm.per_page=Number(res.data.data.per_page);
            vm.total_page=Number(res.data.data.total_page);
            //遍历商品数量
            vm.ListData.forEach(item=>{
              if(item.products&&item.products.length>0){
                var totalnum=0,goodsprice=0,payprice=0
                item.products.forEach(goods=>{
                  totalnum+=parseInt(goods.num)
                  goodsprice+=goods.num*goods.price
                })
                payprice=(goodsprice/1)+(item.delivery_fee/1)
                vm.$set(item,'goodsprice',goodsprice.toFixed(2))
                vm.$set(item,'totalnum',totalnum)
                vm.$set(item,'payprice',payprice.toFixed(2))
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
      },
      //更多查询
      fromtip(...data){
        let vm = this;
        vm.ishowSearch=false
        console.log(data)
        vm.search.min_price=data[0].min_balance;
        vm.search.max_price=data[0].max_balance;
        vm.search.create_start=data[0].create_start;
        vm.search.create_end=data[0].create_end;
        vm.getMemberOrder()
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
  .osselect{ margin-left: 4px;}
  .td-content{ display: flex; display: -webkit-flex;align-items: center;-webkit-align-items: center}
</style>
