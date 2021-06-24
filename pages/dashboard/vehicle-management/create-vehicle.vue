<template>
  <div :key="keyValue" class="px-6 py-6">
    <div class="bg-white w-full h-full rounded-sm">
      <div class="px-6 py-6">
        <div class="mb-4">
          <h1 class="font-medium text-xl text-black">Create Vehicle</h1>
          <p class="text-gray-600 text-sm">Enter Vehicle details below</p>
        </div>
        <div class="grid grid-rows-1 lg:grid-cols-3 gap-4">
          <input-component
            :label-title="'Vehicle Type'"
            :input-placeholder="'Enter Vehicle Type'"
            @get="form.vehicleType = $event.value"
          />

          <input-component
            :label-title="'Manufacturer'"
            :input-placeholder="'Enter Manufacturer'"
            @get="form.manufacturer = $event.value"
          />

          <input-component
            :label-title="'Model'"
            :input-placeholder="'Enter Model'"
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
            :label-title="'Mileage Date'"
            :input-type="'date'"
            :input-placeholder="'Enter Mileage Date'"
            @get="form.mileageDate = $event.value"
          />

          <input-component
            :label-title="'Current Mileage'"
            :input-placeholder="'Enter Current Mileage'"
            @get="form.currMile = $event.value"
          />

          <input-component
            :label-title="'Last Mileage'"
            :input-placeholder="'Enter Last Mileage'"
            @get="form.lastMileage = $event.value"
          />

          <input-component
            :label-title="'Vehicle Category'"
            :input-placeholder="'Enter Vehicle Category'"
            @get="form.vehCategory = $event.value"
          />

          <input-component
            :label-title="'Batery Capacity (Percentage)'"
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
            :label-title="'Gross Height (Foot)'"
            :input-placeholder="'Enter Gross Height'"
            :input-type="'number'"
            @get="form.grossHeight = $event.value"
          />

          <input-component
            :label-title="'Net Weight (Ton)'"
            :input-placeholder="'Enter Net Weight'"
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
            @get="disposal.disposalDate = $event.value"
          />
          <input-component
            :label-title="'Disposal Amount'"
            :input-placeholder="'Enter Disposal Amount'"
            :input-type="'number'"
            @get="disposal.disposalAmount = $event.value"
          />
          <input-component
            :label-title="'Disposal Mileage'"
            :input-placeholder="'Enter Disposal Mileage'"
            @get="disposal.disposalMileage = $event.value"
          />
        </div>
        <div class="lg:flex w-full lg:space-x-4 lg:w-2/5 my-6">
          <button-component
            :button-text="'Create Vehicle'"
            :button-class="'py-2 bg-btn-purple text-white rounded-sm'"
            :loading-status="loading"
            @buttonClicked="createVehicle"
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
  reactive,
  ref,
  useContext,
  useRouter,
} from '@nuxtjs/composition-api'
import InputComponent from '@/components/Form/Input.vue'
import ButtonComponent from '@/components/Form/Button.vue'
import { VehicleController } from '@/module/Vehicle'
export default defineComponent({
  components: { InputComponent, ButtonComponent },
  layout: 'dashboard',
  setup() {
    const context = useContext()

    const form = reactive({
      vehicleType: '',
      manufacturer: '',
      vModel: '',
      regNo: '',
      acqisistionDate: '',
      mileageDate: '',
      currMile: '',
      vehCategory: '',
      tankCapacity: '',
      batteryCapacity: '',
      fuelType: '',
      grossHeight: '',
      netWeight: '',
      licence: '',
      insuranceDate: '',
      lastMileage: '',
    })

    const disposal = reactive({
      disposalDate: '',
      disposalAmount: '',
      disposalMileage: '',
    })

    function valuesNotEmpty(obj: Object) {
      return Object.values(obj).every(
        (element) => element !== null && element !== ''
      )
    }

    const loading = ref(false)

    function convertToIso(date: string) {
      const parseDate = new Date(date)
      return parseDate.toISOString()
    }
    const router = useRouter()

    const goBack = () => {
      router.go(-1)
    }

    const createVehicle = () => {
      if (valuesNotEmpty(form) && valuesNotEmpty(disposal)) {
        const requestParams = {
          vehicleType: form.vehicleType,
          manufacturer: form.manufacturer,
          vModel: form.vModel,
          regNo: form.regNo,
          acqisistionDate: convertToIso(form.acqisistionDate),
          mileageDate: convertToIso(form.mileageDate),
          currMile: form.currMile,
          vehCategory: form.vehCategory,
          tankCapacity: form.tankCapacity,
          batteryCapacity: form.batteryCapacity,
          fuelType: form.fuelType,
          grossHeight: form.grossHeight,
          netWeight: form.netWeight,
          licence: form.licence,
          insuranceDate: convertToIso(form.insuranceDate),
          lastMileage: form.lastMileage,
          disposal: {
            disposalDate: convertToIso(disposal.disposalDate),
            disposalAmount: disposal.disposalAmount,
            disposalMileage: disposal.disposalMileage,
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
      } else {
        context.$toast.global.required()
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
      disposal,
      loading,
    }
  },
})
</script>
