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
        :input-placeholder="'Enter New Password'"
        :label-title="'Enter New Password'"
      />

      <Input
        :input-placeholder="'Confirm Password'"
        :label-title="'Confirm new Password'"
      />
      <Button
        :button-text="'Reset Password'"
        :button-class="'bg-purple-700 text-white'"
      />
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Input from '~/components/Form/Input.vue'
import Button from '~/components/Form/Button.vue'
export default defineComponent({
  name: 'Landing',
  components: { Input, Button },
  layout: 'auth',
  setup() {},
})
</script>
