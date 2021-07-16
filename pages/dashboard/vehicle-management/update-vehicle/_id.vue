<template>
  <div :key="keyValue" class="px-6 py-6">
    <div class="bg-white w-full h-full rounded-sm">
      <div class="px-6 py-6">
        <div class="mb-4">
          <h1 class="font-medium text-xl text-black">Edit Vehicle</h1>
          <p class="text-gray-600 text-sm">Update Vehicle details below</p>
        </div>
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

          <!-- <div class="py-2">
            <label
              class="block w-full px-1 text-gray-800 text-md mb-1"
              for="vehicle-category"
              ><span> Vehicle Model </span>
              <span class="text-red-600 text-base">*</span></label
            >
            <multiselect
              v-model="form.vModel"
              :options="modelNumbers"
              placeholder="Select Model Number"
              :class="'border-2 border-gray-200 rounded-sm'"
            />
          </div> -->

          <input-component
            :label-title="'Registration Number'"
            :input-placeholder="'Enter Number'"
            :default-value="form.regNo"
            @get="form.regNo = $event.value"
          />

          <input-component
            :label-title="'Acquisition Date'"
            :input-type="'date'"
            :input-placeholder="'Select Date'"
            :default-value="form.acqisistionDate"
            @get="form.acqisistionDate = $event.value"
          />

          <input-component
            :label-title="'Current Mileage'"
            :input-placeholder="'Enter Current Mileage'"
            :default-value="form.currMile"
            @get="form.currMile = $event.value"
          />

          <input-component
            :label-title="'Battery Capacity (Voltage)'"
            :input-placeholder="'Enter Battery Capacity'"
            :default-value="form.batteryCapacity"
            :input-type="'number'"
            @get="form.batteryCapacity = $event.value"
          />

          <input-component
            :label-title="'Tank Capacity (Litres)'"
            :input-placeholder="'Enter Tank Capacity'"
            :default-value="form.tankCapacity"
            :input-type="'number'"
            @get="form.tankCapacity = $event.value"
          />

          <input-component
            :label-title="'Fuel Type'"
            :input-placeholder="'Enter Fuel Type'"
            :default-value="form.fuelType"
            @get="form.fuelType = $event.value"
          />

          <input-component
            :label-title="'Gross Weight (Ton)'"
            :input-placeholder="'Enter Gross Weight'"
            :default-value="form.grossHeight"
            :is-required="false"
            :input-type="'number'"
            @get="form.grossHeight = $event.value"
          />

          <input-component
            :label-title="'Net Weight (Ton)'"
            :input-placeholder="'Enter Net Weight'"
            :default-value="form.netWeight"
            :is-required="false"
            :input-type="'number'"
            @get="form.netWeight = $event.value"
          />
          <input-component
            :label-title="'Licence Number'"
            :input-placeholder="'########'"
            :default-value="form.licence"
            @get="form.licence = $event.value"
          />

          <input-component
            :label-title="'Insurance Date'"
            :input-type="'date'"
            :default-value="form.insuranceDate"
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
            :default-value="form.disposalDate"
            :is-required="false"
            @get="form.disposalDate = $event.value"
          />
          <input-component
            :label-title="'Disposal Amount'"
            :input-placeholder="'Enter Disposal Amount'"
            :default-value="form.disposalAmount"
            :is-required="false"
            :input-type="'number'"
            @get="form.disposalAmount = $event.value"
          />
          <input-component
            :label-title="'Disposal Mileage'"
            :input-placeholder="'Enter Disposal Mileage'"
            :default-value="form.disposalMileage"
            :is-required="false"
            @get="form.disposalMileage = $event.value"
          />
        </div>
        <div class="lg:flex w-full lg:space-x-4 lg:w-2/5 my-6">
          <button-component
            :button-text="'Update Vehicle'"
            :button-class="'py-2 bg-btn-purple text-white rounded-sm'"
            :loading-status="loading"
            @buttonClicked="updateVehicle"
          />
          <button-component
            :button-text="'Cancel'"
            :button-class="'py-2 bg-white text-btn-purple border border-btn-purple rounded-sm'"
            @buttonClicked="reset"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  useContext,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'
import InputComponent from '@/components/Form/Input.vue'
import SelectComponent from '@/components/Form/Select.vue'
import ButtonComponent from '@/components/Form/Button.vue'
import { VehicleController } from '@/module/Vehicle'
import Validator from 'validatorjs'
import { ValidatorObject } from '~/module/Validation'

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

    function fetchVehicle(id: String) {
      VehicleController.fetchVehicle(id).then((response) => {
        form.licence = response.licence
        form.fuelType = response.fuelType
        form.batteryCapacity = response.batteryCapacity
        form.regNo = response.regNo
        form.tankCapacity = response.tankCapacity
        form.vModel = response.vModel
        form.vehCategory = response.vehCategory
        form.vehicleType = response.vehicleType
        form.manufacturer = response.manufacturer
        form.netWeight = response.netWeight
        form.grossHeight = response.grossHeight
        form.vModel = response.vModel
        form.licence = response.licence
        form.currMile = response.currMile
        form.acqisistionDate = formatDate(response.acqisistionDate)
        form.insuranceDate = formatDate(response.insuranceDate)
        form.disposalDate = response.disposal.disposalDate
          ? formatDate(response.disposal.disposalDate)
          : ''
        form.disposalAmount = response.disposal.disposalAmount
        form.disposalMileage = response.disposal.disposalMileage

        keyValue.value++
      })
    }

    const route = useRoute()
    const vehicleId = ref<String>('')

    onBeforeMount(() => {
      vehicleId.value = route.value.params.id
      fetchVehicle(vehicleId.value)
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

    const updateVehicle = () => {
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
        VehicleController.updateVehicle(requestParams, vehicleId.value)
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
      updateVehicle,
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
