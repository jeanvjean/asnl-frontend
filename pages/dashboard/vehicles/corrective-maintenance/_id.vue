<template>
  <div class="px-6 py-6">
    <div class="grid grid-rows-1 lg:grid-cols-4 py-2">
      <div class="lg:col-span-3 overflow-x-auto bg-white">
        <div class="flex justify-between px-8 py-4">
          <h1 class="flex-1 text-gray-500 font-medium text-lg customFontBold">
            Corrective Maintenance
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
          </div>
        </div>
        <div
          class="
            w-full
            border border-b-2 border-l-0 border-r-0 border-t-0 border-gray-300
          "
        >
          <div
            class="
              grid grid-rows-1
              lg:grid-cols-4
              divide divide-x-2 divide-black
              mt-4
            "
          >
            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Vehicle Category</h4>
                <p>
                  {{ vehicleData.vehCategory ? vehicleData.vehCategory : '' }}
                </p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Registration Number</h4>
                <p>
                  {{ vehicleData.regNo ? vehicleData.regNo : '' }}
                </p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Previous Mileage</h4>
                <p>
                  {{ vehicleData.lastMileage ? vehicleData.lastMileage : '' }}
                </p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Current Mileage</h4>
                <p>
                  {{ vehicleData.currMile ? vehicleData.currMile : '' }}
                </p>
              </div>
            </div>
          </div>
          <h1
            v-if="vehicleData.maintainace && vehicleData.maintainace.length"
            class="px-8 text-gray-500 font-medium text-lg my-6 customFontBold"
          >
            Last Maintenance Details
          </h1>
          <div
            v-if="vehicleData.maintainace && vehicleData.maintainace.length"
            class="
              grid grid-rows-1
              lg:grid-cols-4
              divide divide-x-2 divide-black
              my-4
            "
          >
            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Date</h4>
                <p>
                  {{ new Date(vehicleData.maintainace[0].date).toDateString() }}
                </p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Cost</h4>
                <p>{{ vehicleData.maintainace[0].cost }}</p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Maintenance Type</h4>
                <p>{{ vehicleData.maintainace[0].type }}</p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Recommended Mechanic</h4>
                <p>{{ vehicleData.maintainace[0].recomendedMech }}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="
            w-full
            overflow-x-auto
            px-8
            my-4
            border border-b-2 border-l-0 border-r-0 border-t-0 border-gray-300
          "
        >
          <h1 class="text-gray-500 font-medium text-lg my-4 customFontBold">
            New Maintenance Details
          </h1>
          <table class="table table-auto w-full border-collapse border-0">
            <thead>
              <tr class="customFontBold">
                <th class="w-auto"></th>
                <th
                  class="
                    font-light
                    text-lg
                    px-2
                    py-2
                    text-center
                    w-4/12
                    border border-gray-400
                  "
                >
                  Name
                </th>
                <th
                  class="
                    font-light
                    text-lg
                    px-2
                    py-2
                    text-center
                    w-4/12
                    border border-gray-400
                  "
                >
                  Quantity
                </th>
                <th
                  class="
                    font-light
                    text-lg
                    px-2
                    py-2
                    text-center
                    w-4/12
                    border border-gray-400
                  "
                >
                  Unit Cost
                </th>
                <th class="w-auto"></th>
              </tr>
            </thead>
            <tbody :key="bodyKey">
              <tr
                v-for="(replacementList, i) in form.itemsReplaced"
                :key="i"
                class="customFontRegular"
              >
                <td class="font-light text-lg px-3 py-2 text-center">
                  {{ i + 1 }}
                </td>
                <td
                  class="
                    font-light
                    text-lg
                    p-1
                    text-center
                    border border-gray-400
                  "
                >
                  <input-component
                    :input-placeholder="'Enter Name'"
                    :default-value="replacementList.name"
                    @get="replacementList.name = $event.value"
                  />
                </td>
                <td
                  class="
                    font-light
                    text-lg
                    p-1
                    text-center
                    border border-gray-400
                  "
                >
                  <input-component
                    :input-placeholder="'#'"
                    :default-value="replacementList.qty"
                    :input-type="'number'"
                    @get="replacementList.qty = $event.value"
                  />
                </td>
                <td
                  class="
                    font-light
                    text-lg
                    p-1
                    text-center
                    border border-gray-400
                  "
                >
                  <input-component
                    :input-placeholder="'#'"
                    :default-value="replacementList.unitCost"
                    :input-type="'number'"
                    @get="replacementList.unitCost = $event.value"
                  />
                </td>

                <td class="font-light text-lg px-2 py-1 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 fill-current text-transparent"
                    viewBox="0 0 24 24"
                    stroke="black"
                    @click="count--"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="inline-block px-16 py-4">
            <button
              class="flex justify-evenly items-center"
              @click="incrementCounter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 fill-current text-transparent mr-2"
                viewBox="0 0 24 24"
                stroke="gray"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span class="text-md text-gray-400 underline"
                >Add New Maintenance Detail</span
              >
            </button>
          </div>
        </div>
        <div
          class="
            px-10
            py-4
            grid grid-rows-1
            lg:grid-cols-2
            gap-y-4
            lg:gap-x-4
            border border-b-2 border-l-0 border-r-0 border-t-0 border-gray-300
          "
        >
          <input-component
            :label-title="'Recommended Mechanic'"
            :input-placeholder="'Enter Mechanic Name'"
            :init-value="form.recomendedMech"
            @get="form.recomendedMech = $event.value"
          />

          <input-component
            :label-title="'Referrer'"
            :input-placeholder="'Enter Referrer Name'"
            @get="form.referer = $event.value"
          />
        </div>
        <div
          class="
            px-8
            py-4
            border border-b-2 border-l-0 border-r-0 border-t-0 border-gray-300
          "
        >
          <h1 class="text-gray-500 font-medium text-lg my-4 customFontBold">
            Analytic Section
          </h1>
          <div class="overflow-x-auto w-full mb-8">
            <table class="table border-collapse table-auto w-full">
              <tbody>
                <tr>
                  <td class="w-4/12 border border-black px-4 py-4 text-left">
                    Authenticity of Request
                  </td>
                  <td class="w-8/12 border border-black px-1 py-1 text-left">
                    <input-component
                      :input-placeholder="`Enter Authenticity of Request`"
                      @get="form.analytics.requestAuthenticity = $event.value"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="w-4/12 border border-black px-4 py-4 text-left">
                    Estimate Obtained
                  </td>
                  <td class="w-8/12 border border-black px-1 py-1 text-left">
                    <input-component
                      :input-placeholder="`Enter Estimate`"
                      @get="form.analytics.estimateObtained = $event.value"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="w-4/12 border border-black px-4 py-4 text-left">
                    Item/Price Done
                  </td>
                  <td class="w-8/12 border border-black px-1 py-1 text-left">
                    <input-component
                      :input-placeholder="`Enter Item/Price Done`"
                      @get="form.analytics.itemPrice = $event.value"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="w-4/12 border border-black px-4 py-4 text-left">
                    Recommendation
                  </td>
                  <td class="w-8/12 border border-black px-1 py-1 text-left">
                    <input-component
                      :input-placeholder="`Enter Recommendation`"
                      @get="form.analytics.recomendation = $event.value"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="px-8 py-4 flex items-center space-x-8">
          <div class="w-full">
            <label for="" class="text-black text-lg px-2 py-2">Comments</label>
            <input
              v-model="form.comment"
              type="text"
              class="w-full px-4 py-3 border-gray-300 mt-4"
              placeholder="Enter Comment here"
            />
          </div>
          <div class="flex items-center justify-center space-x-4 py-4 w-full">
            <img
              class="h-10 w-10 rounded-full"
              src="@/assets/images/default-avatar.jpg"
              alt=""
            />
            <div>
              <p class="text-black text-lg">Chimerem Egbuson</p>
              <p class="text-gray-600 text-sm">Driver</p>
            </div>
          </div>
        </div>
        <div class="flex justify-between items-start py-2 px-8 mt-6">
          <div v-for="i in 3" :key="i">
            <p class="text-gray-500 text-sm font-medium leading-6">
              Initiated at
            </p>
            <p class="text-gray-500 text-sm font-medium">
              <span>24/02/2020</span> <span>11:02</span>
            </p>
            <div class="flex items-start space-x-4 py-2">
              <img
                class="h-10 w-10 rounded-full"
                src="@/assets/images/default-avatar.jpg"
                alt=""
              />
              <div>
                <p class="text-black text-lg">Chimerem Egbuson</p>
                <p class="text-gray-600 text-sm">Operations Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="
          lg:col-span-1
          w-full
          px-6
          py-4
          border border-b-2 border-l-0 border-r-0 border-t-0 border-gray-300
        "
      >
        <div v-for="i in 2" :key="i" class="mb-6">
          <p class="text-gray-600 font-light text-sm">
            <span>24/02/2020</span> <span>13:04</span>
          </p>
          <p class="py-2 text-gray-700 leading-6">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum
            corrupti minus, nobis harum saepe, vitae eius veniam deleniti velit
            esse ad, dolorem ipsum inventore omnis beatae blanditiis asperiores
            soluta maxime.
          </p>
          <div class="flex items-start space-x-4 py-2">
            <img
              class="h-10 w-10 rounded-full"
              src="@/assets/images/default-avatar.jpg"
              alt=""
            />
            <div>
              <p class="text-black text-lg">Chimerem Egbuson</p>
              <p class="text-gray-600 text-sm">Operations Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <confirmation
      v-if="showConfirmation"
      @close="showConfirmation = false"
      @approve=";(showConfirmation = false), (showFinalStep = true)"
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
import Validator from 'validatorjs'
import InputComponent from '@/components/Form/Input.vue'
import Confirmation from '@/components/Overlays/Confirmation.vue'
import FinalStep from '@/components/Overlays/finalStep.vue'
import { VehicleController } from '@/module/Vehicle'
import { ValidatorObject } from '@/module/Validation'
export default defineComponent({
  name: 'Transfer',
  components: { Confirmation, FinalStep, InputComponent },
  layout: 'dashboard',
  setup() {
    const route = useRoute()
    const vehicleId = ref<string>('')
    const vehicleData = ref<any>({})

    onMounted(() => {
      vehicleId.value = route.value.params.id
      fetchVehicle(vehicleId.value)
    })

    function fetchVehicle(id: String) {
      VehicleController.fetchVehicle(id).then((response) => {
        vehicleData.value = response
      })
    }

    const showConfirmation = ref(false)
    const showFinalStep = ref(false)
    const status = ref('')
    const message = ref('')
    const router = useRouter()
    const bodyKey = ref(1)
    const context = useContext()

    const incrementCounter = () =>
      form.itemsReplaced.push({
        name: '',
        qty: '0',
        unitCost: '0',
        totalCost: '0',
      })

    const form = reactive<any>({
      type: 'corrective',
      operation: 'replacements',
      cost: 0,
      date: new Date().toISOString(),
      prevMileage: '',
      curMileage: '',
      itemsReplaced: [],
      analytics: {
        requestAuthenticity: '',
        estimateObtained: '',
        itemPrice: '',
        recomendation: '',
      },
      comment: '',
      recomendedMech: '',
      referer: '',
    })

    const totalValue = (a: number, b: number) => a * b

    watch(form, (currentValue: any) => {
      let totalCost = 0
      currentValue.itemsReplaced.forEach((item: any) => {
        item.totalCost = totalValue(Number(item.qty), Number(item.unitCost))
        totalCost = totalCost + item.totalCost
      })
      form.cost = totalCost
    })

    watch(vehicleData, (currentValue: any) => {
      form.curMileage = currentValue.currMile
      form.prevMileage = currentValue.lastMileage
    })

    const submit = () => {
      const rules = {
        type: 'required|string',
        operation: 'required|string',
        cost: 'required|integer',
        date: 'required|date',
        prevMileage: 'required|string',
        curMileage: 'required|string',
        comment: 'string',
        recomendedMech: 'required|string',
        referer: 'required|string',
        itemsReplaced: 'required|array',
        'itemsReplaced.*.name': 'required|string',
        'itemsReplaced.*.qty': 'required|integer|min:1',
        'itemsReplaced.*.unitCost': 'required|integer|min:1',
        'itemsReplaced.*.totalCost': 'required|integer',
        'analytics.requestAuthenticity': 'required|string',
        'analytics.estimateObtained': 'required|string',
        'analytics.itemPrice': 'required|string',
        'analytics.recomendation': 'required|string',
      }

      const validation: any = new Validator(form, rules)
      if (validation.fails()) {
        let messages: string[] = []

        messages = ValidatorObject.getMessages(validation.errors)
        messages.forEach((error: string) => {
          context.$toast.error(error)
        })
      } else {
        VehicleController.vehicleInspection(form, vehicleId.value).then(() => {
          router.go(-1)
        })
      }
    }

    return {
      showConfirmation,
      showFinalStep,
      status,
      message,
      bodyKey,
      vehicleData,
      form,
      incrementCounter,
      submit,
    }
  },
})
</script>
