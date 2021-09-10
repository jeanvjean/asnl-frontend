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

  async updateVehicle(requestParameters: Object, vehicleId: String) {
    return await $axios
      .post(`/vehicle/update-vehicle/${vehicleId}`, requestParameters)
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

  fetchVehiclesUnPaginated() {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await $axios.get(`/vehicle/fetch-all-vehicle`)
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

  fetchPerformance(id: String, startDate: Date, endDate: Date) {
    return new Promise<any>((resolve, reject) => {
      try {
        const response = $axios.get(
          `/vehicle/vehicle-performance/${id}?fromDate=${startDate}&toDate=${endDate}`
        )
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }

  vehicleInspection(requestBody: Object, vehicleId: String) {
    return new Promise<any>((resolve, reject) => {
      try {
        const response = $axios.post(
          `/vehicle/register-inspection/${vehicleId}`,
          requestBody
        )
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }
}

const VehicleController = new VehicleRepository()

export { VehicleController }
