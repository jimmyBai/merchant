<template>
  <div class="ws-content">
    <div class="navbar">
      <h1 class="nav-bar-title">直播总汇报表<small> | 查看直播报表情况</small></h1>
    </div>
    <div class="livereportbar">
      <div class="title">时间范围</div>
      <el-date-picker :editable="false" v-model="startTime" clear-icon value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
      <span>至</span>
      <el-date-picker :editable="false" v-model="endTime" clear-icon value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
      <div class="search-icon" @click="searchlist"><i class="el-icon-search"></i></div>
    </div>
    <div class="echartBox">
      <div id="main" style="width: 100%;height:400px;"></div>
    </div>
    <div class="tableline">
      <ul>
        <li class="tablelinehead">
          <span class="title">统计名称</span>
          <span class="content">统计值</span>
        </li>
        <li>
          <span class="title">点击量</span>
          <span class="content"  v-text="tableData.click_num"></span>
        </li>
        <li>
          <span class="title">平均观看时长</span>
          <span class="content"  v-text="tableData.avg_view_time"></span>
        </li>
        <li>
          <span class="title">日包购买数</span>
          <span class="content"  v-text="tableData.day_buy_num"></span>
        </li>
        <li>
          <span class="title">月包购买数</span>
          <span class="content"  v-text="tableData.month_buy_num"></span>
        </li>
        <li>
          <span class="title">年包购买数</span>
          <span class="content"  v-text="tableData.year_buy_num"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import echarts from'../../../../static/js/echarts.js'
import data from'./aqi-beijing.json'
export default {
  data () {
    return {
      startTime:'',
      endTime:'',
      chartData:'',
      chartZoom:'',
      xAxis:'',
      tableData:''
    }
  },
  created(){

  },
  mounted:function(){
    this.getlistData()
  },
  methods:{
    // 获取余额数据
    getlistData(){
      this.ListData = []
      let vm = this,url='/api/web/report/summary/live-click-rate',
      params={'start_time':vm.startTime,'end_time':vm.endTime};
      vm.$axios({
        method:'post',
        url:url,
        data: params
      }).then((res)=>{
        if(res.data.error_code=='0'){
            vm.chartData=res.data.data.chart.chart_data
            vm.chartZoom=res.data.data.chart.dataZoom
            vm.xAxis=res.data.data.chart.xAxis
            vm.tableData=res.data.data.table
            vm.setEchart()
        }else{
            vm.$message.error(res.data.message);
        }
      }).catch(err => {
          console.log(err);
      });
    },
    searchlist(){
      this.getlistData()
    },
    //获取Echarts
    setEchart(){
      let vm =this;
      var myChart = echarts.init(document.getElementById('main'));
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '直播点击量统计图(按小时统计)',
          textStyle :{
            color:'#fff',
            fontWeight  :'normal',
            fontSize:'18'
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data:[{
            name:'每小时点击量',
            textStyle: {
              color: '#fff'
            }
          }]
        },
        xAxis:[
          {
            type : 'category',
            name:'(时间)',        //X轴名称单位
            nameLocation:'end', //名称的位置
            nameTextStyle:{     //名称的样式
              color:'#999',
              fontSize:'12px'
            },
            nameGap:0,  //名称与X轴的距离
            boundaryGap: true,//坐标的刻度是否在中间
            min:'3',//坐标轴刻度最小值
            max:'dataMax', //坐标轴刻度的最大值
            axisLine:{//坐标轴线条相关设置(颜色等)
              lineStyle:{
                color:'#48344e'
              }
            },
            axisTick:{ //坐标轴刻度相关设置
              length:'0' //我把长度设置成0了
            },
            axisLabel:{ //坐标轴刻度标签
              margin:7, //刻度标签与轴线之间的距离
              textStyle:{
                color:"#999",  //坐标轴刻度文字的颜色
                fontSize:'12px' //坐标轴刻度文字的大小
              }
            },
            data: vm.chartData.map(function (item) {
              return item.time;
            }),
            min: vm.xAxis.min,
            max: vm.xAxis.max
          }

        ],
        yAxis: [
          {
            type : 'value', //类型数值轴
            name:'(人)',    //坐标轴名称
            nameTextStyle:{     //名称的样式
              color:'#999',
              fontSize:'12px'
            },
            nameGap:3,  //名称与Y轴的距离
            axisTick:{ //坐标轴刻度相关设置
              length:'0' //我设置成0了
            },
            axisLine:{//坐标轴线条相关设置(颜色等)
              lineStyle:{
                color:'#48344e'
              }
            },
            axisLabel:{//坐标轴标签相关设置,距离颜色等
              margin:7,
              //formatter: '{value} °C',//标签内容内置的格式转化器比如这个表示在后面加一个c
              textStyle:{
                color:"#999",  //坐标轴刻度文字的颜色
                fontSize:'12px' //坐标轴刻度文字的大小
              },
            },
            splitLine:{    //坐标轴分隔线。默认数值轴显示，类目轴不显示。
              show:true,
              lineStyle:{
                color:'#333'
              }
            }
          }
        ],
        toolbox: {
          left: 'center',

        },
        dataZoom: [
          {
            startValue: vm.chartZoom.startValue||'2018-05-01',
            endValue: vm.chartZoom.endValue||'2018-05-01'
          },
          {type: 'inside'},
          {
            show:true,                              //是否显示 组件。如果设置为 false，不会显示，但是数据过滤的功能还存在。
            backgroundColor:"rgba(47,69,84,0)",  //组件的背景颜色
            dataBackground:{                        //数据阴影的样式。
              lineStyle:'mylineStyle',              //阴影的线条样式
              areaStyle:'myareaStyl',              //阴影的填充样式
            },
            fillerColor:"rgba(167,183,204,0.4)",  //选中范围的填充颜色。
            borderColor:"#48344e",                     //边框颜色。
          }
        ],
        series: [{
          name: '每小时点击量',
          type: 'line',
          data: vm.chartData.map(function (item) {
            return item.num;
          }),

        }]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
}
</script>
<style scoped>
.livereportbar{ display: flex; display: -webkit-flex; align-items: center;-webkit-align-items: center}
.livereportbar>div{ margin:0 10px}
.livereportbar>div.search-icon{ background:#38213e; height: 24px;line-height: 24px; width: 30px; text-align: center;border: 1px solid #48344e; cursor: pointer }
.echartBox{ margin-top: 30px}
.tableline{ width: 100%; margin-top: 20px}
.tableline ul li{ display: flex; display: -webkit-flex; width: 100%; height: 36px; line-height: 36px}
.tableline ul li span{ flex: 1;-webkit-flex: 1; text-align: center}
.tableline .tablelinehead{ background:#38213e}
.tableline ul li:nth-child(2n+1){ background:#38213e}
</style>
