<template>
  <div class='layout-container'>
    <div class='sider_wrap'>
      <Sider />
    </div>

    <div class='main_wrap'>
      <div class='head_wrap'>
         <hamburger
        id="hamburger-container"
        :collapsed="collapsed"
        class="hover-container"
        @toggleClick="setCollapsed"
      />
        <BreadCrumb />
        <UserInfo />
      </div>
     
  
      <TagsView />
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { appStore } from '@/store/modules/app'
import Sider from './Sider/index.vue'
import TagsView from './TagsView/index.vue'
import BreadCrumb from './BreadCrumb/index.vue'
import Hamburger from './Hamburger/index.vue'
import UserInfo from './UserInfo/index.vue'
export default defineComponent({
  setup() {
     const collapsed = computed(() => appStore.collapsed)
    function setCollapsed(collapsed: boolean): void {
      appStore.SetCollapsed(collapsed)
    }

    return {
      collapsed,
      setCollapsed
    }
  },
  components: {
    Sider,
    TagsView,
    BreadCrumb,
    Hamburger,
    UserInfo

  }
})
</script>

<style lang="less" scoped>
.layout-container{
  width:100%;
  height:100%;
  position:relative;
  display:flex;
  flex-direction:row;
  .sider_wrap{
    // width:200px;
    background:#000;
  }
  .main_wrap{
    flex:1;
    .head_wrap{
      display:flex;
      justify-content: space-between;
    }
  }
}
</style>
