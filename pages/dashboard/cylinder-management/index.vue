<template>
  <div class="py-6 px-6">
    <card-slider />
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
import CardSlider from '@/components/Base/CardSlider.vue'
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

    return {
      headers,
      body,
      showType,
    }
  },
})
</script>
