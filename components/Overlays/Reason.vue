<template>
  <back-drop>
    <div class="w-1/5 bg-white rounded-sm px-4 py-4 text-black font-light">
      <div>
        <label for="">Reason for {{ action }}</label>
        <textarea class="w-full border-2 border-gray-400" rows="5"></textarea>
      </div>
      <div class="flex space-x-2">
        <button
          class="
            w-full
            text-white
            bg-btn-purple
            py-3
            rounded-sm
            mt-4
            font-semibold
          "
        >
          Submit
        </button>
        <button
          class="
            w-full
            text-btn-purple
            bg-white
            border border-btn-purple
            py-3
            rounded-sm
            mt-4
            font-semibold
          "
          @click="close"
        >
          Close
        </button>
      </div>
    </div>
  </back-drop>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BackDrop from '@/components/Base/Backdrop.vue'

export default defineComponent({
  components: { BackDrop },
  props: {
    action: {
      type: String,
      required: true,
      default: 'Deleting User',
    },
  },
  setup(_props, ctx) {
    const close = () => {
      ctx.emit('close')
    }

    return {
      close,
    }
  },
})
</script>
