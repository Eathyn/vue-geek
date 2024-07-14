<script setup lang="ts">
import SwitchDark from '@/components/SwitchDark/index.vue'
import LoginForm from '@/views/login/component/LoginForm.vue'

defineOptions({
  name: 'Login',
})
</script>

<template>
  <div class="login-container flx-center">
    <div class="login-box">
      <SwitchDark class="dark" />
      <div class="login-left">
        <img
          class="login-left-img"
          src="@/assets/images/login_left.png"
          alt="login"
        />
      </div>
      <div class="login-form">
        <div class="login-logo">
          <img
            class="login-icon"
            src="@/assets/images/logo.svg"
            alt="logo"
          />
          <h2 class="logo-text">Geek Admin</h2>
        </div>
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './index.scss';
:deep(.el-form-item) {
  margin-bottom: 40px;
}
:deep(.el-form-item.is-error .el-input__wrapper) {
  box-shadow: 0 0 0 1px var(--el-color-danger) inset;
}
:deep(.el-form-item__error) {
  position: absolute;
  padding-top: 2px;
  font-size: 12px;
  line-height: 1;
  color: var(--el-color-danger);
}
</style>
