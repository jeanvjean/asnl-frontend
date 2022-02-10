<template>
  <div :key="componentKey" class="w-full md:w-10/12 lg:w-7/12 md:mx-auto mt-10">
    <div class="bg-white px-6 md:p-10 py-6">
      <div class="my-4">
        <h1 class="font-bold text-xl uppercase tracking-normal">New Invoice</h1>
      </div>
      <form autocomplete="off" method="POST" @submit.prevent="submit">
        <div
          class="
            w-full
            items-center
            grid grid-rows-1
            md:grid-cols-3 md:space-x-6
          "
        >
          <select-component
            :label-title="'Invoice Type'"
            :default-option-text="'Select Invoice Type'"
            :select-array="receiptTypes"
            :init-value="form.receiptType"
            @get="
              ;(form.receiptType = $event.value),
                changeHeaders(form.receiptType)
            "
          />
          <select-component
            :label-title="'Customer'"
            :default-option-text="'Select Customer'"
            :select-array="customerArray"
            :init-value="form.customer"
            @get="form.customer = $event.value"
          />
        </div>

        <div v-if="form.receiptType" class="w-full overflow-x-auto mt-10 mb-5">
          <table class="table w-full border-collapse text-gray-700">
            <thead>
              <tr>
                <th
                  class="w-auto text-center px-0.5 border border-black text-xs"
                >
                  S/N
                </th>
                <th
                  v-for="(head, index) in headers"
                  :key="index"
                  class="w-auto border border-black text-center"
                >
                  {{ head }}
                </th>
                <th class="w-auto px-1"></th>
              </tr>
            </thead>
            <tbody v-if="form.receiptType === 'cylinder'">
              <tr v-for="(cylinder, k) in cylinders" :key="k">
                <td class="text-center">{{ k + 1 }}</td>
                <td>
                  <select-component
                    :input-placeholder="'Gas Type'"
                    :init-value="cylinder.cylinderType"
                    :select-array="gasTypes"
                    :default-option-text="'Select Gas Type'"
                    @get="cylinder.cylinderType = $event.value"
                  />
                </td>
                <td>
                  <input-component
                    :input-placeholder="'Enter Volume'"
                    :default-value="cylinder.volume"
                    :input-type="'number'"
                    @get="cylinder.volume = $event.value"
                  />
                </td>
                <td>
                  <input-component
                    :input-placeholder="'Enter Quantity'"
                    :default-value="cylinder.noOfCylinders"
                    :input-type="'number'"
                    @get="
                      ;(cylinder.noOfCylinders = $event.value), updateAmount(k)
                    "
                  />
                </td>

                <td>
                  <input-component
                    :input-placeholder="'Enter Unit Price'"
                    :default-value="cylinder.unitPrice"
                    :input-type="'number'"
                    @get=";(cylinder.unitPrice = $event.value), updateAmount(k)"
                  />
                </td>
                <td>
                  <input-component
                    :input-placeholder="'Total Amount'"
                    :default-value="cylinder.amount"
                    :input-type="'number'"
                    :is-disabled="true"
                    @get="cylinder.amount = $event.value"
                  />
                </td>
                <td>
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      class="fill-current text-gray-600 w-4 h-4"
                      @click="removeItem(i, form.receiptType)"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
            <tbody v-else-if="form.receiptType === 'product'">
              <tr v-for="(product, j) in products" :key="j">
                <td class="text-center">{{ j + 1 }}</td>
                <td>
                  <select
                    v-model="product.productNumber"
                    class="
                      block
                      w-full
                      px-4
                      py-2
                      rounded-sm
                      font-semibold
                      focus:outline-none focus:border-btn-purple
                      placeholder-gray-400
                      focus:placeholder-gray-200
                      text-gray-900
                      border-2
                    "
                    @input="(e) => updateProductInfo(e, j)"
                  >
                    <option value="">Select Product</option>
                    <option
                      v-for="(prod, l) in productsArray"
                      :key="l"
                      :value="prod.value"
                    >
                      {{ prod.name }}
                    </option>
                  </select>
                </td>
                <td>
                  <input-component
                    :input-placeholder="'Quantity'"
                    :default-value="product.quantity"
                    :input-type="'number'"
                    @get=";(product.quantity = $event.value), updateAmount(j)"
                  />
                </td>
                <td>
                  <input-component
                    :input-placeholder="'Unit Price'"
                    :default-value="product.unitCost"
                    :input-type="'number'"
                    @get=";(product.unitCost = $event.value), updateAmount(j)"
                  />
                </td>
                <td>
                  <input-component
                    :input-placeholder="'Total Amount'"
                    :input-type="'number'"
                    :default-value="product.totalCost"
                    :is-disabled="true"
                    @get="product.totalCost = $event.value"
                  />
                </td>
                <td>
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      class="fill-current text-gray-600 w-4 h-4"
                      @click="removeItem(i)"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
            <tfoot v-if="cylinders.length || products.length">
              <tr>
                <td
                  :colspan="form.receiptType === 'cylinder' ? 5 : 4"
                  class="text-right py-2 pr-1 font-semibold"
                >
                  TOTAL(₦):
                </td>
                <td class="font-bold text-base border border-black pl-2 py-2">
                  ₦ {{ getTotal(form.receiptType) }}
                </td>
              </tr>
              <tr>
                <td
                  :colspan="form.receiptType === 'cylinder' ? 5 : 4"
                  class="text-right py-2 pr-1 font-semibold"
                >
                  AMOUNT PAID(₦):
                </td>
                <td class="font-bold text-base border border-black px-1">
                  <input-component
                    :input-placeholder="'Amount Paid'"
                    :input-type="'number'"
                    :default-value="form.amountPaid"
                    :is-disabled="false"
                    @get="form.amountPaid = $event.value"
                  />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div v-if="form.receiptType" class="inline-block text-sm text-gray-400">
          <button
            class="flex justify-evenly items-center"
            type="button"
            @click="incrementList(form.receiptType)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 fill-current text-transparent mr-2"
              viewBox="0 0 24 24"
              stroke="gray"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span class="underline">Add New Item</span>
          </button>
        </div>

        <div class="flex items-center w-1/2 space-x-4 my-10">
          <button-component
            :button-class="'bg-btn-purple text-white w-auto'"
            :button-text="'Submit'"
            :loading-status="buttonLoading"
          />
          <button-component
            :button-class="'text-btn-purple border border-btn-purple bg-white w-auto'"
            :button-text="'Cancel'"
          />
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  reactive,
  ref,
  useContext,
  useRouter,
} from '@nuxtjs/composition-api'
import Validator from 'validatorjs'
import { toWords } from 'number-to-words'
import ButtonComponent from '@/components/Form/Button.vue'
import InputComponent from '@/components/Form/Input.vue'
import SelectComponent from '@/components/Form/Select.vue'
import { getRandomValue } from '@/constants/utils'
import { CylinderController } from '@/module/Cylinder'
import { CustomerController } from '@/module/Customer'
import { ValidatorObject } from '@/module/Validation'
import { ProductObject } from '@/module/Product'
import { createInvoice } from '@/module/Account'
import { Invoice } from '@/types/Types'

export default defineComponent({
  components: {
    SelectComponent,
    ButtonComponent,
    InputComponent,
  },
  layout: 'dashboard',
  setup() {
    const form = reactive<any>({
      customer: '',
      receiptType: '',
      amountPaid: '0',
    })
    const componentKey = ref<Number>()

    const customerArray = ref<any>([])
    const context = useContext()
    const router = useRouter()

    const buttonLoading = ref<Boolean>(false)

    const receiptTypes = [
      {
        name: 'Cylinder',
        value: 'cylinder',
      },
      {
        name: 'Product',
        value: 'product',
      },
    ]

    const updateProductInfo = (event: any, index: any) => {
      products.value[index].productNumber = event.target.value
      products.value[index].productName =
        event.target.options[event.target.selectedIndex].text
    }

    const headers = ref<Array<String>>([])
    const products = ref<Array<any>>([])
    const cylinders = ref<Array<any>>([])
    const productsArray = ref<Array<any>>([])

    const changeHeaders = (receiptType: String) => {
      if (receiptType === 'cylinder') {
        headers.value = [
          'Gas Type',
          'Volume',
          'Unit Price',
          'Quantity',
          'Amount',
        ]
      } else if (receiptType === 'product') {
        headers.value = ['Product Number', 'Quantity', 'Unit Price', 'Amount']
      }
    }

    const incrementList = (receiptType: String) => {
      if (receiptType === 'cylinder') {
        cylinders.value.push({
          noOfCylinders: '0',
          volume: '0',
          unitPrice: '0',
          amount: '0',
          cylinderType: '',
        })
      } else if (receiptType === 'product') {
        products.value.push({
          productNumber: '',
          productName: '',
          quantity: '0',
          unitCost: '0',
          totalCost: '0',
        })
      }
    }

    const getTotal = (type: String): number => {
      let total: number = 0
      if (type === 'cylinder') {
        total = cylinders.value.reduce(
          (currentTotal, cylinder) =>
            Number(currentTotal) + Number(cylinder.amount),
          0
        )
      } else if (type === 'product') {
        total = products.value.reduce(
          (currentTotal, product) =>
            Number(currentTotal) + Number(product.totalCost),
          0
        )
      }

      return total
    }

    const gasTypes = ref([])

    const removeItem = (index: any, receiptType: String) => {
      if (receiptType === 'cylinder') {
        cylinders.value.splice(index, 1)
      } else if (receiptType === 'product') {
        products.value.splice(index, 1)
      }
      changeComponentKey()
    }

    const changeComponentKey = () => {
      componentKey.value = getRandomValue()
    }

    function getGasTypes() {
      CylinderController.getCylinders().then((response) => {
        const myResponse = response.data.data.cylinders
        gasTypes.value = myResponse.map((element: any) => {
          return {
            name: element.gasName,
            value: element.gasName,
          }
        })
      })
    }

    const fetchCustomers = () => {
      CustomerController.fetchUnPaginatedCustomers().then((response: any) => {
        customerArray.value = response.map((element: any) => {
          return {
            name: element.name,
            value: element.name,
          }
        })
      })
    }

    const fetchProducts = () => {
      ProductObject.fetchProductsUnPaginated().then((response) => {
        productsArray.value = response.map((product: any) => {
          return {
            name: product.productName,
            value: product.partNumber,
          }
        })
      })
    }

    const updateAmount = (index: any) => {
      if (form.receiptType === 'cylinder') {
        cylinders.value[index].amount =
          cylinders.value[index].noOfCylinders &&
          cylinders.value[index].unitPrice
            ? (
                Number(cylinders.value[index].noOfCylinders) *
                Number(cylinders.value[index].unitPrice)
              ).toString()
            : 0
      } else if (form.receiptType === 'product') {
        products.value[index].totalCost =
          products.value[index].quantity && products.value[index].unitCost
            ? (
                Number(products.value[index].quantity) *
                Number(products.value[index].unitCost)
              ).toString()
            : 0
      }
      changeComponentKey()
    }

    onBeforeMount(() => {
      changeComponentKey()
      Promise.all([fetchCustomers(), getGasTypes(), fetchProducts()])
    })

    const submit = () => {
      const finalAmount: number = getTotal(form.receiptType)

      const requestBody: Invoice = {
        customer: form.customer,
        totalAmount: finalAmount,
        amountPaid: form.amountPaid,
        date: new Date().toISOString(),
        recieptType: form.receiptType,
        amountInWords: `${toWords(finalAmount)} naira only.`,
      }

      if (form.receiptType === 'cylinder') {
        requestBody.cylinders = cylinders.value
      } else if (form.receiptType === 'product') {
        requestBody.products = products.value
      }

      const rules = {
        customer: 'required|string',
        date: 'required|date',
        amountPaid: `required|max:${finalAmount}|min:1`,
        totalAmount: 'required|numeric',
        recieptType: 'required|string',
        amountInwords: 'string',
        cylinders: 'array|required_if:recieptType,cylinder',
        'cylinders.*.noOfCylinders': 'required|numeric|min:1',
        'cylinders.*.volume': 'required|numeric|min:1',
        'cylinders.*.unitPrice': 'required|numeric|min:1',
        'cylinders.*.amount': 'required|numeric|min:1',
        'cylinders.*.cylinderType': 'required|string',
        products: 'array|required_if:recieptType,product',
        'products.*.productNumber': 'required|string',
        'products.*.productName': 'required|string',
        'products.*.quantity': 'required|numeric|min:1',
        'products.*.unitCost': 'required|numeric|min:1',
        'products.*.totalCost': 'required|numeric|min:1',
      }

      const validation: any = new Validator(requestBody, rules)
      if (validation.fails()) {
        let messages: string[] = []

        messages = ValidatorObject.getMessages(validation.errors)
        messages.forEach((error: string) => {
          context.$toast.error(error)
        })
      } else {
        buttonLoading.value = true
        createInvoice(requestBody)
          .then(() => {
            router.go(-1)
          })
          .finally(() => {
            buttonLoading.value = false
          })
      }
    }

    return {
      form,
      removeItem,
      customerArray,
      componentKey,
      submit,
      buttonLoading,
      receiptTypes,
      changeComponentKey,
      headers,
      changeHeaders,
      incrementList,
      cylinders,
      products,
      gasTypes,
      productsArray,
      updateAmount,
      getTotal,
      updateProductInfo,
    }
  },
})
</script>
