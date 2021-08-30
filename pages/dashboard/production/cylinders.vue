<template>
  <div class="py-6">
    <div class="mx-auto px-4 sm:px-6 md:px-8 w-full">
      <div class="bg-white shadow-sm rounded-sm h-full px-4">
        <div class="overflow-x-auto w-full py-4">
          <div class="w-full mb-4">
            <div
              class="
                flex
                items-center
                justify-between
                px-2
                py-2
                space-x-4
                w-full
              "
            >
              <filter-button />
              <div>
                <search-component :place-holder="'Search'" />
              </div>
            </div>
          </div>

          <table class="w-full table-auto">
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
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(cylinder, index) in body"
                :key="index"
                class="font-light hover:bg-gray-100"
              >
                <td class="w-6 px-6 py-4">
                  <input
                    type="checkbox"
                    class="border-2 border-gray-400 rounded-sm"
                  />
                </td>

                <td class="px-4 text-left py-4">
                  {{ cylinder.assignedNumber }}
                </td>
                <td class="px-4 text-left py-4">{{ cylinder.cylinderType }}</td>
                <td class="px-4 text-left py-4">
                  {{ cylinder.gasType.gasName }}
                </td>
                <td class="px-4 text-left py-4">
                  {{ cylinder.waterCapacity }}
                </td>
                <td class="px-4 text-left py-4">
                  {{ new Date(cylinder.dateManufactured).toDateString() }}
                </td>

                <td class="px-4 text-center py-4">
                  <router-link
                    :to="
                      '/dashboard/cylinder-management/cylinder/' + cylinder._id
                    "
                    class="
                      px-6
                      py-1
                      border border-btn-purple
                      rounded-sm
                      text-btn-purple text-sm
                    "
                  >
                    Details
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, ref } from '@nuxtjs/composition-api'
import { CylinderController } from '@/module/Cylinder'
import FilterButton from '@/components/Base/FilterButton.vue'
import SearchComponent from '@/components/Base/Search.vue'

export default defineComponent({
  name: 'CylinderPool',
  components: { FilterButton, SearchComponent },
  layout: 'dashboard',
  setup() {
    const headers = [
      'Cylinder No',
      'Cylinder Type',
      'Gas Type',
      'Water Capacity',
      'Date Manufactured',
    ]

    const body = ref<Object[]>()

    onBeforeMount(() => {
      CylinderController.getRegisteredCylinders(1).then((responses: any) => {
        body.value = responses.data.cylinders.docs
        console.log(body)
      })
    })

    return {
      headers,
      body,
    }
  },
})
</script>
