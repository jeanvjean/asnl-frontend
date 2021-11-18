<template>
  <back-drop>
    <div
      :key="componentKey"
      class="w-full sm:w-full md:w-1/2 bg-white py-4 px-8 rounded-sm"
    >
      <div class="flex justify-between items-center my-2">
        <div>
          <p class="text-xl font-medium">Register Gas Cylinder</p>
          <p class="font-light text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
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
      <form @submit.prevent="createCylinder">
        <div class="grid grid-rows-1 md:grid-cols-2 gap-x-4">
          <select-component
            :label-title="'Cylinder Type'"
            :select-array="CylinderTypes"
            :default-option-text="'Select a Cylinder Type'"
            :init-value="formInputs.cylinderType"
            @get="formInputs.cylinderType = $event.value"
          />
          <select-component
            v-if="formInputs.cylinderType === 'assigned'"
            :label-title="'Cylinder Assigned To'"
            :default-option-text="'Select Customer'"
            :select-array="customers"
            :init-value="formInputs.assignedTo"
            :is-required="false"
            @get="formInputs.assignedTo = $event.value"
            :addText="'Add New Customer'"
            @addFunction="showNewCustomer = true"
          />
          <input-component
            :label-title="'Assigned Number'"
            :input-placeholder="'ASNL BF-103'"
            :default-value="formInputs.assignedNumber"
            @get="formInputs.assignedNumber = $event.value"
          />
          <input-component
            :label-title="'Original Cylinder Number'"
            :input-placeholder="'Cylinder number goes here'"
            :default-value="formInputs.cylinderNumber"
            @get="formInputs.cylinderNumber = $event.value"
          />

          <input-component
            :label-title="'Water Capacity (kg)'"
            :input-placeholder="'Capacity'"
            :default-value="formInputs.waterCapacity.value"
            @get="formInputs.waterCapacity.value = $event.value"
          />

          <div class="w-full py-2 mt-1 relative">
            <label
              for="password"
              class="block w-full px-1 text-gray-800 text-md"
              >Cylinder Size</label
            ><input
              v-model="formInputs.gasVolumeContent.value"
              placeholder="Enter Amount"
              type="number"
              class="
                block
                w-full
                px-4
                py-2
                border-2 border-gray-200
                rounded-sm
                focus:outline-none focus:border-btn-purple
                font-thin
                placeholder-black
                hover:placeholder-opacity-25
              "
            />
            <select
              class="
                absolute
                top-12
                right-0
                -mt-3.5
                bg-gray-200
                border-none
                py-2
                rounded-sm
              "
              v-model="formInputs.gasVolumeContent.unit"
            >
              <option value="kg">Kg</option>
              <option value="m3">
                <p>m<sup>3</sup></p>
              </option>
            </select>
          </div>

          <select-component
            :label-title="'Gas Type'"
            :select-array="gasTypes"
            :default-option-text="'Select Gas Type'"
            :init-value="formInputs.gasType"
            @get="
              ;(formInputs.gasType = $event.value), changeColor($event.value)
            "
          />
          <input-component
            :label-title="'Standard Cylinder Color Code'"
            :input-placeholder="'Color field will be Populated Automatically'"
            :is-disabled="true"
            :default-value="formInputs.standardColor"
            @get="formInputs.standardColor = $event.value"
          />

          <input-component
            :label-title="'Date of Manufacture'"
            :input-type="'date'"
            :input-placeholder="'Select Date Here'"
            :default-value="formInputs.dateManufactured"
            @get="formInputs.dateManufactured = $event.value"
          />
          <input-component
            :label-title="'Filling Pressure'"
            :input-placeholder="'Enter Pressure here (bar)'"
            :default-value="formInputs.fillingPreasure"
            @get="formInputs.fillingPreasure = $event.value"
          />

          <input-component
            :label-title="'Testing Pressure'"
            :input-placeholder="'Enter Working Pressure here (bar)'"
            :default-value="formInputs.testingPresure"
            @get="formInputs.testingPresure = $event.value"
          />
          <input-component
            :label-title="'Purchase Cost'"
            :input-type="'number'"
            :input-placeholder="'Select Date Here'"
            :default-value="formInputs.purchaseCost"
            :is-required="false"
            @get="formInputs.purchaseCost = $event.value"
          />
          <input-component
            :label-title="'Purchase Date'"
            :input-type="'date'"
            :input-placeholder="'Select Purchase Date'"
            :default-value="formInputs.purchaseDate"
            :is-required="false"
            @get="formInputs.purchaseDate = $event.value"
          />
        </div>
        <div class="w-full md:w-1/3 lg:w-1/4 mx-auto mt-4">
          <button-icon-component
            :button-text="'Complete Registration'"
            :button-class="'border border-btn-purple text-sm text-white bg-btn-purple'"
            :loading-status="isLoading"
          >
            <svg
              class="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.417 15.181l-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931L23.93 3.821l.001-.001c.321-1.496-.541-2.081-1.527-1.714l-21.29 8.151c-1.453.564-1.431 1.374-.247 1.741l5.443 1.693L18.953 5.78c.595-.394 1.136-.176.691.218z"
              />
            </svg>
          </button-icon-component>
        </div>
      </form>

      <new-customer
        v-if="showNewCustomer"
        @close="showNewCustomer = !showNewCustomer"
        @addNewCustomer="addNewCustomer"
        :fromCylinder="true"
      />
    </div>
  </back-drop>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import Validator from 'validatorjs'
import BackDrop from '@/components/Base/Backdrop.vue'
import InputComponent from '@/components/Form/Input.vue'
import SelectComponent from '@/components/Form/Select.vue'
import NewCustomer from '@/components/Overlays/NewCustomer.vue'
import { CylinderController } from '@/module/Cylinder'
import { CustomerController } from '@/module/Customer'
import { ValidatorObject } from '@/module/Validation'
import { CylinderTypes } from '@/constants/variables'
import ButtonIconComponent from '@/components/Form/ButtonIcon.vue'

export default defineComponent({
  components: {
    BackDrop,
    InputComponent,
    SelectComponent,
    ButtonIconComponent,
    NewCustomer,
  },
  setup(_props, ctx) {
    const context = useContext()

    const customers = ref<any>([])
    const gasTypes = ref([])
    const close = () => {
      ctx.emit('close')
    }

    const formInputs = reactive({
      cylinderType: '',
      waterCapacity: { value: '', unit: 'kg' },
      dateManufactured: '',
      gasType: '',
      standardColor: '',
      testingPresure: '',
      fillingPreasure: '',
      gasVolumeContent: { value: '', unit: 'kg' },
      cylinderNumber: '',
      assignedTo: '',
      assignedNumber: '',
      purchaseCost: '',
      purchaseDate: '',
    })

    const isLoading = ref<Boolean>(false)
    const showNewCustomer = ref<Boolean>(false)

    const addNewCustomer = (customer: any) => {
      customers.value.push({
        name: customer.data.name,
        value: customer.data._id,
      })
      updateComponent()
    }

    onMounted(() => {
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

      CustomerController.fetchUnPaginatedCustomers().then((response) => {
        customers.value = response.map((element: any) => {
          return {
            name: element.name,
            value: element._id,
          }
        })
      })

      updateComponent()
    })

    function changeColor(id: string) {
      gasTypes.value.forEach((el: any) => {
        if (el.value === id) {
          formInputs.standardColor = el.color
        }
      })

      updateComponent()
    }

    const updateComponent = () => {
      componentKey.value++
    }
    const requestBody = ref<any>()
    const createCylinder = () => {
      const rules = {
        cylinderType: 'required|string',
        'waterCapacity.value': 'required|numeric',
        'waterCapacity.unit': 'required|string',
        dateManufactured: 'date',
        gasType: 'required|string',
        standardColor: 'required|string',
        testingPresure: 'required|numeric',
        fillingPreasure: 'required|numeric',
        'gasVolumeContent.value': 'required|numeric',
        'gasVolumeContent.unit': 'required|string',
        cylinderNumber: 'required|string',
        assignedTo: 'required_if:cylinderType,assigned|string',
        assignedNumber: 'required|string',
        purchaseCost: 'numeric',
        purchaseDate: 'date',
      }
      const validation = new Validator(formInputs, rules)

      if (validation.fails()) {
        let messages: string[] = []
        messages = ValidatorObject.getMessages(validation.errors)

        messages.forEach((error: string) => {
          context.$toast.error(error)
        })
      } else {
        requestBody.value = {
          cylinderType: formInputs.cylinderType,
          waterCapacity: formInputs.waterCapacity,
          dateManufactured: formInputs.dateManufactured,
          gasType: formInputs.gasType,
          standardColor: formInputs.standardColor,
          testingPresure: formInputs.testingPresure,
          fillingPreasure: formInputs.fillingPreasure,
          gasVolumeContent: formInputs.gasVolumeContent,
          //chnage gasVolume content to Object
          cylinderNumber: formInputs.cylinderNumber,
          purchaseCost: formInputs.purchaseCost,
          assignedTo: formInputs.assignedTo,
          purchaseDate: formInputs.purchaseDate
            ? new Date(formInputs.purchaseDate).toISOString()
            : formInputs.purchaseDate,
        }
        if (formInputs.cylinderType !== 'assigned') {
          delete requestBody.value.assignedTo
        }
        isLoading.value = true
        CylinderController.registerCylinder(requestBody.value)
          .then(() => {
            ctx.emit('refresh')
            close()
          })
          .finally(() => {
            isLoading.value = false
          })
      }
    }

    const componentKey = ref<number>(0)
    return {
      CylinderTypes,
      customers,
      gasTypes,
      close,
      formInputs,
      createCylinder,
      changeColor,
      componentKey,
      isLoading,
      showNewCustomer,
      addNewCustomer,
    }
  },
})
</script>
