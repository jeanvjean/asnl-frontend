<template>
  <div class="py-6 px-6">
    <div class="flex justify-between items-center px-6">
      <h1 class="text-lg font-semibold">Invoice List</h1>
    </div>

    <div class="bg-white px-6 py-4 mt-6">
      <div class="flex items-center justify-around px-2 py-2 space-x-4 w-full">
        <filter-component @filter="showFilter = true" />
        <search-component :place-holder="'Search'" />
        <pagination
          :pagination-details="paginationProp"
          @limitChanged="adjustLimit"
        />
      </div>
      <div class="w-full flex items-center space-x-4 px-6 py-2">
        <div
          v-for="(selectedFilter, j) in displayedFilters"
          :key="j"
          class="
            bg-purple-400 bg-opacity-10
            text-purple-700
            font-medium
            capitalize
            flex
            items-center
            space-x-2
            px-4
            py-2
            rounded-lg
            text-xs
          "
        >
          <span class="rounded-md">{{ selectedFilter }}</span>
        </div>
      </div>
      <table-component
        :show-loader="isLoading"
        :table-headers="headers"
        :table-body="body"
      >
        <template #action="slotProps">
          <router-link
            :to="`/dashboard/invoice/${slotProps.rowId}`"
            class="
              mx-auto
              p-1
              text-btn-purple
              border border-btn-purple
              rounded-sm
              block
            "
          >
            View Invoice
          </router-link>
        </template>
      </table-component>
    </div>

    <invoice-filter
      v-if="showFilter"
      :filters="invoiceFilters"
      :show-date="true"
      @close="showFilter = false"
      @filterAdded="filterVehicles"
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
import Pagination from '@/components/Base/Pagination.vue'
import SearchComponent from '@/components/Base/Search.vue'
import FilterComponent from '@/components/Base/FilterButton.vue'
import InvoiceFilter from '@/components/Overlays/Filter.vue'
import { mainStore } from '@/module/Pinia'
import TableComponent from '@/components/Table.vue'
import { getFilters, getQueryString, getTableBody } from '@/constants/utils'
import { fetchInvoices } from '@/module/Account'

export default defineComponent({
  name: 'Reports',
  components: {
    Pagination,
    SearchComponent,
    FilterComponent,
    InvoiceFilter,
    TableComponent,
  },
  layout: 'dashboard',
  setup() {
    const vehicle = ref()
    const showFilter = ref<Boolean>(false)
    const selectedVehicle = ref<String>('')
    const isLoading = ref<Boolean>(true)
    const pageLimit = ref<Number>(10)
    const body = ref<any>([])
    const page = ref<number>(1)
    const displayedFilters = ref<Array<String>>([])
    const queryString = ref<String>('')
    const { getLoggedInUser: user } = mainStore()

    const headers = [
      'Invoice Number',
      'Invoice Type',
      'Customer',
      'Total Amount',
      'Date',
    ]

    const invoiceFilters = reactive({
      type: {
        list: [
          {
            title: 'Cylinder',
            type: 'radio',
            selected: false,
            identifier: 'cylinderType',
            value: 'cylinder',
          },
          {
            title: 'Product',
            type: 'radio',
            selected: false,
            identifier: 'cylinderType',
            value: 'product',
          },
        ],
      },
    })

    const paginationProp = reactive({
      hasNextPage: false,
      hasPrevPage: false,
      currentPage: 1,
    })

    function adjustLimit(newLimit: Number) {
      pageLimit.value = newLimit
      getInvoices(1, pageLimit.value)
    }

    function filterVehicles(filters: any) {
      queryString.value = getQueryString(filters)
      displayedFilters.value = getFilters(filters)
      getInvoices(1, pageLimit.value, queryString.value)
    }

    function getInvoices(
      pageValue: number,
      pageLimit: Number = 10,
      queryString: String = ''
    ) {
      isLoading.value = true
      fetchInvoices(pageValue, pageLimit, queryString)
        .then((response: any) => {
          body.value = response.docs.map((invoice: any) => {
            return {
              invoiceNumber: invoice.invoiceNo,
              type: invoice.recieptType,
              customer: invoice.customer,
              amount: invoice.totalAmount,
              date: new Date(invoice.createdAt).toDateString(),
              _id: invoice._id,
            }
          })

          body.value = getTableBody(body.value, [
            'invoiceNumber',
            'type',
            'customer',
            'amount',
            'date',
          ])
          paginationProp.hasNextPage = response.hasNextPage
          paginationProp.hasPrevPage = response.hasPrevPage
          paginationProp.currentPage = response.page
        })
        .finally(() => (isLoading.value = false))
    }

    onMounted(() => {
      getInvoices(page.value, pageLimit.value)
    })

    return {
      headers,
      body,
      vehicle,
      paginationProp,
      invoiceFilters,
      showFilter,
      selectedVehicle,
      user,
      isLoading,
      adjustLimit,
      filterVehicles,
      displayedFilters,
    }
  },
})
</script>
