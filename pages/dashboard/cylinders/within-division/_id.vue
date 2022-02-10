<template>
  <div :key="componentKey" class="px-6 py-6">
    <div class="grid grid-rows-1 lg:grid-cols-4 py-2 px-6">
      <div class="lg:col-span-3 overflow-x-auto bg-white px-4">
        <div class="md:flex justify-between px-8 py-4">
          <h1
            class="
              flex-1
              text-gray-400
              font-medium
              text-lg
              my-2
              md:my-0
              capitalize
            "
          >
            Within Division Transfer
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
              <tr class="text-sm">
                <th class="w-auto"></th>
                <th
                  class="
                    font-light
                    px-2
                    py-2
                    text-center
                    w-2/12
                    border border-gray-400
                  "
                >
                  Customer Name
                </th>
                <th
                  class="
                    font-light
                    px-2
                    py-2
                    text-center
                    w-2/12
                    border border-gray-400
                  "
                >
                  Cylinder Number
                </th>
                <th
                  class="
                    font-light
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
                    v-model="cylinder.assignedTo"
                    disabled
                    class="
                      w-full
                      border-2 border-gray-200
                      py-2
                      rounded-sm
                      focus:outline-none
                    "
                  >
                    <option value="">Select a Customer</option>
                    <option
                      v-for="(customer, index) in reciepients"
                      :key="index"
                      :value="customer.value"
                    >
                      {{ customer.name }}
                    </option>
                  </select>
                </td>
                <td class="font-light text-lg text-center">
                  <input-component
                    :is-disabled="true"
                    :default-value="cylinder.cylinderNumber"
                    :input-placeholder="'Enter Volume'"
                  />
                </td>
                <td class="font-light text-lg text-center">
                  <input-component
                    :is-disabled="true"
                    :default-value="
                      cylinder.gasVolumeContent.value +
                      cylinder.gasVolumeContent.unit
                    "
                    :input-placeholder="'Enter Volume'"
                  />
                </td>
                <td class="font-light text-lg text-center">
                  <select
                    v-model="cylinder.cylinderType"
                    disabled
                    class="
                      w-full
                      border-2 border-gray-200
                      py-2
                      rounded-sm
                      focus:outline-none
                    "
                  >
                    <option value="buffer">Buffer</option>
                    <option value="assigned">Assigned</option>
                  </select>
                </td>
                <td class="font-light text-lg text-center">
                  <select-component
                    :default-option-text="'Select new Gas Type'"
                    :select-array="gases"
                    :init-value="cylinder.gasType"
                    :is-disabled="true"
                    :is-required="false"
                  />
                </td>
                <td class="font-light text-lg text-center">
                  <input-component
                    :is-disabled="true"
                    :default-value="
                      cylinder.purchaseCost.cost + cylinder.purchaseCost.unit
                    "
                    :input-placeholder="'Purchase Cost'"
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
            lg:grid-cols-3
            gap-y-4
            lg:gap-x-4
            border-b border-t border-gray-300
          "
        >
          <select-component
            :label-title="'Type of Transfer'"
            :default-option-text="'Select a Transfer Type'"
            :select-array="types"
            :init-value="form.type"
            :is-disabled="true"
            :is-required="false"
          />

          <select-component
            :label-title="'To'"
            :default-option-text="'Select a Reciepient'"
            :select-array="reciepients"
            :init-value="form.reciepient"
            :is-disabled="true"
            :is-required="false"
          />

          <select-component
            :label-title="'New Gas Type'"
            :default-option-text="'Select new Gas Type'"
            :select-array="gases"
            :init-value="form.gas"
            :is-disabled="true"
            :is-required="false"
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
        <div class="flex justify-between items-start py-2 px-10">
          <div>
            <p class="text-gray-500 text-sm font-medium leading-6">
              Initiated By
            </p>
            <p class="text-gray-500 text-sm font-medium">
              <span>{{ new Date().toDateString() }}</span> @
              <span>{{ new Date().toLocaleTimeString() }}</span>
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
  //   useContext,
  useRoute,
  useRouter,
  watch,
} from '@nuxtjs/composition-api'
import SelectComponent from '@/components/Form/Select.vue'
import InputComponent from '@/components/Form/Input.vue'
import Confirmation from '@/components/Overlays/Confirmation.vue'
import FinalStep from '@/components/Overlays/finalStep.vue'
import { CustomerController } from '@/module/Customer'
import { CylinderController } from '@/module/Cylinder'
import { mainStore } from '@/module/Pinia'

export default defineComponent({
  name: 'Transfer',
  components: { SelectComponent, Confirmation, FinalStep, InputComponent },
  layout: 'dashboard',
  setup() {
    const appStore = mainStore()
    const auth: any = appStore.getLoggedInUser
    const types = [
      {
        name: 'Permanent Transfer',
        value: 'branch',
      },
      {
        name: 'Temporary Transfer',
        value: 'temporary',
      },
    ]
    const form = reactive({
      type: '',
      reciepient: '',
      comment: '',
      gas: '',
    })
    const reciepients = ref([])
    const showConfirmation = ref(false)
    const showFinalStep = ref(false)
    const status = ref('')
    const message = ref('')
    const customerValue = ref('')
    const cylinders = ref<any>([])
    const cylindersArrays = ref<any>([])
    const router = useRouter()
    const route = useRoute()
    const transferId = ref<String>('')
    const transferDetail = ref<any>()

    onMounted(() => {
      transferId.value = route.value.params.id
      Promise.all([
        fetchGases(),
        fetchCustomers(),
        getCylinderDetail(transferId.value),
      ])
    })

    function getCylinderDetail(id: String) {
      CylinderController.getTransferCylinderDetail(id).then((response) => {
        console.log(response)
        transferDetail.value = response.data
        form.type = transferDetail.value.type
        form.gas = transferDetail.value.gasType._id
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

    const statusText = ref<String>('')

    function intermediate(body: any) {
      const finalBody: ApprovalType = {
        status: body.status,
        password: body.password,
        id: transferId.value,
        comment: form.comment,
      }
      approveCylinder(finalBody)
    }
    function confirmationComponent(text: String) {
      statusText.value = text
      showConfirmation.value = true
    }

    const goBack = () => {
      router.push('/dashboard/cylinders/transfer-list')
    }

    function approveCylinder(requestBody: ApprovalType) {
      CylinderController.approveCylinderTransfer(requestBody)
        .then(() => {
          showConfirmation.value = false
          goBack()
        })
        .catch(() => {})
    }

    const transferType = ref<string>('temporary')

    function fetchCustomers() {
      CustomerController.fetchUnPaginatedCustomers().then((response) => {
        reciepients.value = response.map((element: any) => {
          return {
            name: element.name,
            value: element._id,
          }
        })
      })
    }

    const submit = () => {}

    const componentKey = ref(0)

    const gases = ref<any>([])

    function fetchGases() {
      CylinderController.getCylinders().then((response: any) => {
        gases.value = response.data.data.cylinders.map((cylinder: any) => {
          return {
            name: cylinder.gasName,
            value: cylinder._id,
          }
        })
      })
    }

    watch(status, (currentValue) => {
      if (currentValue === 'success') {
        message.value = 'You have successfully approved this request'
      } else if (currentValue === 'error') {
        message.value = 'You have regretably declined this request'
      }
    })

    return {
      types,
      reciepients,
      showConfirmation,
      showFinalStep,
      status,
      message,
      form,
      customerValue,
      cylindersArrays,
      componentKey,
      cylinders,
      submit,
      auth,
      transferType,
      gases,
      transferDetail,
      confirmationComponent,
      intermediate,
    }
  },
})
</script>
