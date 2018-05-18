<template>

  <div class="rsea-box">
    <div class="res-head">筛选条件</div>
    <div class="res-content">
      <el-row class="res-content-line">
        <el-col :span="4"><div class="res-title">付款金额：</div></el-col>
        <el-col :span="7"><div class="res-input"><input  type="tel"></div></el-col>
        <el-col :span="1"><div class="res-line">~</div></el-col>
        <el-col :span="7"><div class="res-input"><input  type="tel"></div></el-col>
        <el-col :span="4"><div class="res-btn" @click="searchFn"><span>确定</span></div></el-col>
      </el-row>
      <el-row class="res-content-line">
        <el-col :span="4"><div class="res-title">支付时间：</div></el-col>
        <el-col :span="7">
          <div class="res-input">
            <el-date-picker :editable="false" clear-icon value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="1"><div class="res-line">~</div></el-col>
        <el-col :span="7">
          <div class="res-input">
            <el-date-picker clear-icon :editable="false" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="4"><div class="res-btn" @click="searchFn"><span>确定</span></div></el-col>
      </el-row>
    </div>
    <div class="res-bottom">
      <span @click="clearststus">恢复默认</span>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'screen',
    data () {
      return {
        
      }
    },
    methods:{
      
      //恢复默认
      clearststus(){
        //通知父页面初始化刷新
        let data = {
          
        };
        //执行父组件方法
        this.$emit('tievent',data,'');
      },
      searchFn(){
        let data = {

        };
        //执行父组件方法
        this.$emit('tievent',data,'');
      }
    }
  }
</script>
<style scoped>
em{ font-style: normal; margin-right: 5px; color: #ac5397}
.el-message-box__wrapper{ z-index: 100}
.message-box_header{ position: relative; height: 40px;justify-content: center; -webkit-justify-content: center; line-height: 40px; display: flex; display: -webkit-flex; background: -webkit-gradient(linear, 0 0, 0 bottom, from(#433249), to(#38293d));}
.message-box_closebtn{ position: absolute; right: 0; display: inline-block; height: 40px; width: 40px; text-align: center; cursor: pointer}
.message-box_title{ font-size: 16px;}
.message-box_content{ padding: 20px 30px; font-size: 12px; position: relative}
.baseinfo dl{ text-align: left}
.baseinfo dl{ margin-bottom: 10px;}
.baseinfo dl dt{ margin-bottom: 5px}
.el-message-box{ width: 550px}
.money{ color: #fff; font-size: 18px; margin: 10px 0}
.reson span{ display: inline-block; color:#dba018; transform: scale(0.8)}
.orderinfo ul li{ margin-bottom: 5px;}
.orderinfo ul li .title{}
.orderinfo ul li .content{ display: flex;display: -webkit-flex; padding: 0 10px; height: 30px; line-height: 30px; background: #321e39; border: 1px solid #4a3151}
.orderinfo ul li .content span{ min-width:60px}
.goodsinfo{ padding: 10px 0 5px 0; border-bottom: 1px solid #523f52}
.goodsinfo .goodstitle{ height: 30px; line-height: 30px}
.goodsinfo ul li{ padding: 10px 0; display: flex;display: -webkit-flex; align-items: center;-webkit-align-items: center;justify-content:space-between; -webkit-justify-content: space-between }
.goodsinfo ul li .goodsimg { position: relative}
.goodsinfo ul li .goodsimg .img{ width: 50px; height: 50px}
.goodsinfo ul li .goodsimg .img img{width: 100%; border-radius: 3px}
.goodsinfo ul li .goodsimg .goodsnum{ position: absolute; top:-10px; right: -10px}
.goodsinfo ul li .goodsimg .goodsnum span{ display: inline-block;width: 20px; height: 20px;line-height: 20px; text-align: center; background:#543e53; color:#f6f6f4; border-radius: 100%}
.goodsinfo ul li .goodstext{ flex: 1.2; -webkit-flex: 1.2; padding-left: 20px}
.goodstext .goodsname{ color: #fff}
.preadd{ padding: 0 3px;}
.goodsprice,.mtotal{ text-align: right}
.goodsprice span,.paycolor span{ color:#dba018 }
.addr{text-overflow:ellipsis;;white-space: nowrap; overflow:hidden}
.payinfo{ padding: 10px 0}
.payinfo ul li{ display: flex; display: -webkit-flex; padding: 5px 0;}
.payinfo ul li>div{ flex: 1; -webkit-flex: 1}
.payinfo ul li>div:last-child{text-align: right}
.c_w{ color: #fff;}
.btborder{ margin-top:10px;border-top: 1px solid #523f52}
.orderstatusbar{ position: absolute; right: 30px; top:30px;}
.orderstatusbar>div{width: 200px;}
.orderstatusbar>div>span{ display: block;height: 36px; line-height: 36px; text-align: center; color: #fff; border-radius: 3px;}
.deliverItem{ width: 100%;}
.deliverItem ul li{ display: flex; display: -webkit-flex; color: #fff; padding: 0 10px; border-top: 1px solid #34203b; border-radius: 3px; height: 36px;  align-items: center;-webkit-align-items: center}
.deliverItem ul li .itemtitle{ min-width: 60px}
.deliverItem ul li input{font-size:12px; outline:none;border: none; background: none; color: #fff;width: 100%}

.deliverItem ul li input::-webkit-input-placeholder{  color:#fff;}
.deliverItem ul li .itemcontent{ flex: 1.5}
.deliverItem ul li.savebtn>div{ text-align: center; display: block;width: 100%; cursor: pointer}


</style>
