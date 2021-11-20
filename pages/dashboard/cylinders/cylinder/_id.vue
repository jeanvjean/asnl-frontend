<template>
  <div class="grid grid-rows-1 lg:grid-cols-3 gap-5 px-4 py-6" id="whole">
    <div class="lg:col-span-1">
      <div class="bg-white px-4 py-4 mb-4">
        <div class="grid grid-cols-2 gap-4 mb-4">
          <button
            type="button"
            class="
              font-medium
              text-black
              pb-2
              pl-2
              text-lg
              tracking-wide
              focus:outline-none
            "
            :class="showDetails ? 'border-b border-btn-purple' : ''"
            @click="
              showDetails = true
              showBarcode = false
            "
          >
            <span class=""> Cylinder Details</span>
          </button>
          <button
            type="button"
            class="
              font-medium
              text-black
              pb-2
              pl-2
              text-lg
              tracking-wide
              focus:outline-none
            "
            :class="showBarcode ? 'border-b border-btn-purple' : ''"
            @click="
              showDetails = false
              showBarcode = true
            "
          >
            Print Barcode
          </button>
        </div>
        <section v-if="showDetails" id="details">
          <div
            v-for="(detail, index) in details"
            :key="index"
            :class="mod(index) ? 'bg-gray-200' : ''"
            class="grid grid-cols-2 px-2 py-3"
          >
            <div class="px-2 py-1 capitalize">{{ formatTitle(index) }}</div>
            <div class="px-2 py-1">{{ detail }}</div>
          </div>
        </section>
        <section v-else-if="showBarcode" class="bg-gray-200" id="barcode">
          <div class="mx-auto py-10 px-6">
            <div
              class="
                px-6
                py-10
                bg-white
                rounded-sm
                flex
                justify-center
                items-center
              "
              id="printJS-barcode"
            >
              <barcode :value="details.barcode" width="1">
                Show this if the rendering fails.
              </barcode>
            </div>
            <div class="px-6 my-4">
              <button
                class="
                  rounded-sm
                  px-6
                  py-3
                  border border-btn-purple
                  text-sm
                  font-light
                  flex
                  justify-between
                  items-center
                  bg-btn-purple
                  text-white
                  w-full
                "
                @click="printJS('printJS-barcode', 'html')"
              >
                <span>Product Barcode</span>
                <svg
                  class="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.417 15.181l-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931L23.93 3.821l.001-.001c.321-1.496-.541-2.081-1.527-1.714l-21.29 8.151c-1.453.564-1.431 1.374-.247 1.741l5.443 1.693L18.953 5.78c.595-.394 1.136-.176.691.218z"
                  />
                </svg>
              </button>
            </div>
            <div class="px-4 my-4 w-full">
              <div
                class="
                  flex
                  space-x-4
                  w-full
                  items-center
                  justify-center
                  text-xl
                  font-semibold
                  text-black
                "
              >
                <h1 class="font-light">Cylinder Number:</h1>
                <span>{{ details.barcode }} </span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <button
        class="
          rounded-sm
          py-2
          px-4
          w-full
          bg-transparent
          text-btn-purple text-center
          border-2 border-btn-purple
        "
        @click="printJS('tracking', 'html')"
      >
        Download Cylinder History
      </button>
    </div>
    <div
      class="lg:col-span-2 bg-white px-4 py-4 overflow-y-scroll h-screen"
      id="tracking"
    >
      <h1
        class="
          font-medium
          border-b border-btn-purple
          tracking-wide
          text-xl
          inline-block
          pb-2
          mb-4
        "
      >
        Tracking
      </h1>
      <div v-if="cylinder && cylinder.tracking && cylinder.tracking.length">
        <div v-for="(track, i) in cylinder.tracking" :key="i" class="px-4 py-4">
          <div class="px-4 py-2 bg-gray-200 font-light text-xl mb-4">
            {{ track.data }}
          </div>
          <ul>
            <li
              v-for="j in 3"
              :key="j"
              class="flex justify-between px-4 py-3 space-x-4"
            >
              <div
                class="
                  w-4
                  h-4
                  bg-btn-purple
                  border-2 border-btn-purple
                  rounded-full
                "
              ></div>
              <div>
                <p class="text-md font-light">
                  {{ track.name }}
                </p>
                <p class="text-sm font-light text-gray-500">{{ track.date }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-else>
        <default-state />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  onMounted,
  ref,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'
import { CylinderController } from '@/module/Cylinder'

import DefaultState from '@/components/DefaultState.vue'
const VueBarcode = require('vue-barcode')
import printJS from 'print-js'

export default defineComponent({
  name: 'SingleCylinder',
  layout: 'dashboard',
  components: { barcode: VueBarcode, DefaultState },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const cylinderId = ref()

    onBeforeMount(() => {
      cylinderId.value = route.value.params.id
      if (!cylinderId) {
        router.push('/dashboard')
      }
    })
    const details = ref({})
    const cylinder = ref([])

    onMounted(() => {
      CylinderController.getCylinder(cylinderId.value).then((response) => {
        cylinder.value = response.data.data
        const cylinderResponse = response.data.data
        console.log(cylinderResponse)
        details.value = {
          Cylinder_Type: cylinderResponse.cylinderType,
          Water_Capacity:
            cylinderResponse.waterCapacity.value +
            cylinderResponse.waterCapacity.unit,
          Date_Manufactured: new Date(
            cylinderResponse.dateManufactured
          ).toDateString(),
          Gas_Type: cylinderResponse.gasType.gasName,
          Standard_Color: cylinderResponse.standardColor,
          Testing_Pressure: cylinderResponse.testingPresure,
          Filling_Preasure: cylinderResponse.fillingPreasure,
          GasVolume_Content:
            cylinderResponse.gasVolumeContent.value +
            cylinderResponse.gasVolumeContent.unit,
          Assigned_To:
            cylinderResponse.assignedTo && cylinderResponse.assignedTo.name
              ? cylinderResponse.assignedTo.name
              : 'Not Assigned to anyone',
          Cylinder_Number: cylinderResponse.assignedNumber
            ? cylinderResponse.assignedNumber
            : cylinderResponse.cylinderNumber
            ? cylinderResponse.cylinderNumber
            : 'Not Specified',
          barcode: cylinderResponse.barcode,
        }
      })
    })

    function formatTitle(value: string) {
      return value.replaceAll('_', ' ')
    }

    const showDetails = ref(true)
    const showBarcode = ref(false)
    const printWindow = () => {
      window.print()
    }

    return {
      details,
      showDetails,
      showBarcode,
      formatTitle,
      cylinder,
      printWindow,
      printJS,
    }
  },
  methods: {
    mod(value: Number) {
      return Number(value) % 2
    },
  },
})
</script>
