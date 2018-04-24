<template>
  <div class="ws-content">


    <!-- title -->
    <div class="navbar">
      <h1 class="nav-bar-title">信息<small> | 基础信息</small></h1>
    </div>
    <div class="databox">
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="7" class="el_colleft">
          <div class="grid-content bg-purple GridOne">
            <span class="listTitle">用户数量</span>
            <div class="listLift">
              <span>123</span>
            </div>
            <div class="listRight">
              <img src="/static/img/userNum.png" class="userNum" alt="">
            </div>
            <span class="listString"></span>
          </div>
        </el-col>
        <el-col :span="7" class="el_colcenter">
          <div class="grid-content bg-purple GridTwo">
            <span class="listTitle">当前会员</span>
            <div class="listLift">
              <span>123</span>
            </div>
            <div class="listRight">
              <img src="/static/img/currentVip.png" class="currentVip" alt="">
            </div>
            <span class="listString"></span>
          </div>
        </el-col>
        <el-col :span="7" class="el_colright">
          <div class="grid-content bg-purple GridThree">
            <span class="listTitle">当前订单数量</span>
            <div class="listLift">
              <span>123</span>
            </div>
            <div class="listRight">
              <img src="/static/img/currentOrderNum.png" class="currentOrderNum" alt="">
            </div>
            <span class="listString"></span>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- body -->
    <div class="navbar">
      <h1 class="nav-bar-title">外卖订单<small> | 订单信息</small></h1>
    </div>
    <div class="orderbox">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple fourGrid">
            <img src="/static/img/take_out1.png" class="orderStatusImg" alt="">
            <span class="orderStatusText">待接单</span>
            <span class="prompt">1222</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple fourGrid">
            <img src="/static/img/take_out2.png" class="orderStatusImg" alt="">
            <span class="orderStatusText">待配送</span>
            <span class="prompt">322</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple fourGrid">
            <img src="/static/img/take_out3.png" class="orderStatusImg" alt="">
            <span class="orderStatusText">配送中</span>
            <span class="prompt">12</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple fourGrid">
            <img src="/static/img/take_out4.png" class="orderStatusImg" alt="">
            <span class="orderStatusText">待退款</span>
            <span class="prompt">22</span>
          </div>
        </el-col>
      </el-row>  
    </div>  

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
  .GridOne{
    background: linear-gradient(to right, #326fc8, #4ca5cb);
    height: 80px;
    padding: 10px;
    position: relative;
  }
  .GridTwo{
    background: linear-gradient(to right, #670a1c, #992e3e);
    height: 80px;
    padding: 10px;
    position: relative;
  }
  .GridThree{
    background: linear-gradient(to right, #2c2a70, #3960a9);
    height: 80px;
    padding: 10px;
    position: relative;
  }
  .listTitle{
    display: block;
    text-align: center;
    width: 100%;
    height: 20px;
    color: #ffffff;
  }
  .el_colleft{
    position: relative;
    left: -5px;
    width: 32%;
  }
  .el_colcenter{
    width: 32%;
  }
  .el_colright{
    position: relative;
    right: -5px;
    width: 32%;
  }
  
  .listLift{
    width: 70%;
    height: 40px;
    line-height: 40px;
    float: left;
    text-align: left;
    color: #ffffff;
    font-size: 18px;
  }
  .listRight{
    width: 30%;
    height: 40px;
    line-height: 40px;
    float: right;
    text-align: right;
  }
  .listString{
    display: block;
    width: 93%;
    height: 3px;
    background: #ffffff;
    opacity: 0.5;
    position: absolute;
    bottom: 10%;
    border-radius: 1rem;
  }
  .userNum{
    width: 40px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  .currentVip{
    width: 35px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
  .currentOrderNum{
    width: 30px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }

  .fourGrid{
    height: 80px;
    padding: 10px;
    position: relative;
    text-align: center;
  }
  .orderStatusImg{
    width: 80px;
    height: 80px;
  }
  .orderStatusText{
    display: block;
    margin-top: 5px;
    color: #ffffff;
  }
  .prompt{
    position: absolute;
    top: 2px;
    right: 70px;
    width: auto;
    min-width: 14px;
    height: 20px;
    padding: 2px 5px;
    background: rgb(216,9,38);
    color: #ffffff;
    border-radius: 50%;
    text-align: left;
  }
</style>
