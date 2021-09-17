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
      <div class="flex space-x-2 mt-4">
        <button-component
          :button-text="buttonActionTitle"
          :button-class="'w-full text-white bg-btn-purple py-3 rounded-sm font-semibold'"
          :loading-status="buttonLoadingStatus"
          @buttonClicked="submitAction"
        />
        <button
          class="
            w-full
            text-btn-purple
            bg-white
            border border-btn-purple
            py-3
            rounded-sm
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
import ButtonComponent from '@/components/Form/Button.vue'

export default defineComponent({
  components: { BackDrop, ButtonComponent },
  props: {
    action: {
      type: String,
      required: true,
      default: 'Submit',
    },
    buttonActionTitle: {
      type: String,
      required: true,
      default: 'Delete',
    },
  },
  setup(_props, ctx) {
    const close = () => {
      ctx.emit('close')
    }

    const reasonString = ref<String>('')
    const context = useContext()
    const buttonLoadingStatus = ref<Boolean>(false)
    const buttonLoadingText = 'Deleting'

    const submitAction = () => {
      if (!reasonString.value) {
        context.$toast.error('Reason is Required')
      } else {
        buttonLoadingStatus.value = true
        ctx.emit('reasonGiven', reasonString.value)
      }
    }

    return {
      close,
      reasonString,
      submitAction,
      buttonLoadingStatus,
      buttonLoadingText,
    }
  },
})
</script>
