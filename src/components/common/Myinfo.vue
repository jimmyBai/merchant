<template>
  <div class="myinfobox">
    <div class="memberboxhead">
      <div class="memberimg">
        <img src="../../../static/img/membertopimg.png" />
      </div>
      <div class="memberphoto">
        <img src="../../../static/img/membericon.png" />
      </div>
    </div>
    <div class="memberboxcontent">
      <el-row>
        <el-col :span="10" class="left">
          <div class="nameline">
            <span class="name" v-text="ListData.username"></span>
            <!--<span class="line">|</span>
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
            <!-- <span>二维码show</span> -->
            <input type="button" value="点击生成二维码" @click="clickopencode">
            <!-- <input type="button" value="点击下载" @click="clickdlcode"> -->
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
                    <img class="phoneimg" src="../../../static/img/tipone.png" alt="">
                  </div>
                  <div class="insideright">
                    <span>0.00</span>
                    <span>总小费金额</span>
                  </div>
                </div>
                <div class="imgright">
                  <div class="insideleft protect">
                    <img src="../../../static/img/tipthree.png" alt="">
                  </div>
                  <div class="insideright protectnum">
                    <span>0.00</span>
                    <span>支付人数</span>
                  </div>
                </div>
              </div>
              <div class="tiplist">
                <div class="tiptitle">
                  <span>我的小费</span>
                  <input type="text" placeholder="请输入手机号/金额" />
                  <span class="search-icon"><i class="el-icon-search"></i></span>
                </div>
                <el-table stripe :data="reListData">
                  <el-table-column prop="" label="用户名"></el-table-column>
                  <el-table-column prop="" label="手机号码"></el-table-column>
                  <el-table-column prop="" label="小费金额"></el-table-column>
                  <el-table-column prop="" label="支付方式"></el-table-column>
                  <el-table-column prop="" label="支付时间"></el-table-column>
                </el-table>
              </div>
              
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 拍照/上传 -->
    <div class="dialogbox" v-if="isdialogShow">
      <div class="dialoglist">
        <span class="photography">拍照</span>
        <span class="upload">本地上传</span>
      </div>
      <div class="dialoglist2">
        <span class="cancel">取消</span>
      </div>
    </div>

    <!-- 保存 -->
    <div class="dialogsave" v-if="isdialogShow2">
      <span>已保存到系统相册</span>
    </div>

    <!-- 遮罩层 -->
    <div class="mask" v-if="ismaskShow" @click="clickdownMask"></div>

  </div>
</template>

<script>
import "../../../static/css/newStyle.css"

  export default {
    name: 'myinfo',
    data () {
      return {
        ListData:[],
        reListData:[],
        isdialogShow: false,
        isdialogShow2: false,
        ismaskShow: false
      }
    },
    created(){

    },
    mounted:function(){
      this.getlistData()
    },
    methods:{
      getlistData(){
        let vm =this,url='/api/web/authority/user/info',params={'id':''};
        vm.$axios.get(url,{params}).then((res)=>{
          if(res.data.error_code=='0'){
            vm.ListData=res.data.data
          }else{
            vm.$message.error(res.data.message);
            console.log(res.data.message)
          }
        }).catch(err => {
          vm.$message.error(err);
        });
      },
      clickopencode(){
        let vm = this;
        vm.isdialogShow = true;
        vm.ismaskShow = true;
      },
      clickdlcode(){
        let vm = this;
        vm.isdialogShow2 = true;
        vm.ismaskShow = true;
      },
      clickdownMask(){
        let vm = this;
        vm.isdialogShow = false;
        vm.isdialogShow2 = false;
        vm.ismaskShow = false;
      }
    }
  }
</script>
<style scoped>
.memberboxhead{ background:#462747;  margin: 0 auto; position: relative; z-index: 2 }
.memberboxhead .memberimg{ padding: 20px 0; height: 155px; margin: 0 auto; text-align: center}
.memberboxhead .memberimg img{height: 100%; background-size: cover}
.memberphoto{ position: absolute; height: 130px; width: 130px; bottom: -25px; left: 50px}
.memberphoto img { width: 100%; background-size: cover}
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


.twocode{
  margin-top: 10px;
  text-align: center;
}
.twocode .title{
  display: block;
  color: #ffffff;
  font-size: 16px;
}
.twocode .prompt{
  display: block;
  margin-top: 5px;
  font-size: 12px;
}
.twocode input{
  cursor: pointer;
  background: #ac5397;
  height: 40px;
  line-height: 40px;
  color: #fff;
  display: inline-block;
  width: 200px;
  text-align: center;
  border: 0;
  font-size: 12px;
  margin-top: 30px;
  -webkit-appearance: none;
}

.databox{

}
.databox .title{
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin-top: 20px;
  background: #331f3a;
  position: relative;
}
.databox .title img{
  width: 20px;
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
}
.databox .title span{
  margin-left: 50px;
}

.tipimgshow{
  width: 100%;
  height: 100px;
  background: #462747;
  position: relative;
}
.imgleft{
  width: 30%;
  height: 100px;
  float: left;
}
.imgright{
  width: 70%;
  height: 100px;
  float: left;
}
.insideleft{
  width: 50%;
  float: left;
  text-align: center;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.protect{
  width: 20%;
}
.insideleft img{
  width: 30px;
  float: right;
  padding-right: 10px;
}
.phoneimg{
  width: 25px!important;
  float: right;
  padding-right: 10px;
}
.insideright{
  width: 50%;
  float: right;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.protectnum{
  width: 80%;
}
.insideright span{
  display: block;
}

.tiplist{
  height: auto;
  background: #462747;
  padding: 0 20px;
}
.tiplist .tiptitle{
  width: 100%;

}
.tiptitle input{
  border-radius: 1px;
  background: none;
  padding: 3px;
  border: 1px solid #48344e;
  height: 18px;
  line-height: 18px;
  text-indent: 5px;
  color: #f8e2ff;
  width: 150px;
  margin-left: 10px;
  -webkit-appearance: none;
}
.search-icon{
  cursor: pointer;
  border-radius: 1px;
  border: 1px solid #48344e;
  padding: 3px;
  height: 18px;
  display: inline-block;
  width: 18px;
  text-align: center;
  position: relative;
  top: 1px;
}
.search-icon{
  line-height: 18px;
  margin-bottom: 5px;
}


::-webkit-input-placeholder{
　font-size: 12px;
}
:-moz-placeholder{
　font-size: 12px;
}
::-moz-placeholder{
　font-size: 12px;
}
:-ms-input-placeholder{
　font-size: 12px;
}


/* dialog --拍照/上传 */
.dialogbox{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 300px;
  height: 147px;
  z-index: 100;
}
.dialoglist{
  width: 100%;
  height: 102px;
}
.photography{
  display: block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #331f3a;
  color: #ffffff;
  text-align: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.upload{
  display: block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #331f3a;
  color: #ffffff;
  text-align: center;
  margin-top: 2px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.dialoglist2{
  width: 100%;
  height: 40px;
  border-radius: 5px;
}
.cancel{
  display: block;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: #331f3a;
  color: #ac5397;
  text-align: center;
  margin-top: 5px;
  border-radius: 10px;
}

/* dialog --保存二维码 */
.dialogsave{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 300px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #ffffff;
  border-radius: 10px;
  z-index: 100;
}



/* dialog --遮罩层 */
.mask{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  background: #38213e;
  opacity: 0.4;
  z-index: 99;
}

</style>
