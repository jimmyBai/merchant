<template>
  <div>
    <div class="el-message-box__wrapper">
      <div class="el-message-box">
        <div class="message-box_header">
          <div class="message-box_title"><span v-text='msgtitle'></span></div>
          <div class="message-box_closebtn" @click="closepop"><i class="el-message-box__close el-icon-close"></i></div>
        </div>
        <div class="message-box_content">
          <div class="addpop">
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle"><em>*</em>角色名称</div>
                <div class="itemcontent"><input type="text" v-model="role_name"></div>
              </div>
            </div>
            <div class="adduser-item">
              <div class="itemline">
                <div class="itemtitle">权限设置</div>
                <div class="itemcontent fixtable">
                  <el-table height="250" border  :row-key="getRowKeys" style="width: 100%" :expand-row-keys="expands" :data="ListData">
                    <el-table-column label=""  width="108" prop="name"></el-table-column>
                    <el-table-column label="查看"  width="65" align="center" header-align="center">
                      <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.read" :checked="scope.row.read==1"></el-checkbox>
                      </template>
                    </el-table-column>
                    <el-table-column label="修改"  width="65" align="center" header-align="center">
                      <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.update" :checked="scope.row.update==1"></el-checkbox>
                      </template>
                    </el-table-column>
                    <el-table-column label="删除"  width="65" align="center" header-align="center">
                      <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.delete" :checked="scope.row.delete==1"></el-checkbox>
                      </template>
                    </el-table-column>
                    </el-table-column>
                    <el-table-column label="添加"  width="65" align="center" header-align="center">
                      <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.create" :checked="scope.row.create==1"></el-checkbox>
                      </template>
                    </el-table-column>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
            <div class="popsaveline" @click="addroleFn">
              <span>保存</span>
            </div>
          </div>
        </div>
        <div class="message-box_btns">

        </div>
      </div>
    </div>
    <div class="v-modal" tabindex="0" style="z-index: 99;"></div>
  </div>
</template>

<script>
  export default {
    name: 'addsrole',
    data () {
      return {
        role_name:'',
        msgtitle:'添加角色',
        getRowKeys(row) {
          return row.id;
        },
        expands: [],
        ListData:[]
      }
    },
    props: {
      fromParent: String
    },
    created(){

    },
    mounted:function(){
      //判断是修改页面还是新增页面
      if(this.fromParent){
        this.msgtitle='查看角色'
        //获取详情信息
        this.geteditInfo()
      }else{
      }
      //获取权限列表枚举
      this.getpermission()
    },
    methods:{
      //获取修改信息
      geteditInfo(){
        let vm =this,url='/api/web/authority/user/info',params={'id':this.fromParent};
        vm.$axios.get(url,{params}).then((res)=>{
          if(res.data.error_code=='0'){
            vm.role_name=res.data.data.role_name
          }else{
            vm.$message.error(res.data.message);

          }
        }).catch(err => {
          console.log(err);
        });
      },
      closepop(){
        //执行父组件方法
        if(this.fromParent){
          let data = {
            popstatus:false
          };
          this.$emit('sievent',data,'');
        }else{
          let data = {
            popstatus:false
          };
          this.$emit('ievent',data,'');
        }

      },
      getpermission(){
        let vm =this,url='/api/web/authority/node/list',params={'role_id':this.fromParent||''};
        vm.$axios.get(url,{params}).then((res)=>{
          if(res.data.error_code=='0'){
            vm.ListData=res.data.data
            if(vm.ListData&&vm.ListData.length>0){
              vm.ListData.forEach(item=>{
                vm.$set(item,'create',0)
                vm.$set(item,'update',0)
                vm.$set(item,'read',0)
                vm.$set(item,'delete',0)
              })
            }
          }else{
            vm.$message.error(res.data.message);

          }
        }).catch(err => {
          console.log(err);
        });
      },
      //添加角色
      addroleFn(){
        let vm =this,roleArray=[];
        vm.ListData.forEach(item=>{
          let roleData={}
          if(item.create||item.update||item.read||item.delete){
            roleData={
              id:item.id,
              permissions:[item.read?1:0,item.update?1:0,item.delete?1:0,item.create?1:0]
            }
            roleArray.push(roleData)
          }
        })
        let url='/api/web/authority/role/add',params={
          role_name:vm.role_name,
          data:roleArray
        };
        vm.$axios({
          method:'post',
          url:url,
          data: params
        }).then((res)=>{
          if(res.data.error_code=='0'){
            let data = {
              popstatus:false,
              status:'refresh'
            };
            vm.$emit('ievent',data,'');
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
em{ font-style: normal; margin-right: 5px; color: #ac5397}
.itemtitle{ height: 20px; line-height: 20px; margin-bottom: 5px;}
.itemcontent input { height: 30px; line-height: 30px; }
.el-message-box__wrapper{ z-index: 100}
.message-box_header{ position: relative; height: 40px;justify-content: center; -webkit-justify-content: center; line-height: 40px; display: flex; display: -webkit-flex; background: -webkit-gradient(linear, 0 0, 0 bottom, from(#433249), to(#38293d));}
.message-box_closebtn{ position: absolute; right: 0; display: inline-block; height: 40px; width: 40px; text-align: center; cursor: pointer}
.message-box_title{ font-size: 16px;}
.message-box_content{ padding: 20px}
.popsaveline{ width: 80%; margin: 0 auto; margin-top: 20px}
.popsaveline span{ text-align: center}
.adduser-item .itemcontent{ padding-right: 10px}
.adduser-item{ padding: 0}
.adduser-item>div{ width: 100%}
.adduser-item .fixtable{ padding: 0; width: 100%;max-height: 400px; overflow-y: auto; overflow-x: hidden}
.adduser-item .el-table--border{ border-bottom:1px solid #48344d;}
</style>
