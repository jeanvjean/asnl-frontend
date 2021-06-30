<template>
  <div class="grid grid-rows-1 lg:grid-cols-3 gap-5 px-4 py-6">
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
        <section v-if="showDetails">
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
        <section v-else-if="showBarcode" class="bg-gray-200">
          <div class="w-4/5 mx-auto py-10 px-6">
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
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                class="w-32 h-32 text-center"
                fill="black"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zm-2 7a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zm8-12a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z"
                  clip-rule="evenodd"
                />
                <path
                  d="M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zm-1 3a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zm6 2a1 1 0 100 2 1 1 0 000-2zm-7 4a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zm-2-2a1 1 0 100-2H4a1 1 0 100 2h3zm10 2a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zm-1 4a1 1 0 100-2h-3a1 1 0 100 2h3z"
                />
              </svg>
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
                <h1 class="font-light">Gas Cylinder:</h1>
                <span>ASNL BF-103 </span>
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
      >
        Download Cylinder History
      </button>
    </div>
    <div class="lg:col-span-2 bg-white px-4 py-4 overflow-y-scroll h-screen">
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
      <div v-for="i in 3" :key="i" class="px-4 py-4">
        <div class="px-4 py-2 bg-gray-200 font-light text-xl mb-4">
          March, 2019
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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil
                aperiam consequatur aliquam quia maxime officiis veritatis fuga
                a ab velit at
              </p>
              <p class="text-sm font-light text-gray-500">March 21, 2019</p>
            </div>
          </li>
        </ul>
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
export default defineComponent({
  name: 'SingleCylinder',
  layout: 'dashboard',
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

    onMounted(() => {
      CylinderController.getCylinder(cylinderId.value).then((response) => {
        const cylinderResponse = response.data.data
        details.value = {
          Cylinder_Type: cylinderResponse.cylinderType,
          Water_Capacity: cylinderResponse.waterCapacity,
          Date_Manufactured: new Date(
            cylinderResponse.dateManufactured
          ).toDateString(),
          Gas_Type: cylinderResponse.gasType.gasName,
          Standard_Color: cylinderResponse.standardColor,
          Testing_Pressure: cylinderResponse.testingPresure,
          Filling_Preasure: cylinderResponse.fillingPreasure,
          GasVolume_Content: cylinderResponse.gasVolumeContent,
          Assigned_To:
            cylinderResponse.assignedTo && cylinderResponse.assignedTo.name
              ? cylinderResponse.assignedTo.name
              : 'Not Assigned to anyone',
          Cylinder_Number: cylinderResponse.assignedNumber
            ? cylinderResponse.assignedNumber
            : cylinderResponse.cylinderNumber
            ? cylinderResponse.cylinderNumber
            : 'Not Specified',
        }
      })
    })

    function formatTitle(value: string) {
      return value.replaceAll('_', ' ')
    }

    const showDetails = ref(true)
    const showBarcode = ref(false)

    return {
      details,
      showDetails,
      showBarcode,
      formatTitle,
    }
  },
  methods: {
    mod(value: Number) {
      return Number(value) % 2
    },
  },
})
</script>
