import type { RouteRecordRaw } from 'vue-router'
import layout from '@/components/layout/index.vue'
import { AppRouteRecordRaw } from './types'

const routesList: Array<RouteRecordRaw> = [
  {
    path: '/home',
    component: () => import('@/views/home.vue'),
    name: 'home',
    meta: {
      title: '我的',
      icon: 'el-icon-lollipop',
      hidden: false
    }
  },
  {
    path: '/first',
    component: layout,
    name: 'first',
    meta: {
      title: 'first',
      icon: 'el-icon-star-off',
      hidden: false
    },
    children: [
      {
        path: 'first',
        name: 'first',
        component: () => import('@/views/first/first.vue'),
        meta: {
          title: '第一个',
          icon: '',
          hidden: false
        }
      },
      {
        path: 'seconed',
        name: 'seconed',
        component: () => import('@/views/first/seconed.vue'),
        meta: {
          title: '第二个',
          icon: '',
          hidden: false
        }
      }
    ]
  },
  {
    path: '/authority',
    component: layout,
    name: 'authority',
    meta: {
      title: '权限管理',
      icon: 'el-icon-star-off',
      hidden: false
    },
    children: [
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/authority/role.vue'),
        meta: {
          title: '角色配置',
          icon: '',
          hidden: false
        }
      }
    ]
  }
]
export default routesList
