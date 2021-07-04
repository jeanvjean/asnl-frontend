/* eslint-disable no-async-promise-executor */
import { $axios } from '@/utils/api'
import { DisbursalDto } from '~/types/Types'

class ProductRespository {
  async createProduct(request: Object) {
    return await $axios.post('/inventory/create-product', request)
  }

  getProducts(page: number) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await $axios.get(
          `/inventory/fetch-products?page=${page}&limit=10`
        )
        resolve(response.data.data)
      } catch (error) {
        reject(error)
      }
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

  fetchSuppliers(page: number, filter: string = '') {
    return new Promise(async (resolve, reject) => {
      try {
        let url: string
        if (filter) {
          url = `/inventory/fetch-suppliers?page=${page}&limit=20&search=${filter}`
        } else {
          url = `/inventory/fetch-suppliers?page=${page}&limit=20`
        }
        const response = await $axios.get(url)
        resolve(response.data.data)
      } catch (error) {
        reject(error)
      }
    })
  }

  async registerInventory(request: FormData) {
    return await $axios.post('/inventory/register-inventory', request, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  fetchInventories(page: number) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response: any = await $axios.get(
          `/inventory/fetch-inventories?page=${page}&limit=10`
        )
        resolve(response.data)
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

  fetchProduct(productId: String) {
    return new Promise<any>((resolve, reject) => {
      try {
        const response = $axios.get('/inventory/fetch-product/' + productId)
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }

  registerDisbursal(requestBody: DisbursalDto) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response: any = await $axios.post(
          '/inventory/disburse-products',
          requestBody
        )
        resolve(response)
      } catch (error) {
        reject(error)
      }
    })
  }

  fetchProductsUnPaginated() {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response: any = await $axios.get('/inventory/fetch-all-products')
        resolve(response.data.data)
      } catch (error) {
        reject(error)
      }
    })
  }

  fetchInventoryStatistics() {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response: any = await $axios.get('/inventory/inventory-stats')
        resolve(response.data.data)
      } catch (error) {
        reject(error)
      }
    })
  }
}

const ProductObject = new ProductRespository()

export { ProductObject }
