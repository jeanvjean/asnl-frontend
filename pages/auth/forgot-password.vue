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
      />
      <Button
        :button-text="'Send Password Reset Link'"
        :button-class="'bg-purple-800 text-white'"
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
import { defineComponent } from '@nuxtjs/composition-api'
import Input from '@/components/Form/Input.vue'
import Button from '@/components/Form/Button.vue'
export default defineComponent({
  name: 'Landing',
  components: { Input, Button },
  layout: 'auth',
  setup() {},
})
</script>
