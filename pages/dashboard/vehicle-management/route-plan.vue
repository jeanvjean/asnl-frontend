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
      <div class="flex px-2 py-4 space-x-6 text-black">
        <button
          class="px-2 py-2 focus:outline-none"
          :class="pickUp ? 'text-btn-purple border-b  border-btn-purple' : ''"
          @click="active"
        >
          Pick up
        </button>
        <button
          class="px-2 py-2 focus:outline-none"
          :class="delivery ? 'text-btn-purple border-b  border-btn-purple' : ''"
          @click="active"
        >
          Delivery
        </button>
      </div>
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
        <pagination :pagination-details="paginationProp" />
      </div>
      <div class="overflow-auto px-4">
        <table class="w-96 lg:w-full table table-auto mt-2">
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
                  text-left
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
              class="font-light"
            >
              <td
                class="
                  px-4
                  text-left
                  py-4
                  flex
                  justify-start
                  items-center
                  space-x-2
                "
              >
                <img
                  class="h-10 w-10 rounded-full"
                  src="@/assets/images/default-avatar.jpg"
                  alt=""
                /><span> {{ bodySingle.name }} </span>
              </td>
              <td class="px-4 text-left py-4">{{ bodySingle.vehicle_no }}</td>
              <td class="px-4 text-left py-4">{{ bodySingle.start }}</td>
              <td class="px-4 text-left py-4">{{ bodySingle.end }}</td>
              <td class="px-4 text-left py-4">
                <button
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
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <single-route v-if="showRoute" @close="showRoute = false" />
    <route-plan v-if="showRoutePlan" @close="showRoutePlan = false" />
    <route-plan-filter
      v-if="showFilter"
      :filters="routePlanFilters"
      :show-driver="true"
      @close="showFilter = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api'
import Pagination from '@/components/Base/Pagination.vue'
import SearchComponent from '@/components/Base/Search.vue'
import FilterComponent from '@/components/Base/FilterButton.vue'
import SingleRoute from '@/components/Overlays/DriverRoute.vue'
import RoutePlan from '@/components/Overlays/RoutePlan.vue'
import RoutePlanFilter from '@/components/Overlays/Filter.vue'

export default defineComponent({
  name: 'Reports',
  components: {
    Pagination,
    SearchComponent,
    SingleRoute,
    FilterComponent,
    RoutePlan,
    RoutePlanFilter,
  },
  layout: 'dashboard',
  setup() {
    const showRoute = ref(false)
    const headers = [
      'Driver Name',
      'Vehicle No',
      'Start Date',
      'End Date',
      'Action',
    ]

    const routePlanFilters = {}

    const showFilter = ref<Boolean>(false)

    const body = [
      {
        name: 'Chinedu Onunyere',
        vehicle_no: '#AAA456JK',
        start: '20 August, 2020',
        end: 'In Progress ',
      },
    ]

    const active = () => {
      pickUp.value = !pickUp.value
      delivery.value = !delivery.value
    }

    const paginationProp = reactive({
      hasNextPage: false,
      hasPrevPage: false,
      currentPage: 1,
    })

    const showRoutePlan = ref<Boolean>(false)

    const pickUp = ref(true)
    const delivery = ref(false)

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
    }
  },
})
</script>
