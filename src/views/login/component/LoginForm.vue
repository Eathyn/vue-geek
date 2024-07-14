<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { ElForm, ElNotification } from 'element-plus'
import type { FormRules } from 'element-plus'
import { User, Lock, CircleClose, UserFilled } from '@element-plus/icons-vue'
import { md5 } from 'js-md5'

import { Login } from '@/api/interface'
import { loginApi } from '@/api/modules/login.ts'
import useUserStore from '@/store/module/user.ts'
import { initDynamicRoutes } from '@/router/modules/dynamic-route.ts'
import { useRouter } from 'vue-router'
import { HOME_URL } from '@/config'
import { getTimeState } from '@/utils'

type FormInstance = InstanceType<typeof ElForm>

const router = useRouter()
const loginFormRef = ref<FormInstance>()
const loginForm = reactive<Login.ReqLoginForm>({
  username: '',
  password: '',
})
const loginRules = reactive<FormRules<Login.ReqLoginForm>>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})
const loading = ref(false)

function resetForm(formEl: FormInstance | undefined) {
  if (!formEl) {
    return
  }
  formEl.resetFields()
}

function login(formEl: FormInstance | undefined) {
  if (!formEl) {
    return
  }
  try {
    formEl.validate(async (valid) => {
      if (!valid) {
        return
      }
      loading.value = true

      // 1.执行登录接口
      const { data } = await loginApi({
        ...loginForm,
        password: md5(loginForm.password),
      })
      const userStore = useUserStore()
      userStore.setToken(data.access_token)

      // 2.添加动态路由
      await initDynamicRoutes()

      // 3.清空 tabs、keepAlive 数据
      // TODO

      // 4.跳转到首页
      await router.push(HOME_URL)
      ElNotification({
        title: getTimeState(),
        message: `欢迎登录 Geek Admin`,
        type: 'success',
        duration: 3000,
      })
    })
  } finally {
    loading.value = false
  }
}

function handleKeydown(e: KeyboardEvent) {
  // 检查是否按下 Enter 键或小键盘上的 Enter 键
  if (e.code === 'Enter' || e.code === 'NumpadEnter') {
    if (loading.value) {
      return
    }
    login(loginFormRef.value)
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <el-form
    ref="loginFormRef"
    :model="loginForm"
    :rules="loginRules"
    size="large"
  >
    <el-form-item prop="username">
      <el-input
        v-model="loginForm.username"
        placeholder="用户名：admin / user"
      >
        <template #prefix>
          <el-icon class="el-input__icon">
            <User />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="loginForm.password"
        type="password"
        placeholder="密码：123456"
        show-password
        autocomplete="new-password"
      >
        <template #prefix>
          <el-icon class="el-input__icon">
            <Lock />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
  </el-form>
  <div class="login-btn">
    <el-button
      :icon="CircleClose"
      round
      size="large"
      @click="resetForm(loginFormRef)"
    >
      重置
    </el-button>
    <el-button
      :icon="UserFilled"
      round
      size="large"
      type="primary"
      :loading="loading"
      @click="login(loginFormRef)"
    >
      登录
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
@import '../index.scss';
</style>
