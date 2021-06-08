/* eslint-disable no-async-promise-executor */
import { $axios } from '@/utils/api'

export class ProductRepository {
  async createProduct(request: Object) {
    return await $axios.post('/inventory/create-product', request)
  }

  async getProducts() {
    return await $axios.get('/inventory/fetch-products').then((response) => {
      return response.data.data
    })
  }

  async createSupplier(request: Object) {
    return await $axios.post('/inventory/create-supplier', request)
  }

  async fetchBranches() {
    return await $axios.get('/inventory/fetch-branches').then((response) => {
      return response.data.data
    })
  }

  async fetchSuppliers() {
    return await $axios.get('/inventory/fetch-suppliers').then((response) => {
      return response.data
    })
  }

  async registerInventory(request: Object) {
    return await $axios.post('/inventory/register-inventory', request)
  }

  fetchInventories() {
    return new Promise<any>((resolve, reject) => {
      try {
        const response = $axios.get('/inventory/fetch-inventories')
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }

  fetchInventory(inventoryId: String) {
    return new Promise<any>((resolve, reject) => {
      try {
        const response = $axios.get('/inventory/fetch-inventory/' + inventoryId)
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }
}
