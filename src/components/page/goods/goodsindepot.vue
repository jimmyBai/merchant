<template>
  <div class="main">
    <!-- infoList -->
    <div class="listtable">
      <div class="list-search">
        <div class="form-tabel">
          <el-row class="elrow-line">
            <el-col :span="15" class="elrow-linerow">
              <span class="td-title">仓库中商品列表</span>
              <span class="sontitle">商品分类：</span>
              <el-select v-model="typeValue" placeholder="全部" class="osselect">
                <el-option value="">全部</el-option>
                <el-option v-for="item in goodsTypeData" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
              <div  class="line">
                <input type="text" placeholder="请输入商品名称" v-model="product_name" />
              </div>
              <div class="search-icon" @click="searchlist"><i class="el-icon-search"></i></div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="tablebtnBox">
        <div class="tablebtnline">
          <div><span @click.stop="outsale">上架</span></div>
          <div><span @click.stop="delgoods">删除</span></div>
          <div><span @click.stop="exportList">导出Excel</span></div>
        </div>
      </div>

      <el-table stripe :data="ListData"  @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center" width="55"></el-table-column>
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="category" label="分类"></el-table-column>
        <el-table-column prop="weight" label="重量(kg)"></el-table-column>
        <el-table-column prop="capacity" label="容量(ml)"></el-table-column>
        <el-table-column prop="original_price" label="原价" :formatter="formatMoney"></el-table-column>
        <el-table-column prop="unit_price" label="单价" :formatter="formatMoney"></el-table-column>
        <el-table-column prop="inventory" label="库存"></el-table-column>
        <el-table-column width="100" align="right" label="操作">
          <template slot-scope="scope">
            <div class="tdBtn-box">
              <div class="tdbtn-view newView" @click="vieweditor(scope.row.id)">
                <i class="el-icon-view"></i><span>查看/编辑</span>
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

    <!-- 添加/查看商品 -->
    <view-goods v-if="isTakeawayShow" :fromParent="fromParent" @viewevent="viewevent"></view-goods>

  </div>
</template>

<script>
import viewGoods from './viewGoods'
import "../../../../static/css/newStyle.css"

export default {
  name: 'takeawayAudit',
  components:{
    viewGoods
  },
  data () {
    return {
      product_name: "",  //搜索的产品名称
      length: "10",//每页记录数，默认为10
      ListData:[],
      page:1,
      per_page:0,
      total:0,
      total_page:0,
      isTakeawayShow: false,
      fromParent:'',
      goodsTypeData:'',
      typeValue:'',
      multipleSelection:[]
    }
  },
  mounted:function(){
    this.getGoodsType()
    this.getlistData()
  },
  methods:{
    //金钱格式化
    formatMoney(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return date.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    viewevent(...data){
      let vm = this;
      vm.isTakeawayShow=data.isTakeawayStatus;
      if(data[0].status&&data[0].status=='refresh'){
        this.getlistData()
      }
    },
    //获取产品分类
    getGoodsType(){
      let vm = this,
        url='/api/web/takeout-product/type_list',
        params={};
      vm.$axios.get(url,{params}).then((res)=>{
        if(res.data.error_code=='0'){
          vm.goodsTypeData=res.data.data
        }else{
          vm.$message.error(res.data.message);
        }
      }).catch(err => {
          console.log(err);
      });
    },
    // 获取数据
    getlistData(){
      this.ListData = []
      let vm = this,url='/api/web/takeout-product/list',
        params={
          "search": {
            "category": vm.typeValue,
            "name": vm.product_name,
          },
          "page": vm.page,
          "length":vm.length,
          "status": 5
        };
      vm.$axios({
        method:'post',
        data:params,
        url:url
      }).then((res)=>{
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
    //全选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 搜索
    searchlist(data){
      this.getlistData()
    },
    // 分页
    handleCurrentChange(val){
      this.page=val
      this.getlistData();
    },
    clickadd(){
      this.fromParent=''
      this.isTakeawayShow = true;
    },
    vieweditor(id){
      this.isTakeawayShow = true;
      this.fromParent=id.toString();
    },
    //上架
    outsale(){
      //是否选了商品
      let vm=this,productsID=[];
      if(vm.multipleSelection&&vm.multipleSelection.length>0){
        vm.multipleSelection.forEach(item=>{
          productsID.push(item.id)
      })
      }else{
        vm.$message.error('请选择要上架的商品！');
        return
      }
      let url='/api/web/takeout-product/shelf-operate',
        params={
          products:productsID,
          operate:'1'//1上架,2下架
        }
      vm.$axios({
        method:'post',
        data:params,
        url:url
      }).then((res)=>{
        if(res.data.error_code=='0'){
        vm.$message({
          message: '商品上架操作成功!',
          type: 'success'
        });
        setTimeout(x=>{
          this.getlistData()
      },500)
      }else{
        vm.$message.error(res.data.message);
      }
    }).catch(err => {
        console.log(err);
    });
    },
    //删除
    delgoods(){
      //是否选了商品
      let vm=this,productsID=[];
      if(vm.multipleSelection&&vm.multipleSelection.length>0){
        vm.multipleSelection.forEach(item=>{
          productsID.push(item.id)
      })
      }else{
        vm.$message.error('请选择要删除的商品！');
        return
      }
      let url='/api/web/takeout-product/delete',
        params={
          products:productsID,
          status:'5'//1[待审核] 2[审核拒绝] 3[回收站] 4[上架] 5[下架]
        }
      vm.$axios({
        method:'post',
        data:params,
        url:url
      }).then((res)=>{
        if(res.data.error_code=='0'){
          vm.$message({
            message: '商品删除操作成功!',
            type: 'success'
          });
          setTimeout(x=>{
            this.getlistData()
        },500)
        }else{
          vm.$message.error(res.data.message);
        }
      }).catch(err => {
          console.log(err);
      });
    },
    //导出Excel
    exportList(){
      let vm = this;
      if(this.ListData&&this.ListData.length>0){
        let url='/api/web/takeout-product/export',
          params={
            "search": {
              "category": vm.typeValue,
              "name": vm.product_name,
            },
            "status": 5
          };
        vm.$axios({
          method:'post',
          data:params,
          url:url,
          responseType:'arraybuffer'
        }).then((res)=>{
          let blob=new Blob([res.data],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
          let elink = document.createElement('a');
          elink.download = '酒单中的商品';
          elink.style.display = 'none';
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          document.body.removeChild(elink);
        }).catch(err => {
            console.log(err);
        });
      }else{
        vm.$message.error('当前列表暂无商品！');
      }
    }

  }
}


</script>
<style scoped>
.list-search{ padding:0 10px; display: flex;display: -webkit-flex; justify-content: space-between;-webkit-justify-content: space-between}
.form-tabel{width: 100%; display: flex;display: -webkit-flex; align-items: center; -webkit-align-items: center; padding-bottom: 10px}
.elrow-line{ display: flex; display: -webkit-flex; width: 100%;align-items: center;-webkit-align-items: center}
.elrow-linerow{ display: flex;display: -webkit-flex; align-items: center; -webkit-align-items: center}
.elrow-linerow>div{ margin-right: 5px;}
.form-tabel .td-title{ margin-right: 5px; color: #f8e2ff}
.form-tabel input {border-radius:1px;background: #2e1c34; padding: 3px; border: 1px solid #48344e; height: 18px; line-height: 18px; text-indent: 5px; color:#f8e2ff; width: 150px}
.search-icon{ margin-left: 0; cursor: pointer; border-radius:1px;border: 1px solid #48344e; padding: 3px; height: 18px; display: inline-block; width: 18px; text-align: center;}
.sontitle{ float: right}
</style>
