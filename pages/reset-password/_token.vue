<template>
  <div class="w-full sm:w-full md:w-2/3 lg:w-3/5 xl:w-1/3">
    <div>
      <div class="text-center">
        <h1 class="font-bold text-2xl">Reset Password</h1>
      </div>
      <div class="text-center">
        <span class="font-thin text-md text-gray-400"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </span>
      </div>
    </div>
    <form class="mt-2 px-4">
      <Input
        :input-placeholder="'New Password'"
        :input-type="'password'"
        :label-title="'Enter new Password'"
        @get="password = $event.value"
      />
      <Input
        :input-placeholder="'Confirm Password'"
        :input-type="'password'"
        :label-title="'Enter Confirm Password'"
        @get="confirmPassword = $event.value"
      />
      <Button
        :button-text="'Reset Password'"
        :loading-status="loading"
        :button-class="'bg-purple-700 text-white'"
        @buttonClicked="changePassword"
      />
    </form>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  useContext,
  useRoute,
  useRouter,
  ref,
} from '@nuxtjs/composition-api'
import Input from '@/components/Form/Input.vue'
import Button from '@/components/Form/Button.vue'
import { Auth } from '@/module/Auth'
export default defineComponent({
  name: 'Landing',
  components: { Input, Button },
  layout: 'auth',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const context = useContext()
    const authObject = new Auth()
    const token = route.value.params.token

    onBeforeMount(() => {
      if (!token) {
        router.push('/')
      }
    })
    const password = ref()
    const confirmPassword = ref()
    const loading = ref(false)
    const changePassword = () => {
      if (!password.value || !confirmPassword.value) {
        context.$toast.global.required()
      } else if (password.value !== confirmPassword.value) {
        context.$toast.error('Passwords must match')
      } else {
        loading.value = true
        const form = {
          password: password.value,
          token,
        }
        authObject
          .setPassword(form)
          .then(() => {
            router.push('/')
          })
          .finally(() => {
            loading.value = false
          })
      }
    }

    return {
      password,
      confirmPassword,
      changePassword,
      loading,
    }
  },
})
</script>
