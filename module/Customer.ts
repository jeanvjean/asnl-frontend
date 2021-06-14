/* eslint-disable no-async-promise-executor */
import { $axios } from '@/utils/api'

class Customer {
  fetchCustomers() {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response: any = await $axios.get('/customer/fetch-customers')
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
}

const CustomerController = new Customer()

export { CustomerController }
