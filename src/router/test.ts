import type { RouteRecordRaw } from 'vue-router'
import layout from '@/components/layout/index.vue'
  const routesList: Array<RouteRecordRaw> = [
  {
      path: '/home',
      component: () => import('@/views/home.vue'),
      name: 'home',
      meta: {
        title: "我的",
        icon: 'el-icon-lollipop'
      }
  },
  {
    path: "/first",
    component: layout,
    name: 'first',
    meta: {
      title:'first',
      icon: 'el-icon-star-off'
    },
    children: [{
      path: "first",
      name: "first",
      component: () => import('@/views/first/first.vue'),
      meta: {
        title: "第一个",
        icon: ''
      }
    },{
      path: "seconed",
      name: "seconed",
      component: () => import('@/views/first/seconed.vue'),
      meta: {
        title: "第二个",
        icon: ''
      }
    }]
  }
    ]
    export default 
      routesList
    
    