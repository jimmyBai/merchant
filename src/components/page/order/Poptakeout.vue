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
            <div class="orderstatusbar">
              <div class="mainbtn" @click="ishow=!ishow">
                <span v-if="detailinfo.order_status!=1" :class="'btn-color-'+detailinfo.order_status" v-text="detailinfo.order_status_name"></span>
                <span v-if="detailinfo.order_status==1" :class="'btn-color-'+detailinfo.order_status">待接单</span>
              </div>
              <!--order_status==2 待派送   3派送中-->
              <div v-if="ishow">
                <div v-if="detailinfo.order_status==2||detailinfo.order_status==3" class="deliverItem">
                  <ul :class="'itemline-'+detailinfo.order_status">
                    <li>
                      <div class="itemtitle">
                        <span>配送员：</span>
                      </div>
                      <div class="itemcontent">
                        <span><input type="text" :disabled="detailinfo.order_status==3"  v-model="deliver_man" placeholder="填写配送员" /></span>
                      </div>
                    </li>
                    <li>
                      <div class="itemtitle">
                        <span>联系电话：</span>
                      </div>
                      <div class="itemcontent">
                        <span><input type="text" :disabled="detailinfo.order_status==3" v-model="delivery_phone" maxlength="11" placeholder="配送员电话" /></span>
                      </div>
                    </li>
                    <li>
                      <div class="itemtitle">
                        <span>配送时间：</span>
                      </div>
                      <div class="itemcontent timeline">
                        <el-time-select v-if="detailinfo.order_status==2" v-model="estimated_time" :editable="false" :picker-options="{ start: '00:05',step: '00:05',end: '02:30'}" placeholder="选择时间">
                        </el-time-select>
                        <span class="timeunit" v-if="detailinfo.order_status==2">分钟</span>
                        <span v-if="detailinfo.order_status==3" v-text="estimated_time"></span>
                      </div>
                    </li>
                    <!--配送的时候打印订单选项-->
                    <li v-if="detailinfo.order_status==2" class="printline">
                      <div class="itemtitle">
                        <span>订单打印：</span>
                      </div>
                      <div class="itemcontent">
                        <div @click="printCheck=!printCheck" class="printcheckbox">
                          <i class="checkIcon" :class="{'el-icon-check':printCheck}"></i>
                          <span>需要打印</span>
                        </div>
                      </div>
                    </li>
                    <li v-if="detailinfo.order_status==2">
                      <div class="itemtitle">
                        <span>设备：</span>
                      </div>
                      <div class="itemcontent">
                        <el-select v-model="printvalue" placeholder="请选择">
                          <el-option v-for="(item,index) in printList" :key="index" :label="item.remark" :value="item.sn">
                          </el-option>
                        </el-select>
                      </div>
                    </li>
                    <!--打印选项结束-->
                    <!--确认送达-->
                    <li class="smsline" v-if="detailinfo.order_status==3">
                      <div class="itemtitle">
                        <span><input type="tel" maxlength="6" v-model="code" placeholder="请输入验证码" /></span>
                      </div>
                      <div class="itemcontent" @click.stop="candotime&&sendSMS()">
                        <span ref="codetime">重新发送</span>
                      </div>
                    </li>
                    <li class="smslinetips" v-if="detailinfo.order_status==3">
                      <span>请输入客户收到的短信签收验证码</span>
                    </li>
                    <li class="savebtn">
                      <div @click="deliverfn">
                        <span v-if="detailinfo.order_status==2">保存并开始配送</span>
                        <span v-if="detailinfo.order_status==3">确认送达</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div v-if="detailinfo.order_status==1" class="deliverItem">
                  <ul :class="'itemline-'+detailinfo.order_status">
                    <li class="savebtn">
                      <div @click="orderFn(1)">
                        <span>确认接单</span>
                      </div>
                    </li>
                    <li class="savebtn">
                      <div @click="orderFn(0)">
                        <span>取消订单</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          <!---viewSTART-->
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
                <li style="margin-top: 10px;"><div class="content"><span>收货地址：</span><span class="addr" v-text="detailinfo.address"></span></div></li>
                <li><div class="title">商品数量</div></li>
                <li><div class="content"><span v-text="detailinfo.product_total_num"></span></div></li>
                <li><div class="title">下单评论</div></li>
                <li><div class="content"><span v-text="detailinfo.remark"></span></div></li>
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
                      <div class="goodsnum"><span v-text="item.num"></span></div>
                    </div>
                    <div class="goodstext">
                      <div class="goodsname"><span v-text="item.name"></span></div>
                      <div class="goodstips"><span v-text="item.weight+'KG'"></span></div>
                    </div>
                    <div class="goodtotalm">
                      <div class="goodsprice"><span v-text="(item.unit_price*item.num).toFixed(2)"></span></div>
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
                <div>平台服务费</div>
                <div><span v-text="detailinfo.service_fee"></span></div>
              </li>
              <li class="c_w">
                <div>商户实收金额</div>
                <div class="paycolor"><span v-text="(detailinfo.pay_amount-detailinfo.service_fee).toFixed(2)"></span></div>
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
import CryptoJS from 'crypto-js'
import {fetchPost} from '../../../../static/js/fetch.js';
  export default {
    name: 'addsrole',
    data () {
      return {
        msgtitle:"",
        detailinfo:"",
        productList:'',
        estimated_time:'',
        deliver_man:'',
        delivery_phone:'',
        ishow:false,
        printCheck:true,
        printvalue:'',
        printList:[],
        candotime:true,
        code:'',
          USER:"sheep@yottaspace.cn",//必填，飞鹅云 www.feieyun.cn后台注册的账号名
          UKEY:"hgfZmCRytUsZPese",//必填，飞鹅云后台注册账号后生成的UKEY
          STIME:new Date().getTime(),
          SIG:'',

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

      this.SIG = CryptoJS.SHA1(this.USER+this.UKEY+this.STIME).toString(CryptoJS.enc.Hex)
    },
    methods:{
      //订单打印
      printOrder(){
        let vm =this,url='/api/web/printer/printing',params={'sn':vm.printvalue,'order_sn':this.orderinfo.orderid};
        vm.$axios({
          method:'post',
          url:url,
          data: params
        }).then((res)=>{
          if(res.data.error_code=='0'){
              vm.$message({
                message: '订单打印成功！',
                type: 'success'
              });
          }else{
            vm.$message.error(res.data.message);
          }
        }).catch(err => {
            console.log(err);
        });
      },
      //获取打印机列表
      getprintList(){
        let vm =this,url='/api/web/printer/list',params={};
        vm.$axios.get(url,{params}).then((res)=>{
          if(res.data.error_code=='0'){
              vm.printList=res.data.data
          }else{
          }
        }).catch(err => {
            console.log(err);
        });
      },
      //发送确认收货验证码
      sendSMS(){
        let vm =this,url='/api/web/sms/send',params={'phone':vm.detailinfo.phone,'type':2,'others':{'order_sn':this.orderinfo.orderid}};
        this.candotime=false;
        vm.$axios({
          method:'post',
          url:url,
          data: params
        }).then((res)=>{
          if(res.data.error_code=='0'){
          vm.$message({
            message: '验证码已发送成功！',
            type: 'success'
          });
          vm.timeCut(60)
          if(window.location.href.indexOf('uat.')>=0||window.location.href.indexOf('dev.')>=0){
            vm.code='123456'
          }
          }else{
            vm.$message.error(res.data.message);
            vm.candotime=true;
          }
        }).catch(err => {
            console.log(err);
        });
      },
      //计时器
      timeCut:function(time){
        var srv = setInterval(()=>{
          if(time>=1){
            time--;
            this.$refs.codetime.innerText=time+'S';
          }else{
            this.candotime=true;
            this.$refs.codetime.innerText='重新获取';
            clearInterval(srv)
          }
        },1000)
      },
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
              if(vm.detailinfo.order_status!=2) {
                //获取配送员信息
                vm.deliver_man = vm.detailinfo.delivery_man
                vm.delivery_phone = vm.detailinfo.delivery_phone
                vm.estimated_time = vm.detailinfo.estimated_time
              }else if(vm.detailinfo.order_status==2){
                vm.estimated_time = ''
                //当订单状态为待派送的时候 获取打印机列表
                vm.getprintList()  //获取打印机列表
              }

            }
            vm.msgtitle=res.data.data.order_status_name
          }else{
            vm.$message.error(res.data.message);
            let data = {
              popstatus:false
            };
            //执行父组件方法
            this.$emit('sievent',data,'');
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
      //派送
      deliverfn(){
        let vm =this,url,params={};
        //判断是确认送达还是派送
        if(vm.detailinfo.order_status==3){
          if(!vm.code){
            vm.$message.error('请填写收货验证码！');
            return
          }
          url='/api/web/order/complete',
          params={
            'order_sn':vm.orderinfo.orderid,
            'code':vm.code
          };
        }else if(vm.detailinfo.order_status==2){
          //把配送时间转化为分钟
          let timesStr=0;
          if(this.estimated_time){
            let timearray=this.estimated_time.split(':');
            if(timearray[0]>0){
              timesStr+=timearray[0]*60
            }
            if(timearray[1]>0){
              timesStr+=timearray[1]*1
            }
          }
          url='/api/web/order/deliver',
          params={
            'order_sn':vm.orderinfo.orderid,
            'deliver_man':vm.deliver_man,
            'delivery_phone':vm.delivery_phone,
            'estimated_time':timesStr,
          };
          //配送信息必填
          if(!params.deliver_man||!params.delivery_phone||!params.estimated_time){
            vm.$message.error('请完善配送员信息！');
            return
          }
        }
        vm.$axios({
          method:'post',
          url:url,
          data: params
        }).then((res)=>{
          if(res.data.error_code=='0'){
            //如果选择了打印 打印机必须选择
            if(vm.printCheck){
              if(!vm.printvalue){
                vm.$message.error('请选择打印机！');
                return
              }
              vm.printOrder()
            }
            vm.$message({
              message: '操作成功！',
              type: 'success'
            });
            vm.geteditInfo()
            let data = {
              popstatus:true,
              status:'refresh'

            };
            //执行父组件方法
            this.$emit('sievent',data,'');

          }else{
            vm.$message.error(res.data.message);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      //接单取消订单操作
      orderFn(way){
        let vm =this,url,params={'order_sn':vm.orderinfo.orderid};
        if(way>0){
          url='/api/web/order/accept'
        }else{
          url='/api/web/order/cancel'
        }
        vm.$axios({
          method:'post',
          url:url,
          data: params
        }).then((res)=>{
          if(res.data.error_code=='0'){
            vm.$message({
              message: '操作成功！',
              type: 'success'
            });
            vm.geteditInfo()
            let data = {
              popstatus:true,
              status:'refresh'

            };
            //执行父组件方法
            this.$emit('sievent',data,'');

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
.deliverItem ul li .itemcontent{ flex: 1.5;-webkit-flex: 1.5}
.deliverItem ul li.savebtn>div{ text-align: center; display: block;width: 100%; cursor: pointer}

.deliverItem ul li .timeline{ display: flex; display: -webkit-flex; align-items: center;-webkit-align-items: center}
.deliverItem ul li .timeline .timeunit{ display: block;width: 30px}
/**确认送达提示**/
.deliverItem ul li.smsline>span{ display: block}
.deliverItem ul li.smsline>div{ flex: 1;-webkit-flex: 1}
.deliverItem ul li.smsline .itemtitle{ padding:0 10px}
.deliverItem ul li.smsline .itemcontent{width: 60px; text-align: center; display: block; height: 36px; line-height: 36px; cursor: pointer; background: #137161}
.deliverItem ul li.smslinetips{height: 18px; line-height: 18px; color: #fff; font-size: 11px; border-radius: 0 0 3px 3px; border-top: 1px solid #13463c}
.deliverItem ul li.smsline{ border-radius: 3px 3px 0 0;padding: 0}

/**打印**/
.printcheckbox{ display: flex;display:-webkit-flex; align-items: center;-webkit-align-items: center}
.checkIcon{ height: 12px;width: 12px; font-size: 12px; display: inline-block;content: ''; border-radius: 2px; border: 1px solid #fff; background: #b95e15}
.printcheckbox>span{ margin-left: 5px}
</style>
