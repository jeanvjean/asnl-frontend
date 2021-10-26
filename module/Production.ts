/* eslint-disable no-async-promise-executor */
import { $axios } from '@/utils/api'

export function fetchECRs(
  page: number,
  limit: number,
  queryString: string = ''
) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await $axios.get(
        `/ecr/fetch-ecr?page=${page}&limit=${limit}${queryString}`
      )
      resolve(response.data.data)
    } catch (error) {
      reject(error)
    }
  })
}

export function createSchedule(requestBody: any) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await $axios.post(
        `/production/create-production-schedule`,
        requestBody
      )
      resolve(response.data)
    } catch (error) {
      reject(error)
    }
  })
}

export function fetchSchedules(
  page: number,
  limit: number,
  queryString: string = ''
) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await $axios.get(
        `/production/fetch-production-approvals?page=${page}&limit=${limit}${queryString}`
      )
      resolve(response.data.data)
    } catch (error) {
      reject(error)
    }
  })
}

export function fetchSchedule(productionId: String) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await $axios.get(
        `/production/fetch-prodctionSchedule/${productionId}`
      )
      resolve(response.data.data)
    } catch (error) {
      reject(error)
    }
  })
}

export function updateSchedule(requestBody: any) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await $axios.post(
        `production/update-completed-cylinders`,
        requestBody
      )
      resolve(response.data)
    } catch (error) {
      reject(error)
    }
  })
}

export function completeSchedule(scheduleId: string) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await $axios.get(
        `production/mark-completed-production/${scheduleId}`
      )
      resolve(response.data)
    } catch (error) {
      reject(error)
    }
  })
}
