<template>
  <div class="py-6 px-8">
    <h1>Inventory Management</h1>

    <div class="bg-white px-6 py-4 mt-4">
      <div
        class="grid grid-rows-1 lg:grid-cols-2 font-medium text-lg gap-4 mb-4"
      >
        <div class="text-btn-purple">Products Issued Out Reports</div>
        <div>Products Issued Out Reports by Equipment Type</div>
        <div>Products Issued Out Reports by Equipment Model</div>
        <div>Products Issued Out Reports by Customer</div>
      </div>
      <div class="my-4 px-4 py-2">
        <div><filter-component /></div>
      </div>

      <table class="w-full table-auto mt-4">
        <thead class="border-b border-gray-700">
          <tr>
            <th
              v-for="(headSingle, index) in headers"
              :key="index"
              class="
                uppercase
                text-gray-900
                font-medium
                text-sm
                px-4
                py-4
                text-center
              "
            >
              {{ headSingle }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(bodySingle, index) in body"
            :key="index"
            class="font-light"
          >
            <td class="px-4 text-center py-4">{{ index + 1 }}</td>
            <td class="px-4 text-center py-4">{{ bodySingle.date }}</td>
            <td class="px-4 text-center py-4">{{ bodySingle.mrn }}</td>
            <td class="px-4 text-center py-4">{{ bodySingle.customer }}</td>
            <td class="px-4 text-center py-4">{{ bodySingle.tags }}</td>
            <td class="px-4 text-center py-4">{{ bodySingle.type }}</td>
            <td class="px-4 text-center py-4">{{ bodySingle.model }}</td>
            <td class="px-4 text-center py-4">{{ bodySingle.part_name }}</td>
            <td class="px-4 text-center py-4">{{ bodySingle.part_no }}</td>
            <td class="px-4 text-center py-4">{{ bodySingle.quantity }}</td>
            <td class="px-4 text-center py-4">{{ bodySingle.total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import FilterComponent from '@/components/Base/Filter.vue'

export default defineComponent({
  name: 'Inventory',
  components: { FilterComponent },
  layout: 'dashboard',
  setup() {
    const headers = [
      'S/N',
      'Date',
      'Mrn No',
      'Customer',
      'Jobs Tags',
      'Equipment Type',
      'Equipment Model',
      'Part Name',
      'Part No',
      'Quantity',
      'Total',
    ]

    const body = [
      {
        date: '23-02-2020',
        mrn: '#232342',
        customer: 'James A. John',
        tags: 'Job Tags',
        type: 'Box Cylinder',
        model: '#4342421',
        part_name: 'John Part',
        part_no: '#34232',
        quantity: 34,
        total: 3400,
      },
      {
        date: '23-02-2020',
        mrn: '#232342',
        customer: 'James A. John',
        tags: 'Job Tags',
        type: 'Box Cylinder',
        model: '#4342421',
        part_name: 'John Part',
        part_no: '#34232',
        quantity: 34,
        total: 3400,
      },
      {
        date: '23-02-2020',
        mrn: '#232342',
        customer: 'James A. John',
        tags: 'Job Tags',
        type: 'Box Cylinder',
        model: '#4342421',
        part_name: 'John Part',
        part_no: '#34232',
        quantity: 34,
        total: 3400,
      },
      {
        date: '23-02-2020',
        mrn: '#232342',
        customer: 'James A. John',
        tags: 'Job Tags',
        type: 'Box Cylinder',
        model: '#4342421',
        part_name: 'John Part',
        part_no: '#34232',
        quantity: 34,
        total: 3400,
      },
      {
        date: '23-02-2020',
        mrn: '#232342',
        customer: 'James A. John',
        tags: 'Job Tags',
        type: 'Box Cylinder',
        model: '#4342421',
        part_name: 'John Part',
        part_no: '#34232',
        quantity: 34,
        total: 3400,
      },
      {
        date: '23-02-2020',
        mrn: '#232342',
        customer: 'James A. John',
        tags: 'Job Tags',
        type: 'Box Cylinder',
        model: '#4342421',
        part_name: 'John Part',
        part_no: '#34232',
        quantity: 34,
        total: 3400,
      },
    ]

    return {
      headers,
      body,
    }
  },
})
</script>
