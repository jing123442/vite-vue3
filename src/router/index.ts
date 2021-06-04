
import {
    createRouter,
    createWebHashHistory,
    RouteRecordRaw
} from 'vue-router'

import NProgress from 'nprogress' 

import 'nprogress/nprogress.css' 

import wsCache from '@/cache'

import Layout from '@/components/layout/index.vue'

const asyncFiles = import.meta.globEager("./*.ts")   //获取当前全部路由
let permissionModules: Array<RouteRecordRaw> = []
for (let temp in asyncFiles) {
  if (temp === './types.d.ts') { continue}
    asyncFiles[temp].default.forEach((item:RouteRecordRaw) =>{
        permissionModules.push(item)
    })
}

export const constantRouterMap: Array<RouteRecordRaw> = [
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/login/login.vue'),
        meta: {
          title: "登录",
          hidden: true
        }
    }
  ]

export const asyncRouterMap: Array<RouteRecordRaw> = [
    ...permissionModules
]

let routes:Array<RouteRecordRaw> = [] // 存放routes的数组

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRouterMap
})

const whiteList: string[] = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start()
    next()
})

router.afterEach((to) => {
  NProgress.done() // 结束进度条
})

export default router