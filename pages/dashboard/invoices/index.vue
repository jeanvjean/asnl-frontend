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
          @next="getInvoices($event.value)"
          @prev="getInvoices($event.value)"
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
      <div class="w-full">
        <table
          style="border-spacing: 0 15px"
          class="w-full table-auto table border-separate"
        >
          <thead
            class="bg-gray-200 tracking-tight text-base font-semibold uppercase"
          >
            <tr>
              <th></th>
              <th
                class="
                  uppercase
                  text-gray-800
                  font-thin
                  text-sm
                  px-3
                  py-3
                  text-center
                "
              >
                Invoice Number
              </th>
              <th
                class="
                  uppercase
                  text-gray-800
                  font-thin
                  text-sm
                  px-3
                  py-3
                  text-center
                "
              >
                Invoice Type
              </th>
              <th
                class="
                  uppercase
                  text-gray-800
                  font-thin
                  text-sm
                  px-3
                  py-3
                  text-center
                "
              >
                Customer
              </th>
              <th
                class="
                  uppercase
                  text-gray-800
                  font-thin
                  text-sm
                  px-3
                  py-3
                  text-center
                "
              >
                Total Amount
              </th>
              <th
                class="
                  uppercase
                  text-gray-800
                  font-thin
                  text-sm
                  px-3
                  py-3
                  text-center
                "
              >
                Date
              </th>
              <th
                class="
                  uppercase
                  text-gray-800
                  font-light
                  text-sm
                  px-6
                  py-2
                  text-center
                "
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr v-for="(invoice, index) in body" :key="index">
              <td class="px-2 py-1 text-center">
                <input
                  type="checkbox"
                  :checked="invoiceId == invoice._id ? true : false"
                  @change="changedChecked(invoice)"
                  class="rounded-sm"
                />
              </td>
              <td
                class="
                  text-left
                  capitalize
                  font-light
                  text-md
                  px-6
                  py-6
                  border-white border
                "
              >
                {{ invoice.invoiceNumber }}
              </td>
              <td
                class="
                  text-center
                  capitalize
                  font-light
                  text-md
                  px-6
                  py-6
                  border-white border
                "
              >
                {{ invoice.type }}
              </td>
              <td
                class="
                  text-center
                  capitalize
                  font-light
                  text-md
                  px-6
                  py-6
                  border-white border
                "
              >
                {{ invoice.customer }}
              </td>
              <td
                class="
                  text-center
                  capitalize
                  font-light
                  text-md
                  px-6
                  py-6
                  border-white border
                "
              >
                {{ formatCurrency(invoice.amount) }}
              </td>
              <td
                class="
                  text-center
                  capitalize
                  font-light
                  text-md
                  px-6
                  py-6
                  border-white border
                "
              >
                {{ invoice.date }}
              </td>
              <td>
                <router-link
                  :to="`/dashboard/invoice/${invoice._id}`"
                  class="
                    text-center
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
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <invoice-payment
      v-if="showPayment"
      @makePayment="makePayment"
      @close=";(showPayment = false), (inoviceId = '')"
    />
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
  useContext,
} from '@nuxtjs/composition-api'
import Pagination from '@/components/Base/Pagination.vue'
import SearchComponent from '@/components/Base/Search.vue'
import FilterComponent from '@/components/Base/FilterButton.vue'
import InvoiceFilter from '@/components/Overlays/Filter.vue'
import { mainStore } from '@/module/Pinia'
import { getFilters, getQueryString, getTableBody } from '@/constants/utils'
import { fetchInvoices, updateInvoice } from '@/module/Account'
import InvoicePayment from '@/components/Overlays/InvoicePayment.vue'
import formatCurrency from '@/utils/formatCurrency'

export default defineComponent({
  name: 'Reports',
  components: {
    Pagination,
    SearchComponent,
    FilterComponent,
    InvoiceFilter,
    InvoicePayment,
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

    const context = useContext()
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

    const showPayment = ref(false)

    const paginationProp = reactive({
      hasNextPage: false,
      hasPrevPage: false,
      currentPage: 1,
    })

    function adjustLimit(newLimit: Number) {
      pageLimit.value = newLimit
      getInvoices(1, pageLimit.value)
    }
    const invoiceId = ref('')
    function changedChecked(invoice: any) {
      showPayment.value = true
      invoiceId.value = invoice._id
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
              customer: invoice.customer.name,
              amount: invoice.totalAmount,
              date: new Date(invoice.createdAt).toDateString(),
              _id: invoice._id,
            }
          })

          paginationProp.hasNextPage = response.hasNextPage
          paginationProp.hasPrevPage = response.hasPrevPage
          paginationProp.currentPage = response.page
        })
        .finally(() => (isLoading.value = false))
    }
    const makePayment = (form: any) => {
      console.log(form)
      if (!form.amount) {
        context.$toast.error('Specify an amount.')
        return
      }
      updateInvoice(invoiceId.value, { amountPaid: form.amount })
        .then((data) => {
          console.log(data)
          showPayment.value = false
        })
        .catch((err) => console.log(err))
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
      getInvoices,
      displayedFilters,
      showPayment,
      changedChecked,
      invoiceId,
      formatCurrency,
      makePayment,
    }
  },
})
</script>
