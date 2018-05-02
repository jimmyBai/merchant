<template>
  <div class="ws-content">
    <div class="navbar">
      <h1 class="nav-bar-title">个人会员<small> | 会员详细信息</small></h1>
    </div>
    <div class="contentbox">
      <el-row>
        <el-col :span="13">
          <div class="b-imginfo">
            <el-row>
              <el-col :span="10">
                <div class="userimg">
                  <img src="../../../static/img/userimg.png" />
                </div>
              </el-col>
              <el-col :span="14">
                <div class="userinfo">
                  <ul>
                    <li>
                      <i class="i-time"></i>
                      <span>创建时间：</span>
                      <span v-text="userObj.create_time"></span>
                    </li>
                    <li>
                      <i class="i-realname"></i>
                      <span>真实姓名：</span>
                      <span v-text="userObj.real_name"></span>
                    </li>
                    <li>
                      <i class="i-nikename"></i>
                      <span>用户名：</span>
                      <span v-text="userObj.username"></span>
                    </li>
                    <li>
                      <i class="i-phone"></i>
                      <span>联系电话：</span>
                      <span v-text="userObj.phone"></span>
                    </li>
                    <li>
                      <i class="i-email"></i>
                      <span>邮箱：</span>
                      <span v-text="userObj.email"></span>
                    </li>
                   <!-- <li>
                      <i class="i-member"></i>
                      <span>黄金会员</span>
                    </li>-->
                  </ul>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="11">
          <div class="b-datainfo">
            <el-row>
              <el-col :span="8">
                <el-progress type="circle" class="memberbar" :show-text="false" :stroke-width="10" :width="100" :percentage="preOrder"></el-progress>
                <div class="num" v-text="totalObj.takeout"></div>
                <div class="numname">本月外卖订单数</div>
              </el-col>
              <el-col :span="8">
                <el-progress type="circle" class="memberbar" :show-text="false" :stroke-width="10" :width="100" :percentage="preSeat"></el-progress>
                <div class="num" v-text="totalObj.seat"></div>
                <div class="numname">本月订座订单数</div>
              </el-col>
              <el-col :span="8">
                <el-progress type="circle" class="memberbar" :show-text="false" :stroke-width="10" :width="100" :percentage="preLive"></el-progress>
                <div class="num" v-text="totalObj.vip"></div>
                <div class="numname">本月直播订单数</div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <div class="tabslist">
        <div class="tabslist-head">
          <div :class="{'is-active':activenum=='orderlist'}" @click="changetabs('orderlist')" class="tabtar-item ">外卖订单</div>
          <div :class="{'is-active':activenum=='reservatiolist'}" @click="changetabs('reservatiolist')" class="tabtar-item">订座订单</div>
          <div :class="{'is-active':activenum=='livelist'}" @click="changetabs('livelist')" class="tabtar-item">直播订单</div>
          <!--<div :class="{'is-active':activenum=='paylist'}" @click="changetabs('paylist')" class="tabtar-item">出入金记录订单</div>-->
        </div>
        <div class="tabslist-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Member',
  data () {
    return {
      preOrder:0,
      preSeat:0,
      preLive:0,
      userObj:'',
      totalObj:'',
      activenum:'orderlist',
    }
  },
  created(){

  },
  mounted:function(){
    this.getMemberInfo()
    this.getMemberTotal()
  },
  methods:{
    getMemberInfo(){
      let vm =this,url='/api/web/user/detail',params={'user_id':sessionStorage.getItem('user_id')};
      vm.$axios({
        method:'post',
        url:url,
        data: params
      }).then((res)=>{
        if(res.data.error_code=='0'){
          vm.userObj=res.data.data
        }else{
          vm.$message.error(res.data.message);
        }

      }).catch(err => {
        console.log(err);
      });
    },
    getMemberTotal(){
      let vm =this,url='/api/web/user/orders-statistics',params={'user_id':sessionStorage.getItem('user_id')};
      vm.$axios({
        method:'post',
        url:url,
        data: params
      }).then((res)=>{
        if(res.data.error_code=='0'){
          vm.totalObj=res.data.data
          if(vm.totalObj.total==0){
            vm.preOrder=0;
            vm.preSeat=0;
            vm.preLive=0;
          }else{
            vm.preOrder=vm.totalObj.takeout/vm.totalObj.total*100;
            vm.preSeat=vm.totalObj.seat/vm.totalObj.total*100;
            vm.preLive=vm.totalObj.vip/vm.totalObj.total*100;
          }
        }else{
          vm.$message.error(res.data.message);
        }

      }).catch(err => {
        console.log(err);
      });
    },
    changetabs(way){
      this.activenum=way
      this.$router.push('/'+way)
    }
  }
}
</script>
<style scoped>
.b-imginfo,.b-datainfo{ border-radius: 3px; border:1px solid #48344d;  margin-left: 0; padding: 15px;  }
.b-imginfo{ padding-right: 30px}
.b-datainfo{ margin-left: 20px; padding: 0 ;height: 197px}
.userimg{ background:#37213e; border: 1px solid #48344e; text-align: center;}
.userimg img{ height: 165px; background-size: cover; vertical-align: middle}
.b-datainfo .el-row{ width: 100%; display: flex; display: -webkit-flex; height: 100%}
.b-datainfo .el-col{ padding: 15px 0; flex: 1; -webkit-flex: 1; height: 100%; border-right: 1px solid #48344d;display: flex; display: -webkit-flex; align-items: center; -webkit-align-items: center; flex-direction: column; -webkit-flex-direction: column; -webkit-justify-content: center;justify-content: center}
.b-datainfo .el-col>div{ margin: 0 auto}
.b-datainfo .el-col>div.numname{ display: block; margin-top: 10px; font-size: 14px}
.b-datainfo .el-col>div.num{position: absolute;top: 50%; margin-top: -23px; font-size: 16px;}

</style>
