<template>
  <div class="overflow-x-auto w-full py-4">
    <div class="w-full mb-4">
      <div class="flex items-center justify-between py-2 w-full">
        <filter-component />

        <div class="flex space-x-4 py-2">
          <form class="w-full flex md:ml-0" autocomplete="off">
            <label for="search_field" class="sr-only">Search</label>
            <div
              class="relative w-full text-gray-400 focus-within:text-gray-600"
            >
              <div
                class="absolute inset-y-0 left-0 ml-4 flex items-center pointer-events-none"
              >
                <!-- Heroicon name: solid/search -->
                <svg
                  class="h-5 w-5 fill-current text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M12.9 14.32a8 8 0 111.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 108 2a6 6 0 000 12z"
                  />
                </svg>
              </div>
              <input
                class="block border rounded-sm-sm border-gray-300 w-full text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 px-10 py-4 sm:text-sm"
                placeholder="Search for Users"
                type="search"
                name="search"
              />
            </div>
          </form>
          <button class="bg-gray-200 rounded-sm-sm px-6 py-4">
            <svg
              class="fill-current w-4 h-4 text-black"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M16.88 9.1A4 4 0 0116 17H5a5 5 0 01-1-9.9V7a3 3 0 014.52-2.59A4.98 4.98 0 0117 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
              />
            </svg>
          </button>
          <button
            class="flex items-center bg-purple-600 px-3 py-2 space-x-2 h-auto text-white font-semibold text-md rounded-sm"
            @click="show"
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
            <span class="text-sm">Create</span>
          </button>
        </div>
      </div>
    </div>
    <table class="w-full table-auto">
      <thead class="bg-gray-200">
        <tr>
          <th class="w-6 px-6 py-4">
            <input type="checkbox" class="border border-gray-500 rounded-sm" />
          </th>
          <th
            v-for="(headSingle, index) in head"
            :key="index"
            class="uppercase text-gray-800 font-thin text-sm px-4 py-2 text-left"
          >
            {{ headSingle }}
          </th>
          <th
            class="uppercase text-gray-800 font-thin text-sm px-4 py-2 text-center"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(bodySingle, index) in body" :key="index" class="font-light">
          <td class="w-6 px-6 py-4">
            <input
              type="checkbox"
              class="border-2 border-gray-400 rounded-sm"
            />
          </td>
          <td class="px-4 text-left py-4">
            <span>{{ bodySingle.assignedNumber }}</span>
          </td>
          <td class="px-4 text-left py-4">{{ bodySingle.gasType.gasName }}</td>
          <td class="px-4 text-left py-4">{{ bodySingle.gasVolumeContent }}</td>
          <td class="px-4 text-left py-4">{{ bodySingle.waterCapacity }}</td>
          <td class="px-4 text-left py-4">
            <span class="px-4 py-2 bg-green-100 text-green-400 capitalize"
              >{{ bodySingle.cylinderType }} Cylinder</span
            >
          </td>
          <td class="px-4 text-left py-4">
            {{ formatDate(bodySingle.dateManufactured) }}
          </td>
          <td class="px-4 text-center py-4">
            <router-link
              :to="'/dashboard/cylinder-management/single/' + bodySingle._id"
              class="px-4 py-2 border border-purple-500 rounded-sm text-purple-600 text-sm"
            >
              View Details
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import FilterComponent from '@/components/Base/Filter.vue'

export default defineComponent({
  components: { FilterComponent },
  props: {
    head: {
      type: Array,
      required: true,
    },
    body: {
      type: Array,
      required: true,
    },
  },
  setup(_props, ctx) {
    const show = () => {
      ctx.emit('show')
    }
    function formatDate(dateValue: string) {
      const date = new Date(dateValue)
      const year = date.getFullYear()
      let month: any = date.getMonth() + 1
      let dt: any = date.getDate()

      if (dt < 10) {
        dt = '0' + dt
      }
      if (month < 10) {
        month = '0' + month
      }

      return year + '-' + month + '-' + dt
    }
    return {
      show,
      formatDate,
    }
  },
})
</script>

<style scoped>
.action-menu {
  display: none;
}
.icon-button:hover ~ .action-menu {
  display: block;
}
.icon-button:focus ~ .action-menu {
  display: block;
}
</style>
