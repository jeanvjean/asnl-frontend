<template>
  <div class="w-full mt-2 text-white">
    <button
      v-if="!loadingStatus"
      type="button"
      class="w-full py-3 rounded-sm text-center"
      :class="buttonClass"
      @click="buttonClicked"
    >
      {{ buttonText }}
    </button>
    <button
      v-else
      type="button"
      class="
        w-full
        py-3
        rounded-sm
        flex
        items-center
        justify-center
        space-x-2
        animate-pulse
      "
      :class="buttonClass"
      @click="buttonClicked"
    >
      <svg
        class="animate-spin w-6 h-6 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M14.66 15.66A8 8 0 1117 10h-2a6 6 0 10-1.76 4.24l1.42 1.42zM12 10h8l-4 4-4-4z"
        />
      </svg>
      <span class="font-semibold">{{ loadingText }}</span>
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
    loadingStatus: {
      type: Boolean,
      required: false,
      default: false,
    },
    loadingText: {
      type: String,
      required: false,
      default: 'Submitting',
    },
  },
  setup(_props, ctx) {
    const buttonClicked = () => {
      ctx.emit('buttonClicked')
    }
    return {
      buttonClicked,
    }
  },
})
</script>
