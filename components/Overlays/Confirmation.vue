<template>
  <back-drop>
    <div class="w-full sm:w-full md:w-1/4 bg-white py-10 px-8 rounded-sm">
      <div class="flex justify-between items-center my-2">
        <div class="w-full mb-4">
          <p class="font-medium w-full text-center text-lg capitalize">
            Please Enter your Password to {{ displayText }}
          </p>
        </div>
      </div>
      <form autocomplete="off" @submit.prevent="approve">
        <div class="grid grid-rows-1 gap-y-10">
          <input-component
            :label-title="'Password'"
            :input-placeholder="'Enter Password'"
            :input-type="'password'"
            @get="form.password = $event.value"
          />
          <div class="space-y-4">
            <button-component
              :button-class="'bg-btn-purple text-white border'"
              :button-text="'Continue'"
              :loading-status="buttonLoading"
            />
            <button-component
              :button-class="'bg-white text-btn-purple border border-btn-purple'"
              :button-text="'Close'"
              @buttonClicked="close"
            />
          </div>
        </div>
      </form>
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

export default defineComponent({
  components: {
    BackDrop,
    InputComponent,
    ButtonComponent,
  },
  props: {
    displayText: {
      type: String,
      required: true,
    },
  },
  setup(_props, ctx) {
    const close = () => {
      ctx.emit('close')
    }

    const context = useContext()
    const form = reactive({
      password: '',
    })

    const buttonLoading = ref<Boolean>(false)

    const approve = () => {
      if (form.password === '') {
        context.$toast.error('Password is Required')
      } else {
        ctx.emit('approve', {
          status:
            _props.displayText === 'approve'
              ? 'approved'
              : _props.displayText === 'reject'
              ? 'rejected'
              : '',
          password: form.password,
        })
      }
      close()
    }

    return {
      close,
      approve,
      form,
      buttonLoading,
    }
  },
})
</script>
