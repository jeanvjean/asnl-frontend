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
            <button
              class="
                text-purple-500
                underline
                uppercase
                focus:outline-none
                font-medium
                text-sm
              "
            >
              View All
            </button>
          </div>
        </div>
      </div>
      <div>
        <table-component
          :head="headers"
          :body="body"
          @show="showType = true"
        ></table-component>
      </div>
    </div>
    <new-cylinder-type
      v-if="showType"
      @close="showType = false"
    ></new-cylinder-type>
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

export default defineComponent({
  name: 'CylinderPool',
  components: { TableComponent, NewCylinderType, CardSlider, Pagination },
  layout: 'dashboard',
  setup() {
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
    })

    const statistics = [
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
            title: 'Total Bad ASNL Customer Cylinders',
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
                title: 'Third Party Cylinders',
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
    ]
    const showType = ref(false)

    return {
      headers,
      body,
      showType,
      statistics,
      paginationProp,
      changePage,
    }
  },
})
</script>
