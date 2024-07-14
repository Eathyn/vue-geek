import { defineStore } from 'pinia'
import { ref } from 'vue'

import { UserState } from '@/store/interface'

const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<UserState['token']>('')
    const userInfo = ref<UserState['userInfo']>({
      name: 'Geek',
    })

    function setToken(newToken: string) {
      token.value = newToken
    }

    function setUserInfo(newUserInfo: UserState['userInfo']) {
      userInfo.value = newUserInfo
    }

    return {
      token,
      userInfo,
      setToken,
      setUserInfo,
    }
  },
  {
    persist: true,
  },
)

export default useUserStore
