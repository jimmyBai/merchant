<template>
  <div class="ws-content">
    <div class="listtable">
      <div class="list-search">
        <div class="ls-left">
          <div class="form-tabel">
            <div class="td-title">订单信息表</div>
            <div class="td-content"><input type="text" /><span class="search-icon"><i class="el-icon-search"></i></span></div>
          </div>
        </div>
        <div class="ls-right">

        </div>
      </div>
      <el-table stripe :row-key="getRowKeys" :expand-row-keys="expands" :data="ListData">
        <el-table-column label="下单时间" prop="time"></el-table-column>
        <el-table-column label="订单编号" prop="code"></el-table-column>
        <el-table-column label="预定时间" prop="ptime"></el-table-column>
        <el-table-column label="预定座位号" prop="numb"></el-table-column>
        <el-table-column label="订座费" prop="smoney"></el-table-column>
        <el-table-column label="付款金额" prop="pmoney"></el-table-column>
        <el-table-column label="支付方式" prop="paytype"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div class="tdbtn-box">
              <div v-if="scope.row.status==1" class="tdbtn-view btn-c-error" @click="viewMore(scope.row)"><span>预定</span></div>
              <div v-if="scope.row.status==2" class="tdbtn-view btn-c-success" @click="viewMore(scope.row)"><span>直订</span></div>
              <div v-if="scope.row.status==3" class="tdbtn-view btn-c-waring" @click="viewMore(scope.row)"><span>竞价</span></div>
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
          id: '1',
          time: '2018-3-27',
          code: '2018032131',
          ptime: '2018-3-23',
          numb: 'H3',
          smoney:'100.00',
          pmoney:'1880.00',
          paytype: '微信',
          status:'1'
        }, {
          id: '2',
          time: '2018-1-10',
          code: '2018036433',
          ptime: '2018-1-12',
          numb: 'p3',
          smoney:'500.00',
          pmoney:'880.00',
          paytype: '微信',
          status:'2'
        }, {
          id: '3',
          time: '2018-4-27',
          code: '2018030932',
          ptime: '2018-5-1',
          numb: 'K3',
          smoney:'100.00',
          pmoney:'2880.00',
          paytype: '微信',
          status:'1'
        }, {
          id: '4',
          time: '2018-3-27',
          code: '2018032234',
          ptime: '2018-3-23',
          numb: 'V3',
          smoney:'100.00',
          pmoney:'588.00',
          paytype: '微信',
          status:'3'
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
