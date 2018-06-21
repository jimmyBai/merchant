<template>
  <div class="ws-content">
    <div class="navbar">
      <h1 class="nav-bar-title">设置<small></small></h1>
    </div>
    <div class="tabslist">
      <div class="lineflex">
        <div class="tabslist-head">
          <div :class="{'is-active':activenum=='voiceItem'}" @click="changetabs('voiceItem')" class="tabtar-item ">消息声音设置</div>
        </div>
      </div>
      <div class="tabslist-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'order',
    data () {
      return {
        activenum:'voiceItem',
        ListData:[]
      }
    },
    created(){

    },
    mounted:function(){
      if(this.$route.path=='/set'||this.$route.path=='/voiceItem'){
        this.activenum='voiceItem'
      }
    },
    methods:{
      changetabs(way){
        this.activenum=way
        this.$router.push('/'+way)
      },
    }
  }
</script>
<style scoped>
.tabslist{ margin-top: 0}
</style>
