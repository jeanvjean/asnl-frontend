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
    ><input
      v-model="inputValue"
      :placeholder="inputPlaceholder"
      class="
        block
        w-full
        px-4
        py-2
        rounded-sm
        focus:outline-none focus:border-btn-purple
        font-semibold
        placeholder-gray-400
        focus:placeholder-gray-200
        text-gray-900
        border-2
      "
      min="0"
      step="1"
      :class="{
        'border-red-300': isInvalid,
        'border-gray-600 bg-gray-200 ': isDisabled,
        'border-gray-200 text-gray-500 bg-white': !isDisabled,
      }"
      @input="returnValue"
      @invalid="isInvalid = true"
      @focus="isInvalid = false"
      list="browsers"
      name="browser"
      id="browser"
    />

    <datalist id="browsers">
      <option :value="item.name" v-for="(item, i) in arr" :key="i"></option>
    </datalist>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import { debounce } from 'lodash'
import { CustomerController } from '~/module/Customer'

export default defineComponent({
  props: {
    arr: {
      type: Array,
      required: true,
    },
    labelTitle: {
      type: String,
      required: false,
      default: '',
    },
    inputPlaceholder: {
      type: String,
      required: false,
      default: 'Enter Value',
    },
    inputType: {
      type: [String, Number],
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
    id: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup(_props, ctx) {
    const inputValue = ref<String | Number>('')
    const returnValue = debounce(() => {
      if (inputValue.value !== '') {
        getCustomer(inputValue.value)
      }
    }, 2000)
    const isInvalid = ref<Boolean>(false)

    const getCustomer = (name: any) => {
      CustomerController.fetchCustomerDto(name).then((data) => {
        ctx.emit('get', data)
        inputValue.value = ''
      })
    }

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
