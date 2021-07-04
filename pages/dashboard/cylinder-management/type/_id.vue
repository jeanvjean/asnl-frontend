<template>
  <div :key="componentKey" class="px-6 py-6">
    <div class="grid grid-rows-1 lg:grid-cols-4 py-2">
      <div class="lg:col-span-3 overflow-x-auto bg-white">
        <div class="flex justify-between px-6 py-4">
          <h1 class="flex-1 text-gray-400 font-medium text-lg">
            Cylinder Type
          </h1>
          <div class="flex space-x-6">
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
              @click="submit"
            >
              <span>Save</span>
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
              @click="goBack()"
            >
              <span>Cancel</span
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
        <div class="w-full overflow-x-auto px-8 my-8">
          <div
            class="
              grid grid-rows-1
              lg:grid-cols-4
              divide divide-x-2 divide-black
              mt-8
            "
          >
            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Cylinder Number</h4>
                <p>{{ currentValues.cylinderNumber }}</p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Gas Type</h4>
                <p>{{ currentValues.gasType }}</p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Cylinder Volume</h4>
                <p>{{ currentValues.gasVolumeContent }}kg</p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Filling Pressure</h4>
                <p>{{ currentValues.fillingPreasure }}</p>
              </div>
            </div>
          </div>

          <div
            class="
              grid grid-rows-1
              lg:grid-cols-4
              divide divide-x-2 divide-black
              mt-8
            "
          >
            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Cylinder Type</h4>
                <p class="capitalize">{{ currentValues.cylinderType }}</p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Manufacturing Date</h4>
                <p>
                  {{
                    new Date(currentValues.waterCapacity).toLocaleDateString()
                  }}
                </p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Color Code</h4>
                <p>{{ currentValues.colorCode }}</p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Water Capacity</h4>
                <p>
                  {{ currentValues.waterCapacity }}
                  kg
                </p>
              </div>
            </div>
          </div>
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
            :label-title="'Cylinder Type'"
            :select-array="types"
            :init-value="currentValues.cylinderType"
            :is-disabled="true"
            :default-option-text="'Select Cylinder Type'"
          />

          <select-component
            :label-title="'Gas Type'"
            :select-array="gasTypes"
            :init-value="currentValues.gasId"
            :is-disabled="true"
            :default-option-text="'Select Gas Type'"
          />

          <select-component
            :label-title="'Change Cylinder Type to'"
            :select-array="types"
            :default-option-text="'Select New Cylinder Type'"
            @get="form.cylinderType = $event.value"
          />

          <select-component
            :label-title="'Change Gas Type to'"
            :select-array="gasTypes"
            :default-option-text="'Select New Gas Type'"
            @get="form.gasType = $event.value"
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
      @close="showConfirmation = false"
      @approve="
        showConfirmation = false
        showFinalStep = true
      "
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
  computed,
  defineComponent,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  useContext,
  useRoute,
  useRouter,
  watch,
} from '@nuxtjs/composition-api'
import SelectComponent from '@/components/Form/Select.vue'
import Confirmation from '@/components/Overlays/Confirmation.vue'
import FinalStep from '@/components/Overlays/finalStep.vue'
import { mainStore } from '@/module/Pinia'
import { CylinderController } from '@/module/Cylinder'
import Validator from 'validatorjs'
import { ValidatorObject } from '~/module/Validation'

export default defineComponent({
  name: 'Transfer',
  components: { SelectComponent, Confirmation, FinalStep },
  layout: 'dashboard',
  setup() {
    const appStore = mainStore()
    const auth: any = appStore.getLoggedInUser
    const route = useRoute()
    const router = useRouter()
    const cylinderId = ref<string>('')
    const context = useContext()

    const types = [
      { name: 'Buffer', value: 'buffer' },
      { name: 'Assigned', value: 'assigned' },
    ]

    const gasTypes = ref([])

    onBeforeMount(() => {
      cylinderId.value = route.value.params.id
      if (!cylinderId) {
        router.push('/dashboard')
      }
    })

    const currentValues = reactive({
      cylinderType: '',
      gasId: '',
      cylinderNumber: '',
      waterCapacity: '',
      dateManufactured: '',
      testingPresure: '',
      fillingPreasure: '',
      gasVolumeContent: '',
      colorCode: '',
      gasType: '',
    })

    function fetchGasTypes() {
      CylinderController.getCylinders().then((response) => {
        const myResponse = response.data.data.cylinders
        gasTypes.value = myResponse.map((element: any) => {
          return {
            name: element.gasName + ' - ' + element.colorCode,
            value: element._id,
          }
        })
      })
    }

    onMounted(() => {
      fetchGasTypes()

      CylinderController.getCylinder(cylinderId.value).then((response) => {
        const cylinderResponse = response.data.data
        currentValues.cylinderType = cylinderResponse.cylinderType
        currentValues.cylinderNumber = cylinderResponse.assignedNumber
          ? cylinderResponse.assignedNumber
          : cylinderResponse.cylinderNumber
        currentValues.waterCapacity = cylinderResponse.waterCapacity
        currentValues.dateManufactured = cylinderResponse.dateManufactured
        currentValues.gasType = cylinderResponse.gasType.gasName
        currentValues.testingPresure = cylinderResponse.testingPresure
        currentValues.fillingPreasure = cylinderResponse.fillingPreasure
        currentValues.gasVolumeContent = cylinderResponse.gasVolumeContent
        currentValues.colorCode = cylinderResponse.standardColor
        currentValues.gasId = cylinderResponse.gasType._id
        form.assignedTo = cylinderResponse.assignedTo
          ? cylinderResponse.assignedTo._id
          : ''
        changeComponentKey()
      })
    })

    const showConfirmation = ref(false)
    const showFinalStep = ref(false)
    const componentKey = ref<number>(0)
    const status = ref('')
    const message = ref('')

    const form = reactive<any>({
      comment: '',
      cylinders: [route.value.params.id],
      cylinderType: '',
      gasType: '',
      assignedTo: '',
    })

    const changeComponentKey = () => {
      componentKey.value++
    }

    watch(status, (currentValue) => {
      if (currentValue === 'success') {
        message.value = 'You have successfully approved this request'
      } else if (currentValue === 'error') {
        message.value = 'You have regretably declined this request'
      }
    })

    const goBack = () => {
      router.push('/dashboard/cylinder-management/cylinder-type')
    }

    const requestBody = computed(() => {
      return {
        cylinderType: form.cylinderType,
        comment: form.comment,
        gasType: form.gasType,
        assignedTo: form.assignedTo,
        cylinders: form.cylinders,
      }
    })

    const submit = () => {
      const rules = {
        cylinders: 'required|array',
        comment: 'required|string',
        cylinderType: 'required|string',
        gasType: 'required|string',
        assignedTo: 'required|string',
      }

      const validation = new Validator(requestBody.value, rules)
      if (validation.fails()) {
        let messages: string[] = []
        messages = ValidatorObject.getMessages(validation.errors)
        messages.forEach((error: string) => {
          context.$toast.error(error)
        })
      } else {
        CylinderController.updateCylinder(requestBody.value).then(() => {
          goBack()
        })
      }
    }

    const count = ref(0)
    return {
      types,
      gasTypes,
      showConfirmation,
      showFinalStep,
      status,
      message,
      count,
      auth,
      form,
      componentKey,
      currentValues,
      submit,
      goBack,
    }
  },
})
</script>
