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
                <div class="itemcontent"><input type="text" v-model="baseInfo.name"></div>
              </div>
            </div>
            <!-- 商品英文名称 -->
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle"><em>*</em>商品英文名称</div>
                <div class="itemcontent"><input type="text" v-model="baseInfo.name_en"></div>
              </div>
            </div>
            <!-- 商品描述 -->
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle">商品描述</div>
                <div class="itemcontent"><input type="text" v-model="baseInfo.describe"></div>
              </div>
            </div>
            <!-- collection -->
            <div class="adduser-itemBox">
              <div class="adduser-class">
                <div class="classtitle">分类</div>
                <div class="classcontent"><el-select v-model="baseInfo.typelist" value-key='id' placeholder="请选择">
                  <el-option v-for="item in usertions" :key="item.id" :label="item.name" :value='item'>
                  </el-option>
                </el-select></div>
              </div>
              <div class="adduser-producer">
                <div class="producertitle"><em>*</em>产地</div>
                <div class="producercontent"><input type="text" v-model="baseInfo.place"></div>
              </div>
            </div>
            <!-- 年份 -->
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle"><em>*</em>年份</div>
                <div class="itemcontent"><input type="tel" v-model="baseInfo.years"></div>
              </div>
            </div>
            <!-- 品牌 -->
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle">品牌</div>
                <div class="itemcontent"><input type="text" v-model="baseInfo.brand"></div>
              </div>
            </div>
            <!-- collection -->
            <div class="adduser-itemBox">
              <div class="adduser-class">
                <div class="classtitle" >重量&nbsp;(KG)</div>
                <div class="classcontent"><input type="text" v-model="baseInfo.weight"></div>
              </div>
              <div class="adduser-producer">
                <div class="producertitle">容量&nbsp;(ML)</div>
                <div class="producercontent"><input type="text" v-model="baseInfo.capacity"></div>
              </div>
            </div>
            <!-- collection -->
            <div class="adduser-itemBox">
              <div class="adduser-class">
                <div class="classtitle" ><em>*</em>单价</div>
                <div class="classcontent"><input type="text" placeholder="￥" v-model="baseInfo.price"></div>
              </div>
              <div class="adduser-producer">
                <div class="producertitle"><em>*</em>特价</div>
                <div class="producercontent changeInput"><input type="text" placeholder="￥" v-model="baseInfo.special_price" :disabled="!baseInfo.is_use_special_price"></div>
                <el-switch
                  v-model="baseInfo.is_use_special_price"
                  active-color="rgb(96,58,108)"
                  inactive-color="#ff4949"
                  >
                </el-switch>
              </div>
            </div>
            <!-- collection -->
            <div class="adduser-itemBox">
              <div class="adduser-class notSame">
                <div class="notSametitle" v-model="baseInfo.track"><em>*</em>库存跟踪</div>
                  <el-switch
                    v-model="baseInfo.inventory_track"
                    active-color="rgb(96,58,108)"
                    inactive-color="#ff4949"
                    class="el_switch"
                    >
                  </el-switch>
              </div>
              <div class="adduser-producer">
                <div class="producertitle"><em>*</em>库存数量</div>
                <div class="producercontent"><input type="text" v-model="baseInfo.inventory"></div>
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
        msgtitle: '查看/编辑商品',
        priceStatus: true,
        usertions: [],
        // baseInfo:''
        name: '',
        name_en:'',
        describe: ''

      }
    },
    props: {
      fromParent: String
    },
    mounted:function(){
      // 。。。
      if(!this.fromParent){
        this.msgtitle = '添加'
        this.getGoodsInfo();
      }
      
      this.getclassinfo();
    },
    methods:{
      //获取修改信息
      getGoodsInfo(){
        let vm =this,url='/api/web/product/edit',params={'id':this.fromParent};
        vm.$axios.get(url,{params}).then((res)=>{
          if(res.data.error_code=='0'){
            vm.baseInfo=res.data.data
          }else{
            vm.$message.error(res.data.message);
          }
        }).catch(err => {
          console.log(err);
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
      //获取商户分类
      getclassinfo(){
        let vm =this,url='/api/web/product/type_list',params={};
        vm.$axios.get(url,{params}).then((res)=>{
          if(res.data.error_code=='0'){
            vm.usertions=res.data.data
          }else{
            vm.$message.error(res.data.message);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      //修改保存
      clickSaveInfo(){
        let vm =this,url,params;
        if(!this.fromParent){
          if(!this.baseInfo.typelist){
            this.$message.error('请选择分类');
            return false
          }else if(!this.baseInfo.name){
            this.$message.error("商品名称不能为空!");
            return false
          }else if(!this.baseInfo.name_en){
            this.$message.error("商品英文名称不能为空!");
            return false
          }else if(!this.baseInfo.place){
            this.$message.error("产地不能为空!");
            return false
          }else if(!this.baseInfo.years){
            this.$message.error("年份不能为空!");
            return false
          }else if(!this.baseInfo.price){
            this.$message.error("单价不能为空!");
            return false
          }else if(!this.baseInfo.inventory_track){
            this.$message.error("请开启库存追踪!");
            return false
          }
          url='/api/web/product/update',
          params={
            product:{
              name:vm.baseInfo.name,
              name_en:vm.baseInfo.name_en,
              describe:vm.baseInfo.describe,
              type:vm.baseInfo.typelist.id,
              place:vm.baseInfo.place,
              years:vm.baseInfo.years,
              brand:vm.baseInfo.brand,
              weight:vm.baseInfo.weight,
              price:vm.baseInfo.price,
              special_price:vm.baseInfo.special_price,
              inventory:vm.baseInfo.inventory,
              capacity:vm.baseInfo.capacity,
              is_use_special_price:vm.baseInfo.is_use_special_price?'on':'off',
              inventory_track:vm.baseInfo.inventory_track?'on':'off',
              product_id:vm.fromParent
            }
          };
        }else{
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
            this.$message.error("产地不能为空!");
            return false
          }else if(!this.years){
            this.$message.error("年份不能为空!");
            return false
          }else if(!this.price){
            this.$message.error("单价不能为空!");
            return false
          }
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
              isTakeawayStatus:false
            };
            //执行父组件方法
            this.$emit('viewevent',data,'');
          }else{
            vm.$message.error(res.data.message);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      
      
     
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
