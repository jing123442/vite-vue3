
import {
    createRouter,
    createWebHashHistory,
    RouteRecordRaw
} from 'vue-router'
import { AppRouteRecordRaw } from './types'
import NProgress from 'nprogress'

import 'nprogress/nprogress.css'

import wsCache from '@/cache'

import Layout from '@/components/layout/index.vue'

import { permissionStore } from '@/store/modules/permission'

import { appStore } from '@/store/modules/app'

import permissionModules from './asyncRoute.ts'
// const asyncFiles = import.meta.globEager("./*.ts")   //获取当前全部路由
// let permissionModules: Array<AppRouteRecordRaw> = []
// for (let temp in asyncFiles) {
//   if (temp === './types.d.ts') { continue}
//     asyncFiles[temp].default.forEach((item:RouteRecordRaw) =>{
//         permissionModules.push(item)
//     })
// }

export const constantRouterMap: Array<AppRouteRecordRaw> = [
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

export const asyncRouterMap: Array<AppRouteRecordRaw> = [
    ...permissionModules
]

let routes:Array<RouteRecordRaw> = [] // 存放routes的数组

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRouterMap as RouteRecordRaw[]
})

const whiteList: string[] = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (wsCache.get(appStore.userInfo)) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (permissionStore.isAddRouters) {
        next()
        return
      }
      permissionStore.GenerateRoutes().then(() => {
        permissionStore.addRouters.forEach(async(route: RouteRecordRaw) => {
          await router.addRoute(route.name!, route) // 动态添加可访问路由表
        })
        const redirectPath = (from.query.redirect || to.path) as string
        const redirect = decodeURIComponent(redirectPath)
        const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
        permissionStore.SetIsAddRouters(true)
        next(nextData)
      })
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 否则全部重定向到登录页
      next({
        path: '/login',
        query: {
          redirect: to.path
        }
      })
    }
  }
})

router.afterEach((to) => {
  NProgress.done() // 结束进度条
})

export default router
