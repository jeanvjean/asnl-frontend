import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
export const mainStore = defineStore({
  id: 'auth',
  state() {
    return {
      user: null,
      token: null,
    }
  },
  actions: {
    saveUser(user: any) {
      localStorage.setItem('user', JSON.stringify(user))
    },
    saveToken(token: any) {
      localStorage.setItem('token', JSON.stringify(token))
    },
  },
  getters: {
    getLoggedInUser() {
      let result
      if (localStorage.getItem('user')) {
        result = JSON.parse(localStorage.getItem('user')!)
      } else {
        result = null
      }
      this.user = result
      return this.user
    },
    getToken() {
      let result
      if (localStorage.getItem('token')) {
        result = JSON.parse(localStorage.getItem('token')!)
      } else {
        result = null
      }
      this.token = result
      return this.token
    },
  },
})
