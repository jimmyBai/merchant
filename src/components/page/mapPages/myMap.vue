<template>
  <div class="myMap-andy">
    <div class="el-message-box__wrapper">
      <div class="el-message-box">

        <div class="message-box_header">
          <div class="message-box_title"><span v-text='msgtitle'></span></div>
          <div class="message-box_closebtn" @click="closepop"><i class="el-message-box__close el-icon-close"></i></div>
        </div>
        
        <div class="mapView_content">
          <div class="mapmain">
            <!--地图容器-->
            <div id="XSDFXPage" class="XSDFXPage"></div>
          </div>
          <!-- 地图地址列表 -->
          <div class="maplist">
            <div class="mappane">
              
              <ul>
                <li v-for="(item,index) in listArray" @click='getNowLocation(item)' class="textmap">
                  <span v-text="item.address"></span>
                </li>
              </ul>

            </div>
                
            <div class="mapbottom"></div>
          </div>

        </div>

      </div>
    </div>
    <div class="v-modal" style="z-index: 99;"></div>
  </div>



</template>

<script>
// andy
import '../../../../static/css/newStyle.css'
import {MP} from '../../../newMap.js'  

  export default {
    name: 'mymap',
    data(){
      return {
        msgtitle: '选择地址',
        cAddress: [],
        listArray:[],
        // returnmap:''
      }
    },
    props:{
      pcityMap: Object
    },
    mounted(){
      // console.log(this.pcityMap)
      let vm = this;
      vm.initMap();
    },
    methods:{
      initMap () {
        this.createMap(); //创建地图 
        this.setMapEvent(); //设置地图事件
        this.addMapControl(); //向地图添加控件
        //this.addMarker(); //向地图中添加marker
      },
      createMap(){

        let vm =this;
        var map = new BMap.Map("XSDFXPage",{enableMapClick:true});//在百度地图容器中创建一个地图
        var point = new BMap.Point(116.4035,39.915);//定义一个中心点坐标
        map.centerAndZoom(point,12);//设定地图的中心点和坐标并将地图显示在地图容器中
        window.map = map;//将map变量存储在全局
        //添加地址定位
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
          // console.log(r.point)
          if(this.getStatus() == BMAP_STATUS_SUCCESS){
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);//标出所在地
            map.panTo(r.point);//地图中心移动
            //console.log('您的位置：'+r.point.lng+','+r.point.lat);
            var point = new BMap.Point(r.point.lng,r.point.lat);//用所定位的经纬度查找所在地省市街道等信息
            var gc = new BMap.Geocoder();
            gc.getLocation(point, function(rs){
              var addComp = rs.addressComponents;
              //console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);//对应的市区、街道，街道号
            });
            // 获得周边信息
            var myKeys = ["酒店","广场","大厦","银行","公园","学校","景点","加油站","停车场","咖啡厅"];
            var mPoint = new BMap.Point(r.point.lng,r.point.lat);
            var circle = new BMap.Circle(mPoint,100,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
            map.addOverlay(circle);
            var local =  new BMap.LocalSearch(map, {
              renderOptions: {map: map, autoViewport: false}
            });
            local.searchNearby(myKeys,mPoint,100);
            
            // 获取坐标数据
            var v = setInterval((x)=>{
              if(local.wf){
                clearInterval(v);
              }
              local.wf.forEach(ele =>{
                vm.listArray.push(ele);
              })
              console.log(vm.listArray);
            },1500);
            
            // setTimeout(function(){
            //   local.wf.forEach(ele => {
            //     vm.content = ele;
            //     callback(vm);
            //   });
            // },1000);
            // var callback = function(cAddress){
            //   vm.listArray.push(cAddress.content)
            // }
            // console.log(vm.listArray);
            
          }else{
            alert('failed'+this.getStatus());
          }
        },{enableHighAccuracy: true});

        // 移动坐标
        map.addEventListener("click",function(e){

          map.clearOverlays(); //清除旧坐标
          var ckpoint = new BMap.Marker(e.point);
          map.addOverlay(ckpoint); //标出所在地
          map.panTo(e.point); //地图中心移动

          var point = new BMap.Point(e.point.lng,e.point.lat); //用所定位的经纬度查找所在地省市街道等信息
          var gc = new BMap.Geocoder();
          gc.getLocation(point, function(rs){
            var addComp = rs.addressComponents;
          });
          var myKeys = ["酒店","广场","大厦","银行","公园","学校","景点","加油站","停车场","咖啡厅"];
          var mPoint = new BMap.Point(e.point.lng,e.point.lat);
          var circle = new BMap.Circle(mPoint,100,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
          map.addOverlay(circle);
          var local =  new BMap.LocalSearch(map, {
            renderOptions: {map: map, autoViewport: false}
          });
          local.searchNearby(myKeys,mPoint,100);

          // 获取坐标数据
          vm.listArray = [];
          var v = setInterval((x)=>{
            if(local.wf){
              clearInterval(v);
            }
            local.wf.forEach(ele =>{
              vm.listArray.push(ele);
            })
            console.log(vm.listArray);
          },1500);

        });

      },
      setMapEvent(){
        map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
        map.enableScrollWheelZoom(true);//启用地图滚轮放大缩小
        map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard();//启用键盘上下左右键移动地图  
      },
      addMapControl(){
        //向地图中添加缩放控件
        var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
        map.addControl(ctrl_nav);
        //向地图中添加缩略图控件
        var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
        map.addControl(ctrl_ove);
        //向地图中添加比例尺控件
        var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
        //添加带有定位的导航控件
        var navigationControl = new BMap.NavigationControl({
          // 靠左上角位置
          anchor: BMAP_ANCHOR_TOP_LEFT,
          // LARGE类型
          type: BMAP_NAVIGATION_CONTROL_LARGE,
          // 启用显示定位
          enableGeolocation: true
        });
        map.addControl(navigationControl);

        //设置定时器
        setTimeout(function(){
          map.setZoom(16);
        },2000);
        setTimeout(function(){
            map.enableDragging();
        },2000);

        // 添加城市定位控件
        var geolocationControl = new BMap.GeolocationControl();
        geolocationControl.addEventListener("locationSuccess", function(e){
          // 定位成功事件
          var address = '';
          address += e.addressComponent.province;
          address += e.addressComponent.city;
          address += e.addressComponent.district;
          address += e.addressComponent.street;
          address += e.addressComponent.streetNumber;
          // alert("当前定位地址为：" + address);
        });
        geolocationControl.addEventListener("locationError",function(e){
          // 定位失败事件
          alert(e.message);
        });
        map.addControl(geolocationControl);
        
      },
      //创建marker
      // addMarker(){
      //   var markerArr = [{
      //     title:"深圳市腾讯计算机系统有限公司",
      //     content:"地址：深圳市深南大道10000号<br/>电话：0755-83765566",
      //     point:"114.02597366|22.54605355",
      //     isOpen:1,icon:{w:23,h:25,l:46,t:21,x:9,lb:12}
      //   }];
      //   for(var i=0;i<markerArr.length;i++){
      //     var json = markerArr[i];
      //     var p0 = json.point.split("|")[0];
      //     var p1 = json.point.split("|")[1];
      //     var point = new BMap.Point(p0,p1);
      //     //这个地方加this
      //     var iconImg = this.createIcon(json.icon);
      //     var marker = new BMap.Marker(point,{icon:iconImg});
      //     //这个地方加this
      //     var iw = this.createInfoWindow(i);
      //     var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
      //     marker.setLabel(label);
      //     map.addOverlay(marker);
      //     label.setStyle({
      //       borderColor:"#808080",
      //       color:"#333",
      //       cursor:"pointer"
      //     });
      //     var index = i;
      //     //这个地方加this
      //     var _iw = this.createInfoWindow(i);
      //     var _marker = marker;
      //     marker.addEventListener("click",function(){
      //     //这个地方加this
      //       this.openInfoWindow(_iw);
      //     });
      //     iw.addEventListener("open",function(){
      //       _marker.getLabel().hide();
      //     })
      //     _iw.addEventListener("close",function(){
      //       _marker.getLabel().show();
      //     })
      //     label.addEventListener("click",function(){
      //       _marker.openInfoWindow(_iw);
      //     })
      //     if(!!json.isOpen){
      //       label.hide();
      //       _marker.openInfoWindow(_iw);
      //     }
      //   }
      // },
      //创建InfoWindow
      // createInfoWindow(i){
      // //这个地方复制一下上面的var markerArr 不然会不显示报错
      //   var markerArr = [{
      //     title:"深圳市腾讯计算机系统有限公司",
      //     content:"地址：深圳市深南大道10000号<br/>电话：0755-83765566",
      //     point:"114.02597366|22.54605355",
      //     isOpen:1,icon:{w:23,h:25,l:46,t:21,x:9,lb:12}
      //   }];
      //   var json = markerArr[i];
      //   var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>");
      //   return iw;
      // },
      //创建一个Icon
      createIcon(json){
      //本地图标图片
      // var tubiao=require("/static/img/positioning.png")
      // var icon = new BMap.Icon(tubiao, new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})
      // return icon;
      },




      closepop(){
        //执行父组件关闭方法
        let data = this.pcityMap;
        console.log(this.pcityMap);
        //执行父组件方法
        this.$emit('viewMap',data,'');
      },
      getNowLocation(item){
        let data = item;
        console.log(data);
        //执行父组件方法
        this.$emit('viewMap',data,'');
      },
      // clickEttach(){
      //   //执行父组件关闭方法
      //   let data = {
      //     mapShowStatus:false
      //   };
      //   //执行父组件方法
      //   this.$emit('viewMap',data,'');
      // }
      
    }
  }

</script>

<style scoped>
  em{ font-style: normal; margin-right: 5px; color: #ac5397}
  .el-message-box__wrapper{ z-index: 100}
  .message-box_header{ position: relative; height: 40px;justify-content: center; -webkit-justify-content: center; line-height: 40px; display: flex; display: -webkit-flex; background: -webkit-gradient(linear, 0 0, 0 bottom, from(#433249), to(#38293d));}
  .message-box_closebtn{ position: absolute; right: 0; display: inline-block; height: 40px; width: 40px; text-align: center; cursor: pointer}
  .message-box_title{ font-size: 16px;}
  .message-box_content{ padding: 20px}

  .el-message-box{
    width: 500px;
    padding-bottom: 0;
  }

  .mapView_content{
    width: 100%;
    height: auto;
    min-height: 500px;
    margin-bottom: 2%;
  }
  .mapmain{
    width: 100%;
    height: 300px;
    position: relative;
  }
  .XSDFXPage{
    width: 96%;
    height: 288px;
    overflow: hidden;
    margin: 0;
    font-family: "微软雅黑";
    position: relative;
    top: 2%;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    margin-bottom: 2%;
  }
  .r-result{
    height: 200px;
    overflow: hidden;
    overflow-y: auto;
    border: none;
    background: rgb(52,32,59);
    margin: 0 2%;
    font-size: 12px;
  }
  .r-result li{
    margin: 0;
  }
  .maplist{
    width: 100%;
    height: 200px;
    overflow: hidden;
    overflow-y: auto;
    margin: 0 auto;
  }
  .mappane{
    padding-top: 8px;
  }
  .addresslist{
    height: 40px;
    line-height: 40px;
    padding: 0 5%;
    display: block;
    font-size: 12px;
  }

  .mapbottom{
    border:1px solid rgb(86,53,96);
    border-style:none none solid none;
    margin-bottom: 2%;
  }

  .textmap{
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    border: 1px solid rgb(86,53,96);
    border-style: solid none none none;
    padding: 0 15px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; 
  }
</style>
