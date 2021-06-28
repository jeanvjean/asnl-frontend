/* eslint-disable no-async-promise-executor */
import { $axios } from '@/utils/api'
class DriverRepository {
  getDrivers(page: Number) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await $axios.get(
          `/driver/fetch-drivers?page=${page}&limit=10`
        )
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }

  getUnPaginatedDrivers() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await $axios.get(`/driver/fetch-all-drivers`)
        resolve(response.data.data)
      } catch (error) {
        reject(error)
      }
    })
  }
}

const DriverObject = new DriverRepository()

export { DriverObject }
