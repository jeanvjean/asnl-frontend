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

  async updateUser(requestParameters: Object, userId: String) {
    return await $axios.post('/user/update-user/' + userId, requestParameters)
  }

  async getUsers() {
    return await $axios.get('/user/get-users')
  }

  async fetchPermissions() {
    return await $axios.get('/user/fetch-permissions')
  }

  async fetchRoles() {
    return await $axios.get('/user/get-roles')
  }

  async deleteUser(userId: number) {
    return await $axios.delete('/user/delete-user/' + userId)
  }
}

export { UserRepository }
