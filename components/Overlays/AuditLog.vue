<template>
  <back-drop>
    <div class="w-full h-full bg-gray-200 relative">
      <div class="flex justify-between items-center px-10 py-4 bg-white">
        <h1 class="tracking-wide font-semibold text-black">ASOR0986</h1>
        <div class="flex items-center space-x-6">
          <button
            class="
              bg-transparent
              text-btn-purple
              border border-btn-purple
              px-6
              py-2
              rounded-sm
            "
          >
            Download
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
      <div
        class="px-12 flex space-x-4 items-center my-2 border-b border-gray-300"
      >
        <button
          type="button"
          class="py-2 px-2 focus:outline-none"
          :class="issuedOut ? 'border-b border-btn-purple' : ''"
          @click="changeStatus(true, false)"
        >
          Issued Out
        </button>
        <button
          type="button"
          class="py-2 px-2 focus:outline-none"
          :class="recievedIn ? 'border-b border-btn-purple' : ''"
          @click="changeStatus(false, true)"
        >
          Recieved
        </button>
      </div>

      <section v-if="issuedOut">
        <div v-for="i in 3" :key="i" class="mb-8 border-b border-gray-400">
          <div class="flex justify-between items-center px-12 my-4">
            <div class="flex space-x-4">
              <div
                class="
                  bg-btn-purple
                  rounded-full
                  w-8
                  h-8
                  flex
                  justify-center
                  items-center
                "
              >
                <svg
                  class="w-4 h-4 text-center fill-current text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M2 14v-3H1a1 1 0 01-1-1 1 1 0 011-1h1l4-7h8l4 7h1a1 1 0 011 1 1 1 0 01-1 1h-1v6a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1H5v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-3zm13.86-5L13 4H7L4.14 9h11.72zM5.5 14a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm9 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                  />
                </svg>
              </div>
              <div>
                <div>
                  <p class="text-left text-btn-purple font-medium text-md">
                    Spare Part name
                  </p>
                  <p class="text-left text-gray-600 font-light text-sm">
                    Name of supplier
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p class="text-gray-400 text-sm font-semibold">
                Aug 23, 2019 @ 05:45pm
              </p>
            </div>
          </div>
          <div class="flex justify-between items-center px-12 py-4">
            <div
              class="
                flex
                space-x-8
                items-start
                text-gray-600
                font-medium
                text-lg
              "
            >
              <div
                class="
                  border border-btn-purple
                  bg-btn-purple bg-opacity-25
                  rounded-full
                  w-6
                  h-6
                  mt-1
                "
              ></div>
              <div class="space-y-4">
                <h3 class="text-gray-500 font-light text-sm">
                  Quantity Recieved
                </h3>
                <span>200</span>
              </div>
              <div class="space-y-4">
                <h3 class="text-gray-500 font-light text-sm">
                  Quantity Passed
                </h3>
                <span>190</span>
              </div>
              <div class="space-y-4">
                <h3 class="text-gray-500 font-light text-sm">
                  Quantity Rejected
                </h3>
                <span>190</span>
              </div>
              <div class="space-y-4">
                <h3 class="text-gray-500 font-light text-sm">Unit Cost</h3>
                <span>190</span>
              </div>
              <div class="space-y-4">
                <h3 class="text-gray-500 font-light text-sm">Total Cost</h3>
                <span>190</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section v-else-if="recievedIn">
        <div v-for="i in 3" :key="i" class="mb-8 border-b border-gray-400">
          <div class="flex justify-between items-center px-12 my-4">
            <div class="flex space-x-4">
              <div
                class="
                  bg-btn-purple
                  rounded-full
                  w-8
                  h-8
                  flex
                  justify-center
                  items-center
                "
              >
                <svg
                  class="w-4 h-4 text-center fill-current text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M2 14v-3H1a1 1 0 01-1-1 1 1 0 011-1h1l4-7h8l4 7h1a1 1 0 011 1 1 1 0 01-1 1h-1v6a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1H5v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-3zm13.86-5L13 4H7L4.14 9h11.72zM5.5 14a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm9 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                  />
                </svg>
              </div>
              <div>
                <div>
                  <p class="text-left text-btn-purple font-medium text-md">
                    #2000.00
                  </p>
                  <p class="text-left text-gray-600 font-light text-sm">
                    1 item
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p class="text-gray-400 text-sm font-medium">
                Aug 23, 2019 @ 05:45pm
              </p>
            </div>
          </div>
          <div class="flex justify-between items-center px-12 py-4">
            <div
              class="
                flex
                space-x-8
                items-start
                text-gray-600
                font-medium
                text-lg
              "
            >
              <div
                class="
                  border border-btn-purple
                  bg-btn-purple bg-opacity-25
                  rounded-full
                  w-6
                  h-6
                  mt-1
                "
              ></div>
              <div class="space-y-4">
                <h3 class="text-gray-500 font-light text-sm">
                  Previous Mileage
                </h3>
                <span>1200 miles</span>
              </div>
              <div class="space-y-4">
                <h3 class="text-gray-500 font-light text-sm">
                  Current Mileage
                </h3>
                <span>1200 miles</span>
              </div>
            </div>
            <router-link
              to="/dashboard/vehicles/vehicle-performance"
              class="
                px-4
                py-2
                rounded-sm
                text-btn-purple
                bg-transparent
                border border-btn-purple
              "
            >
              See Details
            </router-link>
          </div>
        </div>
      </section>
      <div class="absolute bottom-2 left-0 w-full">
        <div class="flex justify-between items-center px-12">
          <button
            class="
              text-btn-purple
              border-btn-purple
              font-medium
              rounded-sm
              border
              px-4
              py-2
            "
          >
            Edit Product
          </button>
          <button
            class="
              text-btn-purple
              border-btn-purple
              font-medium
              rounded-sm
              border
              px-4
              py-2
            "
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  </back-drop>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import BackDrop from '@/components/Base/SecondBackDrop.vue'
export default defineComponent({
  components: {
    BackDrop,
  },
  setup(_props, ctx) {
    const issuedOut = ref<Boolean>(true)
    const recievedIn = ref<Boolean>(false)

    const close = () => {
      ctx.emit('close')
    }

    function changeStatus(issuedOutStatus: Boolean, recievedInStatus: Boolean) {
      issuedOut.value = issuedOutStatus
      recievedIn.value = recievedInStatus
    }

    return {
      close,
      issuedOut,
      recievedIn,
      changeStatus,
    }
  },
})
</script>
