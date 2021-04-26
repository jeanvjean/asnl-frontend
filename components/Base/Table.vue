<template>
  <div class="overflow-x-auto w-full py-4">
    <div class="w-full mb-4">
      <div class="flex items-center justify-around px-2 py-2 space-x-4 w-full">
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
        <search-component :place-holder="'Search for User'" />

        <AddUserButton />
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
          <th
            class="uppercase text-gray-800 font-thin text-sm px-4 py-2 text-left"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(bodySingle, index) in body" :key="index" class="font-light">
          <td class="w-6 px-6 py-4">
            <input type="checkbox" class="border-2 border-gray-400 rounded" />
          </td>
          <td class="px-4 text-left py-4">
            <div class="flex items-center space-x-4">
              <img
                class="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=ZIOeP15SMT&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              /><span>{{ bodySingle.name }}</span>
            </div>
          </td>
          <td class="px-4 text-left py-4">{{ bodySingle.phone }}</td>
          <td class="px-4 text-left py-4">{{ bodySingle.email }}</td>
          <td class="px-4 text-left py-4">
            <span class="px-8 py-2 bg-green-100 text-green-400">{{
              bodySingle.role
            }}</span>
          </td>
          <td class="px-4 py-4">
            <button class="mx-auto text-black w-6 h-6 relative icon-button">
              <svg
                class="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M4 12a2 2 0 110-4 2 2 0 010 4zm6 0a2 2 0 110-4 2 2 0 010 4zm6 0a2 2 0 110-4 2 2 0 010 4z"
                />
              </svg>
            </button>
            <div
              class="absolute -ml-16 bg-gray-50 border border-gray-300 w-40 font-light text-sm rounded-md action-menu z-10"
            >
              <button
                class="block px-3 py-4 text-black focus:outline-none hover:bg-purple-300 hover:text-purple-500 w-full overflow-none"
              >
                Change Role
              </button>
              <button
                class="block px-3 py-4 text-black focus:outline-none hover:bg-purple-300 hover:text-purple-500 w-full overflow-none"
              >
                Delete User
              </button>
              <button
                class="block px-3 py-4 text-black focus:outline-none hover:bg-purple-300 hover:text-purple-500 w-full overflow-none"
              >
                Suspend User
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import AddUserButton from '@/components/Clickables/AddUser.vue'
import SearchComponent from '@/components/Base/Search.vue'

export default defineComponent({
  components: { AddUserButton, SearchComponent },
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
