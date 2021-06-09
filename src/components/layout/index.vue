<template>
  <div class='layout-container'>
    <div class='sider_wrap'
          :class="{'sidebar__wrap--collapsed': collapsed}"
    >
      <Sider />
    </div>

    <div class='main_wrap'>
      <div class='head_wrap'>
        <div class='head_wrap_left'>
        <hamburger
        id="hamburger-container"
        :collapsed="collapsed"
        class="hover-container"
        @toggleClick="setCollapsed"
      />
        <BreadCrumb />
        </div>

        <UserInfo />
      </div>
      <!-- <TagsView /> -->
      <AppMain/>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { appStore } from '@/store/modules/app'
import Sider from './SiderNew/index.vue'
import TagsView from './TagsView/index.vue'
import BreadCrumb from './BreadCrumb/index.vue'
import Hamburger from './Hamburger/index.vue'
import UserInfo from './UserInfo/index.vue'
import AppMain from './AppMain.vue'
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
    UserInfo,
    AppMain

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
      background:#fff;
    }
    .sider_wrap{
      box-shadow: 0.8rem 0.8rem 1.4rem #c8d0e7, -0.2rem -0.2rem 1.8rem #FFFFFF;
    }
    .main_wrap{
      flex:1;
      .head_wrap{
        display:flex;
        height:64px;
        line-height:64px;
        background:#fff;
        justify-content: space-between;
        box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
        transition: all .2s ease-in-out;
        .head_wrap_left{
          display:flex;
        }
      }
    }
  }
</style>
