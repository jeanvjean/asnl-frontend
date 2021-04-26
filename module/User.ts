import { $axios } from '@/utils/api'
class UserRepository {
  async getUser(userId: String, email: String) {
    return await $axios.get('/user/user-details/' + userId + '/' + email)
  }

  async inviteUser(requestParameters: Object) {
    return await $axios.post('/user/invite-user', {
      users: [requestParameters],
    })
  }

  async getUsers() {
    return await $axios.get('/user/get-users')
  }

  async fetchRoles() {
    return await $axios.get('/user/get-roles')
  }
}

export { UserRepository }
