<template>
  <back-drop>
    <div
      class="
        w-full
        sm:w-full
        md:w-1/4
        bg-white
        py-10
        px-8
        rounded-sm-md
        relative
      "
    >
      <div class="my-2">
        <div class="space-y-2">
          <p class="text-lg font-semibold">External Supply</p>
          <p class="text-gray-500 text-sm">Select number of Cylinders</p>
        </div>
        <svg
          class="
            w-6
            h-6
            fill-current
            text-gray-400
            absolute
            top-0
            right-0
            mt-6
            mr-6
          "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          @click="close"
        >
          <path
            d="M2.93 17.07A10 10 0 1117.07 2.93 10 10 0 012.93 17.07zM11.4 10l2.83-2.83-1.41-1.41L10 8.59 7.17 5.76 5.76 7.17 8.59 10l-2.83 2.83 1.41 1.41L10 11.41l2.83 2.83 1.41-1.41L11.41 10z"
          />
        </svg>
      </div>
      <div class="space-y-2 text-sm">
        <select-component
          :label-title="'Argon 6kg'"
          :default-option-text="'Select Number of Cylinders'"
          :select-array="[]"
        />
        <select-component
          :label-title="'Supplier'"
          :default-option-text="'Select Supplier'"
          :select-array="[]"
        />
        <div class="w-3/4 mx-auto">
          <button-component
            :button-text="'Create Purchase Requisition'"
            :button-class="'bg-purple-600 text-white rounded-sm-sm my-6'"
          />
        </div>
      </div>
    </div>
  </back-drop>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BackDrop from '@/components/Base/Backdrop.vue'
import SelectComponent from '@/components/Form/Select.vue'
import ButtonComponent from '@/components/Form/Button.vue'

export default defineComponent({
  components: {
    BackDrop,
    SelectComponent,
    ButtonComponent,
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
