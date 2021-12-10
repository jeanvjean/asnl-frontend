<template>
  <back-drop :centralize="false">
    <div
      class="
        w-full
        sm:w-full
        md:w-1/2
        bg-white
        py-4
        px-8
        rounded-sm
        overflow-y-auto
      "
    >
      <div class="flex justify-between items-center my-2">
        <p class="text-xl font-medium">Route Plan</p>

        <svg
          class="w-6 h-6 fill-current text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          @click="close"
        >
          <path
            d="M2.93 17.07A10 10 0 1117.07 2.93 10 10 0 012.93 17.07zM11.4 10l2.83-2.83-1.41-1.41L10 8.59 7.17 5.76 5.76 7.17 8.59 10l-2.83 2.83 1.41 1.41L10 11.41l2.83 2.83 1.41-1.41L11.41 10z"
          />
        </svg>
      </div>
      <form autocomplete="off" @submit.prevent="submit">
        <div class="grid grid-rows-1 md:grid-cols-3 gap-x-4">
          <select-component
            :label-title="'Route Plan Type'"
            :select-array="activityType"
            :default-option-text="'Select an Route Plan Type'"
            :init-value="form.activity"
            @get="form.activity = $event.value"
          />

          <select-component
            :label-title="'Order Type'"
            :select-array="orderType"
            :default-option-text="'Select an Order Type'"
            :init-value="form.orderType"
            @get="form.orderType = $event.value"
          />

          <select-component
            :label-title="'Vehicle Number'"
            :select-array="vehicleArray"
            :default-option-text="'Enter Vehicle Number'"
            :init-value="vehicleId"
            @get="vehicleId = $event.value"
          />

          <input-component
            :label-title="'Fuel Given (Litres)'"
            :input-placeholder="'Enter Fuel in Litres'"
            :default-value="form.fuelGiven"
            :input-type="'number'"
            @get="form.fuelGiven = $event.value"
          />

          <input-component
            :label-title="'Fuel Consumed (Litres)'"
            :input-placeholder="'Enter Fuel in Litres'"
            :default-value="form.fuelsConsumed"
            :input-type="'number'"
            @get="form.fuelsConsumed = $event.value"
          />

          <input-component
            :label-title="'Mileage In'"
            :input-placeholder="'Enter Fuel in Litres'"
            :default-value="form.mileageIn"
            :input-type="'number'"
            @get="form.mileageIn = $event.value"
          />

          <input-component
            :label-title="'Mileage Out'"
            :input-placeholder="'Enter Fuel in Litres'"
            :default-value="form.mileageOut"
            :input-type="'number'"
            @get="form.mileageOut = $event.value"
          />

          <input-component
            :label-title="'Territory'"
            :input-placeholder="'Enter Territory'"
            :default-value="form.territory"
            @get="form.territory = $event.value"
          />

          <input-component
            :label-title="'Start Date'"
            :input-placeholder="'Select Start Date'"
            :input-type="'date'"
            @get="form.startDate = $event.value"
          />

          <input-component
            :label-title="'End Date'"
            :input-placeholder="'Select End Date'"
            :input-type="'date'"
            @get="form.endDate = $event.value"
          />

          <input-component
            :label-title="'Time In'"
            :input-placeholder="'Select Time in'"
            :input-type="'datetime-local'"
            @get="form.timeIn = $event.value"
          />

          <input-component
            :label-title="'Time Out'"
            :input-placeholder="'Select Time Out'"
            :input-type="'datetime-local'"
            @get="form.timeOut = $event.value"
          />
        </div>
        <div :key="componentKey">
          <div
            class="
              border-t border-b-0 border-l-0 border-r-0
              my-2
              border-2 border-gray-300
              px-3
              w-full
              font-semibold
              py-2
              text-lg
              flex
              items-center
              justify-between
            "
          >
            <h4 class="text-sm">Customer Details</h4>

            <button
              type="button"
              class="
                flex
                space-x-2
                items-center
                bg-white
                text-btn-purple
                border border-btn-purple
                px-2
                py-1
                rounded-sm
                text-sm
              "
              @click="increment"
              v-if="form.activity == 'pick-up'"
            >
              <span>Add More Customer Details</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#5C53FF"
                class="w-6 h-6 fill-current text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
          <div
            v-for="(customer, i) in form.customers"
            :key="i"
            class="
              grid grid-rows-1
              md:grid-cols-3
              gap-x-4
              w-full
              py-1
              border-0 border-b-4 border-gray-300
            "
          >
            <input-component
              :label-title="'Name'"
              :input-placeholder="`Enter ${form.orderType} Name`"
              :default-value="customer.name"
              @get="customer.name = $event.value"
            />
            <input-component
              :label-title="'Email'"
              :input-placeholder="`Enter ${form.orderType} Email`"
              :default-value="customer.email"
              @get="customer.email = $event.value"
            />
            <input-component
              :label-title="'Number of Cylinders'"
              :input-placeholder="`Total Cylinders`"
              :default-value="customer.numberOfCylinders"
              @get="customer.numberOfCylinders = $event.value"
            />
            <input-component
              :label-title="'Destination'"
              :input-placeholder="`Enter ${form.orderType} Destination`"
              :default-value="customer.destination"
              @get="customer.destination = $event.value"
            />
            <input-component
              :label-title="'Departure'"
              :input-placeholder="'Enter Departure'"
              :default-value="customer.departure"
              @get="customer.departure = $event.value"
            />
          </div>
        </div>
        <button-component
          :button-text="'Create Route Plan'"
          :loading-status="isLoading"
          :button-class="'border border-btn-purple mt-4 bg-btn-purple text-white'"
        />
      </form>
    </div>
    <SuccessMsg
      v-if="showSuccess"
      :text="'You have succesfully created a Route Plan'"
      :buttonText="'Close'"
      @action="$router.go(0)"
      @close="$router.go(0)"
    />
  </back-drop>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  useContext,
  useRoute,
  watch,
} from '@nuxtjs/composition-api'
import Validator from 'validatorjs'
import BackDrop from '@/components/Base/Backdrop.vue'
import InputComponent from '@/components/Form/Input.vue'
import SelectComponent from '@/components/Form/Select.vue'
import { ValidatorObject } from '@/module/Validation'
import { DriverObject } from '@/module/Driver'
import { VehicleController } from '@/module/Vehicle'
import ButtonComponent from '@/components/Form/Button.vue'
import SuccessMsg from '@/components/Overlays/SuccessMsg.vue'

export default defineComponent({
  components: {
    BackDrop,
    SuccessMsg,
    InputComponent,
    SelectComponent,
    ButtonComponent,
  },
  props: {
    customersDN: {
      type: Array,
      required: false,
    },
  },
  setup(_props, ctx) {
    const close = () => {
      ctx.emit('close')
    }

    const isCentralise = ref<Boolean>(true)

    const context = useContext()
    const route = useRoute()
    const vehicleId = ref<String>('')
    const isLoading = ref<Boolean>(false)
    const showSuccess = ref<Boolean>(false)

    const activityType = [
      {
        name: 'Pick Up',
        value: 'pick-up',
      },
      {
        name: 'Delivery',
        value: 'delivery',
      },
    ]

    const orderType = [
      {
        name: 'Customer',
        value: 'customer',
      },
      {
        name: 'Supplier',
        value: 'supplier',
      },
    ]

    const driversArray = ref<Array<Object>>([])
    const vehicleArray = ref<Array<Object>>([])

    const fetchDrivers = () => {
      DriverObject.getUnPaginatedDrivers().then((response: any) => {
        const drivers = response
        driversArray.value = drivers.map((driver: any) => {
          return {
            name: driver.name ? driver.name : 'Not Specified',
            value: driver._id,
          }
        })
      })
    }

    const fetchVehicles = () => {
      VehicleController.fetchVehiclesUnPaginated().then((response: any) => {
        const vehicles = response
        vehicleArray.value = vehicles.map((vehicle: any) => {
          return {
            name: vehicle.regNo,
            value: vehicle._id,
          }
        })
      })
    }

    const form = reactive<any>({
      startDate: '',
      endDate: '',
      activity: '',
      orderType: '',
      modeOfService: 'delivery',
      date: new Date().toISOString(),
      territory: '',
      mileageIn: '',
      mileageOut: '',
      fuelGiven: '',
      fuelsConsumed: '',
      timeOut: '',
      timeIn: '',
      customers: _props.customersDN || [],
    })

    const customers = ref<Array<any>>([])
    const customersArray = ref([])
    const componentKey = ref<number>(1)

    const increment = () => {
      form.customers.push({
        name: '',
        email: '',
        destination: '',
        departure: '',
        numberOfCylinders: 0,
      })
      changeComponentKey()
    }

    const changeComponentKey = () => {
      const random = Math.floor(Math.random() * (1000 - 100 + 1)) + 100
      componentKey.value = random
    }

    onMounted(() => {
      vehicleId.value = route.value.params.id
      changeComponentKey()
      Promise.all([fetchDrivers(), fetchVehicles()])
    })

    const submit = () => {
      const rules = {
        startDate: 'required|date',
        endDate: 'required|date',
        activity: 'required|string',
        orderType: 'required|string',
        modeOfService: 'required|string',
        date: 'required|date',
        territory: 'required|string',
        mileageIn: 'required|string',
        mileageOut: 'required|string',
        fuelGiven: 'required|string',
        fuelsConsumed: 'required|string',
        timeOut: 'required|date',
        timeIn: 'required|date',
        customers: 'required|array',
        'customers.*.name': 'required|string',
        'customers.*.email': 'required|string',
        'customers.*.destination': 'required|string',
        'customers.*.departure': 'required|string',
        'customers.*.numberOfCylinders': 'required|numeric|min:1',
      }

      const validation: any = new Validator(form, rules)
      if (validation.fails()) {
        let messages: string[] = []

        messages = ValidatorObject.getMessages(validation.errors)
        messages.forEach((error: string) => {
          context.$toast.error(error)
        })
      } else {
        isLoading.value = true
        VehicleController.createRoutePlan(form, vehicleId.value)
          .then((data) => {
            console.log(data)
            showSuccess.value = true
            // close()
          })
          .finally(() => {
            isLoading.value = false
          })
      }
    }

    watch(form, (currentValue: any) => {
      if (currentValue.customers && currentValue.customers.length < 2) {
        isCentralise.value = true
      } else {
        isCentralise.value = false
      }
    })

    //     watch(
    //   () => form.ecrNo,
    //   (currentValue, oldValue) => {
    //     var typingTimer
    //     clearTimeout(typingTimer)
    //     typingTimer = setTimeout(() => {
    //       })
    //     }, 3000)
    //   }
    // )

    return {
      close,
      form,
      orderType,
      customers,
      customersArray,
      increment,
      componentKey,
      submit,
      activityType,
      driversArray,
      vehicleArray,
      vehicleId,
      isLoading,
      isCentralise,
      showSuccess,
    }
  },
})
</script>
