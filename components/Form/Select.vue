<template>
  <div class="w-full py-2">
    <label
      v-if="labelTitle"
      class="block w-full px-1 text-gray-800 text-md mb-1"
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
    ><select
      v-model="selectedValue"
      :disabled="isDisabled"
      :required="isRequired"
      class="
        appearance-none
        block
        w-full
        px-4
        py-2
        border-2 border-gray-200
        text-black
        rounded-sm
        focus:outline-none focus:border-btn-purple
        font-thin
        bg-white
      "
      :class="{ 'border-red-300': isInvalid }"
      @change="returnValue"
      @invalid="isInvalid = true"
      @focus="isInvalid = false"
    >
      <option
        v-if="defaultOptionText"
        class="capitalize text-gray-500 disabled"
        value=""
      >
        {{ defaultOptionText }}
      </option>
      <option
        v-for="(row, index) in selectArray"
        :key="index"
        :value="row.value"
        class="text-black capitalize"
      >
        {{ row.name }}
      </option>
    </select>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

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
    initValue: {
      type: String,
      required: false,
      default: '',
    },
    isRequired: {
      type: Boolean,
      default: true,
      required: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(_props, ctx) {
    const selectedValue = ref<String>(_props.initValue)
    const returnValue = () => {
      ctx.emit('get', selectedValue)
    }
    const isInvalid = ref<Boolean>(false)
    return {
      returnValue,
      selectedValue,
      isInvalid,
    }
  },
})
</script>
