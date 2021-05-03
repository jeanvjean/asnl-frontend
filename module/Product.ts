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
}
