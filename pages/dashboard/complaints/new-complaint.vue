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
              @get="form.icnNo = $event.value"
            />

            <input-component
              :label-title="'ECR Number'"
              :input-placeholder="'Enter ECR Number'"
              :default-value="form.ecrNo"
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
          <div class="font-bold text-lg my-4 tracking-wide">
            CYLINDER DETAILS
          </div>
          <div
            v-for="(cylinder, index) in form.cylinders"
            :key="index"
            class="grid grid-rows-1 lg:grid-cols-5 gap-4"
          >
            <select-component
              :label-title="'Cylinder Number'"
              :default-option-text="'Enter Cylinder Number'"
              :select-array="cylinders"
              :init-value="cylinder.cylinderNo"
              @get="cylinder.cylinderNo = $event.value"
            />
            <input-component
              :label-title="'Cylinder Size'"
              :input-placeholder="'Enter Cylinder Size'"
              :input-type="'number'"
              @get="cylinder.cylinderSize = $event.value"
            />
            <input-component
              :label-title="'Date Supplied'"
              :input-placeholder="'Select Date'"
              :input-type="'date'"
              @get="cylinder.dateSupplied = $event.value"
            />
            <input-component
              :label-title="'Delivery/WayBill Number'"
              :input-placeholder="'Enter Delivery/Waybill Number'"
              :input-type="'number'"
              @get="cylinder.waybillNo = $event.value"
            />
            <input-component
              :label-title="'Total Volume'"
              :input-placeholder="'Enter Total Volume'"
              @get="cylinder.totalVolume = $event.value"
            />
          </div>
          <div class="font-bold text-lg my-4">CYLINDER REPLACE DETAILS</div>
          <div class="grid grid-rows-1 lg:grid-cols-3 gap-4">
            <select-component
              :label-title="'Cylinder Number'"
              :default-option-text="'Enter Cylinder Number'"
              :select-array="cylinders"
              :init-value="form.replaceCylinder.cylinderNo"
              @get="form.replaceCylinder.cylinderNo = $event.value"
            />
            <input-component
              :label-title="'Cylinder Size'"
              :input-placeholder="'Enter Cylinder Size'"
              @get="form.replaceCylinder.cylinderSize = $event.value"
            />
            <input-component
              :label-title="'Total Volume'"
              :input-placeholder="'Enter Total Volume'"
              @get="form.replaceCylinder.totalVolume = $event.value"
            />
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
import { CustomerController } from '~/module/Customer'
import { CylinderController } from '~/module/Cylinder'

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
      cylinders: [
        {
          cylinderNo: '',
          cylinderSize: '',
          dateSupplied: '',
          waybillNo: '',
          totalVolume: '',
        },
      ],
      replaceCylinder: {
        cylinderNo: '',
        cylinderSize: '',
        totalVolume: '',
      },
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
        icnNo: 'required|string',
        ecrNo: 'required|string',
        cylinders: 'required|array',
        'cylinders.*.cylinderNo': 'required|string',
        'cylinders.*.cylinderSize': 'required|string',
        'cylinders.*.dateSupplied': 'required|string',
        'cylinders.*.waybillNo': 'required|string',
        'cylinders.*.totalVolume': 'required|string|min:1',
        'replaceCylinder.cylinderNo': 'required|string',
        'replaceCylinder.cylinderSize': 'required|string',
        'replaceCylinder.totalVolume': 'required|string',
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
      keyValue.value++
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
    }
  },
})
</script>
