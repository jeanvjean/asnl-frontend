<template>
  <div class="overflow-x-auto w-full py-4 px-4">
    <div v-if="showMain" class="w-full mb-4">
      <div class="flex items-center justify-around px-2 py-2 space-x-4 w-full">
        <filter-component />
        <search-component
          :place-holder="'Search for Users, Cylinder no,gas type, Cylinder Volume'"
        />

        <button
          class="flex justify-between items-end bg-purple-600 px-4 py-2 text-white font-semibold text-md"
          @click="show"
        >
          Register Cylinder
        </button>
      </div>
    </div>
    <div v-else class="w-full mb-4">
      <div class="flex items-center justify-between px-2 py-2 w-full">
        <div>
          <button
            class="flex space-x-4 items-center bg-gray-200 rounded-sm px-5 py-2.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="w-6 h-6 fill-current text-transparent"
              stroke="black"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span>Filter</span>
          </button>
        </div>
        <div class="w-1/3">
          <search-component :place-holder="'Search'" />
        </div>
      </div>
    </div>
    <div class="overflow-x-auto w-full">
      <table class="table-auto w-full">
        <thead class="bg-gray-200">
          <tr>
            <th class="w-6 px-6 py-4">
              <input
                type="checkbox"
                class="border border-gray-500 rounded-sm"
              />
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
            <td class="px-4 text-left py-4">
              <span>{{ bodySingle.assignedNumber }}</span>
            </td>
            <td class="px-4 text-left py-4">
              {{ bodySingle.gasType.gasName }}
            </td>
            <td class="px-4 text-left py-4">
              {{ bodySingle.gasVolumeContent }}
            </td>
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
                class="px-4 py-2 border border-purple-500 rounded-sm text-purple-600 text-sm inline-block w-full"
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
import { defineComponent } from '@nuxtjs/composition-api'
import SearchComponent from '@/components/Base/Search.vue'
import FilterComponent from '@/components/Base/Filter.vue'

export default defineComponent({
  components: { SearchComponent, FilterComponent },
  props: {
    head: {
      type: Array,
      required: true,
    },
    body: {
      type: Array,
      required: true,
    },
    showMain: {
      type: Boolean,
      required: false,
      default: true,
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
