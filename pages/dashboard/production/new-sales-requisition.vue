<template>
  <div :key="componentKey">
    <div class="py-4 px-2">
      <div class="flex space-x-0 items-center">
        <!-- <button
          class="px-6 py-2 tracking-wide font-medium border-2 border-gray-200"
          :class="{
            'bg-purple-600 text-white': selected.customer,
          }"
          @click="
            ;(selected.customer = true), (selected.walkin = false)
            form.type = 'regular'
          "
        >
          Air Separation Cylinder
        </button> -->
        <!-- <button
          class="px-6 py-2 tracking-wide font-medium border-2 border-gray-200"
          :class="{
            'bg-purple-600 text-white': selected.walkin,
          }"
          @click="
            ;(selected.walkin = true), (selected.customer = false)
            form.type = 'walk-in'
          "
        >
          Walk-in Customer
        </button> -->
      </div>
      <div class="w-2/5 space-y-2 flex mx-2">
        <find-customer
          :label-title="form.customer.name ? 'Change Customer' : 'Customer'"
          :arr="customersArray"
          :input-placeholder="`Enter customer's name`"
          @get="addCustomer($event)"
        />
        <circle-loader class="mt-8" v-if="ecrLoading" />
      </div>
      <div v-if="form.customer.name != ''">
        <h1 class="px-2 mt-4 mb-2 font-bold tracking-wide text-base uppercase">
          Customer Details
        </h1>
        <h1 class="px-2 mt-4 mb-2 tracking-wide text-base">
          Customer's name: {{ form.customer.name.toUpperCase() }}
        </h1>
      </div>
      <form @submit.prevent="submit">
        <div
          class="grid grid-rows-1 md:grid-cols-2 w-full px-2 gap-y-2 md:gap-x-2"
        >
          <div class="w-full space-y-2">
            <select-component
              :labelTitle="'Gas Type'"
              :inputPlaceholder="'Select gas type'"
              @get="form.cylinderType = $event.value"
              :initValue="form.cylinderType"
              :selectArray="gasTypes"
              :isDisabled="form.customer.name == ''"
            />
          </div>
        </div>
        <div class="px-4 my-8">
          <div v-if="scan.formId">Scan ID:{{ scan.formId }}</div>
          <h1 class="font-semibold uppercase mb-2">Cylinder Details</h1>

          <div>
            <div class="w-full flex items-center space-x-2">
              <div class="w-full overflow-x-auto">
                <table class="table table-auto w-full border-collapse">
                  <thead>
                    <tr>
                      <th class="border border-black px-1 py-1 text-sm">S/N</th>
                      <th class="border border-black px-1 py-1">
                        Cylinder Number
                      </th>
                      <th class="border border-black px-1 py-1">Volume</th>
                      <th class="border border-black px-1 py-1">Unit Price</th>
                      <th class="border border-black px-1 py-1">Amount</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody v-if="selected.customer">
                    <tr v-for="(cylinder, i) in form.cylinders" :key="i">
                      <td>{{ i + 1 }}</td>
                      <td>
                        <input-component
                          :input-placeholder="'Volume'"
                          :default-value="cylinder.cylinderNumber"
                        />
                      </td>
                      <td>
                        <input-component
                          :input-placeholder="'Volume'"
                          :default-value="cylinder.volume.value"
                          :input-type="'number'"
                          @get="updateFieldOne(cylinder, $event)"
                        />
                      </td>
                      <td>
                        <input-component
                          :input-placeholder="'Unit price'"
                          :default-value="cylinder.unitPrice"
                          :input-type="'number'"
                          @get="updateFieldTwo(cylinder, $event)"
                        />
                      </td>
                      <td>
                        <input-component
                          :input-placeholder="'Cylinder Amount'"
                          :default-value="cylinder.amount"
                          :input-type="'number'"
                          @get="updateFieldThree(cylinder, $event)"
                        />
                      </td>
                      <td>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          class="fill-current text-gray-500 w-5 h-5 mx-auto"
                          @click="decrement(i)"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="mt-4">
            <button
              class="flex items-center space-x-2 text-purple-500"
              type="button"
              v-show="!scan.formId"
              @click="initCylinder"
            >
              <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M4,6H6V18H4V6M7,6H8V18H7V6M9,6H12V18H9V6M13,6H14V18H13V6M16,6H18V18H16V6M19,6H20V18H19V6M2,4V8H0V4A2,2 0 0,1 2,2H6V4H2M22,2A2,2 0 0,1 24,4V8H22V4H18V2H22M2,16V20H6V22H2A2,2 0 0,1 0,20V16H2M22,20V16H24V20A2,2 0 0,1 22,22H18V20H22Z"
                />
              </svg>
              <span>Scan Cylinders</span>
            </button>
          </div>
          <div class="mt-6 w-1/3" v-if="auth.name">
            <p class="font-bold tracking-wide text-base">Prepared by:</p>
            {{ auth.name.toUpperCase() }}
          </div>
        </div>

        <div class="flex items-center space-x-6 px-4 mt-4">
          <button-component
            @click="submit"
            :button-class="'bg-btn-white border border-btn-purple text-btn-purple w-full md:w-1/4'"
            :button-text="'Save'"
            :loading-status="buttonLoading"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  useContext,
  useRouter,
  watch,
} from '@nuxtjs/composition-api'
import Validator from 'validatorjs'
import { CylinderController } from '@/module/Cylinder'
import { CustomerController } from '@/module/Customer'
import InputComponent from '@/components/Form/Input.vue'
import SelectComponent from '@/components/Form/Select.vue'
import ButtonComponent from '@/components/Form/Button.vue'
import { ValidatorObject } from '@/module/Validation'
import { createRequisition } from '@/module/Sales'
import { fetchEcrDetail } from '@/module/ECR'
import { initiateScan } from '@/module/SCAN'
import { fetchEcrs } from '@/module/ECR'
import { values } from 'lodash'
import { mainStore } from '@/module/Pinia'
import FindCustomer from '~/components/Form/FindCustomer.vue'
import printJS from 'print-js'

import CircleLoader from '@/components/CircleLoader.vue'
export default defineComponent({
  components: {
    InputComponent,
    SelectComponent,
    ButtonComponent,
    CircleLoader,
    FindCustomer,
  },
  layout: 'noSidebar',
  setup() {
    const appStore = mainStore()
    const auth: any = appStore.getLoggedInUser

    const selected = reactive({
      customer: true,
      walkin: false,
    })

    const scan = reactive<any>({
      status: '',
      _id: '',
      cylinders: [],
      formId: '',
      initNum: 0,
    })

    const form = reactive({
      customer: {
        name: '',
        id: '',
      },
      ecrNo: '',
      date: new Date().toISOString(),
      cylinderType: '',
      cylinders: [],
      type: 'regular',
    })
    const componentKey = ref<number>(0)

    const ecrLoading = ref(false)
    const changeComponentKey = () => {
      componentKey.value = Math.floor(Math.random() * 100)
    }

    const cylinders = ref<any>([])
    const ecrCylinders = ref<any>([])
    const customers = ref<any>([])
    const ecrs = ref<any>([])
    const dispEcrs = ref<any>([])
    const externalCylinders = ref<any>([])
    const internalCylinders = ref<any>([])

    const scanCylinders = ref([])

    const { $fire } = useContext()
    const db = $fire.database

    const initCylinder = () => {
      if (form.cylinderType == '')
        return context.$toast.error('Select a gas type')
      initiateScan().then((response) => {
        scan.status = response.status
        scan._id = response._id
        scan.cylinders = response.cylinders
        scan.formId = response.formId
        scan.initNum = response.initNum
      })
    }
    const setEcr = (event: any) => {
      // const Item = ecrs.value.find((item: any) => item._id === event.value)
      ecrs.value.forEach((item: any) => {
        if (item.value == event.value) {
          form.ecrNo = item.name
          form.cylinderType = item.gas
          ecrCylinders.value = item.cylinders
          console.log(ecrCylinders.value)
        }
      })
    }
    const ecrSearch = ref('')
    const displayList = ref<any>([])
    const searchEcr = () => {
      let filter = ecrSearch.value.toLowerCase()

      for (var i = 0; i < ecrs.value.length; i++) {
        console.log(ecrs.value[i].name)
        if (
          ecrs.value[i].name.toLowerCase().indexOf(filter) > -1 &&
          filter != ''
        ) {
          // li[i].style.display = "";
          displayList.value.push(ecrs.value[i].name)
          console.log('Among', ecrs.value[i].name)
          return
        } else {
          displayList.value = []
        }
      }
    }

    const increment = () => {
      if (selected.customer) {
        internalCylinders.value.push({
          cylinderNumber: '',
          volume: {
            value: '0',
            unit: 'kg',
          },
          amount: '0',
          unitPrice: '0',
        })
      } else if (selected.walkin) {
        externalCylinders.value.push({
          cylinderNumber: '',
          volume: {
            value: '0',
            unit: 'kg',
          },
          amount: '0',
          unitPrice: '0',
        })
      }
    }

    watch(
      () => form.ecrNo,
      (currentValue, oldValue) => {
        var typingTimer
        clearTimeout(typingTimer)
        typingTimer = setTimeout(() => {
          ecrLoading.value = true
          fetchEcrDetail(currentValue.toUpperCase()).then((data) => {
            console.log(data)
            if (
              data.docs.length > 0 &&
              data.docs[0].ecrNo == currentValue.toUpperCase()
            ) {
              form.customer.name = data.docs[0].customer.name
              form.customer.id = data.docs[0].customer._id
              form.cylinderType = data.docs[0].gasType.gasName
              ecrCylinders.value = data.docs[0].removeArr.map((id: any) => id)
              changeComponentKey()
              ecrLoading.value = false
            } else {
              context.$toast.error(`There is no ECR with ${currentValue}`)
              form.customer.name = ''
              form.customer.id = ''
              form.cylinderType = ''
              ecrCylinders.value = []
              changeComponentKey()
              ecrLoading.value = false
            }
          })
        }, 3000)
      }
    )

    watch(
      () => scan.formId,
      (currentValue, oldValue) => {
        console.log(currentValue)
        const ref = db.ref(`forms/${currentValue}/form`)
        ref.on(
          'value',
          (snapshot: any) => {
            if (snapshot.val()) {
              const cyl = JSON.parse(snapshot.val().cylinders)
              if (cyl.length) {
                var item = cyl[cyl.length - 1]
                CylinderController.confirmCylinderOnSysytem(
                  item.assignedNumber,
                  item.barcode,
                  item.cylinderNumber
                ).then((data) => {
                  console.log(ecrCylinders.value)
                  console.log(data.data.cylinder)
                  // if (ecrCylinders.value.includes(data.data.cylinder._id)) {
                  if (form.cylinderType === data.data.cylinder.gasName) {
                    console.log(data.data)
                    console.log(products.value)
                    console.log(products.value[data.data.cylinder.gasName])

                    cylinders.value.push({
                      id: data.data.cylinder._id,
                      noOfCylinders: data.data.cylinder.cylNo,
                      cylinderNumber: data.data.cylinder.cylinderNumber,
                      volume: {
                        value: data.data.cylinder.gasVolumeContent.value,
                        unit: data.data.cylinder.gasVolumeContent.unit,
                      },
                      unitPrice: Number(
                        products.value[data.data.cylinder.gasName]
                      ),
                      amount:
                        Number(products.value[data.data.cylinder.gasName]) *
                        data.data.cylinder.cylNo,
                    })
                    form.cylinders = cylinders.value
                  } else {
                    context.$toast.error(
                      'The cylinder is either empty of does not belong to the ECR'
                    )
                  }
                })
              }
            }
          },
          (errorObject: Error) => {
            console.log('The read failed: ' + errorObject.name)
          }
        )
      }
    )

    const products = ref<any>([])
    const gasTypes = ref([])

    const getCustomer = (value: any) => {
      customers.value.forEach((item: any) => {
        console.log(value)
        if (item.value == value) {
          form.customer.name = item.name
        }
      })
    }
    const getGases = () => {
      CylinderController.getCylinders().then((response) => {
        const myResponse = response.data.data.cylinders
        // console.log(myResponse)
        gasTypes.value = myResponse.map((element: any) => {
          return {
            name: element.gasName,
            value: element.gasName,
          }
        })
      })
    }

    const fetchAllEcr = () => {
      fetchEcrs().then((response) => {
        console.log(response)
        ecrs.value = response.docs.map((item: any) => {
          return {
            name: item.ecrNo,
            value: item._id,
            _id: item.customer._id,
            cylinders: item.removeArr.map((id: any) => id),
            gas: item.gasType.gasName,
          }
        })
        console.log(ecrs.value)
      })
    }
    const getDispEcrs = () => {
      dispEcrs.value = ecrs.value.filter(
        (item: any) => item._id === form.customer.id
      )
    }

    const customersArray = ref([])
    const fetchCustomers = () => {
      ecrLoading.value = true
      CustomerController.fetchUnPaginatedCustomers().then((response: any) => {
        ecrLoading.value = false
        customersArray.value = response.map((item: any) => {
          return {
            name: item.name,
            id: item._id,
          }
        })
      })
    }

    const addCustomer = (data: any) => {
      console.log(data)
      form.customer.name = data.name
      form.customer.id = data._id
      gasTypes.value = data.products.map((product: any) => {
        return {
          name: product.product.productName,
          value: product.product.productName,
        }
      })
      let p: any = {}
      data.products.forEach((item: any) => {
        p[item.product.productName] = item.unit_price.value
      })
      products.value = p
      //form.cylinders = []
      //form.cylinderType = ''
      changeComponentKey()
    }

    function decrement(index: any) {
      form.cylinders.splice(index, 1)
    }
    const printNow = () => {
      printJS('printJS-barcode', 'html')
    }
    const buttonLoading = ref<Boolean>(false)

    onMounted(() => {
      Promise.all([getGases(), fetchCustomers(), fetchAllEcr()])
    })
    const context = useContext()
    const router = useRouter()

    const submit = () => {
      // form.cylinders = selected.customer
      //   ? internalCylinders.value
      //   : externalCylinders.value

      console.log(form)

      const rules = {
        'customer.name': 'required|string',
        'customer.id': 'required|string',
        date: 'required|date',
        cylinderType: 'required|string',
        cylinders: 'required|array',
        'cylinders.*.noOfCylinders': 'required|numeric',
        'cylinders.*.cylinderNumber': 'required|string',
        'cylinders.*.unitPrice': 'required|numeric',
        'cylinders.*.amount': 'required|numeric',
        'cylinders.*.volume.value': 'required|numeric',
        'cylinders.*.id': 'required',
        // production_id: 'required|string',
        // purchase_id: 'required|string',
      }

      const validation: any = new Validator(form, rules)
      if (validation.fails()) {
        let messages: string[] = []

        messages = ValidatorObject.getMessages(validation.errors)
        messages.forEach((error: string) => {
          context.$toast.error(error)
        })
      } else {
        buttonLoading.value = true
        createRequisition(form)
          .then((res) => {
            router.push(`/dashboard/sales/requisition/${res.data._id}`)
          })
          .finally(() => {
            buttonLoading.value = false
          })
      }
    }

    return {
      selected,
      cylinders,
      increment,
      decrement,
      addCustomer,
      form,
      externalCylinders,
      internalCylinders,
      gasTypes,
      submit,
      buttonLoading,
      changeComponentKey,
      componentKey,
      customers,
      initCylinder,
      scanCylinders,
      scan,
      ecrs,
      dispEcrs,
      getDispEcrs,
      ecrCylinders,
      setEcr,
      auth,
      getCustomer,
      printNow,
      searchEcr,
      ecrSearch,
      displayList,
      ecrLoading,
      customersArray,
    }
  },
  methods: {
    updateFieldOne(cylinder: any, $event: any) {
      cylinder.volume.value = $event.value
      cylinder.amount =
        Number(cylinder.unitPrice) * Number(cylinder.volume.value)
    },
    updateFieldTwo(cylinder: any, $event: any) {
      cylinder.unitPrice = $event.value
      cylinder.amount =
        Number(cylinder.unitPrice) * Number(cylinder.volume.value)
      this.changeComponentKey()
    },
    updateFieldThree(cylinder: any) {
      cylinder.amount =
        Number(cylinder.unitPrice) * Number(cylinder.volume.value)
    },
  },
})
</script>
