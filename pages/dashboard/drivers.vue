<template>
  <div class="px-6 py-6">
    <div class="bg-white py-4">
      <div class="py-1">
        <div
          class="
            flex
            justify-between
            items-center
            pr-6
            pl-6
            border-0 border-l-4 border-black
            mt-4
            w-full
            overflow-x-auto
          "
        >
          <h1 class="font-semibold text-black text-lg">Drivers</h1>
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
      <div
        class="
          grid grid-rows-1
          lg:grid-cols-3
          xl:grid-cols-4
          gap-y-4
          lg:gap-x-6
          mt-6
          px-8
        "
      >
        <button
          v-for="(driver, index) in drivers"
          :key="index"
          class="
            flex
            px-4
            py-4
            border border-gray-300
            bg-gray-200
            space-x-4
            focus:outline-none
            focus:border-btn-purple
            rounded-sm
          "
          @click="getDriver(index)"
        >
          <img
            class="h-12 w-12 rounded-full"
            src="@/assets/images/default-avatar.jpg"
            alt=""
          />
          <div>
            <div class="mb-4">
              <p
                class="
                  capitalize
                  text-left text-black
                  font-medium
                  text-lg
                  tracking-wide
                "
              >
                {{ driver.name }}
              </p>
              <p class="capitalize text-left text-gray-600 font-light text-sm">
                {{ driver.subrole }}
              </p>
            </div>
            <div>
              <p
                class="
                  text-left text-black
                  font-medium
                  text-lg
                  tracking-wide
                  capitalize
                "
              >
                {{ driver.phoneNumber }}
              </p>
              <p class="text-left text-gray-600 font-light text-sm capitalize">
                {{ driver.location }}
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
    <driver
      v-if="showDriver"
      :driver="clickedUser"
      @close="showDriver = false"
    />
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
} from '@nuxtjs/composition-api'
import Driver from '@/components/Overlays/Driver.vue'
import { DriverObject } from '@/module/Driver'
import { DriverDto } from '@/types/Types'
import Pagination from '@/components/Base/Pagination.vue'

export default defineComponent({
  name: 'Drivers',
  components: { Driver, Pagination },
  layout: 'dashboard',
  setup() {
    const showDriver = ref(false)
    const drivers = ref<Array<DriverDto>>([])

    const paginationProp = reactive({
      hasNextPage: false,
      hasPrevPage: false,
      currentPage: 1,
    })

    function changePage(nextPage: number) {
      getDrivers(nextPage)
    }

    const page = ref<number>(1)

    const clickedUser = ref()

    function getDrivers(pageNumber: number) {
      DriverObject.getDrivers(pageNumber).then((response: any) => {
        const driverResponse = response.data.data
        drivers.value = driverResponse.docs.map((element: DriverDto) => {
          return {
            name: element.name ?? 'Not Specified',
            phoneNumber: element.phoneNumber ?? 'Not Specified',
            subrole: element.subrole ?? 'Not Specified',
            location: element.location ?? 'Not Specified',
          }
        })
        paginationProp.hasNextPage = driverResponse.hasNextPage
        paginationProp.hasPrevPage = driverResponse.hasPrevPage
        paginationProp.currentPage = driverResponse.page
      })
    }

    function getDriver(i: number) {
      clickedUser.value = drivers.value[i]
      showDriver.value = true
    }

    onMounted(() => {
      getDrivers(page.value)
    })

    return {
      showDriver,
      drivers,
      getDriver,
      clickedUser,
      getDrivers,
      paginationProp,
      changePage,
    }
  },
})
</script>
