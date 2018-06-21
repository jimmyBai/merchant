<template>
  <div id="app">
    <router-view> </router-view>
    <div class="fullpage" v-show="isLaoding">
      <div class="loadingImg"><i class="el-icon-loading"></i>加载中...</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'app',
  computed:{
    isLaoding(){
      return this.$store.state.isLaoding
    }
  },

}
</script>

<style>

</style>
