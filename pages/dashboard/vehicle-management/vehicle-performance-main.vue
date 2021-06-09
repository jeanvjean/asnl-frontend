<template>
  <div class="px-10 py-6">
    <div class="w-full lg:w-1/2 mb-4">
      <h1 class="text-xl text-black font-medium">Vehicle Performance</h1>
    </div>
    <div class="grid grid-rows-1 lg:grid-cols-3 py-2">
      <div class="lg:col-span-2 overflow-x-auto bg-white">
        <div class="flex justify-between px-6 py-4">
          <h1 class="flex-1 text-gray-400 font-medium text-lg">
            Vehicle Performance
          </h1>
          <div class="flex space-x-4 items-center">
            <h6>Date:</h6>
            <span>12/05/2020</span>
            <svg
              class="w-4 h-4 text-black"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M1 4c0-1.1.9-2 2-2h14a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
              />
            </svg>
          </div>
        </div>
        <div
          class="
            grid grid-cols-2
            lg:grid-cols-5
            gap-2
            px-10
            divide-x-2 divide-black
            my-6
          "
        >
          <div
            v-for="(detail, index) in details[0]"
            :key="index"
            class="py-2 px-2 w-full"
          >
            <div class="text-center">
              <h2>{{ detail.title }}</h2>
              <span>{{ detail.value }}</span>
            </div>
          </div>
        </div>
        <div
          class="
            grid grid-cols-2
            lg:grid-cols-5
            gap-2
            px-10
            divide-x-2 divide-black
            my-6
          "
        >
          <div
            v-for="(detail, index) in details[1]"
            :key="index"
            class="py-2 px-2 w-full"
          >
            <div class="text-center">
              <h2>{{ detail.title }}</h2>
              <span>{{ detail.value }}</span>
            </div>
          </div>
        </div>
        <div class="w-full overflow-x-auto px-10 my-8">
          <table class="w-full table table-auto border-collapse">
            <thead>
              <tr>
                <th rowspan="3"></th>
                <th colspan="5" class="border border-black px-2 py-2">
                  Pickup
                </th>
                <th
                  colspan="2"
                  rowspan="2"
                  class="border border-black px-2 py-2"
                >
                  Delivery
                </th>
                <th rowspan="3"></th>
              </tr>
              <tr>
                <th rowspan="2" class="border border-black px-2 py-2">
                  Customer Name
                </th>
                <th colspan="2" class="border border-black px-2 py-2">
                  Projected
                </th>
                <th colspan="2" class="border border-black px-2 py-2">
                  Actual
                </th>
              </tr>
              <tr>
                <th class="border border-black px-2 py-2">Cylinder Qty</th>
                <th class="border border-black px-2 py-2">Cylinder Vol</th>
                <th class="border border-black px-2 py-2">Cylinder Qty</th>
                <th class="border border-black px-2 py-2">Cylinder Vol</th>
                <th class="border border-black px-2 py-2">Cylinder Qty</th>
                <th class="border border-black px-2 py-2">Cylinder Vol</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="j in tds" :key="j">
                <td class="px-2">{{ j }}.</td>
                <td class="border border-black px-2 py-2">
                  <input type="text" placeholder="Enter Customer Name" />
                </td>
                <td
                  v-for="i in 6"
                  :key="i"
                  class="border border-black px-2 py-2"
                >
                  <input class="w-full" type="text" placeholder="#" />
                </td>
                <td class="px-2">
                  <svg
                    class="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    @click="deduct"
                  >
                    <path
                      d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"
                    />
                  </svg>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="px-12 py-4">
            <button
              type="button"
              class="flex space-x-2 items-center focus:outline-none"
              @click="add"
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
              <span class="text-md text-gray-400 underline">Add New Item</span>
            </button>
          </div>
        </div>

        <div class="flex justify-start items-start py-2 px-10">
          <div>
            <p class="text-gray-500 text-sm font-medium leading-6">
              Presented By
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
        <div class="flex space-x-6 px-12 py-4 my-2">
          <button
            class="
              flex
              space-x-6
              py-2
              px-4
              items-center
              bg-btn-purple
              rounded-sm
            "
          >
            <span class="text-white font-medium text-lg">Save</span>
            <svg
              class="w-4 h-4 fill-current text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M2.93 17.07A10 10 0 1117.07 2.93 10 10 0 012.93 17.07zm12.73-1.41A8 8 0 104.34 4.34a8 8 0 0011.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z"
              />
            </svg>
          </button>
          <button
            class="
              flex
              space-x-6
              py-2
              px-4
              items-center
              bg-btn-purple
              rounded-sm
            "
          >
            <span class="text-white font-medium text-lg">Print</span>
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
          </button>
        </div>
      </div>
      <div class="lg:col-span-1 w-full px-6 py-4 border-b border-gray-300">
        <div v-for="i in 2" :key="i" class="mb-6 px-10">
          <p class="text-gray-600 font-light text-sm">
            <span>24/02/2020</span> <span>13:04</span>
          </p>
          <p class="py-2 text-gray-700 leading-6">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum
            corrupti minus, nobis harum saepe, vitae eius veniam deleniti velit
            esse ad, dolorem ipsum inventore omnis beatae blanditiis asperiores
            soluta maxime.
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
    <confirmation
      v-if="showConfirmation"
      @close="showConfirmation = false"
      @approve="
        showConfirmation = false
        showFinalStep = true
      "
    />
    <final-step
      v-if="showFinalStep"
      :status="status"
      :message="message"
      @close="showFinalStep = false"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from '@nuxtjs/composition-api'
import Confirmation from '@/components/Overlays/Confirmation.vue'
import FinalStep from '@/components/Overlays/finalStep.vue'
export default defineComponent({
  name: 'Transfer',
  components: { Confirmation, FinalStep },
  layout: 'dashboard',
  setup() {
    const types = ['Temporary Transfer']
    const reciepients = ['Isaac Babalola']
    const showConfirmation = ref(false)
    const showFinalStep = ref(false)
    const status = ref('')
    const message = ref('')
    const details = [
      [
        {
          title: 'Driver Name',
          value: 'Nissan',
        },
        {
          title: 'Vehicle Number',
          value: 'AAA456JK',
        },
        {
          title: 'Territory',
          value: '1200 Miles',
        },
        {
          title: 'Timeout',
          value: '1 hour',
        },
        {
          title: 'Time In',
          value: '30 min',
        },
      ],
      [
        {
          title: 'Mileage Out',
          value: '232332',
        },
        {
          title: 'Mileage In',
          value: '232332',
        },
        {
          title: 'VP No',
          value: '13232',
        },
        {
          title: 'Fuel Given',
          value: '33 Ltr',
        },
        {
          title: 'Fuel Consume',
          value: '23 Ltr',
        },
      ],
    ]
    const tds = ref(0)
    const add = () => {
      tds.value++
    }
    const deduct = () => {
      tds.value--
    }
    watch(status, (currentValue) => {
      // eslint-disable-next-line no-console
      console.log(currentValue)
      if (currentValue === 'success') {
        message.value = 'You have successfully approved this request'
      } else if (currentValue === 'error') {
        message.value = 'You have regretably declined this request'
      }
    })
    return {
      types,
      reciepients,
      showConfirmation,
      showFinalStep,
      status,
      message,
      details,
      add,
      deduct,
      tds,
    }
  },
})
</script>
