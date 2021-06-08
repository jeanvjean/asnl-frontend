<template>
  <div class="grid grid-rows-1 lg:grid-cols-5 w-full h-auto py-6 px-6 gap-4">
    <div class="lg:col-span-2 bg-white px-6 py-4 h-full">
      <h1
        class="
          inline-block
          text-2xl
          font-medium
          border-b-2 border-btn-purple
          mb-4
        "
      >
        User Details
      </h1>

      <div class="w-full px-4 py-10 space-y-2 border-b-2 border-gray-200">
        <img
          class="h-40 w-40 rounded-full mx-auto"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=ZIOeP15SMT&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <div class="w-full">
          <h2
            class="text-center text-2xl text-black font-medium tracking-wider"
          >
            Chioma Assurance
          </h2>
        </div>
        <div class="w-full">
          <p class="text-center space-x-2">
            <span class="text-black">Sales Department</span>
            <span class="text-btn-purple">Sales Analyst</span>
          </p>
        </div>
      </div>

      <div class="py-8 space-y-4">
        <h1 class="inline-block text-xl font-medium">Contact Information</h1>

        <div v-for="(element, index) in contact" :key="index" class="space-y-1">
          <p class="text-gray-400 capitalize">{{ index }}</p>
          <p class="text-black">{{ element }}</p>
        </div>
      </div>
    </div>
    <div class="lg:col-span-3 bg-white px-6 py-4">
      <h1
        class="
          inline-block
          text-2xl
          font-medium
          border-b-2 border-btn-purple
          mb-4
        "
      >
        Activity Logs
      </h1>
      <div class="space-y-6">
        <div v-for="i in 10" :key="i">
          <p class="text-md text-black font-light">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta non
            illum ipsum laudantium, necessitatibus.
          </p>
          <p class="text-gray-700 text-sm font-thin">30 Minutes</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Profile',
  layout: 'dashboard',
  setup() {
    const contact = {
      email: 'chioma.assurance@airseparation.com',
      phone: '08023124567',
      gender: 'Female',
      location: 'Jos',
    }

    return {
      contact,
    }
  },
})
</script>
