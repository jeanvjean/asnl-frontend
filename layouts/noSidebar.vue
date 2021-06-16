<template>
  <div class="bg-gray-50 w-screen h-screen overflow-x-hidden">
    <nav
      class="
        flex
        justify-between
        items-center
        w-full
        h-auto
        border-b border-gray-100
        px-6
        py-3
        bg-white
      "
    >
      <button
        class="flex items-center space-x-2 text-sm focus:outline-none"
        @click="goBack"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-3 h-3 fill-current text-gray-900"
          viewBox="0 0 20 20"
        >
          <path
            d="M3.828 9l6.071-6.071-1.414-1.414L0 10l.707.707 7.778 7.778 1.414-1.414L3.828 11H20V9H3.828z"
          />
        </svg>
        <span>Back</span>
      </button>
      <h2 class="capitalize text-black font-semibold">
        {{ String(title).replace(/-/gi, ' ') }}
      </h2>
      <div
        v-if="title === 'internal-purchase-requisition'"
        class="flex items-center space-x-4"
      >
        <button
          class="px-6 py-2 text-white bg-btn-purple rounded-sm"
          @click="showPickup = !showPickup"
        >
          Create Pickup
        </button>
      </div>
      <div v-else class="flex items-center space-x-4">
        <button
          class="px-6 py-2 text-gray-600 rounded-sm border border-gray-400"
        >
          Save as Draft
        </button>
        <button class="px-6 py-2 text-white bg-btn-purple rounded-sm">
          Complete
        </button>
      </div>
    </nav>
    <div class="w-full">
      <div class="w-1/2 mx-auto mt-20 bg-gray-100">
        <nuxt />
      </div>
    </div>
    <pickup v-if="showPickup" @close="showPickup = !showPickup" />
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  useContext,
  computed,
  useRouter,
  ref,
} from '@nuxtjs/composition-api'
import Pickup from '@/components/Overlays/Pickup.vue'

export default defineComponent({
  name: 'Header',
  components: { Pickup },
  setup(_props) {
    const context = useContext()
    const router = useRouter()

    const title = computed(() => {
      const path: String = context.route.value.path
      const splitPath: any = path.split('/')
      const filterPaths = splitPath.filter((element: String) => {
        return element !== ''
      })
      const lastPath: String = filterPaths[filterPaths.length - 1]
      return lastPath
    })

    const showPickup = ref(false)

    const goBack = () => {
      router.go(-1)
    }
    return {
      title,
      goBack,
      showPickup,
    }
  },
})
</script>
