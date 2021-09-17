<template>
  <button
    v-if="!loadingStatus"
    type="submit"
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
