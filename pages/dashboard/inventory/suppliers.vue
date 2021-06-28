<template>
  <div class="px-6 py-6">
    <div class="bg-white w-full h-full">
      <div class="py-4">
        <div
          class="
            flex
            justify-between
            items-center
            px-6
            border-0 border-l-4 border-black
            mt-4
            w-full
            overflow-x-auto
          "
        >
          <h1 class="font-semibold text-black text-lg">Suppliers</h1>
          <div class="flex items-center space-x-6">
            <pagination
              :pagination-details="paginationProp"
              @next="changePage($event.value)"
              @prev="changePage($event.value)"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-between mb-4 px-6">
        <div class="flex space-x-6 items-center font-medium text-black">
          <button
            :class="
              search == 'general-inventory'
                ? 'border-b-2 border-btn-purple'
                : ''
            "
            class="py-2 focus:outline-none"
            @click="changeTab('general-inventory')"
          >
            General Inventory
          </button>
          <button
            :class="
              search == 'product-gas-refill'
                ? 'border-b-2 border-btn-purple'
                : ''
            "
            class="py-2 focus:outline-none"
            @click="changeTab('product-gas-refill')"
          >
            Gas (Refill)
          </button>
        </div>
        <button
          class="
            bg-btn-purple
            text-white
            flex
            items-center
            space-x-5
            px-4
            py-2
            rounded-sm
            font-medium
          "
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
      <div class="grid grid-rows-1 lg:grid-cols-5 gap-y-4 md:gap-x-4 py-4 px-6">
        <div
          v-for="(supplier, i) in suppliers"
          :key="i"
          class="
            bg-purple-50
            border border-gray-100
            rounded-sm
            py-4
            px-4
            space-y-1
          "
        >
          <div class="flex space-x-4 text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              class="w-6 h-6 fill-current text-btn-purple"
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
      @refresh="fetchSuppliers(1)"
    />
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
} from '@nuxtjs/composition-api'
import CreateSupplier from '@/components/Overlays/Supplier.vue'
import { ProductObject } from '@/module/Product'
import { CylinderController } from '@/module/Cylinder'
import { SupplierDto } from '@/types/Types'
import Pagination from '@/components/Base/Pagination.vue'

export default defineComponent({
  name: 'Suppliers',
  components: { CreateSupplier, Pagination },
  layout: 'dashboard',
  setup() {
    const show = ref(false)
    const gasTypes = ref([])

    const suppliers = ref<Array<SupplierDto>>([])

    function fetchSuppliers(pageValue: number, searchValue: string) {
      ProductObject.fetchSuppliers(pageValue, searchValue).then(
        (response: any) => {
          suppliers.value = response.docs
          paginationProp.hasNextPage = response.hasNextPage
          paginationProp.hasPrevPage = response.hasPrevPage
          paginationProp.currentPage = response.page
        }
      )
    }

    const paginationProp = reactive({
      hasNextPage: false,
      hasPrevPage: false,
      currentPage: 1,
    })

    function changeTab(newTab: string) {
      search.value = newTab
      fetchSuppliers(1, search.value)
    }

    function changePage(nextPage: number) {
      fetchSuppliers(nextPage, search.value)
    }

    const search = ref<string>('general-inventory')

    const fetchCylinders = () => {
      CylinderController.getCylinders().then((response) => {
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
      fetchSuppliers(1, search.value)
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
      changePage,
      paginationProp,
      fetchSuppliers,
      changeTab,
      search,
    }
  },
})
</script>
