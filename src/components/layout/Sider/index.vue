<template>
  <div class="sidebar-container">
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        :collapse="collapsed"
        :default-openeds="false"
        @select="selectMenu"
      >
        <SiderTree v-for="route in routes" :key="route.path" :item="route" :base="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { permissionStore } from '@/store/modules/permission'
import type { RouteRecordRaw } from 'vue-router'
import SiderTree from './SiderTree.vue'

export default defineComponent({
  name: 'Sider',
  setup() {
    console.log(permissionStore)
   const routes = computed((): RouteRecordRaw[] => {
      return permissionStore.routers
    })
    const { currentRoute, push } = useRouter()
    const activeMenu = computed(() => {
      const { meta, path } = currentRoute.value
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    })

    function selectMenu(path: string) {
      if (currentRoute.value.fullPath === path) return
      push(path)
    }
    return {
      routes,
      activeMenu,
      selectMenu
    }
  },
  components: {
    SiderTree
  }
})
</script>

<style lang="less" scoped>
.siderbar-container {
 
}
</style>
