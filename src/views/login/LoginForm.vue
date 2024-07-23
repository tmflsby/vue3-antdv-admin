<script setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { message } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { useLayoutThemeStore } from '@/store/layout/layoutTheme.js'
import { useUserStore } from '@/store/business/user.js'

const layoutSetting = useLayoutThemeStore().layoutSetting
const borderRadius = computed(() => layoutSetting.borderRadius)

const userStore = useUserStore()

const formState = ref({
  username: 'admin',
  password: '123456',
  verifyCode: ''
})

// 随机验证码 大小写字母 数字
const randomCode = (strLen) => {
  const code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let str = ''
  for (let i = 0; i < strLen; i++) {
    str += code.charAt(Math.floor(Math.random() * code.length))
  }
  return str
}
const imageCode = ref(randomCode(4))

const onFinish = (values) => {
  console.log('Success:', values)
  if (formState.value.verifyCode.toLocaleLowerCase() !== imageCode.value.toLocaleLowerCase()) {
    message.error('验证码错误！')
    imageCode.value = randomCode(4)
    formState.value.verifyCode = ''
    return
  }

  userStore.login({
    username: formState.value.username
  })
  message.success('登录成功！')
}

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
</script>

<template>
  <a-form :model="formState" @finish="onFinish" @finishFailed="onFinishFailed">
    <a-form-item name="username" :rules="[{ required: true, message: '请输入用户名！' }]">
      <a-input v-model:value="formState.username">
        <template #prefix>
          <UserOutlined />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item name="password" :rules="[{ required: true, message: '请输入密码！' }]">
      <a-input-password v-model:value="formState.password">
        <template #prefix>
          <LockOutlined />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item name="verifyCode" :rules="[{ required: true, message: '请输入验证码！' }]">
      <a-input class="w250px" v-model:value="formState.verifyCode">
        <template #prefix>
          <Icon icon="material-symbols-light:key" />
        </template>
      </a-input>
      <span
        class="ml10px pl10px pr10px font-bold text-22px align-mid cursor-pointer bg-yellow"
        :style="{ borderRadius: `${borderRadius}px` }"
        @click="imageCode = randomCode(4)"
      >
        {{ imageCode }}
      </span>
    </a-form-item>
    <a-form-item>
      <a-button class="w100%" type="primary" html-type="submit">登录</a-button>
    </a-form-item>
  </a-form>
</template>

<style scoped lang="less"></style>
