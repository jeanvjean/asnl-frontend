<template>
  <div class="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
    <button
      class="
        px-4
        border-r border-gray-200
        text-gray-500
        focus:outline-none
        focus:ring-2 focus:ring-inset focus:ring-indigo-500
        md:hidden
      "
      @click="showMobileSidebar"
    >
      <span class="sr-only">Open sidebar</span>
      <!-- Heroicon name: outline/menu-alt-2 -->
      <svg
        class="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
        @click="showMobileSidebar"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h7"
        />
      </svg>
    </button>
    <div class="flex-1 px-4 flex justify-between items-center">
      <div v-if="showBackButtons.includes(title)" class="pl-4">
        <button
          class="flex items-center space-x-2 text-sm focus:outline-none"
          @click="goBack()"
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
      </div>
      <h1
        v-else
        class="uppercase font-medium tracking-wide customFontRegular pl-4"
      >
        {{ String(title).replace(/-/gi, ' ') }}
      </h1>
      <div class="ml-4 flex items-center md:ml-6">
        <button
          class="
            bg-white
            p-1
            rounded-full
            text-gray-400
            hover:text-gray-500
            focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
          "
        >
          <span class="sr-only">View notifications</span>
          <!-- Heroicon name: outline/bell -->
          <svg
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>

        <!-- Profile dropdown -->
        <div class="ml-3 relative">
          <div class="flex justify-between items-center space-x-2">
            <button
              id="user-menu"
              type="button"
              class="
                max-w-xs
                bg-white
                flex
                items-center
                text-sm
                rounded-full
                focus:outline-none
              "
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span class="sr-only">Open user menu</span>
              <img
                class="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=ZIOeP15SMT&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </button>
            <span v-if="auth.name" class="font-semibold text-sm capitalize"
              >{{ auth.name }}.</span
            >
            <svg
              v-if="userMenu"
              class="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              @click="userMenu = !userMenu"
            >
              <path
                d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z"
              />
            </svg>
            <svg
              v-else
              class="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              @click="userMenu = !userMenu"
            >
              <path
                d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
              />
            </svg>
          </div>

          <div
            v-if="userMenu"
            class="
              origin-top-right
              absolute
              right-0
              mt-2
              w-48
              rounded-sm
              shadow-lg
              py-1
              bg-white
              ring-1 ring-black ring-opacity-5
              focus:outline-none
            "
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <router-link
              to="/dashboard/user-management/profile"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              >Your Profile</router-link
            >

            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              >Settings</a
            >

            <router-link
              class="
                block
                px-4
                py-2
                text-sm text-gray-700
                hover:bg-gray-100
                focus:outline-none
              "
              role="menuitem"
              to="/auth/logout"
            >
              Sign out
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  computed,
  useRouter,
} from '@nuxtjs/composition-api'
import { mainStore } from '@/module/Pinia'

export default defineComponent({
  name: 'Header',
  setup(_props, ctx) {
    const context = useContext()
    const userMenu = ref(false)
    const router = useRouter()

    const showMobileSidebar = () => {
      ctx.emit('show')
    }
    const appStore = mainStore()
    const auth: any = appStore.getLoggedInUser

    const title = computed(() => {
      const path: String = context.route.value.path
      const splitPath: any = path.split('/')
      const filterPaths = splitPath.filter((element: String) => {
        return element !== ''
      })
      const lastPath: String = filterPaths[filterPaths.length - 1]
      return lastPath
    })

    const showBackButtons = [
      'vehicle-performance-main',
      'corrective-maintenance-main',
      'new-product',
      'cylinder-type',
    ]

    const goBack = () => {
      router.go(-1)
    }

    return {
      userMenu,
      showMobileSidebar,
      auth,
      title,
      showBackButtons,
      goBack,
    }
  },
})
</script>
