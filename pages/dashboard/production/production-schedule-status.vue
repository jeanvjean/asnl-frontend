<template>
  <div>
    <div class="py-4 px-2">
      <div class="flex justify-between items-start px-8 mt-4">
        <h2 class="text-lg font-medium">Customer Details</h2>
        <div class="font-medium text-lg text-black">
          <p>Date</p>
          <p>12/02/2020</p>
        </div>
      </div>
      <div class="flex items-center space-x-4 px-8">
        <div class="flex-initial">
          <svg
            class="
              text-btn-purple
              mr-3
              h-10
              w-10
              fill-current
              bg-gray-400 bg-opacity-25
              rounded-full
              p-2
            "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 452.608 452.608"
          >
            <path
              d="M285.184 92.672V63.488h6.656c17.408 0 31.744-14.336 31.744-31.744S309.248 0 291.84 0H160.768c-17.408 0-31.744 14.336-31.744 31.744s14.336 31.744 31.744 31.744h6.656v29.184c-38.912 2.56-69.12 34.816-69.12 73.728v80.384h256V166.4c0-38.912-30.208-71.168-69.12-73.728zm-25.6-.512h-20.48V80.896h-25.6V92.16h-20.48V62.976h66.56V92.16zM98.304 272.384v81.92c0 28.16 15.872 53.76 40.96 66.56v31.744h174.08v-31.744c25.088-12.8 40.96-38.4 40.96-66.56v-81.92h-256z"
            />
          </svg>
        </div>
        <div class="flex-1">
          <h3 class="font-semibold text-lg">Lagos State Teaching Hospital</h3>
          <span class="font-medium text-sm"
            >2, Herbert Macauly Way, Yaba, Lagos</span
          >
        </div>
      </div>
      <div class="w-3/4 grid grid-rows-1 lg:grid-cols-3 my-10 px-8">
        <div class="space-y-4">
          <p class="uppercase text-base tracking-tight">Production No</p>
          <p class="text-base">PRO 113</p>
        </div>
        <div class="space-y-4">
          <p class="uppercase text-base tracking-tight">ECR No</p>
          <p class="text-base">003</p>
        </div>
        <div class="space-y-4">
          <p class="uppercase text-base tracking-tight">Shift</p>
          <p class="text-base">Morning</p>
        </div>
      </div>
      <div class="w-full mt-10">
        <table
          style="border-spacing: 0 15px"
          class="w-full table-auto table border-separate"
        >
          <thead class="bg-gray-200 tracking-tight">
            <tr>
              <th
                class="
                  text-left
                  uppercase
                  font-extralight
                  text-sm
                  px-4
                  py-3
                  text-black
                "
              >
                Cylinder No
              </th>
              <th
                class="
                  text-center
                  uppercase
                  font-extralight
                  text-sm
                  px-4
                  py-3
                  text-black
                "
              >
                Volume
              </th>
              <th
                class="
                  text-center
                  uppercase
                  font-extralight
                  text-sm
                  px-4
                  py-3
                  text-black
                "
              >
                Type
              </th>
              <th
                class="
                  text-center
                  uppercase
                  font-extralight
                  text-sm
                  px-4
                  py-3
                  text-black
                "
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr v-for="(row, index) in tableRows" :key="index">
              <td
                class="
                  text-left
                  capitalize
                  font-light
                  text-md
                  px-6
                  py-6
                  border-white border
                "
              >
                {{ row.cylinderNo }}
              </td>
              <td
                class="
                  text-center
                  capitalize
                  font-light
                  text-md
                  px-6
                  py-6
                  border-white border
                "
              >
                {{ row.volume }}
              </td>
              <td
                class="
                  text-center
                  capitalize
                  font-light
                  text-md
                  px-6
                  py-6
                  border-white border
                "
              >
                {{ row.type }}
              </td>
              <td
                class="
                  text-center
                  capitalize
                  font-light
                  text-md
                  px-6
                  py-6
                  border-white border
                "
              >
                {{ row.status }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex items-center justify-center my-16">
        <div>
          <div
            v-for="(info, index) in otherInformation"
            :key="index"
            class="px-4 py-4 grid grid-cols-2 gap-10"
          >
            <div
              class="
                uppercase
                text-gray-900
                font-extralight
                text-lg
                tracking-tight
              "
            >
              {{ info.title }}
            </div>
            <div class="text-lg tracking-tight">{{ info.value }}</div>
          </div>
        </div>
      </div>
      <div>
        <div class="flex justify-evenly items-start py-2 px-2">
          <div v-for="i in 3" :key="i">
            <p class="text-gray-500 text-base font-medium">Initiated at</p>
            <p class="text-gray-500 text-base font-medium">
              <span>24/02/2020</span> <span>11:02</span>
            </p>
            <div class="flex items-start space-x-4 py-2">
              <img
                class="h-10 w-10 rounded-full"
                src="@/assets/images/default-avatar.jpg"
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
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'noSidebar',
  setup() {
    const otherInformation = [
      {
        title: 'Quantity to be Refilled',
        value: 3,
      },
      {
        title: 'Volume to be Refilled',
        value: '8m',
      },
      {
        title: 'Total Quantity',
        value: 3,
      },
      {
        title: 'Total Volume',
        value: '8m',
      },
    ]
    const tableRows = [
      {
        cylinderNo: 'AX334242',
        volume: '6Kg',
        type: 'Oxygen',
        status: 'pending',
      },
      {
        cylinderNo: 'AX334242',
        volume: '6Kg',
        type: 'Oxygen',
        status: 'Failed',
      },
    ]

    const showProduction = ref<Boolean>(false)
    const showSupplier = ref<Boolean>(false)

    return {
      tableRows,
      showProduction,
      showSupplier,
      otherInformation,
    }
  },
})
</script>
