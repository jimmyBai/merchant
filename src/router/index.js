import Vue from 'vue'
import Router from 'vue-router'

//注册插件
Vue.use(Router)

export default new Router({
  routes: [
    {
    	path: '/',
    	redirect:'/login'
    },
    {
        path:'/login',
        meta:{keepAlive:true},
        component:resolve=>require(['../components/Login.vue'],resolve)
    },
    {
      path:'/changepwd',
      name:'changepwd',
      meta:{keepAlive:true},
      component:resolve=>require(['../components/Changepwd.vue'],resolve)
    },
    {
      path:'/getphonecode',
      meta:{keepAlive:true},
      component:resolve=>require(['../components/Getphonecode.vue'],resolve)
    },
    {
        path:'/main',
        component:resolve=>require(['../components/Main.vue'],resolve),
        children:[
            {
                path:'/',
                meta:{keepAlive:true},
                component:resolve=>require(['../components/Home.vue'],resolve)
            },
            {
              path:'/myinfo',
              meta:{keepAlive:true},
              component:resolve=>require(['../components/common/Myinfo.vue'],resolve)
            },
            {
              path:'/set',
              meta:{keepAlive:true},
              component:resolve=>require(['../components/common/Set.vue'],resolve)
            },
            {
              path:'/lock',
              meta:{keepAlive:true},
              component:resolve=>require(['../components/common/Lock.vue'],resolve)
            },
            {
                path:'/member',
                meta:{keepAlive:true},
                component:resolve=>require(['../components/page/Member.vue'],resolve)
            },
            {
              path:'/memberdetail',
              meta:{keepAlive:true},
              component:resolve=>require(['../components/page/Memberdetail.vue'],resolve),
              children:[
                {
                  path:'/',
                  name:'mdetail',
                  meta:{keepAlive:true},
                  component:resolve=>require(['../components/page/memberorder/Orderlist.vue'],resolve),
                },
                {
                  path:'/orderlist',
                  meta:{keepAlive:true},
                  component:resolve=>require(['../components/page/memberorder/Orderlist.vue'],resolve),
                },
                {
                  path:'/reservatiolist',
                  meta:{keepAlive:true},
                  component:resolve=>require(['../components/page/memberorder/Reservatiolist.vue'],resolve),
                },
                {
                  path:'/livelist',
                  meta:{keepAlive:true},
                  component:resolve=>require(['../components/page/memberorder/Livelist.vue'],resolve),
                },
                {
                  path:'/paylist',
                  name:'paylist',
                  meta:{keepAlive:true},
                  component:resolve=>require(['../components/page/memberorder/Paylist.vue'],resolve),
                }
              ]
            },
            {
                path:'/order',
                meta:{keepAlive:true},
                component:resolve=>require(['../components/page/Order.vue'],resolve),
                children:[
                  {
                    path:'/',
                    meta:{keepAlive:true},
                    component:resolve=>require(['../components/page/order/Orderlist.vue'],resolve),
                  },
                  {
                    path:'/orderitem1',
                    meta:{keepAlive:true},
                    component:resolve=>require(['../components/page/order/Orderlist.vue'],resolve),
                  },
                  {
                    path:'/orderitem2',
                    meta:{keepAlive:true},
                    component:resolve=>require(['../components/page/order/Reservatiolist.vue'],resolve),
                  },
                  {
                    path:'/orderitem3',
                    meta:{keepAlive:true},
                    component:resolve=>require(['../components/page/order/Livelist.vue'],resolve),
                  }
                ]
            },
            {
                path:'/shop',
                meta:{keepAlive:true},
                component:resolve=>require(['../components/page/Shop.vue'],resolve),
                children:[
                  {
                    path:'/',
                    meta:{keepAlive:true},
                    component:resolve=>require(['../components/page/mapPages/myMap.vue'],resolve),
                  },
                  {
                    path:'/myMap',
                    meta:{keepAlive:true},
                    component:resolve=>require(['../components/page/mapPages/myMap.vue'],resolve),
                  }
                ]
            },
            {
                path:'/export',
                meta:{keepAlive:true},
                component:resolve=>require(['../components/page/Export.vue'],resolve)
            },
            {
                path:'/takeaway',
                meta:{keepAlive:true},
                component:resolve=>require(['../components/page/Takeaway.vue'],resolve)
            },
            {
                path:'/permission',
                meta:{keepAlive:true},
                component:resolve=>require(['../components/page/Permission.vue'],resolve),
                children:[
                  {
                    path:'/',
                    meta:{keepAlive:true},
                    component:resolve=>require(['../components/page/sys/Srole.vue'],resolve),
                  },
                  {
                    path:'/srole',
                    meta:{keepAlive:true},
                    component:resolve=>require(['../components/page/sys/Srole.vue'],resolve),
                  },
                  {
                    path:'/sadmin',
                    meta:{keepAlive:true},
                    component:resolve=>require(['../components/page/sys/Sadmin.vue'],resolve),
                  }
                ]
            },
            {
                path:'/onlive',
                meta:{keepAlive:true},
                component:resolve=>require(['../components/page/Onlive.vue'],resolve)
            },
            {
                path:'/reservation',
                meta:{keepAlive:true},
                component:resolve=>require(['../components/page/Reservation.vue'],resolve)
            }
        ]
    }
  ]
})
