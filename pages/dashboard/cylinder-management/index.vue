<template>
  <div class="py-6 px-6">
    <card-slider :analytics="statistics" />
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
            <search-component :place-holder="'Search'" />
            <button
              class="bg-btn-purple px-4 py-2 rounded-sm h-full text-white"
              @click="showType = true"
            >
              Create Gas Type
            </button>
          </div>
        </div>
        <table-component :head="headers" :body="body"></table-component>
      </div>
    </div>
    <new-cylinder-type
      v-if="showType"
      @close="showType = false"
    ></new-cylinder-type>
    <cylinder-filter v-if="showFilter" @close="showFilter = !showFilter" />
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
import NewCylinderType from '@/components/Overlays/NewCylinderType.vue'
import CardSlider from '@/components/Base/CardSlider.vue'
import { CylinderController } from '@/module/Cylinder'
import Pagination from '@/components/Base/Pagination.vue'
import FilterComponent from '@/components/Base/FilterButton.vue'
import SearchComponent from '@/components/Base/Search.vue'
import CylinderFilter from '@/components/Overlays/CylinderFilter.vue'

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
  },
  layout: 'dashboard',
  setup() {
    const showFilter = ref<Boolean>(false)
    const statistics = ref<any>([
      [
        [
          {
            title: 'Total ASNL Cylinders',
            value: 0,
          },
          [
            {
              title: 'Buffer Cylinders',
              value: 0,
            },
            {
              title: 'Assigned Cylinders',
              value: 0,
            },
          ],
        ],
        [
          {
            title: 'ASNL Cylinders with customers',
            value: 0,
          },
          [
            {
              title: 'Buffer Cylinders',
              value: 0,
            },
            {
              title: 'Assigned Cylinders',
              value: 0,
            },
          ],
        ],
        [
          {
            title: 'Cylinders with ASNL',
            value: 0,
            type: 'other',
          },
          [
            [
              {
                title: 'Filled',
                value: 0,
              },
              {
                title: 'Buffer',
                value: 0,
              },
              {
                title: 'Assigned',
                value: 0,
              },
            ],
            [
              {
                title: 'Empty',
                value: 0,
              },
              {
                title: 'Buffer',
                value: 0,
              },
              {
                title: 'Assigned',
                value: 0,
              },
            ],
          ],
        ],
      ],
      [
        [
          {
            title: 'Total Customer Cylinders',
            value: 0,
          },
          [
            {
              title: 'Buffer Cylinders',
              value: 0,
            },
            {
              title: 'Assigned Cylinders',
              value: 0,
            },
          ],
        ],
        [
          {
            title: 'Total Bad Customer Cylinders',
            value: 0,
          },
          [
            {
              title: 'Buffer Cylinders',
              value: 0,
            },
            {
              title: 'Assigned Cylinders',
              value: 0,
            },
          ],
        ],
        [
          {
            title: 'Total Bad ASNL Cylinders',
            value: 0,
          },
          [
            {
              title: 'Buffer Cylinders',
              value: 0,
            },
            {
              title: 'Assigned Cylinders',
              value: 0,
            },
          ],
        ],
      ],
      [
        [
          {
            title: 'Total Cylinders with Suppliers',
            value: 0,
          },
          [
            {
              title: 'Buffer Cylinders',
              value: 0,
            },
            {
              title: 'Assigned Cylinders',
              value: 0,
            },
          ],
        ],
        [
          {
            title: 'Cylinder with Internal Suppliers',
            value: 0,
            type: 'other',
          },
          [
            [
              {
                title: 'ASNL Cylinders',
                value: 0,
              },
              {
                title: 'Buffer',
                value: 0,
              },
              {
                title: 'Assigned',
                value: 0,
              },
            ],
            [
              {
                title: 'Customer Cylinders',
                value: 0,
              },
            ],
          ],
        ],
        [
          {
            title: 'Cylinder with External Suppliers',
            value: 0,
            type: 'other',
          },
          [
            [
              {
                title: 'ASNL Cylinders',
                value: 0,
              },
              {
                title: 'Buffer',
                value: 0,
              },
              {
                title: 'Assigned',
                value: 0,
              },
            ],
            [
              {
                title: 'Customer Cylinders',
                value: 0,
              },
            ],
          ],
        ],
      ],
    ])
    const showType = ref(false)

    const headers = [
      'Cylinder No',
      'Gas Type',
      'Gas Volume Content',
      'Water Capacity',
      'Cylinder Type',
      'Date Cylinder',
    ]

    const body = ref<any>([])
    const paginationProp = reactive({
      hasNextPage: false,
      hasPrevPage: false,
      currentPage: 1,
    })

    function changePage(nextPage: number) {
      getCylinders(nextPage)
    }

    function fetchStat() {
      CylinderController.getCylinderStatistics().then((response) => {
        const stat: any = response.data
        statistics.value[0][0][0].value =
          stat.assignedCylinder + stat.bufferCylinder
        statistics.value[0][0][1][0].value = stat.bufferCylinder
        statistics.value[0][0][1][1].value = stat.assignedCylinder

        statistics.value[0][1][0].value = stat.withCustomer

        statistics.value[0][2][0].value = stat.withAsnl
        statistics.value[0][2][1][0][0].value =
          stat.filledAssignedCylinders + stat.filledBufferCylinders
        statistics.value[0][2][1][0][1].value = stat.filledBufferCylinders
        statistics.value[0][2][1][0][2].value = stat.filledAssignedCylinders

        statistics.value[0][2][1][1][0].value =
          stat.emptyAssignedCylinders + stat.emptyBufferCylinders
        statistics.value[0][2][1][1][1].value = stat.emptyBufferCylinders
        statistics.value[0][2][1][1][2].value = stat.emptyAssignedCylinders

        statistics.value[1][0][0].value =
          stat.customerAssignedCylinders + stat.customerBufferCylinders
        statistics.value[1][0][1][0].value = stat.customerBufferCylinders
        statistics.value[1][0][1][1].value = stat.customerAssignedCylinders
      })
    }

    function getCylinders(pageValue: number) {
      CylinderController.getRegisteredCylinders(pageValue).then(
        (responses: any) => {
          const myResponse = responses.data
          body.value = myResponse.cylinders.docs
          paginationProp.hasNextPage = myResponse.cylinders.hasNextPage
          paginationProp.hasPrevPage = myResponse.cylinders.hasPrevPage
          paginationProp.currentPage = myResponse.cylinders.page
        }
      )
    }

    onBeforeMount(() => {
      getCylinders(1)
      fetchStat()
    })

    return {
      headers,
      body,
      showType,
      statistics,
      paginationProp,
      changePage,
      showFilter,
    }
  },
})
</script>
