<template>
  <div class="ws-content">
    <div class="navbar">
      <h1 class="nav-bar-title">店铺信息<small> | 店铺详细信息</small></h1>
    </div>
    <div class="shopcontent">
      <div class="title">一般设置</div>
      <div class="formbox">
        <div class="line">
          <div class="title">店铺名称：</div>
          <div class="content"><input v-model="ListData.name" type="text" @focus="selectval($event)" /></div>
        </div>
        <div class="line">
          <div class="title">店铺logo：</div>
          <div class="content">
            <div class="imgbox logobox">
              <div>
                <img v-if="ListData.logo" :src="ListData.logo"/>
                <i v-if="!ListData.logo" class="el-icon-plus"></i>
                <input type="file" class="myfile" @change="addimg(3)" accept=".gif,.jpg,.jpeg,.png">
              </div>
            </div>
          </div>
        </div>
        <div class="line photobox">
          <div class="title">店铺图片：</div>
          <div class="content">
            <dl>
              <dd class="imglist">
                <ul>
                  <li v-for="(item,index) in imgVO">
                    <div class="imgbox">
                      <div>
                        <img :src="item.img"/>
                        <div class="delimg" @click="delimg('1',item,index)"><span>X</span></div>
                        <input type="file" class="myfile"  @change="addimg('1',item)" accept=".gif,.jpg,.jpeg,.png">
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="imgbox">
                      <div class="addImgbg">
                        <i class="el-icon-plus"></i>
                        <input type="file" class="myfile"  @change="addimg('1')" accept=".gif,.jpg,.jpeg,.png">
                      </div>
                    </div>
                  </li>
                </ul>
              </dd>
              <dd>最多可上传10张图片，每张图片上传不可大于300kb,请上传每张为750px*330px规格的图片</dd>
            </dl>
          </div>
        </div>

        <div class="line notSame">
          <div class="title">店铺地址：</div>
          <div class="content"><input type="text" v-model="pCity" disabled="disabled" /></div>
          <!-- andy -->
          <div class="baidumap">
            <input type="button" class="baidubtn" value="打开地图" @click="openMap">
          </div>
        </div>
        <div class="line dzhome">
          <input type="text" v-model="ListData.address">
        </div>

        <div class="line">
          <div class="title">联系电话：</div>
          <div class="content"><input type="text" v-model="ListData.telephone" @focus="selectval($event)" /></div>
        </div>
        
        <div class="line">
          <div class="title">最低人均消费：</div>
          <div class="content">
            <input type="text" ref="input" v-model="ListData.consumption_min" @focus="selectval($event)" @blur="autoval(1)" @change="inputchange('1')" />
          </div>
        </div>
        <div class="line">
          <div class="title">最高人均消费：</div>
          <div class="content">
            <input type="text" v-model="ListData.consumption_max" @focus="selectval($event)" @blur="autoval(2)" @change="inputchange('2')" />
          </div>
        </div>

        <div class="line photobox">
          <div class="title">推荐图片：</div>
          <div class="content">
            <dl>
              <dd class="imglist">
                <ul>
                  <li v-for="(item,index) in recommend">
                    <div class="imgbox">
                      <div>
                        <img :src="item.img"/>
                        <div class="delimg" @click="delimg('0',item,index)"><span>X</span></div>
                        <input type="file" class="myfile" @change="addimg('0',item)" accept=".gif,.jpg,.jpeg,.png">
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="imgbox">
                      <div class="addImgbg">
                        <i class="el-icon-plus"></i>
                        <input type="file" class="myfile"  @change="addimg('0')" accept=".gif,.jpg,.jpeg,.png">
                      </div>
                    </div>
                  </li>
                </ul>
              </dd>
              <dd>最多可上传20张图片，每张图片上传不可大于300kb,请上传每张为750px*330px规格的图片</dd>
            </dl>
          </div>
        </div>
        <div class="line">
          <div class="title">店铺描述：</div>
          <div class="content"><div class="mytextarea"><textarea maxlength="240" v-model="ListData.describe" ></textarea></div></div>
        </div>
        <div class="line">
          <div class="title">座位数量：</div>
          <div class="content"><input type="tel" v-model="ListData.seat_number" @focus="selectval($event)" /></div>
        </div>
        <div class="line shopline">
          <div class="title">营业时间：</div>
          <div class="content timetep">
            <el-row :gutter="24" v-for="(item,index) in business_time" :key="index">
              <el-col :span="22">
                <el-row :gutter="24" class="lineitem">
                  <el-col :span="8">
                    <el-select v-model="item.startWeek" value-key="value" placeholder="请选择">
                      <el-option v-for="nav in options" :key="nav.value" :disabled="nav.disabled" :label="nav.label" :value="nav"></el-option>
                    </el-select>
                    <div class="fromto">至</div>
                    <el-select v-model="item.endWeek" value-key="value" placeholder="请选择">
                      <el-option v-for="nav in options" :key="nav.value" :disabled="nav.disabled" :label="nav.label" :value="nav"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-time-select v-model="item.am_begin" :editable="false" :picker-options="{ start: '00:00', step: '00:30', end: '23:30'}">
                    </el-time-select>
                    <div class="fromto">至</div>
                    <el-time-select v-model="item.am_end" :editable="false" :picker-options="{ start: '00:00', step: '00:30',end: '23:30'}">
                    </el-time-select>
                  </el-col>
                  <el-col :span="8">
                    <el-time-select v-model="item.pm_begin" :editable="false" :picker-options="{ start: '00:00', step: '00:30', end: '23:30'}">
                    </el-time-select>
                    <div class="fromto">至</div>
                    <el-time-select v-model="item.pm_end" :editable="false" :picker-options="{ start: '00:00', step: '00:30', end: '23:30'}">
                    </el-time-select>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="2" class="addlinbtn">
                <div class="addicon" v-if="index==0" @click="addweekline(item,index)"><i class="el-icon-circle-plus"></i></div>
                <div class="delicon" v-if="business_time.length>1&&index>0" @click="delweekline(item,index)"><i class="el-icon-error"></i></div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="saveshop">
        <span @click="upshop()">保存</span>
      </div>
    </div>

    <!-- 百度地图 -->
    <my-map v-if="mapShow" :pcityMap="cityMap" @viewMap='pviewMap'></my-map>

  </div>
</template>

<script>
// andy
import '../../../static/css/newStyle.css'
import myMap from './mapPages/myMap'

  export default {
    name: 'order',
    components:{
      myMap
    },
    data () {
      return {
        ListData:{},
        imgVO:[],
        recommend:[],
        business_time:[],
        weekArray:['','周一','周二','周三','周四','周五','周六','周末'],
        startWeek:'',
        endWeek:'',
        options: [{
          value: '1',
          label: '周一'
        }, {
          value: '2',
          label: '周二'
        }, {
          value: '3',
          label: '周三'
        }, {
          value: '4',
          label: '周四'
        }, {
          value: '5',
          label: '周五'
        }, {
          value: '6',
          label: '周六'
        }, {
          value: '7',
          label: '周日'
        }],
        dosave: true,
        mapShow: false,
        cityMap:{},
        pCity: ''
      }
    },
    created(){

    },
    watch:{
      'ListData.telephone'(cVal,oVal){
        if(cVal){
          return this.ListData.telephone=cVal.replace(/\D/,'')
        }
      },
      'ListData.consumption_max'(cVal,oVal){
        if(cVal){
          if(/^\d+(\.\d+)?$/.test(cVal)){
            
          }else{
            return this.ListData.consumption_max=cVal.replace(/^\D*([1-9]\d*\.?\d{0,2})?.*$/,'$1')
          }
        }
      },
      'ListData.consumption_min'(cVal,oVal){
        if(cVal){
          // if(/^\d+(\.\d+)?$/.test(cVal)){

          // }else{
          //   return this.ListData.consumption_min=cVal.replace(/^\D*([1-9]\d*\.?\d{0,2})?.*$/,'$1')
          // }

          let vm = this;
          let reg = /^[1-9]\d*(\.\d{0,2})?$|^0(\.\d{0,2})?$|^-([1-9]{1}\d*(\.\d{0,2})?)?$|^-(0(\.\d{0,2})?)?$/;
          let input = vm.$refs.input;

          var oldValue = '';
          input.addEventListener('input',function(){
            console.log(input.value)
            if(input.value && !reg.test(input.value)){
              input.value = oldValue;
            }  
            oldValue = input.value;
          });
          
          input.addEventListener('change',function(){
            if(input.value.endsWith('.') || input.value.endsWith('-')){
              input.value = input.value.slice(0,-1);
            }
          });
          
        }
      }
    },
    mounted:function(){
      this.getlistData();
    },
    methods:{
      pviewMap(...data){
        let vm = this;
        vm.cityMap=data[0]
        vm.$set(vm.ListData,'address',data[0].address)
        vm.mapShow=data[1];
        vm.pCity=data[0].province+data[0].city     
        if(data[0].point&&data[0].point.lat&&data[0].point.lng){
          vm.ListData.lat=data[0].point.lat
          vm.ListData.lng=data[0].point.lng
        }
      },
      // 打开百度地图
      openMap(data){
        let vm = this;
        vm.cityMap={
          lng:vm.ListData.lng,
          lat:vm.ListData.lat,
          address:vm.ListData.address,
          pCity:vm.pCity
        };
        // console.log(vm.cityMap)
        vm.mapShow = true;
      },
      inputchange(){
        let vm = this;
        if(this.ListData.consumption_max<this.ListData.consumption_min){
          vm.$message.error('最高消费不能小于最低消费！');
        }
      },
      selectval(event){
        event.currentTarget.select();
      },
      autoval(way){
        let vm = this;
        if(way!=2){
          if(!/\./.test(this.ListData.consumption_min)){ //末尾添加.00
            this.ListData.consumption_min += '.00';
          }else if(/\./.test(this.ListData.consumption_min)){
            this.ListData.consumption_min += '00';
          }
        }
        if(way!=1){
          if(!/\./.test(this.ListData.consumption_max)){ //末尾添加.00
            this.ListData.consumption_max += '.00';
          }else if(/\./.test(this.ListData.consumption_max)){
            this.ListData.consumption_max += '00';
          }
        }
      },
      addimg(way,item){
        let vm=this,maxbannernum=10,maximg=20,
          imgobj=event.target.files[0],
          // maxSize=1024*1024*2,
          maxSize=1024*300*1,
          maxWidth=400,
          maxHeight=300;
        if(way!=3){
          //判断图片张数
          if(!item){
            if(way>0){
              if(vm.imgVO.length>=maxbannernum){
                vm.$message.error('最多只能上传'+maxbannernum+'店铺图片');
                return
              }
            }else{
              if(vm.recommend.length>=maximg){
                vm.$message.error('最多只能上传'+maximg+'推荐图片');
                return
              }
            }
          }
          //图片size大小判断
          if(imgobj.size>maxSize){   //上传文件大小小于2M 1024*1024*2
            // vm.$message.error('请上传小于2M的图片');
            vm.$message.error('请上传小于300kb的图片');
            // console.log(imgobj.size)
            return
          }
        }
        var reader = new FileReader();
        reader.onload = function (e) {
          //加载图片获取图片真实宽度和高度
          var image = new Image()
          image.src = e.target.result;
          image.onload=function(){
            var width = image.width;
            var height = image.height;
            if(way==1){
              //店铺图片
              if(item){
                //修改图片
              // if(image.width==maxWidth&&image.height==maxHeight){
                if((image.width/image.height).toFixed(2)==(maxWidth/maxHeight).toFixed(2)){
                  item.img=e.target.result;
                  vm.imgupload('2',item.img,way,item)
                }else{
                  vm.$message.error('图片尺寸不对');
                  /*item.img=e.target.result;
                  vm.imgupload('2',item.img,way,item)*/
                  return
                }
              }else{
                //添加图片
                let imgobj={},ajaxarray=[];
                if((image.width/image.height).toFixed(2)==(maxWidth/maxHeight).toFixed(2)){
                  imgobj={
                    img:e.target.result
                  }
                  vm.imgVO.push(imgobj)
                  vm.imgupload('2',imgobj.img,way,item)
                }else{
                  vm.$message.error('图片尺寸不对');
                  // console.log(image.width+','+image.height)
                  /*imgobj={
                    img:e.target.result
                  }
                  vm.imgVO.push(imgobj)
                  vm.imgupload('2',imgobj.img,way,item)*/
                }
              }
            }else if(way==3){
              //上传logo
              if((image.width/image.height).toFixed(2)==1.00){
                vm.ListData.logo=e.target.result;
                vm.imgupload('3',vm.ListData.logo,way)
              }else{
                vm.$message.error('图片尺寸不对');
              /* vm.ListData.logo=e.target.result;
                vm.imgupload('3',vm.ListData.logo,way)
                return*/
              }


            }else{
              //推荐图片
              if(item){
                //修改图片
                if(image.width==maxWidth&&image.height==maxHeight){
                  item.img=e.target.result;
                  vm.imgupload('4',item.img,way,item)
                }else{
                  vm.$message.error('图片尺寸不对');
                  item.img=e.target.result;
                  vm.imgupload('4',item.img,way,item)
                  return
                }
              }else{
                //添加图片
                let imgobj={};
                if((image.width/image.height).toFixed(2)==(maxWidth/maxHeight).toFixed(2)){
                  imgobj={
                    img:e.target.result
                  }
                  vm.recommend.push(imgobj)
                  vm.imgupload('4',imgobj.img,way,item)
                }else{
                  vm.$message.error('图片尺寸不对');
                /* imgobj={
                    img:e.target.result
                  }
                  vm.recommend.push(imgobj)
                  vm.imgupload('4',imgobj.img,way,item)*/
                }
              }
            }
          };
        };
        reader.readAsDataURL(imgobj);
      },
      delimg(way,item,index){
        if(way>0){
          this.imgVO.splice(index,1)
        }else{
          this.recommend.splice(index,1)
        }
      },
      imgupload(type,img,way,item){
        let vm =this,imgarray=[img],
            url='/api/web/setting/upload',params={type:type,files:imgarray};
        vm.dosave=false
        vm.$axios({
          method:'post',
          url:url,
          data: params
        }).then((res)=>{
          if(res.data.error_code=='0'){
            if(res.data.data){
              if(item){
                item.img=res.data.data[0]
                //vm.$set(item,'ossUrl',res.data.data[0])
              }else{
                if(way==1){
                  vm.imgVO[vm.imgVO.length-1].img=res.data.data[0]
                  // vm.$set(vm.imgVO[vm.imgVO.length-1],'ossUrl',res.data.data[0])
                }else if(way==3){
                  vm.ListData.logo=res.data.data[0]
                }else{
                  vm.recommend[vm.recommend.length-1].img=res.data.data[0]
                  // vm.$set(vm.recommend[vm.recommend.length-1],'ossUrl',res.data.data[0])
                }
              }
              vm.dosave=true
            }
          }else{
            vm.dosave=true
            vm.$message.error(res.data.message);

          }
        }).catch(err => {
          console.log(err);
        });
      },
      getlistData(){
        let vm =this,url='/api/web/setting/info',params={};
        vm.ListData={}
        vm.imgVO=[]
        vm.recommend=[]
        vm.business_time=[]
        vm.$axios.get(url,{params}).then((res)=>{
          if(res.data.error_code=='0'){
            vm.ListData=res.data.data
            vm.imgVO=vm.ListData.banner
            vm.recommend=vm.ListData.recommend
            vm.business_time=vm.ListData.business_time
            if(vm.business_time.length>0){
              vm.business_time.forEach(item=>{
                let startWeek={
                  value: (item.intervals.split(','))[0],
                  label: vm.weekArray[(item.intervals.split(','))[0]]
                }
                let endWeek={
                  value: (item.intervals.split(','))[item.intervals.split(',').length-1],
                  label: vm.weekArray[(item.intervals.split(','))[item.intervals.split(',').length-1]]
                }
                vm.$set(item,'startWeek',startWeek)
                vm.$set(item,'endWeek',endWeek)
              })
            }else{
              vm.business_time=[{intervals: "", am_begin: "", am_end: "", pm_begin: "", pm_end: "",startWeek:'',endWeek:''}]
            }
            vm.startTime=vm.ListData.start_time
            vm.endTime=vm.ListData.end_time
          }else{
            vm.$message.error(res.data.message);
          }
        }).catch(err => {
          console.log(err);
        });
      },
      //添加营业时间
      addweekline(){
        let dataformat={
          'am_begin':'',
          'am_end':'',
          'intervals':'',
          'pm_begin':'',
          'pm_end':'',
        }
        this.business_time.push(dataformat)
      },
      //删除营业时间
      delweekline(item,index){
        this.business_time.splice(index,1)
      },
      upshop(){
        //图片上传成功之后才能保存
        if(!this.dosave){
          this.$message.error('图片上传完成之后才能保存！');
          return
        }
        let vm =this,flag, url='/api/web/setting/save',params,banners=[],recommend=[],business=[],logoarray=[];
        //封装Logo图片数组
        if(vm.ListData.logo){
          logoarray.push(vm.ListData.logo)
        }
        //获取店铺图片
        if(vm.imgVO&&vm.imgVO.length>0){
          vm.imgVO.forEach(item=>{
            banners.push(item.img)
          })
        }
        //获取推荐图片
        if(vm.recommend&&vm.recommend.length>0){
          vm.recommend.forEach(item=>{
            recommend.push(item.img)
          })
        }
        //封装店铺营业时间
        if(vm.business_time&&vm.business_time.length>0){
          vm.business_time.forEach(item=>{
            if(item.startWeek&&item.endWeek){
              item.am_begin=item.am_begin?item.am_begin:''
              item.am_end=item.am_end&&item.am_end!='null'?item.am_end:''
              item.pm_begin=item.pm_begin?item.pm_begin:''
              item.pm_end=item.pm_end&&item.pm_end!='null'?item.pm_end:''
              let timelineobj={
                "interval": {
                  "begin": item.startWeek.value,
                  "end": item.endWeek.value,
                },
                "time": {
                  "am": item.am_begin+'-'+item.am_end,
                  "pm": item.pm_begin+'-'+item.pm_end
                }
              }
              if(!item.am_begin||!item.am_end){
                timelineobj.time.am=''
              }
              if(!item.pm_begin||!item.pm_end){
                timelineobj.time.pm=''
              }
              if(timelineobj.interval.begin&&timelineobj.interval.end){
                if((item.am_begin&&item.am_end)||(item.pm_begin&&item.pm_end)){
                  business.push(timelineobj)
                }else{
                  flag=true
                }
              }else{
                flag=true
              }
            }
          })
        }
        if(flag){
          vm.$message.error('店铺时间必须设置！');
          return false
        }
        if(vm.ListData.consumption_max<vm.ListData.consumption_min){
          vm.$message.error('最高消费不能小于最低消费！');
          return false
        }
        params={
          'name':vm.ListData.name,
          'address':vm.ListData.address,
          'describe':vm.ListData.describe,
          'seat_number':vm.ListData.seat_number,
          'logo':logoarray,
          'phone':vm.ListData.telephone,
          'consumption_min':vm.ListData.consumption_min,
          'consumption_max':vm.ListData.consumption_max,
          'banners':banners,
          'recommend':recommend,
          'business':business,
          'lat':vm.ListData.lat,
          'lng':vm.ListData.lng
        }

        vm.$axios({
          method:'post',
          url:url,
          data: params
        }).then((res)=>{
          if(res.data.error_code=='0'){
            vm.$message({
              message: '店铺信息修改成功！',
              type: 'success'
            });
            /*sessionStorage.setItem('INDEXNUM',1)
            vm.$store.dispatch('changetabs',1);
            setTimeout(()=>{
              vm.$router.push('/member')
            })*/
            vm.getlistData();
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
.nav-bar-title{ padding-bottom: 0}
.shopcontent{ padding: 10px; background:#38213e }
.formbox{ margin:0 30px}
.formbox .line{ display: flex; display: -webkit-flex; margin: 15px 0; align-items: center; -webkit-align-items: center }
.formbox .content{ margin-left: 10px; width:600px}
.formbox .photobox{ align-items: flex-start;-webkit-align-items:flex-start;}
.formbox .photobox .title{ margin-top: 10px}
.formbox .line input { border:1px solid #706375; background: none; outline:none; border-radius: 3px; height: 30px; line-height: 30px; width: 200px; padding: 0 10px; color: #fff }
.formbox .line textarea { resize: none }
.content dl dd{ margin-bottom: 10px}
.filebtn{ margin-left: 10px; cursor: pointer; background:#ac5397; color: #fff; display: inline-block; height: 31px; line-height: 31px; width: 80px; text-align: center; border-radius: 3px}
.imglist ul { display: flex; display: -webkit-flex; flex-direction: row; -webkit-flex-direction: row; align-items: center; flex-wrap: wrap;-webkit-flex-wrap: wrap}
.imglist ul li{width: 25%; min-width: 150px;}
.imglist ul li .imgbox{ margin:10px 15px 10px 0; position: relative;}
.imglist ul li .imgbox>div{ background:#462d4d; width:135px; height: 100px; cursor: pointer}
.imglist ul li .imgbox img{width: 100%; height: 100%; background-size: contain;border: none}
.imglist ul li .delimg{ position: absolute; z-index: 9; right: -5px; top: -10px; text-align: center; line-height: 20px; height: 20px; width: 20px; border: 1px solid #716275; background:#331f3a; border-radius: 100% }
.formbox .line input.myfile{ z-index: 8; opacity: 0; width: 135px; height: 100px; margin: 0;padding: 0; position: absolute; left: 0; top: 0; border: none}
.mytextarea{ background: none; border: 1px solid #706375; border-radius: 3px;}
.mytextarea textarea { width: 100%; margin: 0; padding: 0; background: none; outline: none; border: none; color: #fff; height: 50px;}
.saveshop{ margin-left: 30px; padding: 10px 0;}
.saveshop span{ cursor:pointer;background: #ac5397; height: 30px; line-height: 30px; color: #fff; display: inline-block; width: 300px; text-align: center;}
.addImgbg {display: flex; display: -webkit-flex; align-items: center;-webkit-align-items: center; justify-content: center; -webkit-justify-content: center}
.addImgbg i{ font-size: 24px;}


.shopline .title{ min-width: 60px}
.shopline .timetep{ width: 100%}

.timetep .el-row{ display: flex; display: -webkit-flex; align-items: center; -webkit-align-items: center; margin-bottom: 10px}
.timetep .el-row:last-child{margin-bottom: 0}
.timetep .el-row .lineitem { margin-bottom: 10px}
.timetep .el-row .lineitem:last-child{margin-bottom: 0}
.formbox .shopline{ align-items: flex-start; -webkit-align-items: flex-start}
.addicon i{ font-size: 24px; color:#ac5397 }
.addlinbtn{ display: flex; display: -webkit-flex; align-items: center}
.addlinbtn>div{ margin-right: 10px}
.delicon i{font-size: 21px; color:#ac5397 }
.lineitem>div{ display: flex; display: -webkit-flex; align-items: center; -webkit-align-items: center; padding: 0 3px;}
.fromto{ margin: 0 3px}

.logobox{ width: 135px;height: 100px; background: #462d4d}
.logobox i{ font-size: 24px;}
.logobox>div{ position: relative; height: 100%; display: flex; display: -webkit-flex; align-items: center; -webkit-align-items: center;justify-content: center;-webkit-justify-content: center}
.line .title{ min-width: 80px; text-align: right}
.logobox>div img{width: 100%;min-width:135px}


.baidubtn{
  width: 74px!important;
}
</style>
