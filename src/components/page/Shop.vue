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
           <div :class="{'is-active':activenum=='tiplist'}" @click="changetabs('tiplist')" class="tabtar-item">小费</div>
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
  name: 'shop',
  data () {
    return {
      activenum:'shoplist'
    }
  },
  created(){

  },
  mounted:function(){
    if(this.$route.path=='/Shop'){
      this.activenum='shoplist'
    }else if(this.$route.path=='/tiplist'){
      this.activenum='tiplist'
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
