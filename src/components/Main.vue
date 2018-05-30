<template>
  <div class="homepage" @click.stop="closeWindow">
    <div class="topbar">
      <div class="leftlogo">
        <img src="../../static/img/mainlogo.png" />
      </div>
      <div class="rightinfo">
        <ul>
          <li class="myinfoli">
            <div class="userbar" @click.stop="showpop">
              <div>
                <div class="topimg userimg"></div>
                <p v-text="username"></p>
              </div>
              <div>
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
            <div class="popmyinfo unshow" :class="{'isshow':showinfoBox}">
              <div class="popperarrow"><i></i></div>
              <ul class="iconul">
                <li @click.stop="goview('myinfo')"><i class="i-user"></i>我的信息</li>
                <li @click.stop="goview('set')"><i class="i-set"></i>设置</li>
                <li @click.stop="goview('MerchantWallet')"><i class="i-wallet"></i>钱包</li>
                <li @click.stop="goview('lock')"><i class="i-lock"></i>锁屏</li>
                <li @click.stop="goview('login')"><i class="i-loginout"></i>登出</li>
              </ul>
            </div>
          </li>
          <li class="phoneli">
            <div class="phone" @click="servicephone">
              <div class="topimg photoimg"></div>
              <p>联系客服</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="contentbar">
      <div class="leftmenubar">
        <ul class="menuul">
          <li v-for='(item,index) in menuArray' :class="{active:index==num}" @click="gopage(item.userid,index)">
            <div class="pmenu">
              <i :class="'icon-menu'+item.icon"></i>
              <span v-text="item.name"></span>
              <img src="../../static/img/leftarrow.png" v-if="!isdradeShow&&item.userid==4" class="ltimg" >
              <img src="../../static/img/downarrow.png" v-if="isdradeShow&&item.userid==4" class="dnimg">
              <div class="newmenu" v-if="isdradeShow&&item.userid==4">
                <span :class="{'isselect':!isA}" @click="traderoom('1')">交易明细</span>
                <span :class="{'isselect':isA}" @click="traderoom('2')">交易汇总</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="spacebar">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'home',
  data () {
    return {
      showinfoBox:false,
      num:this.$store.state.menuIndex,
      menuArray:[
        {'name':'首页','userid':0,'icon':'00'},
        {'name':'会员','userid':1,'icon':'01'},
        {'name':'订单','userid':2,'icon':'02'},
        {'name':'外送','userid':3,'icon':'03'},
        {'name':'店铺','userid':5,'icon':'05'},
        {'name':'报表','userid':4,'icon':'04'},
        {'name':'权限','userid':6,'icon':'06'},
       /* {'name':'订座','userid':7,'icon':'07'}*/
        {'name':'信息','userid':8,'icon':'08'},
      ],
      isdradeShow:false,
      isA: true,
    }
  },
  mounted:function(){
      //如果非管理员进来不展示权限
      if(this.isAdmin!=1){
         this.menuArray.forEach((item,index)=>{
           if(item.userid==6){
              this.menuArray.splice(index,1)
            }
         })
      }
  },
  watch: {
    $route(){
      this.num=this.$store.state.menuIndex
    },
  },
  computed:{
    username(){
      return this.$store.state.userInfo.name
    },
    isAdmin(){
      return this.$store.state.userInfo.is_admin
    }
  },
  methods:{
    gopage(id,index){
      let vm =this;
      vm.num=index
      sessionStorage.setItem('INDEXNUM',index)
      this.$store.dispatch('changetabs',index);
      vm.isdradeShow = false;
      if(id==0){
        vm.$router.push('/main')
      }else if(id==1){
        vm.$router.push('/member')
      }else if(id==2){
        sessionStorage.removeItem('user_id')
        vm.$router.push('/order')
      }else if(id==3){
        vm.$router.push('/takeaway')
      }else if(id==4){
        // vm.$router.push('/export')
        if(!vm.isdradeShow&&id==4){
          vm.isdradeShow = true;
        }
      }else if(id==5){
        vm.$router.push('/shop')
      }else if(id==6){
        vm.$router.push('/permission')
      }else if(id==7){
        vm.$router.push('/reservation')
      }else if(id==8){
        vm.$router.push('/msginfo')
        //vm.$router.push('/onlive')
      }
    },
    showpop(){
      let vm =this;
      vm.showinfoBox=!vm.showinfoBox
    },
    goview(way){
      let vm =this;
      vm.showinfoBox=!vm.showinfoBox
      //如果是登出登录
      if(way=='login'){
        localStorage.removeItem('token')
        localStorage.removeItem('uid')
        localStorage.removeItem('USERINFO')
        sessionStorage.clear()
        vm.$store.state.token=''
        vm.$store.state.uid=''
        vm.$store.state.menuIndex='0'
      }
      vm.$router.push('/'+way)
    },
    closeWindow(){
      let vm =this;
      if(vm.showinfoBox){
        vm.showinfoBox=!vm.showinfoBox
      }
    },
    //联系客服
    servicephone(){
      let phonepop=`<div class="phonepop">
      <div class="phonepopline">
        <div class="p-title">客服电话</div>
        <div class="p-content">400-888-8888</div>
      </div>
      <div class="phonepopline">
        <div class="p-title">客服邮箱</div>
        <div class="p-content">admin@018.com</div>
      </div>
    </div>`
      this.$alert(phonepop,'联系客服', {
        dangerouslyUseHTMLString: true,
        center: true,
        showConfirmButton:false
      }).then(()=>{

      }).catch(()=>{

      });
    },
    traderoom(way){
      let vm = this;
      if(way == 1){
        vm.$router.push('/tradedetail');
        vm.isA = true;
      }else{
        vm.$router.push('/tradesum');
        vm.isA = false;
      }

    }
  }
}
</script>

<style scoped>
.topbar{ display: flex;display: -webkit-flex; justify-content:space-between; -webkit-justify-content:space-between}
.topbar .leftlogo img{ height: 60px}
.rightinfo{}
.rightinfo>ul{display: flex;display: -webkit-flex; height: 100%; color:#f8e2ff;}
.rightinfo>ul li{ width: 60px; padding:10px 5px;text-align: center; position: relative; cursor: pointer;right: 0;top:0}
.rightinfo>ul li p{ font-size: 12px; transform: scale(0.9); letter-spacing: 1px}
.topimg{ background: url("../../static/img/topinfo.png") no-repeat; margin: 0 auto}
.userimg{ background-position: 0px 0px;width: 25px; height: 25px; background-size: cover}
.photoimg{ background-position: -25px 0;width: 25px; height: 25px;background-size: cover}
.phoneli{ background:#2e1c34}
.menuul{}
.menuul li span{ display: block}
.menuul li .icon-menu00{background-position: 0px -175px;width: 25px; height: 25px; background-size: cover;}
.menuul li .icon-menu01{background-position: 0px 0px;width: 25px; height: 25px; background-size: cover;}
.menuul li .icon-menu02{background-position: 0px -25px;width: 25px; height: 25px; background-size: cover;}
.menuul li .icon-menu03{background-position: 0px -50px;width: 25px; height: 25px; background-size: cover;}
.menuul li .icon-menu04{background-position: 0px -75px;width: 25px; height: 25px; background-size: cover;}
.menuul li .icon-menu05{background-position: 0px -100px;width: 25px; height: 25px; background-size: cover;}
.menuul li .icon-menu06{background-position: 0px -125px;width: 25px; height: 25px; background-size: cover;}
.menuul li .icon-menu07{background-position: 0px -150px;width: 25px; height: 25px; background-size: cover;}
.menuul li .icon-menu08{background-position: 0px -200px;width: 25px; height: 25px; background-size: cover;}
.popmyinfo{background: #38213e; z-index: 99; min-width: 90px; border: 1px solid #48344d; position: absolute; top: 62px;right: 0}
.popmyinfo ul {display: flex; display: -webkit-flex; flex-direction: column; -webkit-flex-direction: column}
.popmyinfo ul li{ width:auto; cursor: pointer; display: block; padding: 0px; border-bottom: 1px solid #48344d; height: 24px; line-height: 24px;font-size: 12px; color: #9f8ba6}
.popmyinfo ul li:last-child{border-bottom: none}
.popmyinfo ul li:hover{background:#2e1c34}
.userbar{display:flex; display:-webkit-flex; align-items:center;-webkit-align-items: center}
.popmyinfo ul li i{ background: url("../../static/img/list_icon.png") no-repeat; display: inline-block;content: '';width: 13px; height: 13px; position: relative; top: 2px; right: 5px;}
.popmyinfo ul li i.i-user{ background-position: 0 0; background-size: cover; }
.popmyinfo ul li i.i-set{ background-position: 0 -13px; background-size: cover; }
.popmyinfo ul li i.i-lock{ background-position: 0 -26px;  background-size: cover; }
.popmyinfo ul li i.i-loginout{ background-position: 0 -39px; background-size: cover;}
.popmyinfo ul li i.i-wallet{ background: url("../../static/img/wallet.png") no-repeat; display: inline-block; background-size: cover;}
.popmyinfo ul.iconul li{ text-align: left; padding: 3px 10px; padding-left: 15px}

.newmenu{ margin-top: 20px;}
.newmenu span{ margin-top: 10px;}
.pmenu .ltimg{ width: 6px;  position: absolute; top: 26px; right: 10px;}
.pmenu .dnimg{ width: 12px; position: absolute; top: 32px; right: 8px;}
.leftmenubar ul li .isselect{ color: #aa96b1;}
</style>
