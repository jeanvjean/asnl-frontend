<template>
  <div :key="componentKey" class="px-6 py-6">
    <div class="grid grid-rows-1 md:grid-cols-4 py-2 px-4">
      <div
        class="
          lg:flex lg:justify-between lg:items-center lg:col-span-3 lg:gap-2
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
            to="/dashboard/cylinders/transfer"
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
          <!-- <router-link
            to="/dashboard/cylinders/outright-sale"
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
              class="w-6 h-6 fill-current text-white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.5 4H8.79C9.24 4 9.46 4.54 9.15 4.84L7.71 6.28L12.71 11.29C12.89 11.48 13 11.74 13 12V19C13 19.55 12.55 20 12 20C11.45 20 11 19.55 11 19V12.4L6.29 7.7L4.85 9.14C4.54 9.46 4 9.24 4 8.79V4.5C4 4.22 4.22 4 4.5 4ZM16.29 6.29L14.85 4.85C14.54 4.54 14.76 4 15.21 4H19.5C19.78 4 20 4.22 20 4.5V8.79C20 9.24 19.46 9.46 19.15 9.15L17.71 7.71L14.83 10.59L13.41 9.17L16.29 6.29Z"
              />
            </svg>
            <span>Outright sales/transfer</span>
          </router-link> -->

          <div class="relative w-full">
            <svg
              class="
                w-6
                h-6
                fill-current
                text-btn-purple
                absolute
                top-0
                mt-4
                ml-2
              "
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.5 4H8.79C9.24 4 9.46 4.54 9.15 4.84L7.71 6.28L12.71 11.29C12.89 11.48 13 11.74 13 12V19C13 19.55 12.55 20 12 20C11.45 20 11 19.55 11 19V12.4L6.29 7.7L4.85 9.14C4.54 9.46 4 9.24 4 8.79V4.5C4 4.22 4.22 4 4.5 4ZM16.29 6.29L14.85 4.85C14.54 4.54 14.76 4 15.21 4H19.5C19.78 4 20 4.22 20 4.5V8.79C20 9.24 19.46 9.46 19.15 9.15L17.71 7.71L14.83 10.59L13.41 9.17L16.29 6.29Z"
              />
            </svg>
            <select
              v-model="transferType"
              class="
                block
                w-full
                h-full
                text-base
                focus:outline-none focus:ring-btn-purple
                border-btn-purple
                sm:text-sm
                rounded-md
                pl-8
                text-btn-purple
              "
            >
              <option value="sale">Outright Sales</option>
              <option value="division">Transfer</option>
            </select>
          </div>

          <router-link
            to="/dashboard/cylinders/condemn"
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
            to="/dashboard/cylinders/cylinder-type-transfer"
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
          <h1 class="flex-1 text-gray-400 font-medium text-lg my-2 md:my-0">
            {{
              transferType === 'sale'
                ? 'Outright Sales'
                : transferType === 'division'
                ? 'Transfer'
                : 'Outright Sales / Transfer'
            }}
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
              @click="goBack"
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
                  Assigned Number
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
                  Cylinder Type
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
                  Manufacture Date
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
                  Gas Type
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
                  Volume
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
                    v-model="cylinder.cylinder"
                    class="
                      w-full
                      border-2 border-gray-200
                      py-2
                      rounded-sm
                      focus:outline-none
                    "
                    @change="setOtherValues(cylinder.cylinder, i)"
                  >
                    <option value="">Select a Cylinder</option>

                    <option
                      v-for="(cylin, index) in cylinderResponse"
                      :key="index"
                      :value="cylin._id"
                    >
                      {{ cylin.cylinderNumber }}
                    </option>
                  </select>
                </td>
                <td class="font-light text-lg text-center">
                  <input-component
                    :default-value="cylinder.type"
                    :input-placeholder="'Cylinder Type'"
                  />
                </td>
                <td class="font-light text-lg text-center">
                  <input-component
                    :default-value="cylinder.date"
                    :input-placeholder="'Manufacture Date'"
                    :input-type="'date'"
                  />
                </td>
                <td class="font-light text-lg text-center">
                  <input-component
                    :default-value="cylinder.gasType"
                    :input-placeholder="'Gas Type'"
                  />
                </td>
                <td class="font-light text-lg text-center">
                  <input-component
                    :default-value="cylinder.volume.value"
                    :input-placeholder="'Cost of Sale'"
                  />
                </td>

                <td class="font-light text-lg text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 fill-current text-transparent"
                    viewBox="0 0 24 24"
                    stroke="black"
                    @click="deleteCylinder(i)"
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
            :label-title="'Transfer To'"
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
                v-if="auth.image"
                class="h-10 w-10 rounded-full"
                :src="auth.image"
                alt=""
              />
              <img
                v-else
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
              v-if="auth.image"
              class="h-10 w-10 rounded-full"
              :src="auth.image"
              alt=""
            />
            <img
              v-else
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
import SelectComponent from '@/components/Form/Select.vue'
import InputComponent from '@/components/Form/Input.vue'
import { mainStore } from '@/module/Pinia'
import { CylinderController } from '@/module/Cylinder'
import { CustomerController } from '@/module/Customer'

export default defineComponent({
  name: 'Transfer',
  components: { SelectComponent, InputComponent },
  layout: 'dashboard',
  setup() {
    const form = reactive({
      reciepient: '',
      comment: '',
    })
    const appStore = mainStore()
    const auth: any = appStore.getLoggedInUser
    const reciepients = ref([])
    const showConfirmation = ref(false)
    const showFinalStep = ref(false)
    const status = ref('')
    const message = ref('')
    const customers = ref<any>([])
    const cylinders = ref<any>([])
    const cylinderResponse = ref<any>([])
    const context = useContext()
    const branches = ref<any>([])

    const componentKey = ref(0)

    onMounted(() => {
      Promise.all([getRegisteredCylinders(), fetchBranches(), fetchCustomers()])
    })

    function getRegisteredCylinders() {
      CylinderController.getRegisteredCylindersUnPaginated().then(
        (response) => {
          const cylinderResponseFirst = response.data

          for (const i in cylinderResponseFirst) {
            if (cylinderResponseFirst[i].available) {
              cylinderResponse.value.push(cylinderResponseFirst[i])
            }
          }
        }
      )
    }

    const transferType = ref<string>('division')

    function fetchCustomers() {
      CustomerController.fetchUnPaginatedCustomers().then((response) => {
        customers.value = response.map((element: any) => {
          return {
            name: element.name,
            value: element._id,
          }
        })
        // reciepients.value = customers.value
      })
    }

    function fetchBranches() {
      CylinderController.fetchBranches().then((response: any) => {
        response.forEach((branch: any) => {
          if (auth.branch !== branch._id) {
            branches.value.push({
              name: `${branch.name} - ${branch.location}`,
              value: branch._id,
            })
          }
        })
        reciepients.value = branches.value
      })
    }

    function deleteCylinder(index: number) {
      cylinders.value.splice(index, 1)
    }

    function increaseCounter() {
      cylinders.value.push({
        type: '',
        cylinder: '',
        date: '',
        volume: '',
        gasType: '',
      })
    }

    function setOtherValues(cylinderId: string, index: any) {
      cylinderResponse.value.forEach((element: any) => {
        if (element._id === cylinderId) {
          cylinders.value[index].volume = element.gasVolumeContent
          cylinders.value[index].type = element.cylinderType
          cylinders.value[index].gasType = element.gasType.gasName
          const newDate = new Date(element.dateManufactured)
          const dateValue = {
            year: newDate.getFullYear(),
            day:
              getlength(newDate.getDay()) > 1
                ? newDate.getDay()
                : `0${newDate.getDay()}`,
            month:
              getlength(newDate.getMonth()) > 1
                ? newDate.getMonth()
                : `0${newDate.getMonth()}`,
          }

          const initDate = `${dateValue.year}-${dateValue.month}-${dateValue.day}`
          cylinders.value[index].date = initDate
        }
      })
      componentKey.value++
    }

    function getlength(number: number) {
      return number.toString().length
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
      } else if (!form.reciepient) {
        context.$toast.error('All Fields are Required')
      } else {
        const requestCylinders = cylinders.value.map((element: any) => {
          return element.cylinder
        })

        const requestBody = {
          type: transferType.value,
          comment: form.comment,
          to: form.reciepient,
          cylinders: requestCylinders,
        }

        CylinderController.initiateCylinderTransfer(requestBody)
          .then(() => {
            goBack()
          })
          .catch(() => {})
      }
    }

    const router = useRouter()

    const goBack = () => {
      router.push('/dashboard/cylinders/transfer-list')
    }

    watch(transferType, (currentValue) => {
      if (currentValue === 'sale') {
        reciepients.value = customers.value
      } else if (currentValue === 'division') {
        reciepients.value = branches.value
      }
    })

    return {
      reciepients,
      showConfirmation,
      showFinalStep,
      status,
      message,
      customers,
      form,
      increaseCounter,
      componentKey,
      cylinders,
      submit,
      cylinderResponse,
      setOtherValues,
      auth,
      deleteCylinder,
      transferType,
      goBack,
    }
  },
})
</script>
