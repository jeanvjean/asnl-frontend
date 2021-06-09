<template>
  <div class="overflow-x-auto w-full py-4">
    <div class="w-full mb-4">
      <div class="flex items-center justify-between py-1 w-full">
        <filter-component />
        <div class="w-1/4">
          <search-component :place-holder="'Search'" />
        </div>
      </div>
    </div>
    <table class="w-full table-auto">
      <thead class="bg-gray-100">
        <tr>
          <th class="w-6 px-6 py-4">
            <input type="checkbox" class="border border-gray-500 rounded-sm" />
          </th>
          <th
            v-for="(headSingle, index) in head"
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
          <th
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
              :to="'/dashboard/cylinder-management/cylinder/' + bodySingle._id"
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
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import FilterComponent from '@/components/Base/Filter.vue'
import SearchComponent from '@/components/Base/Search.vue'

export default defineComponent({
  components: { FilterComponent, SearchComponent },
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
