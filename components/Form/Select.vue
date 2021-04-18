<template>
  <div class="w-full py-3">
    <label
      v-if="labelTitle"
      for="password"
      class="block w-full px-1 text-gray-800 text-md mb-1"
      >{{ labelTitle }}</label
    ><select
      class="block w-full px-4 py-3 border-2 border-gray-200 text-black rounded-md focus:outline-none focus:border-purple-300 font-thin bg-white"
    >
      <option v-if="defaultOptionText">{{ defaultOptionText }}</option>
      <option
        v-for="(value, index) in selectArray"
        :key="index"
        :value="value"
        class="text-black"
      >
        {{ value }}
      </option>
    </select>
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
    selectArray: {
      type: Array,
      required: true,
    },
    // eslint-disable-next-line vue/require-default-prop
    defaultOptionText: {
      type: String,
      required: false,
    },
  },
})
</script>
