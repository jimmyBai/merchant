<template>
  <div class="ws-content">
    <div class="navbar">
      <h1 class="nav-bar-title">外卖<small> | 外卖商品信息设置</small></h1>
    </div>
    <div class="tabslist">
      <div class="lineflex">
        <div class="tabslist-head">
          <div :class="{'is-active':activenum=='goodsonline'}" @click="changetabs('goodsonline')" class="tabtar-item ">酒单中</div>
          <div :class="{'is-active':activenum=='goodsindepot'}" @click="changetabs('goodsindepot')" class="tabtar-item">仓库中</div>
          <div :class="{'is-active':activenum=='goodsuncheck'}" @click="changetabs('goodsuncheck')" class="tabtar-item">待审核</div>
          <div :class="{'is-active':activenum=='goodsrepulse'}" @click="changetabs('goodsrepulse')" class="tabtar-item">审核拒绝</div>
          <div :class="{'is-active':activenum=='goodstrash'}" @click="changetabs('goodstrash')" class="tabtar-item">回收站</div>
        </div>
        <div class="ls-r-btn">
          <div @click="clickadd"><i class="el-icon-circle-plus-outline"></i><span>添加商品</span></div>
          <div @click="importbox=!importbox"><i class="el-icon-circle-plus-outline"></i><span>批量添加</span></div>
        </div>
      </div>
      <div class="tabslist-content">
        <router-view></router-view>
      </div>
    </div>

    <!-- 添加/查看商品 -->
    <view-goods v-if="isTakeawayShow" :fromParent="fromParent" @viewevent="viewevent"></view-goods>

    <!--批量添加-->
    <batch-import v-if="importbox" @childimport="importdata"></batch-import>
  </div>
</template>

<script>
import viewGoods from './goods/viewGoods'
import batchImport from './goods/batchImport'
export default {
    name: 'takeaway',
    components:{
      viewGoods,batchImport
    },
    data () {
      return {
        activenum:'takeawayAuditOne',
        ListData:[],
        isTakeawayShow: false,
        fromParent:'',
        importbox:false
      }
    },
    created(){

    },
    mounted:function(){
      if(this.$route.path=='/goodsonline'||this.$route.path=='/goodslist'){
        this.activenum='goodsonline'
      }else if(this.$route.path=='/goodsindepot'){
        this.activenum='goodsindepot'
      }else if(this.$route.path=='/goodsuncheck'){
        this.activenum='goodsuncheck'
      }else if(this.$route.path=='/goodsrepulse'){
        this.activenum='goodsrepulse'
      }else if(this.$route.path=='/goodstrash'){
        this.activenum='goodstrash'
      }
    },
    methods:{
      viewevent(...data){
        let vm = this;
        vm.isTakeawayShow=data.isTakeawayStatus;
        if(data[0].status&&data[0].status=='refresh'){
          let NewPage = '_empty' + '?time=' + new Date().getTime()/1000
          this.$router.push(NewPage)
          this.$router.go(-1)
        }
      },
      //批量导入
      importdata(...data){
        let vm = this;
        vm.importbox=data.importstatus;
        if(data[0].status&&data[0].status=='refresh'){
          this.getlistData()
        }
      },
      changetabs(way){
        this.activenum=way
        this.$router.push('/'+way)
      },
      clickadd(){
        this.fromParent=''
        this.isTakeawayShow = true;
      }
    }
  }

</script>
<style scoped>
.lineflex{ width: 100%; height: 31px; position: relative;}
.ls-r-btn{ display: flex;display: -webkit-flex; position: absolute; right: 0px; font-size: 12px;bottom: 5px; }
.ls-r-btn>div{margin-left: 5px; color: #fff;  background: rgb(242,86,86);  padding: 3px 8px; border-radius: 2px; cursor: pointer; }
</style>
