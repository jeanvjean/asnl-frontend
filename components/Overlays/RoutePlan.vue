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
          :label-title="'Customer'"
          :select-array="customerTypes"
          :default-option-text="'Select an Order Type'"
          :init-value="form.customerType"
          @get="form.customerType = $event.value"
        />

        <select-component
          :label-title="'Order Type'"
          :select-array="customerTypes"
          :default-option-text="'Select an Order Type'"
          :init-value="form.customerType"
          @get="form.customerType = $event.value"
        />

        <select-component
          :label-title="'Activity'"
          :select-array="customerTypes"
          :default-option-text="'Select an Order Type'"
          :init-value="form.customerType"
          @get="form.customerType = $event.value"
        />

        <select-component
          :label-title="'Mode of Service'"
          :select-array="customerTypes"
          :default-option-text="'Select Mode of Service'"
          :init-value="form.customerType"
          @get="form.customerType = $event.value"
        />
        <input-component
          :label-title="'Start Date'"
          :input-placeholder="'Enter Start Date'"
          :default-value="form.modeOfService"
          :input-type="'date'"
          @get="form.modeOfService = $event.value"
        />

        <input-component
          :label-title="'End Date'"
          :input-placeholder="'Enter End Date'"
          :default-value="form.name"
          :input-type="'date'"
          @get="form.name = $event.value"
        />

        <input-component
          :label-title="'Departure'"
          :input-placeholder="'Enter Departure Location'"
          :default-value="form.rcNumber"
          :is-required="false"
          @get="form.rcNumber = $event.value"
        />

        <input-component
          :label-title="'Destination'"
          :input-placeholder="'Enter Destination Location'"
          :default-value="form.nickName"
          @get="form.nickName = $event.value"
        />

        <input-component
          :label-title="'ERC Number'"
          :input-placeholder="'Enter ERC Number'"
          :default-value="form.address"
          @get="form.address = $event.value"
        />

        <input-component
          :label-title="'ICN Number'"
          :input-placeholder="'Enter ICN Number'"
          :default-value="form.contactPerson"
          @get="form.contactPerson = $event.value"
        />
      </div>
      <span :key="componentKey">
        <div
          class="
            border-t border-b-0 border-l-0 border-r-0
            pt-3
            my-2
            border-2 border-gray-300
            flex
            justify-between
            items-center
            px-3
          "
        >
          <h4>Products Section</h4>
          <button
            class="
              flex
              justify-center
              items-center
              bg-btn-purple
              text-white
              px-4
              py-2
              rounded-sm
            "
            @click="increment"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span class="text-white">Add Product</span>
          </button>
        </div>
        <div
          v-for="(product, i) in products"
          :key="i"
          class="grid grid-rows-1 md:grid-cols-2 gap-x-4"
        >
          <select-component
            :label-title="'Products'"
            :select-array="productsArray"
            :default-option-text="'Select a Product'"
            :init-value="product.id"
            @get="changePrice($event.value, i)"
          />
          <input-component
            :label-title="'Unit Price'"
            :input-placeholder="'Enter Unit of Price'"
            :disabled="true"
            :default-value="product.price"
          />
        </div>
      </span>

      <button
        class="
          rounded-sm
          mt-4
          px-8
          py-3
          border border-blue-300
          text-md
          font-semibold
          flex
          justify-between
          bg-blue-500
          text-white
        "
        @click="submit"
      >
        Add Customer
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
import BackDrop from '@/components/Base/Backdrop.vue'
import InputComponent from '@/components/Form/Input.vue'
import SelectComponent from '@/components/Form/Select.vue'
import { ProductObject } from '@/module/Product'
import Validator from 'validatorjs'
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

    function fetchProducts() {
      ProductObject.fetchProductsUnPaginated().then((response: any) => {
        productsArray.value = response.map((product: any) => {
          return {
            name: product.asnlNumber,
            value: product._id,
            price: product.unitCost,
          }
        })
      })
    }

    onMounted(() => {
      fetchProducts()
    })

    const products = ref<Array<any>>([])
    const productsArray = ref([])
    const componentKey = ref<number>(1)

    const increment = () => {
      products.value.push({
        id: '',
        price: '',
      })
    }

    function processFile(event: any, index: any) {
      const file = event.target.files[0]
      if (index === 'cac') {
        form.CAC = file
      } else {
        form.validId = file
      }
    }

    function changePrice(selectedProduct: any, index: any) {
      productsArray.value.forEach((prod: any) => {
        if (prod.value === selectedProduct) {
          products.value[index].id = String(selectedProduct)
          products.value[index].price = String(prod.price)
          productsBody.value.push(selectedProduct)
        }
      })
      changeComponentKey()
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
      products,
      productsArray,
      increment,
      changePrice,
      componentKey,
      processFile,
      requestPayload,
      submit,
    }
  },
})
</script>
