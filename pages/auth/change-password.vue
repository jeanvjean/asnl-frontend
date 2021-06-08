<template>
  <div class="w-full sm:w-full md:w-2/3 lg:w-3/5 xl:w-1/3">
    <div>
      <div class="text-center">
        <h1 class="font-bold text-3xl">Set Password</h1>
      </div>
      <div class="text-center">
        <span class="font-thin text-md text-gray-400"
          >Create a password for your account</span
        >
      </div>
    </div>
    <form action="" class="px-4">
      <Input
        :input-placeholder="'Enter Old Password'"
        :label-title="'Old Password'"
        :input-type="'password'"
        @get="requestParamaeters.oldPassword = $event.value"
      />

      <Input
        :input-placeholder="'Enter New Password'"
        :label-title="'New Password'"
        :input-type="'password'"
        @get="requestParamaeters.newPassword = $event.value"
      />
      <Input
        :input-placeholder="'Confirm Password'"
        :label-title="'Confirm New Password'"
        :input-type="'password'"
        @get="confirmPassword = $event.value"
      />
      <Button
        :button-text="'Set Password'"
        :loading-status="loading.status"
        :loading-text="loading.text"
        :button-class="'bg-btn-purple font-semibold text-white'"
        @buttonClicked="changePassword"
      />
    </form>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  useContext,
  useRouter,
} from '@nuxtjs/composition-api'
import Input from '@/components/Form/Input.vue'
import Button from '@/components/Form/Button.vue'
import { Auth } from '@/module/Auth'
import { UserRepository } from '@/module/User'
import { mainStore } from '@/module/Pinia'

export default defineComponent({
  name: 'Landing',
  components: { Input, Button },
  layout: 'auth',
  setup() {
    const AuthObject = new Auth()
    const appStore = mainStore()
    const userObject = new UserRepository()
    const confirmPassword = ref(null)
    const requestParamaeters = reactive({
      oldPassword: null,
      newPassword: null,
    })
    const ctx = useContext()
    const router = useRouter()
    const loading = reactive({
      text: 'Submitting',
      status: false,
    })

    const changePassword = () => {
      if (
        !requestParamaeters.oldPassword &&
        !requestParamaeters.newPassword &&
        !confirmPassword.value
      ) {
        ctx.$toast.error('All Fields are Required')
      } else if (confirmPassword.value !== requestParamaeters.newPassword) {
        ctx.$toast.error('New Password must match Confirmed Password')
      } else {
        loading.status = true
        AuthObject.changePassword(requestParamaeters)
          .then(() => {
            const loggedInUser: any = appStore.getLoggedInUser
            const userId: String = loggedInUser._id
            const email: String = loggedInUser.email
            loading.text = 'Retrieving user'
            userObject.getUser(userId, email).then((response: any) => {
              appStore.saveUser(response.data.data)
              router.push('/auth/account-setup')
            })
          })
          .finally(() => {
            loading.status = false
          })
      }
    }

    return {
      confirmPassword,
      requestParamaeters,
      changePassword,
      loading,
    }
  },
})
</script>
