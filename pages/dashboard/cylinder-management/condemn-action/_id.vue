<template>
  <div :key="componentKey" class="px-6 py-6">
    <div class="grid grid-rows-1 lg:grid-cols-4 py-2 px-6">
      <div class="lg:col-span-3 overflow-x-auto bg-white px-4">
        <div class="md:flex justify-between px-8 py-4">
          <h1 class="flex-1 text-gray-400 font-medium text-lg my-2 md:my-0">
            Condemn Cylinder
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
              <span>Rejected</span
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
                <th class="w-auto px-2"></th>
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
                  Assigned Number
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
                    w-3/12
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
                    w-3/12
                    border border-gray-400
                  "
                >
                  Date of Manufacture
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
                <th class="w-auto"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cylind, i) in condemnDetail.cylinders" :key="i">
                <td class="font-light text-lg text-center">
                  {{ i + 1 }}
                </td>
                <td class="font-light text-lg text-center">
                  {{ cylind.assignedNumber }}
                </td>
                <td class="font-light text-lg text-center">
                  <select-component
                    :init-value="cylind.gasType"
                    :is-disabled="true"
                    :select-array="gasTypes"
                  />
                </td>
                <td class="font-light text-lg text-center capitalize">
                  {{ cylind.cylinderType }}
                </td>
                <td class="font-light text-lg text-center">
                  {{ new Date(cylind.dateManufactured).toDateString() }}
                </td>
                <td class="font-light text-lg text-center">
                  {{ cylind.purchaseCost }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="px-10 py-4 mt-20">
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
  useRouter,
  watch,
} from '@nuxtjs/composition-api'
import Confirmation from '@/components/Overlays/Confirmation.vue'
import FinalStep from '@/components/Overlays/finalStep.vue'
import { mainStore } from '@/module/Pinia'
import SelectComponent from '@/components/Form/Select.vue'
import { CylinderController } from '@/module/Cylinder'

export default defineComponent({
  name: 'Transfer',
  components: { Confirmation, FinalStep, SelectComponent },
  layout: 'dashboard',
  setup() {
    const appStore = mainStore()
    const auth: any = appStore.getLoggedInUser

    const types = [
      {
        name: 'Permanent Transfer',
        value: 'permanent',
      },
      {
        name: 'Temporary Transfer',
        value: 'temporary',
      },
    ]

    type ApprovalType = {
      status: String
      condemnId: String
      password: String
      comment: String
    }
    function intermediate(body: any) {
      const finalBody: ApprovalType = {
        status: body.status,
        password: body.password,
        condemnId: condemnId.value,
        comment: form.comment,
      }
      approveCylinder(finalBody)
    }

    function approveCylinder(requestBody: ApprovalType) {
      CylinderController.approveCondemnChange(requestBody)
        .then(() => {
          showConfirmation.value = false
          goBack()
        })
        .catch(() => {})
    }

    const form = reactive({
      comment: '',
    })

    const showConfirmation = ref(false)
    const showFinalStep = ref(false)
    const status = ref('')
    const message = ref('')
    const customers = ref<any>([])
    const customerValue = ref('')
    const condemnDetail = ref<any>([])
    const router = useRouter()
    const route = useRoute()
    const gasTypes = ref<any>()
    const condemnId = ref<String>('')

    function getGasType() {
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

    onMounted(() => {
      condemnId.value = route.value.params.id
      Promise.all([getGasType(), getCondemnDetail(condemnId.value)])
    })

    function getCondemnDetail(id: String) {
      CylinderController.getCondemnCylinderDetail(id).then((response) => {
        condemnDetail.value = response.data
      })
    }

    const statusText = ref<String>('')

    function confirmationComponent(text: String) {
      statusText.value = text
      showConfirmation.value = true
    }

    const componentKey = ref(0)

    watch(status, (currentValue) => {
      if (currentValue === 'success') {
        message.value = 'You have successfully approved this request'
      } else if (currentValue === 'error') {
        message.value = 'You have regretably declined this request'
      }
    })

    const goBack = () => {
      router.push('/dashboard/cylinder-management/condemn-cylinder')
    }

    const submit = () => {}

    return {
      types,
      showConfirmation,
      showFinalStep,
      status,
      message,
      customers,
      form,
      customerValue,
      condemnDetail,
      componentKey,
      submit,
      auth,
      goBack,
      gasTypes,
      confirmationComponent,
      statusText,
      intermediate,
    }
  },
})
</script>
