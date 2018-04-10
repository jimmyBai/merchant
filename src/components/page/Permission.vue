<template>
    <div class="ws-content">
      <div class="navbar">
        <h1 class="nav-bar-title">权限信息<small> | 权限详细信息</small></h1>
      </div>
      <div class="tabslist">
        <div class="lineflex">
          <div class="tabslist-head">
            <div :class="{'is-active':activenum=='srole'}" @click="changetabs('srole')" class="tabtar-item ">角色</div>
            <div :class="{'is-active':activenum=='sacess'}" @click="changetabs('sacess')" class="tabtar-item">权限</div>
            <div :class="{'is-active':activenum=='sadmin'}" @click="changetabs('sadmin')" class="tabtar-item">管理员</div>
          </div>
          <div class="nav-rbtn">
            <div class="tdbtn-add" @click="adduser">
              <i class="el-icon-circle-plus-outline"></i>
              <span>添加</span>
            </div>
          </div>
        </div>
        <div class="tabslist-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'sys',
  data () {
    return {
      ListData:[],
      activenum:'srole'
    }
  },
  created(){

  },
  mounted:function(){
  },
  methods:{
    viewMore(scope){
     /* this.$router.push({
        name:"mdetail",
        params:{
          user_id:scope.id
        }
      })*/
    },
    changetabs(way){
      this.activenum=way
      this.$router.push('/'+way)
    },
    adduser(){
        let phonepop=`<div class="addpop">
          <div class="adduser-item">
            <div class="itemline">
              <span>名</span>
              <div class="itemcontent"><input type="text"></div>
            </div>
            <div class="itemline">
              <span>姓</span>
              <div class="itemcontent"><input type="text"></div>
            </div>
           </div>
          <div class="adduser-item">
            <div class="itemline">
              <span>手机号码</span>
              <div class="itemcontent"><input type="tel"></div>
            </div>
          </div>
          <div class="adduser-item">
            <div class="itemline">
              <span>电子邮箱</span>
              <div class="itemcontent"><input type="email"></div>
            </div>
          </div>
          <div class="adduser-item">
            <div class="itemline">
              <span>职务名称</span>
              <div class="itemcontent"><input type="email"></div>
            </div>
          </div>
          <div class="adduser-item">
            <div class="itemline">
              <span>职务描述</span>
              <div class="itemcontent">
                <div class="mytextarea"><textarea></textarea></div>
              </div>
            </div>
          </div>
          <div class="popsaveline">
            <span>保存</span>
          </div>
        </div>`
        this.$alert(phonepop,'添加管理员', {
          dangerouslyUseHTMLString: true,
          center: true,
          showConfirmButton:false
        }).then(()=>{

        }).catch(()=>{

        });
      }
  }
}
</script>
<style scoped>
.tabslist{ margin-top: 0}
.nav-rbtn{ position: relative; color: #fff}
.lineflex{ position: relative}
.nav-rbtn{ position: absolute; right: 20px; top: 2px}
.nav-rbtn>div{ display: inline-block; height: 23px; line-height: 23px;}



</style>
