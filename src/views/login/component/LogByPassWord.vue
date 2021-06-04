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
  export default defineComponent({
    setup() {

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

      async function submitForm(): Promise<void> {
        const formWrap = unref(loginForm) as any
        if (!formWrap) return
        formWrap.validate(async(valid:boolean) => {
          if (valid) {
            alert('submit!');
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
