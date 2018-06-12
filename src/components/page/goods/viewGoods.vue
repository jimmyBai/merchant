<template>
  <div class="viewgoods-andy">
    <div class="el-message-box__wrapper">
      <div class="el-message-box">
        <div class="message-box_header">
          <div class="message-box_title"><span v-text='msgtitle'></span></div>
          <div class="message-box_closebtn" @click="closepop"><i class="el-message-box__close el-icon-close"></i></div>
        </div>
        <div class="message-box_content">
          <div class="addpop">
            <!-- 商品名称 -->
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle"><em>*</em>商品名称</div>
                <div class="itemcontent"><input type="text" placeholder="请输入商品名称" v-model="name"></div>
              </div>
            </div>
            <!-- 商品英文名称 -->
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle"><em>*</em>商品英文名称</div>
                <div class="itemcontent"><input type="text" placeholder="请输入商品英文名称" v-model="name_en"></div>
              </div>
            </div>
            <!-- 商品描述 -->
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle"><em>*</em>商品描述</div>
                <div class="itemcontent"><input type="text" placeholder="请输入商品描述" v-model="describe"></div>
              </div>
            </div>
            <!-- collection -->
            <div class="adduser-itemBox">
              <div class="adduser-class">
                <div class="itemtitle"><em>*</em>分类</div>
                <div class="itemcontent">
                  <el-select v-model="typelist" value-key="id" placeholder="请选择">
                    <el-option v-for="item in usertions" :key="item.id" :label="item.name" :value="item">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="adduser-producer">
                <div class="producertitle">产地</div>
                <div class="producercontent"><input type="text" placeholder="请输入产地" v-model="place"></div>
              </div>
            </div>

            <div class="adduser-itemBox">
              <div class="adduser-class">
                <div class="itemtitle">年份</div>
                <div class="producercontent"><input type="tel" placeholder="请输入年份" v-model="years"></div>
              </div>
              <div class="adduser-producer">
                <div class="itemtitle">品牌</div>
                <div class="producercontent"><input type="text" placeholder="请输入品牌名称" v-model="brand"></div>
              </div>
            </div>
            <!-- collection -->
            <div class="adduser-itemBox">
              <div class="adduser-class">
                <div class="classtitle"><em>*</em>重量&nbsp;(kg)</div>
                <div class="classcontent"><input type="tel" placeholder="请输入商品重量" v-model="weight"></div>
              </div>
              <div class="adduser-producer">
                <div class="producertitle"><em>*</em>容量&nbsp;(ml)</div>
                <div class="producercontent"><input type="tel" placeholder="请输入商品容量" v-model="capacity"></div>
              </div>
            </div>
            <!-- collection -->
            <div class="adduser-itemBox">
              <div class="adduser-class">
                <div class="classtitle"><em>*</em>原价</div>
                <div class="classcontent"><input type="text" placeholder="请输入商品金额" v-model="original_price"></div>
              </div>
              <div class="adduser-producer">
                <div class="classtitle"><em>*</em>单价</div>
                <div class="classcontent"><input type="text" placeholder="请输入商品金额" v-model="unit_price"></div>
              </div>
            </div>
            <!-- collection -->
            <div class="adduser-itemBox">
              <div class="adduser-class">
                <div class="producertitle"><em>*</em>库存数量</div>
                <div class="producercontent"><input type="tel" placeholder="请输入库存数量" v-model="inventory"></div>
              </div>
              <div class="adduser-producer lineflex">
                  <div class="title"><em>*</em>是否上架</div>
                  <el-switch class="switchbox"  v-model="track" active-color="rgb(96,58,108)" inactive-color="#7e7c7c"></el-switch>
              </div>
            </div>
            <!-- 保存 -->
            <div class="popsaveline" @click="clickSaveInfo()">
              <span v-text="issvaetext"></span>
            </div>

          </div>
        </div>
        <div class="message-box_btns">

        </div>
      </div>
    </div>
    <div class="v-modal" style="z-index: 99;"></div>
  </div>


</template>

<script>
// andy
import "../../../../static/css/newStyle.css"
  export default {
    name: 'viewGoods',
    data () {
      return {
        msgtitle: '添加',
        issvaetext:'保存',
        usertions: [],
        typelist: '',
        name: '',
        name_en: '',
        describe: '',
        place: '',
        years: '',
        brand: '',
        weight: '',
        capacity: '',
        unit_price: '',
        original_price: '',
        track: false,
        inventory: '',
        listdata:''
      }
    },
    props: {
      fromParent: String
    },
    watch:{
      name_en(nVal,oVal){
        if(nVal){
          this.name_en=nVal.toString().replace(/[^a-zA-Z^0-9^\s]/g,'');
        }
      },
      years(nVal,oVal){
        if(nVal){
          this.years=nVal.toString().replace(/[^0-9]*/g,'');
        }
      },
      weight(nVal,oVal){
        if(nVal){
          this.weight=nVal.toString().replace(/^\D*([0-9]\d*\.?\d{0,2})?.*$/,'$1');
        }
      },
      original_price(nVal,oVal){
        if(nVal){
          this.original_price=nVal.toString().replace(/^\D*([0-9]\d*\.?\d{0,2})?.*$/,'$1');
        }
      },
      unit_price(nVal,oVal){
        if(nVal){
          this.unit_price=nVal.toString().replace(/^\D*([0-9]\d*\.?\d{0,2})?.*$/,'$1');
        }
      },
      capacity(nVal,oVal){
        if(nVal){
          this.capacity=nVal.toString().replace(/^\D*([0-9]\d*\.?\d{0,2})?.*$/,'$1');
        }
      },
      inventory(nVal,oVal){
        if(nVal){
          this.inventory=nVal.toString().replace(/[^0-9]*/g,'');
        }
      }
    },
    mounted:function(){
      // 判断页面
      this.getclassinfo();
      if(this.fromParent){
        this.msgtitle = '查看/编辑商品'
        this.getGoodsInfo();
      }else{

      }
    },
    filters: {
      viewMoney: function (value) {
        if(value){
          let date = value.toString()
          return date.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }
      }
    },
    methods:{
      // 获取修改信息
      getGoodsInfo(){
        let vm =this,
        url='/api/web/takeout-product/info',
        params={'id':this.fromParent};
        vm.$axios.get(url,{params}).then((res)=>{
          if(res.data.error_code=='0'){
            vm.listdata=res.data.data
            vm.name=res.data.data.name
            vm.name_en=res.data.data.en_name
            vm.describe=res.data.data.describe
            vm.place=res.data.data.place
            vm.years=res.data.data.years
            vm.brand=res.data.data.brand
            vm.weight=res.data.data.weight
            vm.capacity=res.data.data.capacity
            vm.original_price=res.data.data.original_price
            vm.unit_price=res.data.data.unit_price
            res.data.data.is_shelf==1?vm.track=true:vm.track=false
            vm.inventory=res.data.data.inventory
            if(vm.usertions){vm.settypelist()}
          }else{
            vm.$message.error(res.data.message);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 获取下拉列表的值
      settypelist(){
        let vm=this;
        vm.usertions.forEach(ele => {
          if(ele.id==vm.listdata.category_id){
            vm.typelist=ele
          }
        });
      },
      closepop(){
        //执行父组件关闭方法
        let data = {
          isTakeawayStatus:false
        };
        //执行父组件方法
        this.$emit('viewevent',data,'');
      },
      // 获取商品分类
      getclassinfo(){
        let vm =this,url='/api/web/takeout-product/type_list',params={};
        vm.$axios.get(url,{params}).then((res)=>{
          if(res.data.error_code=='0'){
            vm.usertions=res.data.data
            if(vm.listdata){vm.settypelist()}
          }else{
            vm.$message.error(res.data.message);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 修改保存
      clickSaveInfo(){
        let vm =this,url,params={};
        if(!this.typelist){
          this.$message.error('请选择分类');
          return false
        }else if(!this.name){
          this.$message.error("商品名称不能为空!");
          return false
        }else if(!this.name_en){
          this.$message.error("商品英文名称不能为空!");
          return false
        }else if(!this.weight){
          this.$message.error("商品重量不能为空!");
          return false
        }else if(!this.capacity){
          this.$message.error("商品容量不能为空!");
          return false
        }else if(!this.unit_price){
          this.$message.error("商品单价不能为空!");
          return false
        }else if(!this.original_price){
          this.$message.error("商品原价不能为空!");
          return false
        }else if(!this.inventory){
          this.$message.error("商品库存不能为空!");
          return false
        }else if(!this.describe){
          this.$message.error("商品描述不能为空!");
          return false
        }
        params.data={
          name:vm.name,
          en_name:vm.name_en,
          describe:vm.describe,
          type:vm.typelist.id,
          place:vm.place,
          years:vm.years,
          brand:vm.brand,
          weight:vm.weight,
          capacity:vm.capacity,
          original_price:vm.original_price,
          unit_price:vm.unit_price,
          inventory:vm.inventory,
          is_shelf:vm.track?1:0,
        }
        if(this.fromParent){
          url='/api/web/takeout-product/edit';
          params.data.id=vm.fromParent;
        }else{
          url='/api/web/takeout-product/add';
        }
        vm.$axios({
          method:'post',
          url:url,
          data: params
        }).then((res)=>{
          if(res.data.error_code=='0'){

            if(this.fromParent){
              vm.$message({
                message: '商品修改成功!',
                type: 'success'
              });
            }else{
              vm.$message({
                message: '商品添加成功',
                type: 'success'
              });
            }
            //执行父组件关闭方法
            let data = {
              isTakeawayStatus: false,
              status: 'refresh'
            };
            //执行父组件方法
            this.$emit('viewevent',data,'');
          }else{
            vm.$message.error(res.data.message);
          }
        }).catch(err => {
          console.log(err);
        });
      }

    }
  }

</script>

<style scoped>
em{ font-style: normal; margin-right: 5px; color: #ac5397}
.itemtitle{ height: 20px; line-height: 20px; margin-bottom: 5px;}
.el-message-box__wrapper{ z-index: 100}
.message-box_header{ position: relative; height: 40px;justify-content: center; -webkit-justify-content: center; line-height: 40px; display: flex; display: -webkit-flex; background: -webkit-gradient(linear, 0 0, 0 bottom, from(#433249), to(#38293d));}
.message-box_closebtn{ position: absolute; right: 0; display: inline-block; height: 40px; width: 40px; text-align: center; cursor: pointer}
.message-box_title{ font-size: 16px;}
.message-box_content{ padding: 20px}
.popsaveline{ width: 80%; margin: 0 auto; margin-top: 20px}
.popsaveline span{ text-align: center}
.adduser-itemBox{ display: -webkit-flex; margin-left: 10px; margin-bottom: 10px;  font-size: 12px; }
.classtitle{height: 20px;line-height: 20px; margin-bottom: 5px; }
.adduser-class{ width: 45%;  float: left; }
.adduser-producer{ width: 45%; float: right;margin-left: 5%; }
.producertitle{ height: 20px; line-height: 20px; margin-bottom: 5px; }
.lineflex{ display: flex; display: -webkit-flex; align-items: flex-end}
.lineflex .title{width: 100%}
.switchbox{ cursor: pointer}

</style>
