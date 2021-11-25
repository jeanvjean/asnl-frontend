<template>
  <div :key="componentKey" class="w-full md:w-10/12 lg:w-7/12 md:mx-auto mt-10">
    <div class="bg-white px-6 md:p-10 py-4">
      <div class="my-1">
        <h1 class="font-bold text-xl uppercase tracking-normal">New FCR</h1>
        Scan ID:{{ scan.formId }}
      </div>
      <form @submit.prevent="submit">
        <div
          class="w-full items-center grid grid-rows-1 md:grid-cols-3 md:gap-x-4"
        >
          <input-component
            :label-title="'Supplier\'s Name'"
            :input-placeholder="'Suppliers'"
            :is-required="false"
            :is-disabled="true"
            :default-value="constantsValues.supplierName"
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
            :init-value="form.type"
            :isDisabled="true"
            @get="form.type = $event.value"
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

        <div class="w-full overflow-x-auto mt-8 mb-5">
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
              <tr v-for="(cylinder, j) in scanCylinders" :key="j">
                <td class="text-center">{{ j + 1 }}</td>
                <td>
                  <input-component
                    :input-placeholder="'Cylinder Number'"
                    :default-value="cylinder.cylinderNumber"
                    :input-type="'text'"
                    @get="cylinder.name = $event.value"
                    :is-disabled="cylinder.type ? false : true"
                  />
                </td>
                <td>
                  <input-component
                    :input-placeholder="'Cylinder Size'"
                    :default-value="cylinder.volume"
                    :input-type="'text'"
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
        </div>

        <div class="flex items-center w-full md:w-1/3 lg:w-1/4 space-x-4 my-4">
          <button-component
            :button-class="'bg-btn-purple text-white w-auto'"
            :button-text="'Save'"
            :loading-status="buttonLoading"
            v-if="scanCylinders.length > 0"
          />
        </div>
      </form>
    </div>
    <new-cylinder
      v-if="showRegister"
      @close="showRegister = false"
      @refresh="showRegister = false"
      @addToScanCylinder="addToScanCylinder"
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
  watch,
} from '@nuxtjs/composition-api'
import Validator from 'validatorjs'
import InputComponent from '@/components/Form/Input.vue'
import SelectComponent from '@/components/Form/Select.vue'
import ButtonComponent from '@/components/Form/Button.vue'
import NewCylinder from '@/components/Overlays/NewCylinder.vue'
import { fetchIcn } from '@/module/Incoming'
import { initiateScan } from '@/module/SCAN'
import { getRandomValue } from '@/constants/utils'
import { CylinderController } from '@/module/Cylinder'
import { ValidatorObject } from '@/module/Validation'
import { createEcr } from '@/module/ECR'
export default defineComponent({
  components: { InputComponent, NewCylinder, SelectComponent, ButtonComponent },
  layout: 'dashboard',
  setup(ctx) {
    const route = useRoute()
    const icn = route.value.params.id
    const form = reactive<any>({
      supplier: {},
      cylinders: [],
      type: 'filled',
      gasType: '',
      priority: 2,
      icn_id: '',
    })
    const scan = reactive<any>({
      status: '',
      _id: '',
      cylinders: [],
      formId: 0,
      initNum: 0,
    })
    const buttonLoading = ref<Boolean>(false)
    const orderTypes = [
      {
        name: 'Filled',
        value: 'filled',
      },
      {
        name: 'Complaints',
        value: 'complaint',
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
    const totalCylinders = ref<any>([])
    const selectedGas = ref(null)
    const scanCylinders = ref<any>([])

    const newCylinders = ref<any>([])
    const constantsValues = reactive({
      icnNo: '',
      supplierName: '',
    })

    const setGasType = (gasId: String) => {
      form.gasType = gasId
      gasTypes.value.forEach((cylinder: any) => {
        if (cylinder.value === gasId) {
          selectedGas.value = cylinder.name
        }
      })
    }
    const getGasLength = (gasName: String) => {
      let gasesLength = 0
      totalCylinders.value.forEach((item: any) => {
        if (item.gasType.gasName == gasName) {
          gasesLength += 1
        }
      })
      return gasesLength
    }

    const initCylinder = () => {
      initiateScan().then((response) => {
        scan.status = response.status
        scan._id = response._id
        scan.cylinders = response.cylinders
        scan.formId = response.formId
        scan.initNum = response.initNum
      })
    }

    const { $fire } = useContext()
    const db = $fire.database

    watch(
      () => scan.formId,
      (currentValue, oldValue) => {
        const ref = db.ref(`forms/${currentValue}/form`)
        // const ref = db.ref(`forms/1/form`)
        ref.on(
          'value',
          (snapshot: any) => {
            scanCylinders.value = [...newCylinders.value]

            const cyl = JSON.parse(snapshot.val().cylinders)
            if (cyl != null) {
              cyl.forEach((item: any) => {
                // console.log(cylinders)
                CylinderController.confirmCylinderOnSysytem(
                  '',
                  item.barcode,
                  ''
                ).then((data) => {
                  if (!totalCylinders.value.includes(data.data.cylinder._id)) {
                    scanCylinders.value.push({
                      _id: data.data.cylinder._id,
                      cylinderNumber: data.data.cylinder.cylinderNumber,
                      barcode: data.data.cylinder.barcode,
                      volume:
                        data.data.cylinder.gasVolumeContent.value +
                        data.data.cylinder.gasVolumeContent.unit,
                    })
                  }
                })
              })
            }
          },
          (errorObject: Error) => {
            console.log('The read failed: ' + errorObject.name)
          }
        )
      },
      { immediate: true }
    )

    const addToScanCylinder = (item: any) => {
      scanCylinders.value.push({
        _id: item._id,
        cylinderNumber: item.cylinderNumber,
        barcode: item.barcode,
        volume: item.gasVolumeContent.value + item.gasVolumeContent.unit,
      })
      newCylinders.value.push({
        _id: item._id,
        cylinderNumber: item.cylinderNumber,
        barcode: item.barcode,
        volume: item.gasVolumeContent.value + item.gasVolumeContent.unit,
      })
      changeComponentKey()
    }
    const getGases = () => {
      CylinderController.getCylinders().then((response) => {
        const myResponse = response.data.data.cylinders
        gasTypes.value = myResponse.map((element: any) => {
          return {
            name: element.gasName,
            value: element._id,
            // length: getGasLength(element.gasName),
          }
        })
        changeComponentKey()
      })
    }
    const getIcn = (icnId: any) => {
      fetchIcn(icnId)
        .then((response: any) => {
          console.log(response)
          form.supplier = response.supplier._id
          constantsValues.icnNo = response.icnNo
          form.icn_id = response._id
          constantsValues.supplierName = response.supplier.name
        })
        .finally(() => changeComponentKey())
    }
    const fetchCylinders = () => {
      CylinderController.getRegisteredCylindersUnPaginated().then(
        (response) => {
          totalCylinders.value = response.data.map(
            (element: any) => element.cylinderNumber
          )

          form.cylinders = response.data.map((element: any) => {
            return {
              cylinderId: element.cylinderNumber,
              cylinderSize: element.gasVolumeContent.value,
              id: element._id,
            }
          })
          changeComponentKey()
        }
      )
    }

    onMounted(() => {
      Promise.all([getIcn(icn), getGases(), fetchCylinders(), initCylinder()])
    })
    const context = useContext()
    const router = useRouter()
    const submit = () => {
      const rules = {
        cylinders: 'array',
        'cylinders.*.cylinderId': 'required|string',
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
          form.cylinders = scanCylinders.value.map(
            (cylinder: any) => cylinder._id
          )
        }

        createEcr(form)
          .then(() => {
            router.push('/dashboard/purchase-orders/fcr-list')
          })
          .finally(() => (buttonLoading.value = false))
      }
    }
    return {
      form,
      scan,
      constantsValues,
      componentKey,
      gasTypes,
      totalCylinders,
      orderTypes,
      priorities,
      modeOfServices,
      // setVolume,
      buttonLoading,
      submit,
      setGasType,
      selectedGas,
      scanCylinders,
      getGasLength,
      showRegister,
      addToScanCylinder,
    }
  },
})
</script>