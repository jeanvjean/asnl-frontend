/* eslint-disable vue/no-parsing-error */
<template>
  <div class="py-6 px-8">
    <div class="grid grid-rows-1 xl:grid-cols-3 gap-4 mb-6">
      <div class="bg-white px-10 pt-10 pb-24">
        <p class="font-medium text-black tracking-wide pb-4">
          Total Transfer Request
        </p>
        <div class="relative space-x-4 flex justify-between">
          <p class="absolute bottom-0 left-0 top-4 font-medium text-5xl">
            {{ statistics.totalTransferRequest }}
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
          Total Approved Request
        </p>
        <div class="relative space-x-4 flex justify-between">
          <p class="absolute bottom-0 left-0 top-4 font-medium text-5xl">
            {{ statistics.totalApprovedRequest }}
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
          Total Pending Request
        </p>
        <div class="relative space-x-4 flex justify-between">
          <p class="absolute bottom-0 left-0 top-4 font-medium text-5xl">
            {{ statistics.totalPendingRequest }}
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
    <div class="bg-white">
      <div class="py-2">
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
          <h1 class="font-semibold text-black text-lg">Transfer Request</h1>
          <div class="flex items-center space-x-6">
            <pagination
              :pagination-details="paginationProp"
              @next="fetchPendingList($event.value)"
              @prev="fetchPendingList($event.value)"
              @limitChanged="adjustPageLimit($event)"
            />
          </div>
        </div>
      </div>
      <div class="w-full mb-4 px-4">
        <div
          class="flex items-center justify-between px-2 py-2 w-full space-x-4"
        >
          <filter-button @filter="showFilter = true" />
          <search-component
            :place-holder="'Search'"
            @search="searchTransfers($event)"
          />
          <router-link
            v-if="user.role !== 'admin'"
            to="/dashboard/cylinder-management/transfer"
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
            <span> Initiate Transfer</span>
          </router-link>
        </div>
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
      <div class="overflow-x-auto w-full py-2 px-6">
        <div class="overflow-x-auto w-full">
          <table class="table-fixed w-full">
            <thead class="bg-gray-100">
              <tr class="space-x-4">
                <th class="w-2 px-4">#</th>
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
                    w-40
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
                    sm:w-40
                    2xl:w-32
                  "
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody v-if="!isLoading">
              <tr
                v-for="(bodySingle, index) in body"
                :key="index"
                class="font-light hover:bg-gray-100"
              >
                <td class="text-center px-4">{{ index + 1 }}</td>
                <td class="px-4 text-center py-4 capitalize">
                  {{ bodySingle.branch.name }}
                </td>
                <td class="px-4 text-center py-4 capitalize">
                  {{ bodySingle.branch.location }}
                </td>
                <td class="px-4 text-center py-4 capitalize">
                  {{
                    bodySingle.initiator && bodySingle.initiator.name
                      ? bodySingle.initiator.name
                      : 'No Initiator'
                  }}
                </td>
                <td class="px-4 text-center py-4 capitalize">
                  {{ bodySingle.approvalStage }}
                </td>
                <td class="px-4 text-center py-4 capitalize">
                  {{ bodySingle.type }}
                </td>
                <td class="px-4 text-center py-4 w-full">
                  <div>
                    <span
                      :class="
                        bodySingle.transferStatus === 'pending'
                          ? 'bg-blue-100 text-blue-400'
                          : bodySingle.transferStatus === 'completed'
                          ? 'bg-green-100 text-green-400'
                          : 'bg-red-100 text-red-400'
                      "
                      class="px-8 py-2 w-full block text-center capitalize"
                      >{{ bodySingle.transferStatus }}</span
                    >
                  </div>
                </td>
                <td class="px-4 text-center py-4 capitalize">
                  <span v-if="bodySingle.nextApprovalOfficer">
                    {{ bodySingle.nextApprovalOfficer.name }}
                  </span>
                </td>
                <td class="px-4 text-center py-4">
                  <div
                    v-if="
                      bodySingle.nextApprovalOfficer &&
                      bodySingle.nextApprovalOfficer._id === user._id &&
                      bodySingle.transferStatus !== 'completed'
                    "
                  >
                    <router-link
                      v-if="bodySingle.type === 'temporary'"
                      :to="`/dashboard/cylinder-management/within-division/${bodySingle._id}`"
                      class="
                        border border-btn-purple
                        rounded-sm
                        text-btn-purple
                        px-4
                        py-2
                      "
                    >
                      Approve
                    </router-link>
                    <router-link
                      else
                      :to="`/dashboard/cylinder-management/outright-sale-action/${bodySingle._id}`"
                      class="
                        border border-btn-purple
                        rounded-sm
                        text-btn-purple
                        px-4
                        py-2
                      "
                    >
                      Approve
                    </router-link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table-loader v-if="isLoading" />
          <default-state v-if="!isLoading && !body.length" />
        </div>
      </div>
    </div>
    <new-cylinder v-if="showRegister" @close="showRegister = false" />
    <transfer-filter
      v-if="showFilter"
      :filters="cylinderTransferFilters"
      @close="showFilter = false"
      @filterAdded="filterTransfers($event)"
    />
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  reactive,
  ref,
} from '@nuxtjs/composition-api'
import SearchComponent from '@/components/Base/Search.vue'
import { CylinderController } from '@/module/Cylinder'
import Pagination from '@/components/Base/Pagination.vue'
import { mainStore } from '@/module/Pinia'
import TransferFilter from '@/components/Overlays/Filter.vue'
import FilterButton from '@/components/Base/FilterButton.vue'
import TableLoader from '@/components/TableLoader.vue'
import { getFilters, getQueryString } from '~/constants/utils'
import DefaultState from '@/components/DefaultState.vue'

export default defineComponent({
  name: 'Analytics',
  components: {
    SearchComponent,
    Pagination,
    TransferFilter,
    FilterButton,
    TableLoader,
    DefaultState,
  },
  layout: 'dashboard',
  setup() {
    const appStore = mainStore()
    const user: any = appStore.getLoggedInUser
    const showFilter = ref<Boolean>(false)
    const isLoading = ref<Boolean>(false)
    const pageLimit = ref<Number>(10)
    const displayedFilters = ref<Array<String>>([])
    const queryString = ref<String>('')

    const headers = [
      'Branch',
      'Location',
      'Transfer Initiator',
      'Approval Stage',
      'Transfer Type',
      'Status',
      'Next Approval Officer',
    ]

    const cylinderTransferFilters = {
      type: {
        list: [
          {
            title: 'Within Division',
            type: 'checkbox',
            selected: false,
            identifier: 'filter',
            value: 'temporary',
          },
          {
            title: 'Outright Sales',
            type: 'checkbox',
            selected: false,
            identifier: 'filter',
            value: 'sale',
          },
          {
            title: 'Transfer',
            type: 'checkbox',
            selected: false,
            identifier: 'filter',
            value: 'division',
          },
        ],
      },
      status: {
        list: [
          {
            title: 'Pending',
            type: 'checkbox',
            selected: false,
            identifier: 'status',
            value: 'pending',
          },
          {
            title: 'Completed',
            type: 'checkbox',
            selected: false,
            identifier: 'status',
            value: 'completed',
          },
        ],
      },
      'approval-stage': {
        list: [
          {
            title: 'Stage 1',
            type: 'checkbox',
            selected: false,
            identifier: 'stage',
            value: '1',
          },
          {
            title: 'Stage 2',
            type: 'checkbox',
            selected: false,
            identifier: 'stage',
            value: '2',
          },
          {
            title: 'Approved',
            type: 'checkbox',
            selected: false,
            identifier: 'stage',
            value: 'approved',
          },
        ],
      },
    }

    const body = ref<any>([])

    onBeforeMount(() => {
      Promise.all([fetchPendingList(1, pageLimit.value), fetchTransferStat()])
    })

    function adjustPageLimit(newLimit: number) {
      pageLimit.value = newLimit
      fetchPendingList(1, pageLimit.value)
    }

    const paginationProp = reactive({
      hasNextPage: false,
      hasPrevPage: false,
      currentPage: 1,
    })

    const statistics = reactive({
      totalTransferRequest: 0,
      totalApprovedRequest: 0,
      totalPendingRequest: 0,
    })

    function fetchTransferStat() {
      CylinderController.getTransferStatistics().then((response) => {
        const stat = response.data
        statistics.totalTransferRequest = stat.all_transfers
        statistics.totalApprovedRequest = stat.approvedTransfers
        statistics.totalPendingRequest = stat.pendingTransfers
      })
    }

    function fetchPendingList(
      pageNumber: Number,
      limit: Number,
      query: String = ''
    ) {
      isLoading.value = true
      CylinderController.fetchPendingTransfers(pageNumber, limit, query)
        .then((response) => {
          const myResponse = response.data.transfer
          body.value = myResponse.docs
          paginationProp.hasNextPage = myResponse.hasNextPage
          paginationProp.hasPrevPage = myResponse.hasPrevPage
          paginationProp.currentPage = myResponse.page
        })
        .finally(() => (isLoading.value = false))
    }

    const searchTransfers = (searchValue: String) => {
      if (searchValue) {
        displayedFilters.value = []
        queryString.value = ''
        const searchString = `&search=${searchValue}`
        fetchPendingList(1, pageLimit.value, searchString)
      } else {
        fetchPendingList(1, pageLimit.value)
      }
    }

    function filterTransfers(filters: any) {
      queryString.value = getQueryString(filters)
      displayedFilters.value = getFilters(filters)

      fetchPendingList(1, pageLimit.value, queryString.value)
    }

    const showRegister = ref(false)
    return {
      headers,
      body,
      showRegister,
      statistics,
      paginationProp,
      fetchPendingList,
      user,
      cylinderTransferFilters,
      showFilter,
      isLoading,
      adjustPageLimit,
      filterTransfers,
      searchTransfers,
      displayedFilters,
    }
  },
})
</script>
