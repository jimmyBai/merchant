<template>
  <div class="main">
    <div class="navbar">
      <h1 class="nav-bar-title">报表信息<small> | 所有报表详细信息</small></h1>
    </div>
    <!-- tab -->
    <div class="datatab">
      <div class="tabslist">
        <div class="lineflex">
          <div class="tabslist-head">
            <div :class="{'is-active':activenum=='tiptotallist'}" @click="changetabs('tiptotallist')" class="tabtar-item ">小费统计</div>
            <div :class="{'is-active':activenum=='livetotallist'}" @click="changetabs('livetotallist')" class="tabtar-item ">直播统计</div>
            <div :class="{'is-active':activenum=='takeawaytotallist'}" @click="changetabs('takeawaytotallist')" class="tabtar-item ">外送统计</div>
          </div>
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
  name: 'tradedetail',
  data () {
    return {
      activenum:'tiptotallist'
    }
  },
  created(){

  },
  watch: {
    '$route' (to, from) {
      if(to.path.indexOf('tradedetail')>=0||to.path.indexOf('tiptotallist')>=0){
        this.activenum='tiptotallist'
      }else{
        this.activenum=to.path.replace('/','')
      }
    }
  },
  mounted:function(){
    if(this.$route.path=='/tradedetail'){
      this.activenum='tiptotallist'
    }else if(this.$route.path=='/livetotallist'){
      this.activenum='livetotallist'
    }else if(this.$route.path=='/takeawaytotallist'){
      this.activenum='takeawaytotallist'
    }
  },
  methods:{
    changetabs(way){
      this.activenum=way
      this.$router.push('/'+way)
    }
  }
}
</script>
<style scoped>

</style>
