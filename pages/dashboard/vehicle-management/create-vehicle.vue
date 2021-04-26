<template>
  <div class="px-6 py-6">
    <div class="bg-white w-full h-full rounded-md">
      <div class="px-6 py-6">
        <div class="mb-4">
          <h1 class="font-medium text-xl text-black">Create Vehicle</h1>
          <p class="text-gray-600 text-sm">Enter Vehicle details below</p>
        </div>
        <div class="grid grid-rows-1 lg:grid-cols-3 gap-4">
          <input-component
            :label-title="'Vehicle Type'"
            :input-placeholder="'Enter Vehicle Type'"
          />

          <input-component
            :label-title="'Manufacturer'"
            :input-placeholder="'Enter Manufacturer'"
          />

          <input-component
            :label-title="'Model'"
            :input-placeholder="'Enter Model'"
          />

          <input-component
            :label-title="'Registration Number'"
            :input-placeholder="'Enter Number'"
          />

          <input-component
            :label-title="'Acquisition Date'"
            :input-placeholder="'Select Date'"
          />

          <input-component
            :label-title="'Mileage Date'"
            :input-placeholder="'Enter Date'"
          />

          <input-component
            :label-title="'Current Mileage'"
            :input-placeholder="'Optional'"
          />

          <input-component
            :label-title="'Assigned to'"
            :input-placeholder="'########'"
          />

          <input-component
            :label-title="'Vehicle Category'"
            :input-placeholder="'Enter Serial Number'"
          />

          <input-component
            :label-title="'Batery Capacity'"
            :input-placeholder="'Enter Battery Capacity'"
          />

          <input-component
            :label-title="'Tank Capacity'"
            :input-placeholder="'Enter Tank Capacity'"
          />

          <input-component
            :label-title="'Fuel Type'"
            :input-placeholder="'Enter Fuel Type'"
          />

          <input-component
            :label-title="'Gross Weight'"
            :input-placeholder="'Optional'"
          />

          <input-component
            :label-title="'Net Weight'"
            :input-placeholder="'Optional'"
          />
        </div>
        <div class="font-bold text-xl my-4">DISPOSAL DETAILS</div>
        <div class="grid grid-rows-1 lg:grid-cols-3 gap-4">
          <input-component
            :label-title="'Disposal Date'"
            :input-placeholder="'Enter Disposal Date'"
          />
          <input-component
            :label-title="'Disposal Amount'"
            :input-placeholder="'Enter Disposal Amount'"
          />
          <input-component
            :label-title="'Disposal Mileage'"
            :input-placeholder="'Enter Disposal Mileage'"
          />
        </div>
        <div class="lg:flex w-full lg:space-x-4 lg:w-2/5 my-6">
          <button-component
            :button-text="'Create Vehicle'"
            :button-class="'py-2 bg-purple-500 text-white rounded'"
          />
          <button-component
            :button-text="'Cancel'"
            :button-class="'py-2 bg-white text-purple-500 border border-purple-500 rounded'"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import InputComponent from '@/components/Form/Input.vue'
import ButtonComponent from '@/components/Form/Button.vue'
export default defineComponent({
  components: { InputComponent, ButtonComponent },
  layout: 'dashboard',
  setup() {
    const locationArray = ['Lagos', 'Cross River']
    return {
      locationArray,
    }
  },
})
</script>
