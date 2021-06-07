import { RouteRecordRaw } from 'vue-router'
import store from '../index'
import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { asyncRouterMap, constantRouterMap } from '@/router'
import { AppRouteRecordRaw } from '@/router/types'
import { deepClone, concactPath } from '@/utils/index.ts'
import { isExternal } from '@/utils/validate.ts'
import { appStore } from '@/store/modules/app'
import wsCache from '@/cache'

export interface PermissionState {
  routers: RouteRecordRaw[]
  addRouters: AppRouteRecordRaw[]
  isAddRouters: boolean
  activeTab: string
}
@Module({ dynamic: true, namespaced: true, store, name: 'permission' })
class Permission extends VuexModule implements PermissionState {
  public routers = [] as any[]
  public isAddRouters = false
  public addRouters = [] as any[]
  public activeTab = ''

  @Mutation
  private SET_ROUTERS(routers: AppRouteRecordRaw[]): void {
    // 动态路由，404一定要放到最后面
    // this.addRouters = routers.concat([{
    //   path: '/:path(.*)*',
    //   redirect: '/404',
    //   name: '404',
    //   meta: {
    //     hidden: true,
    //     breadcrumb: false
    //   }
    // }])
    this.addRouters = routers
    // 渲染菜单的所有路由
    this.routers = deepClone(constantRouterMap, ['component']).concat(routers)
  }

  @Mutation
  private SET_ISADDROUTERS(state: boolean): void {
    this.isAddRouters = state
  }
  @Mutation
  private SET_ACTIVETAB(activeTab: string): void {
    this.activeTab = activeTab
  }
  @Action
  public GenerateRoutes(): Promise<unknown> {
    return new Promise<void>(resolve => {
      let routerMap: AppRouteRecordRaw[] = []
      routerMap = generateRoutes(deepClone(asyncRouterMap, ['component']),'')
      this.SET_ROUTERS(routerMap)
      resolve()
    })
  }
  @Action
  public SetAcitveTab(activeTab: string): void {
    this.SET_ACTIVETAB(activeTab)
  }

  @Action
  public SetIsAddRouters(state: boolean): void {
    this.SET_ISADDROUTERS(state)
  }
}

 function generateRoutes(list:AppRouteRecordRaw[], basePath: string): AppRouteRecordRaw[] {
  const res: AppRouteRecordRaw[] = []
  const permissionList = wsCache.get(appStore.userInfo).routes
  let data = <AppRouteRecordRaw>{}
  
  for (const item of list) {
    if (item.children) {
      data.children = generateRoutes(item.children, item.path)
      if (data.children) {
        data = Object.assign({},item,data)
        res.push(data)
      }
    } else {
      const finalPath = basePath? basePath + '/'+ item.path : item.path
      permissionList.forEach((val:AppRouteRecordRaw) => {
        console.log(val.path === finalPath,finalPath);
        if (val.path === finalPath) {
          res.push(item)
        }
      })
    }
  }
  return res
}

export const permissionStore = getModule<Permission>(Permission)

  