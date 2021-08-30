<template>
  <div class="py-6 px-6">
    <div class="bg-white px-6 py-4 mt-6 overflow-auto">
      <div class="py-2">
        <div class="flex justify-between items-center px-2 border-black mt-4">
          <h1 class="font-semibold text-black text-lg">
            Pending Condemn Cylinder
          </h1>
          <div class="flex items-center space-x-6">
            <pagination :pagination-details="paginationProp" />
          </div>
        </div>
      </div>
      <div class="overflow-auto px-4">
        <table class="table table-fixed mt-2">
          <thead class="bg-gray-100">
            <tr>
              <th class="w-auto text-center px-4">#</th>
              <th
                class="
                  uppercase
                  text-gray-800
                  font-thin
                  text-sm
                  px-4
                  py-2
                  text-left
                  w-2/12
                "
              >
                Initiator
              </th>
              <th
                class="
                  uppercase
                  text-gray-800
                  font-thin
                  text-sm
                  px-4
                  py-2
                  text-left
                  w-2/12
                "
              >
                Approval Stage
              </th>
              <th
                class="
                  uppercase
                  text-gray-800
                  font-thin
                  text-sm
                  px-4
                  py-2
                  text-left
                  w-3/12
                "
              >
                Status
              </th>
              <th
                class="
                  uppercase
                  text-gray-800
                  font-thin
                  text-sm
                  px-4
                  py-2
                  text-left
                  w-3/12
                "
              >
                Next Approval Officer
              </th>

              <th
                class="
                  uppercase
                  text-gray-800
                  font-thin
                  text-sm
                  px-4
                  py-2
                  text-left
                  w-2/12
                "
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(bodySingle, index) in body"
              :key="index"
              class="font-light capitalize w-full"
            >
              <td class="text-center">{{ index + 1 }}</td>
              <td class="px-4 text-left py-4 space-x-2">
                {{
                  bodySingle.initiator && bodySingle.initiator.name
                    ? bodySingle.initiator.name
                    : 'No Initiator'
                }}
              </td>
              <td class="px-4 text-left py-4 space-x-2">
                {{ bodySingle.approvalStage }}
              </td>
              <td class="px-4 text-left py-4">
                <span
                  class="px-4 py-2"
                  :class="
                    bodySingle.approvalStatus === 'pending'
                      ? 'text-gray-500 bg-gray-200'
                      : 'text-green-500 bg-green-100'
                  "
                >
                  {{ bodySingle.approvalStatus }}
                </span>
              </td>
              <td class="px-4 text-left py-4">
                {{ bodySingle.nextApprovalOfficer.name }}
              </td>
              <td class="px-4 text-left py-4 w-3/12">
                <router-link
                  v-if="
                    bodySingle.nextApprovalOfficer &&
                    bodySingle.nextApprovalOfficer._id === user._id
                  "
                  :to="`/dashboard/cylinder-management/condemn-action/${bodySingle._id}`"
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
                </router-link>
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
import { CylinderController } from '@/module/Cylinder'
import { mainStore } from '@/module/Pinia'

export default defineComponent({
  name: 'Reports',
  components: { Pagination },
  layout: 'dashboard',
  setup() {
    const appStore = mainStore()
    const user: any = appStore.getLoggedInUser
    const showRoute = ref(false)

    const body = ref<any>([])

    const paginationProp = reactive({
      hasNextPage: false,
      hasPrevPage: false,
      currentPage: 1,
    })

    onMounted(() => {
      CylinderController.fetchCylinderCondemnation().then((response) => {
        const myResponse = response.data
        body.value = myResponse.docs
        paginationProp.hasNextPage = myResponse.hasNextPage
        paginationProp.hasPrevPage = myResponse.hasPrevPage
        paginationProp.currentPage = myResponse.page
      })
    })

    return {
      body,
      showRoute,
      paginationProp,
      user,
    }
  },
})
</script>
