<template>
  <back-drop>
    <div class="w-full sm:w-full md:w-1/4 bg-white py-10 px-8 rounded-md">
      <div class="flex justify-between items-center my-2">
        <div>
          <p class="text-xl font-medium">Assign Driver</p>
        </div>
        <svg
          class="w-6 h-6 fill-current text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          @click="close"
        >
          <path
            d="M2.93 17.07A10 10 0 1117.07 2.93 10 10 0 012.93 17.07zM11.4 10l2.83-2.83-1.41-1.41L10 8.59 7.17 5.76 5.76 7.17 8.59 10l-2.83 2.83 1.41 1.41L10 11.41l2.83 2.83 1.41-1.41L11.41 10z"
          />
        </svg>
      </div>
      <div class="space-y-2">
        <select-component
          :label-title="'Driver'"
          :default-option-text="'Select Driver'"
          :select-array="[]"
        />
        <input-component
          :label-title="'Comments'"
          :input-placeholder="'Enter Comments'"
        />
        <button-component
          :button-text="'Assign'"
          :button-class="'bg-purple-600 text-white rounded-sm mt-2'"
          @buttonClicked="approve"
        />

        <button-component
          :button-text="'Cancel'"
          :button-class="'bg-white text-purple-600 rounded-sm my-2 border border-purple-600'"
          @buttonClicked="close"
        />
      </div>
    </div>
  </back-drop>
</template>
<script lang="ts">
import { defineComponent, reactive } from '@nuxtjs/composition-api'
import BackDrop from '@/components/Base/Backdrop.vue'
import InputComponent from '@/components/Form/Input.vue'
import SelectComponent from '@/components/Form/Select.vue'
import ButtonComponent from '@/components/Form/Button.vue'

export default defineComponent({
  components: {
    BackDrop,
    InputComponent,
    SelectComponent,
    ButtonComponent,
  },
  setup(_props, ctx) {
    const close = () => {
      ctx.emit('close')
    }
    const approve = () => {
      ctx.emit('approve')
    }
    const loading = reactive({
      text: 'Submitting',
      status: false,
    })

    return {
      close,
      loading,
      approve,
    }
  },
})
</script>
