<template>
  <div class="py-6">
    <div class="mx-auto px-4 sm:px-6 md:px-8 w-full">
      <div class="bg-white shadow-sm rounded-sm h-full">
        <div class="py-2">
          <div
            class="
              flex
              justify-between
              items-center
              px-4
              py-2
              mt-4
              w-full
              overflow-x-auto
            "
          >
            <div class="flex items-center space-x-6 text-sm">
              <button
                class="
                  uppercase
                  tracking-tight
                  font-medium
                  border-0 border-b-4 border-btn-purple
                  text-gray-600
                  py-1
                "
              >
                Internal Purchase Order
              </button>
              <button
                class="uppercase tracking-tight font-medium text-gray-600 py-1"
              >
                External Purchase Order
              </button>
            </div>

            <div class="flex items-center space-x-6">
              <router-link
                to="/dashboard/purchase-orders/new-purchase-order"
                class="
                  px-4
                  py-2
                  rounded-sm
                  bg-btn-purple
                  border-btn-purple border
                  text-white
                "
              >
                Create Order
              </router-link>
              <button
                class="
                  px-4
                  py-2
                  rounded-sm
                  bg-white
                  border-btn-purple border
                  text-btn-purple
                "
              >
                Generate OCN
              </button>
            </div>
          </div>
        </div>
        <div class="overflow-x-auto w-full py-4 px-4">
          <div class="w-full mb-4">
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
              <filter-component />
              <search-component :place-holder="'Search'" />
              <div class="flex items-center space-x-6">
                <pagination
                  :pagination-details="paginationProp"
                  @next="adjustPage($event.value)"
                  @prev="adjustPage($event.value)"
                  @limitChanged="adjustLimit($event)"
                />
              </div>
            </div>
          </div>
          <table-component
            :table-headers="headers"
            :table-body="body"
            :show-loader="showLoader"
          >
            <template #action="slotProps">
              <router-link
                :to="`/dashboard/purchase-orders/details/${slotProps.rowId}`"
                class="
                  mx-auto
                  py-2
                  px-4
                  text-btn-purple
                  border border-btn-purple
                  rounded-sm
                "
              >
                View Order
              </router-link>
            </template></table-component
          >
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
import SearchComponent from '@/components/Base/Search.vue'
import FilterComponent from '@/components/Base/FilterButton.vue'
import { CustomerController } from '@/module/Customer'
import Pagination from '@/components/Base/Pagination.vue'
import { CustomerDto } from '@/types/Types'
import TableComponent from '@/components/Table.vue'
import { getTableBody } from '~/constants/utils'

export default defineComponent({
  name: 'Home',
  components: {
    SearchComponent,
    FilterComponent,
    Pagination,
    TableComponent,
  },
  layout: 'dashboard',
  setup() {
    const headers = [
      'Customer Name',
      'Approval Stage',
      'Status',
      'Date',
      'Approving Officer',
    ]

    const paginationProp = reactive({
      hasNextPage: false,
      hasPrevPage: false,
      currentPage: 1,
    })

    const section = ref<String>('profile')

    const customerProp = ref<CustomerDto>()
    const showDeleteReason = ref<Boolean>(false)

    const defaultState = ref<Boolean>(false)
    const showNewCustomer = ref<Boolean>(false)
    const showSingleCustomer = ref<Boolean>(false)
    const body = ref<Array<any>>([])
    const pageLimit = ref<Number>(10)
    const pageNumber = ref<Number>(10)
    const showLoader = ref<Boolean>(false)
    const classObject = {
      approvalStatus: {
        pending:
          'text-white bg-yellow-400 rounded-lg px-2 py-1 capitalize font-semibold',
        approved: 'text-white bg-green-500 rounded-lg px-2 py-1 capitalize',
      },
    }

    const fetchOrders = (page: Number, limit: Number, query = '') => {
      showLoader.value = true
      CustomerController.fetchPurchaseOrders(page, limit, query)
        .then((response) => {
          const orders: any = response.purchaseOrders
          body.value = orders.docs.map((order: any) => {
            return {
              customer: order.customer.name,
              approvalStage: order.approvalStage,
              approvalStatus: order.approvalStatus,
              date: new Date(order.date).toDateString(),
              approvingOfficer: order.nextApprovalOfficer.name,
              _id: order._id,
            }
          })
          body.value = getTableBody(
            body.value,
            [
              'customer',
              'approvalStage',
              'approvalStatus',
              'date',
              'approvingOfficer',
            ],
            classObject
          )
          paginationProp.hasNextPage = orders.hasNextPage
          paginationProp.hasPrevPage = orders.hasPrevPage
          paginationProp.currentPage = orders.page
        })
        .finally(() => (showLoader.value = false))
    }

    const adjustLimit = (newLimit: Number) => {
      pageLimit.value = newLimit
      fetchOrders(1, pageLimit.value)
    }

    const adjustPage = (nextPage: Number) => {
      pageNumber.value = nextPage
      fetchOrders(pageNumber.value, pageLimit.value)
    }

    onMounted(() => {
      fetchOrders(1, pageLimit.value)
    })

    return {
      headers,
      body,
      defaultState,
      showNewCustomer,
      showSingleCustomer,
      paginationProp,
      customerProp,
      section,
      showDeleteReason,
      adjustLimit,
      adjustPage,
      showLoader,
    }
  },
})
</script>
<style scoped>
.action-menu {
  display: none;
}
.icon-button:hover > .action-menu {
  display: block;
}
.icon-button:focus > .action-menu {
  display: block;
}
</style>
