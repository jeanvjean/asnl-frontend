<template>
  <div class="px-6 py-6">
    <div class="flex justify-end py-4 w-3/4 mx-auto">
      <div class="flex space-x-6 remove">
        <button
          class="
            flex
            items-center
            bg-btn-purple
            text-white
            space-x-4
            px-4
            py-2
            rounded-sm
          "
          @click="genereteOCN"
        >
          <span>Generate OCN</span>
        </button>
        <button
          class="
            flex
            items-center
            space-x-4
            px-4
            py-2
            rounded-sm
            border border-btn-purple
            text-btn-purple
          "
          v-if="form.outstandingBalance == 0"
        >
          Generate Reciept
        </button>
        <button
          class="
            flex
            items-center
            bg-btn-purple
            text-white
            space-x-4
            px-4
            py-2
            rounded-sm
          "
          @click="printDiv"
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
          <span>Print a Copy</span>
        </button>
      </div>
    </div>
    <div class="py-2" id="print">
      <div class="bg-white w-3/4 mx-auto">
        <div class="ml-6 pt-6">
          <h1 class="flex-1 text-gray-400 font-medium text-lg">
            Invoice Details
          </h1>
          <h2 class="font-medium text-md mt-6">
            Payment Status:
            <span class="text-gray-600">{{
              form.outstandingBalance == 0 ? 'Paid' : 'Not Completed'
            }}</span>
          </h2>
        </div>
        <div class="px-10 py-6 border-gray-300 w-full">
          <table class="w-full">
            <thead>
              <tr>
                <th
                  class="
                    px-4
                    py-2
                    text-left text-center text-gray-400
                    font-medium
                  "
                >
                  Customer Name
                </th>
                <th
                  class="
                    px-4
                    py-2
                    text-left text-center text-gray-400
                    font-medium
                  "
                >
                  Cylinder Type
                </th>
                <th
                  class="
                    px-4
                    py-2
                    text-left text-center text-gray-400
                    font-medium
                  "
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody v-if="form.receiptType === 'cylinder' && cylinders.length">
              <tr>
                <td class="px-4 py-2 border-gray-300 text-left text-center">
                  {{ form.customer.name }}
                </td>
                <td
                  class="
                    px-4
                    py-2
                    border-l border-gray-300
                    text-left text-center
                  "
                >
                  {{ cylinderType }}
                </td>
                <td
                  class="
                    px-4
                    py-2
                    border-l border-gray-300
                    text-left text-center
                  "
                >
                  {{
                    new Date(form.date).getMonth() +
                    '/' +
                    new Date(form.date).getDate() +
                    '/' +
                    new Date(form.date).getFullYear()
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="px-10 py-6 border-b border-t border-gray-300 w-full">
          <table class="w-full">
            <thead>
              <tr>
                <th class="px-4 py-2 text-center">S/N</th>
                <th class="px-4 py-2 text-center">Cylinder No</th>
                <th class="px-4 py-2 text-center">Volume</th>
                <th class="px-4 py-2 text-center">Unit Price</th>
                <th class="px-4 py-2 text-center">Amount</th>
              </tr>
            </thead>
            <tbody v-if="form.receiptType === 'cylinder' && cylinders.length">
              <tr v-for="(cylinder, i) in cylinders" :key="i">
                <td class="px-4 py-2 text-center">0{{ i + 1 }}.</td>
                <td class="px-4 py-2 border border-gray-300 text-center">
                  {{ cylinder.cylinderNumber }}
                </td>
                <td class="px-4 py-2 border border-gray-300 text-center">
                  {{ cylinder.volume.value }} {{ cylinder.volume.unit }}
                </td>
                <td class="px-4 py-2 border border-gray-300 text-center">
                  {{ formatCurrency(cylinder.unitPrice) }}
                </td>
                <td class="px-4 py-2 border border-gray-300 text-center">
                  {{ formatCurrency(cylinder.amount) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="px-10 py-6 border-gray-300 w-full">
          <table class="w-full">
            <thead>
              <tr>
                <th
                  class="
                    px-4
                    py-2
                    text-left text-center text-gray-400
                    font-medium
                  "
                >
                  Total Quantity
                </th>
                <th
                  class="
                    px-4
                    py-2
                    text-left text-center text-gray-400
                    font-medium
                  "
                >
                  Total Volume
                </th>
                <th
                  class="
                    px-4
                    py-2
                    text-left text-center text-gray-400
                    font-medium
                  "
                >
                  Total Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="px-4 py-2 border-gray-300 text-left text-center">
                  {{ cylinders.length }}
                </td>
                <td
                  class="
                    px-4
                    py-2
                    border-l border-gray-300
                    text-left text-center
                  "
                >
                  {{ totalVolume }}kg
                </td>
                <td
                  class="
                    px-4
                    py-2
                    border-l border-gray-300
                    text-left text-center
                  "
                >
                  {{ formatCurrency(form.totalAmount) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex items-start py-2 px-2 mx-4" v-if="false">
          <!--  <div>
            <p class="text-gray-500 text-sm font-medium leading-6">
              Initiated at
            </p>
           <p class="text-gray-500 text-sm font-medium">
              <span>
                {{
                  new Date(preparedBy.date).getMonth() +
                  '/' +
                  new Date(preparedBy.date).getDate() +
                  '/' +
                  new Date(preparedBy.date).getFullYear()
                }}
              </span>
              <span>
                {{ new Date(preparedBy.date).getHours() }}:
                {{ new Date(preparedBy.date).getMinutes() }}</span
              >
            </p> -->
          <!-- <div class="flex items-start space-x-4 py-2">
              <img
                v-if="preparedBy.image != null"
                class="h-10 w-10 rounded-full"
                :src="preparedBy.image"
                alt=""
              />
              <img
                v-else
                class="h-10 w-10 rounded-full"
                src="@/assets/images/default-avatar.jpg"
                alt=""
              />
              <div>
                <p class="text-black text-lg">{{ preparedBy.name }}</p>
                <p class="text-gray-600 text-sm">{{ preparedBy.subrole }}</p>
              </div>
            </div> 
          </div>-->
          <div v-show="false">
            <p class="text-gray-500 text-sm font-medium leading-6">
              Initiated at
            </p>
            <p class="text-gray-500 text-sm font-medium">
              <span>24/02/2020</span> <span>11:02</span>
            </p>
            <div class="flex items-start space-x-4 py-2">
              <img
                class="h-10 w-10 rounded-full"
                src="@/assets/images/default-avatar.jpg"
                alt=""
              />
              <div>
                <p class="text-black text-lg">Chimerem Egbuson</p>
                <p class="text-gray-600 text-sm">Operations Manager</p>
              </div>
            </div>
          </div>
          <div v-show="false">
            <p class="text-gray-500 text-sm font-medium leading-6">
              Initiated at
            </p>
            <p class="text-gray-500 text-sm font-medium">
              <span>24/02/2020</span> <span>11:02</span>
            </p>
            <div class="flex items-start space-x-4 py-2">
              <img
                class="h-10 w-10 rounded-full"
                src="@/assets/images/default-avatar.jpg"
                alt=""
              />
              <div>
                <p class="text-black text-lg">Chimerem Egbuson</p>
                <p class="text-gray-600 text-sm">Operations Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <success-msg
      v-if="showSuccess"
      :text="'OCN has been generated successfully!'"
      :buttonText="'View OCN Created'"
      @close="showSuccess = false"
      @action="$router.push(`/dashboard/outgoing/${ocn_id}`)"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  reactive,
  ref,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'
import InputComponent from '@/components/Form/Input.vue'
import SelectComponent from '@/components/Form/Select.vue'
import { getRandomValue } from '@/constants/utils'
import { CylinderController } from '@/module/Cylinder'
import { CustomerController } from '@/module/Customer'
import { ProductObject } from '@/module/Product'
import { fetchInvoice, updateInvoice } from '@/module/Account'
import { createOcn } from '@/module/Incoming'
import SuccessMsg from '~/components/Overlays/SuccessMsg.vue'
import formatCurrency from '@/utils/formatCurrency'
// import html2canvas from 'html2canvas'

export default defineComponent({
  components: {
    SelectComponent,
    InputComponent,
    SuccessMsg,
  },
  layout: 'dashboard',
  setup() {
    const form = reactive<any>({
      customer: '',
      receiptType: '',
      totalAmount: '',
      invoiceNo: '',
      amountPaid: '',
      outstandingBalance: 0,
      id: '',
      date: null,
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
    const router = useRouter()
    const headers = ref<Array<String>>([])
    const products = ref<Array<any>>([])
    const cylinders = ref<Array<any>>([])
    const productsArray = ref<Array<any>>([])

    const totalVolume = ref(0)
    const ocn_id = ref('')
    const cylinderType = ref('')

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
        console.log(response)
        form.id = response._id
        form.customer = response.customer
        form.receiptType = response.recieptType
        form.totalAmount = response.totalAmount
        form.invoiceNo = response.invoiceNo
        form.amountPaid = response.amountPaid
        form.outstandingBalance = response.outstandingBalance
        form.date = response.createdAt

        changeHeaders(form.receiptType)
        if (form.receiptType === 'cylinder') {
          cylinders.value = response.cylinders
        } else if (form.receiptType === 'product') {
          products.value = response.products
        }

        CylinderController.confirmCylinderOnSysytem(
          '',
          '',
          cylinders.value[0].cylinderNumber
        ).then((data) => {
          cylinderType.value = data.data.cylinder.gasType.gasName
        })
        cylinders.value.forEach((item: any) => {
          totalVolume.value += item.volume.value
        })
      })
      changeComponentKey()
      console.log(form)
    }

    const showSuccess = ref(false)
    const printDiv = () => {
      let printContents = document.getElementById('print')
      var originalContents = document.body.innerHTML

      if (printContents) {
        document.body.innerHTML = printContents.innerHTML
        window.print()
        document.body.innerHTML = originalContents
        router.go(0)
      }
    }
    const genereteOCN = () => {
      let payload = {
        customer: form.customer.id,
        cylinderType: cylinderType.value,
        date: form.date,
        noteType: 'out-going',
        totalVol: {
          value: totalVolume.value,
          unit: 'kg',
        },
        totalAmount: {
          value: form.totalAmount,
          unit: 'NGN',
        },
        totalQty: cylinders.value.length,
        type: 'customer',
        invoice: form.id,
        invoiceNo: form.invoiceNo,
        cylinders: [...cylinders.value],
      }

      createOcn(payload)
        .then((data: any) => {
          console.log(data)
          ocn_id.value = data.data._id
          if (data.code == 200) {
            showSuccess.value = true
          }
        })
        .catch((err) => {
          console.log(err)
        })
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
      totalVolume,
      cylinderType,
      genereteOCN,
      showSuccess,
      router,
      ocn_id,
      printDiv,
      formatCurrency,
    }
  },
})
</script>
