<template>
  <back-drop>
    <div class="w-1/5 bg-white rounded-sm px-4 py-4 text-black font-light">
      <div>
        <label for="">Reason for {{ action }}</label>
        <textarea
          v-model="reasonString"
          class="w-full border-2 border-gray-400"
          rows="5"
        ></textarea>
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
          @click="submitAction"
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
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
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

    const reasonString = ref<String>('')
    const context = useContext()

    const submitAction = () => {
      if (!reasonString.value) {
        context.$toast.error('Reason is Required')
      } else {
        ctx.emit('reasonGiven', reasonString.value)
      }
    }

    return {
      close,
      reasonString,
      submitAction,
    }
  },
})
</script>
