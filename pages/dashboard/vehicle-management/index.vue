<template>
  <div :key="componentKey" class="py-6 px-6">
    <div class="flex justify-between items-center px-6">
      <h1 class="text-lg font-semibold">All Vehicles</h1>
      <div v-if="user.role === 'admin'">
        <router-link
          to="/dashboard/vehicle-management/create-vehicle"
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

          <span>Create Vehicle</span>
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
          <button class="mx-auto text-black w-6 h-6 relative">
            <svg
              class="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M4 12a2 2 0 110-4 2 2 0 010 4zm6 0a2 2 0 110-4 2 2 0 010 4zm6 0a2 2 0 110-4 2 2 0 010 4z"
              />
            </svg>
          </button>
          <div
            class="
              absolute
              bg-gray-50
              border border-gray-300
              w-40
              font-light
              text-sm
              rounded-sm
              action-menu
              z-50
            "
          >
            <button
              type="button"
              class="
                block
                px-3
                py-2
                text-black
                focus:outline-none
                hover:bg-purple-300 hover:text-white
                w-full
                overflow-none
              "
              @click="fetchVehicle(slotProps.rowId)"
            >
              View Vehicle
            </button>
            <button
              type="button"
              class="
                block
                px-3
                py-2
                text-black
                focus:outline-none
                hover:bg-purple-300 hover:text-white
                w-full
                overflow-none
              "
              @click="fetchDrivers"
            >
              Assign Driver
            </button>
            <router-link
              class="
                block
                px-3
                py-2
                text-black
                focus:outline-none
                hover:bg-purple-300 hover:text-white
                w-full
                overflow-none
              "
              :to="
                '/dashboard/vehicle-management/update-vehicle/' +
                slotProps.rowId
              "
            >
              Update Vehicle
            </router-link>
            <button
              type="button"
              class="
                block
                px-3
                py-2
                text-black
                focus:outline-none
                hover:bg-purple-300 hover:text-white
                w-full
                overflow-none
              "
              @click="
                ;(selectedDriver = slotProps.rowId), (showFinalDelete = true)
              "
            >
              Delete Vehicle
            </button>
            <button
              type="button"
              class="
                block
                px-3
                py-2
                text-black
                focus:outline-none
                hover:bg-purple-300 hover:text-white
                w-full
                overflow-none
              "
            >
              Remove Driver
            </button>
            <router-link
              :to="
                '/dashboard/vehicle-management/corrective-maintenance/' +
                slotProps.rowId
              "
              class="
                block
                px-3
                py-2
                text-black
                focus:outline-none
                hover:bg-purple-300 hover:text-white
                w-full
                overflow-none
              "
            >
              Maintenance Request
            </router-link>
          </div>
        </template>
      </table-component>
    </div>

    <assign-driver
      v-if="showAssignDriver"
      :drivers="drivers"
      @close="showAssignDriver = false"
      @approve="changeState"
    />
    <final-step
      v-if="showFinalStep"
      :status="'success'"
      :message="'Driver has been assigned successfully'"
      @close="showFinalStep = false"
    />
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
    <final-delete
      v-if="showFinalDelete"
      @close="showFinalDelete = false"
      @deleted="deleteVehicle(selectedDriver)"
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
import AssignDriver from '@/components/Overlays/AssignDriver.vue'
import finalStep from '@/components/Overlays/finalStep.vue'
import singleVehicle from '@/components/Overlays/SingleVehicle.vue'
import { VehicleController } from '@/module/Vehicle'
import { DriverObject } from '@/module/Driver'
import VehicleFilter from '@/components/Overlays/Filter.vue'
import FinalDelete from '@/components/Overlays/FinalDelete.vue'
import { mainStore } from '@/module/Pinia'
import TableComponent from '@/components/Table.vue'
import { getFilters, getQueryString, getTableBody } from '~/constants/utils'

export default defineComponent({
  name: 'Reports',
  components: {
    Pagination,
    SearchComponent,
    AssignDriver,
    finalStep,
    singleVehicle,
    FilterComponent,
    VehicleFilter,
    FinalDelete,
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
      'Vehicle Category',
      'Registration No',
      'Manufacturer',
      'Vehicle Type',
      'Vehicle Model',
      'Latest Mileage',
    ]

    const vehicleFilters = reactive({
      category: {
        list: [
          {
            title: 'SUV',
            type: 'radio',
            selected: false,
            identifier: 'search',
            value: 'SUV',
          },
          {
            title: 'Car',
            type: 'radio',
            selected: false,
            identifier: 'search',
            value: 'Car',
          },
          {
            title: 'Bus',
            type: 'radio',
            selected: false,
            identifier: 'search',
            value: 'Bus',
          },
          {
            title: 'Truck',
            type: 'radio',
            selected: false,
            identifier: 'search',
            value: 'Truck',
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
      fetchVehicles(1, pageLimit.value)
    }

    function filterVehicles(filters: any) {
      queryString.value = getQueryString(filters)
      displayedFilters.value = getFilters(filters)
      fetchVehicles(1, pageLimit.value, queryString.value)
    }

    function fetchVehicles(
      pageValue: number,
      pageLimit: Number = 10,
      queryString: String = ''
    ) {
      isLoading.value = true
      VehicleController.fetchVehicles(pageValue, pageLimit, queryString)
        .then((response: any) => {
          body.value = getTableBody(response.docs, [
            'vehCategory',
            'regNo',
            'manufacturer',
            'vehicleType',
            'vModel',
            'currMile',
          ])
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

    function fetchVehicle(vehicleId: string) {
      VehicleController.fetchVehicle(vehicleId)
        .then((response) => {
          vehicle.value = response
        })
        .finally(() => {
          showSingleVehicle.value = true
        })
    }

    const componentKey = ref(0)

    function deleteVehicle(vehicleId: string) {
      VehicleController.deleteVehicle(vehicleId).then(() => {
        showFinalDelete.value = false
        fetchVehicles(page.value)
      })
    }

    onMounted(() => {
      fetchVehicles(page.value)
    })

    return {
      headers,
      body,
      showAssignDriver,
      showFinalStep,
      showSingleVehicle,
      fetchDrivers,
      drivers,
      fetchVehicle,
      vehicle,
      deleteVehicle,
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
      filterVehicles,
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
