<template>
  <div class="px-6 py-6">
    <div class="bg-white px-6 py-4">
      <h1
        class="text-black py-2 border-b-2 font-medium border-purple-500 inline-block"
      >
        All Drivers
      </h1>
      <div
        class="grid grid-rows-1 lg:grid-cols-3 xl:grid-cols-4 gap-y-4 lg:gap-x-6 mt-6"
      >
        <button
          v-for="(driver, index) in drivers"
          :key="index"
          class="flex px-4 py-4 border border-gray-300 bg-gray-200 space-x-4 focus:outline-none focus:border-purple-500 rounded-sm"
          @click="getDriver(index)"
        >
          <img
            class="h-12 w-12 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=ZIOeP15SMT&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <div>
            <div class="mb-4">
              <p
                class="capitalize text-left text-black font-medium text-lg tracking-wide"
              >
                {{ driver.name }}
              </p>
              <p class="capitalize text-left text-gray-600 font-light text-sm">
                {{ driver.subrole }}
              </p>
            </div>
            <div>
              <p class="text-left text-black font-medium text-lg tracking-wide">
                {{ driver.phoneNumber }}
              </p>
              <p class="text-left text-gray-600 font-light text-sm">
                Air Separation, Jos.
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
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import Driver from '@/components/Overlays/Driver.vue'
import { DriverRepository } from '@/module/Driver'
export default defineComponent({
  name: 'Drivers',
  components: { Driver },
  layout: 'dashboard',
  setup() {
    const showDriver = ref(false)
    const drivers = ref([])
    const driverObject = new DriverRepository()
    const clickedUser = ref()
    const getDrivers = () => {
      driverObject.getDrivers().then((response: any) => {
        drivers.value = response.data.data
      })
    }

    function getDriver(i: number) {
      clickedUser.value = drivers.value[i]
      showDriver.value = true
    }

    onMounted(getDrivers)
    return {
      showDriver,
      drivers,
      getDriver,
      clickedUser,
    }
  },
})
</script>
