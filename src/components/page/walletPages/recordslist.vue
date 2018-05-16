<template>
  <div class="main">
    <!-- infoList -->
    <div class="listtable">
      <el-table stripe :data="ListData">
        <el-table-column prop="weight" label="账号"></el-table-column>
        <el-table-column prop="weight" label="户名"></el-table-column>
        <el-table-column prop="weight" label="开户行"></el-table-column>
        <el-table-column prop="product_name" label="钱包余额"></el-table-column>
        <el-table-column prop="name" label="交易金额"></el-table-column>
        <el-table-column prop="sale_price" label="交易后余额"></el-table-column>
        <el-table-column prop="inventory" label="提现时间"></el-table-column>
        <el-table-column prop="weight" label="操作"></el-table-column>
      </el-table>
      <div class="list-bottom"></div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'recordslist',
  data () {
    return {
      ListData:[]
    }
  },
  methods:{
    
  }
}
</script>
<style scoped>

</style>