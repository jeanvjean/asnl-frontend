<template>
  <back-drop>
    <div class="w-full lg:w-3/5 bg-white rounded-sm">
      <div class="rounded-sm">
        <div class="flex justify-between items-center bg-white py-4 px-8">
          <h1>Issue Products</h1>
          <div class="flex space-x-8 items-center">
            <button
              class="
                flex
                space-x-4
                py-2
                px-4
                items-center
                bg-btn-purple
                rounded-sm
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 fill-current text-btn-purple"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              <span class="text-white font-medium text-sm">Print a copy</span>
            </button>
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
        </div>
        <div class="bg-white py-6 px-8 space-y-6">
          <div class="flex justify-between items-center text-md">
            <div class="flex space-x-4 items-center">
              <span>MRN:</span>
              <input-component
                :default-value="form.mrn"
                :input-placeholder="'Enter MRN Number'"
                @get="form.mrn = $event.value"
              />
            </div>
            <div class="flex space-x-2 items-center">
              <span>Date:</span>
              <div class="flex space-x-2 items-center">
                <span>12/05/2020</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 fill-current text-white"
                  viewBox="0 0 24 24"
                  stroke="black"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div class="grid grid-rows-1 lg:grid-cols-3 gap-x-4 items-center">
            <select-component
              :label-title="'Customer'"
              :select-array="customers"
              :default-option-text="'Choose Customer'"
              :init-value="form.customer"
              @get="form.customer = $event.value"
            />
            <input-component
              :label-title="'Job Tag'"
              :default-value="form.jobTag"
              :input-placeholder="'Enter Job Tag'"
              @get="form.jobTag = $event.value"
            />
            <input-component
              :label-title="'Comment'"
              :default-value="form.comment"
              :input-placeholder="'Enter Comment'"
              @get="form.comment = $event.value"
            />
          </div>
          <div :key="componentKey" class="w-full overflow-x-auto">
            <table class="w-full table-auto border-separate">
              <thead>
                <tr>
                  <th
                    class="
                      px-4
                      py-2
                      font-medium
                      text-gray-600
                      uppercase
                      text-center text-sm
                    "
                  >
                    S/N
                  </th>
                  <th
                    class="
                      px-4
                      py-2
                      font-medium
                      text-gray-600
                      uppercase
                      text-sm
                    "
                  >
                    Product Name
                  </th>
                  <th
                    class="
                      px-4
                      py-2
                      font-medium
                      text-gray-600
                      uppercase
                      text-sm
                    "
                  >
                    Part Number
                  </th>
                  <th
                    class="
                      px-4
                      py-2
                      font-medium
                      text-gray-600
                      uppercase
                      text-sm
                    "
                  >
                    Quantity
                  </th>

                  <th
                    class="
                      px-4
                      py-2
                      font-medium
                      text-gray-600
                      uppercase
                      text-sm
                    "
                  >
                    Comment
                  </th>
                  <th
                    class="
                      px-4
                      py-2
                      font-medium
                      text-gray-600
                      uppercase
                      text-sm
                    "
                  ></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(product, i) in products"
                  :key="i"
                  class="hover:bg-gray-100"
                >
                  <td class="text-center">{{ Number(i) + 1 }}</td>
                  <td>
                    <select-component
                      :default-option-text="'Select Product Name'"
                      :init-value="product.productName"
                      :select-array="productsArray"
                      @get="
                        ;(product.productName = $event.value),
                          setProductName(product.productName, i)
                      "
                    />
                  </td>
                  <td>
                    <input-component
                      :input-placeholder="'Enter Product Number'"
                      :default-value="product.productNumber"
                      @get="product.productNumber = $event.value"
                    />
                  </td>

                  <td>
                    <input-component
                      :input-placeholder="'#'"
                      :default-value="product.quantityRequested"
                      :input-type="'number'"
                      @get="product.quantityRequested = $event.value"
                    />
                  </td>
                  <td>
                    <input-component
                      :input-placeholder="'Enter Comment'"
                      :default-value="product.comment"
                      @get="product.comment = $event.value"
                    />
                  </td>
                  <td class="text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="fill-current text-transparent w-4 h-4"
                      viewBox="0 0 24 24"
                      stroke="black"
                      @click="decreaseCounter(i)"
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
          </div>
          <div class="w-auto px-12 mb-10">
            <div class="grid grid-cols-3 gap-x-10 w-full h-full mx-auto px-4">
              <button
                class="flex items-center space-x-1"
                @click="increaseCounter()"
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    class="w-4 h-4 fill-current text-gray-500"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div class="underline">Add New Product</div>
              </button>

              <label
                for="file-upload"
                class="
                  block
                  custom-file-upload
                  w-full
                  h-full
                  border-2 border-gray-300
                  py-3
                  rounded-sm
                  focus:border focus:border-gray-200
                "
              >
                <div class="text-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    class="w-6 h-6 fill-current text-gray-600 mx-auto"
                  >
                    <path
                      d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"
                    />
                    <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
                  </svg>
                </div>
                <div class="text-center font-medium text-xs w-full">
                  <span class="inline-block">
                    {{
                      form.file.name ? form.file.name : 'Upload an Attachment'
                    }}
                  </span>
                </div>
              </label>
              <input
                id="file-upload"
                type="file"
                @change="processFile($event)"
              />

              <div
                class="
                  rounded-sm
                  border border-gray-300
                  px-4
                  mx-auto
                  text-sm
                  w-full
                "
              >
                <p class="text-gray-500 text-sm font-medium leading-6">
                  Inspecting officer
                </p>
                <div class="flex items-start space-x-2 py-2">
                  <img
                    v-if="user.image"
                    class="h-10 w-10 rounded-full"
                    :src="user.image"
                    alt=""
                  />
                  <img
                    v-else
                    class="h-10 w-10 rounded-full"
                    src="@/assets/images/default-avatar.jpg"
                    alt=""
                  />
                  <div>
                    <p class="text-black text-lg capitalize">{{ user.name }}</p>
                    <p class="text-gray-600 text-sm capitalize">
                      {{ user.role }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="
              w-full
              lg:w-3/5 lg:flex lg:justify-between lg:items-center lg:space-x-6
              px-6
            "
          >
            <button
              class="px-6 py-2 rounded-sm bg-btn-purple text-white w-full"
              @click="submitForm"
            >
              Create MRN
            </button>
            <button
              class="
                px-6
                py-2
                rounded-sm
                bg-white
                text-purple
                border border-btn-purple
                w-full
              "
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
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
import SelectComponent from '@/components/Form/Select.vue'
import InputComponent from '@/components/Form/Input.vue'
import { CustomerController } from '@/module/Customer'
import { ProductObject } from '@/module/Product'
import { ProductDto } from '@/types/Types'
import { ValidatorObject } from '@/module/Validation'
import { mainStore } from '@/module/Pinia'
export default defineComponent({
  components: {
    BackDrop,
    SelectComponent,
    InputComponent,
  },
  setup(_props, ctx) {
    const close = () => {
      ctx.emit('close')
    }
    const appStore = mainStore()
    const user: any = appStore.getLoggedInUser

    const products = ref<Array<ProductDto>>([])
    const productsArray = ref<any>([])
    const componentKey = ref<number>(0)
    const customers = ref<any>([])

    const form = reactive({
      jobTag: '',
      mrn: '',
      comment: '',
      customer: '',
      file: '',
    })

    const context = useContext()

    const increaseCounter = () => {
      products.value.push({
        productNumber: '',
        productName: '',
        quantityRequested: '0',
        comment: '',
      })
    }

    function fetchCustomers() {
      CustomerController.fetchUnPaginatedCustomers().then((response) => {
        customers.value = response.map((element: any) => {
          return {
            name: element.name,
            value: element._id,
          }
        })
      })
    }

    function fetchProducts() {
      ProductObject.fetchProductsUnPaginated().then((response: any) => {
        productsArray.value = response.map((product: any) => {
          return {
            name: product.productName,
            value: product.productName,
            productNumber: product.asnlNumber,
          }
        })
      })
    }

    function decreaseCounter(index: any) {
      products.value.splice(index, 1)
      componentKey.value++
    }

    function setProductName(id: string, index: any) {
      productsArray.value.forEach((element: any) => {
        if (element.name === id) {
          products.value[index].productNumber = element.productNumber
        }
      })
      componentKey.value++
    }

    const requestBody = computed(() => {
      const formData = new FormData()
      formData.append('jobTag', form.jobTag)
      formData.append('comment', form.comment)
      formData.append('mrn', form.mrn)
      formData.append('customer', form.customer)
      formData.append('mrnDocument', form.file)
      formData.append('products', JSON.stringify(products.value))
      return formData
    })

    function processFile(event: any) {
      const file = event.target.files[0]
      form.file = file
    }

    const submitForm = () => {
      const data = {
        products: products.value,
        jobTag: form.jobTag,
        mrn: form.mrn,
        comment: form.comment,
        customer: form.customer,
        mrnDocument: form.file,
      }

      const rules = {
        products: 'required|array',
        'products.*.productNumber': 'required|string',
        'products.*.productName': 'required|string',
        'products.*.quantityRequested': 'required|numeric|min:1',
        'products.*.comment': 'required|string',
        jobTag: 'required|string',
        comment: 'string',
        customer: 'required|string',
        mrn: 'required|string',
        mrnDocument: 'required',
      }

      const validation = new Validator(data, rules)

      if (validation.fails()) {
        let messages: string[] = []
        messages = ValidatorObject.getMessages(validation.errors)
        messages.forEach((error: string) => {
          context.$toast.error(error)
        })
      } else {
        ProductObject.registerDisbursal(requestBody.value)
          .then(() => {
            componentKey.value = 0
            ctx.emit('reload')
            close()
          })
          .catch(() => {})
      }
    }

    onMounted(() => {
      fetchCustomers()
      fetchProducts()
    })
    return {
      close,
      decreaseCounter,
      increaseCounter,
      products,
      form,
      componentKey,
      customers,
      submitForm,
      productsArray,
      setProductName,
      user,
      processFile,
    }
  },
})
</script>
<style scoped>
input[type='file'] {
  display: none;
}
.custom-file-upload {
  cursor: pointer;
}
</style>
