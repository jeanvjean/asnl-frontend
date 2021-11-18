<template>
  <div :key="componentKey" class="w-full md:w-10/12 lg:w-7/12 md:mx-auto mt-10">
    <div class="bg-white px-6 md:p-10 py-4">
      <div class="my-1">
        <h1 class="font-bold text-xl uppercase tracking-normal">New ECR</h1>
      </div>
      <form @submit.prevent="submit">
        <div
          class="w-full items-center grid grid-rows-1 md:grid-cols-3 md:gap-x-4"
        >
          <input-component
            :label-title="'Customer'"
            :input-placeholder="'Customer'"
            :is-required="false"
            :is-disabled="true"
            :default-value="constantsValues.customerName"
          />

          <input-component
            :label-title="'ICN Number'"
            :input-placeholder="'ICN Number'"
            :is-required="false"
            :is-disabled="true"
            :default-value="constantsValues.icnNo"
          />

          <select-component
            :label-title="'Order Type'"
            :default-option-text="'Select an Order Type'"
            :select-array="orderTypes"
            :init-value="form.orderType"
            @get="form.orderType = $event.value"
            :isDisabled="true"
          />
          <select-component
            :label-title="'Priority'"
            :default-option-text="'Select an Priority'"
            :select-array="priorities"
            :init-value="form.priority"
            @get="form.priority = $event.value"
          />

          <select-component
            :label-title="'Gas Type'"
            :default-option-text="'Select Gas Type'"
            :init-value="form.gasType"
            :select-array="gasTypes"
            @get="setGasType($event.value)"
          />
        </div>

        <div v-if="selectedGas" class="w-full overflow-x-auto mt-8 mb-5">
          <h1 class="uppercase font-semibold text-lg my-2">All Cylinders</h1>
          <table class="table w-full border-collapse text-gray-700">
            <thead>
              <tr>
                <th
                  class="w-auto text-center px-0.5 border border-black text-xs"
                >
                  S/N
                </th>
                <th class="w-auto border border-black text-center">
                  Cylinder Number
                </th>
                <th class="w-auto border border-black text-center">
                  Cylinder Size
                </th>
                <th class="w-auto px-1"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cylinder, j) in gasCylinders" :key="j">
                <td class="text-center">{{ j + 1 }}</td>
                <td>
                  <input-component
                    :input-placeholder="'Cylinder Number'"
                    :default-value="cylinder.name"
                    :input-type="'text'"
                    @get="cylinder.name = $event.value"
                    :is-disabled="cylinder.type ? false : true"
                  />
                </td>
                <td>
                  <input-component
                    :input-placeholder="'Cylinder Size'"
                    :default-value="cylinder.volume"
                    :input-type="'number'"
                    @get="cylinder.volume = $event.value"
                    :is-disabled="cylinder.type ? false : true"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div class="inline-block text-sm text-gray-400 my-2 mr-3">
            <button
              class="flex justify-evenly items-center"
              type="button"
              @click="showRegister = true"
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
              <span class="underline">Register New Cylinder</span>
            </button>
          </div>
          <div class="inline-block text-sm text-gray-400 my-2">
            <button
              class="flex justify-evenly items-center"
              type="button"
              @click="addToCylinders"
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
              <span class="underline">Add New Cylinder</span>
            </button>
          </div>
        </div>

        <div class="flex items-center w-full md:w-1/3 lg:w-1/4 space-x-4 my-4">
          <button-component
            :button-class="'bg-btn-purple text-white w-auto'"
            :button-text="'Save'"
            :loading-status="buttonLoading"
          />
        </div>
      </form>
    </div>
    <new-cylinder
      v-if="showRegister"
      @close="showRegister = false"
      @refresh="showRegister = false"
    ></new-cylinder>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  useContext,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'
import Validator from 'validatorjs'
import InputComponent from '@/components/Form/Input.vue'
import SelectComponent from '@/components/Form/Select.vue'
import ButtonComponent from '@/components/Form/Button.vue'
import NewCylinder from '@/components/Overlays/NewCylinder.vue'
import { fetchIcn } from '@/module/Incoming'
import { getRandomValue } from '@/constants/utils'
import { CylinderController } from '@/module/Cylinder'
import { ValidatorObject } from '@/module/Validation'
import { createEcr } from '@/module/ECR'
export default defineComponent({
  components: { InputComponent, NewCylinder, SelectComponent, ButtonComponent },
  layout: 'dashboard',
  setup() {
    const route = useRoute()
    const icn = route.value.params.id
    const form = reactive<any>({
      customer: '',
      cylinders: [],
      orderType: 'sales',
      modeOfService: '',
      fringeCylinders: [],
      gasType: '',
      priority: 2,
    })
    const buttonLoading = ref<Boolean>(false)
    const orderTypes = [
      {
        name: 'Refill Order',
        value: 'sales',
      },
      {
        name: 'Complaints',
        value: 'complaints',
      },
    ]
    const priorities = [
      {
        name: 'Regular',
        value: 2,
      },
      {
        name: 'Urgent',
        value: 1,
      },
    ]
    const modeOfServices = [
      {
        name: 'Customers Cylinders',
        value: 'customer',
      },
      {
        name: 'ASNL Cylinders',
        value: 'asnl',
      },
      {
        name: 'Both',
        value: 'both',
      },
    ]
    const showRegister = ref(false)
    const componentKey = ref<number>(1)
    const changeComponentKey = () => {
      componentKey.value = getRandomValue()
    }
    const gasTypes = ref([])
    const cylinders = ref([])
    const selectedGas = ref(null)
    const gasCylinders = ref<any>([])
    const constantsValues = reactive({
      icnNo: '',
      customerName: '',
    })

    const setGasType = (gasId: String) => {
      form.gasType = gasId
      gasTypes.value.forEach((cylinder: any) => {
        if (cylinder.value === gasId) {
          selectedGas.value = cylinder.name
        }
      })
      gasCylinders.value = []
      cylinders.value.forEach((item: any) => {
        if (item.gasType.gasName == selectedGas.value) {
          gasCylinders.value.push(item)
        }
      })
    }
    const getGasLength = (gasName: String) => {
      let gasesLength = 0
      cylinders.value.forEach((item: any) => {
        if (item.gasType.gasName == gasName) {
          gasesLength += 1
        }
      })
      console.log(gasesLength)

      return gasesLength
    }
    const getGases = () => {
      CylinderController.getCylinders().then((response) => {
        const myResponse = response.data.data.cylinders
        gasTypes.value = myResponse.map((element: any) => {
          return {
            name: element.gasName,
            value: element._id,
            length: getGasLength(element.gasName),
          }
        })
      })
    }
    const getIcn = (icnId: any) => {
      fetchIcn(icnId)
        .then((response: any) => {
          form.customer = response.customer._id
          constantsValues.icnNo = response.icnNo
          constantsValues.customerName = response.customer.name
        })
        .finally(() => changeComponentKey())
    }
    const fetchCylinders = () => {
      CylinderController.getRegisteredCylindersUnPaginated().then(
        (response) => {
          console.log(response)
          cylinders.value = response.data.map((element: any) => {
            return {
              name: element.cylinderNumber,
              value: element._id,
              volume: element.gasVolumeContent.value,
              gasType: element.gasType,
              length: getGasLength(element.gasType.gasName),
            }
          })
          changeComponentKey()
        }
      )
    }
    const setVolume = (id: string, index: any) => {
      cylinders.value.forEach((cylinder: any) => {
        if (cylinder.value === id) {
          form.cylinders[index].cylinderSize = cylinder.volume
        }
      })
      changeComponentKey()
    }

    const addToCylinders = () => {
      gasCylinders.value.push({
        cylinderId: '',
        cylinderSize: '',
        type: 'new',
      })
    }
    // const registeredCylinders = ref([])
    // const stat = reactive({
    //   totalCylinders: 0,
    //   totalBufferCylinders: 0,
    //   totalAssignedCylinders: 0,
    // })
    // const paginationProp = reactive({
    //   hasNextPage: false,
    //   hasPrevPage: false,
    //   currentPage: 1,
    // })
    // function getCylinders(
    //   pageValue: number,
    //   pageLimit: number = 10,
    //   query = ''
    // ) {
    //   isLoading.value = true
    //   CylinderController.getRegisteredCylinders(pageValue, pageLimit, query)
    //     .then((responses: any) => {
    //       const myResponse = responses.data
    //       stat.totalCylinders = myResponse.counts.totalCylinders
    //       stat.totalBufferCylinders = myResponse.counts.totalBufferCylinders
    //       stat.totalAssignedCylinders = myResponse.counts.totalAssignedCylinders
    //       registeredCylinders.value = myResponse.cylinders.docs
    //       paginationProp.hasNextPage = myResponse.cylinders.hasNextPage
    //       paginationProp.hasPrevPage = myResponse.cylinders.hasPrevPage
    //       paginationProp.currentPage = myResponse.cylinders.page
    //     })
    //     .finally(() => {
    //       isLoading.value = false
    //     })
    // }
    onMounted(() => {
      Promise.all([getIcn(icn), getGases(), fetchCylinders()])
    })
    const context = useContext()
    const router = useRouter()
    const submit = () => {
      const rules = {
        cylinders: 'array',
        'cylinders.*.cylinderId': 'required|string',
        fringeCylinders: 'array',
        'fringeCylinders.*.cylinderNo': 'required|string',
        'fringeCylinders.*.cylinderSize': 'required|string',
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
        if (form.cylinders.length) {
          form.cylinders = form.cylinders.map(
            (cylinder: any) => cylinder.cylinderId
          )
        }
        gasCylinders.value.forEach((item: any) => {
          if (item.type) {
            form.fringeCylinders.push({
              cylinderNo: item.name,
              cylinderSize: item.volume,
            })
            console.log(item)
          }
        })
        createEcr(form)
          .then(() => {
            router.push('/dashboard/production/ecr-list')
          })
          .finally(() => (buttonLoading.value = false))
      }
    }
    return {
      form,
      constantsValues,
      componentKey,
      gasTypes,
      cylinders,
      orderTypes,
      priorities,
      modeOfServices,
      setVolume,
      buttonLoading,
      submit,
      setGasType,
      selectedGas,
      gasCylinders,
      addToCylinders,
      getGasLength,
      showRegister,
    }
  },
})
</script>