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
                :place-holder="'Search by ICN Number'"
                @search="
                  $event
                    ? getICns(pageNumber, pageLimit, `&search=${$event}`)
                    : getICns(pageNumber, pageLimit)
                "
              />
              <pagination
                :pagination-details="paginationProp"
                @limitChanged="
                  ;(pageLimit = $event), getICns(pageNumber, pageLimit)
                "
                @next="getICns($event.value, pageLimit)"
                @prev="getICns($event.value, pageLimit)"
              />
            </div>
          </div>
          <div class="w-full flex items-center space-x-4 px-6 py-2">
            <div
              v-for="(selectedFilter, j) in displayedFilters"
              :key="j"
              class="
                bg-purple-400 bg-opacity-10
                text-purple-700
                font-medium
                capitalize
                flex
                items-center
                space-x-2
                px-4
                py-2
                rounded-lg
                text-xs
              "
            >
              <span class="rounded-md">{{ selectedFilter }}</span>
            </div>
          </div>
          <div class="px-4">
            <table-component
              :table-headers="headers"
              :table-body="tableBody"
              :show-loader="showLoader"
            >
              <template #action="slotProps">
                <router-link
                  v-if="slotProps.rowObject.type == 'customer'"
                  :to="
                    slotProps.rowObject.asnlCylinders +
                      slotProps.rowObject.companyCylinders <
                    1
                      ? ''
                      : `/dashboard/production/ecr/${slotProps.rowId}`
                  "
                  class="px-6 py-1 rounded-sm text-sm"
                  :class="
                    slotProps.rowObject.asnlCylinders +
                      slotProps.rowObject.companyCylinders <
                    1
                      ? 'text-btn-gray text-sm  border border-btn-gray'
                      : 'text-btn-purple text-sm  border border-btn-purple'
                  "
                  @click="generateEcr(slotProps.rowObject)"
                >
                  Generate ECR
                </router-link>
                <router-link
                  v-if="slotProps.rowObject.type == 'supplier'"
                  :to="
                    slotProps.rowObject.asnlCylinders +
                      slotProps.rowObject.companyCylinders <
                    1
                      ? ''
                      : `/dashboard/production/fcr/${slotProps.rowId}`
                  "
                  class="
                    px-6
                    py-1
                    border border-btn-purple
                    rounded-sm
                    text-btn-purple text-sm
                  "
                  :class="
                    slotProps.rowObject.asnlCylinders < 1
                      ? 'border border-btn-gray text-btn-gray'
                      : 'text-btn-purple text-sm  border border-btn-purple'
                  "
                  @click="generateEcr(slotProps.rowObject)"
                >
                  Generate FCR
                </router-link>
              </template>
            </table-component>
          </div>
        </div>
      </div>
    </div>
    <erc v-if="showErc" @close="showErc = !showErc" />
    <incoming-filter-component
      v-if="showFilter"
      :filters="incomingFilters"
      @close="showFilter = false"
      @filterAdded="
        queryString = getQueryString($event)
        displayedFilters = getFilters($event)
        getICns(pageNumber, pageLimit, queryString)
      "
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
import Erc from '@/components/Overlays/erc.vue'
import { fetchIcns } from '@/module/Incoming'
import TableComponent from '@/components/Table.vue'
import { getTableBody, getQueryString, getFilters } from '@/constants/utils'
import Pagination from '@/components/Base/Pagination.vue'
import IncomingFilterComponent from '@/components/Overlays/Filter.vue'

export default defineComponent({
  name: 'Home',
  components: {
    SearchComponent,
    FilterButton,
    Erc,
    TableComponent,
    Pagination,
    IncomingFilterComponent,
  },
  layout: 'dashboard',
  setup() {
    const displayedFilters = ref<Array<String>>([])
    const queryString = ref<String>('')
    const headers = [
      'ICN No',
      'Customer',
      'Type',
      'Status',
      'Customer Cylinders',
      'ASNL Cylinders',
    ]
    const incomingFilters = {
      category: {
        list: [
          {
            title: 'Walkin Customers',
            type: 'radio',
            selected: false,
            identifier: 'type',
            value: 'customer',
          },
          {
            title: 'Driver Pickup',
            type: 'radio',
            selected: false,
            identifier: 'type',
            value: 'driver',
          },
          {
            title: 'Suppliers',
            type: 'radio',
            selected: false,
            identifier: 'type',
            value: 'supplier',
          },
        ],
      },
      status: {
        list: [
          {
            title: 'Passed',
            type: 'radio',
            identifier: 'filter',
            value: 'passed',
          },
          {
            title: 'Pending',
            type: 'radio',
            identifier: 'filter',
            value: 'pending',
          },
        ],
      },
    }
    const showFilter = ref<Boolean>(false)
    const showNewCustomer = ref<Boolean>(false)
    const showSingleCustomer = ref<Boolean>(false)
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

    const getICns = (page: number, limit: number, query: string = '') => {
      showLoader.value = true
      fetchIcns(page, limit, query)
        .then((response) => {
          tableBody.value = response.docs.map((icn: any) => {
            console.log(icn)
            return {
              icnNo: icn.icnNo,
              customer: icn.customer
                ? icn.customer.name
                : icn.supplier
                ? icn.supplier.name
                : '',
              type: icn.type,
              status: icn.status ? icn.status : icn.approvalStatus,
              companyCylinders: icn.totalCustomerCylinders,
              asnlCylinders: icn.totalAsnlCylinders,
              _id: icn._id,
            }
          })
          paginationProp.hasNextPage = response.hasNextPage
          paginationProp.hasPrevPage = response.hasPrevPage
          paginationProp.currentPage = response.page
          tableBody.value = getTableBody(
            tableBody.value,
            [
              'icnNo',
              'customer',
              'type',
              'status',
              'companyCylinders',
              'asnlCylinders',
            ],
            tableClasses
          )
        })
        .finally(() => (showLoader.value = false))
    }

    const singleEcr = ref<Object>({})
    const generateEcr = (item: any) => {
      if (item.asnlCylinders > 0) {
        singleEcr.value = item
        showErc.value = true
      }
    }

    onBeforeMount(() => {
      getICns(pageDetails.number, pageDetails.limit)
    })
    return {
      headers,
      showNewCustomer,
      showSingleCustomer,
      showErc,
      tableBody,
      showLoader,
      singleEcr,
      pageLimit,
      pageNumber,
      getICns,
      paginationProp,
      incomingFilters,
      showFilter,
      displayedFilters,
      queryString,
      getQueryString,
      getFilters,
      generateEcr,
    }
  },
})
</script>
