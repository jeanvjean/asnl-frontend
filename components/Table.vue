<template>
  <div class="w-full overflow-x-auto">
    <table class="table table-auto w-full">
      <thead class="bg-gray-100">
        <tr>
          <th
            class="
              uppercase
              text-gray-800
              font-thin
              text-sm
              px-3
              py-3
              text-center
            "
          >
            #
          </th>
          <th
            v-for="(headSingle, index) in tableHeaders"
            :key="index"
            class="
              uppercase
              text-gray-800
              font-thin
              text-sm
              px-3
              py-3
              text-center
            "
          >
            {{ headSingle }}
          </th>
          <th
            class="
              uppercase
              text-gray-800
              font-light
              text-sm
              px-6
              py-2
              text-center
            "
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody v-if="!showLoader">
        <tr
          v-for="(rows, index) in tableBody"
          :key="index"
          class="font-extralight hover:bg-gray-100 text-sm"
        >
          <td class="py-4 text-center">
            {{ index + 1 }}
          </td>
          <td
            v-for="(rowSingle, j) in rows"
            :key="j"
            class="py-4 text-center"
            :class="rowSingle.tdClass"
          >
            <span :class="rowSingle.class ? rowSingle.class : ''">
              {{ rowSingle.value }}
            </span>
          </td>
          <td class="text-center icon-button">
            <slot
              name="action"
              :rowId="getRowId(rows)"
              :rowObject="getRowObject(rows)"
            ></slot>
          </td>
        </tr>
      </tbody>
    </table>
    <table-loader v-if="showLoader" />
    <default-state v-else-if="showLoader == false && !tableBody.length" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import TableLoader from '@/components/TableLoader.vue'
import DefaultState from '@/components/DefaultState.vue'
import { rowType } from '@/constants/utils'

export default defineComponent({
  components: { TableLoader, DefaultState },
  props: {
    tableHeaders: {
      type: Array,
      required: true,
    },
    tableBody: {
      type: Array,
      required: true,
    },
    showLoader: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const getRowId = (row: any) => {
      let id: string = ''
      row.forEach((element: any) => {
        if (element.name === '_id') {
          id = element.value
        }
      })
      return id
    }

    const getRowObject = (tableRow: Array<rowType>) => {
      const finalObject: any = {}
      tableRow.forEach((rowIn: any) => {
        finalObject[rowIn.name] = rowIn.value
      })
      return finalObject
    }

    return {
      getRowId,
      getRowObject,
    }
  },
})
</script>
