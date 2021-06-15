<template>
  <div class="w-full md:w-10/12 lg:w-8/12 md:mx-auto mt-10">
    <div class="bg-white px-6 md:px-10 py-6">
      <div class="flex items-center space-x-4">
        <span>Date:</span>
        <div class="flex space-x-4 items-center">
          <span>12/02/2020</span
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            class="fill-current w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div
        class="
          flex
          items-center
          justify-between
          mt-10
          divide-x-2 divide-gray-300
        "
      >
        <div class="w-full flex justify-between items-center">
          <div class="space-y-3">
            <p class="text-lg font-medium text-gray-600 tracking-tight">
              Customer Name
            </p>
            <p class="text-base text-gray-400">Luth Hospital</p>
          </div>
        </div>
        <div class="w-full flex justify-center items-center">
          <div class="space-y-3">
            <p class="text-lg font-medium text-gray-600 tracking-tight">
              Cylinder No
            </p>
            <p class="text-base text-gray-400">AS4342323</p>
          </div>
        </div>
        <div class="w-full flex justify-end items-center">
          <div class="space-y-3">
            <p class="text-lg font-medium text-gray-600 tracking-tight">
              Volume
            </p>
            <p class="text-base text-gray-400">43</p>
          </div>
        </div>
      </div>

      <div class="w-full overflow-x-auto mt-10 mb-5">
        <table class="table w-full text-gray-500">
          <thead>
            <tr>
              <th class="w-auto text-center">S/N</th>
              <th class="w-6/12">Cylinder No</th>
              <th class="w-5/12">Volume</th>
              <th class="w-auto"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in cylinderCount" :key="i">
              <td class="text-center">{{ i }}</td>
              <td>
                <input-component :input-placeholder="'Enter Cylinder No'" />
              </td>
              <td>
                <input-component :input-placeholder="'Enter Volume'" />
              </td>
              <td>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  class="fill-current text-gray-600 w-4 h-4"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="inline-block px-16">
        <button
          class="flex justify-evenly items-center"
          @click="increaseCounter()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 fill-current text-transparent mr-2"
            viewBox="0 0 24 24"
            stroke="gray"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span class="text-md text-gray-400 underline">Add New Product</span>
        </button>
      </div>

      <div class="flex md:space-x-4 flex-col md:flex-row items-center my-8">
        <div class="w-full">
          <label class="block my-2 text-gray-600" for=""
            >Authorising Officer Comment</label
          >
          <textarea
            class="w-full border-2 border-gray-300 rounded-sm appearance-none"
            placeholder="Enter Comment"
            rows="3"
          ></textarea>
        </div>
        <div class="w-full">
          <label class="block my-2 text-gray-600" for=""
            >Approving Officer Comment</label
          >
          <textarea
            class="w-full border-2 border-gray-300 rounded-sm appearance-none"
            placeholder="Enter Comment"
            rows="3"
          ></textarea>
        </div>
      </div>

      <div
        class="flex items-center w-full md:space-x-4 flex-col md:flex-row my-8"
      >
        <div class="w-full">
          <label class="block" for="">Prepared By</label>
          <select-component
            :default-option-text="'Select a User'"
            :select-array="[]"
          />
        </div>
        <div class="w-full">
          <label class="block" for="">Approved By</label>
          <select-component
            :default-option-text="'Select a User'"
            :select-array="[]"
          />
        </div>
        <div class="w-full">
          <label class="block" for="">Authorised By</label>
          <select-component
            :default-option-text="'Select a User'"
            :select-array="[]"
          />
        </div>
      </div>
      <div class="flex items-center w-1/2 space-x-4 my-10">
        <button-component
          :button-class="'bg-btn-purple text-white w-auto'"
          :button-text="'Create order'"
        />
        <button-component
          :button-class="'text-btn-purple border border-btn-purple bg-white w-auto'"
          :button-text="'Cancel'"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import ButtonComponent from '~/components/Form/Button.vue'
import InputComponent from '~/components/Form/Input.vue'
import SelectComponent from '~/components/Form/Select.vue'

export default defineComponent({
  components: { SelectComponent, ButtonComponent, InputComponent },
  layout: 'dashboard',
  setup() {
    const cylinderCount = ref(0)

    const increaseCounter = () => {
      cylinderCount.value = cylinderCount.value + 1
    }

    return {
      cylinderCount,
      increaseCounter,
    }
  },
})
</script>
