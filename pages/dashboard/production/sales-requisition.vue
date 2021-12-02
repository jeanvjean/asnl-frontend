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
              <filter-button @filter="showFilter = true" />
              <search-component
                :place-holder="'Search'"
                @search="
                  $event
                    ? getRequisitions(
                        pageNumber,
                        pageLimit,
                        `&search=${$event}`
                      )
                    : getRequisitions(pageNumber, pageLimit)
                "
              />
              <pagination
                :pagination-details="paginationProp"
                @limitChanged="
                  ;(pageLimit = $event), getRequisitions(pageNumber, pageLimit)
                "
                @next="getRequisitions($event.value, pageLimit)"
                @prev="getRequisitions($event.value, pageLimit)"
              />
              <router-link
                to="/dashboard/production/new-sales-requisition"
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
                Create Sales Requisition
              </router-link>
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
              </template>
            </table-component>
          </div>
        </div>
      </div>
    </div>
    <requisition-filter
      v-if="showFilter"
      :filters="requisitionFilters"
      :show-date="false"
      @close="showFilter = false"
    />
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
import TableComponent from '@/components/Table.vue'
import { getTableBody } from '@/constants/utils'
import Pagination from '@/components/Base/Pagination.vue'
import RequisitionFilter from '@/components/Overlays/Filter.vue'
import { fetchRequisitions } from '~/module/Sales'

export default defineComponent({
  name: 'Home',
  components: {
    SearchComponent,
    FilterButton,
    TableComponent,
    Pagination,
    RequisitionFilter,
  },
  layout: 'dashboard',
  setup() {
    const headers = [
      'Ecr No',
      'Customer',
      'Type',
      'Status',
      'Total Cylinders',
      'Prepared By',
      'Date',
    ]
    const showFilter = ref<Boolean>(false)

    const requisitionFilters = reactive({
      type: {
        list: [
          {
            title: 'Customer Cylinders',
            type: 'radio',
            selected: false,
            identifier: 'type',
            value: 'walkin',
          },
          {
            title: 'ASNL Cylinders',
            type: 'radio',
            selected: false,
            identifier: 'type',
            value: 'customer',
          },
        ],
      },
    })

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

    const getRequisitions = (
      page: number,
      limit: number,
      query: string = ''
    ) => {
      showLoader.value = true
      fetchRequisitions(page, limit, query)
        .then((response) => {
          tableBody.value = response.docs.map((requisition: any) => {
            return {
              ercNo: requisition.ecrNo,
              customer: requisition.customer.name,
              type: requisition.type,
              status: requisition.status,
              totalCylinders: requisition.cylinders.length,
              preparedBy: requisition.preparedBy.name,
              createdAt: new Date(requisition.createdAt).toDateString(),
              _id: requisition._id,
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
              'totalCylinders',
              'preparedBy',
              'createdAt',
            ],
            tableClasses
          )
        })
        .finally(() => (showLoader.value = false))
    }

    const singleEcr = ref<Object>({})

    onBeforeMount(() => {
      getRequisitions(pageDetails.number, pageDetails.limit)
    })
    return {
      headers,
      showErc,
      tableBody,
      showLoader,
      singleEcr,
      pageLimit,
      pageNumber,
      getRequisitions,
      paginationProp,
      requisitionFilters,
      showFilter,
    }
  },
})
</script>
