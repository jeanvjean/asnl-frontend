<template>
  <div>
    <div class="py-4">
      <h2 class="text-lg font-light my-4 px-8">Customer Details</h2>
      <div class="flex items-center space-x-4 px-8">
        <div class="flex-initial">
          <svg
            class="
              text-btn-purple
              mr-3
              h-10
              w-10
              fill-current
              bg-gray-400 bg-opacity-25
              rounded-full
              p-2
            "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 452.608 452.608"
          >
            <path
              d="M285.184 92.672V63.488h6.656c17.408 0 31.744-14.336 31.744-31.744S309.248 0 291.84 0H160.768c-17.408 0-31.744 14.336-31.744 31.744s14.336 31.744 31.744 31.744h6.656v29.184c-38.912 2.56-69.12 34.816-69.12 73.728v80.384h256V166.4c0-38.912-30.208-71.168-69.12-73.728zm-25.6-.512h-20.48V80.896h-25.6V92.16h-20.48V62.976h66.56V92.16zM98.304 272.384v81.92c0 28.16 15.872 53.76 40.96 66.56v31.744h174.08v-31.744c25.088-12.8 40.96-38.4 40.96-66.56v-81.92h-256z"
            />
          </svg>
        </div>
        <div class="flex-1">
          <h3 class="font-semibold text-lg">Lagos State Teaching Hospital</h3>
          <span class="font-medium text-sm"
            >2, Herbert Macauly Way, Yaba, Lagos</span
          >
        </div>
      </div>
      <div class="w-full mt-10">
        <table class="w-full">
          <thead class="bg-gray-200">
            <tr>
              <th
                class="
                  text-left
                  uppercase
                  font-extralight
                  text-sm
                  px-4
                  py-3
                  text-black
                "
              >
                Order Details
              </th>
              <th
                class="
                  text-center
                  uppercase
                  font-extralight
                  text-sm
                  px-4
                  py-3
                  text-black
                "
              >
                Qty
              </th>
              <th
                class="
                  text-left
                  uppercase
                  font-extralight
                  text-sm
                  px-4
                  py-3
                  text-black
                "
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr v-for="(row, index) in tableRows" :key="index">
              <td class="text-left capitalize font-light text-md px-6 py-4">
                {{ row.order }}
              </td>
              <td class="text-center capitalize font-light text-md px-4 py-4">
                {{ row.quantity }}
              </td>
              <td class="text-left px-4 py-4">
                <div class="flex justify-between items-center w-4/5">
                  <button
                    class="
                      border border-btn-purple
                      text-btn-purple
                      rounded-sm
                      px-6
                      py-1
                    "
                    @click="showProduction = !showProduction"
                  >
                    Send to Production
                  </button>
                  <button
                    class="
                      border border-btn-purple
                      text-btn-purple
                      rounded-sm
                      px-8
                      py-1
                    "
                    @click="showSupplier = !showSupplier"
                  >
                    External Supplier
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="bg-gray-200 w-full h-12 block"></div>
      </div>
    </div>
    <send-to-production
      v-if="showProduction"
      @close="showProduction = !showProduction"
    />
    <external-supplier
      v-if="showSupplier"
      @close="showSupplier = !showSupplier"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import SendToProduction from '@/components/Overlays/SendToProduction.vue'
import ExternalSupplier from '@/components/Overlays/ExternalSupplier.vue'
export default defineComponent({
  components: { SendToProduction, ExternalSupplier },
  layout: 'noSidebar',
  setup() {
    const tableRows = [
      {
        order: 'Argon - 6kg',
        quantity: 4,
      },
      {
        order: 'Oxygen - 10kg',
        quantity: 16,
      },
      {
        order: 'Acetylene - 5kg',
        quantity: 8,
      },
      {
        order: 'Propane - 9kg',
        quantity: 2,
      },
    ]

    const showProduction = ref<Boolean>(false)
    const showSupplier = ref<Boolean>(false)

    return {
      tableRows,
      showProduction,
      showSupplier,
    }
  },
})
</script>
