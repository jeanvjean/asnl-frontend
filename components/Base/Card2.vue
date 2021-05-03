<template>
  <div
    class="lg:col-span-1 w-full bg-weird-purple text-purple-200 text-sm rounded-sm px-6 py-4 h-full flex flex-col justify-between space-y-2"
  >
    <div
      class="flex justify-between items-center border-b-2 pb-2 border-gray-300"
    >
      <div>{{ headerStat.title }}</div>
      <div class="text-white text-2xl">{{ headerStat.value }}</div>
    </div>
    <div class="grid grid-cols-2 gap-x-6 mt-2">
      <div
        v-for="(bottom, index) in bottomStat"
        :key="index"
        class="flex flex-col justify-between"
      >
        <div
          class="flex justify-between items-center border-b-2 border-white pb-2"
        >
          <span class="text-sm">{{ bottom[0].title }}</span>
          <span class="text-2xl">{{ bottom[0].value }}</span>
        </div>
        <div class="flex justify-between mt-2">
          <div v-if="bottom[1]" class="flex-initial">
            <p class="text-sm">{{ bottom[1].title }}</p>
            <p class="text-white text-2xl text-left">
              {{ bottom[1].value }}
            </p>
          </div>
          <div v-if="bottom[2]">
            <p class="text-sm">{{ bottom[2].title }}</p>
            <p class="text-white text-2xl text-right">
              {{ bottom[2].value }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    headerStat: {
      type: Object,
      required: true,
    },
    bottomStat: {
      type: Array,
      required: true,
    },
  },
})
</script>
