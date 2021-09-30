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

  createComplaint(requestBody: object, customerId: String) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await $axios.post(
          `/customer/make-complain/${customerId}`,
          requestBody
        )
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    })
  }

  createPurchaseOrder(requestBody: object) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await $axios.post(
          `purchase/create-purchase-order`,
          requestBody
        )
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    })
  }

  fetchPurchaseOrders(page: Number, limit: Number, query: String = '') {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await $axios.get(
          `/purchase/fetch-purchase-orders?page=${page}&limit=${limit}${query}`
        )
        resolve(response.data.data)
      } catch (error) {
        reject(error)
      }
    })
  }

  fetchPurchaseOrder(orderId: String) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await $axios.get(`/purchase/fetch-order/${orderId}`)
        resolve(response.data.data)
      } catch (error) {
        reject(error)
      }
    })
  }

  fetchComplaints(page: Number, limit: Number, query: String = '') {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await $axios.get(
          `/customer/fetch-pending-complaint-approval?page=${page}&limit=${limit}${query}`
        )
        resolve(response.data.data)
      } catch (error) {
        reject(error)
      }
    })
  }

  fetchComplaint(complaintId: String) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await $axios.get(
          `/customer/fetch-complaint-details/${complaintId}`
        )
        resolve(response.data.data)
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

  changePurchaseOrderStatus(requestBody: object, orderId: String) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await $axios.post(
          `/purchase/approve-purchase-order/${orderId}`,
          requestBody
        )
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    })
  }

  changeComplaintStatus(requestBody: object) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await $axios.post(
          `/customer/approve-complaint`,
          requestBody
        )
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    })
  }

  deleteCustomer(customerId: String, reason: String) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await $axios.delete(
          `/customer/delete-customer/${customerId}?reason=${reason}`
        )
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    })
  }
}

const CustomerController = new Customer()

export { CustomerController }
