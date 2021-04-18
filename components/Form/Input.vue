<template>
  <div class="w-full py-2">
    <label
      v-if="labelTitle"
      for="password"
      class="block w-full px-1 text-gray-800 text-md mb-1"
      >{{ labelTitle }}</label
    ><input
      :placeholder="inputPlaceholder"
      class="block w-full px-4 py-3 border-2 border-gray-200 rounded focus:outline-none focus:border-purple-300 font-thin placeholder-black hover:placeholder-opacity-25"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    // eslint-disable-next-line vue/require-default-prop
    labelTitle: {
      type: String,
    },
    inputPlaceholder: {
      type: String,
      required: true,
    },
  },
})
</script>
