<template>
  <back-drop>
    <div class="w-full lg:w-3/5 bg-white rounded-sm">
      <div class="rounded-sm">
        <div class="flex justify-between items-center bg-white py-4 px-8">
          <h1>Recieve Products</h1>
          <div class="flex space-x-8 items-center">
            <button
              class="
                flex
                space-x-4
                py-2
                px-4
                items-center
                bg-btn-purple
                rounded-sm
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 fill-current text-btn-purple"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              <span class="text-white font-medium text-sm">Print a copy</span>
            </button>
            <svg
              class="w-6 h-6 fill-current text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              @click="close"
            >
              <path
                d="M2.93 17.07A10 10 0 1117.07 2.93 10 10 0 012.93 17.07zM11.4 10l2.83-2.83-1.41-1.41L10 8.59 7.17 5.76 5.76 7.17 8.59 10l-2.83 2.83 1.41 1.41L10 11.41l2.83 2.83 1.41-1.41L11.41 10z"
              />
            </svg>
          </div>
        </div>
        <div class="bg-white py-6 px-8 space-y-4">
          <div class="flex justify-between items-center text-md">
            <div>
              <span class="font-semibold text-lg">GRN:</span>
              <span class="font-medium text-base text-gray-800">{{
                inventory.grnNo
              }}</span>
            </div>
            <div class="flex space-x-2 items-center">
              <span class="font-semibold text-lg">Date:</span>
              <div class="flex space-x-2 items-center">
                <span>{{
                  new Date(inventory.dateReceived).toDateString()
                }}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 fill-current text-white"
                  viewBox="0 0 24 24"
                  stroke="black"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div class="grid grid-rows-1 lg:grid-cols-4 gap-x-4 items-center">
            <div class="px-4 py-1 w-full text-center">
              <p class="text-center">Supplier</p>
              <p>{{ inventory.supplier }}</p>
            </div>
            <div class="px-4 py-1 w-full border-l border-gray-400 text-center">
              <p class="text-center">LPO Number</p>
              <p>{{ inventory.LPOnumber }}</p>
            </div>
            <div class="px-4 py-1 border-l border-gray-400 w-full text-center">
              <p class="text-center">Waybill Number</p>
              <p>{{ inventory.wayBillNumber }}</p>
            </div>
            <div class="px-4 py-1 border-l border-gray-400 w-full text-center">
              <p class="text-center">Invoice Number</p>
              <p>{{ inventory.invoiceNumber }}</p>
            </div>
          </div>
          <div class="w-full overflow-x-hidden px-2">
            <table class="w-full table table-auto border-collapse">
              <thead>
                <tr>
                  <th
                    class="
                      px-2
                      py-2
                      font-medium
                      text-gray-600
                      capitalize
                      text-center text-xs
                      w-auto
                      px-2
                    "
                  >
                    S/N
                  </th>
                  <th
                    class="
                      py-2
                      font-medium
                      text-gray-600
                      capitalize
                      text-sm
                      w-2/12
                    "
                  >
                    Product Number
                  </th>
                  <th
                    class="
                      py-2
                      font-medium
                      text-gray-600
                      capitalize
                      text-sm
                      w-2/12
                    "
                  >
                    Product Name
                  </th>
                  <th
                    class="
                      py-2
                      font-medium
                      text-gray-600
                      capitalize
                      text-sm
                      w-1/12
                    "
                  >
                    Quantity
                  </th>
                  <th
                    class="
                      py-2
                      font-medium
                      text-gray-600
                      capitalize
                      text-sm
                      w-1/12
                    "
                  >
                    Passed
                  </th>
                  <th
                    class="
                      py-2
                      font-medium
                      text-gray-600
                      capitalize
                      text-sm
                      w-1/12
                    "
                  >
                    Rejected
                  </th>
                  <th
                    class="
                      py-2
                      font-medium
                      text-gray-600
                      capitalize
                      text-sm
                      w-1/12
                    "
                  >
                    Unit Cost
                  </th>
                  <th
                    class="
                      py-2
                      font-medium
                      text-gray-600
                      capitalize
                      text-sm
                      w-2/12
                    "
                  >
                    Total Cost
                  </th>
                  <th
                    class="
                      py-2
                      font-medium
                      text-gray-600
                      capitalize
                      text-sm
                      w-2/12
                    "
                  >
                    Comment
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(detail, index) in inventory.products"
                  :key="index"
                  class="hover:bg-gray-100"
                >
                  <td class="text-center">{{ Number(index) + 1 }}</td>
                  <td class="py-3 border border-gray-600 text-center">
                    {{ detail.productNumber }}
                  </td>
                  <td class="py-3 border border-gray-600 text-center">
                    {{ detail.productName }}
                  </td>
                  <td class="py-3 border border-gray-600 text-center">
                    {{ detail.quantity }}
                  </td>
                  <td class="py-3 border border-gray-600 text-center">
                    {{ detail.passed }}
                  </td>
                  <td class="py-3 border border-gray-600 text-center">
                    {{ detail.rejected }}
                  </td>
                  <td class="py-3 border border-gray-600 text-center">
                    {{ detail.unitCost }}
                  </td>
                  <td class="py-3 border border-gray-600 text-center">
                    {{ detail.totalCost }}
                  </td>
                  <td class="py-3 border border-gray-600 text-center">
                    {{ detail.comment }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="w-full px-4 h-full mx-auto my-10">
            <div class="flex items-start py-2 px-8 float-right">
              <div class="rounded-sm border-2 border-gray300 px-10 mx-auto">
                <p class="text-gray-500 text-sm font-medium leading-6">
                  Inspecting officer
                </p>
                <div class="flex items-start space-x-2 py-2">
                  <img
                    class="h-10 w-10 rounded-full"
                    src="@/assets/images/default-avatar.jpg"
                    alt=""
                  />
                  <div>
                    <p class="text-black text-lg capitalize">{{ user.name }}</p>
                    <p class="text-gray-600 text-sm capitalize">
                      {{ user.role }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form
            v-if="
              user.role === 'sales' && user.subrole === 'head of department'
            "
            autocomplete="off"
            @submit.prevent="grnApproval()"
          >
            <div
              class="
                my-10
                w-full
                lg:w-2/5 lg:flex lg:justify-between lg:items-center lg:space-x-6
                px-4
              "
            >
              <button-component
                :button-text="'Approve'"
                :button-class="'bg-btn-purple text-white w-auto'"
                :loading-status="buttonLoading.approveLoading"
                @buttonClicked="form.status = 'approved'"
              />
              <button-component
                :button-text="'Reject'"
                :button-class="'text-white bg-gray-700 w-auto'"
                :loading-status="buttonLoading.rejectLoading"
                @buttonClicked="form.status = 'rejected'"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </back-drop>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive } from '@nuxtjs/composition-api'
import BackDrop from '@/components/Base/Backdrop.vue'
import { mainStore } from '@/module/Pinia'
import ButtonComponent from '@/components/Form/Button.vue'
import { ProductObject } from '@/module/Product'

export default defineComponent({
  components: {
    BackDrop,
    ButtonComponent,
  },
  props: {
    inventory: {
      type: Object,
      required: true,
    },
  },
  setup(_props, ctx) {
    const close = () => {
      ctx.emit('close')
    }

    const refresh = () => {
      ctx.emit('refresh')
    }

    const buttonLoading = reactive({
      approveLoading: false,
      rejectLoading: false,
    })

    const form = reactive({
      status: '',
      grnId: '',
    })

    onMounted(() => {
      form.grnId = _props.inventory._id
    })

    function grnApproval() {
      buttonLoading.approveLoading = form.status === 'approved'
      buttonLoading.rejectLoading = form.status === 'rejected'
      ProductObject.approveGrn(form)
        .then(() => {
          refresh()
        })
        .finally(() => {
          buttonLoading.approveLoading = false
          buttonLoading.rejectLoading = false
        })
    }

    const { getLoggedInUser: user } = mainStore()

    return {
      close,
      user,
      buttonLoading,
      form,
      grnApproval,
    }
  },
})
</script>
