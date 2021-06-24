<template>
  <back-drop>
    <div class="w-1/5 bg-white rounded-sm px-4 py-4 text-black font-light z-20">
      <div class="relative">
        <h1 class="text-lg font-medium">Change Role</h1>
        <svg
          class="
            w-5
            h-5
            fill-current
            text-gray-400
            absolute
            top-0
            right-0
            mr-2
            mt-2
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
      <div
        class="
          flex
          space-x-4
          items-center
          w-full
          my-4
          px-2
          bg-gray-200
          py-2
          rounded-sm
        "
      >
        <img
          class="h-20 w-20 rounded-full"
          src="@/assets/images/default-avatar.jpg"
          alt=""
        />
        <div class="flex-1 capitalize">
          <h4>{{ user.name }}</h4>
          <p>
            <span>Role:</span> <span>{{ user.role }}</span>
          </p>
        </div>
      </div>
      <div class="px-2 py-2">
        <h6 class="text-sm font-light">Change Role</h6>
        <div class="flex items-center space-x-4">
          <select-component
            :select-array="roles"
            :init-value="form.role"
            @get="
              form.role = $event.value
              changeSubroles(form.role)
            "
          />

          <select-component
            :select-array="subroles"
            :init-value="form.subrole"
            @get="form.subrole = $event.value"
          />
        </div>
      </div>
      <div>
        <button-component
          :button-text="'Change Role'"
          :loading-status="loading"
          :loading-text="loadingText"
          :button-class="'text-white bg-btn-purple'"
          @buttonClicked="updateUserRole"
        />
      </div>
    </div>
  </back-drop>
</template>
<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  reactive,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import BackDrop from '@/components/Base/Backdrop.vue'
import ButtonComponent from '@/components/Form/Button.vue'
import SelectComponent from '@/components/Form/Select.vue'
import { UserController } from '@/module/User'
export default defineComponent({
  components: { BackDrop, ButtonComponent, SelectComponent },
  props: {
    user: {
      type: Object,
      required: true,
    },
    roles: {
      type: Array,
      required: true,
    },
  },
  setup(_props, ctx) {
    const close = () => {
      ctx.emit('close')
    }
    const loading = ref(false)
    const loadingText = 'Updating'
    const subroles = ref<any>([])
    const context = useContext()

    const form = reactive({
      id: '',
      role: '',
      subrole: '',
    })

    onBeforeMount(() => {
      form.id = _props.user._id
      form.role = _props.user.role
      form.subrole = _props.user.subrole
      _props.roles.forEach((element: any) => {
        if (element.value === _props.user.role) {
          subroles.value = element.subroles
        }
      })
      console.log(_props.user)
    })

    function changeSubroles(role: String) {
      if (role !== '') {
        _props.roles.forEach((element: any) => {
          if (element.name === role) {
            subroles.value = element.subroles
          }
        })
      }
      form.subrole = ''
    }

    const updateUserRole = () => {
      if (!form.id || !form.role || !form.subrole) {
        context.$toast.error('All Fields are Required')
      } else {
        loading.value = true
        UserController.updateUserRole(form.id, form.role, form.subrole)
          .then(() => {
            ctx.emit('refresh')
            close()
          })
          .finally(() => {
            loading.value = false
          })
      }
    }

    return {
      close,
      loading,
      loadingText,
      updateUserRole,
      subroles,
      form,
      changeSubroles,
    }
  },
})
</script>
