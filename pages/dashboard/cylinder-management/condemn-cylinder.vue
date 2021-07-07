<template>
  <div class="py-6 px-6">
    <div class="bg-white px-6 py-4 mt-6 overflow-auto">
      <div class="py-2">
        <div class="flex justify-between items-center px-2 border-black mt-4">
          <h1 class="font-semibold text-black text-lg">
            Pending Condemned Cylinders
          </h1>
          <div class="flex items-center space-x-6">
            <pagination :pagination-details="paginationProp" />
          </div>
        </div>
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
                >
                  Approve
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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
import { CylinderController } from '~/module/Cylinder'

export default defineComponent({
  name: 'Reports',
  components: { Pagination },
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

    const paginationProp = reactive({
      hasNextPage: false,
      hasPrevPage: false,
      currentPage: 1,
    })

    onMounted(() => {
      CylinderController.fetchPendingChanges().then((response) => {
        console.log(response)
      })
    })

    return {
      headers,
      body,
      showRoute,
      paginationProp,
    }
  },
})
</script>
