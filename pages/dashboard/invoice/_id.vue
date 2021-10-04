<template>
  <div :key="componentKey" class="w-full md:w-10/12 lg:w-7/12 md:mx-auto mt-10">
    <div class="bg-white px-6 md:p-10 py-6">
      <div class="my-6">
        <h1 class="font-bold text-xl uppercase tracking-normal mb-2">
          Invoice Details
        </h1>
        <div>
          <h2 class="float-right font-medium text-sm">
            Invoice Number:
            <span class="text-gray-600">#{{ form.invoiceNo }}</span>
          </h2>
        </div>
      </div>

      <div
        class="
          w-full
          items-center
          grid grid-rows-1
          md:grid-cols-3 md:space-x-6
          font-semibold
          text-sm
          uppercase
          tracking-normal
        "
      >
        <div>
          <p>Invoice Type</p>
          <p class="text-gray-600">{{ form.receiptType }}</p>
        </div>
        <div>
          <p>Customer</p>
          <p class="text-gray-600">{{ form.customer }}</p>
        </div>
      </div>

      <div v-if="form.receiptType" class="w-full overflow-x-auto mt-10 mb-5">
        <table class="table w-full border-collapse text-gray-700">
          <thead>
            <tr>
              <th class="w-auto text-center px-0.5 border border-black text-xs">
                S/N
              </th>
              <th
                v-for="(head, index) in headers"
                :key="index"
                class="w-auto border border-black text-center"
              >
                {{ head }}
              </th>
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
                  :is-disabled="true"
                />
              </td>
              <td>
                <input-component
                  :input-placeholder="'Enter Volume'"
                  :default-value="cylinder.volume"
                  :input-type="'number'"
                  :is-disabled="true"
                />
              </td>
              <td>
                <input-component
                  :input-placeholder="'Enter Quantity'"
                  :default-value="cylinder.noOfCylinders"
                  :input-type="'number'"
                  :is-disabled="true"
                />
              </td>

              <td>
                <input-component
                  :input-placeholder="'Enter Unit Price'"
                  :default-value="cylinder.unitPrice"
                  :input-type="'number'"
                  :is-disabled="true"
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
            </tr>
          </tbody>
          <tbody v-else-if="form.receiptType === 'product'">
            <tr v-for="(product, j) in products" :key="j">
              <td class="text-center">{{ j + 1 }}</td>
              <td>
                <select-component
                  :init-value="product.productName"
                  :select-array="productsArray"
                  :is-disabled="true"
                />
              </td>
              <td>
                <input-component
                  :input-placeholder="'Quantity'"
                  :default-value="product.quantity"
                  :input-type="'number'"
                  :is-disabled="true"
                />
              </td>
              <td>
                <input-component
                  :input-placeholder="'Unit Price'"
                  :default-value="product.unitCost"
                  :input-type="'number'"
                  :is-disabled="true"
                />
              </td>
              <td>
                <input-component
                  :input-placeholder="'Total Amount'"
                  :input-type="'number'"
                  :default-value="product.totalCost"
                  :is-disabled="true"
                />
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td
                :colspan="form.receiptType === 'cylinder' ? 5 : 4"
                class="text-right py-2 pr-1 font-semibold"
              >
                TOTAL:
              </td>
              <td class="font-bold text-base border border-black pl-2 py-2">
                ₦ {{ form.totalAmount }}
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
                  :is-disabled="true"
                  @get="form.amountPaid = $event.value"
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  reactive,
  ref,
  useRoute,
} from '@nuxtjs/composition-api'
import InputComponent from '@/components/Form/Input.vue'
import SelectComponent from '@/components/Form/Select.vue'
import { getRandomValue } from '@/constants/utils'
import { CylinderController } from '@/module/Cylinder'
import { CustomerController } from '@/module/Customer'
import { ProductObject } from '@/module/Product'
import { fetchInvoice } from '@/module/Account'

export default defineComponent({
  components: {
    SelectComponent,
    InputComponent,
  },
  layout: 'dashboard',
  setup() {
    const form = reactive<any>({
      customer: '',
      receiptType: '',
      totalAmount: '',
      invoiceNo: '',
      amountPaid: '',
    })
    const componentKey = ref<Number>()
    const invoiceId: String = useRoute().value.params.id
    const customerArray = ref<any>([])
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

    const gasTypes = ref([])

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
            value: product.productName,
          }
        })
      })
    }

    const getInvoiceDetails = (id: String) => {
      fetchInvoice(id).then((response) => {
        form.customer = response.customer
        form.receiptType = response.recieptType
        form.totalAmount = response.totalAmount
        form.invoiceNo = response.invoiceNo
        form.amountPaid = response.amountPaid
        changeHeaders(form.receiptType)
        if (form.receiptType === 'cylinder') {
          cylinders.value = response.cylinders
        } else if (form.receiptType === 'product') {
          products.value = response.products
        }
      })
      changeComponentKey()
      console.log(form)
    }

    onBeforeMount(() => {
      changeComponentKey()
      Promise.all([
        getInvoiceDetails(invoiceId),
        fetchCustomers(),
        getGasTypes(),
        fetchProducts(),
      ])
    })

    return {
      form,
      customerArray,
      componentKey,
      receiptTypes,
      changeComponentKey,
      headers,
      changeHeaders,
      cylinders,
      products,
      gasTypes,
      productsArray,
    }
  },
})
</script>
