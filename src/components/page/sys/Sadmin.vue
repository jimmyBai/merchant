<template>
  <div class="ws-content">
    <div class="listtable">
      <div class="list-search">
        <div class="ls-left">
          <div class="form-tabel">
            <div class="td-title">管理员列表</div>
            <div class="td-content">
              <input type="text" v-model="name" />
              <span class="search-icon" @click="searchfn"><i class="el-icon-search"></i></span>
            </div>
          </div>
        </div>
        <div class="ls-right">

        </div>
      </div>
      <el-table stripe :data="ListData">
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="手机号" prop="phone"></el-table-column>
        <el-table-column label="电子邮箱" prop="email"></el-table-column>
        <el-table-column label="职务角色" prop="role_name"></el-table-column>
        <el-table-column label="添加时间" prop="create_time"></el-table-column>
        <el-table-column label="修改时间" prop="update_time"></el-table-column>
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
    <v-admin v-if="popadmin" :fromParent="roleid" @adminevent = "adminevent"></v-admin>
  </div>
</template>

<script>
  import vAdmin from './Addadmin'
  export default {
    name: 'Member',
    components:{vAdmin},
    data () {
      return {
        popadmin:false,
        total:0,  //总条数
        pages:0,  //总页数
        page:1,   //当前页
        per_page:0, //每页条数
        total_page:0, //总页数
        ListData:[],
        name:''
      }
    },
    created(){

    },
    mounted:function(){
      this.getlistData()
    },
    methods:{
      adminevent(...data){
        let vm = this;
        vm.popadmin=data.popadmin
        if(data[0].status&&data[0].status=='refresh'){
          this.getlistData()
        }
      },
      getlistData(){
        let vm =this,url='/api/web/authority/user/list',params={page:this.page,name:this.name};
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
      handleCurrentChange(val){
        this.page=val
        this.getlistData()
      },
      searchfn(){
        this.getlistData()
      },
      viewMore(scope){
        this.roleid=scope.id.toString()
        this.popadmin=!this.popadmin
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
  .search-icon{ cursor: pointer; border-radius:1px;border: 1px solid #48344e; padding: 3px; height: 18px; display: inline-block; width: 18px; text-align: center; margin-left: 1px}

</style>
