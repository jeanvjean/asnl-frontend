<template>
  <div :key="keyValue" class="px-6 py-6">
    <div class="bg-white w-full h-full rounded-sm">
      <div class="px-6 py-6">
        <form @submit.prevent="showConfirmation">
          <div class="grid grid-rows-1 lg:grid-cols-3 gap-4">
            <select-component
              :label-title="'Complaint Type'"
              :default-option-text="'Select a Complaint Type'"
              :select-array="complaintTypes"
              :init-value="form.complaintType"
              :is-disabled="true"
              :is-required="false"
              @get="form.complaintType = $event.value"
            />

            <select-component
              :label-title="'Customers'"
              :default-option-text="'Select Customer'"
              :select-array="customers"
              :init-value="form.customer"
              :is-disabled="true"
              :is-required="false"
              @get="form.customer = $event.value"
            />

            <input-component
              :label-title="'ICN Number'"
              :input-placeholder="'Enter ICN Number'"
              :default-value="form.icnNo"
              :is-disabled="true"
              :is-required="false"
              @get="form.icnNo = $event.value"
            />

            <input-component
              :label-title="'ECR Number'"
              :input-placeholder="'Enter ECR Number'"
              :default-value="form.ecrNo"
              :is-disabled="true"
              :is-required="false"
              @get="form.ecrNo = $event.value"
            />

            <div class="col-span-2">
              <input-component
                :label-title="'Complaint Title'"
                :input-placeholder="'Enter Complaint Title'"
                :default-value="form.title"
                :is-disabled="true"
                :is-required="false"
                @get="form.title = $event.value"
              />
              <text-area-component
                :label-title="'Complaint Description'"
                :input-placeholder="'Enter Description'"
                :default-value="form.issue"
                :is-disabled="true"
                :is-required="false"
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
              :is-disabled="true"
              :is-required="false"
            />
            <input-component
              :label-title="'Cylinder Size'"
              :input-placeholder="'Enter Cylinder Size'"
              :input-type="'number'"
              :default-value="cylinder.cylinderSize"
              :is-disabled="true"
              :is-required="false"
            />
            <input-component
              :label-title="'Date Supplied'"
              :input-placeholder="'Select Date'"
              :input-type="'date'"
              :default-value="cylinder.dateSupplied"
              :is-disabled="true"
              :is-required="false"
            />
            <input-component
              :label-title="'Delivery/WayBill Number'"
              :input-placeholder="'Enter Delivery/Waybill Number'"
              :default-value="cylinder.waybillNo"
              :is-disabled="true"
              :is-required="false"
            />
            <input-component
              :label-title="'Total Volume'"
              :input-placeholder="'Enter Total Volume'"
              :default-value="cylinder.totalVolume"
              :is-disabled="true"
              :is-required="false"
            />
          </div>
          <div class="font-bold text-lg my-4">CYLINDER REPLACE DETAILS</div>
          <div class="grid grid-rows-1 lg:grid-cols-3 gap-4">
            <select-component
              :label-title="'Cylinder Number'"
              :default-option-text="'Enter Cylinder Number'"
              :select-array="cylinders"
              :init-value="form.replaceCylinder.cylinderNo"
              :is-disabled="true"
              :is-required="false"
              @get="form.replaceCylinder.cylinderNo = $event.value"
            />
            <input-component
              :label-title="'Cylinder Size'"
              :input-placeholder="'Enter Cylinder Size'"
              :is-disabled="true"
              :is-required="false"
              @get="form.replaceCylinder.cylinderSize = $event.value"
            />
            <input-component
              :label-title="'Total Volume'"
              :input-placeholder="'Enter Total Volume'"
              :is-disabled="true"
              :is-required="false"
              @get="form.replaceCylinder.totalVolume = $event.value"
            />
          </div>
          <div class="grid grid-rows-1 lg:grid-cols-3 gap-4">
            <text-area-component
              :label-title="'Accessories Replacement'"
              :input-placeholder="'Enter Description'"
              :default-value="form.additionalAction"
              :is-disabled="true"
              :is-required="false"
              @get="form.additionalAction = $event.value"
            />

            <text-area-component
              :label-title="'Officer Comment'"
              :input-placeholder="'Enter Comment'"
              :default-value="form.comment"
              :is-disabled="true"
              :is-required="false"
              @get="form.comment = $event.value"
            />

            <text-area-component
              :label-title="'Approving Officer Comment'"
              :input-placeholder="'Enter Comment'"
              :default-value="requestBody.comment"
              :is-required="false"
              @get="requestBody.comment = $event.value"
            />
          </div>

          <div class="md:flex w-full md:space-x-2 md:w-1/4 my-6">
            <button-component
              :button-text="'Approve'"
              :button-class="'bg-btn-purple text-white w-auto'"
              :loading-status="buttonLoading.approveLoading"
              @buttonClicked="requestBody.status = 'approve'"
            />
            <button-component
              :button-text="'Reject'"
              :button-class="'text-white bg-gray-700 w-auto'"
              :loading-status="buttonLoading.rejectLoading"
              @buttonClicked="requestBody.status = 'reject'"
            />
          </div>
        </form>
      </div>
    </div>
    <confirmation
      v-if="showFinalStep"
      :display-text="requestBody.status"
      @approve="submit"
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
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'
import InputComponent from '@/components/Form/Input.vue'
import TextAreaComponent from '@/components/Form/TextArea.vue'
import SelectComponent from '@/components/Form/Select.vue'
import ButtonComponent from '@/components/Form/Button.vue'
import { CustomerController } from '~/module/Customer'
import { CylinderController } from '~/module/Cylinder'
import { formatDate } from '@/constants/utils'
import Confirmation from '@/components/Overlays/Confirmation.vue'
import { mainStore } from '@/module/Pinia'

export default defineComponent({
  components: {
    InputComponent,
    ButtonComponent,
    SelectComponent,
    TextAreaComponent,
    Confirmation,
  },
  layout: 'dashboard',
  setup() {
    const buttonLoading = reactive({
      approveLoading: false,
      rejectLoading: false,
    })
    const complaintTypes = [
      {
        name: 'Cylinder',
        value: 'cylinder',
      },
    ]
    const showFinalStep = ref<Boolean>(false)

    const modelNumbers = ref<any>([])
    const router = useRouter()
    const route = useRoute()
    const complaintId = route.value.params.id

    const form = reactive({
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

    const requestBody = reactive({
      comment: '',
      status: '',
      password: '',
      id: complaintId,
    })

    const { getLoggedInUser: auth }: any = mainStore()

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

    const fetchComplaint = (complaint: String) => {
      CustomerController.fetchComplaint(complaint)
        .then((response) => {
          form.complaintType = response.complaintType
          form.ecrNo = response.ecrNo
          form.icnNo = response.icnNo
          form.issue = response.issue
          form.title = response.title
          form.customer = response.customer._id
          form.cylinders[0] = response.cylinders[0]
          form.cylinders[0].dateSupplied = formatDate(
            form.cylinders[0].dateSupplied
          )
          form.comment = response.comments[0].comment
        })
        .finally(() => reset())
    }

    onMounted(() => {
      Promise.all([
        fetchCustomers(),
        fetchCylinders(),
        fetchComplaint(complaintId),
      ])
    })

    const showConfirmation = () => {
      showFinalStep.value = true
    }

    const submit = (event: any) => {
      requestBody.password = event.password
      buttonLoading.approveLoading = requestBody.status === 'approve'
      buttonLoading.rejectLoading = requestBody.status === 'reject'
      CustomerController.changeComplaintStatus(requestBody)
        .then(() => {
          router.go(-1)
        })
        .finally(() => {
          buttonLoading.approveLoading = false
          buttonLoading.rejectLoading = false
        })
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
      complaintTypes,
      modelNumbers,
      customers,
      cylinders,
      showFinalStep,
      showConfirmation,
      requestBody,
      buttonLoading,
      auth,
    }
  },
})
</script>
