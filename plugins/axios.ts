import { Plugin } from '@nuxt/types'
import { initializeAxios } from '~/utils/api'
import { mainStore } from '~/module/Pinia'

const accessor: Plugin = ({ $axios, $toast }) => {
  initializeAxios($axios)
  $axios.onRequest((config: any) => {
    const appStore = mainStore()
    const auth: any = appStore.getToken
    if (auth) {
      config.headers.Authorization = auth.token
    }
  })
  $axios.onResponseError((error: any) => {
    $toast.error(error.response.data.message)
  })

  $axios.onRequestError((error: any) => {
    $toast.info(error.message)
  })

  $axios.onResponse((response: any) => {
    const message = response.data.message
    $toast.success(message)
  })
}

export default accessor
