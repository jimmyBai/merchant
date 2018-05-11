<template>
  <div class="main">
    <!-- infoList -->
    <div class="listtable">
      <div class="listadd">
        <div class="ls-right">
          <div class="ls-r-btn" @click="clickadd">
            <i class="el-icon-circle-plus-outline"></i><span>添加</span>
          </div>
        </div>
      </div>
      
      <el-table stripe :data="ListData">
        <el-table-column prop="product_name" label="银行名称"></el-table-column>
        <el-table-column prop="name" label="账户号码"></el-table-column>
        <el-table-column prop="sale_price" label="支行"></el-table-column>
        <el-table-column prop="inventory" label="单笔限额"></el-table-column>
        <el-table-column prop="weight" label="每日限额"></el-table-column>
        <!-- <el-table-column width="180">
          <template slot-scope="scope">
            <div class="tdBtn-box">
              <div class="tdBtn-view" @click="addbankcard">
                <i class="el-icon-delete"></i>&nbsp;&nbsp;<span>添加</span>
              </div>
            </div>
          </template>
        </el-table-column> -->
      </el-table>
      <div class="list-bottom"></div>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'auditStatusOne',
  components:{

  },
  data () {
    return {
      ListData:[]
    }
  },
  methods:{
    clickadd(){

    },
    addbankcard(){

    }
  }
}
</script>
<style scoped>
  .listadd{
    width: auto;
    height: 36px;
    padding: 0 10px;
  }
  .ls-right .ls-r-btn{ 
    width: 45px; 
    color: #fff; 
    font-size: 12px; 
    background: rgb(242,86,86); 
    padding: 3px 8px; 
    border-radius: 2px; 
    cursor: pointer; 
    float: right;
  }
  .ls-right .ls-r-btn span{ 
    margin-left: 5px
  }
</style>