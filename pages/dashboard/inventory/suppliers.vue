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
              @limitChanged="
                ;(pageProps.limit = $event),
                  fetchSuppliers(pageProps.number, pageProps.limit)
              "
            />
          </div>
        </div>
      </div>
      <div class="flex justify-between mb-4 px-6">
        <div class="flex space-x-6 items-center font-medium text-black">
          <filter-button @filter="showFilter = true" />
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
          @click="show = !show"
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
      <div
        v-if="!showLoader"
        class="grid grid-rows-1 lg:grid-cols-5 gap-y-4 md:gap-x-4 py-4 px-6"
      >
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
      <table-loader v-else />
    </div>
    <create-supplier
      v-if="show"
      :supplier-types="supplierTypes"
      :gas-types="productTypes"
      @close="show = false"
      @refresh="fetchSuppliers(1, search)"
    />
    <supplier-filter
      v-if="showFilter"
      :filters="supplierFilters"
      @close="showFilter = false"
      @filterAdded="
        queryString = getQueryString($event)
        displayedFilters = getFilters($event)
        getICns(pageNumber, pageLimit, queryString)
      "
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
import { SupplierDto } from '@/types/Types'
import Pagination from '@/components/Base/Pagination.vue'
import TableLoader from '@/components/TableLoader.vue'
import FilterButton from '@/components/Base/FilterButton.vue'
import SupplierFilter from '@/components/Overlays/Filter.vue'
import { getQueryString, getFilters } from '@/constants/utils'

export default defineComponent({
  name: 'Suppliers',
  components: {
    CreateSupplier,
    Pagination,
    TableLoader,
    FilterButton,
    SupplierFilter,
  },
  layout: 'dashboard',
  setup() {
    const show = ref(false)
    const gasTypes = ref([])
    const showLoader = ref<Boolean>(false)
    const suppliers = ref<Array<SupplierDto>>([])
    const displayedFilters = ref<Array<String>>([])
    const queryString = ref<String>('')
    const showFilter = ref<Boolean>(false)

    const supplierFilters = {
      type: {
        list: [
          {
            title: 'General Inventory',
            type: 'radio',
            identifier: 'search',
            value: 'general-inventory',
          },
          {
            title: 'Gas Refill',
            type: 'radio',
            identifier: 'search',
            value: 'product-gas-refill',
          },
        ],
      },
    }
    const pageProps = {
      number: 1,
      limit: 10,
    }

    function fetchSuppliers(
      pageValue: number,
      limit: number,
      searchValue: string
    ) {
      showLoader.value = true
      ProductObject.fetchSuppliers(pageValue, limit, searchValue)
        .then((response: any) => {
          suppliers.value = response.docs
          paginationProp.hasNextPage = response.hasNextPage
          paginationProp.hasPrevPage = response.hasPrevPage
          paginationProp.currentPage = response.page
        })
        .finally(() => (showLoader.value = false))
    }

    const paginationProp = reactive({
      hasNextPage: false,
      hasPrevPage: false,
      currentPage: 1,
    })

    function changePage(nextPage: number) {
      pageProps.number = nextPage
      fetchSuppliers(pageProps.number, pageProps.limit, search.value)
    }

    const search = ref<string>('general-inventory')

    onMounted(() => {
      fetchSuppliers(pageProps.number, pageProps.limit, search.value)
    })

    const supplierTypes = [
      {
        name: 'Local',
        value: 'local',
      },
      {
        name: 'Foreign',
        value: 'foreign',
      },
    ]
    const productTypes = [
      {
        name: 'General Inventory',
        value: 'general-inventory',
      },
      {
        name: 'Product Gas Refill',
        value: 'gas-refill',
      },
    ]
    return {
      show,
      supplierTypes,
      gasTypes,
      suppliers,
      changePage,
      paginationProp,
      fetchSuppliers,
      search,
      productTypes,
      showLoader,
      displayedFilters,
      supplierFilters,
      queryString,
      showFilter,
      getQueryString,
      getFilters,
      pageProps,
    }
  },
})
</script>
