<template>
  <div class="px-6 py-6">
    <div class="py-2" id="print">
      <div class="bg-white w-3/4 mx-auto">
        <div class="flex justify-between px-6 py-4">
          <h1 class="flex-1 text-gray-400 font-medium text-lg">
            Requisition Details
          </h1>
          <div class="w-1/6 mr-2">
            <button-component
              v-if="details.invoice_id == null"
              @buttonClicked="generateInvoice"
              :buttonText="'Generate an Invoice'"
              :button-class="'border border-blue-300 bg-blue-500 text-white'"
              :loading-status="false"
            />
          </div>
          <div class="flex space-x-6">
            <button
              class="
                flex
                items-center
                bg-blue-500
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
        <div class="w-full overflow-x-auto px-8 my-8">
          <div
            class="
              grid grid-rows-1
              lg:grid-cols-3
              divide divide-x-2 divide-gray-300
              mt-8
            "
          >
            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Customer Name</h4>
                <p>{{ details.customer.name }}</p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">ERC No</h4>
                <p>{{ details.ecrNo }}</p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Date</h4>
                <p>
                  {{
                    new Date(details.date).getMonth() +
                    '/' +
                    new Date(details.date).getDate() +
                    '/' +
                    new Date(details.date).getFullYear()
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="px-10 py-6 border-b border-t border-gray-300 w-full">
          <table class="w-10/12">
            <thead>
              <tr>
                <th class="px-4 py-2 text-right w-20">S/N</th>
                <th class="px-4 py-2 text-left">Cylinder No</th>
                <th class="px-4 py-2 text-left">Volume</th>
                <th class="px-4 py-2 text-left">Unit Price</th>
                <th class="px-4 py-2 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cylinder, i) in cylinders" :key="i">
                <td class="px-4 py-2 text-right">0{{ i + 1 }}.</td>
                <td class="px-4 py-2 border border-gray-300 text-left">
                  {{ cylinder.cylinderNumber }}
                </td>
                <td class="px-4 py-2 border border-gray-300 text-left">
                  {{ cylinder.volume.value }} {{ cylinder.volume.unit }}
                </td>
                <td class="px-4 py-2 border border-gray-300 text-left">
                  {{ cylinder.unitPrice }}
                </td>
                <td class="px-4 py-2 border border-gray-300 text-left">
                  {{ cylinder.amount }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="w-full overflow-x-auto px-8 my-4">
          <div v-if="details.invoice_id == null">
            <input
              type="checkbox"
              v-model="applyVat"
              @change="applyingVAT"
              class="rounded-sm"
              id="vat"
            />
            <label for="vat">Apply VAT {{ vat }} % </label>
          </div>
          <div
            class="
              grid grid-rows-1
              lg:grid-cols-4
              divide divide-x-2 divide-gray-300
              mt-8
            "
          >
            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Total Quantity</h4>
                <p>{{ cylinders.length }}</p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Total Volume</h4>
                <p>{{ totalVolume }}kg</p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">VAT</h4>
                <p>{{ vat }} %</p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Total Amount</h4>
                <p class="leading-3">{{ totalAmount }}.00</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-start py-2 px-2 mx-4">
          <div>
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
            </p>
            <div class="flex items-start space-x-4 py-2">
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
      :text="`You\'ve successfully created an invoice. For ${details.customer.name.toUpperCase()} for the total sum of NGN${totalAmount}`"
      :buttonText="'View Generated Invoice'"
      @close="showSuccess = false"
      @action="router.push(`/dashboard/invoice/${invoice_id}`)"
      :isAction="true"
    />
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  useRoute,
  useRouter,
  onBeforeMount,
  reactive,
} from '@nuxtjs/composition-api'
import { fetchRequisition } from '~/module/Sales'
import { createInvoice } from '~/module/Account'
import { CustomerController } from '~/module/Customer'
import ButtonComponent from '~/components/Form/Button.vue'
import SuccessMsg from '~/components/Overlays/SuccessMsg.vue'
var converter = require('number-to-words')

export default defineComponent({
  name: 'sales-requisition-id',
  layout: 'dashboard',
  components: { SuccessMsg, ButtonComponent },
  setup() {
    const types = [{ name: 'Assign Cylinder', value: 'temp' }]
    const reciepients = [{ name: 'Oxygen', value: 'temp' }]
    const showConfirmation = ref(false)
    const showFinalStep = ref(false)
    const status = ref('')
    const message = ref('')
    const route = useRoute()
    const router = useRouter()

    const id = route.value.params.id

    const details = reactive({
      customer: {
        name: '',
        id: '',
        email: '',
        type: '',
      },
      ecrNo: '',
      date: null,
      invoice_id: null,
    })

    const preparedBy = reactive({
      email: '',
      image: '',
      name: '',
      subrole: '',
      date: null,
    })
    const applyVat = ref<Boolean>(false)
    const cylinders = ref<any>([])
    const totalVolume = ref(0)
    const totalAmount = ref(0)
    const oTotalAmount = ref(0)
    const vat = ref(0)
    const loading = ref(false)

    const applyingVAT = () => {
      if (applyVat.value == true) {
        totalAmount.value =
          Number(totalAmount.value) +
          Number((totalAmount.value * vat.value) / 100)
      } else {
        totalAmount.value = oTotalAmount.value
      }
    }

    watch(status, (currentValue) => {
      if (currentValue === 'success') {
        message.value = 'You have successfully approved this request'
      } else if (currentValue === 'error') {
        message.value = 'You have regretably declined this request'
      }
    })
    const count = ref(0)
    const invoice_id = ref('')
    const showSuccess = ref(false)

    const printDiv = () => {
      var printContents = document.getElementById('print')
      var originalContents = document.body.innerHTML
      if (printContents) {
        document.body.innerHTML = printContents.innerHTML
        window.print()
        document.body.innerHTML = originalContents
        router.go(0)
      }
    }

    const generateInvoice = () => {
      loading.value = true
      let requestBody = {
        customer: {
          name: details.customer.name,
          email: details.customer.email,
          id: details.customer.id,
        },
        totalAmount: totalAmount.value,
        amountPaid: 0,
        date: '2021-05-15T10:38:50.733Z',
        amountInWords: `${converter.toWords(totalAmount.value)} Naira Only`,
        recieptType: cylinders.value.length > 0 ? 'cylinder' : 'product',
        customerType: details.customer.type,
        salesReq: id,
        cylinders: [...cylinders.value],
      }
      createInvoice(requestBody)
        .then((data) => {
          console.log(data)
          if (data.code == 200) {
            showSuccess.value = true
            invoice_id.value = data.data._id
          }
          loading.value = false
        })
        .catch((err) => {
          console.log(err)
          loading.value = false
        })
    }

    onBeforeMount(() => {
      fetchRequisition(id).then((data) => {
        console.log(data)
        details.customer = data.customer
        details.ecrNo = data.ecrNo
        details.date = data.createdAt
        details.invoice_id = data.invoice_id
        cylinders.value = data.cylinders

        data.cylinders.forEach((item: any) => {
          totalVolume.value += item.volume.value
          totalAmount.value += item.amount
          oTotalAmount.value += item.amount
        })

        preparedBy.name = data.preparedBy.name
        preparedBy.image = data.preparedBy.image
        preparedBy.subrole = data.preparedBy.subrole
        preparedBy.email = data.preparedBy.email
        preparedBy.date = data.preparedBy.createdAt

        CustomerController.fetchCustomer(data.customer.id).then((data) => {
          vat.value = data.data.vat ? data.data.vat.value : 5
        })
      })
    })
    return {
      types,
      reciepients,
      showConfirmation,
      showFinalStep,
      status,
      message,
      count,
      details,
      cylinders,
      totalVolume,
      totalAmount,
      generateInvoice,
      preparedBy,
      showSuccess,
      invoice_id,
      router,
      applyVat,
      applyingVAT,
      vat,
      loading,
      printDiv,
    }
  },
})
</script>
