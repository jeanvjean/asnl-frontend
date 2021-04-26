<template>
  <div class="overflow-x-auto w-full py-4">
    <div class="w-full mb-4">
      <div class="flex items-center justify-between py-2 w-full">
        <div
          class="flex items-center border-2 border-gray-300 justify-around space-x-2 text-gray-500"
        >
          <svg
            class="w-4 h-4 ml-2 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M17 16v4h-2v-4h-2v-3h6v3h-2zM1 9h6v3H1V9zm6-4h6v3H7V5zM3 0h2v8H3V0zm12 0h2v12h-2V0zM9 0h2v4H9V0zM3 12h2v8H3v-8zm6-4h2v12H9V8z"
            />
          </svg>
          <select
            class="border-l-2 border-t-0 border-b-0 border-r-0 border-gray-300"
          >
            <option value="">Filter By</option>
          </select>
        </div>

        <div class="flex space-x-4 py-2">
          <form class="w-full flex md:ml-0">
            <label for="search_field" class="sr-only">Search</label>
            <div
              class="relative w-full text-gray-400 focus-within:text-gray-600"
            >
              <div
                class="absolute inset-y-0 left-0 ml-4 flex items-center pointer-events-none"
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
                class="block border rounded-sm border-gray-300 w-full text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 px-10 py-4 sm:text-sm"
                placeholder="Search for Users"
                type="search"
                name="search"
              />
            </div>
          </form>
          <button class="bg-gray-200 rounded-sm px-6 py-4">
            <svg
              class="fill-current w-4 h-4 text-black"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M16.88 9.1A4 4 0 0116 17H5a5 5 0 01-1-9.9V7a3 3 0 014.52-2.59A4.98 4.98 0 0117 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
              />
            </svg>
          </button>
          <button
            class="flex items-center bg-purple-600 px-4 space-x-2 h-auto text-white font-semibold text-md rounded-sm"
            @click="show"
          >
            <svg
              class="w-3 h-3 fill-current text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 341.4 341.4"
            >
              <path
                d="M192 149.4V0h-42.6v149.4H0V192h149.4v149.4H192V192h149.4v-42.6z"
              />
            </svg>
            <span class="text-sm">Create</span>
          </button>
        </div>
      </div>
    </div>
    <table class="w-full table-auto">
      <thead class="bg-gray-200">
        <tr>
          <th class="w-6 px-6 py-4">
            <input type="checkbox" class="border border-gray-500 rounded" />
          </th>
          <th
            v-for="(headSingle, index) in head"
            :key="index"
            class="uppercase text-gray-800 font-thin text-sm px-4 py-2 text-left"
          >
            {{ headSingle }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(bodySingle, index) in body" :key="index" class="font-light">
          <td class="w-6 px-6 py-4">
            <input type="checkbox" class="border-2 border-gray-400 rounded" />
          </td>
          <td class="px-4 text-left py-4">
            <span>{{ bodySingle.cylinder_number }}</span>
          </td>
          <td class="px-4 text-left py-4">{{ bodySingle.gas_type }}</td>
          <td class="px-4 text-left py-4">{{ bodySingle.volume }}</td>
          <td class="px-4 text-left py-4">{{ bodySingle.capacity }}</td>
          <td class="px-4 text-left py-4">
            <span class="px-8 py-2 bg-green-100 text-green-400">{{
              bodySingle.type
            }}</span>
          </td>
          <td class="px-4 text-left py-4">{{ bodySingle.date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    head: {
      type: Array,
      required: true,
    },
    body: {
      type: Array,
      required: true,
    },
  },
  setup(_props, ctx) {
    const show = () => {
      ctx.emit('show')
    }

    return {
      show,
    }
  },
})
</script>

<style scoped>
.action-menu {
  display: none;
}
.icon-button:hover ~ .action-menu {
  display: block;
}
.icon-button:focus ~ .action-menu {
  display: block;
}
</style>
