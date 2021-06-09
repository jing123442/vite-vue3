<template>
<router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {
  }
})
</script>

<style lang='less'>
#app {
  font-family: "PingFang SC","Segoe UI","Microsoft YaHei","wenquanyi micro hei","Hiragino Sans GB","Hiragino Sans GB W3","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",Helvetica,Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background:@appBg;
}

</style>
