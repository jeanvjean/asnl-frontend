import { $axios } from '@/utils/api'
class DriverRepository {
  async getDrivers() {
    return await $axios.get('/driver/fetch-drivers')
  }
}

export { DriverRepository }
