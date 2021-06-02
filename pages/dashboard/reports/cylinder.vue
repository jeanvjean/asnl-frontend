<template>
  <div class="py-6 px-8">
    <h1>Cylinder Management</h1>

    <div class="bg-white px-6 py-4 mt-4">
      <div
        class="grid grid-rows-1 lg:grid-cols-2 font-medium text-lg gap-4 mb-4"
      >
        <div class="text-purple-500">Transferred Cylinder Report</div>
        <div>Condemned Cylinder Report</div>
      </div>
      <div class="my-4 px-4 py-2">
        <div>
          <filter-component />
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
            <td class="px-4 text-center py-4">{{ bodySingle.cylinder }}</td>
            <td class="px-4 text-center py-4">{{ bodySingle.assign }}</td>
            <td class="px-4 text-center py-4">{{ bodySingle.volume }}</td>
            <td class="px-4 text-center py-4">{{ bodySingle.purchase }}</td>
            <td class="px-4 text-center py-4">{{ bodySingle.reason }}</td>
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
      'Cylinder No',
      'Assign No',
      'Volume',
      'Purchase Date',
      'Reason',
    ]

    const body = [
      {
        date: '23-02-2020',
        cylinder: '#232342',
        assign: '#423',
        volume: '32kg',
        purchase: '23-02-2020',
        reason: '#443432',
      },
      {
        date: '23-02-2020',
        cylinder: '#232342',
        assign: '#423',
        volume: '32kg',
        purchase: '23-02-2020',
        reason: '#443432',
      },
      {
        date: '23-02-2020',
        cylinder: '#232342',
        assign: '#423',
        volume: '32kg',
        purchase: '23-02-2020',
        reason: '#443432',
      },
      {
        date: '23-02-2020',
        cylinder: '#232342',
        assign: '#423',
        volume: '32kg',
        purchase: '23-02-2020',
        reason: '#443432',
      },
      {
        date: '23-02-2020',
        cylinder: '#232342',
        assign: '#423',
        volume: '32kg',
        purchase: '23-02-2020',
        reason: '#443432',
      },
    ]

    return {
      headers,
      body,
    }
  },
})
</script>
