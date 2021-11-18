<template>
  <div class="py-2 w-full">
    <label
      v-if="labelTitle"
      class="block w-full px-1 text-gray-600 text-md mb-1 font-semibold"
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
        block
        w-full
        px-4
        py-2
        rounded-sm
        font-semibold
        focus:outline-none focus:border-btn-purple
        placeholder-gray-400
        focus:placeholder-gray-200
        text-gray-900
        border-2
      "
      :class="{
        'border-red-300': isInvalid,
        'border-gray-600 bg-gray-200 ': isDisabled,
        'border-gray-200 text-gray-500 bg-white': !isDisabled,
      }"
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
        class="'text-black capitalize'"
      >
        {{ row.name }}
        {{ row.length || row.length == 0 ? `(${row.length})` : '' }}
      </option>
    </select>

    <div
      v-if="addText"
      @click="clickAdd"
      class="inline-block text-sm text-gray-400 my-2 mr-3"
    >
      <button
        class="flex justify-evenly items-center"
        type="button"
        @click="clickAdd"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4 fill-current text-transparent mr-2"
          viewBox="0 0 24 24"
          stroke="gray"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span class="underline">{{ addText }}</span>
      </button>
    </div>
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
      type: [String, Number],
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
    addText: {
      required: false,
      type: String,
    },
  },
  setup(_props, ctx) {
    const selectedValue = ref<String | Number>(_props.initValue)
    const returnValue = () => {
      ctx.emit('get', selectedValue)
    }
    const returnLength = (gasName: String) => {
      ctx.emit('getGasLength')
    }
    const clickAdd = () => {
      ctx.emit('addFunction')
    }
    const isInvalid = ref<Boolean>(false)
    return {
      returnValue,
      selectedValue,
      isInvalid,
      returnLength,
      clickAdd,
    }
  },
})
</script>
