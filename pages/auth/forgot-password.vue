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
    <form action="" class="mt-2 px-4">
      <Input
        :input-placeholder="'User@example.com'"
        :label-title="'Email Address'"
        @get="email = $event.value"
      />
      <Button
        :button-text="'Send Password Reset Link'"
        :loading-status="loading"
        :button-class="'bg-purple-800 text-white'"
        @buttonClicked="requestReset"
      />
    </form>
    <div class="mt-4 font-thin text-gray-600 w-full">
      <nuxt-link to="/" class="text-center underline block"
        >Back to Sign-in</nuxt-link
      >
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  useRouter,
} from '@nuxtjs/composition-api'
import Input from '@/components/Form/Input.vue'
import Button from '@/components/Form/Button.vue'
import { Auth } from '@/module/Auth'
export default defineComponent({
  name: 'Landing',
  components: { Input, Button },
  layout: 'auth',
  setup() {
    const context = useContext()
    const router = useRouter()
    const loading = ref(false)
    const email = ref()
    const authObject = new Auth()
    const requestReset = () => {
      if (email.value) {
        const form = {
          email: email.value,
        }
        loading.value = true

        authObject
          .forgotPassword(form)
          .then(() => {
            router.push('/')
          })
          .finally(() => {
            loading.value = false
          })
      } else {
        context.$toast.error('Email is Required')
      }
    }

    return {
      email,
      requestReset,
      loading,
    }
  },
})
</script>
