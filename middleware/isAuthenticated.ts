import { Middleware } from '@nuxt/types'
import { mainStore } from '~/module/Pinia'

const isAuthenticated: Middleware = ({ redirect }) => {
  const appStore = mainStore()
  const auth: any = appStore.getLoggedInUser
  const token: any = appStore.getToken
  let path = '/'

  if (auth && token) {
    if (!auth.isVerified) {
      path = '/auth/change-password'
    } else if (!auth.name) {
      path = '/auth/account-setup'
    } else {
      path = '/dashboard'
    }
  }

  redirect(path)
}

export default isAuthenticated
