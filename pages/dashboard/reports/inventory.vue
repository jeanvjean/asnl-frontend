<template>
  <div class="py-6 px-8">
    <h1>Inventory Management</h1>

    <div class="bg-white px-6 py-4 mt-4">
      <div
        class="grid grid-rows-1 lg:grid-cols-2 font-medium text-lg gap-4 mb-4"
      >
        <div class="text-purple-500">Products Issued Out Reports</div>
        <div>Products Issued Out Reports by Equipment Type</div>
        <div>Products Issued Out Reports by Equipment Model</div>
        <div>Products Issued Out Reports by Customer</div>
      </div>
      <div class="my-4 px-4 py-2">
        <div>
          <div class="flex space-x-4 items-center">
            <label class="text-gray-500">Filter By</label>
            <div
              class="flex items-center border-2 border-gray-300 justify-around space-x-2 text-gray-500 w-auto"
            >
              <svg
                class="w-4 h-4 ml-2 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M17 16v4h-2v-4h-2v-3h6v3h-2zM1 9h6v3H1V9zm6-4h6v3H7V5zM3 0h2v8H3V0zm12 0h2v12h-2V0zM9 0h2v4H9V0zM3 12h2v8H3v-8zm6-4h2v12H9V8z"
                />
              </svg>
              <select
                class="border-l-2 border-t-0 border-b-0 border-r-0 border-gray-300"
              >
                <option value="">All</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <table class="w-full table-auto mt-4">
        <thead class="border-b border-gray-700">
          <tr>
            <th
              v-for="(headSingle, index) in headers"
              :key="index"
              class="uppercase text-gray-900 font-medium text-sm px-4 py-4 text-center"
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

export default defineComponent({
  name: 'Inventory',
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
