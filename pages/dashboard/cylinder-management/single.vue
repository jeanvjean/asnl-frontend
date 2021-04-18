<template>
  <div class="grid grid-rows-1 lg:grid-cols-3 gap-5 px-4 py-6">
    <div class="lg:col-span-1">
      <div class="bg-white px-4 py-4 mb-4">
        <div class="grid grid-cols-2 gap-4 mb-4">
          <h1>
            <span
              class="border-b border-purple-500 tracking-wide font-medium text-black pb-2 pl-2 text-lg"
            >
              Cylinder Details</span
            >
          </h1>
          <h1>
            <span class="font-medium text-black pb-2 pl-2 text-lg"
              >Print Barcode</span
            >
          </h1>
        </div>
        <div
          v-for="(detail, index) in details"
          :key="index"
          :class="mod(index) ? 'bg-gray-200' : ''"
          class="grid grid-cols-2 px-2 py-3"
        >
          <div class="px-2 py-1">{{ detail.title }}</div>
          <div class="px-2 py-1">{{ detail.value }}</div>
        </div>
      </div>
      <button
        class="rounded py-2 px-4 w-full bg-transparent text-purple-500 text-center border-2 border-purple-500"
      >
        Download Cylinder History
      </button>
    </div>
    <div class="lg:col-span-2 bg-white px-4 py-4 overflow-y-scroll h-screen">
      <h1
        class="font-medium border-b border-purple-500 tracking-wide text-xl inline-block pb-2 mb-4"
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
              class="w-4 h-4 bg-purple-300 border-2 border-purple-600 rounded-full"
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
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SingleCylinder',
  layout: 'dashboard',
  setup() {
    const details = [
      { title: 'Cylinder Type', value: 'Buffer' },
      { title: 'Cylinder Number', value: '90A-2019' },
      { title: 'Water Capacity', value: '128kg' },
      { title: 'Gas Volume Content', value: '385kg' },
      { title: 'Date of Manufacture', value: 'March 21, 2018' },
      { title: 'Filing Pressure', value: '392bar' },
      { title: 'Cylinder Assigned No', value: 'UCH' },
      { title: 'Testing Pressure', value: '190bar' },
      { title: 'AS Assigned Number', value: 'ASNL BF-103' },
      { title: 'Gas Type', value: 'Oxygen' },
      { title: 'Cylinder Color Code', value: 'Green' },
    ]

    return {
      details,
    }
  },
  methods: {
    mod(value: Number) {
      return Number(value) % 2
    },
  },
})
</script>
