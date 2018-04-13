<template>
  
  <div class="addgoods-andy">
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
                <div class="classtitle" >分类</div>
                <div class="classcontent"><el-select v-model="type" value-key="id" placeholder="请选择">
                  <el-option v-for="item in usertions" :key="item.id" :label="item.class_name" :value='item'>
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
                  <div class="producercontent changeInput"><input type="text" placeholder="￥" v-model="special_price"></div>
                  <el-switch
                    v-model="value1"
                    active-color="rgb(96,58,108)"
                    inactive-color="rgb(96,58,108)">
                  </el-switch>
              </div>
            </div>
            <!-- collection -->
            <div class="adduser-itemBox">
              <div class="adduser-class notSame">
                <div class="notSametitle" ><em>*</em>库存跟踪</div>
                <el-switch
                    v-model="value2"
                    active-color="rgb(96,58,108)"
                    inactive-color="rgb(96,58,108)"
                    class="el_switch">
                </el-switch>
              </div>
              <div class="adduser-producer">
                  <div class="producertitle"><em>*</em>库存数量</div>
                  <div class="producercontent"><input type="text" v-model="inventory"></div>
                </div>
            </div>
            <!-- 保存 -->
            <div class="popsaveline" @click="clickSaveInfo">
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
  export default {
    name: 'addGoods',
    data () {
        return {
            msgtitle: '添加商品',
            value1: true,
            value2: true,
            usertions: [],
            name: '',
            describe: '',
            type: '',
            place: '',
            years: '',
            brand: '',
            weight: '',
            price: '',
            special_price: '',
            inventory: '',
            capacity: ''
        }
    },
    mounted:function(){

      this.getclassinfo();
    },
    methods:{
      
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
      clickSaveInfo(){
        let vm =this,url='/api/web/product/create',params={
          name:vm.name||'new',
          describe:vm.describe||'dog',
          type:vm.type||'beer',
          place:vm.place||'hengzhou',
          years:vm.years||'1994',
          brand:vm.brand||'big',
          weight:vm.weight||'100',
          price:vm.price||'100',
          special_price:vm.special_price||'88',
          inventory:vm.inventory||'250',
          capacity:vm.capacity||'250'
        };
        vm.$axios({
          method:'post',
          url:url,
          data: params
        }).then((res)=>{
          if(res.data.error_code=='0'){
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
          isAddGoodsStatus:false
        };
        //执行父组件方法
        this.$emit('addevent',data,'');
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
