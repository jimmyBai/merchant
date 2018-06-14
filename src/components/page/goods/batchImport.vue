<template>
  <div class="viewgoods-andy">
    <div class="el-message-box__wrapper">
      <div class="el-message-box">
        <div class="message-box_header">
          <div class="message-box_title"><span>批量添加</span></div>
          <div class="message-box_closebtn" @click="closepop"><i class="el-message-box__close el-icon-close"></i></div>
        </div>
        <div class="message-box_content">
            <dl>
              <dt>功能介绍：</dt>
              <dd>使用excel快速导入进行商品添加</dd>
              <dd>数据导入商品状态自动为待审核</dd>
              <dd>一次性导入的数据不要太多，大量数据请分批导入</dd>
            </dl>
            <dl>
              <dt>使用方法：</dt>
              <dd>1，下载Excel模板文件并录入信息</dd>
              <dd>2，上传编辑好的Excel导入</dd>
            </dl>
            <div class="filebox">
              <div class="name"><em>*</em>Excel文件:</div>
              <div class="content">
                <span v-text="fileName"></span>
                <input type="file" name="file" ref="avatarInput" class="myfile" @change="addexcel(this)" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
              </div>
            </div>
        </div>
        <div class="message-box_btns">
          <div><span @click="importExcel">确认导入</span></div>
          <div><span @click.stop="tempDown">下载模板</span></div>
        </div>
      </div>
    </div>
    <div class="v-modal" style="z-index: 99;"></div>
  </div>


</template>

<script>
  // andy
  import "../../../../static/css/newStyle.css"
  import XLSX from "xlsx"
  export default {
    name: 'viewGoods',
    data () {
      return {
        excelData:'',
        fileName:''
      }
    },
    mounted:function(){
    },
    methods:{
      closepop(){
        //执行父组件关闭方法
        let data = {
          importstatus:false
        };
        //执行父组件方法
        this.$emit('childimport',data);
      },
      //模板下载
      tempDown(){
        let vm = this,
          url='/api/web/takeout-product/import-template',
          params={};
        vm.$axios.get(url,{params:params,responseType:'arraybuffer'}).then((res)=>{
          let blob=new Blob([res.data],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
          let elink = document.createElement('a');
          elink.download = '产品批量导入模板';
          elink.style.display = 'none';
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          document.body.removeChild(elink);
        }).catch(err => {
            console.log(err);
        });
      },
      //导入
      importExcel(){
        let vm =this,url='/api/web/takeout-product/import';
        if(this.$refs.avatarInput.files.length !== 0) {
          var myform = new FormData()
          myform.append('file', this.$refs.avatarInput.files[0])
          vm.$axios({
            method:'post',
            data:myform,
            url:url,
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }).then((res)=>{
            if(res.data.error_code=='0'){
              vm.closepop()
              vm.$message({
                message: '批量导入操作成功!',
                type: 'success'
              });
              setTimeout(x=>{
                  vm.$router.push('/goodsuncheck')
              },500)
            }else{
              vm.$message.error(res.data.message);
            }
          }).catch(err => {
              console.log(err);
          })
        }else{
          vm.$message.error('请先上传文件！');
        }
      },
      addexcel(obj){
        let _this = this;
        let file = event.currentTarget.files[0];
        _this.fileName=file.name
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function(e) {
         // console.log(this.result)
        }
      }
    }
  }

</script>

<style scoped>
.el-message-box__wrapper{ z-index: 100}
.message-box_header{ position: relative; height: 40px;justify-content: center; -webkit-justify-content: center; line-height: 40px; display: flex; display: -webkit-flex; background: -webkit-gradient(linear, 0 0, 0 bottom, from(#433249), to(#38293d));}
.message-box_closebtn{ position: absolute; right: 0; display: inline-block; height: 40px; width: 40px; text-align: center; cursor: pointer}
.message-box_title{ font-size: 16px;}
.message-box_content{ padding: 20px; }
.message-box_content dl{ font-size: 12px; margin-bottom: 10px}
.message-box_content dl dt{ margin-bottom: 10px}
.message-box_content dl dd{ margin-bottom: 5px; margin-left: 10px}
.message-box_btns{ padding: 0 20px 10px; display: flex; display: -webkit-flex}
.message-box_btns>div{flex: 1;-webkit-flex: 1; text-align: center}
.message-box_btns>div>span{ cursor: pointer; background:#ac5397; color:#fff;display: flex; display: -webkit-flex; justify-content: center;-webkit-justify-content: center; margin:0 auto;width: 80%; text-align: center;height: 30px; line-height: 30px; font-size: 12px;}
.filebox{ margin: 10px 0; font-size: 12px; display: flex;display: -webkit-flex; align-items: center;-webkit-align-items: center}
.filebox em{font-style: normal;color: #ac5397; margin-right: 5px;}
.filebox .content { position: relative; margin-left: 10px; border-radius: 2px; border: 1px solid #aa96b1; flex: 1.5;-webkit-flex: 1.5; height: 24px; line-height: 24px}
input.myfile{ cursor: pointer; z-index: 8; opacity: 0; width:100%; height:26px; margin: 0;padding: 0; position: absolute; left: 0; top: 0; border: none}
.filebox .content span{ margin-left: 10px}
</style>
