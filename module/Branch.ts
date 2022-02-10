/* eslint-disable no-async-promise-executor */
import { $axios } from '@/utils/api'

export function fetchBranches() {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await $axios.get('/inventory/fetch-branches')
      resolve(response.data.data)
    } catch (error) {
      reject(error)
    }
  })
}
