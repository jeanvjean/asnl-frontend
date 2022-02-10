<template>
  <back-drop>
    <div class="w-1/5 bg-white rounded-sm px-4 py-4 text-black font-light">
      <h2 class="font-semibold text-base">
        Are you sure you want to delete this Vehicle
      </h2>
      <div class="flex space-x-2 mt-4">
        <button-component
          :button-text="'Delete'"
          :button-class="'w-full text-white bg-btn-purple py-3 rounded-sm font-semibold'"
          :loading-status="buttonLoadingStatus"
          :loading-text="buttonLoadingText"
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
import { defineComponent, ref } from '@nuxtjs/composition-api'
import BackDrop from '@/components/Base/Backdrop.vue'
import ButtonComponent from '@/components/Form/Button.vue'

export default defineComponent({
  components: { BackDrop, ButtonComponent },
  setup(_props, ctx) {
    const close = () => {
      ctx.emit('close')
    }

    const buttonLoadingStatus = ref<Boolean>(false)
    const buttonLoadingText = 'Deleting'

    const submitAction = () => {
      buttonLoadingStatus.value = true
      ctx.emit('deleted')
    }

    return {
      close,
      submitAction,
      buttonLoadingStatus,
      buttonLoadingText,
    }
  },
})
</script>
