<template>
  <div :key="keyValue" class="px-6 py-6">
    <div class="bg-white w-full h-full rounded-sm">
      <div class="px-6 py-6">
        <div class="mb-4">
          <h1 class="font-medium text-xl text-black">Create Vehicle</h1>
          <p class="text-gray-600 text-sm">Enter Vehicle details below</p>
        </div>
        <form @submit.prevent="createVehicle">
          <div class="grid grid-rows-1 lg:grid-cols-3 gap-4">
            <select-component
              :label-title="'Vehicle Category'"
              :default-option-text="'Select a Vehicle Category'"
              :select-array="vehicleCategories"
              :init-value="form.vehCategory"
              @get="form.vehCategory = $event.value"
            />

            <select-component
              :label-title="'Vehicle Manufacturer'"
              :default-option-text="'Select a Vehicle Manufacturer'"
              :select-array="vehicleManufacturers"
              :init-value="form.manufacturer"
              @get="form.manufacturer = $event.value"
            />

            <select-component
              :label-title="'Vehicle Type'"
              :default-option-text="'Select a Vehicle Type'"
              :select-array="vehicleTypes"
              :init-value="form.vehicleType"
              @get="form.vehicleType = $event.value"
            />

            <select-component
              :label-title="'Vehicle Model'"
              :default-option-text="'Select a Vehicle Model'"
              :select-array="modelNumbers"
              :init-value="form.vModel"
              @get="form.vModel = $event.value"
            />

            <input-component
              :label-title="'Registration Number'"
              :input-placeholder="'Enter Number'"
              @get="form.regNo = $event.value"
            />

            <input-component
              :label-title="'Acquisition Date'"
              :input-type="'date'"
              :input-placeholder="'Select Date'"
              @get="form.acqisistionDate = $event.value"
            />

            <input-component
              :label-title="'Current Mileage'"
              :input-placeholder="'Enter Current Mileage'"
              @get="form.currMile = $event.value"
            />

            <input-component
              :label-title="'Battery Capacity (Voltage)'"
              :input-placeholder="'Enter Battery Capacity'"
              :input-type="'number'"
              @get="form.batteryCapacity = $event.value"
            />

            <input-component
              :label-title="'Tank Capacity (Litres)'"
              :input-placeholder="'Enter Tank Capacity'"
              :input-type="'number'"
              @get="form.tankCapacity = $event.value"
            />

            <input-component
              :label-title="'Fuel Type'"
              :input-placeholder="'Enter Fuel Type'"
              @get="form.fuelType = $event.value"
            />

            <input-component
              :label-title="'Gross Weight (Ton)'"
              :input-placeholder="'Enter Gross Weight'"
              :is-required="false"
              :input-type="'number'"
              @get="form.grossHeight = $event.value"
            />

            <input-component
              :label-title="'Net Weight (Ton)'"
              :input-placeholder="'Enter Net Weight'"
              :is-required="false"
              :input-type="'number'"
              @get="form.netWeight = $event.value"
            />
            <input-component
              :label-title="'Licence Number'"
              :input-placeholder="'########'"
              @get="form.licence = $event.value"
            />

            <input-component
              :label-title="'Insurance Date'"
              :input-type="'date'"
              :input-placeholder="'Enter Insurance Date'"
              @get="form.insuranceDate = $event.value"
            />
          </div>
          <div class="font-bold text-xl my-4">DISPOSAL DETAILS</div>
          <div class="grid grid-rows-1 lg:grid-cols-3 gap-4">
            <input-component
              :label-title="'Disposal Date'"
              :input-type="'date'"
              :input-placeholder="'Enter Disposal Date'"
              :is-required="false"
              @get="form.disposalDate = $event.value"
            />
            <input-component
              :label-title="'Disposal Amount'"
              :input-placeholder="'Enter Disposal Amount'"
              :is-required="false"
              :input-type="'number'"
              @get="form.disposalAmount = $event.value"
            />
            <input-component
              :label-title="'Disposal Mileage'"
              :input-placeholder="'Enter Disposal Mileage'"
              :is-required="false"
              @get="form.disposalMileage = $event.value"
            />
          </div>
          <div class="md:flex w-full md:space-x-2 md:w-1/4 my-6">
            <button-component
              :button-text="'Create Vehicle'"
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
import SelectComponent from '@/components/Form/Select.vue'
import ButtonComponent from '@/components/Form/Button.vue'
import { VehicleController } from '@/module/Vehicle'
import { ValidatorObject } from '@/module/Validation'

export default defineComponent({
  components: { InputComponent, ButtonComponent, SelectComponent },
  layout: 'dashboard',
  setup() {
    const context = useContext()

    const vehicleCategories = [
      {
        name: 'SUV',
        value: 'suv',
      },
      {
        name: 'Car',
        value: 'car',
      },
      {
        name: 'Bus',
        value: 'bus',
      },
      {
        name: 'Truck',
        value: 'truck',
      },
    ]

    const vehicleManufacturers = [
      {
        name: 'Ford',
        value: 'ford',
      },
      {
        name: 'Toyota',
        value: 'toyota',
      },
      {
        name: 'VolksWagen',
        value: 'volkswagen',
      },
      {
        name: 'Honda',
        value: 'honda',
      },
      {
        name: 'Mercedes-Benz',
        value: 'mercedes-benz',
      },
    ]

    const vehicleTypes = [
      {
        name: 'Accord',
        value: 'accord',
      },
      {
        name: 'Camry',
        value: 'camry',
      },
      {
        name: 'Corolla',
        value: 'corolla',
      },
      {
        name: 'Spider',
        value: 'spider',
      },
    ]

    const modelNumbers = ref<any>([])

    function populateModel() {
      const start: number = 1999
      const end: number = new Date().getFullYear()
      const difference: number = end - start

      for (let i = 0; i <= difference; i++) {
        const year = start + i
        modelNumbers.value.push({ name: year, value: String(year) })
      }
    }

    onMounted(() => {
      populateModel()
    })

    const form = reactive<any>({
      vehicleType: '',
      manufacturer: '',
      vModel: '',
      regNo: '',
      acqisistionDate: '',
      currMile: '',
      vehCategory: '',
      tankCapacity: '',
      batteryCapacity: '',
      fuelType: '',
      grossHeight: '',
      netWeight: '',
      licence: '',
      insuranceDate: '',
      disposalDate: '',
      disposalAmount: '',
      disposalMileage: '',
    })

    const loading = ref(false)

    function convertToIso(date: string) {
      let result = ''
      if (date) {
        const parseDate = new Date(date)
        result = parseDate.toISOString()
      }
      return result
    }
    const router = useRouter()

    const goBack = () => {
      router.go(-1)
    }

    const createVehicle = () => {
      const rules = {
        vehCategory: 'required',
        manufacturer: 'required',
        vehicleType: 'required',
        vModel: 'required|numeric',
        regNo: 'required|string',
        acqisistionDate: 'required|date',
        currMile: 'required|numeric',
        tankCapacity: 'required|string',
        batteryCapacity: 'required|string',
        fuelType: 'required|string',
        grossHeight: 'numeric',
        netWeight: 'numeric',
        licence: 'required|string',
        insuranceDate: 'required|date',
        disposalDate: 'date',
        disposalAmount: 'numeric',
        disposalMileage: 'numeric',
      }

      const validation: any = new Validator(form, rules)
      if (validation.fails()) {
        let messages: string[] = []

        messages = ValidatorObject.getMessages(validation.errors)
        messages.forEach((error: string) => {
          context.$toast.error(error)
        })
      } else {
        const requestParams = {
          vehCategory: form.vehCategory,
          manufacturer: form.manufacturer,
          vehicleType: form.vehicleType,
          vModel: form.vModel,
          regNo: form.regNo,
          acqisistionDate: convertToIso(form.acqisistionDate),
          currMile: form.currMile,
          tankCapacity: form.tankCapacity,
          batteryCapacity: form.batteryCapacity,
          fuelType: form.fuelType,
          grossHeight: form.grossHeight,
          netWeight: form.netWeight,
          licence: form.licence,
          insuranceDate: convertToIso(form.insuranceDate),
          disposal: {
            disposalDate: convertToIso(form.disposalDate),
            disposalAmount: form.disposalAmount,
            disposalMileage: form.disposalMileage,
          },
        }
        loading.value = true
        VehicleController.createVehicle(requestParams)
          .then(() => {
            reset()
            goBack()
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
      createVehicle,
      keyValue,
      reset,
      loading,
      vehicleCategories,
      modelNumbers,
      vehicleManufacturers,
      vehicleTypes,
    }
  },
})
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
