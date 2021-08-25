<template>
  <div>
    <div class="py-4 px-2">
      <div class="flex space-x-0 items-center">
        <button
          class="px-6 py-2 tracking-wide font-medium border-2 border-gray-200"
          :class="{
            'bg-purple-600 text-white': selected.customer,
          }"
          @click=";(selected.customer = true), (selected.walkin = false)"
        >
          Air Separation Cylinder
        </button>
        <button
          class="px-6 py-2 tracking-wide font-medium border-2 border-gray-200"
          :class="{
            'bg-purple-600 text-white': selected.walkin,
          }"
          @click=";(selected.walkin = true), (selected.customer = false)"
        >
          Walk-in Customer
        </button>
      </div>
      <h1 class="px-2 mt-4 mb-6 font-bold tracking-wide text-lg">
        Customer Details
      </h1>
      <div
        class="grid grid-rows-1 md:grid-cols-3 w-full px-4 gap-y-2 md:gap-x-4"
      >
        <div class="w-full space-y-2">
          <label for="" class="block font-medium text-base text-gray-600"
            >Customer Name</label
          >
          <input
            type="text"
            placeholder="Customer Name"
            class="
              border border-gray-400
              bg-white
              rounded-sm
              text-sm
              py-3
              w-full
            "
          />
        </div>
        <div class="w-full space-y-2">
          <label for="" class="block font-medium text-base text-gray-600"
            >ECR Number</label
          >
          <input
            type="text"
            placeholder="ECR Number"
            class="
              border border-gray-400
              bg-white
              rounded-sm
              text-sm
              py-3
              w-full
            "
          />
        </div>
        <div class="w-full space-y-2">
          <label for="" class="block font-medium text-base text-gray-600"
            >Date</label
          >
          <input
            type="date"
            placeholder="Select Date"
            class="
              border border-gray-400
              bg-white
              rounded-sm
              text-sm
              py-3
              w-full
            "
          />
        </div>
      </div>
      <div class="px-4 my-8">
        <div
          v-for="(cylinder, index) in cylinders"
          :key="index"
          class="w-full flex items-center space-x-1"
        >
          <div class="grid grid-rows-1 md:grid-cols-4 gap-y-2 md:gap-x-0">
            <input
              type="number"
              class="py-3 rounded border border-gray-300 text-sm text-black"
              placeholder="Number of Cylinders"
            />
            <input
              type="number"
              class="py-3 rounded border border-gray-300 text-sm text-black"
              placeholder="Volume"
            />
            <input
              type="number"
              class="py-3 rounded border border-gray-300 text-sm text-black"
              placeholder="Unit Price"
            />
            <input
              type="number"
              class="py-3 rounded border border-gray-300 text-sm text-black"
              placeholder="Amount"
            />
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="fill-current text-gray-500 w-6 h-6 mx-auto"
            @click="decrement(index)"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="mt-4">
          <button
            class="flex items-center space-x-2 text-purple-500"
            @click="increment"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="fill-current w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
            <span>Add More</span>
          </button>
        </div>
      </div>

      <div class="px-4 w-full">
        <div class="w-1/3">
          <label class="block font-medium tracking-wide text-lg py-2">
            Prepared By</label
          >
          <select
            name="user"
            class="w-full py-4 px-4 rounded border border-gray-300"
          >
            <option value="">Jonathan Adebimpe</option>
          </select>
        </div>
      </div>
      <div class="flex items-center space-x-6 px-4 mt-4">
        <button class="bg-btn-purple text-white px-8 py-2 rounded-sm">
          Send
        </button>
        <button
          class="text-btn-purple border border-btn-purple px-8 py-2 rounded-sm"
        >
          Save
        </button>
        <button
          class="
            flex
            items-center
            bg-btn-purple
            text-white
            space-x-3
            px-4
            py-2
            rounded-sm
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 fill-current text-btn-purple"
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
          <span>Print a Copy</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'noSidebar',
  setup() {
    const selected = reactive({
      customer: true,
      walkin: false,
    })

    const cylinders = ref<any>([])

    const increment = () => {
      cylinders.value.push({
        numberOfCylinders: 0,
        volume: 0,
        amount: 0,
        unitPrice: 0,
      })
    }

    function decrement(index: any) {
      cylinders.value.splice(index, 1)
    }

    return {
      selected,
      cylinders,
      increment,
      decrement,
    }
  },
})
</script>
