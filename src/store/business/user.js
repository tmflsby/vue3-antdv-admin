import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({})
    const setUserInfo = data => {
      userInfo.value = data
    }

    const router = useRouter()

    const login = async data => {
      await router.push('/')
      setUserInfo(data)
    }
    const logout = async () => {
      await router.push('/login')
      userInfo.value = {}
    }

    return { userInfo, setUserInfo, login, logout }
  },
  { persist: true },
)
