<template>
  <div class="main">

    <div class="databox">
      <div class="title">
        <span>实时数据</span>
      </div>
      <div class="content">
        <div class="tipimgshow">

          <div class="imgcontent">
            <div class="insideleft">
              <img class="phoneimg" src="../../../../static/img/tipone.png" alt="">
            </div>
            <div class="insideright">
              <span v-text="$options.filters.viewMoney(summary_data.total_price,1)" class="apcolor"></span>
              <span>总额</span>
            </div>
          </div>
          <div class="imgcontent">
            <div class="insideleft">
              <img src="../../../../static/img/tipthree.png" alt="">
            </div>
            <div class="insideright">
              <span v-text="$options.filters.viewMoney(summary_data.package_price,1)" class="apcolor"></span>
              <span>套餐总额</span>
            </div>
          </div>
          <div class="imgcontent">
            <div class="insideleft">
              <img src="../../../../static/img/tipthree.png" alt="">
            </div>
            <div class="insideright">
              <span v-text="$options.filters.viewMoney(summary_data.user_pay_price,1)" class="apcolor"></span>
              <span>实付金额</span>
            </div>
          </div>
          <div class="imgcontent">
            <div class="insideleft">
              <img src="../../../../static/img/tipthree.png" alt="">
            </div>
            <div class="insideright">
              <span v-text="$options.filters.viewMoney(summary_data.platform_price,1)" class="apcolor"></span>
              <span>平台服务费</span>
            </div>
          </div>

        </div>

        <div class="list-search">

          <div class="ls-left">
            <div class="form-tabel">
              <el-row class="res-content-line">
              <el-col :span="4"><div class="td-title">直播列表</div></el-col>
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
              <!-- <el-col :span="3"><div class="res-title">状态：</div></el-col> -->
              <el-col :span="7">
                <div class="td-content">
                  <input type="text" v-model="search.name" placeholder="请输入名称/手机号" />
                  <span class="search-icon" @click="searchAll"><i class="el-icon-search"></i></span>
                </div>
              </el-col>
              </el-row>
            </div>
          </div>

        </div>
        <div class="tiplist_two">
          <el-table stripe :data="ListData">
            <el-table-column width="120" prop="order_sn" label="订单号"></el-table-column>
            <el-table-column width="140" prop="create_time" label="时间"></el-table-column>
            <el-table-column prop="username" label="用户名"></el-table-column>
            <el-table-column prop="product_name" label="商品套餐"></el-table-column>
            <el-table-column prop="product_price" label="套餐费用" :formatter="formatMoney"></el-table-column>
            <el-table-column prop="order_total_price" label="实付金额" :formatter="formatMoney"></el-table-column>
            <el-table-column prop="platform_price" label="平台服务费" :formatter="formatMoney"></el-table-column>
            <el-table-column prop="total_price" label="总额" :formatter="formatMoney"></el-table-column>
            <el-table-column prop="pay_name" label="支付方式"></el-table-column>
            <el-table-column prop="pay_status" label="订单状态"></el-table-column>
          </el-table>
        </div>

      </div>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination v-if="total_page"  @size-change="" @current-change="handleCurrentChange" :page-size="per_page" background small layout="prev, pager, next" :total="total"> </el-pagination>
    </div>

  </div>
</template>

<script>
import "../../../../static/css/newStyle.css"
// import tiptotalscreen from './tiptotalscreen'

export default {
  name: 'outsideorderlist',
  components:{
    // tiptotalscreen
  },
  data () {
    return {
      ishowSearch: false,
      ListData:[],
      summary_data:'',
      page: "1", //页码，默认为1
      length: "10", //每页记录数，默认为10
      page:0,
      per_page:0,
      total:0,
      total_page:0,
      search:{
        name: "",
        start_time: "", //开始时间
        end_time: "" //结束时间
      }

    }
  },
  computed:{
    UID(){
      return this.$store.state.uid
    }
  },
  mounted:function(){
    this.gettipData()
  },
  filters: {
    viewMoney: function (value,way) {
      if (!value) return '¥0'
      let date = value.toString()
      if(way>0){
        return "¥"+date.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }else{
        return date.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
    }
  },
  methods:{
    formatMoney(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return date.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    // 获取小费记录数据
    gettipData(){
      this.ListData = []
      this.summary_data = {'total_price':0,'package_price':0,'user_pay_price':0,'platform_price':0}
      let vm=this,url='/api/web/report/summary/live-sales',params={
        page: vm.page,
        length: vm.length,
        search:{
          name: vm.search.name,
          start_time: vm.search.start_time,
          end_time: vm.search.end_time
        }
      }
      vm.$axios({
        method:'post',
        url:url,
        data:params
      }).then((res)=>{
        if(res.data.error_code=='0'){
          if(res.data.data.report_table.list){
            vm.ListData=res.data.data.report_table.list
          }
          if(res.data.data.summary_data){
            vm.summary_data=res.data.data.summary_data
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
      this.gettipData();
    },
    // 搜索
    searchAll(){
      this.gettipData()
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
.form-tabel input {border-radius:1px;background: #2e1c34; padding: 3px; border: 1px solid #48344e; height: 18px; line-height: 18px; text-indent: 5px; color:#f8e2ff; max-width: 150px;margin-left: 20px;}
.search-icon{ cursor: pointer; border-radius:1px;border: 1px solid #48344e; padding: 3px; height: 18px; display: inline-block; width: 18px; text-align: center;}
.td-content{ display: flex; display: -webkit-flex;align-items: center;-webkit-align-items: center}

.databox{
  width: 100%;
  height: auto;
  background: #38213e;
  margin-top: 20px;
}
.databox .title{
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  padding-left: 10px;
  position: relative;
}

.tipimgshow{
  width: 100%;
  height: 100px;
  position: relative;
}
.imgcontent{
  width: 25%;
  height: 100px;
  float: left;
}

.insideleft{
  width: 50%;
  float: left;
  text-align: center;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.insideleft img{
  width: 60px;
  float: right;
  padding-right: 10px;
}
.insideright{
  width: 50%;
  float: right;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.insideright span{
  display: block;
}
.protect img{
  width: 60px;
  float: left;
  padding-left: 20px;
}

.tiplist_two{
  height: auto;
  padding: 0 10px 20px 10px;
}
.tiplist_two .tiptitle{
  width: 100%;

}
.tiptitle .tipspan{
  color: #f8e2ff;
}
.tiptitle input{
  border-radius: 1px;
  background: none;
  padding: 3px;
  background: #2e1c34;
  border: 1px solid #48344e;
  height: 18px;
  line-height: 18px;
  text-indent: 5px;
  color: #f8e2ff;
  width: 150px;
  margin-left: 10px;
  -webkit-appearance: none;
}
.search-icon{
  cursor: pointer;
  border-radius: 1px;
  border: 1px solid #48344e;
  padding: 3px;
  height: 18px;
  display: inline-block;
  width: 18px;
  text-align: center;
  position: relative;
  top: 1px;
}
.search-icon{
  line-height: 18px;
  margin-bottom: 2px;
}
.apcolor{
  color: #ffffff;
}






</style>
