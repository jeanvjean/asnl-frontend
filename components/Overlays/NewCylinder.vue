<template>
  <back-drop>
    <div class="w-full sm:w-full md:w-1/2 bg-white py-4 px-8 rounded-md">
      <div class="flex justify-between items-center my-2">
        <div>
          <p class="text-xl font-medium">Register Gas Cylinder</p>
          <p class="font-light text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <svg
          class="w-6 h-6 fill-current text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          @click="close"
        >
          <path
            d="M2.93 17.07A10 10 0 1117.07 2.93 10 10 0 012.93 17.07zM11.4 10l2.83-2.83-1.41-1.41L10 8.59 7.17 5.76 5.76 7.17 8.59 10l-2.83 2.83 1.41 1.41L10 11.41l2.83 2.83 1.41-1.41L11.41 10z"
          />
        </svg>
      </div>
      <div class="grid grid-rows-1 md:grid-cols-2 gap-x-4">
        <select-component
          :label-title="'Cylinder Type'"
          :select-array="cylinderTypes"
          :default-option-text="'Select a Cylinder Type'"
        />
        <input-component
          :label-title="'Original Cylinder Number'"
          :input-placeholder="'Cylinder number goes here'"
        />

        <input-component
          :label-title="'Water Capacity'"
          :input-placeholder="'Capacity'"
        />

        <div class="w-full py-3 mt-1 relative">
          <label for="password" class="block w-full px-1 text-gray-800 text-md"
            >Gas Volume Content</label
          ><input
            placeholder="Enter Amount"
            type="number"
            class="block w-full px-4 py-3 border-2 border-gray-200 rounded focus:outline-none focus:border-purple-300 font-thin placeholder-black hover:placeholder-opacity-25"
          />
          <select
            class="absolute top-12 right-0 -mt-2.5 bg-gray-200 border-none py-3 rounded"
          >
            <option value="KG">KG</option>
          </select>
        </div>

        <input-component
          :label-title="'Date of Manufacture'"
          :input-type="'date'"
          :input-placeholder="'Select Date Here'"
        />
        <input-component
          :label-title="'Filling Pressure'"
          :input-placeholder="'Enter Pressure here (bar)'"
        />
        <select-component
          :label-title="'Cylinder Assigned To'"
          :default-option-text="'Select Customer'"
          :select-array="assignedTypes"
        />
        <input-component
          :label-title="'Testing Pressure'"
          :input-placeholder="'Enter Working Pressure here (bar)'"
        />
        <select-component
          :label-title="'Gas Type'"
          :select-array="gasTypes"
          :default-option-text="'Select Gas Type'"
        />
        <input-component
          :label-title="'Standard Cylinder Color Code'"
          :input-placeholder="'Green'"
        />
        <input-component
          :label-title="'Assigned Number'"
          :input-placeholder="'ASNL BF-103'"
        />
      </div>
      <div class="flex justify-center items-center space-x-4 mt-4">
        <button
          class="rounded-sm px-4 py-2 border-2 border-purple-300 text-sm font-light flex justify-between items-center space-x-4"
        >
          <span>Add More Cylinders</span>
          <svg
            class="w-4 h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 110-20 10 10 0 010 20zm0-2a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </button>
        <button
          class="rounded-sm px-4 py-2 border border-purple-300 text-sm font-light flex justify-between items-center space-x-4 bg-purple-500 text-white"
        >
          <span>Complete Registration</span>
          <svg
            class="w-4 h-4 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.417 15.181l-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931L23.93 3.821l.001-.001c.321-1.496-.541-2.081-1.527-1.714l-21.29 8.151c-1.453.564-1.431 1.374-.247 1.741l5.443 1.693L18.953 5.78c.595-.394 1.136-.176.691.218z"
            />
          </svg>
        </button>
      </div>
    </div>
  </back-drop>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import BackDrop from '@/components/Base/Backdrop.vue'
import InputComponent from '@/components/Form/Input.vue'
import SelectComponent from '@/components/Form/Select.vue'
import { CylinderRepository } from '@/module/Cylinder'
export default defineComponent({
  components: { BackDrop, InputComponent, SelectComponent },
  setup(_props, ctx) {
    const cylinderObject = new CylinderRepository()
    const cylinderTypes = [
      { name: 'Buffer', value: 'buffer' },
      { name: 'Assigned', value: 'assigned' },
    ]
    const assignedTypes = ['UCH']
    const gasTypes = ref([])
    const close = () => {
      ctx.emit('close')
    }

    onMounted(() => {
      cylinderObject.getCylinders().then((response) => {
        const myResponse = response.data.data.cylinders
        gasTypes.value = myResponse.map((element: any) => {
          return {
            name: element.gasName + ' - ' + element.colorCode,
            value: element._id,
          }
        })
      })
    })
    return {
      cylinderTypes,
      assignedTypes,
      gasTypes,
      close,
    }
  },
})
</script>
