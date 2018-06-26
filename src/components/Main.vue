<template>
  <div class="homepage" @click.stop="closeWindow">
    <div class="topbar">
      <div class="leftlogo">
        <img src="../../static/img/mainlogo.png" />
      </div>
      <div class="rightinfo">
        <ul>
          <li class="bellli">
              <div class="bellicon" @click.stop="showunread">
                <el-badge :value="noticeNum" :max="99" class="item">
                  <i class="el-icon-bell icon-animated-bell"></i> 
                </el-badge>
              </div>
              <div class="notifyList hide" :class="{'isshow':notifystatus}">
                <div class="popperarrow"><i></i></div>
                <ul>
                  <li v-for="(item,index) in notifydata" :key='index' @click.stop="viewDeatail(item)">
                    <div class="statusline">
                      <span class="title" v-text="item.title"></span>
                      <span class="time" v-text="item.create_time"></span>
                    </div>
                    <div class="infoline">
                      <span class="infoname"  v-text="item.content"></span>
                    </div>
                  </li>
                </ul>
                <div class="notify-more">
                  <span @click.stop="viewMoreOrder"> 查看更多</span>
                </div>
              </div>
          </li>
          <li class="myinfoli">
            <div class="userbar" @click.stop="showpop">
              <div class="userbarline">
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
          <li v-for='(item,index) in menuArray' :key="index" :class="{active:index==num}" @click="gopage(item.userid,index)">
            <div class="pmenu">
              <i :class="'icon-menu'+item.icon"></i>
              <span v-text="item.name"></span>
              <img src="../../static/img/leftarrow.png" v-if="!isdradeShow&&item.userid==4" class="ltimg" >
              <img src="../../static/img/downarrow.png" v-if="isdradeShow&&item.userid==4" class="dnimg">
              <div class="newmenu" v-if="isdradeShow&&item.userid==4">
                <span :class="{'isselect':navIndex==1}" @click="traderoom('1')">交易明细</span>
                <span :class="{'isselect':navIndex==2}" @click="traderoom('2')">交易汇总</span>
                <span :class="{'isselect':navIndex==3}" @click="traderoom('3')">直播总汇报表</span>
              </div>

            </div>
          </li>
        </ul>
      </div>
      <div class="spacebar">
        <router-view></router-view>
      </div>
    </div>
    <!--audio-->
    <audio ref="paidAudio" src="http://dx.sc.chinaz.com/Files/DownLoad/sound1/201403/4182.mp3" style="display:none">
      您的浏览器不支持 audio 标签。
    </audio>
    <audio ref="cancelAudio" src="http://dx.sc.chinaz.com/Files/DownLoad/sound1/201602/6915.mp3" style="display:none">
      您的浏览器不支持 audio 标签。
    </audio>
     <!--详情-->
    <pop-view  v-if="popdiv" :orderinfo="orderinfo" @sievent = "frompop"></pop-view>
  </div>
</template>
<script>

import popView from '../components/page/order/Poptakeout'
export default {
  name: 'home',
  components:{popView},
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
      navIndex: '',
      notifystatus:false,
      notifydata:[],
      popdiv:false,
      orderinfo:{},
      noticeNum:'',
      paidaudioObj:'',
      cancelaudioObj:''
    }
  },
  created(){
    
  },
  destroyed(){
    this.$socket.close();  
    clearInterval(this.paidaudioObj)
    clearInterval(this.cancelaudioObj)
  },
  watch: {
    $route(){
      this.num=this.$store.state.menuIndex
    },
    'paiVoice.switch'(cVal){
      if(cVal<1){
        clearInterval(this.paidaudioObj)
      }else{
        this.palypaidNotify()
      }
    },
    'cancelVicoe.switch'(cVal){
      if(cVal<1){
       clearInterval(this.cancelaudioObj)
      }else{
        this.palycancelNotify()
      }
    }
  },
  computed:{
    uid(){
      return this.$store.state.uid
    },
    username(){
      return this.$store.state.userInfo.name
    },
    isAdmin(){
      return this.$store.state.userInfo.is_admin
    },
    paiVoice(){
      return this.$store.state.voiceDate.paid_order_voice
    },
    cancelVicoe(){
      return this.$store.state.voiceDate.cancel_order_voice
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
    //初始化获取未读消息  
    this.getNotify()
  },
  methods:{
    //SOCKET连接
    contentIO(){
      let vm =this;
      let id=this.$store.state.uid,flagpaid=false,falgcancel=false;
      vm.$socket.on('018-merchant:person.'+id,function(data) {
          clearInterval(vm.paidaudioObj)        
          clearInterval(vm.cancelaudioObj)
          let socketdata=JSON.parse(data)
          vm.noticeNum=socketdata.list.length
          vm.notifydata=socketdata.list
          //播放音乐
          vm.notifydata.forEach(item=>{
            if(item.params.voice_type=='paid_order'){
              //新订单音乐
              flagpaid=true
            }
            if(item.params.voice_type=='cancel_order'){
              //取消订单音乐
              falgcancel=true
            }
          })
          if(flagpaid){
            vm.palypaidNotify()
          }
          if(falgcancel){
            vm.palycancelNotify()
          }
      })
    },
    //显示未读
    showunread(){
      if(this.notifydata.length>0){
        this.notifystatus=!this.notifystatus
      }
    },
    //播放提示音
    palypaidNotify(){
      let vm=this;
      if(vm.paiVoice.switch>0&&vm.noticeNum>0){
        vm.$refs.paidAudio.play();
        vm.paidaudioObj=setInterval(x=>{ 
        if(vm.paiVoice.switch>0){  
          vm.$refs.paidAudio.play();
        }else{
          clearInterval(vm.paidaudioObj)
        }           
      //},10000)
        },vm.paiVoice.interval*60*1000)
      }      
    }, 
    palycancelNotify(){
      let vm=this;
      if(vm.cancelVicoe.switch>0&&vm.noticeNum>0){ 
        vm.$refs.cancelAudio.play();
        vm.cancelaudioObj=setInterval(x=>{ 
          if(vm.cancelVicoe.switch>0){  
            vm.$refs.cancelAudio.play();
          }else{
            clearInterval(vm.cancelaudioObj)
          }           
      // },10000)
        },vm.cancelVicoe.interval*60*1000)
      }
    },   
    //订单详情
    viewDeatail(item){
      this.notifystatus=!this.notifystatus
      this.orderinfo={
        orderid:item.params.order_sn.toString(),
        title:item.title,
      }
      this.isreadNotify(item.id)
      this.popdiv=!this.popdiv
    },
    frompop(...data){
      let vm = this;
      vm.popdiv=data[0].popstatus
      if(data[0].status&&data[0].status=='refresh'){
        vm.getNotify()
      }
    },
    //查看更多
    viewMoreOrder(){
      this.notifystatus=!this.notifystatus
      this.$router.push('/order') 
    },
    //消息已读
    isreadNotify(id){
      let vm = this,
      url='/api/web/notification/read',
      params={'id':id}
      vm.$axios({
        method:'post',
        data:params,
        url:url
      }).then((res)=>{
        if(res.data.error_code=='0'){
        }else{
          vm.$message.error(res.data.message);
        }
      }).catch(err => {
        console.log(err);
      });  
    },
    //初始化获取未读消息
    getNotify(){
      let vm = this,flagpaid=false,falgcancel=false,
      url='/api/web/notification/unread-list',
      params={'page':'1','length':10}
      vm.$axios({
        method:'post',
        data:params,
        url:url
      }).then((res)=>{
        if(res.data.error_code=='0'){
          vm.notifydata=res.data.data.list
          vm.noticeNum=res.data.data.list.length
          //缓存播放声音权限          
          localStorage.setItem('voiceDate',JSON.stringify(res.data.data.settings))
          this.$store.dispatch('addVoice',res.data.data.settings||{});

          vm.notifydata.forEach(item=>{
            if(item.params.voice_type=='paid_order'){
              //新订单音乐
              flagpaid=true
            }
            if(item.params.voice_type=='cancel_order'){
              //取消订单音乐
              falgcancel=true
            }
          })
          if(flagpaid){
            vm.palypaidNotify()
          }
          if(falgcancel){
            vm.palycancelNotify()
          }


          vm.contentIO()
        }else{
          vm.$message.error(res.data.message);
        }
      }).catch(err => {
        console.log(err);
      });
    },
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
        vm.$router.push('/goodslist')
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
      vm.navIndex=way
      if(way == 1){
        vm.isA = true;
        vm.$router.push('/tradedetail');
      }else if(way == 2){
        vm.isA = true;
        vm.$router.push('/tradesum');
      }else{
        vm.isA = false;
        vm.$router.push('/livereport');
      }

    }
  }
}
</script>

<style scoped>
.topbar{ display: flex;display: -webkit-flex; justify-content:space-between; -webkit-justify-content:space-between}
.topbar .leftlogo img{ height: 60px}
.rightinfo>ul{display: flex;display: -webkit-flex; height: 100%; color:#f8e2ff;}
.rightinfo>ul li{ width: 60px; padding:10px 5px;text-align: center; position: relative; cursor: pointer;right: 0;top:0}
.rightinfo>ul li.myinfoli{width: 80px;}
.rightinfo>ul li p{max-width:60px;overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size: 12px; transform: scale(0.9); letter-spacing: 1px}
.topimg{ background: url("../../static/img/topinfo.png") no-repeat; margin: 0 auto}
.userimg{ background-position: 0px 0px;width: 25px; height: 25px; background-size: cover}
.photoimg{ background-position: -25px 0;width: 25px; height: 25px;background-size: cover}
.phoneli{ background:#2e1c34}
.menuul li span{ display: block}
.menuul li .icon-menu00{background-position: 0px -176px;width: 25px; height: 25px; background-size: cover;}
.menuul li .icon-menu01{background-position: 0px 0px;width: 25px; height: 25px; background-size: cover;}
.menuul li .icon-menu02{background-position: 0px -25px;width: 25px; height: 25px; background-size: cover;}
.menuul li .icon-menu03{background-position: 0px -50px;width: 25px; height: 25px; background-size: cover;}
.menuul li .icon-menu04{background-position: 0px -75px;width: 25px; height: 25px; background-size: cover;}
.menuul li .icon-menu05{background-position: 0px -100px;width: 25px; height: 25px; background-size: cover;}
.menuul li .icon-menu06{background-position: 0px -125px;width: 25px; height: 25px; background-size: cover;}
.menuul li .icon-menu07{background-position: 0px -150px;width: 25px; height: 25px; background-size: cover;}
.menuul li .icon-menu08{background-position: 0px -201px;width: 25px; height: 25px; background-size: cover;}
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
.leftmenubar ul li.active .newmenu span{ margin-top: 10px; color: #aa96b1}
.pmenu .ltimg{ width: 6px;  position: absolute; top: 26px; right: 10px;}
.pmenu .dnimg{ width: 12px; position: absolute; top: 32px; right: 8px;}
.leftmenubar ul li.active .newmenu .isselect{ color: #f6e2fd;}
.bellli>div.bellicon{ height: 100%; display: flex; display: -webkit-flex; align-items: center; justify-content: center; -webkit-align-items: center; -webkit-justify-content: center}
.bellli i{ font-size: 24px;}
.icon-animated-bell { display: inline-block;  -moz-animation: ringing 2.0s 5 ease 1.0s;  -webkit-animation: ringing 2.0s 5 ease 1.0s;  -o-animation: ringing 2.0s 5 ease 1.0s;   -ms-animation: ringing 2.0s 5 ease 1.0s;  animation: ringing 2.0s 5 ease 1.0s;   -moz-transform-origin: 50% 0; -webkit-transform-origin: 50% 0;   -o-transform-origin: 50% 0;  -ms-transform-origin: 50% 0;   transform-origin: 50% 0;}
ul li.bellli{ position: relative}
.notifyList{ position: absolute; top:60px;width: 240px;z-index: 99; left: -50px;}
.notifyList ul{color: #8d8790; margin: 0; padding:0 10px; background: #f8e2ff;border-radius:3px 3px 0 0; max-height: 240px; overflow-y: auto; overflow-x: hidden }
.notifyList ul li{ border-bottom: 1px solid #bdbdbd;width: 100%; margin: 0;padding: 0;padding: 10px 0}
.notifyList ul li:last-child{ border-bottom:none;}
.statusline { margin:0 5px 5px 5px; display: flex;display: -webkit-flex; display: flex;align-items: center;-webkit-align-items: center; justify-content:space-between;-webkit-justify-content:space-between}
.statusline .title{ color:#1b0627; font-size: 14px;}
.statusline .time{ font-size: 12px; transform: scale(0.8);-webkit-transform: scale(0.8);}
.infoline{margin:0 5px;display: flex;display: -webkit-flex; display: flex;align-items: center;-webkit-align-items: center;}
.notifyList .popperarrow{ border-color:transparent transparent #f8e2ff transparent; margin-left: -40px }
.notifyList .popperarrow>i{ border-color:transparent transparent #f8e2ff transparent; }
.notify-more{height: 30px; line-height: 30px; background:#e0c4e8; border-radius: 0 0 3px 3px}
.notify-more>span{display: block; color:#1b0627 }
.hide{ display: none}
.isshow{ display: block}
.userbarline{ width: 100%;}
@keyframes ringing {  
  0% {transform: rotate(-15deg);}
  2% {transform: rotate(15deg);}
  4% {transform: rotate(-18deg);}
  6% {transform: rotate(18deg);}
  8% {transform: rotate(-22deg);}
  10% {transform: rotate(22deg);}
  12% {transform: rotate(-18deg);}
  14% {transform: rotate(18deg);}
  16% {transform: rotate(-12deg);}
  18% {transform: rotate(12deg);}
  20% { transform: rotate(0deg);}
}

</style>
