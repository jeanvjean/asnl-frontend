<template>
  <back-drop>
    <div class="w-full sm:w-full md:w-1/4 bg-white py-10 px-8 rounded-sm">
      <div class="flex justify-between items-center my-2">
        <div>
          <p class="text-xl font-medium">Create Cylinder Type</p>
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
        <input-component
          :label-title="'Gas Name'"
          :input-placeholder="'Enter Gas Name'"
          @get="form.gasName = $event.value"
        />
        <input-component
          :label-title="'Color Code'"
          :input-placeholder="'Enter Color Code'"
          @get="form.colorCode = $event.value"
        />
        <button-component
          :button-text="'Create Cylinder Type'"
          :loading-status="isLoading"
          :button-class="'bg-btn-purple text-white rounded-sm my-6'"
          @buttonClicked="createCylinder"
        />
      </div>
    </div>
  </back-drop>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import BackDrop from '@/components/Base/Backdrop.vue'
import InputComponent from '@/components/Form/Input.vue'
import ButtonComponent from '@/components/Form/Button.vue'
import { CylinderController } from '@/module/Cylinder'

export default defineComponent({
  components: {
    BackDrop,
    InputComponent,
    ButtonComponent,
  },
  setup(_props, ctx) {
    const mainContext = useContext()
    const close = () => {
      ctx.emit('close')
    }
    const isLoading = ref<Boolean>(false)
    const form = reactive({
      gasName: '',
      colorCode: '',
    })

    const createCylinder = () => {
      if (!form.gasName && !form.colorCode) {
        mainContext.$toast.global.required()
      } else {
        isLoading.value = true
        CylinderController.createCylinder(form)
          .then(() => {
            ctx.emit('close')
            form.gasName = ''
            form.colorCode = ''
          })
          .finally(() => {
            isLoading.value = false
          })
      }
    }
    return {
      close,
      isLoading,
      form,
      createCylinder,
    }
  },
})
</script>
