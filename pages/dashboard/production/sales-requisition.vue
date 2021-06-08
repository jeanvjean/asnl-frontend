<template>
  <div class="py-6 px-6">
    <div class="bg-white px-6 py-4">
      <div class="bg-white w-full mb-16">
        <button
          class="
            flex
            space-x-2
            items-center
            bg-btn-purple
            rounded-sm
            px-8
            py-3
            text-white
            float-right
          "
        >
          Create Sales Requisition
        </button>
      </div>
      <div
        class="
          flex
          items-center
          justify-between
          px-2
          py-2
          space-x-4
          w-full
          mt-10
        "
      >
        <filter-component />
        <div class="w-1/5">
          <search-component :place-holder="'Search'" />
        </div>
      </div>
      <table class="w-full table-auto mt-2">
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
          <tr v-for="i in 6" :key="i" class="font-light hover:bg-gray-100">
            <td class="w-6 px-6 py-4">
              <input
                type="checkbox"
                class="border-2 border-gray-400 rounded-sm"
              />
            </td>
            <td class="px-4 text-left py-4">Sona Gas</td>
            <td class="px-4 text-left py-4">ASORO985</td>
            <td class="px-4 text-left py-4">12/02/2020</td>
            <td class="px-4 text-left py-4">
              <router-link
                to="/dashboard/production/requisition-details"
                class="
                  border border-btn-purple
                  text-btn-purple
                  py-1
                  px-4
                  rounded-sm
                "
              >
                View Details
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SearchComponent from '@/components/Base/Search.vue'
import FilterComponent from '@/components/Base/FilterButton.vue'

export default defineComponent({
  name: 'Reports',
  components: {
    SearchComponent,
    FilterComponent,
  },
  layout: 'dashboard',
  setup() {
    const vehicle = ref()
    const headers = ['Customer Name', 'ERC No', 'Date', 'Action']
    const body = ref()

    return {
      headers,
      body,
      vehicle,
    }
  },
})
</script>
