<template>
  <div class="myinfobox">
    <div class="memberboxhead">
      <div class="memberimg">
        <img src="../../../static/img/membertopimg.png" />
      </div>
      <div class="memberphoto">
        <input type="file" class="myfile" @change="changeImg" accept=".gif,.jpg,.jpeg,.png">
        <img v-if="ListData.head_portrait&&ListData.head_portrait.replace(/\s/,'')" :src="ListData.head_portrait" />
        <img v-else src="../../../static/img/membericon.png" />
      </div>
    </div>
    <div class="memberboxcontent">
      <el-row>
        <el-col :span="10" class="left">
          <div class="nameline">
            <span class="name" v-text="ListData.username"></span>
           <!-- <span class="line">|</span>
            <span class="duty">总经理</span>-->
          </div>
          <div class="userinfo memberviewinfo">
            <ul>
              <li>
                <i class="i-time"></i>
                <span>创建时间：</span>
                <span v-text="ListData.create_time"></span>
              </li>
              <li>
                <i class="i-realname"></i>
                <span>真实姓名：</span>
                <span v-text="ListData.real_name"></span>
              </li>
              <li>
                <i class="i-nikename"></i>
                <span>用户名：</span>
                <span v-text="ListData.role_name"></span>
              </li>
              <li>
                <i class="i-phone"></i>
                <span>联系电话：</span>
                <span v-text="ListData.phone"></span>
              </li>
              <li>
                <i class="i-email"></i>
                <span>邮箱：</span>
                <span v-text="ListData.email"></span>
              </li>
            </ul>
          </div>

          <!-- 新增二维码 _Andy -->
          <div class="twocode">
            <span class="title">二维码</span>
            <span class="prompt">顾客将通过扫描二维码进行小费支付</span>

            <!-- 显示二维码 -->
            <div class="response" v-show="isqrcodeShow">
              <div id="qrcode" class="qrcode"></div>
              <img  :src="qrurl"/>
            </div>
            <input type="button" v-if="!isqrcodeShow" value="点击生成二维码" @click="commontwocode('1')">
            <input type="button" v-if="isqrcodeShow" value="点击下载" @click="commontwocode('2')">
            <input type="button" v-if="isqrcodeShow&&ListData.tip_status==1" value="删除" @click="commontwocode('3')">
          </div>
        </el-col>
        <el-col :span="14" class="bright">
          <!--<div class="moneyline">
            <div class="rhead">
              <i class="mtitle"></i>
              <span>我的余额</span>
            </div>
            <div class="mcontent">
              <div class="flexbox">
                <div>
                  <i class="part1"></i>
                  <span>我的提成</span>
                </div>
                <div>
                  <i class="part2"></i>
                  <span>我的小费</span>
                </div>
                <div>
                  <i class="part3"></i>
                  <span>我的收入</span>
                </div>
              </div>
            </div>
          </div>
          <div class="dutyline">
            <div class="rhead">
              <i class="dtitle"></i>
              <span>我的部门</span>
            </div>
            <div class="mcontent">
              <div class="group">
                <span>总经办-行政部-总经理</span>
              </div>
            </div>
          </div>-->

          <div class="databox">
            <div class="title">
              <span><img src="../../../static/img/tiptitle.png" />实时数据</span>
            </div>
            <div class="content">

              <div class="tipimgshow">
                <div class="imgleft">
                  <div class="insideleft">
                    <img src="../../../static/img/tipone.png" alt="">
                  </div>
                  <div class="insideright">
                    <span v-text="'¥'+statistics.amount" class="apcolor"></span>
                    <span>总小费金额</span>
                  </div>
                </div>
                <div class="imgright">
                  <div class="insideleft protect">
                    <img src="../../../static/img/tipthree.png" alt="">
                  </div>
                  <div class="insideright protectnum">
                    <span v-text="statistics.paid" class="apcolor"></span>
                    <span>支付人次</span>
                  </div>
                </div>
              </div>
              <div class="tiplist">
                <div class="tiptitle">
                  <span class="tipspan">我的小费</span>
                  <input type="text" v-model="search.content" placeholder="请输入手机号/用户名/管理员名称" />
                  <span class="search-icon" @click="searchlist"><i class="el-icon-search"></i></span>
                </div>
                <el-table stripe :data="reListData">
                  <el-table-column width="120"  prop="username" label="用户名"></el-table-column>
                  <!--<el-table-column prop="phone" label="手机号码"></el-table-column>-->
                  <el-table-column width="100" prop="amount" label="小费金额"></el-table-column>
                  <el-table-column width="100" prop="payment" label="支付方式"></el-table-column>
                  <el-table-column prop="pay_time" label="支付时间"></el-table-column>
                </el-table>
              </div>

            </div>
          </div>
          <!-- 分页 -->
          <div class="pagination">
            <el-pagination v-if="total_page"  @size-change="" @current-change="handleCurrentChange" :page-size="per_page" background small layout="prev, pager, next" :total="total"> </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>


    <!-- 拍照/上传 -->
    <div class="dialogbox" v-if="isdialogShow">
      <div class="dialoglist">
        <span class="photography" @click="changeImg('1')">拍照</span>
        <span class="upload" @click="changeImg('2')">本地上传</span>
      </div>
      <div class="dialoglist2">
        <span class="cancel" @click="isdialogShow=!isdialogShow">取消</span>
      </div>
    </div>


    <!-- 遮罩层 -->
    <div class="mask" v-if="isdialogShow" @click="isdialogShow=!isdialogShow"></div>

  </div>
</template>

<script>
import "../../../static/css/newStyle.css"
import $ from 'jquery'
import "../../../static/js/jquery.qrcode.js"
export default {
  name: 'myinfo',
  data () {
    return {
      ListData:[],
      reListData:[],
      isdialogShow: false,
      isqrcodeShow: false,
      page: "1", //页码，默认为1
      length: "10", //每页记录数，默认为10
      page:0,
      per_page:0,
      total:0,
      total_page:0,
      search:{
        uid: "",
        content: "",
        amount_max: "", //最大值
        amount_min: "", //最小值
        start_time: "", //开始时间
        end_time: "" //结束时间
      },
      statistics: '',
      canvasQr:'',
      qrurl:''
    }
  },
  created(){

  },
  computed:{
    userName(){
      return this.$store.state.username
    },
    browser(){
      var u = navigator.userAgent, app = navigator.appVersion;
      return {
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), /*是否为移动终端*/
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), /*ios终端*/
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, /*android终端或者uc浏览器*/
        iPhone: u.indexOf('iPhone') > -1 , /*是否为iPhone或者QQHD浏览器*/
        iPad: u.indexOf('iPad') > -1, /*是否iPad*/
        weixin: u.toLowerCase().indexOf('micromessenger') > -1 /*是否是微信*/
      };
    }
  },
  mounted:function(){
    this.getlistData()
    this.gettipData()
  },
  methods:{
    setQrcode(){
      let vm =this;
      vm.canvasQr=''
      vm.canvasQr=$('#qrcode').qrcode({
        render: "canvas",
        text: vm.$store.state.uid.toString(),
        width: "160", //二维码的宽度
        height: "160", //二维码的高度
        background: "#ffffff", //二维码的后景色
        foreground: "#4c3d7b", //二维码的前景色
        correctLevel: 3, //纠错等级
        src: '../../../static/img/018Logo.png', //二维码中间的图片
      }).hide();
      setTimeout(function(){
        vm.canvasToImage()
      },200)
    },
    // 获取小费记录数据
    gettipData(){
      this.reListData = []
      this.statistics = {'amount':0,'paid':0}
      let vm=this,url='/api/web/tip/list',params={
        page: vm.page,
        length: vm.length,
        search:{
          uid: vm.$store.state.uid,
          content: vm.search.content
        }
      };
      vm.$axios({
        method:'post',
        url:url,
        data:params
      }).then((res)=>{
        if(res.data.error_code=='0'){
          if(res.data.data.list){
            vm.reListData=res.data.data.list
            vm.statistics=res.data.data.statistics
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
    //选择头像图片
    changeImg(){
      let vm=this,imgobj=event.target.files[0], maxSize=1024*300, maxWidth=200,maxHeight=200;
      if(imgobj.size>maxSize){
        vm.$message.error('请上传小于300kb的图片');
        return
      }
      var reader = new FileReader();
      reader.onload = function (e) {
        //加载图片获取图片真实宽度和高度
        var image = new Image()
        image.src = e.target.result;
        image.onload=function(){
          if((image.width/image.height).toFixed(2)==(maxWidth/maxHeight).toFixed(2)){
            imgobj={img:e.target.result}
            vm.ListData.head_portrait=imgobj.img
            vm.imgupload(imgobj.img)
          }else{
            vm.$message.error('请上传200*200像素或等比图片！');
          }
        };
      };
      reader.readAsDataURL(imgobj);
    },
    //上传图片
    imgupload(img){
      let vm =this,imgarray=[img],url='/api/web/setting/upload',params={type:5,files:imgarray};
      vm.$axios({
        method:'post',
        url:url,
        data: params
      }).then((res)=>{
        if(res.data.error_code=='0'){
          if(res.data.data&&res.data.data.length>0){
            vm.ListData.head_portrait=res.data.data[0]
            vm.setImg(vm.ListData.head_portrait)
          }
        }else{
          vm.$message.error(res.data.message);

        }
      }).catch(err => {
          console.log(err);
      });
    },
    //更改图片
    setImg(img){
      let vm =this,url='/api/web/my/change-head-portrait',params={head_portrait:img};
      vm.$axios({
        method:'post',
        url:url,
        data: params
      }).then((res)=>{
        if(res.data.error_code=='0'){
          vm.$message({
            message: '头像修改成功！',
            type: 'success'
          });
        }else{
            vm.$message.error(res.data.message);
        }
      }).catch(err => {
          console.log(err);
      });
    },
    getlistData(){
      let vm =this,url='/api/web/authority/user/info',params={'id':''};
      vm.$axios.get(url,{params}).then((res)=>{
        if(res.data.error_code=='0'){
          vm.ListData=res.data.data
          /*if(vm.ListData.tip_status){
            vm.setQrcode()
          }*/
        }else{
          vm.$message.error(res.data.message);
        }
      }).catch(err => {
        vm.$message.error(err);
      });
    },
    //二维码生成图片
    canvasToImage(){
     let vm=this;
      vm.qrurl=this.canvasQr.find('canvas').get(0).toDataURL("image/png")
    },
    //下载二维码
    downQr(){
      let vm=this;
      if(vm.browser.mobile){
        this.$message({
          message: '请长按二维码下载',
          type: 'success'
        });
      }else{
        var a = document.createElement('a')
        var event = new MouseEvent('click')
        a.download =this.ListData.username||this.ListData.phone
        // 将生成的URL设置为a.href属性
        a.href = vm.qrurl
        // 触发a的单击事件
        a.dispatchEvent(event)
        this.$message({
          message: '二维码已保存',
          type: 'success'
        });
      }
    },
    // 生成二维码
    commontwocode(way){
      let vm = this;
      //如果 tip_status==0 不能生成二维码
      if(vm.ListData.tip_status&&vm.ListData.tip_status==1){
        if(way==1){
          vm.setQrcode()
          vm.isqrcodeShow = true
        }else if(way==2){
          this.downQr()
        }else{
          vm.isqrcodeShow = false
        }
      }else{
        vm.$message.error('您还没有设置小费，请先设置小费');
      }
    },
    // 分页
    handleCurrentChange(val){
      this.page=val
      this.gettipData();
    },
    // 搜索
    searchlist(){
      this.gettipData()
    }
  }
}
</script>
<style scoped>
input.myfile{ z-index: 8; opacity: 0; width: 100%; height: 100%; margin: 0;padding: 0; position: absolute; left: 0; top: 0; border: none}
.memberboxhead{ background:#462747;  margin: 0 auto; position: relative; z-index: 2 }
.memberboxhead .memberimg{ padding: 20px 0; height: 155px; margin: 0 auto; text-align: center}
.memberboxhead .memberimg img{height: 100%; background-size: cover}
.memberphoto{ position: absolute; height: 130px; width: 130px; bottom: -25px; left: 50px}
.memberphoto img { width: 100%; background-size: cover;border-radius: 100%}
.nameline{ text-align: center; height: 50px; line-height: 50px}
.nameline .name{ font-size: 24px;}
.nameline .line{ margin: 0 5px}
.memberboxcontent{ margin-top: 10px;}
.memberboxcontent .el-row{ padding: 10px 0}
.memberviewinfo{border-bottom: 1px solid #48344d; padding: 20px 0}
.memberviewinfo ul{ width: 240px; margin: 0 auto; }
.memberviewinfo ul li{ border: none; height: 40px; line-height: 40px}
.moneyline { margin-top: 15px; margin-bottom: 20px}
.rhead{ font-size: 14px; padding: 0 20px; display: flex; display: -webkit-flex; align-items: center; -webkit-align-items: center; background:#331f3a; height: 36px; line-height: 36px; }
.bright{ padding: 0 30px}
.mcontent{ background: #462747;}
.rhead i{ margin-right: 5px; background: url("../../../static/img/memberticon.png") no-repeat; width: 20px; height: 20px; display: inline-block; background-size: cover; content:'';}
i.mtitle{ background-position: 0 0px;}
i.dtitle{ background-position: 0px -20px;}
.mcontent>div{ padding: 20px}
.flexbox{ display: flex; display: -webkit-flex; align-items: center}
.flexbox>div{ flex: 1; -webkit-flex: 1; text-align: center; display: flex;display: -webkit-flex; align-items: center;-webkit-align-items: center}
.flexbox>div i{background: url("../../../static/img/memberinfoicon.png") no-repeat; width: 80px; height: 80px; display: inline-block; background-size: cover; content:'';}
.flexbox>div i.part1{background-position: 0 0px;}
.flexbox>div i.part2{background-position: 0 -80px;}
.flexbox>div i.part3{background-position: 0 -160px;}
.group { font-size: 16px; text-align: center}


.twocode{ margin-top: 10px;text-align: center;}
.twocode .title{ display: block;  color: #aa96b1; font-size: 16px;}
.twocode .prompt{ display: block; margin-top: 5px; font-size: 12px;}
.twocode input{ cursor: pointer; background: #ac5397; height: 40px; line-height: 40px; color: #fff; display: inline-block; width: 200px; text-align: center; border: 0; font-size: 12px; margin-top: 20px; -webkit-appearance: none;}
.databox{}
.databox .title{ width: 100%;  height: 40px; line-height: 40px; margin-top: 20px; background: #331f3a; position: relative;}
.databox .title img{ width: 20px; position: absolute; top: 50%; left: 20px; transform: translateY(-50%);}
.databox .title span{ margin-left: 50px;}
.tipimgshow{ width: 100%; height: 100px; background: #462747; position: relative;}
.imgleft{ width: 40%; height: 100px; float: left;}
.imgright{ width: 60%; height: 100px; float: left;}
.insideleft{ width: 50%; float: left; text-align: center; position: relative; top: 50%; transform: translateY(-50%);}
.protect{ width: 30%;}
.insideleft img{ width: 60px; float: right; padding-right: 10px;}
.insideright{ width: 50%; float: right; position: relative; top: 50%; transform: translateY(-50%);}
.protectnum{ width: 70%;}
.insideright span{ display: block;}
.tiplist{ height: auto;  background: #462747;  padding: 0 20px;  padding-bottom: 20px;}
.tiplist .tiptitle{ width: 100%;}
.tipspan{  color: #f8e2ff;}
.tiptitle input{ border-radius: 1px;  background: none;  padding: 3px;  border: 1px solid #48344e;  background: #2e1c34;  height: 18px;  line-height: 18px;  text-indent: 5px;  color: #f8e2ff;  width: 150px;  margin-left: 10px;  -webkit-appearance: none;}
.search-icon{ cursor: pointer; border-radius: 1px; border: 1px solid #48344e;  padding: 3px;  height: 18px;  display: inline-block; width: 18px; text-align: center; position: relative; top: 1px;}
.search-icon{ line-height: 18px;}
::-webkit-input-placeholder{　font-size: 12px;}
:-moz-placeholder{　font-size: 12px;}
::-moz-placeholder{　font-size: 12px;}
:-ms-input-placeholder{　font-size: 12px;}
/* dialog --拍照/上传 */
.dialogbox{ position: fixed; top: 0; left: 0; right: 0; bottom: 0; margin: auto; width: 300px; height: 147px; z-index: 100;}
.dialoglist{ width: 100%; height: 102px;}
.photography{ display: block; width: 100%; height: 50px; line-height: 50px; background: #331f3a; color: #ffffff;  text-align: center;  border-top-left-radius: 10px;  border-top-right-radius: 10px;}
.upload{ display: block;  width: 100%;  height: 50px; line-height: 50px; background: #331f3a; color: #ffffff; text-align: center;  margin-top: 2px;  border-bottom-left-radius: 10px;  border-bottom-right-radius: 10px;}
.dialoglist2{ width: 100%;  height: 40px;  border-radius: 5px;}
.cancel{ display: block; width: 100%; height: 40px; line-height: 40px; background: #331f3a; color: #ac5397;  text-align: center; margin-top: 5px;  border-radius: 10px;}

/* dialog --保存二维码 */
.dialogsave{ position: fixed; top: 0; left: 0; right: 0;  bottom: 0;  margin: auto;
  width: 300px;  height: 40px;  line-height: 40px;  text-align: center;  background: #ffffff;  border-radius: 10px; z-index: 100; color: #2e1c34;  font-size: 16px;}
/* dialog --遮罩层 */
.mask{ position: fixed; top: 0; bottom: 0; left: 0;  right: 0; text-align: center; background: #000;  opacity: 0.5;  z-index: 99;}
.response{ width: 100%; height: 168px; text-align: center; margin-top: 15px; display: flex; display: -webkit-flex;-webkit-align-content: center; justify-content: center;}
.qrcode{ width: 164px; height: 162px; background: #ffffff; padding-top: 2px;}
.apcolor{ color: #ffffff;}

</style>
