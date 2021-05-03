import { $axios } from '@/utils/api'

class VehicleRepository {
  async createVehicle(requestParameters: Object) {
    return await $axios
      .post('/vehicle/register-vehicle', requestParameters)
      .then((response) => {
        return response.data
      })
  }

  async fetchVehicles() {
    return await $axios.get('/vehicle/fetch-vehicles').then((response) => {
      return response.data.data
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
}

export { VehicleRepository }
