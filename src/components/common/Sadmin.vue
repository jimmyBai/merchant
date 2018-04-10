<template>
  <div class="ws-content">
    <div class="listtable">
      <div class="list-search">
        <div class="ls-left">
          <div class="form-tabel">
            <div class="td-title">管理员列表</div>
            <div class="td-content"><input type="text" /><span class="search-icon"><i class="el-icon-search"></i></span></div>
          </div>
        </div>
        <div class="ls-right">

        </div>
      </div>
      <el-table stripe :row-key="getRowKeys" :expand-row-keys="expands" :data="ListData">
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="手机号" prop="phone"></el-table-column>
        <el-table-column label="电子邮箱" prop="email"></el-table-column>
        <el-table-column label="职务角色" prop="duty"></el-table-column>
        <el-table-column label="添加时间" prop="addtime"></el-table-column>
        <el-table-column label="修改时间" prop="edittime"></el-table-column>
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
      <el-pagination background small layout="prev, pager, next" :total="110"> </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Member',
    data () {
      return {
        getRowKeys(row) {
          return row.id;
        },
        expands: [],
        ListData:[{
          name: '张三',
          phone: '13534535345',
          email: '123@018.com',
          duty: '总经理',
          addtime: '2018-3-26 16:29:30',
          edittime: '2018-3-26 16:29:44'
        }, {
          name: '张三',
          phone: '13534535345',
          email: '123@018.com',
          duty: '总经理',
          addtime: '2018-3-26 16:29:30',
          edittime: '2018-3-26 16:29:44'
        },{
          name: '张三',
          phone: '13534535345',
          email: '123@018.com',
          duty: '总经理',
          addtime: '2018-3-26 16:29:30',
          edittime: '2018-3-26 16:29:44'
        },{
          name: '张三',
          phone: '13534535345',
          email: '123@018.com',
          duty: '总经理',
          addtime: '2018-3-26 16:29:30',
          edittime: '2018-3-26 16:29:44'
        }]
      }
    },
    created(){

    },
    mounted:function(){

      //this.getlistData()
    },
    methods:{
      getlistData(){
        let vm =this,url='/api/api/member/list',params={};
        vm.$axios({
          method:'post',
          url:url,
          data: params
        }).then((res)=>{
          if(res.data.error_code=='10000'||res.data.error_code=='200'){
            vm.ListData=res.data.data
          }else{
            vm.$message.error(res.data.message);
            console.log(res.data.message)
          }
        }).catch(err => {
          console.log(err);
        });
      },
      viewMore(scope){
        /*if(this.expands.toString().indexOf(scope.id)>=0){
          this.expands=[]
        }else{
          this.expands=[]
          this.expands.push(scope.id);
        }*/
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
