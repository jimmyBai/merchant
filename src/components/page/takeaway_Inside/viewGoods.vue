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
                <div class="itemcontent"><input type="text" v-model="name"></div>
              </div>
            </div>
            <!-- 商品英文名称 -->
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle"><em>*</em>商品英文名称</div>
                <div class="itemcontent"><input type="text" v-model="name_en"></div>
              </div>
            </div>
            <!-- 商品描述 -->
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle">商品描述</div>
                <div class="itemcontent"><input type="text" v-model="describe"></div>
              </div>
            </div>
            <!-- collection -->
            <div class="adduser-itemBox">
              <div class="adduser-class">
                <div class="classtitle">分类</div>
                <div class="classcontent"><el-select v-model="typelist" value-key='id' placeholder="请选择">
                  <el-option v-for="item in usertions" :key="item.id" :label="item.name" :value='item'>
                  </el-option>
                </el-select></div>
              </div>
              <div class="adduser-producer">
                <div class="producertitle"><em>*</em>产地</div>
                <div class="producercontent"><input type="text" v-model="place"></div>
              </div>
            </div>
            <!-- 年份 -->
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle"><em>*</em>年份</div>
                <div class="itemcontent"><input type="tel" v-model="years"></div>
              </div>
            </div>
            <!-- 品牌 -->
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle">品牌</div>
                <div class="itemcontent"><input type="text" v-model="brand"></div>
              </div>
            </div>
            <!-- collection -->
            <div class="adduser-itemBox">
              <div class="adduser-class">
                <div class="classtitle" >重量&nbsp;(KG)</div>
                <div class="classcontent"><input type="text" v-model="weight"></div>
              </div>
              <div class="adduser-producer">
                <div class="producertitle">容量&nbsp;(ML)</div>
                <div class="producercontent"><input type="text" v-model="capacity"></div>
              </div>
            </div>
            <!-- collection -->
            <div class="adduser-itemBox">
              <div class="adduser-class">
                <div class="classtitle" ><em>*</em>单价</div>
                <div class="classcontent"><input type="text" placeholder="￥" v-model="price"></div>
              </div>
              <div class="adduser-producer">
                <div class="producertitle"><em>*</em>特价</div>
                <div class="producercontent changeInput"><input type="text" placeholder="￥" v-model="special_price" :disabled="!is_use_special_price"></div>
                <el-switch
                  v-model="is_use_special_price"
                  active-color="rgb(96,58,108)"
                  inactive-color="#7e7c7c"
                  >
                </el-switch>
              </div>
            </div>
            <!-- collection -->
            <div class="adduser-itemBox">
              <div class="adduser-class notSame">
                <div class="notSametitle" v-model="track"><em>*</em>库存跟踪</div>
                  <el-switch
                    v-model="inventory_track"
                    active-color="rgb(96,58,108)"
                    inactive-color="#7e7c7c"
                    class="el_switch"
                    >
                  </el-switch>
              </div>
              <div class="adduser-producer">
                <div class="producertitle"><em>*</em>库存数量</div>
                <div class="producercontent"><input type="text" v-model="inventory"></div>
              </div>
            </div>
            <!-- 保存 -->
            <div class="popsaveline" @click="clickSaveInfo()">
              <span>保存</span>
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
        priceStatus: true,
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
        price: '',
        special_price: '',
        is_use_special_price: '',
        track: '',
        inventory_track: '',
        inventory: '',
        listdata:''
      }
    },
    props: {
      fromParent: String
    },
    mounted:function(){
      // 判断页面
      this.getclassinfo();
      if(this.fromParent){
        this.msgtitle = '查看/编辑商品'
        this.getGoodsInfo();
      }else{}
    },
    methods:{
      // 获取修改信息
      getGoodsInfo(){
        let vm =this,
        url='/api/web/product/edit',
        params={'id':this.fromParent};
        vm.$axios.get(url,{params}).then((res)=>{
          if(res.data.error_code=='0'){
            vm.listdata=res.data.data
            vm.name=res.data.data.name
            vm.name_en=res.data.data.name_en
            vm.describe=res.data.data.describe
            vm.place=res.data.data.place
            vm.years=res.data.data.years
            vm.brand=res.data.data.brand
            vm.weight=res.data.data.weight
            vm.capacity=res.data.data.capacity
            vm.price=res.data.data.price
            vm.special_price=res.data.data.special_price
            vm.is_use_special_price=res.data.data.is_use_special_price
            vm.track=res.data.data.track
            vm.inventory_track=res.data.data.inventory_track
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
          if(ele.id==vm.listdata.type){
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
      // 获取商户分类
      getclassinfo(){
        let vm =this,url='/api/web/product/type_list',params={};
        vm.$axios.get(url,{params}).then((res)=>{
          if(res.data.error_code=='0'){
            vm.usertions=res.data.data
            // if(vm.fromParent&&vm.typelist){
            //   console.log(vm.typelist.type)
            //   vm.usertions.forEach(ele => {
            //     if(ele.id==vm.typelist.type){
            //       vm.typelist = ele
            //     }
            //   });
            // }
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
        let vm =this,url,params;
        if(!this.typelist){
          this.$message.error('请选择分类');
          return false
        }else if(!this.name){
          this.$message.error("商品名称不能为空!");
          return false
        }else if(!this.name_en){
          this.$message.error("商品英文名称不能为空!");
          return false
        }else if(!this.place){
          this.$message.error("产品产地不能为空!");
          return false
        }else if(!this.years){
          this.$message.error("产品年份不能为空!");
          return false
        }else if(!this.weight){
          this.$message.error("产品重量不能为空!");
          return false
        }else if(!this.capacity){
          this.$message.error("产品容量不能为空!");
          return false
        }else if(!this.price){
          this.$message.error("产品单价不能为空!");
          return false
        }  
        if(this.fromParent){
          url='/api/web/product/update',
          params={
            product:{
              name:vm.name,
              name_en:vm.name_en,
              describe:vm.describe,
              type:vm.typelist.id,
              place:vm.place,
              years:vm.years,
              brand:vm.brand,
              weight:vm.weight,
              price:vm.price,
              special_price:vm.special_price,
              inventory:vm.inventory,
              capacity:vm.capacity,
              is_use_special_price:vm.is_use_special_price?'on':'off',
              inventory_track:vm.inventory_track?'on':'off',
              product_id:vm.fromParent
            }
          };
        }else{
          url='/api/web/product/create',
          params={
            product:{
              name:vm.name,
              name_en:vm.name_en,
              describe:vm.describe,
              type:vm.typelist.id,
              place:vm.place,
              years:vm.years,
              brand:vm.brand,
              weight:vm.weight,
              price:vm.price,
              special_price:vm.special_price,
              inventory:vm.inventory,
              capacity:vm.capacity,
              is_use_special_price:vm.is_use_special_price?'on':'off',
              inventory_track:vm.inventory_track?'on':'off'
            }
          };
        }
        vm.$axios({
          method:'post',
          url:url,
          data: params
        }).then((res)=>{
          if(res.data.error_code=='0'){
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
  .itemcontent input { height: 30px; line-height: 30px; }
  .el-message-box__wrapper{ z-index: 100}
  .message-box_header{ position: relative; height: 40px;justify-content: center; -webkit-justify-content: center; line-height: 40px; display: flex; display: -webkit-flex; background: -webkit-gradient(linear, 0 0, 0 bottom, from(#433249), to(#38293d));}
  .message-box_closebtn{ position: absolute; right: 0; display: inline-block; height: 40px; width: 40px; text-align: center; cursor: pointer}
  .message-box_title{ font-size: 16px;}
  .message-box_content{ padding: 20px}
  .popsaveline{ width: 80%; margin: 0 auto; margin-top: 20px}
  .popsaveline span{ text-align: center}


  .adduser-itemBox{
    display: -webkit-flex;
    margin-left: 10px;
    margin-bottom: 10px;
    font-size: 12px;
  }
  .classtitle{
    height: 20px;
    line-height: 20px;
    margin-bottom: 5px;
  }
  .adduser-class{
    width: 45%;
    float: left;
  }
  .adduser-producer{
    width: 45%;
    float: right;
    margin-left: 5%;
  }
  .producertitle{
    height: 20px;
    line-height: 20px;
    margin-bottom: 5px;
  }
  .changeInput{
    width: 70%;
    float: left;
  }
  .el-switch{
    float: right;
  }
  .notSametitle{
    float: left;
  }
  .notSametitle{
    float: left;
    position: absolute;
    left: 0;
    bottom: 5px;
  }
  .notSame{
    height: 50px;
    position: relative;
  }
  .el_switch{
    position: absolute;
    right: 0;
    bottom: 5px;
  }

</style>
