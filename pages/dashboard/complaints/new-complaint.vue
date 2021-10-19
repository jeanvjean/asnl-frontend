<template>
  <div :key="keyValue" class="px-6 py-6">
    <div class="bg-white w-full h-full rounded-sm">
      <div class="px-6 py-6">
        <div class="mb-4">
          <h1 class="font-medium text-xl text-black">Add New Complaint</h1>
        </div>
        <form @submit.prevent="submit">
          <div class="grid grid-rows-1 lg:grid-cols-3 gap-4">
            <select-component
              :label-title="'Complaint Type'"
              :default-option-text="'Select a Complaint Type'"
              :select-array="complaintTypes"
              :init-value="form.complaintType"
              @get="form.complaintType = $event.value"
            />

            <select-component
              :label-title="'Customers'"
              :default-option-text="'Select Customer'"
              :select-array="customers"
              :init-value="form.customer"
              @get="form.customer = $event.value"
            />

            <input-component
              :label-title="'ICN Number'"
              :input-placeholder="'Enter ICN Number'"
              :default-value="form.icnNo"
              :is-required="false"
              @get="form.icnNo = $event.value"
            />

            <input-component
              :label-title="'ECR Number'"
              :input-placeholder="'Enter ECR Number'"
              :default-value="form.ecrNo"
              :is-required="false"
              @get="form.ecrNo = $event.value"
            />

            <div class="col-span-2">
              <input-component
                :label-title="'Complaint Title'"
                :input-placeholder="'Enter Complaint Title'"
                :default-value="form.title"
                @get="form.title = $event.value"
              />
              <text-area-component
                :label-title="'Complaint Description'"
                :input-placeholder="'Enter Description'"
                :default-value="form.issue"
                @get="form.issue = $event.value"
              />
            </div>
          </div>
          <div class="font-bold text-lg my-4 tracking-wide overflow-x-auto">
            <div class="flex items-center justify-between pl-1 pr-4 py-2">
              <h1>CYLINDER DETAILS</h1>
              <button
                type="button"
                class="
                  border border-btn-purple
                  bg-gray-50
                  text-btn-purple text-sm
                  py-1
                  px-4
                  rounded-md
                  font-semibold
                "
                @click="incrementCylinderCount"
              >
                Add Cylinders
              </button>
            </div>

            <table class="table table-auto w-full border-collapse">
              <thead class="text-gray-800">
                <th class="border border-black font-semibold text-sm">S/N</th>
                <th class="border border-black font-semibold text-base">
                  Cylinder Number
                </th>
                <th class="border border-black font-semibold text-base">
                  Cylinder Size
                </th>
                <th class="border border-black font-semibold text-base">
                  Date Supplied
                </th>
                <th class="border border-black font-semibold text-base">
                  Delivery/Waybill Number
                </th>
                <th class="border border-black font-semibold text-base">
                  Total Volume
                </th>
                <th class="px-2"></th>
              </thead>
              <tbody>
                <tr v-for="(cylinder, index) in form.cylinders" :key="index">
                  <td class="text-center">{{ index + 1 }}</td>
                  <td>
                    <select-component
                      :default-option-text="'Enter Cylinder Number'"
                      :select-array="cylinders"
                      :init-value="cylinder.cylinderNo"
                      @get="cylinder.cylinderNo = $event.value"
                    />
                  </td>
                  <td>
                    <input-component
                      :input-placeholder="'Enter Cylinder Size'"
                      :input-type="'number'"
                      @get="cylinder.cylinderSize = $event.value"
                    />
                  </td>
                  <td>
                    <input-component
                      :input-placeholder="'Select Date'"
                      :input-type="'date'"
                      @get="cylinder.dateSupplied = $event.value"
                    />
                  </td>
                  <td>
                    <input-component
                      :input-placeholder="'Enter Delivery/Waybill Number'"
                      @get="cylinder.waybillNo = $event.value"
                    />
                  </td>
                  <td>
                    <input-component
                      :input-placeholder="'Enter Total Volume'"
                      @get="cylinder.totalVolume = $event.value"
                    />
                  </td>
                  <td>
                    <button @click="decrementCylinderCount(index)">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        class="fill-current text-gray-600 w-4 h-4"
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

          <div class="font-bold text-lg my-4 tracking-wide overflow-x-auto">
            <h1>CYLINDER REPLACE DETAILS</h1>

            <table class="table table-auto w-full border-collapse my-2">
              <thead class="text-gray-800">
                <th class="border border-black font-semibold text-sm">S/N</th>
                <th class="border border-black font-semibold text-base">
                  Cylinder Number
                </th>
                <th class="border border-black font-semibold text-base">
                  Cylinder Size
                </th>
                <th class="border border-black font-semibold text-base">
                  Total Volume
                </th>
              </thead>
              <tbody>
                <tr v-for="(replace, j) in form.replaceCylinder" :key="j">
                  <td class="text-center">{{ j + 1 }}</td>
                  <td>
                    <select-component
                      :default-option-text="'Enter Cylinder Number'"
                      :select-array="cylinders"
                      :init-value="replace.cylinderNo"
                      @get="replace.cylinderNo = $event.value"
                    />
                  </td>
                  <td>
                    <input-component
                      :input-placeholder="'Enter Cylinder Size'"
                      :input-type="'number'"
                      @get="replace.cylinderSize = $event.value"
                    />
                  </td>
                  <td>
                    <input-component
                      :input-placeholder="'Total Volume'"
                      :input-type="'number'"
                      @get="replace.totalVolume = $event.value"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="grid grid-rows-1 lg:grid-cols-2 gap-4">
            <text-area-component
              :label-title="'Accessories Replacement'"
              :input-placeholder="'Enter Description'"
              @get="form.additionalAction = $event.value"
            />

            <text-area-component
              :label-title="'Approving Officer Comment'"
              :input-placeholder="'Enter Comment'"
              @get="form.comment = $event.value"
            />
          </div>
          <div class="md:flex w-full md:space-x-2 md:w-1/4 my-6">
            <button-component
              :button-text="'Send Complaint'"
              :button-class="'py-2 bg-btn-purple text-white rounded-sm'"
              :loading-status="loading"
            />
            <button-component
              :button-text="'Cancel'"
              :button-class="'py-2 bg-white text-btn-purple border border-btn-purple rounded-sm'"
              @buttonClicked="reset"
            />
          </div>
        </form>
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
} from '@nuxtjs/composition-api'
import Validator from 'validatorjs'
import InputComponent from '@/components/Form/Input.vue'
import TextAreaComponent from '@/components/Form/TextArea.vue'
import SelectComponent from '@/components/Form/Select.vue'
import ButtonComponent from '@/components/Form/Button.vue'
import { ValidatorObject } from '@/module/Validation'
import { CustomerController } from '@/module/Customer'
import { CylinderController } from '@/module/Cylinder'
import { getRandomValue } from '@/constants/utils'

export default defineComponent({
  components: {
    InputComponent,
    ButtonComponent,
    SelectComponent,
    TextAreaComponent,
  },
  layout: 'dashboard',
  setup() {
    const context = useContext()

    const complaintTypes = [
      {
        name: 'Cylinder',
        value: 'cylinder',
      },
    ]

    const modelNumbers = ref<any>([])
    const router = useRouter()

    const form = reactive<any>({
      customer: '',
      complaintType: '',
      title: '',
      issue: '',
      comment: '',
      icnNo: '',
      ecrNo: '',
      cylinders: [],
      replaceCylinder: [],
      additionalAction: '',
    })

    const loading = ref(false)

    const customers = ref<any>([])
    const cylinders = ref<any>([])

    const fetchCustomers = () => {
      CustomerController.fetchUnPaginatedCustomers().then((response) => {
        customers.value = response.map((element: any) => {
          return {
            name: element.name,
            value: element._id,
          }
        })
      })
    }

    const incrementCylinderCount = () => {
      form.cylinders.push({
        cylinderNo: '',
        cylinderSize: '',
        dateSupplied: '',
        waybillNo: '',
        totalVolume: '',
      })

      form.replaceCylinder.push({
        cylinderNo: '',
        cylinderSize: '',
        totalVolume: '',
      })
    }

    const decrementCylinderCount = (index: any) => {
      form.cylinders.splice(index, 1)
      form.replaceCylinder.splice(index, 1)
      reset()
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

    onMounted(() => {
      Promise.all([fetchCustomers(), fetchCylinders()])
    })

    const submit = () => {
      const rules = {
        customer: 'required|string',
        complaintType: 'required|string',
        title: 'required|string',
        issue: 'required|string',
        comment: 'required|string',
        icnNo: 'required_unless:ecrNo|string',
        ecrNo: 'required_unless:icnNo|string',
        cylinders: 'required|array',
        'cylinders.*.cylinderNo': 'required|string',
        'cylinders.*.cylinderSize': 'required|string',
        'cylinders.*.dateSupplied': 'required|string',
        'cylinders.*.waybillNo': 'required|string',
        'cylinders.*.totalVolume': 'required|string|min:1',
        'replaceCylinder.*.cylinderNo': 'required|string',
        'replaceCylinder.*.cylinderSize': 'required|string',
        'replaceCylinder.*.totalVolume': 'required|string',
        additionalAction: 'required|string',
      }

      const validation: any = new Validator(form, rules)
      if (validation.fails()) {
        let messages: string[] = []

        messages = ValidatorObject.getMessages(validation.errors)
        messages.forEach((error: string) => {
          context.$toast.error(error)
        })
      } else {
        loading.value = true
        CustomerController.createComplaint(form, form.customer)
          .then(() => {
            reset()
            router.go(-1)
          })
          .finally(() => {
            loading.value = false
          })
      }
    }

    const reset = () => {
      keyValue.value = getRandomValue()
    }

    const keyValue = ref(1)

    return {
      form,
      submit,
      keyValue,
      reset,
      loading,
      complaintTypes,
      modelNumbers,
      customers,
      cylinders,
      incrementCylinderCount,
      decrementCylinderCount,
    }
  },
})
</script>
