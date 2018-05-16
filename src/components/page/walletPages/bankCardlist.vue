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
        <el-table-column prop="weight" label="审核时间"></el-table-column>
      </el-table>
      <div class="list-bottom"></div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'bankCardlist',
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