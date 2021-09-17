<template>
  <button
    v-if="!loadingStatus"
    type="submit"
    class="
      py-3
      px-4
      w-full
      rounded-sm
      flex
      items-center
      justify-between
      font-semibold
    "
    :class="
      iconPosition === 'left' ? `${buttonClass} flex-row-reverse` : buttonClass
    "
    @click="buttonClicked"
  >
    <span>{{ buttonText }}</span>
    <slot></slot>
  </button>
  <button
    v-else
    type="button"
    class="w-full py-3 rounded-sm text-white"
    :class="buttonClass"
    @click="buttonClicked"
  >
    <circle-loader class="mx-auto" />
  </button>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import CircleLoader from '@/components/CircleLoader.vue'

export default defineComponent({
  components: { CircleLoader },
  props: {
    buttonText: {
      type: String,
      required: true,
    },
    // eslint-disable-next-line vue/require-default-prop
    buttonClass: {
      type: String,
      required: false,
    },
    loadingStatus: {
      type: Boolean,
      required: false,
      default: false,
    },
    iconPosition: {
      type: String,
      required: false,
      default: 'left',
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
