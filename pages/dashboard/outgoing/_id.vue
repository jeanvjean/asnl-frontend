<template>
  <div class="px-6 py-6">
    <div class="py-2">
      <div class="bg-white w-3/4 mx-auto">
        <div class="flex justify-between px-6 py-4">
          <h1 class="flex-1 text-gray-400 font-medium text-lg">OCN Details</h1>
          <div class="flex space-x-6">
            <button
              v-show="false"
              class="
                flex
                items-center
                bg-btn-purple
                text-white
                space-x-4
                px-4
                py-2
                rounded-sm
              "
            >
              <span>Generate WayBill</span>
            </button>
          </div>
        </div>
        <div class="w-full overflow-x-auto px-8 my-8">
          <div
            class="
              grid grid-rows-1
              lg:grid-cols-3
              divide divide-x-2 divide-gray-300
              mt-8
            "
          >
            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">OCN No</h4>
                <p class="text-gray-600">{{ details.ocnNo }}</p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Customer</h4>
                <p>{{ details.customer.name }}</p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">No of Cylinders</h4>
                <p>
                  {{ details.cylinders.length }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full overflow-x-auto px-8 pb-4 my-4 pb-16">
          <div
            class="
              grid grid-rows-1
              lg:grid-cols-3
              divide divide-x-2 divide-gray-300
              mt-8
            "
          >
            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Type</h4>
                <p>{{ details.type }}</p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Date</h4>
                <p>{{ details.date }}</p>
              </div>
            </div>

            <div class="flex items-center justify-center">
              <div class="space-y-4">
                <h4 class="text-gray-400 font-medium">Total Amount</h4>
                <p class="leading-3">₦ {{ details.totalAmount.value }}.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  reactive,
  ref,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'

import { fetchIcn } from '@/module/Incoming'

export default defineComponent({
  components: {},
  layout: 'dashboard',
  setup() {
    const details = reactive<any>({
      customer: '',
      cylinders: 0,
      cylinderType: '',
      date: 0,
      ocnNo: '',
      totalAmount: 0,
      type: '',
    })
    const id: string = useRoute().value.params.id
    const router = useRouter()

    const getOCNDetail = (id: string) => {
      fetchIcn(id).then((response) => {
        console.log(response)
        details.customer = response.customer
        details.cylinders = response.cylinders
        details.cylinderType = response.cylinderType
        details.date = new Date(response.date).toDateString()
        details.ocnNo = response.ocnNo
        details.totalAmount = response.totalAmount
        details.type = response.type
      })
    }

    onBeforeMount(() => {
      Promise.all([getOCNDetail(id)])
    })

    return {
      router,
      details,
    }
  },
})
</script>
