<template>
  <div :key="componentKey" class="px-6 py-6">
    <div class="grid grid-rows-1 md:grid-cols-4 py-2 px-4">
      <div
        class="
          lg:flex
          lg:justify-between
          lg:items-center
          lg:col-span-3
          lg:gap-2
        "
      >
        <h1 class="text-xl text-black font-medium px-2 py-2">
          Transfer Cylinders
        </h1>
        <div
          class="
            flex
            space-x-6
            sm:space-y-3
            md:space-y-0
            flex-col
            md:flex-row
            text-sm
          "
        >
          <router-link
            to="/dashboard/cylinder-management/transfer"
            class="
              flex
              space-x-4
              items-center
              text-white
              bg-btn-purple
              px-4
              py-2
              rounded-sm
              md:mx-auto
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              class="w-6 h-6 fill-current"
            >
              <path
                d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zm10-4a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"
              />
            </svg>
            <span>Within Division</span>
          </router-link>

          <router-link
            to="/dashboard/cylinder-management/outright-sale"
            class="
              flex
              space-x-4
              items-center
              text-btn-purple
              border-btn-purple border
              px-4
              py-2
              rounded-sm
              md:mx-auto
            "
          >
            <svg
              class="w-6 h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.5 4H8.79C9.24 4 9.46 4.54 9.15 4.84L7.71 6.28L12.71 11.29C12.89 11.48 13 11.74 13 12V19C13 19.55 12.55 20 12 20C11.45 20 11 19.55 11 19V12.4L6.29 7.7L4.85 9.14C4.54 9.46 4 9.24 4 8.79V4.5C4 4.22 4.22 4 4.5 4ZM16.29 6.29L14.85 4.85C14.54 4.54 14.76 4 15.21 4H19.5C19.78 4 20 4.22 20 4.5V8.79C20 9.24 19.46 9.46 19.15 9.15L17.71 7.71L14.83 10.59L13.41 9.17L16.29 6.29Z"
                fill="#5C53FF"
              />
            </svg>
            <span>Outright sales/transfer</span>
          </router-link>
          <router-link
            to="/dashboard/cylinder-management/condemn"
            class="
              flex
              space-x-4
              items-center
              text-btn-purple
              border-btn-purple border
              px-4
              py-2
              rounded-sm
              md:mx-auto
            "
          >
            <svg
              class="w-6 h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>

            <span>Condemn</span>
          </router-link>
          <router-link
            to="/dashboard/cylinder-management/cylinder-type"
            class="
              flex
              space-x-4
              items-center
              text-btn-purple
              border-btn-purple border
              px-4
              py-2
              rounded-sm
              md:mx-auto
            "
          >
            <svg
              class="w-6 h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>

            <span class="text-center">Cylinder Type</span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="grid grid-rows-1 lg:grid-cols-4 py-2 px-6">
      <div class="lg:col-span-3 overflow-x-auto bg-white px-4">
        <div class="md:flex justify-between px-8 py-4">
          <h1
            class="
              flex-1
              text-gray-400
              font-medium
              text-lg
              my-2
              md:my-0
              capitalize
            "
          >
            {{ transferType }} Transfer within Division
          </h1>
          <div class="flex space-x-6 float-right my-2 md:my-0">
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
              @click="submit"
            >
              <span>Save</span>
              <svg
                class="w-6 h-6 fill-current text-btn-purple"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
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
              "
              @click=";(status = 'error'), (showConfirmation = true)"
            >
              <span>Cancel</span
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 fill-current text-white"
                viewBox="0 0 24 24"
                stroke="#7C3AED"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="w-full overflow-x-auto px-6 my-8 border-collapse">
          <table class="table w-full border-collapse border-0">
            <thead>
              <tr>
                <th class="w-auto"></th>
                <th
                  class="
                    font-light
                    text-lg
                    px-2
                    py-2
                    text-center
                    w-3/12
                    border border-gray-400
                  "
                >
                  Customer Name
                </th>
                <th
                  class="
                    font-light
                    text-lg
                    px-2
                    py-2
                    text-center
                    w-3/12
                    border border-gray-400
                  "
                >
                  Cylinder Number
                </th>
                <th
                  class="
                    font-light
                    text-lg
                    px-2
                    py-2
                    text-center
                    w-3/12
                    border border-gray-400
                  "
                >
                  Volume
                </th>
                <th
                  class="
                    font-light
                    text-lg
                    px-2
                    py-2
                    text-center
                    w-2/12
                    border border-gray-400
                  "
                >
                  Type
                </th>
                <th class="w-auto"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(cylinder, i) in cylinders"
                :key="i"
                class="hover:bg-gray-100"
              >
                <td class="font-light text-lg text-center">
                  {{ Number(i) + 1 }}
                </td>
                <td class="font-light text-lg text-center">
                  <select
                    v-model="cylinders[i].customer"
                    class="
                      w-full
                      border-2 border-gray-200
                      py-2
                      rounded-sm
                      focus:outline-none
                    "
                    @change="setAndFetch($event.target.value, i)"
                  >
                    <option value="">Select a Customer</option>
                    <option
                      v-for="(customer, index) in customers"
                      :key="index"
                      :value="customer._id"
                    >
                      {{ customer.contactPerson }}
                    </option>
                  </select>
                </td>
                <td class="font-light text-lg text-center">
                  <select
                    v-model="cylinder.cylinder"
                    class="
                      w-full
                      border-2 border-gray-200
                      py-2
                      rounded-sm
                      focus:outline-none
                    "
                    @change="setVolumeAndType($event.target.value, i)"
                  >
                    <option value="">Select a Cylinder</option>
                    <option
                      v-for="(cylin, index) in cylindersArrays[i]"
                      :key="index"
                      :value="cylin._id"
                    >
                      {{
                        cylin.assignedNumber
                          ? cylin.assignedNumber
                          : 'No Assigned Number Yet'
                      }}
                    </option>
                  </select>
                </td>
                <td class="font-light text-lg text-center">
                  <input-component
                    :default-value="cylinder.volume"
                    :input-placeholder="'Enter Volume'"
                  />
                </td>
                <td class="font-light text-lg text-center">
                  <select
                    v-model="cylinder.type"
                    class="
                      w-full
                      border-2 border-gray-200
                      py-2
                      rounded-sm
                      focus:outline-none
                    "
                  >
                    <option value="buffer">Buffer</option>
                    <option value="assigned">Assigned</option>
                  </select>
                </td>

                <td class="font-light text-lg text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 fill-current text-transparent"
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
          <div class="inline-block px-16 py-4">
            <button
              class="flex justify-evenly items-center"
              @click="increaseCounter()"
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
              <span class="text-md text-gray-400 underline"
                >Add New Cylinder</span
              >
            </button>
          </div>
        </div>
        <div
          class="
            px-10
            py-6
            grid grid-rows-1
            lg:grid-cols-2
            gap-y-4
            lg:gap-x-4
            border-b border-t border-gray-300
          "
        >
          <select-component
            :label-title="'Type of Transfer'"
            :default-option-text="'Select a Transfer Type'"
            :select-array="types"
            :init-value="form.type"
            @get="changeTransferType($event.value)"
          />

          <select-component
            :label-title="'To'"
            :default-option-text="'Select a Reciepient'"
            :select-array="reciepients"
            :init-value="form.reciepient"
            @get="form.reciepient = $event.value"
          />
        </div>
        <div class="px-10 py-4">
          <label for="" class="text-black text-lg px-2 py-2">Comments</label>
          <input
            v-model="form.comment"
            type="text"
            class="w-full px-4 py-3 border-gray-300 mt-4"
            placeholder="Enter Comment here"
          />
        </div>
        <div class="flex justify-between items-start py-2 px-10">
          <div>
            <p class="text-gray-500 text-sm font-medium leading-6">
              Initiated By
            </p>
            <p class="text-gray-500 text-sm font-medium">
              <span>{{ new Date().toDateString() }}</span> @
              <span>{{ new Date().toLocaleTimeString() }}</span>
            </p>
            <div class="flex items-start space-x-4 py-2">
              <img
                class="h-10 w-10 rounded-full"
                src="@/assets/images/default-avatar.jpg"
                alt=""
              />
              <div>
                <p class="text-black text-lg capitalize">{{ auth.name }}</p>
                <p class="text-gray-600 text-sm capitalize">
                  {{ auth.subrole }} - {{ auth.role }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="lg:col-span-1 w-full px-6 py-4 border-b border-gray-300">
        <div class="mb-6">
          <p class="text-gray-600 font-light text-sm">
            <span>{{ new Date().toDateString() }}</span> @
            <span>{{ new Date().toLocaleTimeString() }}</span>
          </p>
          <p class="py-2 text-gray-700 leading-6">
            {{ form.comment ? form.comment : 'No Comment Entered' }}
          </p>
          <div class="flex items-start space-x-4 py-2">
            <img
              class="h-10 w-10 rounded-full"
              src="@/assets/images/default-avatar.jpg"
              alt=""
            />
            <div>
              <p class="text-black text-lg capitalize">{{ auth.name }}</p>
              <p class="text-gray-600 text-sm capitalize">
                {{ auth.subrole }} - {{ auth.role }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <confirmation
      v-if="showConfirmation"
      @close="showConfirmation = false"
      @approve=";(showConfirmation = false), (showFinalStep = true)"
    />
    <final-step
      v-if="showFinalStep"
      :status="status"
      :message="message"
      @close="showFinalStep = false"
    />
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api'
import SelectComponent from '@/components/Form/Select.vue'
import InputComponent from '@/components/Form/Input.vue'
import Confirmation from '@/components/Overlays/Confirmation.vue'
import FinalStep from '@/components/Overlays/finalStep.vue'
import { CustomerController } from '@/module/Customer'
import { CylinderController } from '@/module/Cylinder'
import { mainStore } from '@/module/Pinia'

export default defineComponent({
  name: 'Transfer',
  components: { SelectComponent, Confirmation, FinalStep, InputComponent },
  layout: 'dashboard',
  setup() {
    const appStore = mainStore()
    const auth: any = appStore.getLoggedInUser
    const types = [
      {
        name: 'Permanent Transfer',
        value: 'branch',
      },
      {
        name: 'Temporary Transfer',
        value: 'temporary',
      },
    ]
    const form = reactive({
      type: '',
      reciepient: '',
      comment: '',
    })
    const reciepients = ref([])
    const showConfirmation = ref(false)
    const showFinalStep = ref(false)
    const status = ref('')
    const message = ref('')
    const customers = ref<any>([])
    const customerValue = ref('')
    const cylinders = ref<any>([])
    const cylindersArrays = ref<any>([])
    const context = useContext()

    const transferType = ref<string>('temporary')

    onMounted(() => {
      CustomerController.fetchUnPaginatedCustomers().then((response) => {
        customers.value = response
      })
    })

    function increaseCounter() {
      cylinders.value.push({
        customer: '',
        cylinder: '',
        volume: '',
        type: '',
      })
      cylindersArrays.value.push([])
    }

    function decreaseCounter(index: any) {
      cylinders.value.splice(index, 1)
      componentKey.value++
    }

    async function getBranches() {
      const response = await CylinderController.fetchBranches()
      return response
    }

    async function setAndFetch(value: String, index: any) {
      cylindersArrays.value[index] = []
      cylinders.value[index].cylinder = ''
      setVolumeAndType('', index)

      if (value !== '') {
        const customerCylinders = await fetchCustomerCylinders(value)
        cylinders.value[index].customer = value
        cylindersArrays.value[index] = customerCylinders
      } else {
        cylindersArrays.value[index] = []
        cylinders.value[index].cylinder = ''
        setVolumeAndType('', index)
      }
      componentKey.value++
    }

    function setVolumeAndType(cylinderId: String, index: any) {
      if (cylinderId !== '') {
        cylindersArrays.value[index].forEach((element: any) => {
          if (element._id === cylinderId) {
            cylinders.value[index].volume = element.gasVolumeContent
            cylinders.value[index].type = element.cylinderType
            cylinders.value[index].cylinder = element._id
          }
        })
      } else {
        cylinders.value[index].volume = ''
        cylinders.value[index].type = ''
      }
      componentKey.value++
    }

    function returnValue(index: any) {
      return cylinders.value[index]
    }

    function changeTransferType(type: string) {
      form.type = type
      reciepients.value = []
      reciepients.value = customers.value.map((element: any) => {
        return {
          name: element.name,
          value: element._id,
        }
      })
    }

    const submit = () => {
      let validation = true
      if (cylinders.value.length) {
        cylinders.value.forEach((element: any) => {
          if (element.cylinder === '') {
            validation = false
          }
        })
      }
      if (!validation || !cylinders.value.length) {
        context.$toast.error('Cylinders are required')
      } else if (!form.type || !form.reciepient || !form.comment) {
        context.$toast.error('All Fields are Required')
      } else {
        const requestCylinders = cylinders.value.map((element: any) => {
          return element.cylinder
        })

        const requestBody = {
          type: form.type,
          comment: form.comment,
          to: form.reciepient,
          cylinders: requestCylinders,
          holdingTime: 30,
        }

        CylinderController.initiateCylinderTransfer(requestBody).then(() => {
          form.type = form.comment = form.reciepient = ''
          cylinders.value = []
          componentKey.value++
        })
      }
    }

    const componentKey = ref(0)

    async function fetchCustomerCylinders(customerId: String) {
      const response = await CustomerController.fetchCylinders(customerId)

      return response.docs
    }

    watch(status, (currentValue) => {
      if (currentValue === 'success') {
        message.value = 'You have successfully approved this request'
      } else if (currentValue === 'error') {
        message.value = 'You have regretably declined this request'
      }
    })

    return {
      types,
      reciepients,
      showConfirmation,
      showFinalStep,
      status,
      message,
      customers,
      form,
      setAndFetch,
      customerValue,
      returnValue,
      increaseCounter,
      cylindersArrays,
      componentKey,
      cylinders,
      setVolumeAndType,
      submit,
      getBranches,
      changeTransferType,
      decreaseCounter,
      auth,
      transferType,
    }
  },
})
</script>
