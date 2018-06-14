<template>
  <div class="viewgoods-andy">
    <div class="el-message-box__wrapper">
      <div class="el-message-box">
        <div class="message-box_header">
          <div class="message-box_title"><span>商品排序</span></div>
          <div class="message-box_closebtn" @click="closepop"><i class="el-message-box__close el-icon-close"></i></div>
        </div>
        <div class="head">
          <div  class="line">
            <span>商品排序列表</span>
            <input type="text" placeholder="请输入商品名称" v-model="name" />
          </div>
          <div class="search-icon" @click="searchlist"><i class="el-icon-search"></i></div>
        </div>
        <div class="tablelist fixheader">
          <ul>
            <li class="ul_header">
              <div class="lisn">排序</div>
              <div class="text">商品名称</div>
              <div class="type">分类</div>
            </li>
          </ul>
        </div>
        <div class="message-box_content">
            <div class="tablelist">
              <ul>
                <draggable v-model="ListData" :move="getdata" @update="datadragEnd" :options="{animation: 300,handle:'.sortli'}">
                  <transition-group name="list-complete" >
                    <li v-for="(item,index) in ListData" :key="index" class="sortli">
                      <!--<div class="lisn"><input class="snnumber" type="tel" @input="inputVal($event,item,index)" @change="setSortli($event,item,index)" v-model="ListData[index].sort=parseInt(index)+1" /></div>-->
                      <div class="lisn">
                        <input class="snnumber" type="tel" @input="inputVal($event,item,index)" @change="setSortli($event,item,index)" :value="item.sort=parseInt(index)+1" /></div>
                      <div class="text"><span v-text="item.name"></span></div>
                      <div class="type"><span v-text="item.category"></span></div>
                    </li>
                  </transition-group>
                </draggable>
              </ul>
            </div>
        </div>
        <div class="popsaveline">
          <span @click.stop="saveSort">保存</span>
        </div>
      </div>
    </div>
    <div class="v-modal" style="z-index: 99;"></div>
  </div>


</template>

<script>
  import "../../../../static/css/newStyle.css"
  import draggable from 'vuedraggable'
  import Sortable  from 'sortablejs'
  export default {
    name: 'viewGoods',
    data () {
      return {
        name:'',
        ListData:[]
      }
    },
    components: {
      draggable,Sortable
    },
    mounted:function(){
      this.getGoodsInfo();
    },
    watch:{
    },
    methods:{
      inputVal(e,item,index){
        if(e.target.value){
          e.target.value=e.target.value.replace(/[^0-9\-]/,'')
        }
      },
      setVal(item){
        return item.sort=parseInt(index)+1
      },
      setSortli(e,item){
        let vm =this;
        if(!e.target.value){e.target.value=item.sort}
        if(parseInt(e.target.value)>=1){
          item.sort=e.target.value-1
        }else{
          item.sort=e.target.value
        }
        function compare(str) {
          return function (obj1, obj2) {
            var value1 = obj1[str];
            var value2 = obj2[str]
            return value1 - value2;
          }
        }
        setTimeout(x=>{
          this.ListData.sort(compare('sort'));
      },200)
      },
      getdata(evt){
        //console.log(evt.draggedContext.element.id);
      },
      datadragEnd(evt){
        let vm=this;
        // console.log('拖动前的索引：'+evt.oldIndex);
        // console.log('拖动后的索引：'+evt.newIndex);

      },
      //获取需要排序商品
      getGoodsInfo(){
        this.ListData=[];
        let vm =this, url='/api/web/takeout-product/sort-list';
        vm.$axios({
          method:'POST',
          data:{search:{name:vm.name}},
          url:url
        }).then((res)=>{
          if(res.data.error_code=='0'){
              vm.ListData=res.data.data
          }else{
            vm.$message.error(res.data.message);
          }
        }).catch(err => {
            console.log(err);
        });
      },
      searchlist(){
        this.getGoodsInfo()
      },
      closepop(){
        //执行父组件关闭方法
        let data = {
          showSort:false
        };
        //执行父组件方法
        this.$emit('childsort',data);
      },
      //保存排序
      saveSort(){
        let vm =this,url='/api/web/takeout-product/sort',goods=[],params={};
        vm.ListData.forEach(item=>{
          goods.push({'id':item.id,'sort':item.sort})
        })
        params.data=goods
        vm.$axios({
          method:'post',
          data:params,
          url:url
        }).then((res)=>{
          if(res.data.error_code=='0'){
            vm.$message({
              message: '商品排序操作成功!',
              type: 'success'
            });
            setTimeout(x=>{
              let data = {
                showSort:false,
                status:'refresh'
              };
              //执行父组件方法
              vm.$emit('childsort',data);
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
.el-message-box__wrapper{ z-index: 100}
.message-box_header{ position: relative; height: 40px;justify-content: center; -webkit-justify-content: center; line-height: 40px; display: flex; display: -webkit-flex; background: -webkit-gradient(linear, 0 0, 0 bottom, from(#433249), to(#38293d));}
.message-box_closebtn{ position: absolute; right: 0; display: inline-block; height: 40px; width: 40px; text-align: center; cursor: pointer}
.message-box_title{ font-size: 16px;}
.message-box_content{ padding:0 20px;max-height: 380px}
.head{ padding: 20px 20px 0 20px; font-size: 12px; display: flex; display: -webkit-flex;align-items: center;-webkit-align-items: center}
.head input{border-radius: 1px; background: #2e1c34;padding: 3px;border: 1px solid #48344e;height: 18px;line-height: 18px; text-indent: 5px; color: #f8e2ff; width: 150px;}
.search-icon{ cursor: pointer; margin-left: 5px; cursor: pointer; border-radius: 1px; border: 1px solid #48344e; padding: 3px; height: 18px;display: inline-block; width: 18px; text-align: center;}
.popsaveline{ width: 80%; margin: 0 auto; margin-top: 20px}
.popsaveline span{ text-align: center}
.tablelist{ margin: 10px 0}
.tablelist ul li {justify-content:space-between;-webkit-justify-content: space-between; display: flex;display: -webkit-flex; width: 100%; align-items: center; -webkit-align-items: center; font-size: 12px;}
.tablelist ul li.ul_header{background:#2e1c34 }
.tablelist ul li.ul_header>div{ height: 30px; line-height: 30px; }
.tablelist ul li>div{ text-align: center }
.tablelist ul li .lisn{width: 80px; text-align: center}
.tablelist ul li .text{ flex: 1.5;-webkit-flex: 1.5}
.tablelist ul li .type{width: 100px}
.snnumber{ font-size: 12px; text-align:center;border: 1px solid #48344e; width: 40px; height: 20px; line-height: 20px}
.tablelist ul li:not(.ul_header){ margin: 5px 0; border-bottom:1px solid #48344e; padding: 5px 0;}
.fixheader{ padding: 0 20px}
</style>
