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
        <div>
          <p class="text-xl font-medium">Add New Customer</p>
          <p class="font-light text-sm text-gray-500">
            Enter Customer Details below.
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
      <form @submit.prevent="submit">
        <div class="grid grid-rows-1 md:grid-cols-2 gap-x-4">
          <select-component
            :label-title="'Customer Type'"
            :select-array="customerTypes"
            :default-option-text="'Select a Customer Type'"
            :init-value="form.customerType"
            @get="form.customerType = $event.value"
          />
          <select-component
            :label-title="'Mode of Service'"
            :select-array="modeOfService"
            :default-option-text="'Select Mode of Service'"
            :init-value="form.modeOfService"
            @get="form.modeOfService = $event.value"
          />
          <input-component
            :label-title="'Customer Name'"
            :input-placeholder="'Enter Customer Name'"
            :default-value="form.name"
            @get="form.name = $event.value"
          />

          <input-component
            :label-title="'Nick Name'"
            :input-placeholder="'Enter Nick Name'"
            :default-value="form.nickName"
            @get="form.nickName = $event.value"
          />

          <input-component
            :label-title="'Address'"
            :input-placeholder="'Enter Customer Address'"
            :default-value="form.address"
            @get="form.address = $event.value"
          />

          <input-component
            :label-title="'Name of Contact Person'"
            :input-placeholder="'Enter Name of Contact Person'"
            :default-value="form.contactPerson"
            @get="form.contactPerson = $event.value"
          />

          <input-component
            :label-title="'Email Address'"
            :input-placeholder="'Enter Email Address'"
            :default-value="form.email"
            @get="form.email = $event.value"
            :is-required="false"
          />

          <input-component
            :label-title="'Tax I.D Number (Optional)'"
            :input-placeholder="'Enter Tax I.D Number (Optional)'"
            :default-value="form.TIN"
            :is-required="false"
            @get="form.TIN = $event.value"
          />

          <input-component
            :label-title="'Phone Number'"
            :input-placeholder="'Enter Phone Number'"
            :default-value="form.phoneNumber"
            @get="form.phoneNumber = $event.value"
          />

          <input-component
            :label-title="'R.C Number (Optional)'"
            :input-placeholder="'Enter R.C Number (Optional)'"
            :default-value="form.rcNumber"
            :is-required="false"
            @get="form.rcNumber = $event.value"
          />

          <input-component
            :label-title="'Cylinder Holding Time (days)'"
            :input-placeholder="'Enter Cylinder Holding Time'"
            :default-value="form.cylinderHoldingTime"
            @get="form.cylinderHoldingTime = $event.value"
            :is-required="false"
          />
          <div>
            <select-component
              :label-title="'Territory'"
              :select-array="territory"
              :default-option-text="'Enter Territory'"
              :init-value="form.territory"
              @get="form.territory = $event.value"
            />
            <div class="inline-block text-sm text-gray-400 my-2 mr-3">
              <button
                @click="addTer = true"
                class="flex justify-evenly items-center"
                type="button"
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
                <span class="underline">Add Territory</span>
              </button>
            </div>
          </div>

          <!-- <input-component
            :label-title="'Unit Price'"
            :input-placeholder="'Enter Unit Price'"
            :default-value="form.unitPrice"
            @get="form.unitPrice = $event.value"
            :inputType="'number'"
          /> -->
          <input-component
            :label-title="'VAT'"
            :input-placeholder="'Enter VAT'"
            :default-value="form.vat.value"
            @get="form.vat.value = $event.value"
            :inputType="'number'"
          />

          <div class="w-full py-2">
            <label class="block w-full px-1 text-gray-800 text-md mb-1"
              >Upload CAC Document</label
            >
            <input
              type="file"
              class="
                appearance-none
                block
                w-full
                px-4
                py-2
                border-2 border-gray-200
                rounded-sm
                focus:outline-none focus:border-btn-purple
                font-thin
                placeholder-gray-500
                focus:placeholder-gray-300
              "
              @change="processFile($event, 'cac')"
            />
          </div>

          <div class="w-full py-2">
            <label class="block w-full px-1 text-gray-800 text-md mb-1"
              >Valid ID</label
            >
            <input
              type="file"
              class="
                appearance-none
                block
                w-full
                px-4
                py-2
                border-2 border-gray-200
                rounded-sm
                focus:outline-none focus:border-btn-purple
                font-thin
                placeholder-gray-500
                focus:placeholder-gray-300
              "
              @change="processFile($event, 'validId')"
            />
          </div>
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
              type="button"
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
            class="flex items-center justify-center space-x-4"
          >
            <select-component
              :label-title="'Products'"
              :select-array="productsArray"
              :default-option-text="'Select product'"
              :init-value="product.id"
              @get="
                product.product.product_id = $event.value
                getProduct($event.value, i)
              "
            />
            <input-component
              :label-title="'Units'"
              :input-placeholder="'Enter unit price'"
              :default-value="product.unit_price.value"
              @get="product.unit_price.value = $event.value"
              :inputType="'number'"
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="fill-current w-12 h-12 text-black pt-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              @click="removeProduct(i)"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
        </span>

        <div class="w-1/3 lg:w-1/5 mt-2">
          <button-component
            :button-class="'border border-blue-300 bg-blue-500 text-white'"
            :button-text="'Add Customer'"
            :loading-status="isLoading"
          />
        </div>
      </form>
      <add-territory
        v-if="addTer"
        @close="addTer = false"
        @addToTerritory="addToTerritory"
      />
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
  useRouter,
  useContext,
} from '@nuxtjs/composition-api'
import Validator from 'validatorjs'
import BackDrop from '@/components/Base/Backdrop.vue'
import InputComponent from '@/components/Form/Input.vue'
import SelectComponent from '@/components/Form/Select.vue'
import ButtonComponent from '@/components/Form/Button.vue'
import { CylinderController } from '@/module/Cylinder'
import { CustomerController } from '@/module/Customer'
import { ValidatorObject } from '@/module/Validation'
import { getRandomValue } from '@/constants/utils'
import AddTerritory from '@/components/Overlays/AddTerritory.vue'
import { fetchTerrotiries } from '@/module/Territory'

export default defineComponent({
  components: {
    BackDrop,
    AddTerritory,
    InputComponent,
    SelectComponent,
    ButtonComponent,
  },
  props: {
    fromCylinder: {
      type: Boolean,
      required: false,
    },
  },
  setup(_props, ctx) {
    const close = () => {
      ctx.emit('close')
    }

    const context = useContext()
    const router = useRouter()
    const products = ref<Array<any>>([])
    const productsArray = ref([])
    const componentKey = ref<number>(1)
    const isLoading = ref<Boolean>(false)

    const modeOfService = [
      {
        name: 'ASNL Cylinder',
        value: 'asnl',
      },
      {
        name: 'Customer Cylinder',
        value: 'customer',
      },
      {
        name: 'Both',
        value: 'both',
      },
    ]
    const customerTypes = [
      {
        name: 'ASNL Cooperate',
        value: 'asnl-cooperate',
      },
      {
        name: 'ASNL Medical',
        value: 'asnl-medical',
      },
      {
        name: 'ASNL Retail',
        value: 'asnl-retail',
      },
      {
        name: 'TP Cooperate',
        value: 'tp-cooperate',
      },
      {
        name: 'TP Medical',
        value: 'tp-medical',
      },
      {
        name: 'TP Retail',
        value: 'tp-retail',
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
      vat: {
        value: 0,
        unit: '%',
      },
    })
    const addTer = ref(false)

    const territory = ref<any>([])

    const addToTerritory = (ter: any) => {
      territory.value.push(ter)
    }

    function fetchProducts() {
      CylinderController.getCylinders().then((response: any) => {
        // console.log(response.data.data.cylinders, 'product')
        productsArray.value = response.data.data.cylinders.map((gas: any) => {
          return {
            name: gas.gasName,
            value: gas._id,
            colorCode: gas.colorCode,
          }
        })
      })
    }

    const removeProduct = (index: any) => {
      products.value.splice(index, 1)
      changeComponentKey()
    }
    const fetchAllTer = () => {
      fetchTerrotiries().then((response: any) => {
        // console.log(response)
        territory.value = response.map((ter: any) => {
          return {
            name: ter.name,
            value: ter.name,
          }
        })
      })
    }

    onMounted(() => {
      Promise.all([fetchAllTer(), fetchProducts()])
    })
    const getProduct = (value: any, index: number) => {
      let product: any = productsArray.value.find(
        (item: any) => item.value == value
      )
      if (product) {
        products.value[index].product.productName = product.name
        products.value[index].product.colorCode = product.colorCode
      }
    }

    const increment = () => {
      products.value.push({
        product: {
          product_id: '',
          productName: '',
          colorCode: '',
        },
        unit_price: {
          value: 0,
          unit: 'NGN',
        },
      })
      // changeComponentKey()
    }

    function processFile(event: any, index: any) {
      const file = event.target.files[0]
      if (index === 'cac') {
        form.CAC = file
      } else {
        form.validId = file
      }
    }

    const changeComponentKey = () => {
      const random = getRandomValue()
      componentKey.value = random
    }

    const requestPayload = computed(() => {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('customerSubType', form.customerType)
      formData.append('customerType', 'regular')
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
      formData.append('CAC', form.CAC)
      formData.append('vat', JSON.stringify(form.vat))
      formData.append('validId', form.validId)
      formData.append('products', JSON.stringify(products.value))
      return formData
    })

    onMounted(() => {
      changeComponentKey()
    })
    const payload = ref<any>({})
    const submit = () => {
      const rules = {
        name: 'required',
        customerType: 'required',
        modeOfService: 'required',
        nickName: 'required',
        address: 'required',
        contactPerson: 'required',
        // email: 'required',
        TIN: 'string',
        phoneNumber: 'required',
        rcNumber: 'string',
        // cylinderHoldingTime: 'required',
        territory: 'required',
        CAC: 'required',
        validId: 'required',
      }
      payload.value = {
        name: form.name,
        customerType: form.customerType,
        modeOfService: form.modeOfService,
        nickName: form.nickName,
        address: form.address,
        contactPerson: form.contactPerson,
        email: form.email,
        phoneNumber: form.phoneNumber,
        TIN: form.TIN,
        rcNumber: form.rcNumber,
        cylinderHoldingTime: form.cylinderHoldingTime,
        territory: form.territory,
        CAC: form.CAC,
        vat: form.vat,
        validId: form.validId,
      }
      const validation: any = new Validator(payload.value, rules)
      if (validation.fails()) {
        let messages: string[] = []

        messages = ValidatorObject.getMessages(validation.errors)
        messages.forEach((error: string) => {
          context.$toast.error(error)
        })
      } else {
        isLoading.value = true
        // console.log(payload.value)
        CustomerController.registerCustomer(requestPayload.value)
          .then((response) => {
            close()
            if (_props.fromCylinder) {
              ctx.emit('addNewCustomer', response.data)
            }
          })
          .finally(() => {
            isLoading.value = false
            // router.go(0)
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
      componentKey,
      processFile,
      territory,
      // requestPayload,
      modeOfService,
      changeComponentKey,
      addToTerritory,
      addTer,
      submit,
      isLoading,
      removeProduct,
      getProduct,
    }
  },
})
</script>
