<template>
  <back-drop>
    <div
      class="
        w-1/2
        float-right
        h-full
        bg-white
        relative
        pt-6
        px-6
        overflow-y-auto
      "
    >
      <div class="flex justify-between items-center mb-4 text-gray-400">
        <h1 class="text-lg font-semibold">Filters</h1>
        <svg
          class="w-5 h-5 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          @click="close"
        >
          <path
            d="M2.93 17.07A10 10 0 1117.07 2.93 10 10 0 012.93 17.07zM11.4 10l2.83-2.83-1.41-1.41L10 8.59 7.17 5.76 5.76 7.17 8.59 10l-2.83 2.83 1.41 1.41L10 11.41l2.83 2.83 1.41-1.41L11.41 10z"
          />
        </svg>
      </div>
      <div v-for="(filter, index) in filters" :key="index" class="my-6">
        <div
          class="
            flex
            justify-between
            items-center
            text-sm
            border-0 border-b-4 border-gray-200
            text-gray-500
            font-bold
            mb-2
            pb-1
          "
        >
          <h3 class="uppercase font-semibold">{{ index }}</h3>
          <svg
            class="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <div class="space-y-2.5 pt-1">
          <span
            v-for="(listValue, j) in filter.list"
            :key="j"
            class="flex items-center space-x-4 text-gray-600 capitalize"
          >
            <input
              :name="index"
              :type="listValue.type"
              :checked="listValue.selected ? 'checked' : ''"
              :value="listValue.value"
              @change="addParameters(listValue)"
            />
            <h3>{{ listValue.title }}</h3>
          </span>
        </div>
      </div>

      <div v-if="showDate" class="my-6">
        <div
          class="
            flex
            justify-between
            items-center
            text-sm
            border-0 border-b-4 border-gray-200
            text-gray-500
            font-bold
            mb-2
            pb-1
          "
        >
          <h3>DATE</h3>
          <svg
            class="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <div class="pt-2 my-1">
          <label for="">From </label>
          <input
            type="date"
            class="w-full border-2 border-gray-300 text-gray-400"
          />
        </div>
        <div class="pt-2 my-1">
          <label for="">To</label>
          <input
            type="date"
            class="w-full border-2 border-gray-300 text-gray-400"
          />
        </div>
      </div>

      <div v-if="showGases" class="my-6">
        <div
          class="
            flex
            justify-between
            items-center
            text-sm
            border-0 border-b-4 border-gray-200
            text-gray-500
            font-bold
            mb-2
            pb-1
          "
        >
          <h3>Gas Type</h3>
          <svg
            class="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <div class="pt-2 my-1">
          <multiselect
            v-model="gasModel"
            :options="gasesArray"
            label="gas"
            track-by="gasId"
            :multiple="true"
            :class="'w-full border-2 border-gray-300 text-gray-400'"
          />
        </div>
      </div>

      <div v-if="showCustomers" class="my-6">
        <div
          class="
            flex
            justify-between
            items-center
            text-sm
            border-0 border-b-4 border-gray-200
            text-gray-500
            font-bold
            mb-2
            pb-1
          "
        >
          <h3>Customers</h3>
          <svg
            class="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <div class="pt-2 my-1">
          <multiselect
            v-model="customerModel"
            :options="customerArray"
            label="name"
            track-by="value"
            :multiple="true"
            :class="'w-full border-2 border-gray-300 text-gray-400'"
          />
        </div>
      </div>

      <div v-if="showDriver" class="my-6">
        <div
          class="
            flex
            justify-between
            items-center
            text-sm
            border-0 border-b-4 border-gray-200
            text-gray-500
            font-bold
            mb-2
            pb-1
          "
        >
          <h3>Drivers</h3>
          <svg
            class="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <div class="pt-2 my-1">
          <multiselect
            v-model="driverModel"
            :options="driverArray"
            label="name"
            track-by="value"
            :multiple="true"
            :class="'w-full border-2 border-gray-300 text-gray-400 capitalize'"
          />
        </div>
      </div>
    </div>
  </back-drop>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import Multiselect from 'vue-multiselect'
import BackDrop from '@/components/Base/SecondBackDrop.vue'
import { CylinderController } from '@/module/Cylinder'
import { CustomerController } from '@/module/Customer'
import { DriverObject } from '@/module/Driver'

export default defineComponent({
  components: { BackDrop, Multiselect },
  props: {
    filters: {
      type: Object,
      required: true,
    },
    showGases: {
      type: Boolean,
      required: false,
      default: false,
    },
    showCustomers: {
      type: Boolean,
      required: false,
      default: false,
    },
    showDate: {
      type: Boolean,
      required: false,
      default: true,
    },
    showDriver: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(_props, ctx) {
    const close = () => {
      ctx.emit('close')
    }

    const gasesArray = ref<any>([])
    const customerArray = ref<any>([])
    const driverArray = ref<any>([])

    function fetchGases() {
      CylinderController.getCylinders().then((response) => {
        gasesArray.value = response.data.data.cylinders.map((gas: any) => {
          return {
            gas: gas.gasName,
            gasId: gas._id,
          }
        })
      })
    }

    function fetchCustomers() {
      CustomerController.fetchUnPaginatedCustomers().then((response) => {
        customerArray.value = response.map((element: any) => {
          return {
            name: element.name,
            value: element._id,
          }
        })
      })
    }

    const gasModel = ref<string>('')
    const customerModel = ref<string>('')
    const driverModel = ref<string>('')

    onMounted(() => {
      const promiseArray = []

      if (_props.showGases) {
        promiseArray.push(fetchGases())
      }

      if (_props.showCustomers) {
        promiseArray.push(fetchCustomers())
      }

      if (_props.showDriver) {
        promiseArray.push(fetchDrivers())
      }

      if (promiseArray.length) {
        Promise.all(promiseArray)
      }
    })

    const parameters = ref<any>({})

    function addParameters(individualFilter: any) {
      if (individualFilter.type === 'radio') {
        parameters.value[individualFilter.identifier] = [individualFilter.value]
        ctx.emit('filterAdded', parameters.value)
      }
      //  else if (index in parameters.value) {
      //   if (parameters.value[index].includes(value.title)) {
      //     parameters.value[index].pop(value.title)
      //     ctx.emit('filterAdded', parameters.value)
      //   } else {
      //     parameters.value[index].push(value.title)
      //     ctx.emit('filterAdded', parameters.value)
      //   }
      // } else {
      //   parameters.value[index] = [value.title]
      //   ctx.emit('filterAdded', parameters.value)
      // }
    }

    function fetchDrivers() {
      DriverObject.getUnPaginatedDrivers().then((response: any) => {
        const drivers = response
        driverArray.value = drivers.map((driver: any) => {
          return { name: driver.name, value: driver._id }
        })
      })
    }

    return {
      status,
      close,
      addParameters,
      gasModel,
      customerModel,
      gasesArray,
      customerArray,
      driverArray,
      driverModel,
    }
  },
})
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
