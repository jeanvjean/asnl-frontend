<template>
  <div class="h-screen flex overflow-hidden bg-gray-100 customFontRegular">
    <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
    <MobileSidebar
      :show-modal="toggleMobileSidebar"
      @close="toggleMobileSidebar = false"
    />

    <Sidebar />
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <Header @show="toggleMobileSidebar = true" />
      <main
        class="
          flex-1
          relative
          overflow-y-auto overflow-x-hidden
          focus:outline-none
          h-screen
        "
        tabindex="0"
      >
        <Nuxt />
      </main>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import Header from '@/components/Partials/Header.vue'
import MobileSidebar from '@/components/Partials/MobileSidebar.vue'
import Sidebar from '@/components/Partials/Sidebar.vue'
import isAuthenticated from '@/middleware/isAuthenticated'

export default defineComponent({
  name: 'Dashboard',
  components: { Header, Sidebar, MobileSidebar },
  middleware: isAuthenticated,
  setup() {
    const toggleMobileSidebar = ref(true)

    return {
      toggleMobileSidebar,
    }
  },
})
</script>
<style>
.customFontRegular {
  font-family: 'tt_normsregular';
}

.customFontLight {
  font-family: 'tt_normslight';
}

.customFontBold {
  font-family: 'tt_normsbold';
}

.action-menu {
  display: none;
}
.icon-button:hover > .action-menu {
  display: block;
}
.icon-button:focus > .action-menu {
  display: block;
}

@media only screen and (max-width: 600px) {
  * {
    font-size: 12px;
  }
}
</style>
