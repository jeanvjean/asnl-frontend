/* eslint-disable no-async-promise-executor */
import { $axios } from '@/utils/api'

export function fetchIcns(page: Number, limit: Number, query: String) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await $axios.get(
        `/ocn/fetch-ocns?page=${page}&limit=${limit}&noteType=in-coming${query}`
      )
      resolve(response.data.data)
    } catch (error) {
      reject(error)
    }
  })
}
export function fetchOcns(page: number, limit: number, query: string) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await $axios.get(
        `/ocn/fetch-ocns?page=${page}&limit=${limit}&noteType=out-going${query}`
      )
      resolve(response.data.data)
    } catch (error) {
      reject(error)
    }
  })
}


export function fetchIcn(icnId: string) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await $axios.get(`/ocn/fetch-ocn-details/${icnId}`)
      resolve(response.data.data)
    } catch (error) {
      reject(error)
    }
  })
}
export function createOcn(payload: object) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await $axios.post(`/ocn/create-ocn`, payload)
      resolve(response.data)
    } catch (error) {
      reject(error)
    }
  })
}
