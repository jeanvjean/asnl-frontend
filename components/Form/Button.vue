<template>
  <button
    v-if="!loadingStatus"
    :type="buttonType"
    class="w-full py-3 px-2 rounded-sm text-center font-semibold"
    :class="buttonClass"
    @click="buttonClicked"
  >
    {{ buttonText }}
  </button>
  <button
    v-else
    type="button"
    disabled
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
    buttonType: {
      type: String,
      required: false,
      default: 'submit',
    },
  },
  setup(_props, ctx) {
    const buttonClicked = () => {
      // ctx.emit('buttonClicked')
      ctx.emit('click')
    }
    return {
      buttonClicked,
    }
  },
})
</script>
