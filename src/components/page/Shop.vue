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
          <div class="content"><input v-model="ListData.name" type="text" /></div>
        </div>
        <div class="line photobox">
          <div class="title">店铺图片：</div>
          <div class="content">
            <dl>
              <dd>
                <input type="text" />
                <span class="filebtn">上传图片</span>
              </dd>
              <dd>最多可上传8张图片，每张图片上传不可大于1M,请上传每张为400px*300px规格的图片</dd>
              <dd class="imglist">
                <ul>
                  <li v-for="(item,index) in imgVO">
                    <div class="imgbox">
                      <div>
                        <img :src="item.imgurl"/>
                        <div class="delimg" @click="delimg(item,index)"><span>X</span></div>
                        <input type="file" class="myfile"  @change="addimg(item)" accept=".gif,.jpg,.jpeg,.png">
                      </div>
                    </div>
                  </li>
                </ul>
              </dd>
            </dl>
          </div>
        </div>
        <div class="line">
          <div class="title">店铺地址：</div>
          <div class="content"><input type="text" /></div>
        </div>
        <div class="line">
          <div class="title">店铺描述：</div>
          <div class="content"><div class="mytextarea"><textarea></textarea></div></div>
        </div>
        <div class="line">
          <div class="title">座位数量：</div>
          <div class="content"><input type="tel" /></div>
        </div>
        <div class="line">
          <div class="title">开店时间：</div>
          <div class="content">
            <el-time-picker v-model="startTime" :picker-options="beginObj" placeholder="开始营业时间">
            </el-time-picker>
          </div>
        </div>
        <div class="line">
          <div class="title">关店时间：</div>
          <div class="content">
            <el-time-picker arrow-control v-model="endTime" :picker-options="lastObj" placeholder="结束营业时间">
            </el-time-picker>
          </div>
        </div>
      </div>
      <div class="saveshop">
        <span>保存</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'order',
    data () {
      return {
        startTime: '',
        endTime: '',
        beginObj:{'selectableRange':'00:00:00 - 23:59:59'},
        lastObj:{'selectableRange':'00:00:00 - 23:59:59'},
        ListData:[],
        imgVO:[{'imgurl':'','name':'01'},{'imgurl':'','name':'01'},{'imgurl':'','name':'01'},{'imgurl':'','name':'01'},{'imgurl':'','name':'01'},{'imgurl':'','name':'01'},{'imgurl':'','name':'01'},{'imgurl':'','name':'01'}]
      }
    },
    created(){

    },
    mounted:function(){
      this.getlistData()
    },
    methods:{
      addimg(item){
        let imgobj=event.target.files[0],vm=this,
            maxSize=1024*1024*2,
            maxWidth=400,
            maxHeight=300;
        //图片size大小判断
        if(imgobj.size>maxSize){   //上传文件大小小于2M 1024*1024*2
          vm.$message.error('请上传小于2M的图片');
          return
        }
        //图片格式判断

        //图片尺寸判断
        var reader = new FileReader();
        reader.onload = function (e) {
             //加载图片获取图片真实宽度和高度
            var image = new Image()
                image.src = e.target.result;
               image.onload=function(){
                   var width = image.width;
                   var height = image.height;
                   if(image.width==maxWidth&&image.height==maxHeight){
                     item.imgurl=e.target.result;
                   }else{
                     vm.$message.error('图片尺寸不对 测试打开');
                     item.imgurl=e.target.result;
                     return
                   }

               };
         };
        reader.readAsDataURL(imgobj);
      },
      delimg(item,index){
        this.imgVO.splice(index,1)
      },
      getlistData(){
        let vm =this,url='/api/setting/store-info',params={};
        vm.$axios({
          method:'post',
          url:url,
          data: params
        }).then((res)=>{
          if(res.data.error_code=='200'){
            vm.ListData=res.data.data
            vm.startTime=vm.ListData.start_time
            vm.endTime=vm.ListData.end_time
            console.log(vm.endTime)
          }else{
            vm.$message.error(res.data.message);
            console.log(res.data.message)
          }
        }).catch(err => {
          console.log(err);
        });
      },
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

</style>
