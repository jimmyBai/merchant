<template>
  <div class="print">
    <ul>
      <li @click="addprint"><span>添加打印机</span></li>
      <li @click="delprint"><span>删除打印机</span></li>
      <li @click="printSataus"><span>查询打印机状态</span></li>
      <li @click="editprint"><span>修改打印机信息</span></li>
      <li @click="print"><span>打印订单</span></li>
      <li @click="celarprintOrder"><span>清空待打印订单</span></li>
      <li @click="orderSatus"><span>查询订单打印状态</span></li>
      <li @click="totalprint"><span>查询打印机订单数</span></li>
    </ul>
  </div>
</template>
<script>
import CryptoJS from 'crypto-js'
import {fetchPost} from '../../static/js/fetch.js';
export default {
  name: 'print',
  data () {
    return {
     USER:"sheep@yottaspace.cn",//必填，飞鹅云 www.feieyun.cn后台注册的账号名
     UKEY:"hgfZmCRytUsZPese",//必填，飞鹅云后台注册账号后生成的UKEY
     STIME:new Date().getTime(),
     SIG:'',
     orderid:'',
    }
  },
  mounted:function(){
    this.SIG = CryptoJS.SHA1(this.USER+this.UKEY+this.STIME).toString(CryptoJS.enc.Hex)

  },

  methods: {
    addprint() {
      let vm = this;
      let myobj = {
        user: vm.USER,//账号
        stime: vm.STIME,//当前时间的秒数，请求时间
        sig: vm.SIG,//签名
        apiname: "Open_printerAddlist",//不需要修改
        printerContent: '918503233#fcah7zdm'//添加的打印机信息
      };
      fetchPost({
        method: 'POST',
        url: 'http://api.feieyun.cn:80/Api/Open/',
        data: myobj,
        success: function (response) {
          console.log(response);
        }
      });
    },
    //打印订单
    print(){
      //调用接口获取打印数据
      var orderInfo;
      orderInfo = "<CB>测试打印</CB><BR>";//标题字体如需居中放大,就需要用标签套上
      orderInfo += "名称　　　　　 单价  数量 金额<BR>";
      orderInfo += "--------------------------------<BR>";
      orderInfo += "番　　　　　　 1.0    1   1.0<BR>";
      orderInfo += "番茄　　　　　 10.0   10  10.0<BR>";
      orderInfo += "番茄炒　　　　 10.0   100 100.0<BR>";
      orderInfo += "番茄炒粉　　　 100.0  100 100.0<BR>";
      orderInfo += "番茄炒粉粉　　 1000.0 1   100.0<BR>";
      orderInfo += "番茄炒粉粉粉粉 100.0  100 100.0<BR>";
      orderInfo += "番茄炒粉粉粉粉 15.0   1   15.0<BR>";
      orderInfo += "备注：快点送到xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<BR>";
      orderInfo += "--------------------------------<BR>";
      orderInfo += "合计：xx.0元<BR>";
      orderInfo += "送货地点：xxxxxxxxxxxxxxxxx<BR>";
      orderInfo += "联系电话：138000000000<BR>";
      orderInfo += "订餐时间：2011-01-06 19:30:10<BR><BR>";
      orderInfo += "----------请扫描二维码----------";
      orderInfo += "<QR>http://www.dzist.com</QR>";//把二维码字符串用标签套上即可自动生成二维码
      orderInfo += "<CUT>";//把二维码字符串用标签套上即可自动生成二维码
      let vm = this;
      let myobj = {
        user: vm.USER,//账号
        stime: vm.STIME,//当前时间的秒数，请求时间
        sig: vm.SIG,//签名
        apiname: "Open_printMsg",
        sn: '918503233',
        content:orderInfo
      };
      fetchPost({
        method: 'POST',
        url: 'http://api.feieyun.cn:80/Api/Open/',
        data: myobj,
        success: function (response) {
          console.log(response);
        }
      });
    },
    //查询打印机状态
    printSataus(){
      let vm = this;
      let myobj = {
        user: vm.USER,//账号
        stime: vm.STIME,//当前时间的秒数，请求时间
        sig: vm.SIG,//签名
        apiname: "Open_queryPrinterStatus",//不需要修改
        sn: '918503233'//
      };
      fetchPost({
        method: 'POST',
        url: 'http://api.feieyun.cn:80/Api/Open/',
        data: myobj,
        success: function (response) {
          alert(33333333)
          console.log(response);
        }
      });
    },
    //删除打印机
    delprint(){
      let vm = this;
      let myobj = {
        user: vm.USER,//账号
        stime: vm.STIME,//当前时间的秒数，请求时间
        sig: vm.SIG,//签名
        apiname: "Open_printerDelList",//不需要修改
        snlist: '918503233'//
      };
      fetchPost({
        method: 'POST',
        url: 'http://api.feieyun.cn:80/Api/Open/',
        data: myobj,
        success: function (response) {
          console.log(response);
        }
      });
    },
    //修改打印机
    editprint(){
      let vm = this;
      let myobj = {
        user: vm.USER,//账号
        stime: vm.STIME,//当前时间的秒数，请求时间
        sig: vm.SIG,//签名
        apiname: "Open_printerEdit",//不需要修改
        sn: '918503233'//
      };
      fetchPost({
        method: 'POST',
        url: 'http://api.feieyun.cn:80/Api/Open/',
        data: myobj,
        success: function (response) {
          console.log(response);
        }
      });
    },
    //清空打印订单
    celarprintOrder(){
      let vm = this;
      let myobj = {
        user: vm.USER,//账号
        stime: vm.STIME,//当前时间的秒数，请求时间
        sig: vm.SIG,//签名
        apiname: "Open_delPrinterSqs",//不需要修改
        sn: '918503233'//
      };
      fetchPost({
        method: 'POST',
        url: 'http://api.feieyun.cn:80/Api/Open/',
        data: myobj,
        success: function (response) {
          console.log(response);
        }
      });
    },
    //查询订单打印状态
    orderSatus(){
      let vm = this;
      let myobj = {
        user: vm.USER,//账号
        stime: vm.STIME,//当前时间的秒数，请求时间
        sig: vm.SIG,//签名
        apiname: "Open_queryOrderState",//不需要修改
        orderid: vm.orderid//
      };
      fetchPost({
        method: 'POST',
        url: 'http://api.feieyun.cn:80/Api/Open/',
        data: myobj,
        callback: 'cb',
        success: function (response) {
          console.log(response);
        }
      });
    },
    //查询打印订单数据
    totalprint(){
      let vm = this;
      let y = new Date().getFullYear();
      let m=new Date().getMonth()/1+1;
      let d=new Date().getDate();
      if(m<10){m='0'+m}
      if(d<10){m='0'+d}
      let myobj = {
        user: vm.USER,//账号
        stime: vm.STIME,//当前时间的秒数，请求时间
        sig: vm.SIG,//签名
        apiname: "Open_queryOrderInfoByDate",//不需要修改
        sn: '918503233',
        date:y+'-'+m+'-'+d
      };
      fetchPost({
        method: 'POST',
        url: 'http://api.feieyun.cn:80/Api/Open/',
        dataType:'jsonp',
        data: myobj,
        jsonp: "jsonpCallback",//服务端用于接收callback调用的function名的参数
        success: function (response) {
          console.log(response);
        }
      });
    }
  }
}
</script>

<style scoped>
ul ,li{ margin:0;padding: 0; list-style: none; text-align: center; width: 100%;}
li>span{ display: block; width: 60%; text-align: center; margin:10px auto; font-size: 12px; color:#fff; background: #67c23a; height: 36px; line-height: 36px; border-radius: 3px; cursor: pointer; }
</style>
