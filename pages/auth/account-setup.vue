<template>
  <div class="w-full sm:w-full md:w-3/5">
    <div>
      <div class="text-center">
        <h1 class="font-bold text-2xl">Complete your Account Setup</h1>
      </div>
      <div class="text-center">
        <span class="font-thin text-md text-gray-400"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </span>
      </div>
    </div>
    <form class="mt-2 px-4">
      <div class="grid grid-rows-1 md:grid-cols-2 sm:gap-y-4 md:gap-x-4">
        <Input
          :input-placeholder="'Durodola Caroline'"
          :label-title="'Full Name'"
        />
        <select-input
          :label-title="'Gender'"
          :select-array="genders"
          :default-option-text="'Select a Gender'"
        />
        <select-input
          :label-title="'Role'"
          :select-array="roles"
          :default-option-text="'Select a Role'"
        />
        <Input
          :input-placeholder="'Enter Phone Number'"
          :label-title="'Phone Number'"
        />
        <Input
          :input-placeholder="'Enter Location'"
          :label-title="'Location'"
        />
      </div>
      <div class="w-full mt-2">
        <div class="w-full sm:w-full md:w-1/3 mx-auto">
          <Button
            :button-text="'Login'"
            :button-class="'bg-gray-400 text-white'"
          />
        </div>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Input from '@/components/Form/Input.vue'
import SelectInput from '@/components/Form/Select.vue'
import Button from '@/components/Form/Button.vue'
export default defineComponent({
  name: 'Landing',
  components: { Input, Button, SelectInput },
  layout: 'auth',
  setup() {
    const roles = ['Admin', 'User', 'Super Admin']
    const genders = ['Male', 'Female']

    return {
      roles,
      genders,
    }
  },
})
</script>
