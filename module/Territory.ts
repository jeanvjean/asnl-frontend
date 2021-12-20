/* eslint-disable no-async-promise-executor */
import { $axios } from '@/utils/api'

export function createTerritory(requestBody: any) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await $axios.post(`/vehicle/add-terretory`, requestBody)
      resolve(response.data)
    } catch (error) {
      reject(error)
    }
  })
}

export function fetchTerrotiries() {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await $axios.get(`/vehicle/fetch-terretories`)
      resolve(response.data.data)
    } catch (error) {
      reject(error)
    }
  })
}
export function deleteTerritory(id: string) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await $axios.get(`/vehicle/delete-terretory/${id}`)
      resolve(response.data.data)
    } catch (error) {
      reject(error)
    }
  })
}