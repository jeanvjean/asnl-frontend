<template>
  <back-drop>
    <div class="w-full h-full bg-gray-200">
      <div class="flex justify-between items-center px-10 py-6 bg-white">
        <h1 class="tracking-wide font-semibold text-black">
          {{ vehicle.manufacturer }} {{ vehicle.vModel }}
        </h1>
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
        class="
          px-12
          flex
          justify-between
          items-center
          my-2
          border-b border-gray-300
        "
      >
        <button
          type="button"
          class="py-2 px-2 focus:outline-none"
          :class="routePlan ? 'border-b border-btn-purple' : ''"
          @click="changeStatus(true, false, false, false)"
        >
          Route Plan
        </button>
        <button
          type="button"
          class="py-2 px-2 focus:outline-none"
          :class="correctiveMaintenance ? 'border-b border-btn-purple' : ''"
          @click="changeStatus(false, true, false, false)"
        >
          Corrective Maintenance
        </button>
        <button
          type="button"
          class="py-2 px-2 focus:outline-none"
          :class="inspectionMaintenance ? 'border-b border-btn-purple' : ''"
          @click="changeStatus(false, false, true, false)"
        >
          Pre-inspection Maintenance
        </button>
        <button
          type="button"
          class="py-2 px-2 focus:outline-none"
          :class="vehiclePerformance ? 'border-b border-btn-purple' : ''"
          @click="changeStatus(false, false, false, true)"
        >
          Vehicle Performance
        </button>
      </div>
      <section v-if="routePlan">
        <div v-if="vehicle.routes.length">
          <div
            v-for="(route, index) in vehicle.routes"
            :key="index"
            class="mb-8 border-b border-gray-400"
          >
            <div class="flex justify-between items-center px-12 my-4">
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
                    <p class="text-left text-gray-600 font-light text-sm">
                      Driver
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
                    bg-btn-purple
                    rounded-full
                    w-6
                    h-6
                    mt-1
                  "
                ></div>
                <div class="space-y-4">
                  <h3 class="text-gray-500 font-light text-sm">Start Date</h3>
                  <span>Aug 20, 2019</span>
                </div>
                <div class="space-y-4">
                  <h3 class="text-gray-500 font-light text-sm">End Date</h3>
                  <span>In Progress</span>
                </div>
              </div>
              <button
                class="
                  px-4
                  py-2
                  rounded-sm
                  text-btn-purple
                  bg-transparent
                  border border-btn-purple
                "
              >
                Route Plan
              </button>
            </div>
          </div>
        </div>
        <div
          v-else
          class="flex items-center justify-center my-4 text-black font-bold"
        >
          <div class="animate-pulse">No Routes at this time</div>
        </div>
      </section>
      <section v-else-if="correctiveMaintenance">
        <div v-if="vehicle.routes.length">
          <div
            v-for="(route, index) in vehicle.maintenance"
            :key="index"
            class="mb-8 border-b border-gray-400"
          >
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
                      #700.00
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
                    bg-btn-purple
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
              <button
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
              </button>
            </div>
          </div>
        </div>
        <div
          v-else
          class="flex items-center justify-center my-4 text-black font-bold"
        >
          <div class="animate-pulse">No Information at this time</div>
        </div>
      </section>
      <section v-else-if="inspectionMaintenance">
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
            <button
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
            </button>
          </div>
        </div>
      </section>
      <section v-else-if="vehiclePerformance">
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
  props: {
    vehicle: {
      type: Object,
      required: true,
    },
  },
  setup(_props, ctx) {
    const routePlan = ref<Boolean>(true)
    const correctiveMaintenance = ref<Boolean>(false)
    const inspectionMaintenance = ref<Boolean>(false)
    const vehiclePerformance = ref<Boolean>(false)

    const close = () => {
      ctx.emit('close')
    }

    function changeStatus(
      routePlanStatus: Boolean,
      correctiveMaintenanceStatus: Boolean,
      inspectionMaintenanceStatus: Boolean,
      vehiclePerformanceStatus: Boolean
    ) {
      routePlan.value = routePlanStatus
      correctiveMaintenance.value = correctiveMaintenanceStatus
      inspectionMaintenance.value = inspectionMaintenanceStatus
      vehiclePerformance.value = vehiclePerformanceStatus
    }

    return {
      close,
      routePlan,
      correctiveMaintenance,
      inspectionMaintenance,
      vehiclePerformance,
      changeStatus,
    }
  },
})
</script>
