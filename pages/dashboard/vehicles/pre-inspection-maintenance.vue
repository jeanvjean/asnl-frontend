<template>
  <div :key="componentKey" class="py-6 px-6">
    <div v-if="!defaultState" class="bg-white px-6 py-4 mt-6">
      <div class="flex items-center justify-around px-2 py-2 space-x-4 w-full">
        <filter-component />
        <search-component :place-holder="'Search for Vehicles'" />
        <pagination :pagination-details="paginationProp" />
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
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(bodySingle, index) in body"
            :key="index"
            class="font-light hover:bg-gray-100"
          >
            <td class="px-4 text-center py-4">{{ bodySingle.vehCategory }}</td>
            <td class="px-4 text-center py-4">{{ bodySingle.regNo }}</td>
            <td class="px-4 text-center py-4">{{ bodySingle.manufacturer }}</td>
            <td class="px-4 text-center py-4">{{ bodySingle.vehicleType }}</td>
            <td class="px-4 text-center py-4">{{ bodySingle.vModel }}</td>
            <td class="px-4 text-center py-4">{{ bodySingle.currMile }}</td>
            <td class="px-4 text-center py-4">
              <router-link
                :to="'/dashboard/vehicles/preinspection-maintenance-main/'"
                class="
                  px-4
                  py-2
                  border border-btn-purple
                  rounded-sm
                  text-btn-purple text-sm
                "
              >
                View Details
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="mx-auto px-6 sm:px-6 md:px-8 w-full bg-white mt-6">
      <div
        class="
          bg-white
          shadow-sm
          rounded-sm
          h-96
          px-4
          flex
          justify-center
          items-center
        "
      >
        <div class="w-full sm:w-full md:w-3/5 space-y-6">
          <svg
            class="block mx-auto"
            width="139"
            height="111"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity=".7">
              <path
                opacity=".8"
                d="M125.764 11.578a7.562 7.562 0 01-5.254 2.425 7.543 7.543 0 01-5.425-2.008 7.541 7.541 0 018.165-1.962c.931.345 1.785.87 2.514 1.545zM114.067 24.24a7.586 7.586 0 01-.413-10.702 7.581 7.581 0 01.413 10.702z"
                fill="#666A72"
              />
              <path
                d="M113.797 10.798a7.576 7.576 0 01-2.418-5.265 7.577 7.577 0 012.006-5.437 7.582 7.582 0 01.412 10.702z"
                fill="#98A0AA"
              />
              <path
                opacity=".8"
                d="M112.369 12.343a7.547 7.547 0 01-10.679.413 7.548 7.548 0 0110.679-.413z"
                fill="#666A72"
              />
              <path
                d="M36.43 54.263l.005.001.001.004.024 32.792a8.971 8.971 0 01-2.038 5.701 8.936 8.936 0 01-5.191 3.1 8.466 8.466 0 01-1.71.174 8.94 8.94 0 01-6.33-2.622 8.978 8.978 0 01-2.626-6.34l-.017-23.829a8.984 8.984 0 00-2.626-6.34 8.945 8.945 0 00-6.33-2.622l26.839-.02z"
                fill="#C7C7C7"
              />
              <path
                d="M18.547 63.244l.01 12.912-17.898.013-.01-12.912a8.978 8.978 0 012.617-6.344 8.939 8.939 0 0112.655-.009 8.978 8.978 0 012.626 6.34z"
                fill="#98A0AA"
              />
              <path
                d="M103.784 37.378l.053 72.724-38.145.028a8.898 8.898 0 01-6.298-2.609 8.936 8.936 0 01-2.613-6.308l-.045-62.545v-.263c-.145-5.5-4.64-9.913-10.159-9.909l48.3-.035a8.893 8.893 0 016.295 2.61 8.933 8.933 0 012.612 6.307z"
                fill="#C7C7C7"
              />
              <path
                d="M56.783 96.013v.032l-29.26.022a8.652 8.652 0 001.708-.174 8.937 8.937 0 005.191-3.099 8.972 8.972 0 002.04-5.7l-.036-48.411c-.004-5.622 4.54-10.183 10.147-10.187 5.337-.004 9.72 4.125 10.129 9.375.004.237.08 57.662.08 58.142zM123.126 94.868l.004 5.809a9.425 9.425 0 01-2.746 6.657 9.38 9.38 0 01-6.639 2.762l-47.814.035c1.282-.13 3.279-.653 4.86-1.879l.007-.006a8.632 8.632 0 003.266-6.785l-.005-6.556 49.067-.037z"
                fill="#98A0AA"
              />
              <path
                d="M97.433 44.83l-32.209.023.003 3.716 32.209-.024-.003-3.715zM97.445 61.443l-32.209.024.003 3.716 32.209-.024-.003-3.716zM97.457 78.589l-32.208.023.002 3.716 32.21-.023-.004-3.716z"
                fill="#F4FCFC"
              />
              <path
                d="M130.621 51.793l-40.284.03.017 23.949 40.285-.03-.018-23.95z"
                fill="#CDCDCD"
              />
              <path
                d="M99.096 67.295a2.66 2.66 0 002.629-2.691 2.66 2.66 0 00-2.685-2.635 2.66 2.66 0 00-2.63 2.69 2.66 2.66 0 002.686 2.636zM121.911 67.278a2.66 2.66 0 002.629-2.69 2.66 2.66 0 00-2.685-2.636 2.661 2.661 0 00-2.63 2.691 2.66 2.66 0 002.686 2.635zM115.438 63.734c.034 2.976-2.078 5.408-4.718 5.437-2.639.029-4.807-2.364-4.841-5.34-.034-2.977 2.078-5.408 4.718-5.437 2.639-.029 4.806 2.364 4.841 5.34z"
                fill="#C2C2C2"
              />
              <path
                d="M73.89 8.442l.502.92a6.758 6.758 0 002.686 2.687l.918.504-.917.504a6.757 6.757 0 00-2.682 2.691l-.502.92-.503-.92a6.758 6.758 0 00-2.686-2.686l-.918-.503.918-.505a6.758 6.758 0 002.681-2.691l.502-.92zM135.684 88.88l.366.67a4.91 4.91 0 001.952 1.954l.669.366-.668.367a4.908 4.908 0 00-1.95 1.956l-.365.67-.366-.67a4.912 4.912 0 00-1.953-1.953l-.668-.366.668-.367a4.914 4.914 0 001.95-1.957l.365-.67zM9.622 96.048l.529.967a7.093 7.093 0 002.819 2.82l.965.529-.965.529a7.096 7.096 0 00-2.814 2.825l-.527.968-.529-.967a7.095 7.095 0 00-2.819-2.821l-.965-.528.965-.53a7.093 7.093 0 002.814-2.827l.527-.965z"
                fill="#98A0AA"
              />
            </g>
          </svg>
          <span class="block text-center text-gray-500 text-sm leading-6"
            >Seems you do not have any registered vehicles yet.</span
          >
        </div>
      </div>
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
import FilterComponent from '@/components/Base/Filter.vue'
import AssignDriver from '@/components/Overlays/AssignDriver.vue'
import finalStep from '@/components/Overlays/finalStep.vue'
import singleVehicle from '@/components/Overlays/SingleVehicle.vue'
import { VehicleController } from '@/module/Vehicle'
import { DriverObject } from '@/module/Driver'
export default defineComponent({
  name: 'Reports',
  components: {
    Pagination,
    SearchComponent,
    AssignDriver,
    finalStep,
    singleVehicle,
    FilterComponent,
  },
  layout: 'dashboard',
  setup() {
    const defaultState = ref(false)
    const showAssignDriver = ref(false)
    const showFinalStep = ref(false)
    const showSingleVehicle = ref(false)
    const vehicle = ref()
    const headers = [
      'Vehicle Category',
      'Registration No',
      'Manufacturer',
      'Vehicle Type',
      'Vehicle Model',
      'Latest Mileage',
      'Action',
    ]
    const body = ref()
    const drivers = ref()
    const paginationProp = reactive({
      hasNextPage: false,
      hasPrevPage: false,
      currentPage: 1,
    })

    const fetchVehicles = () => {
      VehicleController.fetchVehicles(1).then((response: any) => {
        body.value = response.docs
        paginationProp.hasNextPage = response.hasNextPage
        paginationProp.hasPrevPage = response.hasPrevPage
        paginationProp.currentPage = response.page
      })
    }

    const changeState = () => {
      showAssignDriver.value = false
      showFinalStep.value = true
    }
    const fetchDrivers = () => {
      DriverObject.getDrivers(1)
        .then((response: any) => {
          const driverResponse = response.data.data
          drivers.value = driverResponse.map((el: any) => {
            return {
              name: el.name,
              value: el._id,
            }
          })
        })
        .finally(() => {
          showAssignDriver.value = true
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
        fetchVehicles()
      })
    }
    onMounted(() => {
      fetchVehicles()
    })
    return {
      headers,
      body,
      defaultState,
      showAssignDriver,
      showFinalStep,
      showSingleVehicle,
      fetchDrivers,
      drivers,
      fetchVehicle,
      vehicle,
      deleteVehicle,
      componentKey,
      changeState,
      paginationProp,
    }
  },
})
</script>
