/* eslint-disable no-async-promise-executor */
import { $axios } from '@/utils/api'

class Customer {
  fetchUnPaginatedCustomers() {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response: any = await $axios.get('/customer/fetch-all-customers')
        resolve(response.data.data)
      } catch (error) {
        reject(error)
      }
    })
  }

  fetchCustomers(page: number) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response: any = await $axios.get(
          `/customer/fetch-customers?page=${page}&limit=10`
        )
        resolve(response.data.data)
      } catch (error) {
        reject(error)
      }
    })
  }

  fetchCylinders(customerId: String) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response: any = await $axios.get(
          '/cylinder/fetch-customer-cylinders/' + customerId
        )
        resolve(response.data.data)
      } catch (error) {
        reject(error)
      }
    })
  }

  registerCustomer(requestBody: FormData) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await $axios.post(
          '/customer/create-customer',
          requestBody,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }

  createPickupOrder(requestBody: object) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await $axios.post(
          '/customer/create-order',
          requestBody
        )
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    })
  }

  fetchOrder(customerId: String) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await $axios.get(`/customer/fetch-order/${customerId}`)
        resolve(response.data.data)
      } catch (error) {
        reject(error)
      }
    })
  }
}

const CustomerController = new Customer()

export { CustomerController }
