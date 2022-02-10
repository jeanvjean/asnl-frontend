import { $axios } from '@/utils/api'

class ProductRespository {
  async createProduct(request: Object) {
    return await $axios.post('/inventory/create-product', request)
  }

  getProducts(page: number, limit: Number, queryString: String) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await $axios.get(
          `/inventory/fetch-products?page=${page}&limit=${limit}${queryString}`
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

  fetchSuppliers(page: Number, limit: Number, filter: String = '') {
    return new Promise(async (resolve, reject) => {
      try {
        let url: string
        if (filter) {
          url = `/inventory/fetch-suppliers?page=${page}&limit=${limit}&search=${filter}`
        } else {
          url = `/inventory/fetch-suppliers?page=${page}&limit=${limit}`
        }
        const response = await $axios.get(url)
        resolve(response.data.data)
      } catch (error) {
        reject(error)
      }
    })
  }

  fetchAllSuppliers() {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response: any = await $axios.get('/inventory/fetch-all-suppliers')
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

  fetchInventories(
    page: number,
    pageLimit: number = 10,
    queryString: string = ''
  ) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response: any = await $axios.get(
          `/inventory/fetch-inventories?page=${page}&limit=${pageLimit}${queryString}`
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

  registerDisbursal(requestBody: FormData) {
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
        const response: any = await $axios.get('/inventory/fetch-grn-stats')
        resolve(response.data.data)
      } catch (error) {
        reject(error)
      }
    })
  }

  fetchDisbursalStatistics() {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response: any = await $axios.get('/inventory/fetch-mrn-stats')
        resolve(response.data.data)
      } catch (error) {
        reject(error)
      }
    })
  }

  fetchPendingDisbursement(page: Number, limit: Number) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response: any = await $axios.get(
          `/inventory/fetch-pending-disburse-requests?page=${page}&limit=${limit}`
        )
        resolve(response.data.data)
      } catch (error) {
        reject(error)
      }
    })
  }

  fetchPendingDisbursementDetail(id: String) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response: any = await $axios.get(
          `/inventory/fetch-disbursement/${id}`
        )
        resolve(response.data.data)
      } catch (error) {
        reject(error)
      }
    })
  }

  approveMrn(requestBody: any) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response: any = await $axios.post(
          `/inventory/approve-disbursement`,
          requestBody
        )
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    })
  }

  approveGrn(requestBody: any) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response: any = await $axios.post(
          `/inventory/approve-grn`,
          requestBody
        )
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    })
  }
}

const ProductObject = new ProductRespository()

export { ProductObject }