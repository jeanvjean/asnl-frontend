import { $axios } from '@/utils/api'
class Auth {
  async login(credentials: Object) {
    return await $axios.post('/user/login', credentials)
  }

  async changePassword(requestParameters: Object) {
    return await $axios.post('/user/change-password', requestParameters)
  }
}

export { Auth }
