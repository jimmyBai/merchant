<template>
  <div class="main">
    <div class="tabslist">
      <div class="lineflex">
        <div class="tabslist-head">
          <div :class="{'is-active':activenum=='auditStatusOne'}" @click="changetabs('auditStatusOne')" class="tabtar-item ">审核通过</div>
          <div :class="{'is-active':activenum=='auditStatusTwo'}" @click="changetabs('auditStatusTwo')" class="tabtar-item">待审核</div>
          <div :class="{'is-active':activenum=='auditStatusThree'}" @click="changetabs('auditStatusThree')" class="tabtar-item">审核拒绝</div>
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
    name: 'bankCardlist',
    data () {
      return {
        activenum:'auditStatusOne',
        ListData:[]
      }
    },
    created(){

    },
    mounted:function(){
      if(this.$route.path=='/bankCardlist'){
        this.activenum='auditStatusOne'
      }else if(this.$route.path=='/auditStatusTwo'){
        this.activenum='auditStatusTwo'
      }else if(this.$route.path=='/auditStatusThree'){
        this.activenum='auditStatusThree'
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

</style>