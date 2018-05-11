<template>
  <div class="main">
    <!-- infoList -->
    <div class="listtable">
      
      <el-table stripe :data="ListData">
        <el-table-column prop="product_name" label="银行名称"></el-table-column>
        <el-table-column prop="name" label="账户号码"></el-table-column>
        <el-table-column prop="sale_price" label="支行"></el-table-column>
        <el-table-column prop="inventory" label="单笔限额"></el-table-column>
        <el-table-column prop="weight" label="每日限额"></el-table-column>
        <el-table-column prop="weight" label="递交时间"></el-table-column>
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
  name: 'auditStatusTwo',
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

</style>