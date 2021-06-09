<template>
  <el-form ref='loginForm' :model='form' :rules='loginFormRules' label-width="80px">
    <el-form-item label="账号" prop='userName'>
      <el-input v-model="form.userName"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop='passWord'>
      <el-input show-password v-model="form.passWord">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
  import {
    defineComponent,
    ref,
    reactive,
    unref
  } from 'vue'
  import {
    LoginFormMoudule,
    LoginFormRuleMoudle
  } from '../types'
  import { validatePhone } from '@/utils/validate.ts'
  import { loginApi } from '@/api/login.ts'
  import { useRouter } from 'vue-router'
  import type { RouteRecordRaw } from 'vue-router'
  import wsCache from '@/cache'
  import { appStore } from '@/store/modules/app'
  import { permissionStore } from '@/store/modules/permission'
  export default defineComponent({
    setup() {
      const { push, addRoute, currentRoute } = useRouter()
      const loginForm = ref(null)
      const form = reactive < LoginFormMoudule > ({
        userName: '',
        passWord: '',
      })
      const loginFormRules = reactive < LoginFormRuleMoudle > ({
        userName: [{
          required: true,
          validator: validatePhone,
          trigger: 'blur'
        }],
        passWord: [{
          required: true,
          max: 20,
          min: 6,
          trigger: 'blur',
          message:"请输入6-20位密码"
        }],
      })
      const routes = ['/authority','/authority/role','/first','/first/first','/first/seconed','/home']

      async function submitForm(): Promise<void> {
        const formWrap = unref(loginForm) as any
        if (!formWrap) return
        formWrap.validate(async(valid:boolean) => {
          if (valid) {
             wsCache.set(appStore.userInfo, {routes})
             permissionStore.GenerateRoutes().then(() => {
                  permissionStore.addRouters.forEach(async(route: RouteRecordRaw) => {
                    await addRoute(route) // 动态添加可访问路由表
                  })
                  permissionStore.SetIsAddRouters(true)
                  push({ path:  '/first/first' })
                })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }

      return {
        loginForm,
        loginFormRules,
        form,
        submitForm
      }
    }
  })
</script>

<style scoped>

</style>
