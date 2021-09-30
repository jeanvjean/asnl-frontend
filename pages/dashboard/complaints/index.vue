<template>
  <div :key="componentKey" class="py-6 px-6">
    <div class="flex justify-between items-center px-6">
      <h1 class="text-lg font-semibold">All Complaints</h1>
      <div>
        <router-link
          to="/dashboard/complaints/new-complaint"
          class="
            flex
            space-x-2
            items-center
            bg-btn-purple
            rounded-sm
            px-4
            py-2
            text-white
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 fill-current"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>

          <span>Add New</span>
        </router-link>
      </div>
    </div>

    <div class="bg-white px-6 py-4 mt-6">
      <div class="flex items-center justify-around px-2 py-2 space-x-4 w-full">
        <filter-component @filter="showFilter = true" />
        <search-component :place-holder="'Search for Vehicles'" />
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
            :to="`/dashboard/complaint/${slotProps.rowId}`"
            class="
              mx-auto
              py-2
              px-4
              text-btn-purple
              border border-btn-purple
              rounded-sm
            "
          >
            View Complaint
          </router-link>
        </template>
      </table-component>
    </div>

    <single-vehicle
      v-if="showSingleVehicle"
      :vehicle="vehicle"
      @close="showSingleVehicle = false"
    />
    <vehicle-filter
      v-if="showFilter"
      :filters="vehicleFilters"
      :show-date="false"
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
import singleVehicle from '@/components/Overlays/SingleVehicle.vue'
import { CustomerController } from '@/module/Customer'
import { DriverObject } from '@/module/Driver'
import VehicleFilter from '@/components/Overlays/Filter.vue'
import { mainStore } from '@/module/Pinia'
import TableComponent from '@/components/Table.vue'
import { getFilters, getQueryString, getTableBody } from '@/constants/utils'

export default defineComponent({
  name: 'Reports',
  components: {
    Pagination,
    SearchComponent,
    singleVehicle,
    FilterComponent,
    VehicleFilter,
    TableComponent,
  },
  layout: 'dashboard',
  setup() {
    const showAssignDriver = ref(false)
    const showFinalStep = ref(false)
    const showSingleVehicle = ref(false)
    const vehicle = ref()
    const showFilter = ref<Boolean>(false)
    const showFinalDelete = ref<Boolean>(false)
    const selectedDriver = ref<String>('')
    const isLoading = ref<Boolean>(true)
    const pageLimit = ref<Number>(10)
    const body = ref<any>([])
    const drivers = ref()
    const page = ref<number>(1)
    const displayedFilters = ref<Array<String>>([])
    const queryString = ref<String>('')
    const { getLoggedInUser: user } = mainStore()

    const headers = [
      'Customer',
      'Complaint Type',
      'ECR Number',
      'ICN Number',
      'Status',
      'Approval Stage',
      'Date & Time',
    ]

    const vehicleFilters = reactive({
      status: {
        list: [
          {
            title: 'Pending',
            type: 'radio',
            identifier: 'filer',
            value: 'pending',
          },
          {
            title: 'Approved',
            type: 'radio',
            identifier: 'filer',
            value: 'approved',
          },
        ],
      },
    })

    const changeState = () => {
      showAssignDriver.value = false
      showFinalStep.value = true
    }

    const paginationProp = reactive({
      hasNextPage: false,
      hasPrevPage: false,
      currentPage: 1,
    })

    function adjustLimit(newLimit: Number) {
      pageLimit.value = newLimit
      fetchComplaints(1, pageLimit.value)
    }

    function filterComplaints(filters: any) {
      queryString.value = getQueryString(filters)
      displayedFilters.value = getFilters(filters)
      fetchComplaints(1, pageLimit.value, queryString.value)
    }

    const classObject = {
      status: {
        pending:
          'text-white bg-yellow-400 rounded-lg px-2 py-1 capitalize font-semibold',
        approved: 'text-white bg-green-500 rounded-lg px-2 py-1 capitalize',
      },
    }

    function fetchComplaints(
      pageValue: number,
      pageLimit: Number = 10,
      queryString: String = ''
    ) {
      isLoading.value = true
      CustomerController.fetchComplaints(pageValue, pageLimit, queryString)
        .then((response: any) => {
          body.value = response.docs.map((complaint: any) => {
            return {
              customer: complaint.customer.name,
              type: complaint.complaintType,
              ecrNo: complaint.ecrNo,
              icnNo: complaint.icnNo,
              status: complaint.approvalStatus,
              stage: complaint.approvalStage,
              date: new Date(complaint.createdAt).toDateString(),
              _id: complaint._id,
            }
          })
          body.value = getTableBody(
            body.value,
            ['customer', 'type', 'ecrNo', 'icnNo', 'status', 'stage', 'date'],
            classObject
          )
          paginationProp.hasNextPage = response.hasNextPage
          paginationProp.hasPrevPage = response.hasPrevPage
          paginationProp.currentPage = response.page
        })
        .finally(() => (isLoading.value = false))
    }

    function fetchDrivers() {
      DriverObject.getUnPaginatedDrivers().then((response: any) => {
        const driverResponse = response

        drivers.value = driverResponse.map((el: any) => {
          showAssignDriver.value = true
          return {
            name: el.name ?? 'Not Specified',
            value: el._id,
          }
        })
      })
    }

    const componentKey = ref(0)

    onMounted(() => {
      fetchComplaints(page.value, pageLimit.value)
    })

    return {
      headers,
      body,
      showAssignDriver,
      showFinalStep,
      showSingleVehicle,
      fetchDrivers,
      drivers,
      vehicle,
      componentKey,
      paginationProp,
      changeState,
      vehicleFilters,
      showFilter,
      showFinalDelete,
      selectedDriver,
      user,
      isLoading,
      adjustLimit,
      filterComplaints,
      displayedFilters,
    }
  },
})
</script>
<style scoped>
.action-menu {
  display: none;
}
.icon-button:hover > .action-menu {
  display: block;
}
.icon-button:focus > .action-menu {
  display: block;
}
</style>
