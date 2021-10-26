<template>
  <div>
    <div class="py-4 px-2">
      <div class="flex justify-between items-start px-8 mt-4">
        <h2 class="text-lg font-medium">Customer Details</h2>
        <div class="font-medium text-lg text-black">
          <p>Date</p>
          <p>{{ productionDetail.date }}</p>
        </div>
      </div>
      <div class="flex items-center space-x-4 px-8">
        <div class="flex-initial">
          <svg
            class="
              text-btn-purple
              mr-3
              h-10
              w-10
              fill-current
              bg-gray-400 bg-opacity-25
              rounded-full
              p-2
            "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 452.608 452.608"
          >
            <path
              d="M285.184 92.672V63.488h6.656c17.408 0 31.744-14.336 31.744-31.744S309.248 0 291.84 0H160.768c-17.408 0-31.744 14.336-31.744 31.744s14.336 31.744 31.744 31.744h6.656v29.184c-38.912 2.56-69.12 34.816-69.12 73.728v80.384h256V166.4c0-38.912-30.208-71.168-69.12-73.728zm-25.6-.512h-20.48V80.896h-25.6V92.16h-20.48V62.976h66.56V92.16zM98.304 272.384v81.92c0 28.16 15.872 53.76 40.96 66.56v31.744h174.08v-31.744c25.088-12.8 40.96-38.4 40.96-66.56v-81.92h-256z"
            />
          </svg>
        </div>
        <div class="flex-1">
          <h3 class="font-semibold text-lg">
            {{ productionDetail.customerName }}
          </h3>
          <span class="font-medium text-sm">{{
            productionDetail.customerAddress
          }}</span>
        </div>
      </div>
      <div class="w-full grid grid-rows-1 lg:grid-cols-4 my-10 px-8">
        <div class="space-y-4 text-center">
          <p class="uppercase text-base tracking-tight font-semibold">
            Production No
          </p>
          <p class="text-base">{{ productionDetail.productionNo }}</p>
        </div>
        <div class="space-y-4 text-center">
          <p class="uppercase text-base tracking-tight font-semibold">ECR No</p>
          <p class="text-base">{{ productionDetail.ecrNo }}</p>
        </div>
        <div class="space-y-4 text-center">
          <p class="uppercase text-base tracking-tight font-semibold">Shift</p>
          <p class="text-base">{{ productionDetail.shift }}</p>
        </div>
        <div class="space-y-4 text-center">
          <p class="uppercase text-base tracking-tight font-semibold">Status</p>
          <p class="text-base">{{ productionDetail.status }}</p>
        </div>
      </div>
      <div class="w-full mt-10">
        <table
          style="border-spacing: 0 15px"
          class="w-full table-auto table border-separate"
        >
          <thead
            class="bg-gray-200 tracking-tight text-base font-semibold uppercase"
          >
            <tr>
              <th></th>
              <th class="text-left px-4 py-3 text-black">Cylinder No</th>
              <th class="text-center px-4 py-3 text-black">Volume</th>
              <th class="text-center px-4 py-3 text-black">Type</th>
              <th class="text-center px-4 py-3 text-black">Status</th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr v-for="(row, index) in productionDetail.cylinders" :key="index">
              <td class="px-2 py-1 text-center">
                <input
                  v-if="row.status != 'filled'"
                  type="checkbox"
                  @change="addCylinders(row.id)"
                />
              </td>
              <td
                class="
                  text-left
                  capitalize
                  font-light
                  text-md
                  px-6
                  py-6
                  border-white border
                "
              >
                {{ row.cylinderNo }}
              </td>
              <td
                class="
                  text-center
                  capitalize
                  font-light
                  text-md
                  px-6
                  py-6
                  border-white border
                "
              >
                {{ row.volume }}
              </td>
              <td
                class="
                  text-center
                  capitalize
                  font-light
                  text-md
                  px-6
                  py-6
                  border-white border
                "
              >
                {{ row.type }}
              </td>
              <td
                class="
                  text-center
                  capitalize
                  font-light
                  text-md
                  px-6
                  py-6
                  border-white border
                "
              >
                {{ row.status }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex items-center justify-center">
        <div>
          <div class="px-4 py-4 grid grid-cols-2 gap-10">
            <div
              class="
                uppercase
                text-gray-900
                font-extralight
                text-lg
                tracking-tight
              "
            >
              Total Quantity
            </div>
            <div class="text-lg tracking-tight">
              {{ productionDetail.totalQuantity }}
            </div>
          </div>
          <div class="px-4 py-4 grid grid-cols-2 gap-10">
            <div
              class="
                uppercase
                text-gray-900
                font-extralight
                text-lg
                tracking-tight
              "
            >
              Total Volume
            </div>
            <div class="text-lg tracking-tight">
              {{ productionDetail.totalVolume }}
            </div>
          </div>
          <div class="px-4 py-4 grid grid-cols-2 gap-10">
            <div
              class="
                uppercase
                text-gray-900
                font-extralight
                text-lg
                tracking-tight
              "
            >
              Quantity to be Filled
            </div>
            <div class="text-lg tracking-tight">
              {{ productionDetail.quantityToFill }}
            </div>
          </div>
          <div class="px-4 py-4 grid grid-cols-2 gap-10">
            <div
              class="
                uppercase
                text-gray-900
                font-extralight
                text-lg
                tracking-tight
              "
            >
              Volume to be Filled
            </div>
            <div class="text-lg tracking-tight">
              {{ productionDetail.volumeToFill }}
            </div>
          </div>
        </div>
      </div>
      <form class="px-4" @submit.prevent="submit">
        <button-component
          v-if="buttonsToShow.update"
          :button-class="'bg-btn-purple text-white w-full md:w-1/4 mr-2'"
          :button-text="'Submit'"
          :loading-status="buttonLoading"
        />
        <button-component
          v-if="buttonsToShow.completed"
          :button-class="'bg-btn-purple text-white w-full md:w-1/4 mr-2'"
          :button-text="'Mark as Completed'"
          :loading-status="buttonLoading"
          :button-type="'button'"
          @buttonClicked="finalise"
        />
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  useContext,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'
import {
  completeSchedule,
  fetchSchedule,
  updateSchedule,
} from '@/module/Production'
import ButtonComponent from '@/components/Form/Button.vue'

export default defineComponent({
  components: { ButtonComponent },
  layout: 'noSidebar',
  setup() {
    const productionDetail = reactive({
      customerName: '',
      customerAddress: '',
      productionNo: '',
      ecrNo: '',
      shift: '',
      date: '',
      totalQuantity: '0',
      totalVolume: '0',
      quantityToFill: '0',
      volumeToFill: '0',
      cylinders: [],
      status: '',
    })
    const buttonLoading = ref<Boolean>(false)

    const schedule: string = useRoute().value.params.id

    const showProduction = ref<Boolean>(false)
    const showSupplier = ref<Boolean>(false)
    const buttonsToShow = {
      completed: false,
      update: false,
    }

    const getProductionDetail = (scheduleId: string) => {
      fetchSchedule(scheduleId).then((response) => {
        productionDetail.customerName = response.customer
          ? response.customer.name
          : ''
        productionDetail.customerAddress = response.customer
          ? response.customer.address
          : ''
        productionDetail.productionNo = response.productionNo
        productionDetail.date = new Date(response.date).toDateString()
        productionDetail.ecrNo = response.ecrNo
        productionDetail.shift = response.shift
        productionDetail.totalQuantity = response.totalQuantity
        productionDetail.quantityToFill = response.quantityToFill
        productionDetail.status = response.status
        productionDetail.cylinders = response.cylinders.map((cylinder: any) => {
          return {
            cylinderNo: cylinder.cylinderNumber,
            volume: cylinder.gasVolumeContent.value,
            type: cylinder.gasName,
            status: cylinder.cylinderStatus,
            id: cylinder._id,
          }
        })
        buttonsToShow.completed = productionDetail.cylinders.every(
          (cy: any) => cy.status === 'filled'
        )
        buttonsToShow.update = !buttonsToShow.completed
        productionDetail.totalVolume = `${response.totalVolume.value} ${response.totalVolume.unit}`
        productionDetail.volumeToFill = `${response.volumeToFill.value} ${response.volumeToFill.unit}`
      })
    }

    const cylinders = ref<string[]>([])

    const addCylinders = (cylinderId: string) => {
      let index: number
      if (cylinders.value.includes(cylinderId)) {
        index = cylinders.value.indexOf(cylinderId)
        cylinders.value.splice(index, 1)
      } else {
        cylinders.value.push(cylinderId)
      }
    }

    onMounted(() => {
      getProductionDetail(schedule)
    })

    const finalise = () => {
      buttonLoading.value = true
      completeSchedule(schedule)
        .then(() => {
          router.push('/dashboard/production')
        })
        .finally(() => {
          buttonLoading.value = false
        })
    }

    const router = useRouter()
    const context = useContext()
    const submit = () => {
      if (cylinders.value.length === 0) {
        context.$toast.error('Select at least one Cylinder')
      } else {
        buttonLoading.value = true
        updateSchedule({
          cylinders: cylinders.value,
          productionId: schedule,
        })
          .then(() => {
            router.push('/dashboard/production')
          })
          .finally(() => {
            buttonLoading.value = false
          })
      }
    }

    return {
      showProduction,
      showSupplier,
      productionDetail,
      addCylinders,
      cylinders,
      buttonLoading,
      submit,
      buttonsToShow,
      finalise,
    }
  },
})
</script>
