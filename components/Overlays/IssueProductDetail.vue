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
                :default-value="mrn.mrn"
                :input-placeholder="'Enter MRN Number'"
                :is-disabled="true"
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
              :is-required="false"
              :is-disabled="true"
              :init-value="mrn.customer._id"
            />
            <input-component
              :label-title="'Job Tag'"
              :default-value="mrn.jobTag"
              :input-placeholder="'Enter Job Tag'"
              :is-required="false"
              :is-disabled="true"
              @get="form.jobTag = $event.value"
            />
            <input-component
              :label-title="'Comment'"
              :default-value="mrn.comments[0].comment"
              :is-required="false"
              :is-disabled="true"
              :input-placeholder="'Enter Comment'"
              @get="form.comment = $event.value"
            />
          </div>
          <div :key="componentKey" class="w-full overflow-x-auto">
            <table class="w-full table table-auto border-separate">
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
                  v-for="(product, i) in mrn.products"
                  :key="i"
                  class="hover:bg-gray-100"
                >
                  <td class="text-center">{{ Number(i) + 1 }}</td>
                  <td>
                    <select-component
                      :default-option-text="'Select Product Name'"
                      :init-value="product.productName"
                      :select-array="productsArray"
                      :is-disabled="true"
                    />
                  </td>
                  <td>
                    <input-component
                      :input-placeholder="'Enter Product Number'"
                      :default-value="product.productNumber"
                      :is-disabled="true"
                      @get="product.productNumber = $event.value"
                    />
                  </td>

                  <td>
                    <input-component
                      :input-placeholder="'#'"
                      :default-value="product.quantityRequested"
                      :is-disabled="true"
                      :input-type="'number'"
                      @get="product.quantityRequested = $event.value"
                    />
                  </td>
                  <td>
                    <input-component
                      :input-placeholder="'Enter Comment'"
                      :is-disabled="true"
                      :default-value="product.comment"
                      @get="product.comment = $event.value"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="px-4">
            <input-component
              :label-title="'Comment'"
              :input-placeholder="'Enter Comment'"
              :is-required="false"
              @get="form.comment = $event.value"
            />
          </div>

          <div
            class="
              w-full
              lg:w-3/5
              lg:flex
              lg:justify-between
              lg:items-center
              lg:space-x-6
            "
          >
            <button
              class="px-6 py-2 rounded-sm bg-btn-purple text-white w-full"
              @click="confirmationComponent('approve')"
            >
              Approve
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
              @click="confirmationComponent('reject')"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>

    <confirmation
      v-if="showConfirmation"
      :display-text="statusText"
      @close="showConfirmation = false"
      @approve="intermediate($event)"
    />
  </back-drop>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
} from '@nuxtjs/composition-api'
import BackDrop from '@/components/Base/Backdrop.vue'
import SelectComponent from '@/components/Form/Select.vue'
import InputComponent from '@/components/Form/Input.vue'
import { CustomerController } from '@/module/Customer'
import { ProductObject } from '@/module/Product'
import { ProductDto } from '@/types/Types'
import Confirmation from '@/components/Overlays/Confirmation.vue'

export default defineComponent({
  components: {
    BackDrop,
    SelectComponent,
    InputComponent,
    Confirmation,
  },
  props: {
    mrn: {
      type: Object,
      required: true,
    },
  },
  setup(_props, ctx) {
    const close = () => {
      ctx.emit('close')
    }

    const products = ref<Array<ProductDto>>([])
    const productsArray = ref<any>([])
    const componentKey = ref<number>(0)
    const customers = ref<any>([])

    const form = reactive({
      comment: '',
    })

    const statusText = ref<String>('')
    const showConfirmation = ref<Boolean>(false)

    function intermediate(body: any) {
      const finalBody = {
        status: body.status,
        password: body.password,
        id: _props.mrn._id,
        comment: form.comment,
        products: _props.mrn.products,
        nextApprovalOfficer: _props.mrn.nextApprovalOfficer,
      }
      approveCylinder(finalBody)
    }

    function approveCylinder(requestBody: any) {
      ProductObject.approveMrn(requestBody)
        .then(() => {
          showConfirmation.value = false
          location.reload()
        })
        .catch(() => {})
    }

    function confirmationComponent(text: String) {
      statusText.value = text
      showConfirmation.value = true
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

    function setProductName(id: string, index: any) {
      productsArray.value.forEach((element: any) => {
        if (element.name === id) {
          products.value[index].productNumber = element.productNumber
        }
      })
      componentKey.value++
    }

    onMounted(() => {
      fetchCustomers()
      fetchProducts()
    })

    return {
      close,
      products,
      form,
      componentKey,
      customers,
      productsArray,
      setProductName,
      showConfirmation,
      intermediate,
      confirmationComponent,
    }
  },
})
</script>
