<template>
  <div class="main">
    
    <div class="databox">
      <div class="title">
        <span>实时数据</span>
      </div>
      <div class="content">
        <div class="tipimgshow">

          <div class="imgleft">
            <div class="insideleft">
              <img class="phoneimg" src="../../../../static/img/tipone.png" alt="">
            </div>
            <div class="insideright">
              <span v-text="statistics.amount" class="apcolor"></span>
              <span>总小费金额</span>
            </div>
          </div>
          <div class="imgcontent">
            <div class="insideleft">
              <img src="../../../../static/img/tipthree.png" alt="">
            </div>
            <div class="insideright">
              <span v-text="statistics.paid" class="apcolor"></span>
              <span>支付人次</span>
            </div>
          </div>
          <div class="imgright">
            <div class="insideleft">
              <img src="../../../../static/img/tiptwo.png" alt="">
            </div>
            <div class="insideright">
              <span v-text="statistics.receive" class="apcolor"></span>
              <span>收取店员人数</span>
            </div>
          </div>

        </div>
        <div class="tiplist_two">
          <div class="tiptitle">
            <span class="tipspan">我的小费</span>
            <input type="text" v-model="search.content" />
            <span class="search-icon" @click="searchAll"><i class="el-icon-search"></i></span>
          </div>
          <el-table stripe :data="ListData">
            <el-table-column width="120" prop="username" label="用户名"></el-table-column>
            <el-table-column prop="phone" label="手机号码"></el-table-column>
            <el-table-column width="120" prop="store_username" label="管理员"></el-table-column>
            <el-table-column width="120" prop="store_user_role" label="角色"></el-table-column>
            <el-table-column width="120" prop="amount" label="小费金额"></el-table-column>
            <el-table-column width="120" prop="payment" label="支付方式"></el-table-column>
            <el-table-column prop="pay_time" label="支付时间"></el-table-column>
          </el-table>
        </div>
        
      </div>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination v-if="total_page"  @size-change="" @current-change="handleCurrentChange" :page-size="per_page" background small layout="prev, pager, next" :total="total"> </el-pagination>
    </div>

    <!--更多查询-->
    <div class="right_seachBar">
      <div class="arrorbox" @click="ishowSearch=!ishowSearch"><span><i class="icon-toogle"></i></span></div>
      <tiptotalscreen v-if="ishowSearch" :searchinfo="search" @tievent="fromtip"></tiptotalscreen>
    </div>

  </div>
</template>

<script>
import tiptotalscreen from './tiptotalscreen'

export default {
  name: 'shop',
  components:{
    tiptotalscreen
  },
  data () {
    return {
      ishowSearch: false,
      ListData: [],
      statistics: [],
      page: "1", //页码，默认为1
      length: "10", //每页记录数，默认为10
      page:0,
      per_page:0,
      total:0,
      total_page:0,
      search:{
        uid: "",
        content: "",
        amount_max: "", //最大值
        amount_min: "", //最小值
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
  methods:{
    // 获取小费记录数据
    gettipData(){
      this.ListData = []
      this.statistics = []
      let vm=this,url='/api/web/tip/list',params={
        page: vm.page,
        length: vm.length,
        uid: vm.UID,
        search:{
          content: vm.search.content,
          amount_max: vm.search.amount_max,
          amount_min: vm.search.amount_min,
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
          if(res.data.data.list){
            vm.ListData=res.data.data.list
            vm.statistics=res.data.data.statistics
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
    //更多查询
    fromtip(...data){
      let vm = this;
      vm.ishowSearch=false
      // console.log(data)
      vm.search.amount_min=data[0].amount_min;
      vm.search.amount_max=data[0].amount_max;
      vm.search.start_time=data[0].start_time;
      vm.search.end_time=data[0].end_time;
      vm.gettipData()
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
.imgleft{
  width: 200px;
  min-width: 200px;
  height: 100px;
  float: left;
}

.imgcontent{
  width: 200px;
  min-width: 200px;
  height: 100px;
  float: left;
}

.imgright{
  width: 200px;
  min-width: 200px;
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
  margin-bottom: 5px;
}
.apcolor{
  color: #ffffff;
}



</style>