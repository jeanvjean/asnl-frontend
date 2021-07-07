<template>
  <div class="overflow-x-auto w-full py-2 px-2">
    <div class="overflow-x-auto w-full">
      <table class="table-fixed w-full">
        <thead class="bg-gray-100">
          <tr class="space-x-4">
            <th
              v-for="(headSingle, index) in head"
              :key="index"
              class="
                uppercase
                text-gray-800
                font-thin
                text-sm
                px-4
                py-2
                text-center
                w-40
              "
            >
              {{ headSingle }}
            </th>
            <th
              class="
                uppercase
                text-gray-800
                font-thin
                text-sm
                px-4
                py-2
                text-center
                sm:w-40
                2xl:w-32
              "
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(bodySingle, index) in body"
            :key="index"
            class="font-light hover:bg-gray-100"
          >
            <td class="px-4 text-center py-4">
              <span>{{
                bodySingle.assignedNumber
                  ? bodySingle.assignedNumber
                  : bodySingle.cylinderNumber
                  ? bodySingle.cylinderNumber
                  : ''
              }}</span>
            </td>
            <td class="px-4 text-center py-4">
              {{ bodySingle.gasType.gasName }}
            </td>
            <td class="px-4 text-center py-4">
              {{ bodySingle.gasVolumeContent }}
            </td>
            <td class="px-4 text-center py-4">
              {{ bodySingle.waterCapacity }}
            </td>
            <td class="px-4 text-center py-4 w-full">
              <div>
                <span
                  :class="getColorCode(bodySingle.cylinderType)"
                  class="px-8 py-2 w-full block text-center capitalize"
                  >{{ bodySingle.cylinderType }}</span
                >
              </div>
            </td>
            <td class="px-4 text-center py-4">
              {{ formatDate(bodySingle.dateManufactured) }}
            </td>
            <td class="px-4 py-4 icon-button text-center">
              <button class="mx-auto text-black w-6 h-6 relative">
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
                class="
                  absolute
                  -ml-4
                  bg-gray-50
                  border border-gray-300
                  w-40
                  font-medium
                  text-sm
                  rounded-sm
                  action-menu
                  z-10
                "
              >
                <router-link
                  class="
                    block
                    px-6
                    py-2
                    text-center text-black
                    focus:outline-none
                    hover:bg-purple-300
                    hover:text-white
                    w-full
                    overflow-none
                    font-medium
                    text-xs
                  "
                  :to="
                    '/dashboard/cylinder-management/cylinder/' + bodySingle._id
                  "
                >
                  View Cylinder</router-link
                >
                <router-link
                  class="
                    block
                    px-6
                    py-2
                    text-center text-black
                    focus:outline-none
                    hover:bg-purple-300
                    hover:text-white
                    w-full
                    overflow-none
                    font-medium
                    text-xs
                  "
                  :to="'/dashboard/cylinder-management/type/' + bodySingle._id"
                >
                  Change Cylinder Type</router-link
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
    const rolesColor: any = {
      assigned: 'bg-blue-100 text-blue-400',
      buffer: 'bg-green-100 text-green-400',
    }

    function getColorCode(role: any) {
      return rolesColor[role] ?? rolesColor.default
    }

    function formatDate(dateValue: string) {
      const date = new Date(dateValue)
      const year = date.getFullYear()
      let month: any = date.getMonth() + 1
      let dt: any = date.getDate()

      if (dt < 10) {
        dt = '0' + dt
      }
      if (month < 10) {
        month = '0' + month
      }

      return year + '-' + month + '-' + dt
    }
    return {
      show,
      formatDate,
      getColorCode,
    }
  },
})
</script>

<style scoped>
.action-menu {
  display: none;
}
.icon-button:hover > .action-menu {
  display: block;
}
.icon-button:focus > .action-menu {
  display: block;
}
</style>
