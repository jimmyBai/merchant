<template>
  <div class="ws-content">
    <div class="navbar">
      <h1 class="nav-bar-title">会员<small> | 会员信息表设置</small></h1>
    </div>
    <div class="listtable">
      <div class="list-search">
        <div class="ls-left">
          <div class="form-tabel">
            <div class="td-title">会员信息表</div>
            <div class="td-content"><input type="text" v-model="search.content" /><span class="search-icon" @click="searchlist"><i class="el-icon-search"></i></span></div>
          </div>
        </div>
        <div class="ls-right">
          <div class="ls-r-btn" @click="refresh"><i class="el-icon-refresh"></i><span>刷新</span></div>
        </div>
      </div>
      <el-table stripe :data="ListData">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="手机号码"></el-table-column>
        <el-table-column prop="balance" label="余额"></el-table-column>
        <el-table-column prop="credit" label="店铺现金"></el-table-column>
        <el-table-column prop="create_time" label="加入时间"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div class="tdbtn-box">
              <div class="tdbtn-view" @click="viewMore(scope.row)"><i class="el-icon-view"></i> <span>查看</span></div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="list-bottm"></div>
    </div>
    <div class="pagination">
      <el-pagination v-if="total_page"  @size-change="" @current-change="handleCurrentChange" :page-size="per_page" background small layout="prev, pager, next" :total="total"> </el-pagination>
    </div>
    <div class="right_seachBar">
      <div class="arrorbox" @click="ishowSearch=!ishowSearch"><span>展开</span></div>
      <div class="rsea-box" v-show="ishowSearch">
        <div class="res-head">筛选条件</div>
        <div class="res-content">
            <el-row class="res-content-line">
              <el-col :span="4"><div class="res-title">余额：</div></el-col>
              <el-col :span="7"><div class="res-input"><input  v-model="search.min_balance" type="tel"></div></el-col>
              <el-col :span="1"><div class="res-line">~</div></el-col>
              <el-col :span="7"><div class="res-input"><input  v-model="search.max_balance" type="tel"></div></el-col>
              <el-col :span="4"><div class="res-btn" @click="searchFn('1')"><span>确定</span></div></el-col>
            </el-row>
            <el-row class="res-content-line">
              <el-col :span="4"><div class="res-title">加入</br>时间段：</div></el-col>
              <el-col :span="7">
                <div class="res-input">
                  <el-date-picker v-model="search.create_start" clear-icon  type="date" placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-col>
              <el-col :span="1"><div class="res-line">~</div></el-col>
              <el-col :span="7">
                <div class="res-input">
                  <el-date-picker clear-icon v-model="search.create_end" type="date" placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-col>
              <el-col :span="4"><div class="res-btn" @click="searchFn('2')"><span>确定</span></div></el-col>
            </el-row>
        </div>
        <div class="res-bottom">
          <span>恢复默认</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Member',
  data () {
    return {
      search:{
        content: "",  //模糊搜索的内容，默认为空，可搜索用户名和手机号码
        min_balance: "",//余额最小值，默认为空，不能小于0
        max_balance: "",//余额最大值，默认为空，不能小于0
        create_start: "",//加入开始时间，默认为空，格式为'xxxx-xx-xx'，具体看详细说明
        create_end: ""  //加入结束时间，默认为空，格式为'xxxx-xx-xx'，具体看详细说明
      },
      page: "1", //页码，默认为1
      length: "10",//每页记录数，默认为10
      ListData:[],
      ishowSearch:false,
      page:0,
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
      //请求前先清空数据
      this.ListData=[]
      let vm =this,url='/api/web/user/list',
        params={
          "search": vm.search,
          "page": vm.page,
          "length":vm.length
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
          vm.total=Number(res.data.data.total);
          vm.pages=Number(res.data.data.pages);
          vm.page=Number(res.data.data.page);
          vm.per_page=Number(res.data.data.per_page);
          vm.total_page=Number(res.data.data.total_page);
        }else{
          vm.$message.error(res.data.message);
          console.log(res.data.message)
        }
      }).catch(err => {
        console.log(err);
      });
    },
    searchlist(){
      let vm =this;
      if(!vm.search.content){
        vm.$message.error('请输入要搜索的手机号或用户名');
      }else{
        this.getlistData()
      }
    },
    refresh(){
      this.search={ content: "", min_balance: "", max_balance: "", create_start: "", create_end: "" };
      this.page= "1";
      this.length= "10";
      this.getlistData()
    },
    searchFn(){
      this.search.content="";
      this.page= "1";
      this.length= "10";
      this.getlistData()
    },
    handleCurrentChange(val){
      this.page=val
      this.getlistData(this.page)
    },
    viewMore(scope){
      sessionStorage.setItem('user_id',scope.id)
      this.$router.push({
        name:"mdetail"
      })
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
.td-content{ display: flex; display: -webkit-flex;align-items: center;-webkit-align-items: center}
</style>
