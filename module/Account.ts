/* eslint-disable no-async-promise-executor */
import { $axios } from '@/utils/api'
import { Invoice } from '@/types/Types'

export function createInvoice(requestBody: Invoice) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await $axios.post('/account/create-invoice', requestBody)
      resolve(response.data)
    } catch (error) {
      reject(error)
    }
  })
}

export function fetchInvoices(page: Number, limit: Number, query: String = '') {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await $axios.get(
        `/account/fetch-invoices?page=${page}&limit=${limit}${query}`
      )
      resolve(response.data.data)
    } catch (error) {
      reject(error)
    }
  })
}

export function fetchInvoice(invoiceId: String) {
  return new Promise<any>(async (resolve, reject) => {
    try {
      const response = await $axios.get(`/account/fetch-invoice/${invoiceId}`)
      resolve(response.data.data)
    } catch (error) {
      reject(error)
    }
  })
}
