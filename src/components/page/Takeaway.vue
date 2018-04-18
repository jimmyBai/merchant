<template>
  <div class="main">
    <!-- title -->
    <div class="navbar">
      <h1 class="nav-bar-title">外卖<small> | 外卖商品信息设置</small></h1>
    </div>
    <!-- infoList -->
    <div class="listtable">
      <div class="list-search">

        <div class="ls-left">
          <div class="form-tabel">
            <div class="td-title">外卖商品表</div>
            <div class="td-content"><input type="text" v-model="product_name" /><span class="search-icon" @click="searchlist"><i class="el-icon-search"></i></span></div>
          </div>
        </div>
        <div class="ls-right">
          <div class="ls-r-btn" @click="clickadd">
            <i class="el-icon-refresh"></i><span>添加</span>
          </div>
        </div>

      </div>

      <el-table stripe :data="ListData">
        <el-table-column prop="product_id" label="ID"></el-table-column>
        <el-table-column prop="product_name" label="商户名称"></el-table-column>
        <el-table-column prop="name" label="分类"></el-table-column>
        <el-table-column prop="sale_price" label="单价"></el-table-column>
        <el-table-column prop="inventory" label="库存"></el-table-column>
        <el-table-column prop="weight" label="重量"></el-table-column>
        <el-table-column prop="capacity" label="容量"></el-table-column>
        <el-table-column prop="status" label="产品状态"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div class="tdBtn-box">
              <div class="tdbtn-view newView" @click="vieweditor(scope.row.product_id)">
                <i class="el-icon-view"></i><span>查看/编辑</span>
              </div>
              <div class="tdBtn-view" @click="removeThis(index)">
                <i class="el-icon-view"></i><span>删除</span>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="list-bottom"></div>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination v-if="total_page"  @size-change="" @current-change="handleCurrentChange" :page-size="per_page" background small layout="prev, pager, next" :total="total"> </el-pagination>
    </div>

    <!-- 添加商品 -->
    <!-- <add-goods v-if="isAddGoodsShow" @addevent="addevent"></add-goods> -->
    <!-- 查看商品 -->
    <view-goods v-if="isTakeawayShow" :fromParent="fromParent" @viewevent="viewevent"></view-goods>

  </div>
</template>

<script>
// import addGoods from './takeaway_Inside/addGoods'
import viewGoods from './takeaway_Inside/viewGoods'

export default {
  name: 'takeaway_Inside',
  components:{
    // addGoods,
    viewGoods
  },
  data () {
    return {
      product_name: "",  //搜索的产品名称
      page: "1", //页码，默认为1
      length: "10",//每页记录数，默认为10
      ListData:[],
      page:0,
      per_page:0,
      total:0,
      total_page:0,
      value1: true,
      value2: true,
      // isAddGoodsShow: false,
      isTakeawayShow: false,
      index: '',
      fromParent:''
    }
  },
  mounted:function(){
    this.getlistData()
  },
  methods:{
    //子组件传参地
    // addevent(...data){
    //   let vm = this;
    //   vm.isAddGoodsShow=data.isAddGoodsStatus
    //   this.getlistData()
    // },
    viewevent(...data){
      let vm = this;
      vm.isTakeawayShow=data.isTakeawayStatus
      this.getlistData()
    },
    // 获取数据
    getlistData(){
      this.ListData = []
      let vm = this,url='/api/web/product/list',
      params={
        product_name: vm.product_name,
        page: vm.page,
        length:vm.length
      };
      vm.$axios.get(url,{params}).then((res)=>{
        if(res.data.error_code=='0'){
          if(res.data.data.list){
            vm.ListData=res.data.data.list
          }
          vm.total=Number(res.data.data.total);
          vm.pages=Number(res.data.data.pages);
          vm.page=Number(res.data.data.page);
          vm.per_page=Number(res.data.data.per_page);
          vm.total_page=Number(res.data.data.total_page);
        }else{
          vm.$message.error(res.data.message);
        }
      }).catch(err => {
        console.log(err);
      });
    },
    // 搜索
    searchlist(data){
      this.getlistData()
    },
    // 分页
    handleCurrentChange(val){
      this.page=val
      this.getlistData(this.page);
    },
    clickadd(){
      this.fromParent=''
      this.isTakeawayShow = true;
    },
    vieweditor(id){
      this.fromParent=id.toString()
      this.isTakeawayShow = true;
    },
    // 删除
    removeThis(ListData,index){
      let vm = this,
      url='/api/web/product/delete'
      vm.$axios({
        method:'post',
        url:url
      }).then((res)=>{
        vm.ListData.splice(index,1);
      }).catch(err => {
        console.log(err);
      });
    }

  }
}
</script>
<style scoped>
  .list-search{ padding:0 10px; display: flex;display: -webkit-flex; justify-content: space-between;-webkit-justify-content: space-between}
  .ls-right .ls-r-btn{ color: #fff; font-size: 12px; background: rgb(242,86,86); padding: 3px 8px; border-radius: 2px; cursor: pointer}
  .ls-right .ls-r-btn span{ margin-left: 5px}
  .ls-left .form-tabel{ display: flex;display: -webkit-flex; align-items: center; -webkit-align-items: center; padding-bottom: 10px}
  .form-tabel .td-title{ margin-right: 5px; color: #f8e2ff}
  .form-tabel input {border-radius:1px;background: #2e1c34; padding: 3px; border: 1px solid #48344e; height: 18px; line-height: 18px; text-indent: 5px; color:#f8e2ff; width: 150px}
  .search-icon{ cursor: pointer; border-radius:1px;border: 1px solid #48344e; padding: 3px; height: 18px; display: inline-block; width: 18px; text-align: center; margin-left: 1px}
  .td-content{ display: flex; display: -webkit-flex;align-items: center;-webkit-align-items: center}


</style>
