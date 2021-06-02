<template>
  <div class="px-6 py-6">
    <div class="bg-white w-full px-6 py-6 h-full">
      <div class="flex justify-between mb-2">
        <div class="flex space-x-6 items-center font-medium text-black">
          <h1 class="py-2 border-b-2 border-purple-500">General Inventory</h1>
          <h1 class="py-2">Gas (Refill)</h1>
        </div>
        <button
          class="bg-purple-600 text-white flex items-center space-x-5 px-4 py-2 rounded-sm font-medium"
          @click="fetchCylinders"
        >
          <svg
            class="w-3 h-3 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 341.4 341.4"
          >
            <path
              d="M192 149.4V0h-42.6v149.4H0V192h149.4v149.4H192V192h149.4v-42.6z"
            />
          </svg>
          <span>Add New</span>
        </button>
      </div>
      <div class="grid grid-rows-1 lg:grid-cols-5 gap-y-4 md:gap-x-4 py-4">
        <div
          v-for="(supplier, i) in suppliers"
          :key="i"
          class="bg-purple-50 border border-gray-100 rounded-sm-sm py-4 px-4 space-y-1"
        >
          <div class="flex space-x-4 text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              class="w-6 h-6 fill-current text-purple-600"
            >
              <path
                d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"
              />
            </svg>
            <span class="text-md tracking-wide">{{ supplier.name }}</span>
          </div>
          <div>
            <p class="text-gray-500 inline-block">
              {{ supplier.location }}
            </p>
          </div>
          <div class="w-full">
            <span>{{ supplier.emailAddress }}</span>
          </div>
          <div>
            <p class="inline-block">{{ supplier.phoneNumber }}</p>
          </div>
        </div>
      </div>
    </div>
    <create-supplier
      v-if="show"
      :supplier-types="supplierTypes"
      :gas-types="gasTypes"
      @close="show = false"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import CreateSupplier from '@/components/Overlays/Supplier.vue'
import { ProductRepository } from '@/module/Product'
import { CylinderRepository } from '@/module/Cylinder'
export default defineComponent({
  name: 'Suppliers',
  components: { CreateSupplier },
  layout: 'dashboard',
  setup() {
    const show = ref(false)
    const gasTypes = ref([])
    const productObject = new ProductRepository()
    const cylinderObject = new CylinderRepository()
    const suppliers = ref([])

    const fetchSuppliers = () => {
      productObject.fetchSuppliers().then((response) => {
        suppliers.value = response.data
      })
    }

    const fetchCylinders = () => {
      cylinderObject.getCylinders().then((response) => {
        gasTypes.value = response.data.data.cylinders.map((el: any) => {
          return {
            name: el.gasName + ' - ' + el.colorCode,
            value: el._id,
          }
        })
        show.value = true
      })
    }

    onMounted(() => {
      fetchSuppliers()
    })

    const supplierTypes = [
      {
        name: 'General Inventory',
        value: 'general-inventory',
      },
      {
        name: 'Product Gas Refill',
        value: 'product-gas-refill',
      },
    ]
    return {
      show,
      supplierTypes,
      gasTypes,
      fetchCylinders,
      suppliers,
    }
  },
})
</script>
