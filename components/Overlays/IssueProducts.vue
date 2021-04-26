<template>
  <back-drop>
    <div class="w-full lg:w-3/5 bg-white rounded-md">
      <div class="rounded-sm">
        <div class="flex justify-between items-center bg-white py-4 px-8">
          <h1>Issue Products</h1>
          <div class="flex space-x-8 items-center">
            <button
              class="flex space-x-4 py-2 px-4 items-center bg-purple-600 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 fill-current text-purple-600"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              <span class="text-white font-medium text-sm">Print a copy</span>
            </button>
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
        <div class="bg-gray-200 py-6 px-8 space-y-6">
          <div class="flex justify-between items-center text-md">
            <div>
              <span>MRN:</span>
              <span>00234</span>
            </div>
            <div class="flex space-x-2 items-center">
              <span>Date:</span>
              <div class="flex space-x-2 items-center">
                <span>12/05/2020</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 fill-current text-white"
                  viewBox="0 0 24 24"
                  stroke="black"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div class="grid grid-rows-1 lg:grid-cols-3 gap-x-4 items-center">
            <select-component
              :label-title="'Requesting Department'"
              :select-array="[]"
              :default-option-text="'Choose Department'"
            />
            <select-component
              :label-title="'Customer'"
              :select-array="[]"
              :default-option-text="'Choose Customer'"
            />
            <input-component
              :label-title="'Job Tag'"
              :input-placeholder="'Enter Job Tag'"
            />
          </div>
          <div class="w-full overflow-x-auto">
            <table class="w-full table-auto border-separate">
              <thead>
                <tr>
                  <th
                    class="px-4 py-2 font-medium text-gray-600 uppercase text-center text-sm"
                  >
                    S/N
                  </th>
                  <th
                    class="px-4 py-2 font-medium text-gray-600 uppercase text-sm"
                  >
                    Product Number
                  </th>
                  <th
                    class="px-4 py-2 font-medium text-gray-600 uppercase text-sm"
                  >
                    Qty
                  </th>
                  <th
                    class="px-4 py-2 font-medium text-gray-600 uppercase text-sm"
                  >
                    Passed
                  </th>
                  <th
                    class="px-4 py-2 font-medium text-gray-600 uppercase text-sm"
                  >
                    Rejected
                  </th>
                  <th
                    class="px-4 py-2 font-medium text-gray-600 uppercase text-sm"
                  >
                    Comment
                  </th>
                  <th
                    class="px-4 py-2 font-medium text-gray-600 uppercase text-sm"
                  ></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="i in count" :key="i">
                  <td class="text-center">{{ i }}</td>
                  <td>
                    <input-component :input-placeholder="'######'" />
                  </td>
                  <td>
                    <input-component
                      :input-placeholder="'Enter Product Name'"
                    />
                  </td>
                  <td>
                    <input-component :input-placeholder="'#'" />
                  </td>
                  <td>
                    <input-component :input-placeholder="'#'" />
                  </td>
                  <td>
                    <input-component :input-placeholder="'Enter Comment'" />
                  </td>
                  <td class="text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="fill-current text-transparent w-4 h-4"
                      viewBox="0 0 24 24"
                      stroke="black"
                      @click="count--"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="w-auto px-12 mb-10">
            <div class="w-full mx-auto">
              <button class="flex items-center space-x-1" @click="count++">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    class="w-4 h-4 fill-current text-gray-500"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div class="underline">Add New Product</div>
              </button>
            </div>
          </div>
          <div
            class="w-full lg:w-3/5 lg:flex lg:justify-between lg:items-center lg:space-x-6"
          >
            <button
              class="px-8 py-2 rounded-sm bg-purple-500 text-white w-full"
            >
              Disburse Stock
            </button>
            <button
              class="px-8 py-2 rounded-sm bg-white text-purple border border-purple-500 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </back-drop>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import BackDrop from '@/components/Base/Backdrop.vue'
import SelectComponent from '@/components/Form/Select.vue'
import InputComponent from '@/components/Form/Input.vue'

export default defineComponent({
  components: {
    BackDrop,
    SelectComponent,
    InputComponent,
  },
  setup(_props, ctx) {
    const close = () => {
      ctx.emit('close')
    }
    const count = ref(2)
    return {
      close,
      count,
    }
  },
})
</script>
