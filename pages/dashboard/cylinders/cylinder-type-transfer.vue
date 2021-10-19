<template>
  <div :key="componentKey" class="px-6 py-6">
    <div class="grid grid-rows-1 lg:grid-cols-4 py-2 px-6">
      <div class="lg:col-span-3 overflow-x-auto bg-white px-4">
        <div class="md:flex justify-between px-8 py-4">
          <h1 class="flex-1 text-gray-400 font-medium text-lg my-2 md:my-0">
            Cylinder Type
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
        <div class="w-full overflow-x-auto px-2 my-8 border-collapse">
          <table class="table w-full border-collapse border-0">
            <thead>
              <tr>
                <th class="w-auto"></th>
                <th
                  class="
                    font-light
                    text-sm
                    px-2
                    py-2
                    text-center
                    border border-gray-400
                  "
                >
                  Assigned Number
                </th>
                <th
                  class="
                    font-light
                    text-sm
                    px-2
                    py-2
                    text-center
                    border border-gray-400
                  "
                >
                  Cylinder Type
                </th>
                <th
                  class="
                    font-light
                    text-sm
                    px-2
                    py-2
                    text-center
                    border border-gray-400
                  "
                >
                  Gas Type
                </th>
                <th
                  class="
                    font-light
                    text-sm
                    px-2
                    py-2
                    text-center
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
                    :default-value="cylinder.type"
                    :input-placeholder="'Cylinder Type'"
                    :is-disabled="true"
                  />
                </td>
                <td class="font-light text-lg text-center">
                  <input-component
                    :default-value="cylinder.gasType"
                    :input-placeholder="'Gas Type'"
                    :is-disabled="true"
                  />
                </td>
                <td class="font-light text-lg text-center">
                  <input-component
                    :default-value="cylinder.volume"
                    :input-placeholder="'Volume'"
                    :is-disabled="true"
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
            :label-title="'Change Cylinder Type to'"
            :default-option-text="'Select New Cylinder Type'"
            :select-array="CylinderTypes"
            :init-value="form.cylinderType"
            @get="form.cylinderType = $event.value"
          />
          <select-component
            :label-title="'Change Gas Type to'"
            :default-option-text="'Select New Gas Type'"
            :select-array="gasTypes"
            :init-value="form.gasType"
            @get="form.gasType = $event.value"
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
import Validator from 'validatorjs'
import SelectComponent from '@/components/Form/Select.vue'
import InputComponent from '@/components/Form/Input.vue'
import { mainStore } from '@/module/Pinia'
import { CylinderController } from '@/module/Cylinder'
import { CylinderTypes } from '@/constants/variables'
import { ValidatorObject } from '@/module/Validation'

export default defineComponent({
  name: 'Transfer',
  components: { SelectComponent, InputComponent },
  layout: 'dashboard',
  setup() {
    const form = reactive({
      reciepient: '',
      comment: '',
      gasType: '',
      cylinderType: '',
    })
    const appStore = mainStore()
    const auth: any = appStore.getLoggedInUser
    const reciepients = ref([])
    const showConfirmation = ref(false)
    const showFinalStep = ref(false)
    const status = ref('')
    const message = ref('')
    const cylinders = ref<any>([])
    const cylinderResponse = ref<any>([])
    const context = useContext()
    const router = useRouter()
    const gasTypes = ref<any>([])

    const componentKey = ref(0)

    onMounted(() => {
      getGasType()
      CylinderController.getRegisteredCylindersUnPaginated().then(
        (response) => {
          cylinderResponse.value = response.data
        }
      )
    })

    const transferType = ref<string>('')

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
        waterCapacity: '',
        colorCode: '',
      })
    }

    function getGasType() {
      CylinderController.getCylinders().then((response) => {
        const myResponse = response.data.data.cylinders
        gasTypes.value = myResponse.map((element: any) => {
          return {
            name: element.gasName,
            value: element._id,
          }
        })
      })
    }

    function setOtherValues(cylinderId: string, index: any) {
      cylinderResponse.value.forEach((element: any) => {
        if (element._id === cylinderId) {
          cylinders.value[index].volume = element.gasVolumeContent
          cylinders.value[index].type = element.cylinderType
          cylinders.value[index].gasType = element.gasType.gasName
          cylinders.value[index].colorCode = element.gasType.colorCode
          cylinders.value[index].waterCapacity = element.waterCapacity
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

    const goBack = () => {
      router.push('/dashboard/cylinders/cylinder-type')
    }

    const submit = () => {
      const requestCylinders = cylinders.value.map((cylinder: any) => {
        return cylinder.cylinder
      })
      const requestBody = {
        comment: form.comment,
        gasType: form.gasType,
        cylinderType: form.cylinderType,
        cylinders: requestCylinders,
      }
      const rules = {
        cylinders: 'required|array',
        comment: 'string',
        cylinderType: 'required|string',
        gasType: 'required|string',
      }

      const validation = new Validator(requestBody, rules)
      if (validation.fails()) {
        let messages: string[] = []
        messages = ValidatorObject.getMessages(validation.errors)
        messages.forEach((error: string) => {
          context.$toast.error(error)
        })
      } else {
        CylinderController.updateCylinder(requestBody).then(() => {
          goBack()
        })
      }
    }

    watch(status, (currentValue) => {
      if (currentValue === 'success') {
        message.value = 'You have successfully approved this request'
      } else if (currentValue === 'error') {
        message.value = 'You have regretably declined this request'
      }
    })

    return {
      reciepients,
      showConfirmation,
      showFinalStep,
      status,
      message,
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
      CylinderTypes,
      getGasType,
      gasTypes,
      goBack,
    }
  },
})
</script>
