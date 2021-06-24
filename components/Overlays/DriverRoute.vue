<template>
  <back-drop>
    <div class="w-full h-full bg-gray-200">
      <div class="flex justify-between px-10 py-6 bg-white">
        <h1 class="tracking-wide font-semibold text-black">CHINEDU ONUNERE</h1>
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
      <div class="px-10 py-2 flex justify-between items-center my-2">
        <h1 class="py-2 px-2 border-b border-btn-purple inline-block">
          Route Plan
        </h1>
        <button
          class="
            bg-transparent
            border border-btn-purple
            text-btn-purple
            rounded-sm
            px-6
            py-2
          "
        >
          Edit
        </button>
      </div>

      <div class="flex justify-between items-center px-10 mt-4">
        <div class="flex space-x-4">
          <img
            class="h-10 w-10 rounded-full"
            src="@/assets/images/default-avatar.jpg"
            alt=""
          />
          <div>
            <div>
              <p class="text-left text-black font-medium text-md">
                Chinedu Omunyere
              </p>
              <p class="text-left text-gray-600 font-light text-sm">Driver</p>
            </div>
          </div>
        </div>
        <div>
          <p class="text-gray-400 text-sm font-medium">
            Aug 23, 2019 @ 05:45pm
          </p>
          <button class="text-btn-purple text-sm font-medium">
            Change Driver
          </button>
        </div>
      </div>
      <div class="w-11/12 px-4 mx-auto my-6">
        <div
          class="
            flex
            bg-white
            text-black
            font-medium
            items-center
            justify-evenly
          "
        >
          <div class="px-4 py-4">
            <h4>Fuel</h4>
            <span class="text-gray-500 font-light text-md">30 Liters</span>
          </div>

          <div class="px-4 py-4">
            <h4>RPP No</h4>
            <span class="text-gray-500 font-light text-md">343421</span>
          </div>

          <div class="px-4 py-4">
            <h4>Territory</h4>
            <span class="text-gray-500 font-light text-md">Abuja</span>
          </div>
          <div class="px-4 py-4">
            <h4>Quantity Projected</h4>
            <span class="text-gray-500 font-light text-md">30 Liters</span>
          </div>
        </div>
      </div>
      <div class="flex justify-between items-center px-10 mt-16">
        <div class="flex space-x-4 items-start">
          <svg
            class="w-6 h-6 fill-current text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M1 4c0-1.1.9-2 2-2h14a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
            />
          </svg>
          <div>
            <div>
              <p class="text-left text-black font-medium text-md">Departure</p>
              <p class="text-left text-gray-600 font-light text-sm">
                Air Separation, Ikeja Lagos.
              </p>
            </div>
          </div>
        </div>
        <div>
          <p class="text-gray-400 text-sm font-medium">
            Aug 24, 2019 @ 05:45pm
          </p>
        </div>
      </div>
      <div class="flex justify-between items-center px-10 mt-12">
        <div class="flex space-x-4 items-start">
          <svg
            class="w-6 h-6 fill-current text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M1 4c0-1.1.9-2 2-2h14a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
            />
          </svg>
          <div>
            <div>
              <p class="text-left text-black font-medium text-md">
                Destination
              </p>
              <p class="text-left text-gray-600 font-light text-sm">
                Saint Nicholas Hospital.
              </p>
            </div>
          </div>
        </div>
        <div>
          <p class="text-gray-400 text-sm font-medium">
            Aug 24, 2019 @ 05:45pm
          </p>
        </div>
      </div>
      <div class="flex justify-between items-center px-10 mt-12">
        <div class="flex space-x-4 items-start">
          <svg
            class="w-6 h-6 fill-current text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M1 4c0-1.1.9-2 2-2h14a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
            />
          </svg>
          <div>
            <div>
              <p class="text-left text-black font-medium text-md">
                Destination
              </p>
              <p class="text-left text-gray-600 font-light text-sm">
                Lagos University Teaching Hospital (LUTH).
              </p>
            </div>
          </div>
        </div>
        <div>
          <p class="text-gray-400 text-sm font-medium">
            Aug 24, 2019 @ 05:45pm
          </p>
        </div>
      </div>
      <div class="flex justify-between items-center px-10 mt-12">
        <div class="flex space-x-4 items-start">
          <svg
            class="w-6 h-6 fill-current text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M1 4c0-1.1.9-2 2-2h14a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
            />
          </svg>
          <div>
            <div>
              <p class="text-left text-black font-medium text-md">Arrival</p>
              <p class="text-left text-gray-600 font-light text-sm">
                Air Separation Ikeja, Lagos.
              </p>
            </div>
          </div>
        </div>
        <div>
          <p class="text-gray-400 text-sm font-medium">
            Aug 24, 2019 @ 05:45pm
          </p>
        </div>
      </div>
    </div>
  </back-drop>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BackDrop from '@/components/Base/SecondBackDrop.vue'
export default defineComponent({
  components: {
    BackDrop,
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
