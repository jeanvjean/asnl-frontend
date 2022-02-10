/* eslint-disable no-async-promise-executor */
import { $axios } from '@/utils/api'

export function createRequisition(requestBody: any) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await $axios.post(
        `/sales/create-sales-requisition`,
        requestBody
      )
      resolve(response.data)
    } catch (error) {
      reject(error)
    }
  })
}

export function fetchRequisitions(
  page: number,
  limit: number,
  queryString: string = ''
) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await $axios.get(
        `/sales/fetch-sales-requisitions?page=${page}&limit=${limit}${queryString}`
      )
      resolve(response.data.data)
    } catch (error) {
      reject(error)
    }
  })
}
export function fetchRequisition(
  id: string = ''
) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await $axios.get(
        `/sales/fetch-sales-req/${id}`
      )
      resolve(response.data.data)
    } catch (error) {
      reject(error)
    }
  })
}
