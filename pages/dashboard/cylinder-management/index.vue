<template>
  <div class="py-6 px-4">
    <div
      class="grid grid-rows-1 lg:grid-cols-3 gap-4 bg-dark-blue px-6 py-6 rounded"
    >
      <card
        v-for="i in 3"
        :key="i"
        :header-stat="statistics[0]"
        :bottom-stat="statistics[1]"
      >
      </card>
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
import TableComponent from '~/components/Base/Table2.vue'
import NewCylinderType from '~/components/Overlays/NewCylinderType.vue'
import Card from '~/components/Base/Card.vue'
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
