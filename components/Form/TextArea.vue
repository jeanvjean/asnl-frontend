<template>
  <div class="w-full py-3">
    <label
      v-if="labelTitle"
      class="block w-full px-1 text-gray-800 text-md mb-1"
      >{{ labelTitle }}</label
    ><textarea
      v-model="inputValue"
      rows="5"
      :type="inputType"
      :placeholder="inputPlaceholder"
      class="appearance-none block w-full px-4 py-3 border-2 border-gray-200 rounded-sm-md focus:outline-none focus:border-purple-400 font-thin placeholder-gray-500 focus:placeholder-gray-300"
      @keyup="returnValue"
      @change="returnValue"
    ></textarea>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'

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
    inputType: {
      type: String,
      required: false,
      default: 'text',
    },
    defaultValue: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup(_props, ctx) {
    const inputValue = ref('')
    const returnValue = () => {
      ctx.emit('get', inputValue)
    }
    onMounted(() => {
      if (_props.defaultValue) {
        inputValue.value = _props.defaultValue
      }
    })
    return {
      returnValue,
      inputValue,
    }
  },
})
</script>
