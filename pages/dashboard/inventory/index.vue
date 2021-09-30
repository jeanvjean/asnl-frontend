<template>
  <div class="py-6 px-6">
    <div class="bg-white">
      <div class="overflow-x-auto w-full py-4">
        <div>
          <div
            class="
              flex
              justify-between
              items-center
              px-6
              border-0 border-l-4 border-black
              mt-4
            "
          >
            <h1 class="font-semibold text-black text-lg">Inventories</h1>
            <div class="flex items-center space-x-6">
              <pagination
                :pagination-details="paginationProp"
                @next="changePage($event.value)"
                @prev="changePage($event.value)"
                @limitChanged="adjustLimit($event)"
              />
            </div>
          </div>
        </div>
        <div class="w-full mb-4">
          <div
            class="flex items-center justify-around px-8 py-2 space-x-4 w-full"
          >
            <filter-component @filter="showFilter = true" />
            <search-component />

            <router-link
              class="
                flex
                justify-between
                items-center
                bg-btn-purple
                px-4
                py-2
                text-white
                font-medium
                text-md
                space-x-2
                rounded-sm
              "
              to="/dashboard/inventory/new-product"
            >
              <svg
                class="w-3 h-3 fill-current text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 341.4 341.4"
              >
                <path
                  d="M192 149.4V0h-42.6v149.4H0V192h149.4v149.4H192V192h149.4v-42.6z"
                />
              </svg>
              <span>Create Product</span>
            </router-link>
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

        <div class="px-6">
          <table-component
            :table-headers="headers"
            :table-body="body"
            :show-loader="isLoading"
          >
            <template #action="slotProps">
              <button class="mx-auto text-black w-6 h-6 relative">
                <svg
                  class="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M4 12a2 2 0 110-4 2 2 0 010 4zm6 0a2 2 0 110-4 2 2 0 010 4zm6 0a2 2 0 110-4 2 2 0 010 4z"
                  />
                </svg>
              </button>
              <div
                class="
                  absolute
                  bg-gray-50
                  border border-gray-300
                  w-32
                  font-light
                  text-sm
                  rounded-sm
                  action-menu
                  z-50
                  ml-4
                "
              >
                <router-link
                  class="
                    block
                    px-3
                    py-2
                    text-black
                    focus:outline-none
                    hover:bg-purple-300 hover:text-white
                    w-full
                    overflow-none
                    text-center
                  "
                  :to="'/dashboard/inventory/product/' + slotProps.rowId"
                >
                  Details
                </router-link>
                <button
                  type="button"
                  class="
                    block
                    px-3
                    py-2
                    text-black
                    focus:outline-none
                    hover:bg-purple-300 hover:text-white
                    w-full
                    overflow-none
                  "
                  @click="showAuditLog = true"
                >
                  Audit Log
                </button>
              </div>
            </template>
          </table-component>
        </div>
      </div>
    </div>
    <audit-log v-if="showAuditLog" @close="showAuditLog = false" />
    <inventory-filter
      v-if="showFilter"
      :filters="inventoryFilters"
      :show-date="true"
      @close="showFilter = false"
      @filterAdded="filterProducts"
    />
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
} from '@nuxtjs/composition-api'
import { ProductObject } from '@/module/Product'
import FilterComponent from '@/components/Base/FilterButton.vue'
import SearchComponent from '@/components/Base/Search.vue'
import Pagination from '@/components/Base/Pagination.vue'
import AuditLog from '@/components/Overlays/AuditLog.vue'
import InventoryFilter from '@/components/Overlays/Filter.vue'
import TableComponent from '@/components/Table.vue'
import { getFilters, getTableBody, getQueryString } from '@/constants/utils'

export default defineComponent({
  name: 'CylinderPool',
  components: {
    FilterComponent,
    SearchComponent,
    Pagination,
    AuditLog,
    InventoryFilter,
    TableComponent,
  },
  layout: 'dashboard',
  setup() {
    const headers = [
      'ASNL Number',
      'Product Name',
      'Part Number',
      'Quantity',
      'Reorder Level',
      'Unit Cost',
      'Total Cost',
      'Location',
    ]
    const isLoading = ref<Boolean>(true)
    const pageLimit = ref<Number>(10)
    const displayedFilters = ref<Array<String>>([])
    const queryString = ref<String>('')

    const inventoryFilters = {
      'product-name': {
        list: [
          {
            title: 'Product Name',
            type: 'text',
            identifier: 'name',
          },
        ],
      },
      'equipment-model': {
        list: [
          {
            title: 'Equipment Model',
            type: 'text',
            identifier: 'model',
          },
        ],
      },
      'equipment-type': {
        list: [
          {
            title: 'Equipment Type',
            type: 'text',
            identifier: 'type',
          },
        ],
      },
    }

    function changePage(nextPage: number) {
      getProducts(nextPage, pageLimit.value)
    }

    const body = ref<any>([])
    const showAuditLog = ref<Boolean>(false)
    const showFilter = ref<Boolean>(false)

    onMounted(() => {
      getProducts(1, pageLimit.value)
    })

    function adjustLimit(newLimit: Number) {
      pageLimit.value = newLimit
      getProducts(1, pageLimit.value)
    }

    function filterProducts(filters: any) {
      queryString.value = getQueryString(filters)
      displayedFilters.value = getFilters(filters)
      getProducts(1, pageLimit.value, queryString.value)
    }

    function getProducts(pageValue: number, limit: Number, query: String = '') {
      isLoading.value = true
      ProductObject.getProducts(pageValue, limit, query)
        .then((response: any) => {
          body.value = getTableBody(response.docs, [
            'asnlNumber',
            'productName',
            'partNumber',
            'quantity',
            'reorderLevel',
            'unitCost',
            'totalCost',
            'location',
          ])
          paginationProp.hasNextPage = response.hasNextPage
          paginationProp.hasPrevPage = response.hasPrevPage
          paginationProp.currentPage = response.page
        })
        .finally(() => (isLoading.value = false))
    }

    const paginationProp = reactive({
      hasNextPage: false,
      hasPrevPage: false,
      currentPage: 1,
    })

    const showType = ref(false)

    const defaultState = ref(false)

    return {
      headers,
      body,
      showType,
      defaultState,
      paginationProp,
      changePage,
      showAuditLog,
      showFilter,
      inventoryFilters,
      isLoading,
      adjustLimit,
      filterProducts,
      displayedFilters,
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
