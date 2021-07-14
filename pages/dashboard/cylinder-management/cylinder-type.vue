<template>
  <div class="py-6 px-6">
    <div class="bg-white px-6 py-4 mt-6 overflow-auto">
      <div class="py-2">
        <div class="flex justify-between items-center px-2 border-black mt-4">
          <h1 class="font-semibold text-black text-lg">
            Cylinder Type Transfer Changes
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
                <span> {{ bodySingle.approvalStage }} </span>
              </td>
              <td class="px-4 text-left py-4">
                {{ bodySingle.approvalStatus }}
              </td>
              <td class="px-4 text-left py-4">{{ bodySingle.gasType.type }}</td>
              <td class="px-4 text-left py-4">
                {{ bodySingle.gasType.gasName }}
              </td>
              <td class="px-4 text-left py-4">
                <router-link
                  v-if="
                    bodySingle.nextApprovalOfficer &&
                    bodySingle.nextApprovalOfficer._id === user._id
                  "
                  :to="`/dashboard/cylinder-management/type/${bodySingle._id}`"
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
    const headers = [
      'Approval Stage',
      'Status',
      'Changed Cylinder Type',
      'Changed Gas Type',
      'Action',
    ]
    const body = ref<any>([])

    const paginationProp = reactive({
      hasNextPage: false,
      hasPrevPage: false,
      currentPage: 1,
    })

    onMounted(() => {
      CylinderController.fetchPendingCylinderChanges().then((response) => {
        const myResponse = response.data
        body.value = myResponse.docs
        paginationProp.hasNextPage = myResponse.hasNextPage
        paginationProp.hasPrevPage = myResponse.hasPrevPage
        paginationProp.currentPage = myResponse.page
      })
    })

    return {
      headers,
      body,
      showRoute,
      paginationProp,
      user,
    }
  },
})
</script>
