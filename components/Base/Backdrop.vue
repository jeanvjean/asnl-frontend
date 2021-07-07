<template>
  <div
    :class="centralize ? 'items-center' : ' items-start'"
    class="
      fixed
      inset-0
      bg-black bg-opacity-25
      flex
      justify-center
      z-50
      w-screen
      h-screen
      overflow-y-auto
    "
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
  setup(_props, ctx) {
    const close = () => {
      ctx.emit('close')
    }

    return {
      close,
    }
  },
})
</script>
