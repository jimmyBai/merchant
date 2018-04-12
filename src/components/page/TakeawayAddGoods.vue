<template>
  
  <div class="main" v-show="displayShow">
    <div class="main-title">
        <span class="title-lf">添加商品</span>
        <span class="title-rt" @click="clickDialogHide">
          <i class="el-message-box__close el-icon-close"></i>
        </span>
    </div>

    <div class="main-body">
        <div class="body-goodsName public">
            <span>商品名称</span>
            <input type="text" v-model="product.name">
        </div>
        <div class="body-goodsDescribe public">
            <span>商品描述</span>
            <input type="text" v-model="product.describe">
        </div>

        <div class="body-lr public">
            <div class="lr-left sharing">
                <span>分类</span>
                <select class="" v-model="product.type">
                    <option value=""></option>
                </select>
            </div>
            <div class="lr-right sharings">
                <span>产地</span>
                <input type="text" v-model="product.place">
            </div>
        </div>

        <div class="body-year public">
            <span>年份</span>
            <input type="text" v-model="product.years">
        </div>
        <div class="body-brand public">
            <span>品牌</span>
            <input type="text" v-model="product.brand">
        </div>

        <div class="body-km public">
            <div class="km-left sharing">
                <span>重量(KG)</span>
                <input type="text" v-model="product.weight">
            </div>
            <div class="km-right sharings">
                <span>容量(ML)</span>
                <input type="text" v-model="">
            </div>
        </div>

        <div class="body-dt public">
            <div class="dt-left sharing">
                <span>单价</span>
                <input type="text" v-model="product.price">
            </div>
            <div class="dt-right special">
                <span>特价</span>
                <input type="text">
                <span class="el_span">
                    <el-switch
                    v-model="value1"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                    </el-switch>
                </span>
                
            </div>
        </div>

        <div class="body-kk public">
            <div class="kk-left inventory">
                <span style="display:inline;float:left;">库存跟踪</span>
                <span class="el_spans">
                    <el-switch
                    v-model="value2"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                    </el-switch>
                </span>    
            </div>
            <div class="kk-right sharings">
                <span>库存数量</span>
                <input type="text" v-model="product.inventory">
                
            </div>
        </div>

        <div class="bottom-btn">
            <input type="text" value="保存">
        </div>

    </div>
  </div>


</template>

<script>
  export default {
    name: 'takeawayDialog',
    data () {
        return {
            value1: true,
            value2: true,
            displayShow: true
        }
    },
    mounted:function(){
        this.getlistData()
    },
    methods:{
        getlistData(){
            let vm = this,url='/api/web/product/create'
            
            vm.$axios({
                method:'post',
                url:url
            }).then((res)=>{
                if(res.data.error_code=='0'){
                if(res.data.data){
                    vm.ListData=res.data.data
                }
                console.log(res.data.data)
                }else{
                vm.$message.error(res.data.message);
                console.log(res.data.message)
                }
            }).catch(err => {
                console.log(err);
            });
        },
        clickDialogHide () {
            this.displayShow = false
        }
    }
  }
</script>

<style scoped>
    .main{
        width: 420px;
        margin: 0 auto;
        color: #606266;
        background: rgb(52,32,59);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .main-title{
        background: -webkit-gradient(linear, 0 0, 0 bottom, from(#433249), to(#38293d));
        width: 100%;
        height: 44px;
        line-height: 44px;
        text-align: center;
        position: relative;
    }
    .title-lf{
        color: #ffffff;
        font-size: 14px;
        line-height: 1
    }
    .title-rt{
        font-size: 20px;
        position: absolute;
        right: 10px;
    }
    .main-body{

        position: relative;
        padding: 10px 27px;
        color: #606266;
        font-size: 14px;
    }

    .public{
        width: 100%;
        height: 50px;
        position: relative;
        margin: 10px 0;
    }
    .public span{
        display: block;
    }
    .public input{
        outline: none;
        background: #2e1c34;
        border: 1px solid #3d2b43;
        margin-right: 10px;
        color: #fff;
        margin: 5px 0;
        height: 23px;
        line-height: 23px;
        width: 100%;
        text-indent: 8px;
    }
    .sharing{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 45%;
    }
    .sharing span{
        display: block;
    }
    .sharing select{
        outline: none;
        background: #2e1c34;
        border: 1px solid #3d2b43;
        margin-right: 10px;
        color: #fff;
        margin: 5px 0;
        height: 23px;
        line-height: 23px;
        width: 100%;
        text-indent: 8px;
    }
    .sharings{
        position: absolute;
        bottom: 0;
        right: 0;
        width: 45%;
    }
    .sharings span{
        display: block;
    }
    .sharings input{
        
    }
        

    .special{
        position: absolute;
        bottom: 0;
        right: 0;
        width: 45%;
    }
    .special input{
        width: 70%;
    }

    .inventory{
        width: 45%;
        height: 50px;
        line-height: 50px;
        position: absolute;
        bottom: 0;
        left: 0;
        position: relative;
    }
    .el_span{
        position: absolute;
        right: 0;
        bottom: 8px;
    }
    .el_spans{
        position: absolute;
        right: 0;
        top: 0;
    }

    .bottom-btn{
        width: 100%;
        height: 30px;
        line-height: 30px;
        margin: 20px 0;   
    }
    .bottom-btn input{
        width: 100%;
        height: 30px;
        font-size: 12px;
        color: #fff;
        background: #ac5397;
        text-align: center;
        border: 0;
        outline: none;
    }
</style>
