<template>
  <div class="px-6 py-6">
    <div class="bg-white w-full h-full rounded-md">
      <div class="px-6 py-6">
        <div class="mb-4">
          <h1 class="font-medium text-xl text-black">Create Product</h1>
          <p class="text-gray-600 text-sm">Enter Product details below</p>
        </div>
        <div class="grid grid-rows-1 lg:grid-cols-4 gap-4">
          <div class="w-full py-3">
            <label
              for="password"
              class="block w-full px-1 text-gray-800 text-sm mb-1"
              >Select Date</label
            ><select
              class="block w-full px-4 py-3.5 border-2 border-gray-200 text-black rounded-md focus:outline-none focus:border-purple-300 font-thin bg-white"
            >
              <option
                v-for="(value, index) in locationArray"
                :key="index"
                :value="value"
                class="text-black"
              >
                {{ value }}
              </option>
            </select>
          </div>

          <input-component
            :label-title="'Division'"
            :input-placeholder="'Enter Division'"
          />

          <input-component
            :label-title="'Supplier'"
            :input-placeholder="'Enter Supplier'"
          />

          <input-component
            :label-title="'Item Description'"
            :input-placeholder="'Enter description'"
          />

          <input-component
            :label-title="'Equipment Model'"
            :input-placeholder="'Enter Model'"
          />

          <input-component
            :label-title="'Equipment Type'"
            :input-placeholder="'Enter Equipment Type'"
          />

          <input-component
            :label-title="'Area of Specialization'"
            :input-placeholder="'Enter Area of Specialization'"
          />

          <input-component
            :label-title="'ASNL Part No'"
            :input-placeholder="'#######'"
          />

          <input-component
            :label-title="'Part No'"
            :input-placeholder="'########'"
          />

          <input-component
            :label-title="'Serial No'"
            :input-placeholder="'Enter Serial Number'"
          />

          <input-component
            :label-title="'Serial No'"
            :input-placeholder="'Enter Serial Number'"
          />

          <input-component
            :label-title="'Reorder level'"
            :input-placeholder="'#'"
          />

          <input-component
            :label-title="'Unit Cost'"
            :input-placeholder="'#'"
          />

          <input-component
            :label-title="'Total Cost'"
            :input-placeholder="'#'"
          />

          <input-component
            :label-title="'Quantity'"
            :input-placeholder="'Enter Serial Number'"
          />
          <select-component
            :label-title="'Location'"
            :select-array="locationArray"
          />
          <input-component
            :label-title="'Referrer'"
            :input-placeholder="'Enter Referrer'"
          />
        </div>
        <div class="lg:flex w-full lg:space-x-4 lg:w-2/5">
          <button-component
            :button-text="'Create Product'"
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
import InputComponent from '~/components/Form/Input.vue'
import SelectComponent from '~/components/Form/Select.vue'
import ButtonComponent from '~/components/Form/Button.vue'
export default defineComponent({
  components: { InputComponent, SelectComponent, ButtonComponent },
  layout: 'dashboard',
  setup() {
    const locationArray = ['Lagos', 'Cross River']
    return {
      locationArray,
    }
  },
})
</script>
