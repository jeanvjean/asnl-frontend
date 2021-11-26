<template>
  <div :key="componentKey">
    <div class="py-4 px-2">
      <div class="flex space-x-0 items-center">
        <button
          class="px-6 py-2 tracking-wide font-medium border-2 border-gray-200"
          :class="{
            'bg-purple-600 text-white': selected.customer,
          }"
          @click=";(selected.customer = true), (selected.walkin = false)"
        >
          Air Separation Cylinder
        </button>
        <button
          class="px-6 py-2 tracking-wide font-medium border-2 border-gray-200"
          :class="{
            'bg-purple-600 text-white': selected.walkin,
          }"
          @click=";(selected.walkin = true), (selected.customer = false)"
        >
          Walk-in Customer
        </button>
      </div>
      <h1 class="px-2 mt-4 mb-2 font-bold tracking-wide text-base uppercase">
        Customer Details
      </h1>
      <form @submit.prevent="submit">
        <div
          class="grid grid-rows-1 md:grid-cols-3 w-full px-4 gap-y-2 md:gap-x-4"
        >
          <div class="w-full space-y-2">
            <select-component
              :label-title="'Customer Name'"
              :default-option-text="'Select a Customer'"
              :selectArray="customers"
              @get="form.customerName = $event.value"
            />
          </div>
          <div class="w-full space-y-2">
            <input-component
              :label-title="'ECR Number'"
              :input-placeholder="'Enter ECR Number'"
              :default-value="form.ecrNo"
              @get="form.ecrNo = $event.value"
            />
          </div>
          <div class="w-full space-y-2">
            <select-component
              :input-placeholder="'Select Gas Type'"
              :label-title="'Gas Type'"
              :init-value="form.cylinderType"
              :default-option-text="'Select ASNL Cylinder'"
              :select-array="gasTypes"
              @get="form.cylinderType = $event.value"
            />
          </div>
        </div>
        <div class="px-4 my-8">
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
                    <tr v-for="(cylinder, i) in internalCylinders" :key="i">
                      <td>{{ i + 1 }}</td>
                      <td>
                        <select-component
                          :input-placeholder="'ASNL Number'"
                          :init-value="cylinder.cylinderNumber"
                          :default-option-text="'Select ASNL Cylinder'"
                          :select-array="cylinders"
                          @get="cylinder.cylinderNumber = $event.value"
                        />
                      </td>
                      <td>
                        <input-component
                          :input-placeholder="'Volume'"
                          :default-value="cylinder.volume.value"
                          :input-type="'number'"
                          @get="
                            ;(cylinder.volume.value = $event.value),
                              (cylinder.amount =
                                Number(cylinder.unitPrice) *
                                Number(cylinder.volume.value)),
                              changeComponentKey()
                          "
                        />
                      </td>
                      <td>
                        <input-component
                          :input-placeholder="'Cylinder Size'"
                          :default-value="cylinder.unitPrice"
                          :input-type="'number'"
                          @get="
                            cylinder.unitPrice = $event.value
                            ;(cylinder.amount =
                              Number(cylinder.unitPrice) *
                              Number(cylinder.volume.value)),
                              changeComponentKey()
                          "
                        />
                      </td>
                      <td>
                        <input-component
                          :input-placeholder="'Amount'"
                          :default-value="cylinder.amount"
                          :input-type="'number'"
                          :is-disabled="true"
                        />
                      </td>
                      <td>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          class="fill-current text-gray-500 w-5 h-5 mx-auto"
                          @click="decrement(j)"
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
                  <tbody v-else>
                    <tr v-for="(cylinder, j) in externalCylinders" :key="j">
                      <td>{{ j + 1 }}</td>
                      <td>
                        <input-component
                          :input-placeholder="'Cylinder Number'"
                          :default-value="cylinder.cylinderNumber"
                          @get="cylinder.cylinderNumber = $event.value"
                        />
                      </td>
                      <td>
                        <input-component
                          :input-placeholder="'Volume'"
                          :default-value="cylinder.volume.value"
                          :input-type="'number'"
                          @get="
                            ;(cylinder.volume.value = $event.value),
                              (cylinder.amount =
                                Number(cylinder.unitPrice) *
                                Number(cylinder.volume.value)),
                              changeComponentKey()
                          "
                        />
                      </td>
                      <td>
                        <input-component
                          :input-placeholder="'Cylinder Size'"
                          :default-value="cylinder.unitPrice"
                          :input-type="'number'"
                          @get="
                            ;(cylinder.unitPrice = $event.value),
                              (cylinder.amount =
                                Number(cylinder.unitPrice) *
                                Number(cylinder.volume.value)),
                              changeComponentKey()
                          "
                        />
                      </td>
                      <td>
                        <input-component
                          :input-placeholder="'Amount'"
                          :default-value="cylinder.amount"
                          :input-type="'number'"
                          :is-disabled="true"
                        />
                      </td>
                      <td>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          class="fill-current text-gray-500 w-5 h-5 mx-auto"
                          @click="decrement(j)"
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
              @click="increment"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="fill-current w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Add More</span>
            </button>
          </div>
        </div>

        <div class="flex items-center space-x-6 px-4 mt-4">
          <button-component
            v-if="form.cylinders.length > 0"
            :button-class="'bg-btn-purple text-white w-full md:w-1/4'"
            :button-text="'Send'"
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
} from '@nuxtjs/composition-api'
import Validator from 'validatorjs'
import { CylinderController } from '@/module/Cylinder'
import { CustomerController } from '@/module/Customer'
import InputComponent from '@/components/Form/Input.vue'
import SelectComponent from '@/components/Form/Select.vue'
import ButtonComponent from '@/components/Form/Button.vue'
import { ValidatorObject } from '@/module/Validation'
import { createRequisition } from '@/module/Sales'

export default defineComponent({
  components: { InputComponent, SelectComponent, ButtonComponent },
  layout: 'noSidebar',
  setup() {
    const selected = reactive({
      customer: true,
      walkin: false,
    })

    const form = reactive({
      customerName: '',
      ecrNo: '',
      date: new Date().toISOString(),
      cylinderType: '',
      cylinders: [],
    })
    const componentKey = ref<number>(0)

    const changeComponentKey = () => {
      componentKey.value = Math.floor(Math.random() * 100)
    }

    const cylinders = ref<any>([])
    const customers = ref<any>([])
    const externalCylinders = ref<any>([])
    const internalCylinders = ref<any>([])

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
    const gasTypes = ref([])

    const getGases = () => {
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

    const fetchCylinders = () => {
      CylinderController.getRegisteredCylindersUnPaginated().then(
        (response) => {
          cylinders.value = response.data.map((element: any) => {
            return {
              name: element.cylinderNumber,
              value: element.cylinderNumber,
            }
          })
        }
      )
    }
    const fetchCustomers = () => {
      CustomerController.fetchUnPaginatedCustomers().then((response) => {
        console.log(response)
        customers.value = response.map((element: any) => {
          return {
            name: element.name,
            value: element._id,
          }
        })
      })
    }

    function decrement(index: any) {
      if (selected.customer) {
        internalCylinders.value.splice(index, 1)
      } else if (selected.walkin) {
        externalCylinders.value.splice(index, 1)
      }
    }

    const buttonLoading = ref<Boolean>(false)

    onMounted(() => {
      Promise.all([getGases(), fetchCylinders(), fetchCustomers()])
    })
    const context = useContext()
    const router = useRouter()

    const submit = () => {
      form.cylinders = selected.customer
        ? internalCylinders.value
        : externalCylinders.value
      const rules = {
        customerName: 'required|string',
        ecrNo: 'required|string',
        date: 'required|date',
        cylinderType: 'required|string',
        cylinders: 'required|array',
        'cylinders.*.cylinderNumber': 'required|string',
        'cylinders.*.unitPrice': 'required|numeric',
        'cylinders.*.amount': 'required|numeric',
        'cylinders.*.volume.value': 'required|numeric',
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
          .then(() => {
            router.push('/dashboard/production/sales-requisition')
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
      form,
      externalCylinders,
      internalCylinders,
      gasTypes,
      submit,
      buttonLoading,
      changeComponentKey,
      componentKey,
      customers,
    }
  },
})
</script>
