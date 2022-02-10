<template>
  <div class="py-6 px-6">
    <div class="flex justify-between items-center px-6">
      <h1 class="text-lg font-semibold">Waybill List</h1>
    </div>

    <div class="bg-white px-6 py-4 mt-6">
      <div class="flex items-center justify-around px-2 py-2 space-x-4 w-full">
        <filter-button />
        <search-component :place-holder="'Search'" />
        <pagination
          :pagination-details="paginationProp"
          @limitChanged="adjustLimit"
          @next="changePage($event.value)"
          @prev="changePage($event.value)"
        />
        <button
          class="
            flex
            justify-between
            items-end
            bg-btn-purple
            px-4
            py-2
            space-x-4
            rounded-sm
            text-white
            font-semibold
            text-md
          "
          @click="showTick = true"
          v-if="!showTick"
        >
          Create Route Plan
        </button>
        <button
          class="
            flex
            justify-between
            items-end
            bg-btn-purple
            px-4
            py-2
            space-x-4
            rounded-sm
            text-white
            font-semibold
            text-md
          "
          v-if="showTick && customersDN.length > 0"
          @click="showRoutePlan = true"
        >
          Proceed
        </button>
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
              <th v-if="showTick"></th>
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
                Delivery Number
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
                Inovice Number
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
                Cylinders
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
                  font-thin
                  text-sm
                  px-3
                  py-3
                  text-center
                "
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr v-for="(invoice, index) in body" :key="index">
              <td class="px-2 py-1 text-center" v-if="showTick">
                <input
                  type="checkbox"
                  @change="changedChecked(invoice, index)"
                  class="rounded-sm"
                  v-if="showTick && !invoice.route_plan_id"
                />
              </td>
              <td
                class="
                  text-left
                  capitalize
                  font-light
                  text-md text-center
                  px-6
                  py-6
                  border-white border
                "
              >
                {{ invoice.deliveryNo }}
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
                {{ invoice.invoiceNo }}
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
                {{ invoice.customer.name }}
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
                {{ invoice.cylinders.length }}
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
                <button
                  class="
                    px-6
                    py-1
                    border border-btn-purple
                    rounded-sm
                    text-btn-purple text-sm
                  "
                  @click="
                    $router.push(`/dashboard/sales/waybills/${invoice._id}`)
                  "
                >
                  View
                </button>
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
    <RoutePlan
      v-if="showRoutePlan"
      @close="
        showRoutePlan = false
        $router.go(0)
      "
      :customersDN="customersDN"
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
import FilterButton from '@/components/Base/FilterButton.vue'
import InvoiceFilter from '@/components/Overlays/Filter.vue'
import RoutePlan from '@/components/Overlays/RoutePlan.vue'
import { mainStore } from '@/module/Pinia'
import { getFilters, getQueryString, getTableBody } from '@/constants/utils'
import { VehicleController } from '@/module/Vehicle'
import InvoicePayment from '@/components/Overlays/InvoicePayment.vue'

export default defineComponent({
  name: 'Reports',
  components: {
    Pagination,
    SearchComponent,
    FilterButton,
    InvoiceFilter,
    InvoicePayment,
    RoutePlan,
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

    function adjustLimit(newLimit: Number) {
      pageLimit.value = newLimit
      fetchDelivery(1, pageLimit.value)
    }
    function filterVehicles(filters: any) {
      queryString.value = getQueryString(filters)
      displayedFilters.value = getFilters(filters)
      //   getInvoices(1, pageLimit.value, queryString.value)
    }

    const showPayment = ref(false)
    const showRoutePlan = ref(false)
    const showTick = ref(false)

    const paginationProp = reactive({
      hasNextPage: false,
      hasPrevPage: false,
      currentPage: 1,
    })

    function changePage(nextPage: number) {
      fetchDelivery(nextPage)
    }
    const customersDN = ref<any>([])
    const changedChecked = (d: any, index: number) => {
      if (
        !customersDN.value
          .map((item: any) => item.deliveryNo)
          .includes(d.deliveryNo)
      ) {
        customersDN.value.push({
          name: d.customer.name,
          email: d.customer.email,
          destination: d.customer.destination,
          departure: d.customer.departure,
          deliveryNo: d.deliveryNo,
          numberOfCylinders: d.cylinders.length,
          cylinders: d.cylinders,
        })
      } else {
        customersDN.value.splice(index, 1)
      }
      console.log(customersDN.value)
    }

    const fetchDelivery = (page: Number, limit: Number = 10) => {
      VehicleController.fetchDeliveryNotes(page, limit)
        .then((response: any) => {
          console.log(response.docs)
          body.value = response.docs.map((d: any) => {
            return {
              deliveryNo: d.deliveryNo,
              invoiceNo: d.invoiceNo,
              type: d.deliveryType,
              customer: {
                ...d.customer,
                destination: d.branch.location,
                departure: d.customer.id.address,
              },
              cylinders: d.cylinders,
              date: new Date(d.createdAt).toDateString(),
              _id: d._id,
              route_plan_id: d.route_plan_id ? d.route_plan_id : null,
            }
          })
          paginationProp.hasNextPage = response.hasNextPage
          paginationProp.hasPrevPage = response.hasPrevPage
          paginationProp.currentPage = response.page
        })
        .finally(() => {
          console.log(body.value)
          isLoading.value = false
          console.log('hello')
        })
    }
    onMounted(() => fetchDelivery(page.value, pageLimit.value))

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
      displayedFilters,
      showPayment,
      changedChecked,
      showRoutePlan,
      showTick,
      changePage,
      adjustLimit,
      customersDN,
    }
  },
})
</script>
