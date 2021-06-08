<template>
  <div class="px-6 py-6">
    <div class="w-full mb-4">
      <h1 class="text-xl text-black font-medium">
        Pre-inspection Maintenance Details
      </h1>
    </div>
    <div class="grid grid-rows-1 lg:grid-cols-3 py-2">
      <div class="lg:col-span-2 overflow-x-auto bg-white">
        <div class="block md:flex justify-between px-6 py-4">
          <h1 class="flex-1 mb-0 md:mb-2 text-gray-400 font-medium text-lg">
            New Pre-Inspection Maintenance Request
          </h1>
          <div class="flex space-x-6">
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
              <span>Approve</span>
              <svg
                class="w-6 h-6 fill-current text-btn-purple"
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
              class="
                flex
                items-center
                space-x-4
                px-4
                py-2
                rounded-sm
                border border-btn-purple
              "
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

        <div
          class="
            px-10
            grid grid-rows-1
            lg:grid-cols-2
            gap-y-4
            lg:gap-x-4 lg:gap-y-1
            border-b border-gray-300
          "
        >
          <select-component
            :label-title="'Select Driver'"
            :default-option-text="'Select Driver'"
            :select-array="[]"
          />

          <input-component
            :label-title="'Date & Time'"
            :input-type="'date'"
            :input-placeholder="'Enter Date & Time'"
          />
          <input-component
            :label-title="'Vehicle No'"
            :input-placeholder="'Enter Vehicle No'"
          />
          <input-component
            :label-title="'Vehicle License'"
            :input-placeholder="'Enter Date & Time'"
          />
          <input-component
            :label-title="'Vehicle Insurance Date'"
            :input-type="'date'"
            :input-placeholder="'Enter Date & Time'"
          />
          <input-component
            :label-title="'Mileage'"
            :input-placeholder="'Mileage'"
          />
        </div>
        <div
          class="
            px-10
            flex flex-col
            space-y-4
            lg:space-y-0 lg:space-x-4
            justify-between
            lg:flex-row
            py-6
          "
        >
          <div class="grid grid-rows-1 gap-2 w-full">
            <div class="border border-black rounded-sm-md px-4 py-2">
              <h3>Tyre</h3>
              <div class="grid grid-rows lg:grid-cols-2">
                <check-box :label-title="'Inflation Pressure'" />
                <check-box :label-title="'Cracks and Nuts'" />
              </div>
            </div>
            <div class="border border-black rounded-sm-md px-4 py-2">
              <h3>Light</h3>
              <div class="grid grid-rows lg:grid-cols-3">
                <check-box :label-title="'Interior'" />
                <check-box :label-title="'Turn'" />
                <check-box :label-title="'Reverse'" />
                <check-box :label-title="'Emergency'" />
              </div>
            </div>
            <div class="border border-black rounded-sm-md px-4 py-2">
              <h3>Accessories</h3>
              <div class="grid grid-rows lg:grid-cols-2">
                <check-box :label-title="'Tape/Radio'" />
                <check-box :label-title="'Seat Belt'" />
              </div>
            </div>
            <div class="border border-black rounded-sm-md px-4 py-2">
              <h3>Tools</h3>
              <div class="grid grid-rows lg:grid-cols-2">
                <check-box :label-title="'Jack & Wheel Spanner'" />
                <check-box :label-title="'C-Caution'" />
              </div>
            </div>
          </div>

          <div class="grid grid-rows-1 w-full gap-y-2 gap-x-0 lg:gap-x-2">
            <div class="border h-auto border-black rounded-sm-md px-4 py-2">
              <h3>Engine</h3>
              <div class="grid grid-cols-2">
                <check-box :label-title="'Oil Level'" />
                <check-box :label-title="'Content Level'" />
                <check-box :label-title="'Brake Fluid Level'" />
                <check-box :label-title="'Steering Fluid Level'" />
                <check-box :label-title="'Clutch Fluid Level'" />
                <check-box :label-title="'Battery Water Level'" />
              </div>
            </div>
            <div class="border h-auto border-black rounded-sm-md px-4 py-2">
              <h3>Control</h3>
              <div class="grid grid-cols-2">
                <check-box :label-title="'Horn'" />
                <check-box :label-title="'Engine Start'" />
                <check-box :label-title="'Central Lock'" />
                <check-box :label-title="'Power window'" />
                <check-box :label-title="'Heater A/C'" />
                <check-box :label-title="'Brake Operation'" />
                <check-box :label-title="'Wiper/Washer'" />
                <check-box :label-title="'Steering Operation'" />
              </div>
            </div>
          </div>
        </div>
        <div class="px-10 py-4">
          <label for="" class="text-black text-lg px-2 py-2">Comments</label>
          <input
            type="text"
            class="w-full px-4 py-3 border-gray-300 mt-4"
            placeholder="Enter Comment here"
          />
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
import InputComponent from '@/components/Form/Input.vue'
import CheckBox from '@/components/Form/CheckBox.vue'
import Confirmation from '@/components/Overlays/Confirmation.vue'
import FinalStep from '@/components/Overlays/finalStep.vue'
export default defineComponent({
  name: 'Transfer',
  components: {
    SelectComponent,
    Confirmation,
    FinalStep,
    InputComponent,
    CheckBox,
  },
  layout: 'dashboard',
  setup() {
    const types = ['Temporary Transfer']
    const reciepients = ['Isaac Babalola']
    const showConfirmation = ref(false)
    const showFinalStep = ref(false)
    const status = ref('')
    const message = ref('')
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
    }
  },
})
</script>
