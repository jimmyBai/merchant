<template>
  <div>
    <div class="el-message-box__wrapper">
      <div class="el-message-box">
        <div class="message-box_header">
          <div class="message-box_title"><span v-text='msgtitle'></span></div>
          <div class="message-box_closebtn" @click="closepop"><i class="el-icon-circle-close-outline"></i></div>
        </div>
        <div class="message-box_content">
            <!--订单状态操作-->
            <div class="orderstatusbar"></div>
            <div class="baseinfo">
              <dl>
                <dt>订单金额</dt>
                <dd class="money"><span v-text="'¥'+detailinfo.total_amount"></span></dd>
                <dd class="reson" v-if="detailinfo.cancel_reason"><span v-text="detailinfo.cancel_reason"></span></dd>
              </dl>
            </div>
            <div class="orderinfo">
              <ul>
                <li><div class="title">订单编号</div></li>
                <li><div class="content"><span v-text="detailinfo.order_sn"></span></div></li>
                <li><div class="title">收货人信息</div></li>
                <li><div class="content"><span>收货人：</span><span v-text="detailinfo.consignee"></span><span v-text="detailinfo.phone"></span></div></li>
                <li><div class="content"><span>收货地址：</span><span class="addr" v-text="detailinfo.address"></span></div></li>
                <li><div class="title">商品数量</div></li>
                <li><div class="content"><span v-text="detailinfo.product_total_num"></span></div></li>
              </ul>
            </div>
            <div class="goodsinfo">
                <div class="goodstitle">商品信息</div>
                <ul>
                  <li v-for="item in productList">
                    <div class="goodsimg">
                      <div class="img">
                        <img src="../../../../static/img/goodsimg.jpg" />
                      </div>
                      <div class="goodsnum"><span v-text="item.num">2</span></div>
                    </div>
                    <div class="goodstext">
                      <div class="goodsname"><span v-text="item.name"></span></div>
                      <div class="goodstips"><span v-text="item.weight+'KG'"></span></div>
                    </div>
                    <div class="goodtotalm">
                      <div class="goodsprice"><span v-text="item.unit_price"></span></div>
                      <div class="mtotal"><span v-text="item.unit_price"></span><span class="preadd">X</span><span v-text="item.num"></span></div>
                    </div>
                  </li>
                </ul>
            </div>
          <div class="payinfo">
            <div class="paytitle">付款信息</div>
            <ul>
              <li class="c_w">
                <div>小计</div>
                <div><span v-text="detailinfo.subtotal_amount"></span></div>
              </li>
              <li class="c_w">
                <div>配送</div>
                <div><span v-text="detailinfo.delivery_fee"></span></div>
              </li>
              <li class="s_w">
                <div>折扣</div>
                <div><span v-text="detailinfo.discount_amount"></span></div>
              </li>
              <li class="c_w">
                <div>支付金额</div>
                <div class="paycolor"><span v-text="detailinfo.pay_amount"></span></div>
              </li>
              <li class="c_w btborder">
                <div>支付方式</div>
                <div><span v-text="detailinfo.payment_method_name"></span></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="v-modal" tabindex="0" style="z-index: 99;"></div>
  </div>
</template>

<script>
  export default {
    name: 'addsrole',
    data () {
      return {
        msgtitle:"",
        detailinfo:"",
        productList:''
      }
    },
    props: {
      orderinfo: Object
    },
    created(){

    },
    mounted:function(){
      this.msgtitle=this.orderinfo.title
      this.geteditInfo()
    },
    methods:{
      //获取修改信息
      geteditInfo(){
        let vm =this,url='/api/web/order/detail',params={'order_sn':this.orderinfo.orderid};
        vm.$axios({
          method:'post',
          url:url,
          data: params
        }).then((res)=>{
          if(res.data.error_code=='0'){
            if(res.data.data){
              vm.detailinfo=res.data.data
              vm.productList=vm.detailinfo.products
            }
            vm.msgtitle=res.data.data.order_status_name
          }else{
            vm.$message.error(res.data.message);

          }
        }).catch(err => {
          console.log(err);
        });
      },
      closepop(){
        let data = {
          popstatus:false
        };
        //执行父组件方法
        this.$emit('sievent',data,'');
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
.message-box_content{ padding: 20px 30px; font-size: 12px;}
.baseinfo dl{ text-align: left}
.baseinfo dl{ margin-bottom: 10px;}
.baseinfo dl dt{ margin-bottom: 5px}
.el-message-box{ width: 500px}
.money{ color: #fff; font-size: 18px;}
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
</style>
