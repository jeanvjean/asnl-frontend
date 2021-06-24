/* eslint-disable no-async-promise-executor */
import { $axios } from '@/utils/api'

class VehicleRepository {
  async createVehicle(requestParameters: Object) {
    return await $axios
      .post('/vehicle/register-vehicle', requestParameters)
      .then((response) => {
        return response.data
      })
  }

  fetchVehicles(page: number) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await $axios.get(
          `/vehicle/fetch-vehicles?page=${page}&limit=10`
        )
        resolve(response.data.data)
      } catch (error) {
        reject(error)
      }
    })
  }

  async assignDriver(requestParameters: any) {
    return await $axios.post(
      '/vehicle/assign-driver/' + requestParameters.driver,
      requestParameters
    )
  }

  async fetchVehicle(id: String) {
    return await $axios.get('/vehicle/fetch-vehicle/' + id).then((response) => {
      return response.data.data
    })
  }

  deleteVehicle(id: String) {
    return new Promise<any>((resolve, reject) => {
      try {
        const response = $axios.delete('/vehicle/delete-vehicle/' + id)
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }
}

const VehicleController = new VehicleRepository()

export { VehicleController }
