/* eslint-disable no-async-promise-executor */
import { $axios } from '@/utils/api'

export function createEcr(requestBody: any) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await $axios.post(`/ecr/create-ecr`, requestBody)
      resolve(response.data)
    } catch (error) {
      reject(error)
    }
  })
}

export function fetchEcr(ecrId: string) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await $axios.get(`ecr/ecr-details/${ecrId}`)
      resolve(response.data.data)
    } catch (error) {
      reject(error)
    }
  })
}

export function fetchEcrs() {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await $axios.get(`ecr/fetch-ecr/`)
      resolve(response.data.data)
    } catch (error) {
      reject(error)
    }
  })
}
export function fetchComplaintEcrs() {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await $axios.get(`/ecr/fetch-complaint-ecr`)
      resolve(response.data.data)
    } catch (error) {
      reject(error)
    }
  })
}