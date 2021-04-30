<template>
  <div class="py-6 px-4">
    <div
      class="grid grid-rows-1 lg:grid-cols-3 gap-4 bg-dark-blue px-6 py-6 rounded relative"
    >
      <card
        v-for="i in 3"
        :key="i"
        :header-stat="statistics[0]"
        :bottom-stat="statistics[1]"
      >
      </card>
      <div
        class="absolute flex justify-between items-center w-full inset-y-1/2"
      >
        <div
          class="flex justify-center items-center w-8 h-8 rounded-full bg-dark-blue -ml-4"
        >
          <svg
            class="w-6 h-6 fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M0 10a10 10 0 1120 0 10 10 0 01-20 0zm10 8a8 8 0 100-16 8 8 0 000 16zm.7-10.54L14.25 11l-1.41 1.41L10 9.6l-2.83 2.8L5.76 11 10 6.76l.7.7z"
            />
          </svg>
        </div>
        <div
          class="flex justify-center items-center w-8 h-8 rounded-full bg-dark-blue -mr-4"
        >
          <svg
            class="w-6 h-6 fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M20 10a10 10 0 11-20 0 10 10 0 0120 0zM10 2a8 8 0 100 16 8 8 0 000-16zm-.7 10.54L5.75 9l1.41-1.41L10 10.4l2.83-2.82L14.24 9 10 13.24l-.7-.7z"
            />
          </svg>
        </div>
      </div>
    </div>
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
import { defineComponent, ref } from '@nuxtjs/composition-api'
import TableComponent from '@/components/Base/Table2.vue'
import NewCylinderType from '@/components/Overlays/NewCylinderType.vue'
import Card from '@/components/Base/Card.vue'
export default defineComponent({
  name: 'CylinderPool',
  components: { TableComponent, NewCylinderType, Card },
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
    const body = [
      {
        cylinder_number: 'ASNL-LUTH-1209',
        gas_type: 'Gas type',
        volume: 'Gas Volume Content',
        capacity: '19kg',
        type: 'Assigned Cylinder',
        date: 'August 23, 2019',
      },
      {
        cylinder_number: 'ASNL-LUTH-1209',
        gas_type: 'Gas type',
        volume: 'Gas Volume Content',
        capacity: '19kg',
        type: 'Assigned Cylinder',
        date: 'August 23, 2019',
      },
      {
        cylinder_number: 'ASNL-LUTH-1209',
        gas_type: 'Gas type',
        volume: 'Gas Volume Content',
        capacity: '19kg',
        type: 'Assigned Cylinder',
        date: 'August 23, 2019',
      },
      {
        cylinder_number: 'ASNL-LUTH-1209',
        gas_type: 'Gas type',
        volume: 'Gas Volume Content',
        capacity: '19kg',
        type: 'Assigned Cylinder',
        date: 'August 23, 2019',
      },
      {
        cylinder_number: 'ASNL-LUTH-1209',
        gas_type: 'Gas type',
        volume: 'Gas Volume Content',
        capacity: '19kg',
        type: 'Assigned Cylinder',
        date: 'August 23, 2019',
      },
    ]
    const showType = ref(false)
    const statistics = [
      {
        title: 'Total ASNL Cylinders',
        value: 4319,
      },
      [
        {
          title: 'Buffer Cylinders',
          value: 2589,
        },
        {
          title: 'Assigned Cylinders',
          value: 456,
        },
      ],
    ]
    return {
      headers,
      body,
      showType,
      statistics,
    }
  },
})
</script>
