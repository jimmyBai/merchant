<template>
  <div class="main">
    <div class="navbar">
      <h1 class="nav-bar-title">店铺信息<small> | 店铺详细信息</small></h1>
    </div>
    <!-- tab -->
    <div class="datatab">
      <div class="tabslist">
        <div class="lineflex">
          <div class="tabslist-head">
            <div :class="{'is-active':activenum=='shoplist'}" @click="changetabs('shoplist')" class="tabtar-item ">一般设置</div>
            <div :class="{'is-active':activenum=='printlist'}" @click="changetabs('printlist')" class="tabtar-item ">打印设置</div>
           <div :class="{'is-active':activenum=='tiplist'}" @click="changetabs('tiplist')" class="tabtar-item">小费</div>
          </div>
          <div class="nav-rbtn" v-if="activenum=='printlist'">
            <div class="tdbtn-add" @click="addPrint">
              <i class="el-icon-circle-plus-outline"></i>
              <span>添加</span>
            </div>
          </div>
        </div>
        <div class="tabslist-content">
          <router-view></router-view>
        </div>
      </div>
      <v-print v-if="popshow" @sievent="pievent"></v-print>
    </div>
  </div>
</template>

<script>
import vPrint from './shopPages/Addprint';
export default {
  name: 'shop',
  data () {
    return {
      activenum:'shoplist',
      popshow:false
    }
  },
  components:{vPrint},
  created(){

  },
  mounted:function(){
    if(this.$route.path=='/Shop'){
      this.activenum='shoplist'
    }else if(this.$route.path=='/printlist'){
      this.activenum='printlist'
    }else if(this.$route.path=='/tiplist'){
      this.activenum='tiplist'
    }
  },
  methods:{
    changetabs(way){
      this.activenum=way
      this.$router.push('/'+way)
    },
    addPrint(){
      this.popshow=!this.popshow
    },
    //接受子组件传参
    pievent(...data){
      let vm = this;
      vm.popshow=data.popstatus
      if(data[0].status&&data[0].status=='refresh'){
        let NewPage = '_empty' + '?time=' + new Date().getTime()/1000
        this.$router.push(NewPage)
        this.$router.go(-1)
      }
    },
  }
}
</script>
<style scoped>
.tabslist{ margin-top: 0}
.nav-rbtn{ position: relative; color: #fff}
.lineflex{ position: relative}
.nav-rbtn{ position: absolute; right: 20px; top: 2px}
.nav-rbtn>div{ display: inline-block; height: 23px; line-height: 23px;}
</style>
