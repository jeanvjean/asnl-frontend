<template>
  <div :key="componentKey" class="py-6 px-8">
    <div class="grid grid-rows-1 xl:grid-cols-3 gap-4 mb-6">
      <div class="bg-white px-10 pt-10 pb-24">
        <p class="font-medium text-black tracking-wide pb-4">Total GRN</p>
        <div class="relative space-x-4 flex justify-between">
          <p class="absolute bottom-0 left-0 top-4 font-medium text-5xl">
            {{ statistics.total }}
          </p>
          <svg
            width="117"
            height="69"
            class="absolute bottom-0 right-0 top-0"
            viewBox="0 0 117 69"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.2"
              d="M85 19C85 17.8954 85.8954 17 87 17H97C98.1046 17 99 17.8954 99 19V69H85V19Z"
              fill="#61A4E4"
            />
            <path
              opacity="0.2"
              d="M103 43C103 41.8954 103.895 41 105 41H115C116.105 41 117 41.8954 117 43V69H103V43Z"
              fill="#61A4E4"
            />
            <path
              d="M68 32C68 30.8954 68.8954 30 70 30H80C81.1046 30 82 30.8954 82 32V69H68V32Z"
              fill="#61A4E4"
            />
            <path
              opacity="0.2"
              d="M51 2C51 0.89543 51.8954 0 53 0H63C64.1046 0 65 0.895431 65 2V69H51V2Z"
              fill="#61A4E4"
            />
            <path
              opacity="0.2"
              d="M34 24C34 22.8954 34.8954 22 36 22H46C47.1046 22 48 22.8954 48 24V69H34V24Z"
              fill="#61A4E4"
            />
            <path
              opacity="0.2"
              d="M17 35C17 33.8954 17.8954 33 19 33H29C30.1046 33 31 33.8954 31 35V69H17V35Z"
              fill="#61A4E4"
            />
            <path
              opacity="0.2"
              d="M0 64C0 62.8954 0.895431 62 2 62H12C13.1046 62 14 62.8954 14 64V69H0V64Z"
              fill="#61A4E4"
            />
          </svg>
        </div>
      </div>
      <div class="bg-white px-10 pt-10 pb-24">
        <p class="font-medium text-black tracking-wide pb-4">Approved GRN</p>
        <div class="relative space-x-4 flex justify-between">
          <p class="absolute bottom-0 left-0 top-4 font-medium text-5xl">
            {{ statistics.approved }}
          </p>
          <svg
            width="117"
            height="69"
            viewBox="0 0 117 69"
            class="absolute bottom-0 right-0 top-0"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.2"
              d="M85 19C85 17.8954 85.8954 17 87 17H97C98.1046 17 99 17.8954 99 19V69H85V19Z"
              fill="#62CFA6"
            />
            <path
              opacity="0.2"
              d="M103 43C103 41.8954 103.895 41 105 41H115C116.105 41 117 41.8954 117 43V69H103V43Z"
              fill="#62CFA6"
            />
            <path
              opacity="0.2"
              d="M68 32C68 30.8954 68.8954 30 70 30H80C81.1046 30 82 30.8954 82 32V69H68V32Z"
              fill="#62CFA6"
            />
            <path
              opacity="0.2"
              d="M51 2C51 0.89543 51.8954 0 53 0H63C64.1046 0 65 0.895431 65 2V69H51V2Z"
              fill="#62CFA6"
            />
            <path
              d="M34 24C34 22.8954 34.8954 22 36 22H46C47.1046 22 48 22.8954 48 24V69H34V24Z"
              fill="#62CFA6"
            />
            <path
              opacity="0.2"
              d="M17 35C17 33.8954 17.8954 33 19 33H29C30.1046 33 31 33.8954 31 35V69H17V35Z"
              fill="#62CFA6"
            />
            <path
              opacity="0.2"
              d="M0 64C0 62.8954 0.895431 62 2 62H12C13.1046 62 14 62.8954 14 64V69H0V64Z"
              fill="#62CFA6"
            />
          </svg>
        </div>
      </div>
      <div class="bg-white px-10 pt-10 pb-24">
        <p class="font-medium text-black tracking-wide pb-4">Pending GRN</p>
        <div class="relative space-x-4 flex justify-between">
          <p class="absolute bottom-0 left-0 top-4 font-medium text-5xl">
            {{ statistics.pending }}
          </p>
          <svg
            width="117"
            height="69"
            class="absolute bottom-0 right-0 top-0"
            viewBox="0 0 117 69"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.2"
              d="M85 19C85 17.8954 85.8954 17 87 17H97C98.1046 17 99 17.8954 99 19V69H85V19Z"
              fill="#FFB269"
            />
            <path
              opacity="0.2"
              d="M103 43C103 41.8954 103.895 41 105 41H115C116.105 41 117 41.8954 117 43V69H103V43Z"
              fill="#FFB269"
            />
            <path
              opacity="0.2"
              d="M68 32C68 30.8954 68.8954 30 70 30H80C81.1046 30 82 30.8954 82 32V69H68V32Z"
              fill="#FFB269"
            />
            <path
              d="M51 2C51 0.89543 51.8954 0 53 0H63C64.1046 0 65 0.895431 65 2V69H51V2Z"
              fill="#FFB269"
            />
            <path
              opacity="0.2"
              d="M34 24C34 22.8954 34.8954 22 36 22H46C47.1046 22 48 22.8954 48 24V69H34V24Z"
              fill="#FFB269"
            />
            <path
              opacity="0.2"
              d="M17 35C17 33.8954 17.8954 33 19 33H29C30.1046 33 31 33.8954 31 35V69H17V35Z"
              fill="#FFB269"
            />
            <path
              opacity="0.2"
              d="M0 64C0 62.8954 0.895431 62 2 62H12C13.1046 62 14 62.8954 14 64V69H0V64Z"
              fill="#FFB269"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="bg-white px-6 py-4 mt-6">
      <div class="flex items-center justify-around px-2 py-2 space-x-4 w-full">
        <filter-component @filter="showFilter = true" />
        <search-component
          :place-holder="'Search for GRN'"
          @search="searchInventories($event)"
        />
        <button
          class="
            px-4
            py-2
            rounded-sm
            text-white
            bg-btn-purple
            flex
            items-center
            space-x-4
          "
          @click="showRecieveProduct = !showRecieveProduct"
        >
          <svg
            class="w-3 h-3 fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 341.4 341.4"
          >
            <path
              d="M192 149.4V0h-42.6v149.4H0V192h149.4v149.4H192V192h149.4v-42.6z"
            />
          </svg>
          <span> Create GRN</span>
        </button>
        <pagination
          :pagination-details="paginationProp"
          @next="changePage($event.value)"
          @prev="changePage($event.value)"
          @limitChanged="adjustPageLimit($event)"
        />
      </div>
      <div>
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
        <table class="w-full table-auto mt-2">
          <thead class="bg-gray-100">
            <tr>
              <th
                v-for="(headSingle, index) in headers"
                :key="index"
                class="
                  uppercase
                  text-gray-800
                  font-thin
                  text-sm
                  px-4
                  py-2
                  text-center
                "
              >
                {{ headSingle }}
              </th>
              <th
                class="
                  uppercase
                  text-gray-800
                  font-thin
                  text-sm
                  px-4
                  py-2
                  text-center
                "
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody v-if="!showLoader">
            <tr
              v-for="(inventory, i) in inventories"
              :key="i"
              class="font-light hover:bg-gray-100"
            >
              <td class="px-4 text-center py-4">
                {{ inventory.grnNo }}
              </td>
              <td class="px-4 text-center py-4">{{ inventory.supplier }}</td>
              <td class="px-4 text-center py-4">{{ inventory.LPOnumber }}</td>
              <td class="px-4 text-center py-4">
                {{ inventory.wayBillNumber }}
              </td>
              <td class="px-4 text-center py-4">
                {{ inventory.invoiceNumber }}
              </td>
              <td class="px-4 text-left py-4 capitalize">
                <span
                  class="px-8 py-2 block text-center"
                  :class="{
                    'bg-yellow-400 text-gray-200 font-bold':
                      !inventory.approved,
                    'bg-green-400 text-gray-200 font-bold': inventory.approved,
                  }"
                >
                  {{ inventory.approved ? 'Completed' : 'Pending' }}
                </span>
              </td>
              <td class="px-4 text-center py-4">
                {{ new Date(inventory.dateReceived).toDateString() }}
              </td>
              <td class="px-4 text-center py-4">
                <button
                  class="
                    px-2
                    py-1
                    border border-btn-purple
                    rounded-sm
                    text-btn-purple text-sm
                  "
                  @click="getInventory(inventory._id)"
                >
                  View Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <table-loader v-if="showLoader" />
      </div>
    </div>
    <recieve-product
      v-if="showRecieveProduct"
      @reload="getInventories(1)"
      @close="showRecieveProduct = false"
    />
    <recieve-product-detail
      v-if="showRecieveDetails"
      :inventory="inventoryDetails"
      @close="showRecieveDetails = false"
      @refresh=";(showRecieveDetails = false), getInventories(1, pageLimit)"
    />
    <grn-filter
      v-if="showFilter"
      :filters="grnFilters"
      @close="showFilter = false"
      @filterAdded="filterInventories($event)"
    />
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  reactive,
} from '@nuxtjs/composition-api'
import Pagination from '@/components/Base/Pagination.vue'
import SearchComponent from '@/components/Base/Search.vue'
import FilterComponent from '@/components/Base/FilterButton.vue'
import RecieveProduct from '@/components/Overlays/RecieveProducts.vue'
import RecieveProductDetail from '@/components/Overlays/RecieveProductDetail.vue'
import { ProductObject } from '@/module/Product'
import GrnFilter from '@/components/Overlays/Filter.vue'
import TableLoader from '@/components/TableLoader.vue'
import { getQueryString, getFilters } from '@/constants/utils'
export default defineComponent({
  name: 'Analytics',
  components: {
    Pagination,
    SearchComponent,
    FilterComponent,
    RecieveProduct,
    RecieveProductDetail,
    GrnFilter,
    TableLoader,
  },
  layout: 'dashboard',
  setup() {
    const headers = [
      'Grn No.',
      'Supplier',
      'LPO No',
      'WayBill No',
      'Invoice No',
      'Status',
      'Date',
    ]
    const inventories = ref<any>([])
    const showRecieveProduct = ref(false)
    const showLoader = ref(true)
    const showRecieveDetails = ref(false)
    const inventoryDetails = ref()
    const pageLimit = ref<number>(10)
    const componentKey = ref(0)

    const paginationProp = reactive({
      hasNextPage: false,
      hasPrevPage: false,
      currentPage: 1,
    })

    const statistics = reactive({
      total: 0,
      approved: 0,
      pending: 0,
    })

    const grnFilters = {
      status: {
        list: [
          {
            title: 'Pending',
            type: 'checkbox',
            selected: false,
            value: 'pending',
            identifier: 'status',
          },
          {
            title: 'Approved',
            type: 'checkbox',
            selected: false,
            value: 'approved',
            identifier: 'status',
          },
        ],
      },
      'product-name': {
        list: [
          {
            title: 'Product Name',
            type: 'text',
            identifier: 'name',
          },
        ],
      },
      'equipment-model': {
        list: [
          {
            title: 'Equipment Model',
            type: 'text',
            identifier: 'model',
          },
        ],
      },
      'equipment-type': {
        list: [
          {
            title: 'Equipment Type',
            type: 'text',
            identifier: 'type',
          },
        ],
      },
    }

    const showFilter = ref<Boolean>(false)

    function changePage(nextPage: number) {
      getInventories(nextPage)
    }

    function getInventories(
      pageNumber: number,
      pageLimit: number = 10,
      query: string = ''
    ) {
      showLoader.value = true
      ProductObject.fetchInventories(pageNumber, pageLimit, query)
        .then((response) => {
          const myResponse = response.data.inventory
          inventories.value = myResponse.docs
          paginationProp.hasNextPage = myResponse.hasNextPage
          paginationProp.hasPrevPage = myResponse.hasPrevPage
          paginationProp.currentPage = myResponse.page
        })
        .finally(() => {
          showLoader.value = false
        })
    }

    function getInventory(value: String) {
      ProductObject.fetchInventory(value).then((response) => {
        inventoryDetails.value = response.data.data
        showRecieveDetails.value = !showRecieveDetails.value
      })
    }

    function getInventoryStat() {
      ProductObject.fetchInventoryStatistics().then((response: any) => {
        statistics.total = response.totalGrn
        statistics.approved = response.totalApprovedGrn
        statistics.pending = response.totalPendingGrn
      })
    }

    function adjustPageLimit(newLimit: number) {
      pageLimit.value = newLimit
      getInventories(1, pageLimit.value, queryString.value)
    }
    const queryString = ref<string>('')
    const displayedFilters = ref<Array<String>>([])

    const searchInventories = (searchValue: String) => {
      if (searchValue) {
        displayedFilters.value = []
        queryString.value = ''
        const searchString = `&search=${searchValue}`
        getInventories(1, pageLimit.value, searchString)
      } else {
        getInventories(1, pageLimit.value)
      }
    }

    function filterInventories(filters: any) {
      queryString.value = getQueryString(filters)
      displayedFilters.value = getFilters(filters)
      getInventories(1, pageLimit.value, queryString.value)
    }

    onMounted(() => {
      Promise.all([getInventories(1), getInventoryStat()])
    })

    return {
      headers,
      inventories,
      showRecieveProduct,
      getInventory,
      showRecieveDetails,
      inventoryDetails,
      componentKey,
      paginationProp,
      changePage,
      getInventories,
      statistics,
      showFilter,
      grnFilters,
      showLoader,
      adjustPageLimit,
      filterInventories,
      displayedFilters,
      searchInventories,
      pageLimit,
    }
  },
})
</script>
