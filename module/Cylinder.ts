import { $axios } from '@/utils/api'
class CylinderRepository {
  async getCylinders() {
    return await $axios.get('/cylinder/fetch-cylinders')
  }

  async createCylinder(requestParameters: Object) {
    return await $axios.post('/cylinder/create-cylinder', requestParameters)
  }
}

export { CylinderRepository }
