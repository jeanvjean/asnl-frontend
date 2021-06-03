<template>
  <back-drop>
    <div class="w-full h-full bg-gray-100 relative pt-8 px-6 overflow-y-auto">
      <svg
        class="w-6 h-6 fill-current text-gray-400 absolute top-0 right-0 mr-10 mt-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        @click="close"
      >
        <path
          d="M2.93 17.07A10 10 0 1117.07 2.93 10 10 0 012.93 17.07zM11.4 10l2.83-2.83-1.41-1.41L10 8.59 7.17 5.76 5.76 7.17 8.59 10l-2.83 2.83 1.41 1.41L10 11.41l2.83 2.83 1.41-1.41L11.41 10z"
        />
      </svg>

      <section class="w-full bg-white px-6 py-4 my-6">
        <div
          v-for="(profileDetail, index) in profile"
          :key="index"
          class="w-full grid grid-cols-3 gap-x-6 items-center py-3.5"
          :class="index % 2 == 1 ? ' bg-transparent' : ' bg-indigo-100'"
        >
          <div class="col-span-1 text-right font-semibold text-md">
            {{ profileDetail.title }}:
          </div>
          <div class="col-span-2">{{ profileDetail.value }}</div>
        </div>
        <div class="w-full items-center py-3.5 bg-indigo-100 my-4">
          <div class="flex justify-between items-center px-4 py-2 font-medium">
            <button
              class="focus:outline-none focus:border focus:border-0 focus:border-purple-500"
            >
              Cylinder 1
            </button>
            <button class="focus:outline-none focus:border-purple-500">
              Cylinder 2
            </button>
            <button class="focus:outline-none focus:border-purple-500">
              Cylinder 3
            </button>
            <button class="focus:outline-none focus:border-purple-500">
              Cylinder 4
            </button>
            <button class="focus:outline-none text-purple-500">View All</button>
          </div>
          <div
            v-for="(profileDetail, index) in inner"
            :key="index"
            class="w-full grid grid-cols-3 gap-x-6 items-center py-3.5"
            :class="index % 2 == 1 ? ' bg-transparent' : ' bg-indigo-100'"
          >
            <div class="col-span-1 text-right font-semibold text-md">
              {{ profileDetail.title }}:
            </div>
            <div class="col-span-2">{{ profileDetail.value }}</div>
          </div>
        </div>
        <div
          v-for="(profileDetail, index) in end"
          :key="index"
          class="w-full grid grid-cols-3 gap-x-6 items-center py-3.5"
          :class="index % 2 == 1 ? ' bg-transparent' : ' bg-indigo-100'"
        >
          <div class="col-span-1 text-right font-semibold text-md">
            {{ profileDetail.title }}:
          </div>
          <div class="col-span-2">{{ profileDetail.value }}</div>
        </div>
        <div class="px-4 py-2">
          <h2>Scan all Cylinder</h2>
          <button class="px-6 py-2 bg-purple-600 text-white font-semibold">
            Schedule for Production
          </button>
        </div>
      </section>
    </div>
  </back-drop>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BackDrop from '@/components/Base/SecondBackDrop.vue'

export default defineComponent({
  components: {
    BackDrop,
  },
  setup(_props, ctx) {
    const close = () => {
      ctx.emit('close')
    }

    const inner = [
      {
        title: 'Cylinder No',
        value: '232323',
      },
      {
        title: 'Cylinder Type',
        value: '#2424231',
      },
      {
        title: 'Gas Type',
        value: 'Oxygen',
      },
    ]

    const profile = [
      {
        title: 'Customer Name',
        value: 'Luth Martha',
      },
      {
        title: 'Order Type',
        value: '#2424231',
      },
      {
        title: 'ECR Nos',
        value: '3434231',
      },
      {
        title: 'ICN Nos',
        value: '34342432',
      },
      {
        title: 'Gas Type',
        value: 'Oxygen',
      },
      {
        title: 'Mode of Service',
        value: 'Walk in Customer',
      },
      {
        title: 'Date and Time',
        value: '23rd Sept, 2020.',
      },
      {
        title: 'Customer Type',
        value: 'Premium',
      },
      {
        title: 'Serial Nos',
        value: 'Premium',
      },
    ]

    const end = [
      {
        title: 'Total Volume',
        value: 'Premium',
      },
      {
        title: 'Total Volume',
        value: 'Premium',
      },
      {
        title: 'Total Quantity',
        value: 'Premium',
      },
      {
        title: 'Recieved by',
        value: 'Premium',
      },
      {
        title: 'Security',
        value: 'Premium',
      },
      {
        title: 'Drive',
        value: 'Premium',
      },
    ]

    return {
      close,
      profile,
      inner,
      end,
    }
  },
})
</script>

<style scoped>
.action-menu {
  display: none;
}
.icon-button:hover > .action-menu {
  display: block;
}
.icon-button:focus > .action-menu {
  display: block;
}
</style>
