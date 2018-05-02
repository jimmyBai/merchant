<template>
    <div class="ws-content">
      <div class="navbar">
        <h1 class="nav-bar-title">权限信息<small> | 权限详细信息</small></h1>
      </div>
      <div class="tabslist">
        <div class="lineflex">
          <div class="tabslist-head">
            <div :class="{'is-active':activenum=='srole'}" @click="changetabs('srole')" class="tabtar-item ">角色</div>
            <div :class="{'is-active':activenum=='sadmin'}" @click="changetabs('sadmin')" class="tabtar-item">管理员</div>
          </div>
          <div class="nav-rbtn">
            <div class="tdbtn-add" @click="adduser">
              <i class="el-icon-circle-plus-outline"></i>
              <span>添加</span>
            </div>
          </div>
        </div>
        <div class="tabslist-content">
          <router-view></router-view>
        </div>
      </div>
      <v-role v-if="popshow" @sievent="pievent"></v-role>
      <v-admin v-if="popadmin" @adminevent = "adminevent"></v-admin>
    </div>
</template>
<script>
import vRole from './sys/Addsrole'
import vAdmin from './sys/Addadmin'
export default {
  name: 'sys',
  components:{vRole,vAdmin},
  data () {
    return {
      popshow:false,
      popadmin:false,
      ListData:[],
      activenum:'srole'
    }
  },
  created(){

  },
  mounted(){

  },
  methods:{
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
    adminevent(...data){
      let vm = this;
      vm.popadmin=data.popadmin
      if(data[0].status&&data[0].status=='refresh'){
        let NewPage = '_empty' + '?time=' + new Date().getTime()/1000
        this.$router.push(NewPage)
        this.$router.go(-1)
      }
    },
    changetabs(way){
      this.activenum=way
      this.$router.push('/'+way)
    },
    adduser(){
      //判断当前是角色还是管理员tabs
      if(this.activenum=='srole'){
        this.popshow=!this.popshow
      }else{
        this.popadmin=!this.popadmin
      }
    }
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
