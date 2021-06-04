import { RouteRecordRaw } from 'vue-router'
import store from '../index'
import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { asyncRouterMap, constantRouterMap } from '@/router'
import { AppRouteRecordRaw } from '@/router/types'
export interface PermissionState {
  routes: RouteRecordRaw[]
  dynamicRoutes: RouteRecordRaw[]
  activeTab: string
}
@Module({ dynamic: true, namespaced: true, store, name: 'permission' })
class Permission extends VuexModule implements PermissionState {
  public routes = [] as any[]
  public dynamicRoutes = [] as any[]
  public activeTab = ''

  private hasPermission () {}
  @Mutation
  private SET_ROUTERS(routes: AppRouteRecordRaw[]): void {
    // 渲染菜单的所有路由
    this.routes = constantRouterMap.concat(routes)
  }

  @Mutation
  private SET_ACTIVETAB(activeTab: string): void {
    this.activeTab = activeTab
  }

  // @Action
  // public GenerateRoutes(): Promise<unknown> {
  //   return new Promise(resolve => {
  //     // 路由权限控制
  //     let routerMap: AppRouteRecordRaw[] = []
  //     if (wsCache.get(appStore.userInfo).roleName === 'admin') {
  //       // 模拟前端控制权限
  //       routerMap = generateRoutes(deepClone(asyncRouterMap, ['component']))
  //     } else {
  //       // 模拟后端控制权限
  //       routerMap = getFilterRoutes(wsCache.get(appStore.userInfo).checkedNodes)
  //     }
  //     // const routerMap: AppRouteRecordRaw[] = generateRoutes(deepClone(asyncRouterMap, ['component']))
  //     this.SET_ROUTERS(routerMap)
  //     resolve()
  //   })
  // }
  @Action
  public SetAcitveTab(activeTab: string): void {
    this.SET_ACTIVETAB(activeTab)
  }
}

export const permissionStore = getModule<Permission>(Permission)