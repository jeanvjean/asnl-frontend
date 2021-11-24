<template>
  <div :key="componentKey">
    <div class="py-4">
      <h2 class="text-lg font-light my-4 px-8">Customer Details</h2>
      <div class="flex items-center space-x-4 px-8">
        <div class="flex-initial">
          <svg
            class="
              text-btn-purple
              mr-3
              h-10
              w-10
              fill-current
              bg-gray-400 bg-opacity-25
              rounded-full
              p-2
            "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 452.608 452.608"
          >
            <path
              d="M285.184 92.672V63.488h6.656c17.408 0 31.744-14.336 31.744-31.744S309.248 0 291.84 0H160.768c-17.408 0-31.744 14.336-31.744 31.744s14.336 31.744 31.744 31.744h6.656v29.184c-38.912 2.56-69.12 34.816-69.12 73.728v80.384h256V166.4c0-38.912-30.208-71.168-69.12-73.728zm-25.6-.512h-20.48V80.896h-25.6V92.16h-20.48V62.976h66.56V92.16zM98.304 272.384v81.92c0 28.16 15.872 53.76 40.96 66.56v31.744h174.08v-31.744c25.088-12.8 40.96-38.4 40.96-66.56v-81.92h-256z"
            />
          </svg>
        </div>
        <div class="flex-1">
          <h3 class="font-semibold text-lg">
            {{ ecr.customer }}
          </h3>
          <span class="font-medium text-sm">{{ ecr.address }}</span>
        </div>
      </div>
      <div class="w-full mx-auto mt-10 px-8">
        <h3 class="font-semibold text-lg">Scan ID : {{ scan.formId }}</h3>
        <table class="w-full">
          <thead class="bg-gray-200">
            <tr class="w-full">
              <!-- <th></th> -->
              <th
                class="
                  text-left
                  uppercase
                  font-extralight
                  text-sm
                  px-4
                  py-3
                  text-black
                "
              >
                Cylinder Number
              </th>
              <th
                class="
                  text-left
                  uppercase
                  font-extralight
                  text-sm
                  px-4
                  py-3
                  text-black
                "
              >
                Cylinder Size
              </th>
            </tr>
          </thead>

          <tbody class="bg-white">
            <tr
              v-for="(cylind, k) in scanCylinders"
              :key="k + getRandomValue()"
            >
              <!-- <td class="px-4">
                <input
                  type="checkbox"
                  name="internal"
                  :checked="form.cylinders.includes(cylind._id)"
                  @input="addCylinders(cylind._id)"
                />
              </td> -->
              <td class="px-4 py-2">{{ cylind.cylinderNumber }}</td>
              <td class="px-4 py-2">{{ cylind.volume }}</td>
            </tr>

            <tr class="border border-black">
              <!-- <td class="px-4"></td> -->
              <td class="px-4 py-2">Total Quantity</td>
              <td class="px-4 py-2">{{ form.totalQuantity }}</td>
            </tr>
            <tr class="border border-black">
              <!-- <td class="px-4"></td> -->
              <td class="px-4 py-2">Total Volume(Kg)</td>
              <td class="px-4 py-2">{{ form.totalVolume }}</td>
            </tr>
            <tr class="border border-black">
              <!-- <td class="px-4"></td> -->
              <td class="px-4 py-2">Quantity to be Filled</td>
              <td class="px-4 py-2">{{ form.quantityToFill }}</td>
            </tr>
            <tr class="border border-black">
              <!-- <td class="px-4"></td> -->
              <td class="px-4 py-2">Volume to be Filled</td>
              <td class="px-4 py-2">{{ form.volumeToFill }}</td>
            </tr>
          </tbody>
        </table>
        <form @submit.prevent="submit">
          <div class="w-full grid grid-rows-1 md:grid-cols-3 my-2 md:gap-x-4">
            <select-component
              :label-title="'Shift'"
              :default-option-text="'Select an shift'"
              :select-array="shifts"
              :init-value="form.shift"
              @get="form.shift = $event.value"
            />

            <select-component
              :label-title="'Gas Type'"
              :default-option-text="'Select an Gas'"
              :select-array="gasTypes"
              :init-value="form.gasType"
              @get="form.gasType = $event.value"
              :isDisabled="true"
              v-if="form.gasType"
            />

            <input-component
              :label-title="'ECR Number'"
              :input-placeholder="'Enter ECR Number'"
              :default-value="form.ecrNo"
              :is-disabled="true"
              :is-required="false"
            />
          </div>
          <div>
            <p class="text-gray-500 text-sm font-medium leading-6">
              Initiated on
            </p>
            <p class="text-gray-500 text-sm font-medium">
              <span>{{ new Date().toDateString() }}</span> @
              <span>{{ new Date().toLocaleTimeString() }}</span>
            </p>
          </div>

          <div class="w-1/4 my-10">
            <button-component
              :button-class="'bg-btn-purple text-white w-auto'"
              :button-text="'Submit'"
              :loading-status="buttonLoading"
            />
          </div>
        </form>
      </div>
    </div>
    <send-to-production
      v-if="showProduction"
      @close="showProduction = !showProduction"
    />
    <external-supplier
      v-if="showSupplier"
      @close="showSupplier = !showSupplier"
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
  useRoute,
  useRouter,
  watch,
} from '@nuxtjs/composition-api'
import Validator from 'validatorjs'
import SendToProduction from '@/components/Overlays/SendToProduction.vue'
import ExternalSupplier from '@/components/Overlays/ExternalSupplier.vue'
import { fetchEcr } from '@/module/ECR'
import { getRandomValue } from '@/constants/utils'
import SelectComponent from '@/components/Form/Select.vue'
import { CylinderController } from '@/module/Cylinder'
import InputComponent from '@/components/Form/Input.vue'
import { ValidatorObject } from '~/module/Validation'
import { initiateScan } from '@/module/SCAN'
import ButtonComponent from '@/components/Form/Button.vue'
import { createSchedule } from '~/module/Production'
export default defineComponent({
  components: {
    SendToProduction,
    ExternalSupplier,
    SelectComponent,
    InputComponent,
    ButtonComponent,
  },
  layout: 'noSidebar',
  setup() {
    const componentKey = ref<number>(1)
    const changeComponentKey = () => {
      componentKey.value = getRandomValue()
    }
    const buttonLoading = ref<Boolean>(false)
    const ecrId = useRoute().value.params.id
    const ecr = reactive<any>({
      customer: '',
      address: '',
      cylinders: [],
      ecrNo: '',
    })
    const shifts = [
      {
        name: 'Morning',
        value: 'morning',
      },
      {
        name: 'Night',
        value: 'night',
      },
    ]
    const form = reactive<any>({
      customer: '',
      ecrNo: '',
      ecrId: '',
      shift: '',
      date: new Date().toISOString(),
      cylinders: [],
      quantityToFill: 0,
      volumeToFill: 0,
      totalQuantity: 0,
      totalVolume: 0,
      comment: '',
      gasType: '',
    })
    const gasTypes = ref([])
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
    const scan = reactive<any>({
      status: '',
      _id: '',
      cylinders: [],
      formId: '',
      initNum: 0,
    })
    const newCylinders = ref<any>([])
    const scanCylinders = ref<any>([])
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
        form.volumeToFill = 0
        const ref = db.ref(`forms/${currentValue}/form`)
        // const ref = db.ref(`forms/1/form`)
        const cynd = ecr.cylinders.map((item: any) => item.cylinderNumber)
        console.log(cynd)
        ref.on(
          'value',
          (snapshot: any) => {
            scanCylinders.value = [...newCylinders.value]
            const cyl = JSON.parse(snapshot.val().cylinders)
            console.log(cyl)
            if (cyl != null) {
              form.quantityToFill = cyl.length
              cyl.forEach((item: any) => {
                CylinderController.confirmCylinderOnSysytem(
                  '',
                  item.barcode,
                  ''
                ).then((data) => {
                  if (
                    data &&
                    cynd.includes(data.data.cylinder.cylinderNumber)
                  ) {
                    scanCylinders.value.push({
                      _id: data.data.cylinder._id,
                      cylinderNumber: data.data.cylinder.cylinderNumber,
                      barcode: data.data.cylinder.barcode,
                      volume:
                        data.data.cylinder.gasVolumeContent.value +
                        data.data.cylinder.gasVolumeContent.unit,
                    })
                    form.volumeToFill +=
                      data.data.cylinder.gasVolumeContent.value
                  }
                })
              })
              form.cylinders = scanCylinders
            }
          },
          (errorObject: Error) => {
            console.log('The read failed: ' + errorObject.name)
          }
        )
      },
      { immediate: true }
    )
    watch(
      () => scanCylinders,
      (currentValue, oldValue) => {
        // let totalVolume: Number
        console.log('here')
        form.volumeToFill = 0
        currentValue.value.forEach((item: any) => {
          console.log(item)
          form.volumeToFill += Number(item.volume)
        })
        // form.volumeToFill = totalVolume
        changeComponentKey()
      },
      { immediate: true }
    )

    const getEcr = (ecrId: string) => {
      fetchEcr(ecrId)
        .then((response) => {
          console.log(response)
          ecr.customer = response.customer ? response.customer.name : ''
          ecr.address = response.customer ? response.customer.address : ''
          ecr.cylinders = response.cylinders
          ecr.ecrNo = response.ercNo
          form.ecr = response._id
          form.customer = response.customer ? response.customer._id : ''
          form.ecrNo = response.ecrNo
          form.totalQuantity = ecr.cylinders.length
          form.totalVolume = ecr.cylinders.reduce(
            (curr: number, prev: any) =>
              (curr += Number(prev.gasVolumeContent.value)),
            0
          )
          form.gasType = response.cylinders[0].gasType
        })
        .finally(() => changeComponentKey())
    }
    onMounted(() => {
      Promise.all([getEcr(ecrId), getGases(), initCylinder()])
    })
    const addCylinders = (cylinderId: string) => {
      if (form.cylinders.includes(cylinderId)) {
        const firstIndex = form.cylinders.indexOf(cylinderId)
        form.cylinders.splice(firstIndex, 1)
      } else {
        form.cylinders.push(cylinderId)
      }
      form.quantityToFill = form.cylinders.length
      let total: number = 0

      ecr.cylinders.forEach((element: any) => {
        if (form.cylinders.includes(element._id)) {
          total += Number(element.gasVolumeContent.value)
        }
      })
      form.volumeToFill = total
    }
    const showProduction = ref<Boolean>(false)
    const showSupplier = ref<Boolean>(false)
    const context = useContext()
    const router = useRouter()
    const submit = () => {
      const rules = {
        customer: 'required|string',
        ecrNo: 'required|string',
        shift: 'required|alpha',
        date: 'required|date',
        cylinders: 'required|array',
        quantityToFill: 'required|numeric',
        volumeToFill: 'required|numeric',
        totalQuantity: 'required|numeric',
        totalVolume: 'required|numeric',
        comment: 'string',
        gasType: 'required|string',
      }
      // form.cylinders = ecr.cylinders
      const validation: any = new Validator(form, rules, {
        required: ':attribute must have an element',
      })
      if (validation.fails()) {
        let messages: string[] = []
        messages = ValidatorObject.getMessages(validation.errors)
        messages.forEach((error: string) => {
          context.$toast.error(error)
        })
      } else {
        buttonLoading.value = true
        createSchedule(form)
          .then(() => {
            router.push('/dashboard/production/ecr-list')
          })
          .finally(() => {
            buttonLoading.value = false
          })
      }
    }
    return {
      showProduction,
      showSupplier,
      ecr,
      getRandomValue,
      shifts,
      addCylinders,
      form,
      scan,
      gasTypes,
      changeComponentKey,
      componentKey,
      submit,
      buttonLoading,
      scanCylinders,
    }
  },
})
</script>