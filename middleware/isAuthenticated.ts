import { Middleware } from '@nuxt/types'
import { mainStore } from '~/module/Pinia'

const isAuthenticated: Middleware = ({ redirect }) => {
  const appStore = mainStore()
  const auth: any = appStore.getLoggedInUser
  const token: any = appStore.getToken
  if (auth && token) {
    let path
    if (!auth.isVerified) {
      path = '/auth/change-password'
      redirect(path)
    }
  } else {
    redirect('/')
  }
}

export default isAuthenticated
