<template>
  <div v-if="!item.meta.hidden">
    <el-submenu v-if="item.children" :index="item.path">
      <template #title>
        <i v-if="item.meta.icon && item.meta.icon.includes('el-icon')" :class="[item.meta.icon, 'sub-el-icon', 'anticon']" />
        <!-- <svg-icon v-else-if="item.meta.icon" :icon-class="item.meta.icon" class="anticon" /> -->
        <slot name="title">
          <span class="anticon-item">{{ item.meta.title }}</span>
        </slot>
      </template>
      <SiderTree
        v-for="childRoute in item.children"
        :key="childRoute.path"
        :item="childRoute"
        :basePath="item.path"
      />
    </el-submenu>

    <el-menu-item v-else :index="`${basePath ? basePath + '/' : ''}` + item.path">
      <template #title>
        <i v-if="item.meta.icon && item.meta.icon.includes('el-icon')" :class="[item.meta.icon, 'sub-el-icon', 'anticon']" />
        <!-- <svg-icon v-else-if="item.meta.icon" :icon-class="item.meta.icon" class="anticon" /> -->
        <slot name="title">
          <span class="anticon-item">{{ item.meta.title }}</span>
        </slot>
      </template>
    </el-menu-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'SiderTree',
  props: {
    item: {
      type: Object as PropType<object>,
      required: true
    },
    basePath: {
      // 父级path
      type: String as PropType<string>,
      require: true
    }
  },
  setup(props) {
    return {}
  }
})
</script>

<style lang="less" scoped>
.anticon-item {
  opacity: 1;
  transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>
