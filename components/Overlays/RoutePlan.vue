<template>
  <back-drop :centralize="true">
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
      <div class="grid grid-rows-1 md:grid-cols-2 gap-x-4">
        <select-component
          :label-title="'Route Plan Type'"
          :select-array="customerTypes"
          :default-option-text="'Select an Route Plan Type'"
          :init-value="form.customerType"
          @get="form.customerType = $event.value"
        />

        <select-component
          :label-title="'Driver Name'"
          :select-array="customerTypes"
          :default-option-text="'Enter Driver Name'"
          :init-value="form.customerType"
          @get="form.customerType = $event.value"
        />

        <select-component
          :label-title="'Vehicle Number'"
          :select-array="customerTypes"
          :default-option-text="'Enter Vehicle Number'"
          :init-value="form.customerType"
          @get="form.customerType = $event.value"
        />

        <input-component
          :label-title="'Fuel (Litres)'"
          :input-placeholder="'Enter Fuel in Litres'"
          :default-value="form.modeOfService"
          :input-type="'number'"
          @get="form.modeOfService = $event.value"
        />

        <input-component
          :label-title="'Territory'"
          :input-placeholder="'Enter Territory'"
          :input-type="'text'"
        />

        <input-component
          :label-title="'RPP Number'"
          :input-placeholder="'Enter RPP Number'"
          :default-value="form.name"
          :input-type="'text'"
          @get="form.name = $event.value"
        />

        <input-component
          :label-title="'Start Date'"
          :input-placeholder="'Select Start Date'"
          :input-type="'date'"
          :is-required="false"
          @get="form.rcNumber = $event.value"
        />

        <input-component
          :label-title="'End Date'"
          :input-placeholder="'Select End Date'"
          :input-type="'date'"
          :is-required="false"
          @get="form.rcNumber = $event.value"
        />
      </div>
      <span :key="componentKey" class="block">
        <div
          class="
            border-t border-b-0 border-l-0 border-r-0
            pt-3
            my-2
            border-2 border-gray-300
            px-3
            w-full
          "
        >
          <h4>Customer Details</h4>
        </div>
        <div
          v-for="(customer, i) in customers"
          :key="i"
          class="grid grid-rows-1 md:grid-cols-2 gap-x-4 w-full"
        >
          <select-component
            :label-title="'Customer'"
            :select-array="[]"
            :default-option-text="'Select a Customer'"
          />
          <input-component
            :label-title="'Unit Price'"
            :input-placeholder="'Enter Unit of Price'"
            :disabled="true"
          />
        </div>
        <div class="w-full">
          <button
            class="
              flex
              space-x-2
              items-center
              bg-white
              text-btn-purple
              border border-btn-purple
              px-4
              py-2
              rounded-sm
              float-right
              my-2
            "
            @click="increment"
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
        <div class="grid grid-rows-1 md:grid-cols-2 gap-x-4 w-full">
          <input-component
            :label-title="'Total Quantity'"
            :input-placeholder="'Enter Total Quantity'"
          />
          <input-component
            :label-title="'Prepared By'"
            :input-placeholder="'Enter Prepared By'"
          />
        </div>
      </span>

      <button
        class="
          rounded-sm
          mt-4
          px-8
          py-3
          border border-btn-purple
          text-md
          font-semibold
          flex
          justify-between
          bg-btn-purple
          text-white
        "
        @click="submit"
      >
        Complete Route Plan
      </button>
    </div>
  </back-drop>
</template>
<script lang="ts">
import {
  computed,
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
import { CustomerController } from '@/module/Customer'
import { ValidatorObject } from '@/module/Validation'

export default defineComponent({
  components: { BackDrop, InputComponent, SelectComponent },
  setup(_props, ctx) {
    const close = () => {
      ctx.emit('close')
    }

    const context = useContext()

    const customerTypes = [
      {
        name: 'Pick Up',
        value: 'pick up',
      },
    ]

    const form = reactive<any>({
      name: '',
      customerType: '',
      modeOfService: '',
      nickName: '',
      address: '',
      contactPerson: '',
      email: '',
      TIN: '',
      phoneNumber: '',
      rcNumber: '',
      cylinderHoldingTime: '',
      territory: '',
      unitPrice: '',
      CAC: '',
      validId: '',
    })

    const productsBody = ref<Array<String>>([])

    const customers = ref<Array<any>>([])
    const customersArray = ref([])
    const componentKey = ref<number>(1)

    const increment = () => {
      customers.value.push({
        id: '',
        price: '',
      })
    }

    const changeComponentKey = () => {
      const random = Math.floor(Math.random() * (1000 - 100 + 1)) + 100
      componentKey.value = random
    }

    const requestPayload = computed(() => {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('customerType', form.customerType)
      formData.append('modeOfService', form.modeOfService)
      formData.append('nickName', form.nickName)
      formData.append('address', form.address)
      formData.append('contactPerson', form.contactPerson)
      formData.append('email', form.email)
      formData.append('phoneNumber', form.phoneNumber)
      formData.append('TIN', form.TIN)
      formData.append('rcNumber', form.rcNumber)
      formData.append('cylinderHoldingTime', form.cylinderHoldingTime)
      formData.append('territory', form.territory)
      formData.append('unitPrice', form.unitPrice)
      formData.append('CAC', form.CAC)
      formData.append('validId', form.validId)

      productsBody.value.forEach((element: any) => {
        formData.append('products', element)
      })

      return formData
    })

    onMounted(() => {
      changeComponentKey()
    })

    const submit = () => {
      const rules = {
        name: 'required',
        customerType: 'required',
        modeOfService: 'required',
        nickName: 'required',
        address: 'required',
        contactPerson: 'required',
        email: 'required',
        TIN: 'string',
        phoneNumber: 'required',
        rcNumber: 'string',
        cylinderHoldingTime: 'required',
        territory: 'required',
        unitPrice: 'required',
        CAC: 'required',
        validId: 'required',
      }

      const validation: any = new Validator(form, rules)
      if (validation.fails()) {
        let messages: string[] = []

        messages = ValidatorObject.getMessages(validation.errors)
        messages.forEach((error: string) => {
          context.$toast.error(error)
        })
      } else if (!productsBody.value.length) {
        context.$toast.error('Products is Required')
      } else {
        CustomerController.registerCustomer(requestPayload.value).then(() => {
          close()
        })
      }
    }

    return {
      close,
      form,
      customerTypes,
      customers,
      customersArray,
      increment,
      componentKey,
      requestPayload,
      submit,
    }
  },
})
</script>
