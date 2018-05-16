<template>
  <div class="myinfobox">
    <div class="memberboxhead">
      <div class="memberimg">
        <img src="../../../static/img/membertopimg.png" />
      </div>
      <div class="memberphoto">
        <img src="../../../static/img/membericon.png" />
      </div>
    </div>
    <div class="memberboxcontent">
      <el-row>
        <el-col :span="10" class="left">
          <div class="nameline">
            <span class="name" v-text="ListData.username"></span>
            <!--<span class="line">|</span>
            <span class="duty">总经理</span>-->
          </div>
          <div class="userinfo memberviewinfo">
            <ul>
              <li>
                <i class="i-time"></i>
                <span>创建时间：</span>
                <span v-text="ListData.create_time"></span>
              </li>
              <li>
                <i class="i-realname"></i>
                <span>真实姓名：</span>
                <span v-text="ListData.real_name"></span>
              </li>
              <li>
                <i class="i-nikename"></i>
                <span>用户名：</span>
                <span v-text="ListData.role_name"></span>
              </li>
              <li>
                <i class="i-phone"></i>
                <span>联系电话：</span>
                <span v-text="ListData.phone"></span>
              </li>
              <li>
                <i class="i-email"></i>
                <span>邮箱：</span>
                <span v-text="ListData.email"></span>
              </li>
            </ul>
          </div>

          <!-- 新增二维码 _Andy -->
          <div class="twocode">
            <span class="title">二维码</span>
            <span class="prompt">顾客将通过扫描二维码进行小费支付</span>
            <!-- <span>二维码show</span> -->
            <input type="button" value="点击生成二维码">
          </div>
        </el-col>
        <el-col :span="14" class="bright">
          <!--<div class="moneyline">
            <div class="rhead">
              <i class="mtitle"></i>
              <span>我的余额</span>
            </div>
            <div class="mcontent">
              <div class="flexbox">
                <div>
                  <i class="part1"></i>
                  <span>我的提成</span>
                </div>
                <div>
                  <i class="part2"></i>
                  <span>我的小费</span>
                </div>
                <div>
                  <i class="part3"></i>
                  <span>我的收入</span>
                </div>
              </div>
            </div>
          </div>
          <div class="dutyline">
            <div class="rhead">
              <i class="dtitle"></i>
              <span>我的部门</span>
            </div>
            <div class="mcontent">
              <div class="group">
                <span>总经办-行政部-总经理</span>
              </div>
            </div>
          </div>-->

          <div class="databox">
            <div class="title">
              <span>实时数据</span>
            </div>
            <div class="content">

              <div class="tiplist">
                <div class="tiptitle">
                  <span>我的小费</span>
                  <input type="text"/>
                  <span class="search-icon"><i class="el-icon-search"></i></span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'myinfo',
    data () {
      return {
        ListData:[]
      }
    },
    created(){

    },
    mounted:function(){
      this.getlistData()
    },
    methods:{
      getlistData(){
        let vm =this,url='/api/web/authority/user/info',params={'id':''};
        vm.$axios.get(url,{params}).then((res)=>{
          if(res.data.error_code=='0'){
            vm.ListData=res.data.data
          }else{
            vm.$message.error(res.data.message);
            console.log(res.data.message)
          }
        }).catch(err => {
          vm.$message.error(err);
        });
      }
    }
  }
</script>
<style scoped>
.memberboxhead{ background:#462747;  margin: 0 auto; position: relative; z-index: 2 }
.memberboxhead .memberimg{ padding: 20px 0; height: 155px; margin: 0 auto; text-align: center}
.memberboxhead .memberimg img{height: 100%; background-size: cover}
.memberphoto{ position: absolute; height: 130px; width: 130px; bottom: -25px; left: 50px}
.memberphoto img { width: 100%; background-size: cover}
.nameline{ text-align: center; height: 50px; line-height: 50px}
.nameline .name{ font-size: 24px;}
.nameline .line{ margin: 0 5px}
.memberboxcontent{ margin-top: 10px}
.memberboxcontent .el-row{ padding: 10px 0}
.memberviewinfo{border-bottom: 1px solid #48344d; padding: 20px 0}
.memberviewinfo ul{ width: 240px; margin: 0 auto; }
.memberviewinfo ul li{ border: none; height: 40px; line-height: 40px}
.moneyline { margin-top: 15px; margin-bottom: 20px}
.rhead{ font-size: 14px; padding: 0 20px; display: flex; display: -webkit-flex; align-items: center; -webkit-align-items: center; background:#331f3a; height: 36px; line-height: 36px; }
.bright{ padding: 0 30px}
.mcontent{ background: #462747;}
.rhead i{ margin-right: 5px; background: url("../../../static/img/memberticon.png") no-repeat; width: 20px; height: 20px; display: inline-block; background-size: cover; content:'';}
i.mtitle{ background-position: 0 0px;}
i.dtitle{ background-position: 0px -20px;}
.mcontent>div{ padding: 20px}
.flexbox{ display: flex; display: -webkit-flex; align-items: center}
.flexbox>div{ flex: 1; -webkit-flex: 1; text-align: center; display: flex;display: -webkit-flex; align-items: center;-webkit-align-items: center}
.flexbox>div i{background: url("../../../static/img/memberinfoicon.png") no-repeat; width: 80px; height: 80px; display: inline-block; background-size: cover; content:'';}
.flexbox>div i.part1{background-position: 0 0px;}
.flexbox>div i.part2{background-position: 0 -80px;}
.flexbox>div i.part3{background-position: 0 -160px;}
.group { font-size: 16px; text-align: center}


.twocode{
  margin-top: 10px;
  text-align: center;
}
.twocode .title{
  display: block;
  color: #ffffff;
  font-size: 16px;
}
.twocode .prompt{
  display: block;
  margin-top: 5px;
  font-size: 12px;
}
.twocode input{
  cursor: pointer;
  background: #ac5397;
  height: 40px;
  line-height: 40px;
  color: #fff;
  display: inline-block;
  width: 200px;
  text-align: center;
  border: 0;
  font-size: 12px;
  margin-top: 30px;
}
</style>
