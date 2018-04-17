<template>
  <div class="ws-content">
    <div class="listtable">
      <div class="list-search">
        <div class="ls-left">
          <div class="form-tabel">
            <div class="td-title">订单信息表</div>
            <div class="td-content">
              <input v-model="content" type="text" />
              <span class="search-icon" @click="searchfn"><i class="el-icon-search"></i></span></div>
          </div>
        </div>
        <div class="ls-right">

        </div>
      </div>
      <el-table stripe :row-key="getRowKeys" :expand-row-keys="expands" :data="ListData">
        <el-table-column label="下单时间" prop="create_time"></el-table-column>
        <el-table-column label="订单编号" prop="order_sn"></el-table-column>
        <!--<el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="手机号" prop="phone"></el-table-column>-->
        <el-table-column label="商品数量" prop="totalnum"></el-table-column>
        <el-table-column label="配送费" prop="delivery_fee"></el-table-column>
        <el-table-column label="付款金额" prop="order_paid_price"></el-table-column>
        <el-table-column label="订单状态">
          <template slot-scope="scope">
            <span :class="'status-'+scope.row.order_status" v-text="scope.row.order_status_name"></span>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div class="tdbtn-box">
              <div class="tdbtn-view" @click="viewMore(scope.row)"><i class="el-icon-view"></i> <span>查看</span></div>
            </div>
          </template>
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="table-expand">
              <div class="expandname">
                <span>商品信息</span>
              </div>
              <div class="expandgoodslist">
                <div class="linetr" v-for="(items,line) in props.row.products" :key="line">
                  <div class="goodslistitem">
                    <div class="goodsimg">
                      <div class="img"><img src="../../../../static/img/goodsimg.jpg" /> </div>
                      <div class="goodsNum"><span v-text="items.num"></span></div>
                    </div>
                    <div class="goodsname">
                      <span v-text="items.name"></span>
                    </div>
                    <div class="vgoodsnum">
                      <span class="goodsprice" v-text="'¥'+items.num.toFixed(2)"></span>
                    </div>
                  </div>
                </div>
              </div>
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
        getRowKeys(row) {
          return row.order_sn;
        },
        expands: [],
        ListData:[],
        page:1,
        per_page:0,
        total:0,
        total_page:0,
        content:''
      }
    },
    created(){

    },
    mounted:function(){
      this.getMemberOrder('')
    },
    methods:{
      getMemberOrder(content){
        let vm =this,url='/api/web/order/list',params={
          "user_id": sessionStorage.getItem('user_id')||"",    //为空表示所有
          "type": "1",      //订单类型 1[外卖] 2[订座] 3[店铺消费] 4[直播会员]
          "search": {
            "content": content
          },
          "page": vm.page,
          "length": "10"
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
        if(this.expands.toString().indexOf(scope.order_sn)>=0){
          this.expands=[]
        }else{
          this.expands=[]
          this.expands.push(scope.order_sn);
        }
      },
      //分页
      handleCurrentChange(val){
        this.page=val
        this.getMemberOrder()
      },
      searchfn(searchfn){
      this.getMemberOrder(this.content)
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
.expandgoodslist .linetr>div{ padding: 15px}
.goodsimg{ position: relative;}
.goodsimg .img{ height: 50px;width: 50px;}
.goodsimg .img img { width: 100%; border-radius: 3px;}
.goodsimg .goodsNum{ position:absolute; right: -10px; top: -10px}
.goodsimg .goodsNum span{ transform: scale(0.8); display: inline-block; height: 20px;width: 20px; line-height: 20px; background:#523f53; color: #fff; text-align: center; border-radius: 100%}
.goodslistitem{display: flex; display: -webkit-flex;align-items: center; -webkit-align-items: center}
.goodslistitem>div{ margin-right: 20px}
</style>
