<template>
  <div class="flex flex-1 h-full">
    <form class="w-full flex md:ml-0" autocomplete="off">
      <label for="search_field" class="sr-only">Search</label>
      <div class="relative w-full text-gray-400 focus-within:text-gray-600">
        <div
          class="
            absolute
            inset-y-0
            left-0
            ml-4
            flex
            items-center
            pointer-events-none
          "
        >
          <!-- Heroicon name: solid/search -->
          <svg
            class="h-5 w-5 fill-current text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M12.9 14.32a8 8 0 111.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 108 2a6 6 0 000 12z"
            />
          </svg>
        </div>
        <input
          v-model="searchValue"
          class="
            block
            border
            rounded-sm
            border-gray-300
            w-96
            lg:w-full
            h-full
            text-gray-900
            placeholder-gray-500
            focus:outline-none focus:placeholder-gray-400 focus:ring-0
            px-10
            py-3
            sm:text-sm
          "
          :placeholder="placeHolder"
          type="search"
          @input="emitSearch($event)"
        />
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { debounce } from 'lodash'
export default defineComponent({
  props: {
    placeHolder: {
      type: String,
      required: false,
      default: 'Search',
    },
  },
  setup(_props, ctx) {
    const searchValue = ref<String>('')

    const emitSearch = debounce(
      () => ctx.emit('search', searchValue.value),
      1000
    )

    return {
      searchValue,
      emitSearch,
    }
  },
})
</script>
