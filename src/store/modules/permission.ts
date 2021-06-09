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

//  function generateRoutes(list:AppRouteRecordRaw[], basePath: string): AppRouteRecordRaw[] {
//   const res: AppRouteRecordRaw[] = []
//   const permissionList = wsCache.get(appStore.userInfo).routes
//   let data = <AppRouteRecordRaw>{}
  
//   for (const item of list) {
//     if (item.children) {
//       data.children = generateRoutes(item.children, item.path)
//       if (data.children) {
//         data = Object.assign({},item,data)
//         res.push(data)
//       }
//     } else {
//       const finalPath = basePath? basePath + '/'+ item.path : item.path
//       permissionList.forEach((val:AppRouteRecordRaw) => {
//         console.log(val.path === finalPath,finalPath);
//         if (val.path === finalPath) {
//           res.push(item)
//         }
//       })
//     }
//   }
//   console.log(res,'00000');
//   return res
// }
function generateRoutes(routes: AppRouteRecordRaw[], basePath = ''): AppRouteRecordRaw[] {
  const res: AppRouteRecordRaw[] = []

  for (const route of routes) {
    // skip some route
    // if (route.meta && route.meta.hidden && !route.meta.showMainRoute) {
    //   continue
    // }

    let onlyOneChild = null

    if (route.children && route.children.length === 1 && !route.meta.alwaysShow) {
      onlyOneChild = isExternal(route.children[0].path)
        ? route.children[0].path
        : basePath+route.path+route.children[0].path
    }
    let data: any = null

    // 如不需要路由权限，可注释以下逻辑
    // 权限过滤，通过获取登录信息里面的角色权限，动态的渲染菜单。
    const list = wsCache.get(appStore.userInfo).routes
    // 开发者可以根据实际情况进行扩展
    for (const item of list) {
      // 通过路径去匹配
      if (isExternal(item.path) && (onlyOneChild === item.path || route.path === item.path)) {
        data = Object.assign({}, route)
      } else {
        // const routePath = path.resolve(basePath, onlyOneChild || route.path)
        const routePath = basePath ? basePath  + '/'+route.path:route.path
        console.log(routePath,item,routePath === item);
        if (routePath === item) {
          data = Object.assign({}, route)
        }
      }
    }
    // 如不需要路由权限，解注释下面一行
    // data = Object.assign({}, route)

    // recursive child routes
    if (route.children && data) {
      data.children = generateRoutes(route.children, route.path)
    }
    if (data) {
      res.push(data as AppRouteRecordRaw)
    }
  }
  console.log(res)
  return res
}

export const permissionStore = getModule<Permission>(Permission)

  