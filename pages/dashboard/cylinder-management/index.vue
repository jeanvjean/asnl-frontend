<template>
  <div class="py-6 px-6">
    <card-slider :analytics="statistics" />
    <div class="bg-white px-6 mt-8">
      <table-component
        :head="headers"
        :body="body"
        @show="showType = true"
      ></table-component>
    </div>
    <new-cylinder-type
      v-if="showType"
      @close="showType = false"
    ></new-cylinder-type>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, ref } from '@nuxtjs/composition-api'
import TableComponent from '@/components/Base/Table2.vue'
import NewCylinderType from '@/components/Overlays/NewCylinderType.vue'
import CardSlider from '@/components/Base/CardSlider.vue'
import { CylinderRepository } from '@/module/Cylinder'

export default defineComponent({
  name: 'CylinderPool',
  components: { TableComponent, NewCylinderType, CardSlider },
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
    const cylinderObject = new CylinderRepository()
    const body = ref<Object[]>()

    onBeforeMount(() => {
      cylinderObject.getRegisteredCylinders().then((responses: any) => {
        body.value = responses.data.data.cylinders
      })
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
    }
  },
})
</script>
