<template>
  <back-drop>
    <div :key="componentKey" class="w-full lg:w-3/5 bg-white rounded-sm">
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
              <span>GRN:</span>
              <span></span>
            </div>
            <div class="flex space-x-2 items-center">
              <span>Date:</span>
              <div class="flex space-x-2 items-center">
                <span>{{ new Date().toDateString() }}</span>
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
            <input-component
              :label-title="'Supplier'"
              :input-placeholder="'Enter Supplier'"
              :default-value="form.supplier"
              @get="form.supplier = $event.value"
            />
            <div
              class="
                lg:col-span-3
                flex
                justify-between
                items-center
                space-x-4
                w-full
                h-full
                px-6
                py-4
              "
            >
              <div class="px-4 py-1 w-full text-center">
                <p class="text-left">LPO Number</p>
                <input-component
                  :input-placeholder="'Enter LPO Number'"
                  :default-value="form.LPOnumber"
                  @get="form.LPOnumber = $event.value"
                />
              </div>
              <div
                class="px-4 py-1 border-l border-gray-400 w-full text-center"
              >
                <p class="text-left">Waybill Number</p>
                <input-component
                  :input-placeholder="'000000000000'"
                  :default-value="form.wayBillNumber"
                  @get="form.wayBillNumber = $event.value"
                />
              </div>
              <div
                class="px-4 py-1 border-l border-gray-400 w-full text-center"
              >
                <p class="text-left">Invoice Number</p>
                <input-component
                  :input-placeholder="'000000000000'"
                  :default-value="form.invoiceNumber"
                  @get="form.invoiceNumber = $event.value"
                />
              </div>
            </div>
          </div>
          <div class="w-full overflow-x-auto">
            <table class="w-full table border-separate">
              <thead>
                <tr>
                  <th
                    class="
                      px-4
                      py-2
                      font-medium
                      text-gray-600
                      uppercase
                      text-center text-sm
                    "
                  >
                    S/N
                  </th>
                  <th
                    class="
                      px-4
                      py-2
                      font-medium
                      text-gray-600
                      uppercase
                      text-sm
                    "
                  >
                    Product Name
                  </th>
                  <th
                    class="
                      px-4
                      py-2
                      font-medium
                      text-gray-600
                      uppercase
                      text-sm
                    "
                  >
                    Product Number
                  </th>
                  <th
                    class="
                      px-4
                      py-2
                      font-medium
                      text-gray-600
                      uppercase
                      text-sm
                    "
                  >
                    Qty
                  </th>
                  <th
                    class="
                      px-4
                      py-2
                      font-medium
                      text-gray-600
                      uppercase
                      text-sm
                    "
                  >
                    Passed
                  </th>
                  <th
                    class="
                      px-4
                      py-2
                      font-medium
                      text-gray-600
                      uppercase
                      text-sm
                    "
                  >
                    Rejected
                  </th>
                  <th
                    class="
                      px-4
                      py-2
                      font-medium
                      text-gray-600
                      uppercase
                      text-sm
                    "
                  >
                    Unit Cost
                  </th>
                  <th
                    class="
                      px-4
                      py-2
                      font-medium
                      text-gray-600
                      uppercase
                      text-sm
                    "
                  >
                    Total Cost
                  </th>
                  <th
                    class="
                      px-4
                      py-2
                      font-medium
                      text-gray-600
                      uppercase
                      text-sm
                    "
                  >
                    Comment
                  </th>
                  <th
                    class="
                      px-4
                      py-2
                      font-medium
                      text-gray-600
                      uppercase
                      text-sm
                    "
                  ></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(product, i) in products"
                  :key="i"
                  class="hover:bg-gray-100"
                >
                  <td class="text-center">{{ Number(i) + 1 }}</td>
                  <td>
                    <input-component
                      :input-placeholder="'Enter Product Name'"
                      :default-value="product.productName"
                      @get="product.productName = $event.value"
                    />
                  </td>

                  <td>
                    <input-component
                      :input-placeholder="'Enter Product Number'"
                      :default-value="product.productNumber"
                      @get="product.productNumber = $event.value"
                    />
                  </td>

                  <td>
                    <input-component
                      :input-placeholder="'Enter Quantity'"
                      :default-value="product.quantity"
                      :input-type="'number'"
                      @get="product.quantity = $event.value"
                    />
                  </td>
                  <td>
                    <input-component
                      :input-placeholder="'#'"
                      :default-value="product.passed"
                      :input-type="'number'"
                      @get=";(product.passed = $event.value), changeTotalCost()"
                    />
                  </td>
                  <td>
                    <input-component
                      :input-placeholder="'#'"
                      :default-value="product.rejected"
                      :input-type="'number'"
                      @get="product.rejected = $event.value"
                    />
                  </td>
                  <td>
                    <input-component
                      :input-placeholder="'#'"
                      :default-value="product.unitCost"
                      :input-type="'number'"
                      @get="
                        ;(product.unitCost = $event.value), changeTotalCost()
                      "
                    />
                  </td>
                  <td>
                    <input-component
                      :input-placeholder="'#'"
                      :default-value="product.totalCost"
                      :input-type="'number'"
                      :is-disabled="true"
                    />
                  </td>
                  <td>
                    <input-component
                      :input-placeholder="'Enter Comment'"
                      :default-value="product.comment"
                      @get="product.comment = $event.value"
                    />
                  </td>
                  <td class="text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="fill-current text-transparent w-4 h-4"
                      viewBox="0 0 24 24"
                      stroke="black"
                      @click="decreaseCounter(i)"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex justify-between items-start w-11/12 h-full mx-auto">
            <div class="w-full mx-auto h-full">
              <button
                class="flex items-center space-x-1"
                @click="increaseCounter"
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    class="w-4 h-4 fill-current text-gray-500"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div class="underline">Add New Product</div>
              </button>
            </div>
            <div class="w-full h-full py-2 px-8 mx-auto">
              <button
                class="
                  w-4/5
                  h-full
                  border-2 border-gray-300
                  px-6
                  py-3
                  rounded-sm
                  file-select
                "
              >
                <div class="text-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    class="w-6 h-6 fill-current text-gray-600 mx-auto"
                  >
                    <path
                      d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"
                    />
                    <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
                  </svg>
                </div>
                <div class="text-center font-medium">Upload an attachment</div>
                <input type="file" />
              </button>
            </div>

            <div class="flex items-start py-2 px-10 w-full">
              <div class="rounded-sm border border-gray-300 px-10 mx-auto">
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
          <div
            class="
              w-full
              lg:w-3/5
              lg:flex
              lg:justify-between
              lg:items-center
              lg:space-x-6
              mt-10
            "
          >
            <button
              class="px-8 py-2 rounded-sm bg-btn-purple text-white w-full"
              @click="submitForm"
            >
              Recieve Product
            </button>
            <button
              class="
                px-8
                py-2
                rounded-sm
                bg-white
                text-purple
                border border-btn-purple
                w-full
              "
              @click="close"
            >
              Cancel
            </button>
          </div>
          <file-input v-if="false" />
        </div>
      </div>
    </div>
  </back-drop>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import BackDrop from '@/components/Base/Backdrop.vue'
import InputComponent from '@/components/Form/Input.vue'
import { ProductObject } from '@/module/Product'
import { mainStore } from '@/module/Pinia'
import FileInput from '@/components/Form/FileInput.vue'

export default defineComponent({
  components: {
    BackDrop,
    InputComponent,
    FileInput,
  },
  setup(_props, ctx) {
    const close = () => {
      ctx.emit('close')
    }
    const count = ref(0)
    const form = reactive({
      supplier: '',
      LPOnumber: '',
      wayBillNumber: '',
      invoiceNumber: '',
    })

    const appStore = mainStore()
    const user: any = appStore.getLoggedInUser

    const products = ref<any>([])

    const componentKey = ref<number>(0)

    const context = useContext()

    const increaseCounter = () => {
      products.value.push({
        productNumber: '',
        productName: '',
        quantity: '0',
        passed: '0',
        rejected: '0',
        unitCost: '0',
        totalCost: '0',
        comment: '',
      })
    }

    function decreaseCounter(index: any) {
      products.value.splice(index, 1)
      componentKey.value++
    }

    function changeTotalCost() {
      products.value.forEach((element: any) => {
        const totalCost = String(
          Number(element.passed) * Number(element.unitCost)
        )
        element.totalCost = totalCost
      })
      componentKey.value++
    }

    const submitForm = async () => {
      if (
        !form.supplier ||
        !form.LPOnumber ||
        !form.invoiceNumber ||
        !form.wayBillNumber
      ) {
        context.$toast.error('All Fields are Required')
      } else if (!products.value.length) {
        context.$toast.error('Minimum of One Product should be added')
      } else {
        let result = false
        products.value.forEach((element: any) => {
          const values = Object.values(element)
          result = values.every((val) => {
            return val !== ''
          })
        })

        if (result) {
          await ProductObject.registerInventory({
            products: products.value,
            supplier: form.supplier,
            LPOnumber: form.LPOnumber,
            invoiceNumber: form.invoiceNumber,
            wayBillNumber: form.wayBillNumber,
            dateReceived: new Date(),
            direction: 'out-going',
          }).then(() => {
            componentKey.value = 0
            ctx.emit('reload')
            close()
          })
        } else {
          context.$toast.error('All Fields are Required')
        }
      }
    }

    return {
      close,
      count,
      form,
      products,
      increaseCounter,
      decreaseCounter,
      submitForm,
      componentKey,
      user,
      changeTotalCost,
    }
  },
})
</script>

<style scoped>
.file-select > input[type='file'] {
  display: none;
}
</style>
