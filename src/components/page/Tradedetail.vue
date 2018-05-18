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
  mounted:function(){
    if(this.$route.path=='/tradedetail'){
      this.activenum='tiptotallist'
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