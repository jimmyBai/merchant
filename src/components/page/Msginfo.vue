<template>
  <div class="ws-content">
    <div class="navbar">
      <h1 class="nav-bar-title">建议/投诉<small> | 建议/投诉列表</small></h1>
    </div>
    <div class="listtable">
      <div class="list-search">
        <div class="ls-left">
          <div class="form-tabel">
            <div class="td-title">信息列表</div>
            <div class="td-content">
              <input type="text" placeholder="请输入用户名手机号" v-model="search.content" />
              <span class="search-icon" @click="searchlist"><i class="el-icon-search"></i></span>
            </div>
          </div>
        </div>
        <div class="ls-right">
          <div class="ls-r-btn" @click="refresh"><i class="el-icon-refresh"></i><span>刷新</span></div>
        </div>
      </div>
      <el-table stripe :data="ListData">
        <!--<el-table-column prop="id" label="ID"></el-table-column>-->
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="手机号码"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="create_time" label="提交时间"></el-table-column>
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
      search:{
        content: "",  //模糊搜索的内容，默认为空，可搜索用户名和手机号码
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
      let vm =this;
      vm.search.create_start?(vm.search.create_start).substr(0,10):''
      vm.search.create_end?(vm.search.create_end).substr(0,10):''
      let url='/api/web/feedback/list',
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
      this.search={ content: "",  };
      this.page= "1";
      this.length= "10";
      this.getlistData()
    },
    handleCurrentChange(val){
      this.page=val
      this.getlistData(this.page)
    },
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
.search-icon{ cursor: pointer; border-radius:1px;border: 1px solid #48344e; padding: 3px; height: 18px; display: inline-block; width: 18px; text-align: center;}
.td-content{ display: flex; display: -webkit-flex;align-items: center;-webkit-align-items: center}
</style>
