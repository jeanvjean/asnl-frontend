<template>
  <div class="py-6 px-8">
    <h1 class="text-black font-thin text-xl mb-4">Cylinder Analytics</h1>
    <div class="grid grid-rows-1 xl:grid-cols-3 gap-4 mb-6">
      <div class="bg-white px-10 pt-10 pb-24">
        <p class="font-medium text-black tracking-wide pb-4">
          Total Air Separation Cylinders
        </p>
        <div class="relative space-x-4 flex justify-between">
          <p class="absolute bottom-0 left-0 top-4 font-medium text-5xl">
            {{ stat.totalCylinders }}
          </p>
          <svg
            width="120"
            height="69"
            class="absolute bottom-0 right-0 top-0"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity=".2"
              d="M85 19a2 2 0 012-2h10a2 2 0 012 2v50H85V19zM103 43a2 2 0 012-2h10a2 2 0 012 2v26h-14V43z"
              fill="#FFA958"
            />
            <path
              d="M68 32a2 2 0 012-2h10a2 2 0 012 2v37H68V32z"
              fill="#FFA958"
            />
            <path
              opacity=".2"
              d="M51 2a2 2 0 012-2h10a2 2 0 012 2v67H51V2zM34 24a2 2 0 012-2h10a2 2 0 012 2v45H34V24zM17 35a2 2 0 012-2h10a2 2 0 012 2v34H17V35zM0 64a2 2 0 012-2h10a2 2 0 012 2v5H0v-5z"
              fill="#FFA958"
            />
          </svg>
        </div>
      </div>
      <div class="bg-white px-10 pt-10 pb-24">
        <p class="font-medium text-black tracking-wide pb-4">
          Total Buffer Cylinders
        </p>
        <div class="relative space-x-4 flex justify-between">
          <p class="absolute bottom-0 left-0 top-4 font-medium text-5xl">
            {{ stat.totalBufferCylinders }}
          </p>
          <svg
            width="120"
            height="69"
            class="absolute bottom-0 right-0 top-0"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity=".2"
              d="M85 19a2 2 0 012-2h10a2 2 0 012 2v50H85V19zM103 43a2 2 0 012-2h10a2 2 0 012 2v26h-14V43zM68 32a2 2 0 012-2h10a2 2 0 012 2v37H68V32zM51 2a2 2 0 012-2h10a2 2 0 012 2v67H51V2z"
              fill="#61A4E4"
            />
            <path
              d="M34 24a2 2 0 012-2h10a2 2 0 012 2v45H34V24z"
              fill="#61A4E4"
            />
            <path
              opacity=".2"
              d="M17 35a2 2 0 012-2h10a2 2 0 012 2v34H17V35zM0 64a2 2 0 012-2h10a2 2 0 012 2v5H0v-5z"
              fill="#61A4E4"
            />
          </svg>
        </div>
      </div>
      <div class="bg-white px-10 pt-10 pb-24">
        <p class="font-medium text-black tracking-wide pb-4">
          Total Assigned Cylinders
        </p>
        <div class="relative space-x-4 flex justify-between">
          <p class="absolute bottom-0 left-0 top-4 font-medium text-5xl">
            {{ stat.totalAssignedCylinders }}
          </p>
          <svg
            width="120"
            height="69"
            class="absolute bottom-0 right-0 top-0"
            viewBox="0 0 117 69"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.2"
              d="M85 19C85 17.8954 85.8954 17 87 17H97C98.1046 17 99 17.8954 99 19V69H85V19Z"
              fill="#FFC5C5"
            />
            <path
              opacity="0.2"
              d="M103 43C103 41.8954 103.895 41 105 41H115C116.105 41 117 41.8954 117 43V69H103V43Z"
              fill="#FFC5C5"
            />
            <path
              opacity="0.2"
              d="M68 32C68 30.8954 68.8954 30 70 30H80C81.1046 30 82 30.8954 82 32V69H68V32Z"
              fill="#FFC5C5"
            />
            <path
              d="M51 2C51 0.89543 51.8954 0 53 0H63C64.1046 0 65 0.895431 65 2V69H51V2Z"
              fill="#FFC5C5"
            />
            <path
              opacity="0.2"
              d="M34 24C34 22.8954 34.8954 22 36 22H46C47.1046 22 48 22.8954 48 24V69H34V24Z"
              fill="#FFC5C5"
            />
            <path
              opacity="0.2"
              d="M17 35C17 33.8954 17.8954 33 19 33H29C30.1046 33 31 33.8954 31 35V69H17V35Z"
              fill="#FFC5C5"
            />
            <path
              opacity="0.2"
              d="M0 64C0 62.8954 0.895431 62 2 62H12C13.1046 62 14 62.8954 14 64V69H0V64Z"
              fill="#FFC5C5"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="bg-white">
      <div class="py-2">
        <div
          class="
            flex
            justify-between
            items-center
            pr-6
            pl-4
            border-0 border-l-4 border-black
            mt-4
            w-full
            overflow-x-auto
          "
        >
          <h1 class="font-semibold text-black text-lg">Cylinders</h1>
          <div class="flex items-center space-x-6">
            <pagination
              :pagination-details="paginationProp"
              @next="changePage($event.value)"
              @prev="changePage($event.value)"
            />
            <button
              class="
                text-purple-500
                underline
                uppercase
                focus:outline-none
                font-medium
                text-sm
              "
            >
              View All
            </button>
          </div>
        </div>
      </div>

      <div class="mb-4 px-4 w-full overflow-x-auto">
        <div class="flex items-start px-2 space-x-4 w-full">
          <filter-component />
          <search-component
            :place-holder="'Search for Users, Cylinder no,gas type, Cylinder Volume'"
          />

          <button
            class="
              flex
              justify-between
              items-end
              bg-btn-purple
              px-4
              py-2
              text-white
              font-semibold
              text-md
              rounded-sm
            "
            @click="showRegister = !showRegister"
          >
            Register Cylinder
          </button>
        </div>
      </div>
      <table-component
        :head="headers"
        :body="registeredCylinders"
        @show="showRegister = true"
      ></table-component>
    </div>
    <new-cylinder
      v-if="showRegister"
      @close="showRegister = false"
    ></new-cylinder>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
} from '@nuxtjs/composition-api'
import TableComponent from '@/components/Base/Table3.vue'
import NewCylinder from '@/components/Overlays/NewCylinder.vue'
import { CylinderController } from '@/module/Cylinder'
import SearchComponent from '@/components/Base/Search.vue'
import FilterComponent from '@/components/Base/Filter.vue'
import Pagination from '@/components/Base/Pagination.vue'

export default defineComponent({
  name: 'Analytics',
  components: {
    TableComponent,
    NewCylinder,
    SearchComponent,
    FilterComponent,
    Pagination,
  },
  layout: 'dashboard',
  setup() {
    const headers = [
      'Cylinder No',
      'Gas Type',
      'Gas Volume Content',
      'Water Capacity',
      'Cylinder Type',
      'Manufacture Date',
    ]

    const page = ref<number>(1)

    function changePage(nextPage: number) {
      getCylinders(nextPage)
    }

    const registeredCylinders = ref([])
    const stat = reactive({
      totalCylinders: 0,
      totalBufferCylinders: 0,
      totalAssignedCylinders: 0,
    })

    const paginationProp = reactive({
      hasNextPage: false,
      hasPrevPage: false,
      currentPage: 1,
    })

    onMounted(() => {
      getCylinders(page.value)
    })

    function getCylinders(pageValue: number) {
      CylinderController.getRegisteredCylinders(pageValue).then(
        (responses: any) => {
          const myResponse = responses.data
          stat.totalCylinders = myResponse.counts.totalCylinders
          stat.totalBufferCylinders = myResponse.counts.totalBufferCylinders
          stat.totalBufferCylinders = myResponse.counts.totalAssignedCylinders
          registeredCylinders.value = myResponse.cylinders.docs
          paginationProp.hasNextPage = myResponse.cylinders.hasNextPage
          paginationProp.hasPrevPage = myResponse.cylinders.hasPrevPage
          paginationProp.currentPage = myResponse.cylinders.page
        }
      )
    }

    const body = ref([])

    const showRegister = ref(false)
    return {
      headers,
      body,
      showRegister,
      stat,
      registeredCylinders,
      paginationProp,
      changePage,
    }
  },
})
</script>
