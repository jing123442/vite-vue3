<template>
  <div>
    <Sider />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Sider from './Sider/index.vue'

export default defineComponent({
  setup() {
    return {}
  },
  components: {
    Sider
  }
})
</script>

<style lang="less" scoped></style>
