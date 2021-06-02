<template>
  <div class="px-6 py-6">
    <div class="grid grid-rows-1 lg:grid-cols-4 py-2">
      <div class="lg:col-span-3 overflow-x-auto bg-white">
        <div class="flex justify-between px-6 py-4">
          <h1 class="flex-1 text-gray-400 font-medium text-lg">
            Cylinder Type
          </h1>
          <div class="flex space-x-6">
            <button
              class="flex items-center bg-purple-600 text-white space-x-4 px-4 py-2 rounded-sm-sm"
              @click="
                status = 'success'
                showConfirmation = true
              "
            >
              <span>Approve</span>
              <svg
                class="w-6 h-6 fill-current text-purple-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <button
              class="flex items-center space-x-4 px-4 py-2 rounded-sm-sm border border-purple-600"
              @click="
                status = 'error'
                showConfirmation = true
              "
            >
              <span>Decline</span
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 fill-current text-white"
                viewBox="0 0 24 24"
                stroke="#7C3AED"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="w-full overflow-x-auto px-8 my-8">
          <div
            class="grid grid-rows-1 lg:grid-cols-4 divide divide-x-2 divide-black mt-8"
          >
            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Cylinder No</h4>
                <p>342343234</p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Gas Type</h4>
                <p>Hydrogen</p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Cylinder Volume</h4>
                <p>231.32kg</p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Current Height</h4>
                <p>42</p>
              </div>
            </div>
          </div>

          <div
            class="grid grid-rows-1 lg:grid-cols-4 divide divide-x-2 divide-black mt-8"
          >
            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Cylinder Type</h4>
                <p>Buffer Cylinder</p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Manufacturing Date</h4>
                <p>12/05/2020</p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Color Code</h4>
                <p>Green</p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Water Capacity</h4>
                <p>2,800 kg</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="px-10 py-6 grid grid-rows-1 lg:grid-cols-2 gap-y-4 lg:gap-x-4 border-b border-t border-gray-300"
        >
          <select-component
            :label-title="'Cylinder Type'"
            :select-array="types"
            :default-option-text="'Select Cylinder Type'"
          />

          <select-component
            :label-title="'Gas Type'"
            :select-array="reciepients"
            :default-option-text="'Select Gas Type'"
          />

          <select-component
            :label-title="'Change Cylinder Type to'"
            :select-array="types"
            :default-option-text="'Select New Cylinder Type'"
          />

          <select-component
            :label-title="'Change Gas Type to'"
            :select-array="reciepients"
            :default-option-text="'Select New Gas Type'"
          />
        </div>
        <div class="px-10 py-4">
          <label for="" class="text-black text-lg px-2 py-2">Comments</label>
          <input
            type="text"
            class="w-full px-4 py-3 border-gray-300 mt-4"
            placeholder="Enter Comment here"
          />
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
      <div class="lg:col-span-1 w-full px-6 py-4 border-b border-gray-300">
        <div v-for="i in 2" :key="i" class="mb-6">
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
import SelectComponent from '@/components/Form/Select.vue'
import Confirmation from '@/components/Overlays/Confirmation.vue'
import FinalStep from '@/components/Overlays/finalStep.vue'
export default defineComponent({
  name: 'Transfer',
  components: { SelectComponent, Confirmation, FinalStep },
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
