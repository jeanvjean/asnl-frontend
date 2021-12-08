<template>
  <div class="py-6">
    <div class="mx-auto px-4 sm:px-6 md:px-8 w-full">
      <div class="bg-white shadow-sm rounded-sm h-full px-4">
        <div class="overflow-x-auto w-full py-4">
          <div class="w-full mb-4 overflow-x-auto">
            <div
              class="
                flex
                items-center
                justify-around
                px-2
                py-2
                space-x-4
                w-full
              "
            >
              <filter-button />
              <search-component
                :place-holder="'Search by ECR Number'"
                @search="
                  $event
                    ? getEcrs(pageNumber, pageLimit, `&search=${$event}`)
                    : getEcrs(pageNumber, pageLimit)
                "
              />
              <pagination
                :pagination-details="paginationProp"
                @limitChanged="
                  ;(pageLimit = $event), getEcrs(pageNumber, pageLimit)
                "
                @next="getEcrs($event.value, pageLimit)"
                @prev="getEcrs($event.value, pageLimit)"
              />
              <button
                class="
                  flex
                  justify-between
                  items-end
                  bg-btn-purple
                  px-4
                  py-2
                  space-x-4
                  rounded-sm
                  text-white
                  font-semibold
                  text-md
                "
              >
                View Filled ECR
              </button>
            </div>
          </div>
          <div class="px-4">
            <table-component
              :table-headers="headers"
              :table-body="tableBody"
              :show-loader="showLoader"
            >
              <template #action="slotProps">
                <button
                  v-if="slotProps.rowObject.asnlCylinders != 0"
                  class="
                    px-6
                    py-1
                    border border-btn-purple
                    rounded-sm
                    text-btn-purple text-sm
                  "
                  @click=";(singleEcr = slotProps.rowObject), (showErc = true)"
                >
                  Details
                </button>
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
    <erc v-if="showErc" :ecr="singleEcr" @close="showErc = !showErc" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  ref,
  reactive,
} from '@nuxtjs/composition-api'
import SearchComponent from '@/components/Base/Search.vue'
import FilterButton from '@/components/Base/FilterButton.vue'
import Erc from '@/components/Overlays/erc.vue'
import { fetchECRs } from '@/module/Production'
import TableComponent from '@/components/Table.vue'
import { getTableBody } from '@/constants/utils'
import Pagination from '@/components/Base/Pagination.vue'

export default defineComponent({
  name: 'Home',
  components: {
    SearchComponent,
    FilterButton,
    Erc,
    TableComponent,
    Pagination,
  },
  layout: 'dashboard',
  setup() {
    const headers = [
      'Ecr No',
      'Customer',
      'Type',
      'Status',
      'Cylinders',
      // 'ASNL Cylinders',
      'Date',
    ]

    const showErc = ref<Boolean>(false)
    const pageDetails = reactive({
      number: 1,
      limit: 10,
    })
    const tableBody = ref<Object[]>([])
    const showLoader = ref<Boolean>(false)
    const tableClasses = {
      status: {
        pending:
          'text-white bg-yellow-400 rounded-lg px-2 py-1 capitalize font-semibold',
        approved: 'text-white bg-green-500 rounded-lg px-2 py-1 capitalize',
      },
    }
    const paginationProp = reactive({
      hasNextPage: false,
      hasPrevPage: false,
      currentPage: 1,
    })
    const pageNumber = ref(1)
    const pageLimit = ref(10)

    const getEcrs = (page: number, limit: number, query: string = '') => {
      showLoader.value = true
      fetchECRs(page, limit, query)
        .then((response) => {
          console.log(response)
          tableBody.value = response.docs.map((erc: any) => {
            return {
              ercNo: erc.ecrNo,
              customer: erc.customer ? erc.customer.name : '',
              type: erc.type,
              status: erc.status,
              companyCylinders: erc.fringeCylinders.length,
              asnlCylinders: erc.cylinders.length,
              createdAt: new Date(erc.createdAt).toDateString(),
              _id: erc._id,
              asnlCylindersArray: erc.cylinders,
              fringeCylindersArray: erc.fringeCylinders,
            }
          })
          paginationProp.hasNextPage = response.hasNextPage
          paginationProp.hasPrevPage = response.hasPrevPage
          paginationProp.currentPage = response.page
          tableBody.value = getTableBody(
            tableBody.value,
            [
              'ercNo',
              'customer',
              'type',
              'status',
              // 'companyCylinders',
              'asnlCylinders',
              'createdAt',
            ],
            tableClasses
          )
        })
        .finally(() => (showLoader.value = false))
    }

    const singleEcr = ref<Object>({})

    onBeforeMount(() => {
      getEcrs(pageDetails.number, pageDetails.limit)
    })
    return {
      headers,
      showErc,
      tableBody,
      showLoader,
      singleEcr,
      pageLimit,
      pageNumber,
      getEcrs,
      paginationProp,
    }
  },
})
</script>
