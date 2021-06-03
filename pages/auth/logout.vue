<template>
  <div></div>
</template>
<script lang="ts">
import { defineComponent, useRouter } from '@nuxtjs/composition-api'
import { mainStore } from '@/module/Pinia'

export default defineComponent({
  name: 'Header',
  setup(_props) {
    const router = useRouter()

    const appStore = mainStore()
    appStore.user = null
    localStorage.removeItem('user')
    router.push('/')
  },
})
</script>
