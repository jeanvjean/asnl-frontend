<template>
  <div class="py-6 px-6">
    <div class="px-6">
      <h1>Route Plan</h1>
    </div>

    <div class="bg-white px-6 py-4 mt-6 overflow-auto">
      <div class="flex px-2 py-4 space-x-6 text-black">
        <button
          class="px-2 py-2 focus:outline-none"
          :class="pickUp ? 'text-purple-500 border-b  border-purple-500' : ''"
          @click="active"
        >
          Pick up
        </button>
        <button
          class="px-2 py-2 focus:outline-none"
          :class="delivery ? 'text-purple-500 border-b  border-purple-500' : ''"
          @click="active"
        >
          Delivery
        </button>
      </div>
      <div
        class="flex items-center px-2 py-2 space-x-4 sm:w-80 lg:w-full overflow-auto"
      >
        <div
          class="flex items-center border-2 border-gray-300 justify-around space-x-2 text-gray-500 rounded-sm"
        >
          <svg
            class="w-4 h-4 ml-2 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M17 16v4h-2v-4h-2v-3h6v3h-2zM1 9h6v3H1V9zm6-4h6v3H7V5zM3 0h2v8H3V0zm12 0h2v12h-2V0zM9 0h2v4H9V0zM3 12h2v8H3v-8zm6-4h2v12H9V8z"
            />
          </svg>
          <select
            class="border-l-2 border-t-0 border-b-0 border-r-0 border-gray-300"
          >
            <option value="">Filter By</option>
          </select>
        </div>
        <search-component :place-holder="'Search for Vehicles'" />
        <pagination />
      </div>
      <div class="overflow-auto">
        <table class="w-96 lg:w-full table table-auto mt-2">
          <thead class="bg-gray-200">
            <tr>
              <th class="w-6 px-6 py-4">
                <input type="checkbox" class="border border-gray-500 rounded" />
              </th>
              <th
                v-for="(headSingle, index) in headers"
                :key="index"
                class="uppercase text-gray-800 font-thin text-sm px-4 py-2 text-left"
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
                  class="border-2 border-gray-400 rounded"
                />
              </td>
              <td
                class="px-4 text-left py-4 flex justify-start items-center space-x-2"
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
                  class="mx-auto text-purple-500 border-2 border-purple-500 py-1.5 px-8 rounded-sm"
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
import SingleRoute from '@/components/Overlays/DriverRoute.vue'
export default defineComponent({
  name: 'Reports',
  components: { Pagination, SearchComponent, SingleRoute },
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
