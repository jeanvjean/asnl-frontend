<template>
  <div class="overflow-x-auto w-full py-2 px-2">
    <div class="overflow-x-auto w-full">
      <table class="table-fixed w-full">
        <thead class="bg-gray-200">
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
                py-3
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
                py-3
                text-center
                sm:w-40
                2xl:w-32
              "
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody v-if="!showLoader">
          <tr
            v-for="(bodySingle, index) in body"
            :key="index"
            class="font-light hover:bg-gray-100"
          >
            <td class="px-4 text-center py-4">
              <span>{{
                bodySingle.assignedNumber
                  ? bodySingle.assignedNumber
                  : 'Unassigned'
              }}</span>
            </td>
            <td class="px-4 text-center py-4">
              {{ bodySingle.gasType.gasName }}
            </td>
            <td class="px-4 text-center py-4">
              {{ bodySingle.gasVolumeContent.value }}
            </td>
            <td class="px-4 text-center py-4 w-full">
              <span
                :class="getColorCode(bodySingle.cylinderType)"
                class="px-8 py-2 w-full block text-center capitalize"
                >{{ bodySingle.cylinderType }}</span
              >
            </td>
            <td class="px-4 py-4 text-center">
              <router-link
                class="
                  block
                  px-6
                  py-2
                  text-center text-btn-purple
                  bg-white
                  border border-btn-purple
                  rounded-sm
                  w-full
                  overflow-none
                  font-medium
                  text-xs
                "
                :to="'/dashboard/cylinders/cylinder/' + bodySingle._id"
              >
                View Cylinder</router-link
              >
            </td>
          </tr>
        </tbody>
      </table>
      <table-loader v-if="showLoader" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import TableLoader from '@/components/TableLoader.vue'
import { formatDate } from '@/constants/utils'

export default defineComponent({
  components: { TableLoader },
  props: {
    head: {
      type: Array,
      required: true,
    },
    body: {
      type: Array,
      required: true,
    },
    showLoader: Boolean,
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

    return {
      show,
      formatDate,
      getColorCode,
    }
  },
})
</script>
