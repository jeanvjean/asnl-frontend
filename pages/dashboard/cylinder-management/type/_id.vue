<template>
  <div :key="componentKey" class="px-6 py-6">
    <div class="grid grid-rows-1 lg:grid-cols-4 py-2 px-6">
      <div class="lg:col-span-3 overflow-x-auto bg-white px-4">
        <div class="md:flex justify-between px-8 py-4">
          <h1 class="flex-1 text-gray-400 font-medium text-lg my-2 md:my-0">
            Cylinder Type Change Details
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
        <div class="w-full overflow-x-auto px-2 my-8 border-collapse">
          <table class="table w-full border-collapse border-0">
            <thead>
              <tr>
                <th class="w-auto"></th>
                <th
                  class="
                    font-light
                    text-sm
                    px-2
                    py-2
                    text-center
                    border border-gray-400
                  "
                >
                  Cylinder Number
                </th>
                <th
                  class="
                    font-light
                    text-sm
                    px-2
                    py-2
                    text-center
                    border border-gray-400
                  "
                >
                  Cylinder Type
                </th>
                <th
                  class="
                    font-light
                    text-sm
                    px-2
                    py-2
                    text-center
                    border border-gray-400
                  "
                >
                  Manufacturing Date
                </th>
                <th
                  class="
                    font-light
                    text-sm
                    px-2
                    py-2
                    text-center
                    border border-gray-400
                  "
                >
                  Gas Type
                </th>
                <th
                  class="
                    font-light
                    text-sm
                    px-2
                    py-2
                    text-center
                    border border-gray-400
                  "
                >
                  Volume
                </th>
                <!-- <th
                  class="
                    font-light
                    text-sm
                    px-2
                    py-2
                    text-center
                    border border-gray-400
                  "
                >
                  Height
                </th> -->
                <th
                  class="
                    font-light
                    text-sm
                    px-2
                    py-2
                    text-center
                    border border-gray-400
                  "
                >
                  Color Code
                </th>
                <th
                  class="
                    font-light
                    text-sm
                    px-2
                    py-2
                    text-center
                    border border-gray-400
                  "
                >
                  Water Capacity
                </th>
                <th class="w-auto"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(cylinder, i) in transferRequest.cylinders"
                :key="i"
                class="hover:bg-gray-100"
              >
                <td class="font-light text-lg text-center">
                  {{ Number(i) + 1 }}
                </td>
                <td
                  class="
                    font-light
                    text-center
                    py-2
                    px-4
                    border border-gray-400
                    text-sm text-gray-700
                  "
                >
                  {{ cylinder.assignedNumber }}
                </td>
                <td
                  class="
                    font-light
                    text-center
                    py-2
                    px-4
                    border border-gray-400
                    text-sm text-gray-700
                  "
                >
                  {{ cylinder.cylinderType }}
                </td>
                <td
                  class="
                    font-light
                    text-center
                    py-2
                    px-4
                    border border-gray-400
                    text-sm text-gray-700
                  "
                >
                  {{ new Date(cylinder.dateManufactured).toDateString() }}
                </td>
                <td
                  class="
                    font-light
                    text-center
                    py-2
                    px-4
                    border border-gray-400
                    text-sm text-gray-700
                  "
                >
                  {{ getGasName(cylinder.gasType) }}
                </td>
                <td
                  class="
                    font-light
                    text-center
                    py-2
                    px-4
                    border border-gray-400
                    text-sm text-gray-700
                  "
                >
                  {{ cylinder.gasVolumeContent }}
                </td>
                <td
                  class="
                    font-light
                    text-center
                    py-2
                    px-4
                    border border-gray-400
                    text-sm text-gray-700
                  "
                >
                  {{ getColor(cylinder.gasType) }}
                </td>
                <td
                  class="
                    font-light
                    text-center
                    py-2
                    px-4
                    border border-gray-400
                    text-sm text-gray-700
                  "
                >
                  {{ cylinder.waterCapacity }}
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
            :label-title="'Change Cylinder Type to'"
            :default-option-text="'Select New Cylinder Type'"
            :select-array="CylinderTypes"
            :init-value="form.cylinderType"
            :is-disabled="true"
          />
          <select-component
            :label-title="'Change Gas Type to'"
            :default-option-text="'Select New Gas Type'"
            :select-array="gasTypes"
            :init-value="form.gasType"
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
  useRoute,
  // useContext,
  useRouter,
} from '@nuxtjs/composition-api'
import SelectComponent from '@/components/Form/Select.vue'
import Confirmation from '@/components/Overlays/Confirmation.vue'
import FinalStep from '@/components/Overlays/finalStep.vue'
import { mainStore } from '@/module/Pinia'
import { CylinderController } from '@/module/Cylinder'
import { CylinderTypes } from '@/constants/variables'

export default defineComponent({
  name: 'Transfer',
  components: { SelectComponent, Confirmation, FinalStep },
  layout: 'dashboard',
  setup() {
    const form = reactive({
      reciepient: '',
      comment: '',
      gasType: '',
      cylinderType: '',
    })
    const appStore = mainStore()
    const auth: any = appStore.getLoggedInUser
    const reciepients = ref([])
    const showConfirmation = ref(false)
    const showFinalStep = ref(false)
    const status = ref('')
    const message = ref('')
    const cylinders = ref<any>([])
    const cylinderResponse = ref<any>([])
    // const context = useContext()
    const router = useRouter()
    const route = useRoute()
    const gasTypes = ref<any>([])
    const transferRequest = ref<any>([])

    const componentKey = ref(0)
    const statusText = ref<String>('')
    const transferId = ref<String>('')

    onMounted(() => {
      transferId.value = route.value.params.id
      Promise.all([getDetail(transferId.value), getGasType()])
    })

    type ApprovalType = {
      status: String
      changeId: String
      password: String
      comment: String
    }

    function intermediate(body: any) {
      const finalBody: ApprovalType = {
        status: body.status,
        password: body.password,
        changeId: transferId.value,
        comment: form.comment,
      }
      approveCylinder(finalBody)
    }

    function approveCylinder(requestBody: ApprovalType) {
      CylinderController.approveCylinderChange(requestBody)
        .then(() => {
          showConfirmation.value = false
          goBack()
        })
        .catch(() => {})
    }

    function getDetail(id: String) {
      CylinderController.getCylinderChangeDetail(id)
        .then((response: any) => {
          transferRequest.value = response.data
          form.gasType = transferRequest.value.gasType._id
          form.cylinderType = transferRequest.value.cylinderType
          form.comment =
            transferRequest.value.comments &&
            transferRequest.value.comments.length
              ? transferRequest.value.comments[0].comment
              : ''
          componentKey.value++
        })
        .catch(() => {})
    }

    function getGasType() {
      CylinderController.getCylinders().then((response) => {
        const myResponse = response.data.data.cylinders
        gasTypes.value = myResponse.map((element: any) => {
          return {
            name: element.gasName,
            value: element._id,
            color: element.colorCode,
          }
        })
      })
    }

    function getColor(id: String) {
      let color: String = ''
      gasTypes.value.forEach((element: any) => {
        if (element.value === id) {
          color = element.color
        }
      })
      return color
    }

    function confirmationComponent(text: String) {
      statusText.value = text
      showConfirmation.value = true
    }

    function getGasName(id: String) {
      let name: String = ''
      gasTypes.value.forEach((element: any) => {
        if (element.value === id) {
          name = element.name
        }
      })
      return name
    }

    const goBack = () => {
      router.push('/dashboard/cylinder-management/cylinder-type')
    }

    return {
      reciepients,
      showConfirmation,
      showFinalStep,
      status,
      message,
      form,
      componentKey,
      cylinders,
      cylinderResponse,
      gasTypes,
      goBack,
      auth,
      transferRequest,
      CylinderTypes,
      getColor,
      getGasName,
      confirmationComponent,
      statusText,
      intermediate,
    }
  },
})
</script>
