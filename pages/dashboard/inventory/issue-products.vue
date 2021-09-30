<template>
  <div class="py-6 px-8">
    <div class="grid grid-rows-1 xl:grid-cols-3 gap-4 mb-6">
      <div class="bg-white px-10 pt-10 pb-24">
        <p class="font-medium text-black tracking-wide pb-4">
          Total Issued Inventory
        </p>
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
        <p class="font-medium text-black tracking-wide pb-4">
          Approved Issued Inventory
        </p>
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
        <p class="font-medium text-black tracking-wide pb-4">
          Pending Issued Inventory
        </p>
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
        <search-component :place-holder="'Search for MRN'" />
        <button
          v-if="auth.role != 'admin'"
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
          @click="showIssueProduct = !showIssueProduct"
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
          <span> Create MRN</span>
        </button>
        <pagination
          :pagination-details="paginationProp"
          @limitChanged="adjustLimit"
          @next="changePage($event.value)"
          @prev="changePage($event.value)"
        />
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
        <tbody v-if="!isLoading">
          <tr
            v-for="(mrn, i) in body"
            :key="i"
            class="font-light hover:bg-gray-100"
          >
            <td class="px-4 text-center py-4">{{ mrn.mrn }}</td>
            <td class="px-4 text-center py-4 capitalize">
              {{ mrn.requestDepartment }}
            </td>
            <td class="px-4 text-center py-4">{{ mrn.customer.name }}</td>
            <td class="px-4 text-center py-4">{{ mrn.jobTag }}</td>
            <td class="px-4 text-left py-4 capitalize">
              <span
                class="px-8 py-2 block text-center"
                :class="{
                  'bg-yellow-400 text-gray-200 font-bold':
                    mrn.requestApproval === 'pending',
                  'bg-green-400 text-gray-200 font-bold':
                    mrn.requestApproval === 'completed',
                }"
              >
                {{ mrn.requestApproval }}
              </span>
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
                @click="fetchDisbursementDetail(mrn)"
              >
                View Details
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <table-loader v-if="isLoading" />
    <default-state v-if="!isLoading && !body.length" />

    <issue-product v-if="showIssueProduct" @close="showIssueProduct = false" />
    <issue-product-detail
      v-if="showIssueProductDetail"
      :mrn="mrnDetail"
      @close="showIssueProductDetail = false"
      @refresh="
        ;(showIssueProductDetail = false),
          fetchPendingDisbursement(pageNumber, pageLimit)
      "
    />
    <mrn-filter
      v-if="showFilter"
      :filters="mrnFilters"
      :show-customers="true"
      :show-date="true"
      @close="showFilter = false"
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
import IssueProduct from '@/components/Overlays/IssueProducts.vue'
import IssueProductDetail from '@/components/Overlays/IssueProductDetail.vue'
import { ProductObject } from '@/module/Product'
import { mainStore } from '@/module/Pinia'
import MrnFilter from '@/components/Overlays/Filter.vue'
import TableLoader from '@/components/TableLoader.vue'
import DefaultState from '@/components/DefaultState.vue'

export default defineComponent({
  name: 'Analytics',
  components: {
    Pagination,
    SearchComponent,
    FilterComponent,
    IssueProduct,
    IssueProductDetail,
    MrnFilter,
    TableLoader,
    DefaultState,
  },
  layout: 'dashboard',
  setup() {
    const headers = ['Mrn No.', 'Request Dept', 'Customer', 'Job Tag', 'Status']
    const showFilter = ref<Boolean>(false)
    const appStore = mainStore()
    const auth: any = appStore.getLoggedInUser
    const body = ref([])
    const showIssueProduct = ref(false)
    const showIssueProductDetail = ref(false)
    const mrnDetail = ref<any>()
    const isLoading = ref<Boolean>(false)

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

    function adjustLimit(newLimit: Number) {
      pageLimit.value = newLimit
      fetchPendingDisbursement(1, pageLimit.value)
    }

    const mrnFilters = reactive({
      status: {
        list: [
          {
            title: 'Pending',
            type: 'radio',
            selected: false,
            identifier: 'status',
            value: 'pending',
          },
          {
            title: 'Approved',
            type: 'radio',
            selected: false,
            identifier: 'status',
            value: 'approved',
          },
        ],
      },
    })

    function getDisbursalStat() {
      ProductObject.fetchDisbursalStatistics().then((response: any) => {
        statistics.approved = response.totalApproved
        statistics.total = response.totalIssuedOut
        statistics.pending = response.totalPending
      })
    }

    const pageNumber = ref<Number>(1)
    const pageLimit = ref<Number>(1)

    function fetchPendingDisbursement(page: Number, limit: Number) {
      isLoading.value = true
      ProductObject.fetchPendingDisbursement(page, limit)
        .then((response) => {
          const mrnResponse: any = response
          body.value = mrnResponse.docs
          paginationProp.hasNextPage = mrnResponse.hasNextPage
          paginationProp.hasPrevPage = mrnResponse.hasPrevPage
          paginationProp.currentPage = mrnResponse.page
        })
        .finally(() => (isLoading.value = false))
    }

    function fetchDisbursementDetail(mrn: any) {
      mrnDetail.value = mrn
      showIssueProductDetail.value = true
    }

    function changePage(newPage: Number) {
      pageNumber.value = newPage
      fetchPendingDisbursement(pageNumber.value, pageLimit.value)
    }

    onMounted(() => {
      Promise.all([
        fetchPendingDisbursement(pageNumber.value, pageLimit.value),
        getDisbursalStat(),
      ])
    })

    return {
      headers,
      body,
      showIssueProduct,
      showIssueProductDetail,
      paginationProp,
      statistics,
      fetchDisbursementDetail,
      mrnDetail,
      auth,
      mrnFilters,
      showFilter,
      isLoading,
      adjustLimit,
      changePage,
      pageNumber,
      pageLimit,
      fetchPendingDisbursement,
    }
  },
})
</script>
