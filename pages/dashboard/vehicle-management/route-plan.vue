<template>
  <div class="py-6 px-6">
    <div class="px-6 flex justify-between items-center">
      <h1>Route Plan</h1>

      <div>
        <button
          class="bg-btn-purple rounded-sm text-white px-4 py-2"
          @click="showRoutePlan = true"
        >
          Create Route Plan
        </button>
      </div>
    </div>

    <div class="bg-white px-6 py-4 mt-6 overflow-auto">
      <div
        class="
          flex
          items-center
          px-2
          py-2
          space-x-4
          sm:w-80
          lg:w-full
          overflow-auto
        "
      >
        <filter-component @filter="showFilter = true" />
        <search-component :place-holder="'Search for Vehicles'" />
        <pagination
          :pagination-details="paginationProp"
          @limitChanged="adjustLimit"
          @next="changePage($event.value)"
          @prev="changePage($event.value)"
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
        :show-loader="showTableLoader"
        :table-headers="headers"
        :table-body="body"
      >
        <template #action=""
          ><button
            class="
              mx-auto
              text-btn-purple
              border-2 border-btn-purple
              py-1.5
              px-8
              rounded-sm
            "
            @click="showRoute = true"
          >
            Details
          </button></template
        >
      </table-component>
    </div>
    <single-route v-if="showRoute" @close="showRoute = false" />
    <route-plan v-if="showRoutePlan" @close="showRoutePlan = false" />
    <route-plan-filter
      v-if="showFilter"
      :filters="routePlanFilters"
      :show-driver="false"
      @close="showFilter = false"
      @filterAdded="filterRoutePlan"
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
import SingleRoute from '@/components/Overlays/DriverRoute.vue'
import RoutePlan from '@/components/Overlays/RoutePlan.vue'
import RoutePlanFilter from '@/components/Overlays/Filter.vue'
import TableComponent from '@/components/Table.vue'
import { VehicleController } from '@/module/Vehicle'
import { getFilters, getQueryString, getTableBody } from '@/constants/utils'

export default defineComponent({
  name: 'Reports',
  components: {
    Pagination,
    SearchComponent,
    SingleRoute,
    FilterComponent,
    RoutePlan,
    RoutePlanFilter,
    TableComponent,
  },
  layout: 'dashboard',
  setup() {
    const showRoute = ref(false)
    const headers = [
      'Vehicle No',
      'RPP Number',
      'Plan Type',
      'Start Date',
      'End Date',
    ]
    const pageNumber = ref<Number>(1)
    const pageLimit = ref<Number>(10)
    const query = ref<string>('')
    const showTableLoader = ref<Boolean>(true)
    const routePlanFilters = {
      activity: {
        list: [
          {
            title: 'Pick Up',
            type: 'radio',
            identifier: 'activity',
            value: 'pick-up',
          },
          {
            title: 'Delivery',
            type: 'radio',
            identifier: 'activity',
            value: 'delivery',
          },
        ],
      },
    }
    const displayedFilters = ref<Array<String>>([])

    const showFilter = ref<Boolean>(false)

    const body = ref<any>([])

    const active = () => {
      pickUp.value = !pickUp.value
      delivery.value = !delivery.value
    }

    const paginationProp = reactive({
      hasNextPage: false,
      hasPrevPage: false,
      currentPage: 1,
    })

    function changePage(nextPage: number) {
      fetchRoutePlans(nextPage, pageLimit.value, query.value)
    }

    function adjustLimit(newLimit: Number) {
      pageLimit.value = newLimit
      fetchRoutePlans(1, pageLimit.value)
    }

    const showRoutePlan = ref<Boolean>(false)

    const pickUp = ref(true)
    const delivery = ref(false)

    const fetchRoutePlans = (
      page: Number,
      limit: Number,
      queryString: string = ''
    ) => {
      showTableLoader.value = true
      VehicleController.fetchRoutePlans(page, limit, queryString)
        .then((response: any) => {
          const routes: any = response.docs.map((route: any) => {
            return {
              _id: route._id,
              vehicleNo: route.vehicle
                ? route.vehicle.regNo
                : 'No Vehicle Assigned',
              rppNumber: route.rppNo ? route.rppNo : 'No RPP Number',
              activity: route.activity,
              startDate: new Date(route.startDate).toDateString(),
              endDate: new Date(route.endDate).toDateString(),
            }
          })

          paginationProp.hasNextPage = response.hasNextPage
          paginationProp.hasPrevPage = response.hasPrevPage
          paginationProp.currentPage = response.page
          body.value = getTableBody(routes, [
            'vehicleNo',
            'rppNumber',
            'activity',
            'startDate',
            'endDate',
          ])
        })
        .finally(() => {
          showTableLoader.value = false
        })
    }

    onMounted(() => {
      fetchRoutePlans(pageNumber.value, pageLimit.value)
    })

    function filterRoutePlan(filters: any) {
      query.value = getQueryString(filters)
      displayedFilters.value = getFilters(filters)
      fetchRoutePlans(1, pageLimit.value, query.value)
    }

    return {
      headers,
      body,
      pickUp,
      delivery,
      active,
      showRoute,
      paginationProp,
      showRoutePlan,
      showFilter,
      routePlanFilters,
      pageNumber,
      pageLimit,
      changePage,
      showTableLoader,
      filterRoutePlan,
      displayedFilters,
      adjustLimit,
    }
  },
})
</script>
