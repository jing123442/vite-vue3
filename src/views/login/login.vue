<template>
 <LogByPassWord/>
</template>

<script lang="ts">
import { defineComponent, ref  } from 'vue' 
import LogByPassWord from './component/LogByPassWord.vue'
export default defineComponent({
  name: 'login',
  setup(){
    return {

    }
  },
  components: {
     LogByPassWord
  }
})
</script>

<style> 
</style>
