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
    <cylinder-filter
      v-if="showFilter"
      :filters="cylinderFilters"
      :show-gases="true"
      :show-customers="true"
      @close="showFilter = !showFilter"
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
import NewCylinderType from '@/components/Overlays/NewCylinderType.vue'
import CardSlider from '@/components/Base/CardSlider.vue'
import { CylinderController } from '@/module/Cylinder'
import Pagination from '@/components/Base/Pagination.vue'
import FilterComponent from '@/components/Base/FilterButton.vue'
import SearchComponent from '@/components/Base/Search.vue'
import CylinderFilter from '@/components/Overlays/Filter.vue'
import { cylinderFilters, cylinderStatistics } from '@/constants/variables'

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
      CylinderController.getCylinderStatistics().then(() => {})
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
    }
  },
})
</script>
