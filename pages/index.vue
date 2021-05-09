<template>
  <div class="w-full sm:w-full md:w-2/3 lg:w-3/5 xl:w-1/3">
    <div>
      <div class="text-center">
        <h1 class="font-bold text-2xl">Login to Dashboard</h1>
      </div>
      <div class="text-center">
        <span class="font-thin text-md text-gray-400"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </span>
      </div>
    </div>
    <form action="" class="mt-2 px-4" autocomplete="off">
      <Input
        :input-placeholder="'User@example.com'"
        :label-title="'Email Address'"
        @get="credentials.email = $event.value"
      />

      <Input
        :input-placeholder="'Enter Password'"
        :input-type="'password'"
        :label-title="'Password'"
        @get="credentials.password = $event.value"
      />
      <Button
        :button-text="'Login'"
        :button-class="addedClass"
        :loading-status="loading.status"
        :loading-text="loading.text"
        @buttonClicked="login"
      />
    </form>
    <div class="mt-4 font-thin text-gray-700 w-full">
      <nuxt-link to="/auth/forgot-password" class="text-center underline block"
        >Forgot Password</nuxt-link
      >
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api'
import { Auth } from '@/module/Auth'
import { mainStore } from '@/module/Pinia'
import Input from '@/components/Form/Input.vue'
import Button from '@/components/Form/Button.vue'
import Authenticated from '@/middleware/Authenticated'
export default defineComponent({
  name: 'Landing',
  components: { Input, Button },
  layout: 'auth',
  middleware: Authenticated,
  setup() {
    const ctx = useContext()
    const appStore: any = mainStore()
    const AuthObject = new Auth()

    const credentials = reactive({
      email: '',
      password: '',
    })

    const loading = reactive({
      text: 'Submitting',
      status: false,
    })

    const addedClass = ref('bg-gray-400 text-white')

    watch(credentials, () => {
      if (credentials.password !== '') {
        addedClass.value = 'bg-purple-500 text-white'
      } else {
        addedClass.value = 'bg-gray-400 text-white'
      }
    })
    const login = () => {
      if (!credentials.email) {
        ctx.$toast.error('Email is Required')
      }
      if (!credentials.password) {
        ctx.$toast.error('Password is Required')
      }

      if (credentials.email && credentials.password) {
        credentials.email = String(credentials.email).toLowerCase()
        loading.status = true
        AuthObject.login(credentials)
          .then((response: any) => {
            const myResponse = response.data.data
            appStore.saveUser(myResponse.user)
            appStore.saveToken(myResponse.accessToken)

            if (!myResponse.user.isVerified) {
              ctx.redirect('/auth/change-password')
            } else {
              ctx.redirect('dashboard')
            }
          })
          .finally(() => {
            loading.status = false
          })
      }
    }

    return {
      credentials,
      AuthObject,
      appStore,
      loading,
      login,
      addedClass,
    }
  },
})
</script>
