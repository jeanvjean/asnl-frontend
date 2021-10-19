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
          />

          <select-component
            :label-title="'Mode of Service'"
            :default-option-text="'Select an Mode of service'"
            :select-array="modeOfServices"
            :init-value="form.modeOfService"
            @get="form.modeOfService = $event.value"
          />

          <select-component
            :label-title="'Gas Type'"
            :default-option-text="'Select Gas Type'"
            :init-value="form.gasType"
            :select-array="gasTypes"
            @get="form.gasType = $event.value"
          />
        </div>

        <div
          v-if="
            form.modeOfService === 'both' || form.modeOfService === 'customer'
          "
          class="w-full overflow-x-auto mt-8 mb-5"
        >
          <h1 class="uppercase font-semibold text-lg my-2">
            External Cylinders
          </h1>
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
              <tr
                v-for="(externalCylinder, j) in form.fringeCylinders"
                :key="j"
              >
                <td class="text-center">{{ j + 1 }}</td>

                <td>
                  <input-component
                    :input-placeholder="'Cylinder Number'"
                    :default-value="externalCylinder.cylinderNo"
                    :input-type="'text'"
                    @get="externalCylinder.cylinderNo = $event.value"
                  />
                </td>
                <td>
                  <input-component
                    :input-placeholder="'Cylinder Size'"
                    :default-value="externalCylinder.cylinderSize"
                    :input-type="'number'"
                    @get="externalCylinder.cylinderSize = $event.value"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div class="inline-block text-sm text-gray-400 my-2">
            <button
              class="flex justify-evenly items-center"
              type="button"
              @click="incrementFringeCylinders"
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
        </div>

        <div
          v-if="form.modeOfService === 'both' || form.modeOfService === 'asnl'"
          class="w-full overflow-x-auto mt-8 mb-5"
        >
          <h1 class="uppercase font-semibold text-lg my-2">ASNL Cylinders</h1>
          <table class="table w-full border-collapse text-gray-700">
            <thead>
              <tr>
                <th
                  class="w-auto text-center px-0.5 border border-black text-xs"
                >
                  S/N
                </th>
                <th class="w-auto border border-black text-center">
                  ASNL Number
                </th>
                <th class="w-auto border border-black text-center">
                  Cylinder Size
                </th>
                <th class="w-auto px-1"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cylinder, i) in form.cylinders" :key="i">
                <td class="text-center">{{ i + 1 }}</td>

                <td>
                  <select-component
                    :input-placeholder="'ASNL Number'"
                    :init-value="cylinder.cylinderId"
                    :default-option-text="'Select ASNL Cylinder'"
                    :select-array="cylinders"
                    @get="
                      ;(cylinder.cylinderId = $event.value),
                        setVolume($event.value, i)
                    "
                  />
                </td>
                <td>
                  <input-component
                    :input-placeholder="'Cylinder Size'"
                    :default-value="cylinder.cylinderSize"
                    :input-type="'text'"
                    :is-disabled="true"
                    @get="cylinder.cylinderSize = $event.value"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div class="inline-block text-sm text-gray-400 my-2">
            <button
              class="flex justify-evenly items-center"
              type="button"
              @click="incrementAsnlCylinders()"
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
              <span class="underline">Add Cylinders</span>
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
import { fetchIcn } from '@/module/Incoming'
import { getRandomValue } from '@/constants/utils'
import { CylinderController } from '@/module/Cylinder'
import { ValidatorObject } from '@/module/Validation'
import { createEcr } from '@/module/ECR'
export default defineComponent({
  components: { InputComponent, SelectComponent, ButtonComponent },
  layout: 'dashboard',
  setup() {
    const route = useRoute()
    const icn = route.value.params.id
    const form = reactive<any>({
      customer: '',
      cylinders: [],
      orderType: '',
      modeOfService: '',
      fringeCylinders: [],
      gasType: '',
      priority: 1,
    })
    const buttonLoading = ref<Boolean>(false)

    const orderTypes = [
      {
        name: 'Refill Order ',
        value: 'refill',
      },
      {
        name: 'Complaints',
        value: 'complaints',
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

    const componentKey = ref<number>(1)

    const changeComponentKey = () => {
      componentKey.value = getRandomValue()
    }

    const gasTypes = ref([])
    const cylinders = ref([])

    const constantsValues = reactive({
      icnNo: '',
      customerName: '',
    })

    const getGases = () => {
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

    const getIcn = (icnId: string) => {
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
          cylinders.value = response.data.map((element: any) => {
            return {
              name: element.cylinderNumber,
              value: element._id,
              volume: element.gasVolumeContent.value,
            }
          })
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

    const incrementFringeCylinders = () => {
      form.fringeCylinders.push({
        cylinderNo: '',
        cylinderSize: '',
      })
    }

    const incrementAsnlCylinders = () => {
      form.cylinders.push({
        cylinderId: '',
        cylinderSize: '',
      })
    }

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
      incrementFringeCylinders,
      incrementAsnlCylinders,
      cylinders,
      orderTypes,
      modeOfServices,
      setVolume,
      buttonLoading,
      submit,
    }
  },
})
</script>
