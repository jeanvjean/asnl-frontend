<template>
  <router-link
    to="/dashboard/user-management/new-user"
    class="
      flex
      justify-between
      items-center
      bg-btn-purple
      px-3.5
      py-2
      h-full
      space-x-4
      text-white
      font-medium
      text-md
      rounded-sm
    "
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-5 h-5 fill-current font-white"
      viewBox="0 0 20 20"
    >
      <path
        d="M2 6H0v2h2v2h2V8h2V6H4V4H2v2zm7 0a3 3 0 016 0v2a3 3 0 01-6 0V6zm11 9.14A15.93 15.93 0 0012 13c-2.91 0-5.65.78-8 2.14V18h16v-2.86z"
      />
    </svg>
    <span>Add New User</span>
  </router-link>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup(_props, ctx) {
    const clicked = () => {
      ctx.emit('addUser')
    }

    return {
      clicked,
    }
  },
})
</script>
