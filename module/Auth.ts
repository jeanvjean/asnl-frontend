import { $axios } from '@/utils/api'
class Auth {
  async login(credentials: Object) {
    return await $axios.post('/user/login', credentials)
  }

  async changePassword(requestParameters: Object) {
    return await $axios.post('/user/change-password', requestParameters)
  }

  async forgotPassword(requestParameters: Object) {
    return await $axios.post('/user/request-password-reset', requestParameters)
  }

  async setPassword(requestParameters: Object) {
    return await $axios.post('/user/reset-password', requestParameters)
  }
}

export { Auth }
