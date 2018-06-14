<template>
  <div class="main">
    <!-- infoList -->
    <div class="listtable">
      <div class="list-search">
        <div class="form-tabel">
          <el-row class="elrow-line">
            <el-col :span="24" class="elrow-linerow">
              <span class="td-title">库存修改记录列表</span>
              <span class="sontitle">修改时间：</span>
              <el-date-picker class="res-input" :editable="false" v-model="start_time" clear-icon value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
              <el-date-picker class="res-input" :editable="false" v-model="end_time" clear-icon value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
              <span class="sontitle">商品分类：</span>
              <el-select v-model="typeValue" placeholder="全部" class="osselect">
                <el-option value="">全部</el-option>
                <el-option v-for="item in goodsTypeData" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
              <div  class="line">
                <input type="text"  placeholder="请输入商品名称" v-model="product_name" />
              </div>
              <div class="search-icon" @click="searchlist"><i class="el-icon-search"></i></div>
            </el-col>
          </el-row>
        </div>
      </div>
      <el-table stripe :data="ListData">
        <el-table-column prop="name" label="修改时间"></el-table-column>
        <el-table-column prop="category" label="商品名称"></el-table-column>
        <el-table-column prop="original_price" label="分类"></el-table-column>
        <el-table-column prop="unit_price" label="原库存数"></el-table-column>
        <el-table-column prop="inventory" label="新库存数"></el-table-column>
        <el-table-column prop="create_time" label="操作人"></el-table-column>
      </el-table>
      <div class="list-bottom"></div>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination v-if="total_page"  @size-change="" @current-change="handleCurrentChange" :page-size="per_page" background small layout="prev, pager, next" :total="total"> </el-pagination>
    </div>

  </div>
</template>

<script>
  import viewGoods from './viewGoods'
  import "../../../../static/css/newStyle.css"

  export default {
    name: 'takeawayDudit',
    components:{
      viewGoods
    },
    data () {
      return {
        product_name: "",  //搜索的产品名称
        length: "10",//每页记录数，默认为10
        ListData:[],
        start_time:'',
        end_time:'',
        page:1,
        per_page:0,
        total:0,
        total_page:0,
        isTakeawayShow: false,
        goodsTypeData:'',
        typeValue:'',
      }
    },
    mounted:function(){
      this.getGoodsType()
      this.getlistData()
    },
    methods:{
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
              "name": vm.product_name,
              "start_time":vm.start_time,
              "end_time":vm.end_time
            },
            "page": vm.page,
            "length":vm.length,
            "status": 3
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
      // 搜索
      searchlist(data){
        this.getlistData()
      },
      // 分页
      handleCurrentChange(val){
        this.page=val
        this.getlistData();
      }
    }
  }

</script>
<style scoped>
.list-search{ padding:0 10px; display: flex;display: -webkit-flex; justify-content: space-between;-webkit-justify-content: space-between}
.form-tabel{width: 100%; display: flex;display: -webkit-flex; align-items: center; -webkit-align-items: center; padding-bottom: 10px}
.elrow-line{ display: flex; display: -webkit-flex; width: 100%;align-items: center;-webkit-align-items: center}
.elrow-linerow{ display: flex;display: -webkit-flex; align-items: center; -webkit-align-items: center; margin-left: 5px;}
.elrow-linerow>div{ margin-right: 5px;}
.form-tabel .td-title{ margin-right: 5px; color: #f8e2ff}
.form-tabel input {border-radius:1px;background: #2e1c34; padding: 3px; border: 1px solid #48344e; height: 18px; line-height: 18px; text-indent: 5px; color:#f8e2ff; width: 150px}
.search-icon{ margin-left: 0; cursor: pointer; border-radius:1px;border: 1px solid #48344e; padding: 3px; height: 18px; display: inline-block; width: 18px; text-align: center;}
.main .res-input{ max-width: 125px}

</style>
