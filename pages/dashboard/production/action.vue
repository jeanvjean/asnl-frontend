<template>
  <div class="py-6 px-6">
    <div class="bg-white mt-4 w-full px-4 py-2">
      <form autocomplete="off" @submit.prevent="">
        <div class="w-full">
          <div class="w-full lg:w-1/3 mb-2">
            <input-component
              :input-placeholder="'Enter ECR Number'"
              :label-title="'Enter ECR Number'"
            />
          </div>
          <div class="w-full lg:w-1/6">
            <button-component
              :button-text="'Submit'"
              :button-class="'bg-btn-purple text-white font-semibold'"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import InputComponent from '@/components/Form/Input.vue'
import ButtonComponent from '@/components/Form/Button.vue'

export default defineComponent({
  name: 'CreateReport',
  components: { InputComponent, ButtonComponent },
  layout: 'dashboard',
  setup() {
    return {}
  },
})
</script>
