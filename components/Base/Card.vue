<template>
  <div
    class="lg:col-span-1 w-full bg-weird-purple text-purple-200 text-sm rounded-sm-sm px-6 py-4 h-full flex flex-col justify-between space-y-2"
  >
    <div class="flex justify-between border-b-2 border-gray-300 pb-4">
      <div>{{ headerStat.title }}</div>
      <div class="text-white text-2xl">{{ headerStat.value }}</div>
    </div>
    <div class="flex justify-between">
      <div class="space-y-2">
        <p>{{ bottomStat[0].title }}</p>
        <p class="text-white text-2xl text-left">{{ bottomStat[0].value }}</p>
      </div>
      <div class="space-y-2">
        <p>{{ bottomStat[1].title }}</p>
        <p class="text-white text-2xl text-right">{{ bottomStat[1].value }}</p>
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
