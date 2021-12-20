<template>
  <div class="px-6 py-6" id="print">
    <div class="py-2" v-if="!loading">
      <div class="bg-white w-3/4 mx-auto">
        <div class="flex justify-between px-6 py-4">
          <h1 class="flex-1 text-gray-400 font-medium text-lg">
            ECR #{{ form.ecrNo }}
          </h1>
          <div class="flex space-x-6">
            <button
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
              @click="printDiv"
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
              <span>Print a Copy</span>
            </button>
          </div>
        </div>

        <div class="w-full overflow-x-auto px-8 my-8">
          <table class="w-full">
            <thead>
              <tr>
                <th class="px-4 py-2 text-left">Customer Name</th>
                <th class="px-4 py-2 text-left">Total Quantity</th>
                <th class="px-4 py-2 text-left">Cylinder Type</th>
                <th class="px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="px-4 py-2 border border-gray-300 text-left">
                  <p class="text-gray-600">{{ form.customer.name }}</p>
                </td>
                <td class="px-4 py-2 border border-gray-300 text-left">
                  <p>{{ form.cylinders.length }}</p>
                </td>
                <td class="px-4 py-2 border border-gray-300 text-left">
                  <p>{{ form.gasType.gasName }}</p>
                </td>
                <td class="px-4 py-2 border border-gray-300 text-left">
                  <p>
                    {{
                      new Date(form.createdAt).getMonth() +
                      '/' +
                      new Date(form.createdAt).getDate() +
                      '/' +
                      new Date(form.createdAt).getFullYear()
                    }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="px-10 py-6 border-b border-t border-gray-300 w-full">
          <table class="w-10/12">
            <thead>
              <tr>
                <th class="px-4 py-2 text-right w-20">S/N</th>
                <th class="px-4 py-2 text-left">Cylinder No</th>
                <th class="px-4 py-2 text-left">Volume</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cylinder, i) in form.cylinders" :key="i">
                <td class="px-4 py-2 text-right">0{{ i + 1 }}.</td>
                <td class="px-4 py-2 border border-gray-300 text-left">
                  {{ cylinder.cylinderNumber }}
                </td>
                <td class="px-4 py-2 border border-gray-300 text-left">
                  {{ cylinder.gasVolumeContent.value }}
                  {{ cylinder.gasVolumeContent.unit }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'
import { getRandomValue } from '@/constants/utils'
import { fetchEcr } from '@/module/ECR'

export default defineComponent({
  components: {},
  layout: 'dashboard',
  setup() {
    const componentKey = ref<Number>()
    const router = useRouter()
    const route = useRoute()
    const cylinders = ref<Array<any>>([])

    const form = reactive({
      customer: null,
      branch: null,
      ecrNo: '',
      gasType: null,
      icn_id: null,
      cylinders: [],
      createdAt: null,
    })
    const loading = ref(true)
    const changeComponentKey = () => {
      componentKey.value = getRandomValue()
    }

    const printDiv = () => {
      var printContents = document.getElementById('print')
      var originalContents = document.body.innerHTML
      if (printContents) {
        document.body.innerHTML = printContents.innerHTML
        window.print()
        document.body.innerHTML = originalContents
        router.go(0)
      }
    }
    const getEcrDetails = () => {
      fetchEcr(route.value.params.id)
        .then((response) => {
          console.log(response)
          form.customer = response.customer
          form.createdAt = response.createdAt
          form.branch = response.branch
          form.ecrNo = response.ecrNo
          form.gasType = response.gasType
          form.icn_id = response.icn_id
          form.cylinders = response.cylinders
          if (response.customer) {
            loading.value = false
          }
        })
        .finally()
    }
    onMounted(() => {
      changeComponentKey()
      Promise.all([getEcrDetails()])
    })

    return {
      form,
      loading,
      printDiv,
    }
  },
})
</script>
