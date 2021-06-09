<template>
  <div class="w-auto py-3 flex space-x-1">
    <input
      type="checkbox"
      class="
        appearance-none
        px-2
        py-2
        border-2 border-gray-200
        rounded-sm
        focus:outline-none
        focus:border-btn-purple
        font-thin
        placeholder-gray-500
        focus:placeholder-gray-300
      "
      @click="returnValue"
    />
    <label v-if="labelTitle" class="px-1 text-gray-800 text-sm mb-1">{{
      labelTitle
    }}</label>
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
  },
  setup(_props, ctx) {
    const returnValue = () => {
      ctx.emit('get')
    }
    return {
      returnValue,
    }
  },
})
</script>
