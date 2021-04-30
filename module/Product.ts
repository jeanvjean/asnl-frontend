import { $axios } from '@/utils/api'

export class ProductRepository {
  async createProduct(request: Object) {
    return await $axios.post('/inventory/create-product', request)
  }

  // async getProducts(request: Object) {}
}
