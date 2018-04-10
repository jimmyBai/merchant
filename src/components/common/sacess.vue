<template>
  <div class="ws-content">
    <div class="listtable">
      <div class="list-search">
        <div class="ls-left">
          <div class="form-tabel">
            <div class="td-title">权限管理</div>
            <div class="td-content"></div>
          </div>
        </div>
        <div class="ls-right">

        </div>
      </div>
      <el-table stripe border :row-key="getRowKeys" :expand-row-keys="expands" :data="ListData">
        <el-table-column label="" prop="sysname"></el-table-column>
        <el-table-column label="查看" align="center" header-align="center">
          <template slot-scope="scope">
            <el-checkbox :disabled="scope.row.isdisabled" :checked="scope.row.view"></el-checkbox>
            <!--<div class="yo-checkbox" :class="{'is-checked':scope.row.view}">
              <i class="el-icon-check"></i>
            </div>-->
          </template>
        </el-table-column>
        <el-table-column label="修改" align="center" header-align="center">
          <template slot-scope="scope">
            <el-checkbox :disabled="scope.row.isdisabled" :checked="scope.row.edit"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="删除" align="center" header-align="center">
          <template slot-scope="scope">
            <el-checkbox :disabled="scope.row.isdisabled" :checked="scope.row.del"></el-checkbox>
          </template>
        </el-table-column>
        </el-table-column>
        <el-table-column label="添加" align="center" header-align="center">
          <template slot-scope="scope">
            <el-checkbox :disabled="scope.row.isdisabled" :checked="scope.row.add"></el-checkbox>
          </template>
        </el-table-column>
        </el-table-column>
      </el-table>
      <div class="list-bottm"></div>
      <div class="save">
        <span>保存</span>
      </div>
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
          sysname: '会员管理',
          view: true,
          edit: false,
          del: false,
          add: true,
          isdisabled:false
        }, {
          sysname: '外卖订单数',
          view: true,
          edit: true,
          del: false,
          add: true,
          isdisabled:false
        },{
          sysname: '订座订单数',
          view: false,
          edit: false,
          del: false,
          add: true,
          isdisabled:true
        },{
          sysname: '直播订单管理',
          view: true,
          edit: false,
          del: false,
          add: true,
        },{
          sysname: '外卖-分类管理',
          view: true,
          edit: false,
          del: false,
          add: true,
          isdisabled:true
        },{
          sysname: '外卖-产品管理',
          view: true,
          edit: false,
          del: false,
          add: true,
          isdisabled:true
        }, {
          sysname: '店铺管理',
          view: true,
          edit: true,
          del: false,
          add: true,
          isdisabled:true
        },{
          sysname: '权限管理',
          view: false,
          edit: false,
          del: false,
          add: true,
          isdisabled:false
        },]
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
        console.log(scope)
      }
    }
  }
</script>
<style scoped>
.list-search{ line-height: 26px; padding:0 10px; display: flex;display: -webkit-flex; justify-content: space-between;-webkit-justify-content: space-between}
.form-tabel .td-title{ margin-right: 5px; color: #f8e2ff}
.el-table--border{ margin-top: 10px}
.save{ padding-bottom: 10px}
.save span{ display: inline-block; width: 200px; background:#ac5397; color: #fff; line-height: 30px; height: 30px; text-align: center }




</style>
