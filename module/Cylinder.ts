/* eslint-disable no-async-promise-executor */
import { $axios } from '@/utils/api'
class CylinderRepository {
  async getCylinders() {
    return await $axios.get('/cylinder/fetch-cylinders')
  }

  async getRegisteredCylinders() {
    return await $axios.get('/cylinder/fetch-registered-cylinders')
  }

  async getCylinder(id: number) {
    return await $axios.get('/cylinder/registered-cylinder-details/' + id)
  }

  async getEverythingCylinder() {
    return await Promise.all([
      this.getCylinders(),
      this.getRegisteredCylinders(),
    ])
  }

  async createCylinder(requestParameters: Object) {
    return await $axios.post('/cylinder/create-cylinder', requestParameters)
  }

  async registerCylinder(requestParameters: Object) {
    return await $axios.post('/cylinder/register-cylinder', requestParameters)
  }

  initiateCylinderTransfer(requestParameters: Object) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response: any = await $axios.post(
          '/cylinder/transfer-cylinders',
          requestParameters
        )
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    })
  }

  fetchBranches() {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response: any = await $axios.get('inventory/fetch-branches')
        resolve(response.data.data)
      } catch (error) {
        reject(error)
      }
    })
  }
}

export { CylinderRepository }
