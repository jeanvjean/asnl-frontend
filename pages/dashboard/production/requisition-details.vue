<template>
  <div class="px-6 py-6">
    <div class="py-2">
      <div class="bg-white w-3/4 mx-auto">
        <div class="flex justify-between px-6 py-4">
          <h1 class="flex-1 text-gray-400 font-medium text-lg">
            Requisition Details
          </h1>
          <div class="flex space-x-6">
            <button
              class="
                flex
                items-center
                space-x-4
                px-4
                py-2
                rounded-sm
                border border-btn-purple
                text-btn-purple
              "
            >
              Generate Invoice
            </button>
            <button
              class="
                flex
                items-center
                bg-btn-purple
                text-white
                space-x-4
                px-4
                py-2
                rounded-sm
              "
              @click="
                status = 'success'
                showConfirmation = true
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
        <div class="w-full overflow-x-auto px-8 my-8">
          <div
            class="
              grid grid-rows-1
              lg:grid-cols-3
              divide divide-x-2 divide-gray-300
              mt-8
            "
          >
            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Customer Name</h4>
                <p>Luth Hospital</p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">ERC No</h4>
                <p>AS4342323</p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Date</h4>
                <p>12/05/2020</p>
              </div>
            </div>
          </div>
        </div>
        <div class="px-10 py-6 border-b border-t border-gray-300 w-full">
          <table class="w-10/12">
            <thead>
              <tr>
                <th class="px-4 py-2 text-right w-20">S/N</th>
                <th class="px-4 py-2 text-left">Cylinder No</th>
                <th class="px-4 py-2 text-left">Volume</th>
                <th class="px-4 py-2 text-left">Unit Price</th>
                <th class="px-4 py-2 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in 3" :key="i">
                <td class="px-4 py-2 text-right">0{{ i }}.</td>
                <td class="px-4 py-2 border border-gray-300 text-left">
                  ASORO987
                </td>
                <td class="px-4 py-2 border border-gray-300 text-left">43Kg</td>
                <td class="px-4 py-2 border border-gray-300 text-left">
                  1,100.00
                </td>
                <td class="px-4 py-2 border border-gray-300 text-left">
                  6,000.00
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="w-full overflow-x-auto px-8 my-4">
          <div
            class="
              grid grid-rows-1
              lg:grid-cols-4
              divide divide-x-2 divide-gray-300
              mt-8
            "
          >
            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Total Quantity</h4>
                <p>2</p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Total Volume</h4>
                <p>312kg</p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">VAT</h4>
                <p>7%</p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Total Amount</h4>
                <p class="leading-3">9,000.00</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-evenly items-start py-2 px-2">
          <div v-for="i in 3" :key="i">
            <p class="text-gray-500 text-sm font-medium leading-6">
              Initiated at
            </p>
            <p class="text-gray-500 text-sm font-medium">
              <span>24/02/2020</span> <span>11:02</span>
            </p>
            <div class="flex items-start space-x-4 py-2">
              <img
                class="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=ZIOeP15SMT&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <div>
                <p class="text-black text-lg">Chimerem Egbuson</p>
                <p class="text-gray-600 text-sm">Operations Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'Transfer',
  layout: 'dashboard',
  setup() {
    const types = [{ name: 'Assign Cylinder', value: 'temp' }]
    const reciepients = [{ name: 'Oxygen', value: 'temp' }]
    const showConfirmation = ref(false)
    const showFinalStep = ref(false)
    const status = ref('')
    const message = ref('')
    watch(status, (currentValue) => {
      if (currentValue === 'success') {
        message.value = 'You have successfully approved this request'
      } else if (currentValue === 'error') {
        message.value = 'You have regretably declined this request'
      }
    })
    const count = ref(0)
    return {
      types,
      reciepients,
      showConfirmation,
      showFinalStep,
      status,
      message,
      count,
    }
  },
})
</script>
