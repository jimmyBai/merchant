<template>
  <div class="ws-content">
    <div class="listtable">
      <div class="list-search">
        <div class="ls-left">
          <div class="form-tabel">
            <div class="td-title">打印机列表</div>
            <div class="td-content">
              <input type="text" v-model="content" />
              <span @click="searchFn" class="search-icon"><i class="el-icon-search"></i></span>
            </div>
          </div>
        </div>
        <div class="ls-right">
        </div>
      </div>
      <el-table stripe :data="ListData">
        <el-table-column prop="create_time" label="下单时间"></el-table-column>
        <el-table-column prop="order_sn" label="打印机编号"></el-table-column>
        <el-table-column prop="username" label="KEY"></el-table-column>
        <el-table-column prop="phone" label="打印机备注"></el-table-column>
        <el-table-column prop="name" label="手机号码"></el-table-column>
        <el-table-column width="240">
          <template slot-scope="scope">
            <div class="tdbtn-box">
              <div class="tdbtn-view" @click="viewMore(scope.row)"><i class="el-icon-view"></i> <span>查看/编辑</span></div>
              <div class="tdbtn-del" @click="delrole(scope.row)"><i class="el-icon-delete"></i> <span>删除</span></div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="list-bottm"></div>
    </div>
    <div class="pagination">
      <el-pagination v-if="total_page" @size-change="" @current-change="handleCurrentChange" :page-size="per_page" background small layout="prev, pager, next" :total="total"> </el-pagination>
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
        let vm =this,url='/api/web/printer/list',params={
          search: {
            'content': vm.content
          },
          page: vm.page,
        };
        vm.ListData=[]
        vm.$axios.get(url,{params}).then((res)=>{
            if(res.data.error_code=='0'){
            if(res.data.data.list){
              vm.ListData=res.data.data.list
            }
            vm.total=res.data.data.total;
            vm.pages=res.data.data.pages;
            vm.page=res.data.data.page;
            vm.per_page=res.data.data.per_page;
            vm.total_page=res.data.data.total_page;
          }else{
            vm.$message.error(res.data.message);
            console.log(res.data.message)
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
