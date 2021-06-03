<template>
  <div>
    <div v-for="(messages, index) in notificationData" :key="index"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    notificationData: {
      type: Array,
      required: true,
    },
  },
  setup() {},
})
</script>
