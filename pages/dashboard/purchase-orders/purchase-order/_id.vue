<template>
  <div :key="componentKey" class="w-full md:w-10/12 lg:w-8/12 md:mx-auto mt-10">
    <div class="bg-white px-6 md:px-10 py-6">
      <div class="float-right">
        <div class="flex space-x-4 items-center">
          <span>{{ new Date().toDateString() }}</span
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            class="fill-current w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div>Scan: {{ scan.formId }}</div>
      <form autocomplete="off" method="POST" @submit.prevent="submit">
        <div
          class="
            flex
            items-center
            justify-between
            mt-10
            divide-x-2 divide-gray-300
          "
        >
          <div
            class="
              w-full
              justify-between
              items-center
              grid grid-rows-1
              md:grid-cols-2 md:gap-x-2
            "
          >
            <select-component
              :labelTitle="'Order Type'"
              :input-placeholder="'Select Order Type'"
              :select-array="orderTypes"
              :default-option-text="'Select Order Type'"
              @get="form.type = $event.value"
            />
            <select-component
              :label-title="'Supplier'"
              :default-option-text="'Select Supplier'"
              :select-array="suppliersArray"
              :init-value="form.supplier"
              @get="form.supplier = $event.value"
              v-if="form.type == 'external'"
            />

            <select-component
              :label-title="'Branch'"
              :default-option-text="'Select Branch'"
              :select-array="branchesArray"
              :init-value="form.fromBranch"
              :isDisabled="true"
            />
            <select-component
              :label-title="'Gas Type'"
              :default-option-text="'Select Gas Type'"
              :select-array="gasTypes"
              :initValue="form.gasType"
              :isDisabled="true"
            />
          </div>
        </div>

        <div class="w-full overflow-x-auto mt-10 mb-5">
          <table class="table w-full border-collapse text-gray-500">
            <thead>
              <tr>
                <th class="w-auto text-center"></th>
                <th class="w-6/12 border border-black">Cylinder No</th>
                <th class="w-5/12 border border-black">Cylinder Size</th>
                <th class="w-auto"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cylinder, i) in scanCylinders" :key="i">
                <td class="text-center">{{ i + 1 }}</td>

                <td>
                  <select-component
                    :input-placeholder="'Enter Cylinder No'"
                    :init-value="cylinder.cylinderNumber"
                    :select-array="cylinderArray"
                    :default-option-text="'Select Cylinder'"
                    @get="cylinder.cylinderNo = $event.value"
                    :isDisabled="cylinder.cylinderNo != ''"
                  />
                </td>
                <td>
                  <input-component
                    :input-placeholder="'Enter Volume'"
                    :default-value="cylinder.volume"
                    @get="cylinder.volume = $event.value"
                    :isDisabled="cylinder.volume != ''"
                  />
                </td>
                <td>
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      class="fill-current text-gray-600 w-4 h-4"
                      @click="removeCylinders(i)"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex md:space-x-4 flex-col md:flex-row items-center my-8">
          <div class="w-full">
            <text-area-component
              :input-placeholder="'Comment'"
              :label-title="'Comment'"
              :default-value="form.comment"
              @get="form.comment = $event.value"
            />
          </div>
        </div>

        <div
          class="flex items-center w-1/2 space-x-4 my-10"
          v-if="scanCylinders.length > 0"
        >
          <button-component
            :button-class="'bg-btn-purple text-white w-auto'"
            :button-text="'Create order'"
            :loading-status="buttonLoading"
          />
          <button-component
            :button-class="'text-btn-purple border border-btn-purple bg-white w-auto'"
            :button-text="'Cancel'"
          />
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  reactive,
  ref,
  useContext,
  useRouter,
  useRoute,
  watch,
} from '@nuxtjs/composition-api'
import Validator from 'validatorjs'
import ButtonComponent from '@/components/Form/Button.vue'
import InputComponent from '@/components/Form/Input.vue'
import SelectComponent from '@/components/Form/Select.vue'
import TextAreaComponent from '@/components/Form/TextArea.vue'
import { getRandomValue } from '@/constants/utils'
import { CylinderController } from '@/module/Cylinder'
import { CustomerController } from '@/module/Customer'
import { ValidatorObject } from '@/module/Validation'
import { fetchBranches } from '@/module/Branch'
import { ProductObject } from '@/module/Product'
import { mainStore } from '@/module/Pinia'
import { fetchEcr } from '@/module/ECR'
import { initiateScan } from '@/module/SCAN'
export default defineComponent({
  components: {
    SelectComponent,
    ButtonComponent,
    InputComponent,
    TextAreaComponent,
  },
  layout: 'dashboard',
  setup() {
    const form = reactive<any>({
      cylinders: [],
      fromBranch: '',
      supplier: '',
      date: new Date().toISOString(),
      comment: '',
      gasType: '',
      type: 'internal',
      ecr: '',
    })
    const scan = reactive<any>({
      status: '',
      _id: '',
      cylinders: [],
      formId: '',
      initNum: 0,
    })
    const { getLoggedInUser: auth }: any = mainStore()
    const userBranch = auth.branch

    const componentKey = ref<Number>()
    const cylinderArray = ref<any>([])
    const scanCylinders = ref<any>([])
    const branchesArray = ref<any>([])
    const orderTypes = ref([
      { name: 'Internal Purchase Order', value: 'internal' },
      { name: 'External Purchase Order', value: 'external' },
    ])
    const orderType = ref<String>()
    const selectedGas = ref(null)
    const suppliersArray = ref<any>([])
    const context = useContext()
    const router = useRouter()
    const route = useRoute()
    const increaseCounter = () => {
      form.cylinders.push({
        cylinderNo: '',
        volume: '',
      })
    }
    const buttonLoading = ref<Boolean>(false)

    const removeCylinders = (index: any) => {
      scanCylinders.value.splice(index, 1)
      changeComponentKey()
    }

    const changeComponentKey = () => {
      componentKey.value = getRandomValue()
    }
    const initCylinder = () => {
      initiateScan().then((response) => {
        console.log(response)
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
        console.log(currentValue)
        const ref = db.ref(`forms/${currentValue}/form`)
        // const ref = db.ref(`forms/1/form`)
        ref.on(
          'value',
          (snapshot: any) => {
            if (snapshot.val()) {
              const cyl = JSON.parse(snapshot.val().cylinders)
              if (cyl.length) {
                let item = cyl[cyl.length - 1]

                CylinderController.confirmCylinderOnSysytem(
                  '',
                  item.barcode,
                  ''
                ).then((data) => {
                  if (
                    data &&
                    totalCylinders.value.includes(
                      data.data.cylinder.cylinderNumber
                    )
                  ) {
                    scanCylinders.value.push({
                      _id: data.data.cylinder._id,
                      cylinderNumber: data.data.cylinder.cylinderNumber,
                      barcode: data.data.cylinder.barcode,
                      volume:
                        data.data.cylinder.gasVolumeContent.value +
                        data.data.cylinder.gasVolumeContent.unit,
                    })
                  }
                  form.cylinders.push({
                    cylinderNo: data.data.cylinder.cylinderNumber,
                    volume: {
                      value: data.data.cylinder.gasVolumeContent.value,
                      unit: data.data.cylinder.gasVolumeContent.unit,
                    },
                  })
                })
                // })
              }
            }
          },
          (errorObject: Error) => {
            console.log('The read failed: ' + errorObject.name)
          }
        )
      },
      { immediate: true }
    )

    const fetchCylinders = () => {
      CylinderController.getRegisteredCylindersUnPaginated().then(
        (response) => {
          cylinderArray.value = response.data.map((element: any) => {
            return {
              name: element.cylinderNumber,
              value: element.cylinderNumber,
              ...element,
            }
          })
        }
      )
      changeComponentKey()
    }
    function changeOrderType(value: any) {
      orderType.value = value
      form.type = value
      changeComponentKey()
    }

    const getBranches = () => {
      fetchBranches().then((response: any) => {
        branchesArray.value = response.map((element: any) => {
          return {
            name: `${element.name} - ${element.location}`,
            value: element._id,
          }
        })
      })

      ProductObject.fetchAllSuppliers().then((response: any) => {
        suppliersArray.value = response.map((element: any) => {
          return {
            name: `${element.name} - ${element.location}`,
            value: element._id,
          }
        })
      })
      changeComponentKey()
    }

    const gasTypes = ref<any>([])

    const fetchGasTypes = () => {
      CylinderController.getCylinders().then((response) => {
        const myResponse = response.data.data.cylinders

        gasTypes.value = myResponse.map((element: any) => {
          return {
            name: element.gasName,
            value: element._id,
          }
        })
        changeComponentKey()
      })
    }
    const totalCylinders = <any>ref([])
    const getEcr = () => {
      fetchEcr(route.value.params.id).then((response) => {
        console.log(response)
        selectedGas.value = response.cylinders[0].gasName
        form.fromBranch = response.branch._id
        form.ecr = route.value.params.id
        form.gasType = response.cylinders[0].gasType
        totalCylinders.value = response.cylinders.map(
          (element: any) => element.cylinderNumber
        )
        changeComponentKey()
      })
    }
    onBeforeMount(() => {
      changeComponentKey()
      Promise.all([
        fetchCylinders(),
        getBranches(),
        getEcr(),
        fetchGasTypes(),
        initCylinder(),
      ])
    })

    const submit = () => {
      const rules = {
        fromBranch: form.type == 'internal' ? 'required|string' : 'string',
        supplier: form.type == 'external' ? 'required|string' : 'string',
        date: 'required|date',
        cylinders: 'required|array',
        'cylinders.*.cylinderNo': 'required|string',
        'cylinders.*.volume': 'required',
        gasType: 'required',
      }
      if (form.type == 'external') {
        delete form.fromBranch
      }
      if (form.type == 'internal') {
        delete form.supplier
      }
      console.log(form)
      const validation: any = new Validator(form, rules)
      if (validation.fails()) {
        let messages: string[] = []

        messages = ValidatorObject.getMessages(validation.errors)
        messages.forEach((error: string) => {
          context.$toast.error(error)
        })
      } else {
        buttonLoading.value = true
        CustomerController.createPurchaseOrder(form)
          .then(() => {
            router.push('/dashboard/purchase-orders')
          })
          .finally(() => {
            buttonLoading.value = false
          })
      }
    }

    return {
      form,
      scan,
      increaseCounter,
      removeCylinders,
      branchesArray,
      cylinderArray,
      componentKey,
      submit,
      buttonLoading,
      gasTypes,
      suppliersArray,
      orderTypes,
      orderType,
      changeOrderType,
      scanCylinders,
    }
  },
})
</script>
