<template>
  <div class="w-full mt-2">
    <button class="w-full py-3 rounded" :class="buttonClass">
      {{ buttonText }}
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    buttonText: {
      type: String,
      required: true,
    },
    // eslint-disable-next-line vue/require-default-prop
    buttonClass: {
      type: String,
    },
  },
})
</script>
