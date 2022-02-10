<template>
  <div class="py-3">
    <label
      v-if="labelTitle"
      class="
        block
        w-full
        px-1
        text-gray-700 text-md
        mb-1
        font-semibold
        tracking-tighter
      "
    >
      <span>
        {{ labelTitle }}
      </span>
      <span
        v-if="isRequired"
        class="text-red-600 text-base"
        :class="{ 'text-xl': isInvalid }"
        >*</span
      > </label
    ><textarea
      v-model="inputValue"
      rows="3"
      :placeholder="inputPlaceholder"
      class="
        block
        w-full
        px-4
        py-2
        rounded-sm
        font-semibold
        focus:outline-none focus:border-btn-purple
        placeholder-gray-500
        focus:placeholder-gray-300
        text-gray-900
        border-2
        resize-none
      "
      :class="{
        'border-red-300': isInvalid,
        'border-gray-600 bg-gray-200 ': isDisabled,
        'border-gray-300 text-gray-500 bg-white': !isDisabled,
      }"
      :disabled="isDisabled"
      :required="isRequired"
      @input="returnValue"
      @invalid="isInvalid = true"
      @focus="isInvalid = false"
    ></textarea>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import { debounce } from 'lodash'

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
    defaultValue: {
      type: String,
      required: false,
      default: '',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isRequired: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  setup(_props, ctx) {
    const inputValue = ref('')
    const returnValue = debounce(() => {
      ctx.emit('get', inputValue)
    }, 1000)
    const isInvalid = ref<Boolean>(false)
    onMounted(() => {
      if (_props.defaultValue) {
        inputValue.value = _props.defaultValue
      }
    })
    return {
      returnValue,
      inputValue,
      isInvalid,
    }
  },
})
</script>
