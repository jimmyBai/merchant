<template>
  <div class="ws-content">


    <!-- 头部 -->
    <div class="navbar">
      <h1 class="nav-bar-title">信息<small> | 基础信息</small></h1>
    </div>
    <div class="databox">
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>用户数量</span>
            <div class="listLift">
              <span class="listTitle">123</span>
            </div>
            <div class="listRight">
              <img src="../../static/img/userNum.png" alt="">
            </div>
            <span class="listString"></span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <span class="listTitle">当前会员</span>
            <div class="listLift">
              <span>123</span>
            </div>
            <div class="listRight">
              <img src="../../static/img/currenVip.png" alt="">
            </div>
            <span class="listString"></span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span class="listTitle">当前订单数量</span>
            <div class="listLift">
              <span>123</span>
            </div>
            <div class="listRight">
              <img src="../../static/img/currenOrderNum.png" alt="">
            </div>
            <span class="listString"></span>
          </div>
        </el-col>
      </el-row>
    </div>


    <!--  -->
  </div>
</template>
<script>
export default {
  name: 'home',
  data () {
    return {
      }
  },
  methods:{

  }
}
</script>

<style scoped>
  .grid-content{
    border: 1px solid red;
  }
  .listTitle{

  }
</style>
