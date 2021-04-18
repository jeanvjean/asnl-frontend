<template>
  <back-drop>
    <div class="w-full lg:w-1/2 bg-white py-10 px-8 rounded-md">
      <div class="bg-white rounded-sm">
        <div class="flex justify-between items-center">
          <div>
            <p>Create Supplier</p>
            <p class="text-sm font-thin text-gray-700">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
              est magni ipsa!
            </p>
          </div>
          <div>
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
        </div>
        <div class="w-full flex my-6 space-x-8">
          <h1 class="py-2 border-b border-purple-500">General Inventories</h1>
          <h1 class="py-2">Product (Gas Refill)</h1>
        </div>
        <div
          class="grid grid-rows-1 lg:grid-cols-2 gap-y-4 lg:gap-x-4 lg:gap-y-1 my-4"
        >
          <select-component
            :label-title="'Product Type'"
            :default-option-text="'Multiple Select'"
            :select-array="[]"
          />
          <input-component
            :label-title="'Name'"
            :input-placeholder="'Enter Name'"
          />
          <input-component
            :label-title="'Location'"
            :input-placeholder="'Enter Location'"
          />
          <input-component
            :label-title="'Contact Person'"
            :input-placeholder="'Enter contact person'"
          />
          <input-component
            :label-title="'Email address'"
            :input-placeholder="'Enter Email Address'"
          />
          <input-component
            :label-title="'Telephone No'"
            :input-placeholder="'Enter Telephone'"
          />
          <select-component
            :label-title="'Supplier Type'"
            :default-option-text="'Select Supplier Type'"
            :select-array="[]"
          />
        </div>
        <div>
          <button
            class="bg-purple-700 text-white flex space-x-6 px-4 py-2 items-center rounded"
          >
            <span>Create Supplier</span>
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
    </div>
  </back-drop>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BackDrop from '~/components/Base/Backdrop.vue'
import InputComponent from '~/components/Form/Input.vue'
import SelectComponent from '~/components/Form/Select.vue'

export default defineComponent({
  components: {
    BackDrop,
    InputComponent,
    SelectComponent,
  },
  setup(_props, ctx) {
    const close = () => {
      ctx.emit('close')
    }

    return {
      close,
    }
  },
})
</script>
