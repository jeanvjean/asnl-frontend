<template>
  <back-drop>
    <div class="w-1/5 bg-white rounded-sm px-4 py-4 text-black font-light z-20">
      <div>
        <h1 class="text-lg font-medium">Change Role</h1>
      </div>
      <div
        class="flex space-x-4 items-center w-full my-4 px-2 bg-gray-200 py-2 rounded-sm-sm"
      >
        <img
          class="h-20 w-20 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=ZIOeP15SMT&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
      <div class="flex items-center space-x-4">
        <button-component
          :button-text="'Change Role'"
          :loading-status="loading"
          :loading-text="loadingText"
          :button-class="'text-white bg-purple-500'"
          @buttonClicked="updateUserRole"
        />

        <button-component
          :button-text="'Cancel'"
          :button-class="'text-black bg-white border border-purple-500'"
          @buttonClicked="close"
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
import { UserRepository } from '@/module/User'
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
    const userObject = new UserRepository()
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
        userObject
          .updateUserRole(form.id, form.role, form.subrole)
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
