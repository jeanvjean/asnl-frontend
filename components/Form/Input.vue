<template>
  <div class="w-full py-2">
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
    ><input
      v-model="inputValue"
      :type="inputType"
      :placeholder="inputPlaceholder"
      :disabled="isDisabled"
      :required="isRequired"
      class="
        block
        w-full
        px-4
        py-2
        rounded-sm
        focus:outline-none focus:border-btn-purple
        font-extralight
        placeholder-gray-500
        focus:placeholder-gray-300
        text-gray-500
      "
      min="0"
      step="1"
      :class="{
        'border-red-300': isInvalid,
        'border-0 border-b-2 border-gray-500': isDisabled,
        'border-2 border-gray-200': !isDisabled,
      }"
      @input="returnValue"
      @invalid="isInvalid = true"
      @focus="isInvalid = false"
    />
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
      required: false,
      default: 'Enter Value',
    },
    inputType: {
      type: String,
      required: false,
      default: 'text',
    },
    defaultValue: {
      type: [String, Number],
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
    const inputValue = ref<String | Number>('')
    const returnValue = () => {
      ctx.emit('get', inputValue)
    }
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
