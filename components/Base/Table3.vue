<template>
  <div class="overflow-x-auto w-full py-4 px-4">
    <div class="w-full mb-4">
      <div class="flex items-center justify-around px-2 py-2 space-x-4 w-full">
        <div
          class="flex items-center border-2 border-gray-300 justify-around space-x-2 text-gray-500"
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
        <search-component
          :place-holder="'Search for Users, Cylinder no,gas type, Cylinder Volume'"
        />

        <button
          class="flex justify-between items-end bg-purple-600 px-4 py-3 text-white font-semibold text-md"
          @click="show"
        >
          Register Cylinder
        </button>
      </div>
    </div>
    <table class="w-full table-auto">
      <thead class="bg-gray-200">
        <tr>
          <th class="w-6 px-6 py-4">
            <input type="checkbox" class="border border-gray-500 rounded" />
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
            <input type="checkbox" class="border-2 border-gray-400 rounded" />
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
              class="px-4 py-2 border border-purple-500 rounded text-purple-600 text-sm"
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
import SearchComponent from '@/components/Base/Search.vue'

export default defineComponent({
  components: { SearchComponent },
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
