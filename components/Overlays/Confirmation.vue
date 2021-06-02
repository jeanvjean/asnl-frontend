<template>
  <back-drop>
    <div class="w-full sm:w-full md:w-1/4 bg-white py-10 px-8 rounded-sm-md">
      <div class="flex justify-between items-center my-2">
        <div class="w-full mb-4">
          <p class="text-xl font-medium w-full text-center">
            Please Enter your Password to approve
          </p>
        </div>
      </div>
      <div class="grid grid-rows-1 gap-y-10">
        <input-component
          :label-title="'Password'"
          :input-placeholder="'Enter Password'"
        />
        <div class="space-y-4">
          <div class="w-full mt-2">
            <button
              class="w-full py-3 rounded-sm bg-purple-600 text-white border"
              @click="approve"
            >
              Approve
            </button>
          </div>

          <div class="w-full mt-2">
            <button
              class="w-full py-3 rounded-sm bg-white text-purple-600 border border-purple-600"
              @click="close"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </back-drop>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BackDrop from '@/components/Base/Backdrop.vue'
import InputComponent from '@/components/Form/Input.vue'

export default defineComponent({
  components: {
    BackDrop,
    InputComponent,
  },
  setup(_props, ctx) {
    const close = () => {
      ctx.emit('close')
    }

    const approve = () => {
      ctx.emit('approve')
    }

    return {
      close,
      approve,
    }
  },
})
</script>
