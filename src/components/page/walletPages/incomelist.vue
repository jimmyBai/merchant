<template>
  <div class="main">
  
    <div class="listtable">
      <div class="list-search">

        <div class="ls-left">
          <div class="form-tabel">
            <el-row class="res-content-line">
              <el-col :span="3"><div class="td-title">收入交易记录表</div></el-col>
              <el-col :span="3"><div class="res-title">筛选时间：</div></el-col>
              <el-col :span="5">
                <div class="res-input">
                  <el-date-picker :editable="false" v-model="search.start_time" clear-icon value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
                </div>
              </el-col>
              <el-col :span="1"><div class="res-line">至</div></el-col>
              <el-col :span="5">
                <div class="res-input">
                  <el-date-picker :editable="false" v-model="search.end_time" clear-icon value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
                </div>
              </el-col>
              <el-col :span="3"><div class="res-title">收入类型：</div></el-col>
              <el-col :span="7">
                <div class="td-content">
                  <el-select v-model="search.type" placeholder="全部" class="osselect">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                  <span class="search-icon" @click="searchlist"><i class="el-icon-search"></i></span>
                </div>
              </el-col>
              <!-- <el-col :span="3"><div class="res-export"><span>导出</span></div></el-col> -->
            </el-row>
          </div>
        </div>

      </div>

      <el-table stripe :data="ListData">
        <el-table-column prop="order_sn" label="订单号"></el-table-column>
        <el-table-column prop="type" label="收入类型"></el-table-column>
        <el-table-column prop="amount" label="收入金额"></el-table-column>
        <el-table-column prop="receipt_time" label="收款时间"></el-table-column>
        <el-table-column width="100" prop="status" label="结算">
          <template slot-scope="scope">
            <div class="orstatus">
              <div :class="'btn-color-'+scope.row.status">
                <span v-if="scope.row.status!=1">未解冻</span>
                <span v-if="scope.row.status==1">已解冻</span>
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
// andy
import "../../../../static/css/newStyle.css"

  export default {
    name: 'infoPrompt',
    data () {
      return {
        ListData: [],
        search:{
          start_time: "", //开始时间
          end_time: "", //结束时间
          type: ""  //搜索类型
        },
        page: "1", //页码，默认为1
        length: "10", //每页记录数，默认为10
        page:0,
        per_page:0,
        total:0,
        total_page:0,
        options: [
          {value: 'takeout',label: '外送'},
          {value: 'seat',label: '订座'},
          {value: 'vip_member',label: '直播会员'},
          {value: 'prepaid_card',label: '充值卡'},
          {value: 'tip',label: '消费'}
        ]

      }
    },
    mounted:function(){
      this.getlistData();
    },
    methods:{
      // 获取列表数据
      getlistData(){
        this.ListData = []
        let vm =this,url,params={
          "search": vm.search,
          "page": vm.page,
          "length":vm.length
        }
        vm.search.start_time?(vm.search.start_time).substr(0,10):''
        vm.search.end_time?(vm.search.end_time).substr(0,10):''
        url='/api/web/trade/list/in';
        vm.$axios({
          method:'post',
          url:url,
          data: params
        }).then((res)=>{
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
        })
      },

      // 搜索
      searchlist(data){
        this.getlistData()
      },
      // 分页
      handleCurrentChange(val){
        this.page=val
        this.getlistData();
      }


    }
  }

</script>

<style scoped>
  .list-search{ padding:0 10px; display: flex;display: -webkit-flex; justify-content: space-between;-webkit-justify-content: space-between}
  .ls-right .ls-r-btn{ color: #fff; font-size: 12px; background: rgb(242,86,86); padding: 3px 8px; border-radius: 2px; cursor: pointer}
  .ls-right .ls-r-btn span{ margin-left: 5px}
  .ls-left .form-tabel{ display: flex;display: -webkit-flex; align-items: center; -webkit-align-items: center; padding-bottom: 10px}
  .form-tabel .td-title{ margin-right: 5px; color: #f8e2ff}
  .form-tabel input {border-radius:1px;background: #2e1c34; padding: 3px; border: 1px solid #48344e; height: 18px; line-height: 18px; text-indent: 5px; color:#f8e2ff; width: 150px}
  .search-icon{ cursor: pointer; border-radius:1px;border: 1px solid #48344e; padding: 3px; height: 18px; display: inline-block; width: 18px; text-align: center;}
  .td-content{ display: flex; display: -webkit-flex;align-items: center;-webkit-align-items: center}
  
  .orstatus{
    float: left;
  }
</style>