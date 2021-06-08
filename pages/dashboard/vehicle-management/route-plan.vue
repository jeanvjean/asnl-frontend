<template>
  <div class="py-6 px-6">
    <div class="px-6">
      <h1>Route Plan</h1>
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
        <filter-component />
        <search-component :place-holder="'Search for Vehicles'" />
        <pagination />
      </div>
      <div class="overflow-auto">
        <table class="w-96 lg:w-full table table-auto mt-2">
          <thead class="bg-gray-100">
            <tr>
              <th class="w-6 px-6 py-4">
                <input
                  type="checkbox"
                  class="border border-gray-500 rounded-sm"
                />
              </th>
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
              <td class="w-6 px-6 py-4">
                <input
                  type="checkbox"
                  class="border-2 border-gray-400 rounded-sm"
                />
              </td>
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
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=ZIOeP15SMT&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import Pagination from '@/components/Base/Pagination.vue'
import SearchComponent from '@/components/Base/Search.vue'
import FilterComponent from '@/components/Base/Filter.vue'
import SingleRoute from '@/components/Overlays/DriverRoute.vue'
export default defineComponent({
  name: 'Reports',
  components: { Pagination, SearchComponent, SingleRoute, FilterComponent },
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
    const pickUp = ref(true)
    const delivery = ref(false)
    return {
      headers,
      body,
      pickUp,
      delivery,
      active,
      showRoute,
    }
  },
})
</script>
