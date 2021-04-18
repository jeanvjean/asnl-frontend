<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-25 grid grid-rows-1 lg:grid-cols-2 z-20 w-screen h-screen items-start"
  >
    <div class="hidden lg:block"></div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'BackDrop',
})
</script>
