<template>
  <div class="homepage">
    <div class="topbar">
      <div class="leftlogo">
        <img src="../../static/img/mainlogo.png" />
      </div>
      <div class="rightinfo">
        <ul>
          <li>
            <div class="userbar" @click="showpop">
              <div class="topimg userimg"></div>
              <p>白愿</p>
            </div>
            <div class="popmyinfo unshow" :class="{'isshow':showinfoBox}">
              <div class="popperarrow"><i></i></div>
              <ul>
                <li @click="goview('myinfo')">我的信息</li>
                <li @click="goview('set')">设置</li>
                <li @click="goview('lock')">锁屏</li>
                <li @click="goview('login')">登出</li>
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
          <li v-for='(item,index) in menuArray' :class="{active:index==num}"  @click="gopage(item.userid,index)">
            <div class="pmenu">
              <i :class="'icon-menu'+item.icon"></i>
              <span v-text="item.name"></span>
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
      num:'0',
      menuArray:[{'name':'首页','userid':0,'icon':'00'},{'name':'会员','userid':1,'icon':'01'},{'name':'订单','userid':2,'icon':'02'},{'name':'外卖','userid':3,'icon':'03'},{'name':'店铺','userid':4,'icon':'04'},{'name':'报表','userid':5,'icon':'05'},{'name':'权限','userid':6,'icon':'06'},{'name':'订座','userid':7,'icon':'07'}]
    }
  },
  methods:{
    gopage(id,index){
      let vm =this;
      vm.num=index
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
       vm.$router.push('/shop')
      }else if(id==5){
       vm.$router.push('/export')
      }else if(id==6){
       vm.$router.push('/permission')
      }else if(id==7){
       vm.$router.push('/reservation')
      }else if(id==8){
       vm.$router.push('/onlive')
      }
    },
    showpop(){
      let vm =this;
      vm.showinfoBox=!vm.showinfoBox
    },
    goview(way){
      let vm =this;
      vm.showinfoBox=!vm.showinfoBox
      vm.$router.push('/'+way)
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
    }
  }
}
</script>

<style scoped>
.topbar{ display: flex;display: -webkit-flex; justify-content:space-between; -webkit-justify-content:space-between}
.topbar .leftlogo img{ height: 60px}
.rightinfo{}
.rightinfo>ul{display: flex;display: -webkit-flex; height: 100%; color:#f8e2ff;}
.rightinfo>ul li{ width: 60px; padding:10px 5px;text-align: center; position: relative; cursor: pointer}
.rightinfo>ul li p{ font-size: 12px; transform: scale(0.9); letter-spacing: 1px}
.topimg{ background: url("../../static/img/topinfo.png") no-repeat; margin: 0 auto}
.userimg{ background-position: 0px 0px;width: 25px; height: 25px; background-size: cover}
.photoimg{ background-position: -25px 0;width: 25px; height: 25px;background-size: cover}
.phoneli{ background:#2e1c34}
.menuul{}
.menuul li span{ display: block}
.menuul li i{ background: url("../../static/img/menuicon.png") no-repeat; margin: 0 auto; display: inline-block; content: ''}
.menuul li .icon-menu01{background-position: 0px 0px;width: 25px; height: 25px; background-size: cover;}
.menuul li .icon-menu02{background-position: 0px -25px;width: 25px; height: 25px; background-size: cover;}
.menuul li .icon-menu03{background-position: 0px -50px;width: 25px; height: 25px; background-size: cover;}
.menuul li .icon-menu04{background-position: 0px -75px;width: 25px; height: 25px; background-size: cover;}
.menuul li .icon-menu05{background-position: 0px -100px;width: 25px; height: 25px; background-size: cover;}
.menuul li .icon-menu06{background-position: 0px -125px;width: 25px; height: 25px; background-size: cover;}
.menuul li .icon-menu07{background-position: 0px -150px;width: 25px; height: 25px; background-size: cover;}
.popmyinfo{background: #38213e; z-index: 99; width: 70px; border: 1px solid #48344d; position: relative; top: 10px}
.popmyinfo ul {display: flex; display: -webkit-flex; flex-direction: column; -webkit-flex-direction: column}
.popmyinfo ul li{ width:auto; cursor: pointer; display: block; padding: 0px; border-bottom: 1px solid #48344d; height: 24px; line-height: 24px;font-size: 12px; color: #9f8ba6}
.popmyinfo ul li:last-child{border-bottom: none}
.popmyinfo ul li:hover{background:#2e1c34}



</style>
