<template>
  <button
    class="
      flex
      space-x-4
      items-center
      bg-gray-200
      rounded-sm
      px-3
      py-2.5
      border
      hover:border-gray-500
      focus:border-gray-500
    "
    @click="emitClick"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="w-6 h-6 fill-current text-transparent"
      stroke="black"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
      />
    </svg>
    <span>Filter</span>
  </button>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(_props, ctx) {
    const emitClick = () => {
      ctx.emit('filter')
    }

    return {
      emitClick,
    }
  },
})
</script>
