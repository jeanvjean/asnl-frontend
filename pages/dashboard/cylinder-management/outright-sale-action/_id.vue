<template>
  <div :key="componentKey" class="px-6 py-6">
    <div class="grid grid-rows-1 lg:grid-cols-4 py-2 px-6">
      <div class="lg:col-span-3 overflow-x-auto bg-white px-4">
        <div class="md:flex justify-between px-8 py-4">
          <h1 class="flex-1 text-gray-400 font-medium text-lg my-2 md:my-0">
            {{
              transferType === 'sales'
                ? 'Outright Sales'
                : transferType === 'transfer'
                ? 'Transfer'
                : 'Outright Sales / Transfer'
            }}
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
              @click="confirmationComponent('approve')"
            >
              <span>Approve</span>
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
              @click="confirmationComponent('reject')"
            >
              <span>Reject</span
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
        <div class="w-full overflow-x-auto px-6 my-8 border-collapse">
          <table class="table w-full border-collapse border-0">
            <thead>
              <tr>
                <th class="w-auto"></th>
                <th
                  class="
                    font-light
                    text-lg
                    px-2
                    py-2
                    text-center
                    w-2/12
                    border border-gray-400
                  "
                >
                  Assigned Number
                </th>
                <th
                  class="
                    font-light
                    text-lg
                    px-2
                    py-2
                    text-center
                    w-2/12
                    border border-gray-400
                  "
                >
                  Cylinder Type
                </th>
                <th
                  class="
                    font-light
                    text-lg
                    px-2
                    py-2
                    text-center
                    w-2/12
                    border border-gray-400
                  "
                >
                  Manufacture Date
                </th>
                <th
                  class="
                    font-light
                    text-lg
                    px-2
                    py-2
                    text-center
                    w-2/12
                    border border-gray-400
                  "
                >
                  Gas Type
                </th>
                <th
                  class="
                    font-light
                    text-lg
                    px-2
                    py-2
                    text-center
                    w-2/12
                    border border-gray-400
                  "
                >
                  Volume
                </th>
                <th
                  class="
                    font-light
                    text-lg
                    px-2
                    py-2
                    text-center
                    w-2/12
                    border border-gray-400
                  "
                >
                  Purchase Cost
                </th>
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
                    v-model="cylinder._id"
                    disabled
                    class="
                      w-full
                      border-2 border-gray-200
                      py-2
                      rounded-sm
                      focus:outline-none
                    "
                  >
                    <option
                      v-for="(cylin, index) in cylinderResponse"
                      :key="index"
                      :value="cylin._id"
                    >
                      {{ cylin.cylinderNumber }}
                    </option>
                  </select>
                </td>
                <td class="font-light text-lg text-center">
                  <input-component
                    :default-value="cylinder.cylinderType"
                    :is-disabled="true"
                    :input-placeholder="'Cylinder Type'"
                  />
                </td>
                <td class="font-light text-lg text-center">
                  <input-component
                    :default-value="formatDate(cylinder.dateManufactured)"
                    :is-disabled="true"
                    :input-placeholder="'Manufacture Date'"
                    :input-type="'date'"
                  />
                </td>
                <td class="font-light text-lg text-center">
                  <input-component
                    :default-value="cylinder.gasType"
                    :is-disabled="true"
                    :input-placeholder="'Gas Type'"
                  />
                </td>
                <td class="font-light text-lg text-center">
                  <input-component
                    :default-value="cylinder.gasVolumeContent"
                    :is-disabled="true"
                    :input-placeholder="'Cost of Sale'"
                  />
                </td>
                <td class="font-light text-lg text-center">
                  <input-component
                    :default-value="cylinder.purchaseCost"
                    :is-disabled="true"
                    :input-placeholder="'Cost of Sale'"
                  />
                </td>
              </tr>
            </tbody>
          </table>
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
            :label-title="'Transfer To'"
            :default-option-text="'Select a Reciepient'"
            :select-array="reciepients"
            :init-value="form.reciepient"
            :is-required="false"
            :is-disabled="true"
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
        <div class="flex space-x-6 items-start py-2 px-10">
          <div v-if="transferDetail.initiator">
            <p class="text-gray-500 text-sm font-medium leading-6">
              Initiated By
            </p>
            <p class="text-gray-500 text-sm font-medium">
              <span>{{ new Date().toDateString() }}</span> @
              <span>{{ new Date().toLocaleTimeString() }}</span>
            </p>
            <div class="flex items-start space-x-4 py-2">
              <img
                v-if="transferDetail.initiator.image"
                class="h-10 w-10 rounded-full"
                :src="transferDetail.initiator.image"
                alt=""
              />
              <img
                v-else
                class="h-10 w-10 rounded-full"
                src="@/assets/images/default-avatar.jpg"
                alt=""
              />
              <div>
                <p class="text-black text-lg capitalize">
                  {{ transferDetail.initiator.name }}
                </p>
                <p class="text-gray-600 text-sm capitalize">
                  {{ transferDetail.initiator.subrole }} -
                  {{ transferDetail.initiator.role }}
                </p>
              </div>
            </div>
          </div>
          <div
            v-for="(approvingOfficer, index) in transferDetail.approvalOfficers"
            :key="index"
          >
            <p class="text-gray-500 text-sm font-medium leading-6">
              <span v-if="index + 1 == transferDetail.approvalOfficers.length">
                Next Approving Officer</span
              >
              <span v-else> Approved By</span>
            </p>
            <p class="text-gray-500 text-sm font-medium">
              <span>{{ new Date().toDateString() }}</span> @
              <span>{{ new Date().toLocaleTimeString() }}</span>
            </p>
            <div class="flex items-start space-x-4 py-2">
              <img
                v-if="approvingOfficer.image"
                class="h-10 w-10 rounded-full"
                :src="approvingOfficer.image"
                alt=""
              />
              <img
                v-else
                class="h-10 w-10 rounded-full"
                src="@/assets/images/default-avatar.jpg"
                alt=""
              />
              <div>
                <p class="text-black text-lg capitalize">
                  {{ approvingOfficer.name }}
                </p>
                <p class="text-gray-600 text-sm capitalize">
                  {{ approvingOfficer.office }} -
                  {{ approvingOfficer.department }}
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
    <confirmation
      v-if="showConfirmation"
      :display-text="statusText"
      @close="showConfirmation = false"
      @approve="intermediate($event)"
    />
    <final-step
      v-if="showFinalStep"
      :status="status"
      :message="message"
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
  useContext,
  useRoute,
  useRouter,
  watch,
} from '@nuxtjs/composition-api'
import SelectComponent from '@/components/Form/Select.vue'
import InputComponent from '@/components/Form/Input.vue'
import Confirmation from '@/components/Overlays/Confirmation.vue'
import FinalStep from '@/components/Overlays/finalStep.vue'
import { mainStore } from '@/module/Pinia'
import { CylinderController } from '@/module/Cylinder'
import { CustomerController } from '~/module/Customer'

export default defineComponent({
  name: 'Transfer',
  components: { SelectComponent, Confirmation, FinalStep, InputComponent },
  layout: 'dashboard',
  setup() {
    const form = reactive({
      reciepient: '',
      comment: '',
    })
    const appStore = mainStore()
    const auth: any = appStore.getLoggedInUser
    const reciepients = ref([])
    const showConfirmation = ref(false)
    const showFinalStep = ref(false)
    const status = ref('')
    const message = ref('')
    const customers = ref<any>([])
    const cylinders = ref<any>([])
    const cylinderResponse = ref<any>([])
    const context = useContext()
    const branches = ref<any>([])
    const route = useRoute()
    const router = useRouter()
    const transferType = ref<string>('')
    const transferId = ref<String>('')
    const transferDetail = ref<any>('')
    const statusText = ref<String>('')

    const componentKey = ref(0)

    function formatDate(dateValue: string) {
      const date = new Date(dateValue)
      const year = date.getFullYear()
      let month: any = date.getMonth() + 1
      let dt: any = date.getDate()

      if (dt < 10) {
        dt = '0' + dt
      }
      if (month < 10) {
        month = '0' + month
      }

      return year + '-' + month + '-' + dt
    }

    onMounted(() => {
      transferId.value = route.value.params.id
      Promise.all([
        getRegisteredCylinders(),
        fetchBranches(),
        fetchCustomers(),
        getCylinderDetail(transferId.value),
      ])
    })

    function getRegisteredCylinders() {
      CylinderController.getRegisteredCylindersUnPaginated().then(
        (response) => {
          cylinderResponse.value = response.data
        }
      )
    }

    function fetchCustomers() {
      CustomerController.fetchUnPaginatedCustomers().then((response) => {
        customers.value = response.map((element: any) => {
          return {
            name: element.name,
            value: element._id,
          }
        })
        reciepients.value = customers.value
      })
    }

    function confirmationComponent(text: String) {
      statusText.value = text
      showConfirmation.value = true
    }

    function fetchBranches() {
      CylinderController.fetchBranches().then((response: any) => {
        response.forEach((branch: any) => {
          if (auth.branch !== branch._id) {
            branches.value.push({
              name: `${branch.name} - ${branch.location}`,
              value: branch._id,
            })
          }
        })
        reciepients.value = branches.value
      })
    }

    function getCylinderDetail(id: String) {
      CylinderController.getTransferCylinderDetail(id).then((response) => {
        transferDetail.value = response.data
        transferType.value = transferDetail.value.type
        form.reciepient = transferDetail.value.to
        cylinders.value = transferDetail.value.cylinders
        componentKey.value++
      })
    }

    type ApprovalType = {
      status: String
      id: String
      password: String
      comment: String
    }

    function intermediate(body: any) {
      const finalBody: ApprovalType = {
        status: body.status,
        password: body.password,
        id: transferId.value,
        comment: form.comment,
      }
      approveCylinder(finalBody)
    }

    function approveCylinder(requestBody: ApprovalType) {
      CylinderController.approveCylinderTransfer(requestBody)
        .then(() => {
          showConfirmation.value = false
          goBack()
        })
        .catch(() => {})
    }

    const goBack = () => {
      router.push('/dashboard/cylinder-management/transfer-list')
    }

    const submit = () => {
      let validation = true
      if (cylinders.value.length) {
        cylinders.value.forEach((element: any) => {
          if (element.cylinder === '') {
            validation = false
          }
        })
      }
      if (!validation || !cylinders.value.length) {
        context.$toast.error('Cylinders are required')
      } else if (!form.reciepient) {
        context.$toast.error('All Fields are Required')
      } else {
        const requestCylinders = cylinders.value.map((element: any) => {
          return element.cylinder
        })

        const requestBody = {
          type: transferType.value,
          comment: form.comment,
          to: form.reciepient,
          cylinders: requestCylinders,
        }

        CylinderController.initiateCylinderTransfer(requestBody)
          .then(() => {
            form.comment = form.reciepient = ''
            cylinders.value = []
          })
          .catch(() => {})
      }
    }

    watch(transferType, (currentValue) => {
      if (currentValue === 'sale') {
        reciepients.value = customers.value
      } else if (currentValue === 'division') {
        reciepients.value = branches.value
      }
    })

    return {
      reciepients,
      showConfirmation,
      showFinalStep,
      status,
      message,
      customers,
      intermediate,
      form,
      componentKey,
      cylinders,
      submit,
      cylinderResponse,
      auth,
      transferType,
      transferDetail,
      formatDate,
      confirmationComponent,
    }
  },
})
</script>
