<template>
  <div class="py-6 px-6">
    <card-slider :analytics="cylinderStatistics" />
    <div class="bg-white mt-8">
      <div class="py-2">
        <div
          class="
            flex
            justify-between
            items-center
            px-6
            border-0 border-l-4 border-black
            mt-4
            w-full
            overflow-x-auto
          "
        >
          <h1 class="font-semibold text-black text-lg">Cylinders</h1>
          <div class="flex items-center space-x-6">
            <pagination
              :pagination-details="paginationProp"
              @next="changePage($event.value)"
              @prev="changePage($event.value)"
            />
          </div>
        </div>
      </div>
      <div>
        <div class="w-full mb-4 px-6">
          <div
            class="
              flex
              items-center
              justify-between
              space-x-4
              py-1
              w-full
              h-full
            "
          >
            <filter-component @filter="showFilter = !showFilter" />
            <search-component
              :place-holder="'Search Cylinders'"
              @search="searchCylinder($event)"
            />
            <button
              class="bg-btn-purple px-4 py-2 rounded-sm h-full text-white"
              @click="showRegister = true"
            >
              Create Cylinder
            </button>
            <button
              class="bg-btn-purple px-4 py-2 rounded-sm h-full text-white"
              @click="showType = true"
            >
              Create Gas Type
            </button>
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
        <table-component
          :show-loader="isLoading"
          :head="headers"
          :body="body"
        ></table-component>
      </div>
    </div>
    <new-cylinder
      v-if="showRegister"
      @close="showRegister = false"
      @refresh=";(showRegister = false), getCylinders(1)"
    ></new-cylinder>
    <new-cylinder-type
      v-if="showType"
      @close="showType = false"
    ></new-cylinder-type>
    <cylinder-filter
      v-if="showFilter"
      :filters="cylinderFilters"
      :show-gases="true"
      :show-customers="true"
      @close="showFilter = !showFilter"
      @filterAdded="filterCylinders($event)"
    />
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  reactive,
  ref,
} from '@nuxtjs/composition-api'
import TableComponent from '@/components/Base/Table2.vue'
import NewCylinder from '@/components/Overlays/NewCylinder.vue'
import NewCylinderType from '@/components/Overlays/NewCylinderType.vue'
import CardSlider from '@/components/Base/CardSlider.vue'
import { CylinderController } from '@/module/Cylinder'
import Pagination from '@/components/Base/Pagination.vue'
import FilterComponent from '@/components/Base/FilterButton.vue'
import SearchComponent from '@/components/Base/Search.vue'
import CylinderFilter from '@/components/Overlays/Filter.vue'
import { cylinderFilters } from '@/constants/variables'
import { getFilters, getQueryString } from '@/constants/utils'

export default defineComponent({
  name: 'CylinderPool',
  components: {
    TableComponent,
    NewCylinderType,
    CardSlider,
    Pagination,
    FilterComponent,
    SearchComponent,
    CylinderFilter,
    NewCylinder,
  },
  layout: 'dashboard',
  setup() {
    const showFilter = ref<Boolean>(false)

    const showRegister = ref(false)

    const showType = ref(false)

    const headers = [
      'Assigned No',
      'Gas Type',
      'Cylinder Size',
      'Cylinder Type',
    ]

    const body = ref<any>([])
    const paginationProp = reactive({
      hasNextPage: false,
      hasPrevPage: false,
      currentPage: 1,
    })
    const isLoading = ref<Boolean>(true)
    const cylinderStatistics = ref<any>([
      [
        {
          topTitle: 'Total ASNL Cylinders',
          value: 0,
          subCategories: [
            {
              title: 'Buffer',
              value: 0,
              subCategories: [
                {
                  title: 'Good',
                  value: 0,
                },
                {
                  title: 'Bad',
                  value: 0,
                },
              ],
            },
            {
              title: 'Assigned',
              value: 0,
              subCategories: [
                {
                  title: 'Good',
                  value: 0,
                },
                {
                  title: 'Bad',
                  value: 0,
                },
              ],
            },
          ],
        },
        {
          topTitle: 'ASNL Cylinders with customers',
          value: 0,
          subCategories: [
            {
              title: 'Buffer',
              value: 0,
            },
            {
              title: 'Assigned',
              value: 0,
            },
          ],
        },
        {
          topTitle: 'Cylinders with ASNL',
          value: 0,
          subCategories: [
            {
              title: 'Filled',
              value: 0,
              subCategories: [
                {
                  title: 'Buffer',
                  value: 0,
                },
                {
                  title: 'Assigned',
                  value: 0,
                },
                {
                  title: 'Customers',
                  value: 0,
                },
              ],
            },
            {
              title: 'Empty',
              value: 0,
              subCategories: [
                {
                  title: 'Buffer',
                  value: 0,
                },
                {
                  title: 'Assigned',
                  value: 0,
                },
                {
                  title: 'Customers',
                  value: 0,
                },
              ],
            },
          ],
        },
      ],
      [
        {
          topTitle: 'Total Customer Cylinders',
          value: 0,
          subCategories: [
            {
              title: 'Filled',
              value: 0,
              subCategories: [
                {
                  title: 'Good',
                  value: 0,
                },
                {
                  title: 'Bad',
                  value: 0,
                },
              ],
            },
            {
              title: 'Empty',
              value: 0,
              subCategories: [
                {
                  title: 'Good',
                  value: 0,
                },
                {
                  title: 'Bad',
                  value: 0,
                },
              ],
            },
          ],
        },
        {
          topTitle: 'Total Bad Cylinders',
          value: 0,
          subCategories: [
            {
              title: 'Customer',
              value: 0,
              subCategories: [
                {
                  title: 'Filled',
                  value: 0,
                },
                {
                  title: 'Empty',
                  value: 0,
                },
              ],
            },
            {
              title: 'ASNL',
              value: 0,
              subCategories: [
                {
                  title: 'Filled',
                  value: 0,
                },
                {
                  title: 'Empty',
                  value: 0,
                },
              ],
            },
          ],
        },
        {
          topTitle: 'Total Bad ASNL Cylinders',
          value: 0,
          subCategories: [
            {
              title: 'Filled',
              value: 0,
              subCategories: [
                {
                  title: 'Buffer',
                  value: 0,
                },
                {
                  title: 'Assigned',
                  value: 0,
                },
              ],
            },
            {
              title: 'Empty',
              value: 0,
              subCategories: [
                {
                  title: 'Buffer',
                  value: 0,
                },
                {
                  title: 'Assigned',
                  value: 0,
                },
              ],
            },
          ],
        },
      ],
      [
        {
          topTitle: 'Total Cylinders with Suppliers',
          value: 0,
          subCategories: [
            {
              title: 'Internal Suppliers',
              value: 0,
            },
            {
              title: 'External Suppliers',
              value: 0,
            },
          ],
        },
        {
          topTitle: 'Cylinder with Internal Suppliers',
          value: 0,
          subCategories: [
            {
              title: 'ASNL Cylinders',
              value: 0,
              subCategories: [
                {
                  title: 'Buffer',
                  value: 0,
                },
                {
                  title: 'Assigned',
                  value: 0,
                },
              ],
            },
            {
              title: 'Customers Cylinders',
              value: 0,
            },
          ],
        },
        {
          topTitle: 'Cylinder with External Suppliers',
          value: 0,
          subCategories: [
            {
              title: 'ASNL Cylinders',
              value: 0,
              subCategories: [
                {
                  title: 'Buffer',
                  value: 0,
                },
                {
                  title: 'Assigned',
                  value: 0,
                },
              ],
            },
            {
              title: 'Customers Cylinders',
              value: 0,
            },
          ],
        },
      ],
    ])
    function fetchStat() {
      CylinderController.getCylinderStatistics().then((response) => {
        console.log(response.data)
        let data = response.data
        cylinderStatistics.value[0][0].value = data.asnl.totalCylinders
        cylinderStatistics.value[0][0].subCategories[0].subCategories[0].value =
          data.asnl.asnlTotalGoodBuffer
        cylinderStatistics.value[0][0].subCategories[0].subCategories[1].value =
          data.asnl.asnlTotalBadBuffer
        cylinderStatistics.value[0][0].subCategories[1].subCategories[0].value =
          data.asnl.asnlTotalGoodAssigned
        cylinderStatistics.value[0][0].subCategories[1].subCategories[1].value =
          data.asnl.asnlTotalBadAssigned
        /////
        cylinderStatistics.value[0][1].value =
          data.assignedCylinder + data.bufferCylinder
        cylinderStatistics.value[0][1].subCategories[0].value =
          data.bufferCylinder
        cylinderStatistics.value[0][1].subCategories[1].value =
          data.assignedCylinder
        ////
        cylinderStatistics.value[0][2].value =
          data.asnl.totalEmpty + data.asnl.totalFilled
        cylinderStatistics.value[0][2].subCategories[0].value =
          data.asnl.totalFilled
        cylinderStatistics.value[0][2].subCategories[1].value =
          data.asnl.totalEmpty
        ////
        cylinderStatistics.value[1][0].value = data.customer.totalCylinders
        cylinderStatistics.value[1][0].subCategories[0].value =
          data.customer.totalFilled
        cylinderStatistics.value[1][0].subCategories[1].value =
          data.customer.totalFilled
        /////
        cylinderStatistics.value[1][1].value =
          data.customer.faultyEmptyCustomerCylinders
        cylinderStatistics.value[1][1].subCategories[0].value =
          data.customer.totalFilled
      })
    }
    function changePage(nextPage: number) {
      getCylinders(nextPage)
    }

    function getCylinders(
      pageValue: number,
      pageLimit: number = 10,
      query = ''
    ) {
      isLoading.value = true
      CylinderController.getRegisteredCylinders(pageValue, pageLimit, query)
        .then((responses: any) => {
          console.log(responses.data.cylinders)
          const myResponse = responses.data
          body.value = myResponse.cylinders.docs
          paginationProp.hasNextPage = myResponse.cylinders.hasNextPage
          paginationProp.hasPrevPage = myResponse.cylinders.hasPrevPage
          paginationProp.currentPage = myResponse.cylinders.page
        })
        .finally(() => {
          isLoading.value = false
        })
    }

    function searchCylinder(searchValue: string) {
      if (searchValue) {
        displayedFilters.value = []
        queryString.value = ''
        getCylinders(1, 10, `&search=${searchValue}`)
      } else {
        getCylinders(1, 10)
      }
    }

    const displayedFilters = ref<Array<String>>([])
    const queryString = ref<string>('')

    function filterCylinders(filters: any) {
      queryString.value = getQueryString(filters)
      displayedFilters.value = getFilters(filters)

      getCylinders(1, 10, queryString.value)
    }

    onBeforeMount(() => {
      Promise.all([getCylinders(1), fetchStat()])
    })

    return {
      headers,
      body,
      showType,
      paginationProp,
      changePage,
      showFilter,
      cylinderFilters,
      cylinderStatistics,
      searchCylinder,
      isLoading,
      filterCylinders,
      displayedFilters,
      getCylinders,
      showRegister,
    }
  },
})
</script>
