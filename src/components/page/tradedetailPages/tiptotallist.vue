<template>
  <div class="main">
    
    <div class="databox">
      <div class="title">
        <span>实时数据</span>
      </div>
      <div class="content">
        <div class="tipimgshow">

          <div class="imgleft">
            <div class="insideleft">
              <img class="phoneimg" src="../../../../static/img/tipone.png" alt="">
            </div>
            <div class="insideright">
              <span>0.00</span>
              <span>总小费金额</span>
            </div>
          </div>
          <div class="imgcontent">
            <div class="insideleft">
              <img src="../../../../static/img/tipthree.png" alt="">
            </div>
            <div class="insideright">
              <span>0.00</span>
              <span>支付人次</span>
            </div>
          </div>
          <div class="imgright">
            <div class="insideleft protect">
              <img src="../../../../static/img/tiptwo.png" alt="">
            </div>
            <div class="insideright protectnum">
              <span>0.00</span>
              <span>收取店员人数</span>
            </div>
          </div>

        </div>
        <div class="tiplist_two">
          <div class="tiptitle">
            <span class="tipspan">我的小费</span>
            <input type="text" />
            <span class="search-icon"><i class="el-icon-search"></i></span>
          </div>
          <el-table stripe :data="reListData">
            <el-table-column width="80" prop="" label="用户名"></el-table-column>
            <el-table-column width="80" prop="" label="手机号码"></el-table-column>
            <el-table-column width="80" prop="" label="管理员"></el-table-column>
            <el-table-column width="80" prop="" label="角色"></el-table-column>
            <el-table-column width="80" prop="" label="小费金额"></el-table-column>
            <el-table-column width="80" prop="" label="支付方式"></el-table-column>
            <el-table-column prop="" label="支付时间"></el-table-column>
          </el-table>
        </div>
        
      </div>
    </div>


    <!--更多查询-->
    <div class="right_seachBar">
      <div class="arrorbox" @click="ishowSearch=!ishowSearch"><span><i class="icon-toogle"></i></span></div>
      <tiptotalscreen v-if="ishowSearch" :searchinfo="search" @tievent="fromtip"></tiptotalscreen>
    </div>

  </div>
</template>

<script>
import tiptotalscreen from './tiptotalscreen'

export default {
  name: 'shop',
  components:{
    tiptotalscreen
  },
  data () {
    return {
      reListData:[],
      search:{},
      ishowSearch: false,
    }
  },
  methods:{
    //更多查询
    fromtip(...data){
      let vm = this;
      vm.ishowSearch=false
      
    }
  }
}
</script>
<style scoped>

.databox{
  width: 100%;
  height: auto;
  background: #38213e;
  margin-top: 20px;
}
.databox .title{
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  padding-left: 10px;
  position: relative;
}

.tipimgshow{
  width: 100%;
  height: 100px;
  position: relative;
}
.imgleft{
  width: 20%;
  height: 100px;
  float: left;
}

.imgcontent{
  width: 20%;
  height: 100px;
  float: left;
}

.imgright{
  width: 60%;
  height: 100px;
  float: left;
}
.insideleft{
  width: 50%;
  float: left;
  text-align: center;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.insideleft img{
  width: 60px;
  float: right;
  padding-right: 10px;
}
.phoneimg{
  
}
.insideright{
  width: 50%;
  float: right;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.insideright span{
  display: block;
}
.protect{
  width: 17%;
}
.protect img{
  width: 60px;
  float: left;
  padding-left: 20px;
}
.protectnum{
  width: 83%;
}


.tiplist_two{
  height: auto;
  padding: 0 10px;
}
.tiplist_two .tiptitle{
  width: 100%;

}
.tiptitle .tipspan{
  color: #f8e2ff;
}
.tiptitle input{
  border-radius: 1px;
  background: none;
  padding: 3px;
  background: #2e1c34;
  border: 1px solid #48344e;
  height: 18px;
  line-height: 18px;
  text-indent: 5px;
  color: #f8e2ff;
  width: 150px;
  margin-left: 10px;
  -webkit-appearance: none;
}
.search-icon{
  cursor: pointer;
  border-radius: 1px;
  border: 1px solid #48344e;
  padding: 3px;
  height: 18px;
  display: inline-block;
  width: 18px;
  text-align: center;
  position: relative;
  top: 1px;
}
.search-icon{
  line-height: 18px;
  margin-bottom: 5px;
}
</style>