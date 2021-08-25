/* eslint-disable no-async-promise-executor */
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

  suspendUser(userId: String, suspendStatus: Boolean, reason: String) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await $axios.get(
          `/user/suspend/${userId}?suspend=${!suspendStatus}&reason=${reason}`
        )
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    })
  }

  async updateUser(requestParameters: FormData, userId: String) {
    return await $axios.post('/user/update-user/' + userId, requestParameters, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  async getUsers(page: number) {
    return await $axios.get('/user/get-users?page=' + page + '&limit=' + 10)
  }

  fetchUserUnPaginated() {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await $axios.get('/user/fetch-all-users')
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    })
  }

  async fetchPermissions() {
    return await $axios.get('/user/fetch-permissions')
  }

  async fetchRoles() {
    return await $axios.get('/user/get-roles')
  }

  async deleteUser(userId: number, reason: String) {
    return await $axios.delete(`/user/delete-user/${userId}?reason=${reason}`)
  }

  async updateUserRole(userId: String, role: String, subrole: String) {
    return await $axios.post('/user/change-role/' + userId, {
      role,
      subrole,
    })
  }

  fetchActivityLogs(userId: String) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await $axios.get(
          '/vehicle/fetch-activityLogs/' + userId
        )
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }
}

const UserController = new UserRepository()

export { UserController }
