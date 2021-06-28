/* eslint-disable no-async-promise-executor */
import { $axios } from '@/utils/api'
class CylinderRepository {
  async getCylinders() {
    return await $axios.get('/cylinder/fetch-cylinders')
  }

  getRegisteredCylinders(page: number) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response: any = await $axios.get(
          `/cylinder/fetch-registered-cylinders?page=${page}&limit=10`
        )
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    })
  }

  getRegisteredCylindersUnPaginated() {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response: any = await $axios.get(`/cylinder/fetch-reg-cylinders`)
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    })
  }

  getCylinderStatistics() {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response: any = await $axios.get(
          `/cylinder/fetch-cylinder-stats
`
        )
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    })
  }

  getTransferStatistics() {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response: any = await $axios.get(
          '/cylinder/cylinder-transfer-stats'
        )
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    })
  }

  async getCylinder(id: number) {
    return await $axios.get('/cylinder/registered-cylinder-details/' + id)
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

  fetchPendingTransfers() {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response: any = await $axios.get('/cylinder/pending-approval')
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

const CylinderController = new CylinderRepository()

export { CylinderController }
