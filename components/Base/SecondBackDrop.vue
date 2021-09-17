<template>
  <div
    class="
      fixed
      inset-0
      bg-black bg-opacity-25
      grid grid-rows-1
      lg:grid-cols-5
      z-20
      w-screen
      h-screen
      items-start
    "
  >
    <div class="hidden lg:block col-span-3"></div>
    <div class="col-span-2 w-full h-full">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'BackDrop',
})
</script>
