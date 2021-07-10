<template>
  <back-drop>
    <div class="w-1/2 float-right h-full bg-white relative pt-6 px-6">
      <div class="flex justify-between items-center mb-4 text-gray-400">
        <h1 class="text-lg font-semibold">Filters</h1>
        <svg
          class="w-5 h-5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          @click="close"
        >
          <path
            d="M2.93 17.07A10 10 0 1117.07 2.93 10 10 0 012.93 17.07zM11.4 10l2.83-2.83-1.41-1.41L10 8.59 7.17 5.76 5.76 7.17 8.59 10l-2.83 2.83 1.41 1.41L10 11.41l2.83 2.83 1.41-1.41L11.41 10z"
          />
        </svg>
      </div>
      <div class="my-6">
        <div
          class="
            flex
            justify-between
            items-center
            text-sm
            border-0 border-b-4 border-gray-200
            text-gray-500
            font-bold
            mb-2
            pb-1
          "
        >
          <h3>STATUS</h3>
          <svg
            class="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <div class="space-y-2.5 pt-1">
          <span
            v-for="(stat, index) in status"
            :key="index"
            class="flex items-center space-x-4 text-gray-600"
          >
            <input type="checkbox" />
            <h3>{{ stat }}</h3>
          </span>
        </div>
      </div>

      <div class="my-6">
        <div
          class="
            flex
            justify-between
            items-center
            text-sm
            border-0 border-b-4 border-gray-200
            text-gray-500
            font-bold
            mb-2
            pb-1
          "
        >
          <h3>TYPE OF CYLINDER</h3>
          <svg
            class="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <div class="space-y-2.5 pt-1">
          <span
            v-for="(type, index) in types"
            :key="index"
            class="flex items-center space-x-4 text-gray-600"
          >
            <input type="checkbox" />
            <h3>{{ type }}</h3>
          </span>
        </div>
      </div>

      <div class="my-6">
        <div
          class="
            flex
            justify-between
            items-center
            text-sm
            border-0 border-b-4 border-gray-200
            text-gray-500
            font-bold
            mb-2
            pb-1
          "
        >
          <h3>DATE</h3>
          <svg
            class="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <div class="pt-2 my-1">
          <input
            type="date"
            class="w-full border-2 border-gray-300 text-gray-400"
          />
        </div>
      </div>
    </div>
  </back-drop>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BackDrop from '@/components/Base/SecondBackDrop.vue'

export default defineComponent({
  components: { BackDrop },
  setup(_props, ctx) {
    const status = [
      'Cylinder with Air Separation',
      'Cylinder with Customer',
      'Empty Cylinder',
      'Filled Cylinder',
      'Marked for Maintenance',
      'Cylinder with Suppliers',
      'Cylinder with Internal Suppliers',
      'Cylinder with External Suppliers',
    ]

    const types = ['Assigned', 'Buffer']

    const close = () => {
      ctx.emit('close')
    }

    return {
      status,
      types,
      close,
    }
  },
})
</script>
