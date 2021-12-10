<template>
  <div :key="componentKey" class="w-full md:w-10/12 lg:w-8/12 md:mx-auto mt-10">
    <div class="bg-white px-6 md:px-10 py-6">
      <div
        v-if="auth._id === purchaseDetails.nextApprovingOfficer._id"
        class="my-2 md:space-x-4 flex items-center justify-end w-full"
      >
        <!-- <div>
          <button-component
            :button-class="'bg-btn-purple text-white'"
            :button-text="'Create Sales Requistion'"
            @buttonClicked="
              $router.push(
                `/dashboard/sales/requisition/purchase/${purchaseDetails.id}`
              )
            "
          />
        </div> -->
      </div>
      <div class="flex items-center justify-between px-2 py-2">
        <h1 class="uppercase font-semibold">
          {{ purchaseDetails.type }} PURCHASE ORDER DETAILS
        </h1>
        <div class="flex items-center space-x-4">
          <span>Date:</span>
          <div class="flex space-x-4 items-center">
            <span>{{ purchaseDetails.date }}</span
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
      </div>

      <div
        class="
          flex
          items-center
          justify-between
          mt-10
          divide-x-2 divide-gray-300
          font-bold
          text-base
          tracking-tighter
          capitalize
          px-4
        "
      >
        <div class="w-full flex justify-center items-center">
          <div class="space-y-3 text-black">
            <p class="">Type</p>
            <p class="text-base font-extrabold text-gray-400">
              {{ purchaseDetails.type }}
            </p>
          </div>
        </div>
        <div class="w-full flex justify-center items-center">
          <div class="space-y-3">
            <p class="">
              {{
                purchaseDetails.type == 'internal'
                  ? 'Branch'
                  : purchaseDetails.type == 'external'
                  ? 'Supplier'
                  : ''
              }}
            </p>
            <p class="text-base font-extrabold text-gray-400">
              {{ purchaseDetails.fillingAgent }}
            </p>
          </div>
        </div>
        <div class="w-full flex justify-center items-center">
          <div class="space-y-3">
            <p class="">Approval Stage</p>
            <p class="text-base font-extrabold text-gray-400">
              {{ purchaseDetails.approvalStage }}
            </p>
          </div>
        </div>
        <div class="w-full flex justify-center items-center">
          <div class="space-y-3">
            <p class="">Status</p>
            <p class="text-base font-extrabold text-gray-400">
              {{ purchaseDetails.status }}
            </p>
          </div>
        </div>
      </div>

      <div class="w-full overflow-x-auto mt-10 mb-5">
        <table class="table w-full text-gray-500 border-collapse">
          <thead>
            <tr>
              <th class="w-auto text-center border border-black py-1 px-2">
                S/N
              </th>
              <th class="w-6/12 border border-black py-2 px-2">Cylinder No</th>
              <th class="w-6/12 border border-black py-2 px-2">Volume</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cylinder, i) in purchaseDetails.cylinders" :key="i">
              <td class="text-center border border-black py-2 px-2">
                {{ i + 1 }}
              </td>
              <td class="w-6/12 border border-black text-center py-2 px-2">
                {{ cylinder.cylinderNo }}
              </td>
              <td class="w-6/12 border border-black text-center py-2 px-2">
                {{ cylinder.volume.value + ' ' + cylinder.volume.unit }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <form autocomplete="off" @submit.prevent="showConfirmation">
        <div
          v-if="auth._id === purchaseDetails.nextApprovingOfficer._id"
          class="flex md:space-x-4 flex-col md:flex-row items-center my-8"
        >
          <div class="w-full">
            <label class="block my-2 text-gray-600" for=""
              >Current Approving Officer Comment</label
            >
            <text-area-component
              :input-placeholder="'Enter Comment'"
              :default-value="form.comment"
              @get="form.comment = $event.value"
            />
          </div>
        </div>

        <div
          class="
            flex
            items-center
            w-full
            md:space-x-4
            flex-col
            md:flex-row
            my-8
          "
        >
          <div
            v-for="(officer, index) in purchaseDetails.approvingOfficers"
            :key="index"
            class="w-full capitalize"
          >
            <label v-if="index == 0" class="block">Initiated By</label>
            <label v-else-if="index == 1" class="block">Authorised By</label>
            <label v-else class="block">Approved By</label>
            <input-component
              :default-value="officer.name"
              :is-disabled="true"
              :is-required="false"
            />
          </div>
          <div v-if="purchaseDetails.nextApprovingOfficer" class="w-full">
            <label class="block" for="">Next Approving Officer</label>
            <input-component
              :default-value="purchaseDetails.nextApprovingOfficer.name"
              :is-disabled="true"
              :is-required="false"
            />
          </div>
        </div>
        <div
          v-if="auth._id === purchaseDetails.nextApprovingOfficer._id"
          class="
            my-10
            w-full
            md:w-1/2
            lg:w-1/3
            md:space-x-4
            flex
            items-center
            justify-center
          "
        >
          <button-component
            :button-class="'bg-btn-purple text-white w-auto'"
            :button-text="'Approve'"
            :loading-status="buttonLoading.approveLoading"
            @buttonClicked="form.status = 'approve'"
          />
          <button-component
            :button-class="'text-white bg-gray-700 w-auto'"
            :button-text="'Reject'"
            :loading-status="buttonLoading.rejectLoading"
            @buttonClicked="form.status = 'reject'"
          />
        </div>
      </form>
    </div>
    <confirmation
      v-if="showFinalStep"
      :display-text="form.status"
      @approve="submit"
      @close="showFinalStep = false"
    />
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  reactive,
  ref,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'
import ButtonComponent from '@/components/Form/Button.vue'
import InputComponent from '@/components/Form/Input.vue'
import TextAreaComponent from '@/components/Form/TextArea.vue'
import { CustomerController } from '@/module/Customer'
import { UserController } from '@/module/User'
import { getRandomValue } from '@/constants/utils'
import Confirmation from '@/components/Overlays/Confirmation.vue'
import { mainStore } from '@/module/Pinia'

export default defineComponent({
  components: {
    ButtonComponent,
    InputComponent,
    Confirmation,
    TextAreaComponent,
  },
  layout: 'dashboard',
  setup() {
    const { getLoggedInUser: auth }: any = mainStore()

    const route = useRoute()
    const router = useRouter()
    const orderId = route.value.params.id
    const purchaseDetails = reactive({
      type: '',
      approvalStage: '',
      status: '',
      cylinders: [],
      date: '',
      comments: [],
      approvingOfficers: [],
      nextApprovingOfficer: '',
      fillingAgent: '',
      id: '',
    })
    const users = ref<any>([])
    const showFinalStep = ref<Boolean>(false)

    const fetchUsers = () => {
      UserController.fetchUserUnPaginated()
        .then((response) => {
          users.value = response.data.map((user: any) => {
            return { name: user.name, value: user._id }
          })
        })
        .finally(() => changeComponentKey())
    }

    const componentKey = ref<Number>(0)

    const changeComponentKey = () => {
      componentKey.value = getRandomValue()
    }

    const buttonLoading = reactive({
      approveLoading: false,
      rejectLoading: false,
    })

    const fetchOrderDetails = (orderId: String) => {
      CustomerController.fetchPurchaseOrder(orderId)
        .then((response: any) => {
          console.log(response)
          purchaseDetails.id = response._id
          purchaseDetails.approvalStage = response.approvalStage
          purchaseDetails.status = response.approvalStatus
          purchaseDetails.cylinders = response.cylinders
          purchaseDetails.type = response.type
          purchaseDetails.fillingAgent =
            response.type === 'internal'
              ? response.fromBranch.name
              : response.supplier.name
          purchaseDetails.date = new Date(response.date).toDateString()
          purchaseDetails.comments = response.comments
          purchaseDetails.approvingOfficers = response.approvalOfficers
          purchaseDetails.nextApprovingOfficer = response.nextApprovalOfficer
        })
        .finally(() => changeComponentKey())
    }

    const form = reactive({
      comment: '',
      status: '',
      password: '',
    })

    onBeforeMount(() => {
      Promise.all([fetchUsers(), fetchOrderDetails(orderId)])
    })

    const submit = (event: any) => {
      form.password = event.password
      buttonLoading.approveLoading = form.status === 'approve'
      buttonLoading.rejectLoading = form.status === 'reject'

      CustomerController.changePurchaseOrderStatus(form, orderId)
        .then(() => router.go(-1))
        .finally(() => {
          buttonLoading.approveLoading = false
          buttonLoading.rejectLoading = false
        })
    }

    const showConfirmation = () => {
      showFinalStep.value = true
    }

    return {
      purchaseDetails,
      users,
      componentKey,
      showFinalStep,
      form,
      submit,
      showConfirmation,
      buttonLoading,
      auth,
    }
  },
})
</script>
