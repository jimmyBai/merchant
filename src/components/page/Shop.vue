<template>
  <div class="ws-content">
    <div class="navbar">
      <h1 class="nav-bar-title">店铺信息<small> | 店铺详细信息</small></h1>
    </div>
    <div class="shopcontent">
      <div class="title">一般设置</div>
      <div class="formbox">
        <div class="line">
          <div class="title">店铺logo图片：</div>
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
        <div class="line">
          <div class="title">店铺名称：</div>
          <div class="content"><input v-model="ListData.name" type="text" /></div>
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
              <dd>最多可上传8张图片，每张图片上传不可大于1M,请上传每张为750px*330px规格的图片</dd>
            </dl>
          </div>
        </div>
        <div class="line">
          <div class="title">店铺地址：</div>
          <div class="content"><input type="text"  v-model="ListData.address" /></div>
        </div>
        <div class="line">
          <div class="title">联系电话：</div>
          <div class="content"><input type="text"  v-model="ListData.telephone" /></div>
        </div>
        <div class="line">
          <div class="title">人均消费：</div>
          <div class="content"><input type="text"  v-model="ListData.consumption" /></div>
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
              <dd>最多可上传2张图片，每张图片上传不可大于1M,请上传每张为750px*330px规格的图片</dd>
            </dl>
          </div>
        </div>
        <div class="line">
          <div class="title">店铺描述：</div>
          <div class="content"><div class="mytextarea"><textarea  v-model="ListData.describe" ></textarea></div></div>
        </div>
        <div class="line">
          <div class="title">座位数量：</div>
          <div class="content"><input type="tel" v-model="ListData.seat_number" /></div>
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
                    <el-time-select v-model="item.am_begin" :picker-options="{ start: '00:00', step: '00:15', end: '14:00'}">
                    </el-time-select>
                    <div class="fromto">至</div>
                    <el-time-select v-model="item.am_end" :picker-options="{ start: '00:00', step: '00:15', end: '14:00',minTime: item.am_begin}">
                    </el-time-select>
                  </el-col>
                  <el-col :span="8">
                    <el-time-select v-model="item.pm_begin" :picker-options="{ start: '14:00', step: '00:15', end: '23:45'}">
                    </el-time-select>
                    <div class="fromto">至</div>
                    <el-time-select v-model="item.pm_end" :picker-options="{ start: '14:00', step: '00:15', end: '23:45',minTime: item.pm_begin}">
                    </el-time-select>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="2" class="addlinbtn">
                <div class="addicon" @click="addweekline(item,index)"><i class="el-icon-circle-plus"></i></div>
                <div class="delicon" v-if="business_time.length>1" @click="delweekline(item,index)"><i class="el-icon-error"></i></div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="saveshop">
        <span @click="upshop">保存</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'order',
    data () {
      return {
        ListData:'',
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
          label: '周末'
        }],
      }
    },
    created(){

    },
    mounted:function(){
      this.getlistData()
    },
    methods:{
      addimg(way,item){
        let vm=this,maxbannernum=8,maximg=2,
          imgobj=event.target.files[0],
          maxSize=1024*1024*2,
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
            vm.$message.error('请上传小于2M的图片');
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
                       if(image.width==maxWidth&&image.height==maxHeight){
                         item.img=e.target.result;
                         vm.imgupload('2',item.img,way,item)
                       }else{
                         vm.$message.error('图片尺寸不对');
                         item.img=e.target.result;
                         vm.imgupload('2',item.img,way,item)
                         return
                       }
                     }else{
                       //添加图片
                       let imgobj={},ajaxarray=[];
                       if(image.width==maxWidth&&image.height==maxHeight){
                         imgobj={
                           img:e.target.result
                         }
                         vm.imgVO.push(imgobj)
                         vm.imgupload('2',imgobj.img,way,item)
                       }else{
                         vm.$message.error('图片尺寸不对');
                         imgobj={
                           img:e.target.result
                         }
                         vm.imgVO.push(imgobj)
                         vm.imgupload('2',imgobj.img,way,item)
                       }
                     }
                   }else if(way==3){
                      //上传logo
                     if(image.width==168&&image.height==168){
                       vm.ListData.logo=e.target.result;
                       vm.imgupload('3',vm.ListData.logo,way)
                     }else{
                       vm.$message.error('图片尺寸不对');
                       vm.ListData.logo=e.target.result;
                       vm.imgupload('3',vm.ListData.logo,way)
                       return
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
                       if(image.width==maxWidth&&image.height==maxHeight){
                         imgobj={
                           img:e.target.result
                         }
                         vm.recommend.push(imgobj)
                         vm.imgupload('4',imgobj.img,way,item)
                       }else{
                         vm.$message.error('图片尺寸不对');
                         imgobj={
                           img:e.target.result
                         }
                         vm.recommend.push(imgobj)
                         vm.imgupload('4',imgobj.img,way,item)
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
            }
          }else{
            vm.$message.error(res.data.message);

          }
        }).catch(err => {
          console.log(err);
        });
      },
      getlistData(){
        let vm =this,url='/api/web/setting/info',params={};
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
          let vm =this, url='/api/web/setting/save',params,banners=[],recommend=[],business=[],logoarray=[];

          /*console.log(vm.ListData)
          console.log(vm.imgVO)
          console.log(vm.recommend)*/
          console.log(vm.business_time)
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
              business.push(timelineobj)
            })
          }
          params={
            'name':vm.ListData.name,
            'address':vm.ListData.address,
            'describe':vm.ListData.describe,
            'seat_number':vm.ListData.seat_number,
            'logo':logoarray,
            'phone':vm.ListData.telephone,
            'consumption':vm.ListData.consumption,
            'banners':banners,
            'recommend':recommend,
            'business':business
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
            setTimeout(()=>{
              vm.$router.push('/member')
            })
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
.imglist ul li{width: 25%}
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
.logobox>div img{width: 100%}
</style>
