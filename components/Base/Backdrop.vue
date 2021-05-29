<template>
  <div
    :class="centralize ? 'items-center' : ' items-start'"
    class="fixed inset-0 bg-black bg-opacity-25 flex justify-center z-20 w-screen h-screen overflow-y-auto"
  >
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    centralize: {
      required: false,
      default: true,
      type: Boolean,
    },
  },
})
</script>
