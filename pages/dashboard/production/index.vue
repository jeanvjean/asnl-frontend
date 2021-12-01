<template>
  <div class="py-6 px-6">
    <div class="bg-white mt-4 w-full px-4 py-2">
      <div class="overflow-x-auto w-full py-4">
        <div class="w-full mb-4 overflow-x-auto">
          <div
            class="flex items-center justify-around px-2 py-2 space-x-4 w-full"
          >
            <filter-button />
            <search-component
              :place-holder="'Search by ECR Number'"
              @search="
                $event
                  ? getSchedules(pageNumber, pageLimit, `&search=${$event}`)
                  : getSchedules(pageNumber, pageLimit)
              "
            />
            <pagination
              :pagination-details="paginationProp"
              @limitChanged="
                ;(pageLimit = $event), getSchedules(pageNumber, pageLimit)
              "
              @next="getSchedules($event.value, pageLimit)"
              @prev="getSchedules($event.value, pageLimit)"
            />
          </div>
        </div>
        <div class="px-4">
          <table-component
            :table-headers="headers"
            :table-body="schedulesBody"
            :show-loader="showLoader"
          >
            <template #action="slotProps">
              <router-link
                v-if="!slotProps.rowObject.produced"
                :to="`/dashboard/production/status/${slotProps.rowId}`"
                class="
                  px-6
                  py-1
                  border border-btn-purple
                  rounded-sm
                  text-btn-purple text-sm
                "
                @click=";(singleEcr = slotProps.rowObject), (showErc = true)"
              >
                View
              </router-link>
              <span
                v-else
                class="
                  text-btn-green
                  bg-green-100
                  rounded-lg
                  px-2
                  py-2
                  capitalize
                  text-center
                "
              >
                Completed
              </span>
            </template>
          </table-component>
        </div>
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
import { fetchSchedules } from '@/module/Production'
import SearchComponent from '@/components/Base/Search.vue'
import FilterButton from '@/components/Base/FilterButton.vue'
import TableComponent from '@/components/Table.vue'
import { getTableBody } from '@/constants/utils'
import Pagination from '@/components/Base/Pagination.vue'

export default defineComponent({
  name: 'CreateReport',
  components: {
    SearchComponent,
    FilterButton,
    TableComponent,
    Pagination,
  },
  layout: 'dashboard',
  setup() {
    const headers = [
      'Production Number',
      'ECR Number',
      'shift',
      'Quantity to be Filled',
      'Status',
      'Date',
    ]
    const schedulesBody = ref<any>([])
    const paginationProp = reactive({
      hasNextPage: false,
      hasPrevPage: false,
      currentPage: 1,
    })
    const pageNumber = ref(1)
    const pageLimit = ref(10)
    const showLoader = ref<Boolean>(false)

    const getSchedules = (page: number, limit: number, query: string = '') => {
      showLoader.value = true
      fetchSchedules(page, limit, query)
        .then((response) => {
          console.log(response)
          schedulesBody.value = response.docs.map((schedule: any) => {
            return {
              ecrNo: schedule.ecrNo,
              productionNo: schedule.productionNo,
              shift: schedule.shift,
              quantity: schedule.quantityToFill,
              status: schedule.status,
              date: new Date(schedule.date).toDateString(),
              _id: schedule._id,
              produced: schedule.produced,
            }
          })

          schedulesBody.value = getTableBody(schedulesBody.value, [
            'productionNo',
            'ecrNo',
            'shift',
            'quantity',
            'status',
            'date',
          ])

          paginationProp.hasNextPage = response.hasNextPage
          paginationProp.hasPrevPage = response.hasPrevPage
          paginationProp.currentPage = response.page
        })
        .finally(() => (showLoader.value = false))
    }

    onMounted(() => getSchedules(1, 10))
    return {
      headers,
      schedulesBody,
      paginationProp,
      pageNumber,
      pageLimit,
      getSchedules,
      showLoader,
    }
  },
})
</script>
