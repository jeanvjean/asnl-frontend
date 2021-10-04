import { Middleware } from '@nuxt/types'
import { mainStore } from '@/module/Pinia'

const Authenticated: Middleware = ({ redirect }) => {
  const appStore = mainStore()
  const auth: any = appStore.getLoggedInUser
  const token: any = appStore.getToken
  if (auth && token) {
    let path
    if (!auth.isVerified) {
      path = '/auth/change-password'
    } else {
      path = '/dashboard'
    }
    redirect(path)
  }
}

export default Authenticated
