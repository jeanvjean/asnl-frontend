<template>
  <back-drop>
    <div class="w-full h-full bg-gray-100 relative pt-8 px-6 overflow-y-auto">
      <svg
        class="
          w-6
          h-6
          fill-current
          text-gray-400
          absolute
          top-0
          right-0
          mr-10
          mt-5
        "
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
          v-for="(content, index) in profile"
          :key="index"
          class="w-full grid grid-cols-2 gap-x-6 items-center py-3.5"
          :class="index % 2 == 1 ? ' bg-transparent' : ' bg-indigo-100'"
        >
          <div class="col-span-1 text-right font-semibold text-md capitalize">
            {{ content.title }}
          </div>
          <div class="col-span-1">
            {{ content.value }}
          </div>
        </div>

        <div class="w-full overflow-x-auto bg-indigo-100 my-4 py-2 px-2">
          <h2 class="uppercase text-base font-semibold">Cylinders</h2>
          <table class="table table-auto w-full border-collapse">
            <thead>
              <tr>
                <th class="border border-black">S/N</th>
                <th class="border border-black">Cylinder Number</th>
                <th class="border border-black">Cylinder Size</th>
                <th class="border border-black">Cylinder Type</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(external, i) in ecr.fringeCylindersArray"
                :key="i + getRandomValue()"
              >
                <td class="text-center">{{ i + 1 }}</td>
                <td class="text-center py-2">{{ external.cylinderNo }}</td>
                <td class="text-center py-2">{{ external.cylinderSize }}</td>
                <td class="text-center py-2">External</td>
              </tr>
              <tr
                v-for="(internal, j) in ecr.asnlCylindersArray"
                :key="j + getRandomValue()"
              >
                <td class="text-center">{{ j + 1 }}</td>
                <td class="text-center py-2">{{ internal.cylinderNumber }}</td>
                <td class="text-center py-2">
                  {{ internal.gasVolumeContent.value }}
                </td>
                <td class="text-center py-2">ASNL Cylinder</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="px-0 py-2">
          <router-link
            :to="`/dashboard/production/schedule/${ecr._id}`"
            class="
              px-6
              py-2
              bg-btn-purple
              text-white
              font-semibold
              rounded-sm
              block
              md:inline
              text-center
            "
          >
            Production Schedule
          </router-link>

          <router-link
            :to="`/dashboard/purchase-orders/purchase-order/${ecr._id}`"
            class="
              px-6
              md:ml-2
              py-2
              bg-btn-purple
              text-white
              font-semibold
              rounded-sm
              block
              md:inline
              mt-2
              md:mt-0
              text-center
            "
          >
            Purchase Order
          </router-link>
        </div>
      </section>
    </div>
  </back-drop>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import BackDrop from '@/components/Base/SecondBackDrop.vue'
import { getRandomValue } from '@/constants/utils'
export default defineComponent({
  components: {
    BackDrop,
  },
  props: {
    ecr: {
      type: Object,
      required: true,
    },
  },
  setup(_props, ctx) {
    const close = () => {
      ctx.emit('close')
    }
    const profile = [
      { title: 'customer', value: _props.ecr.customer },
      { title: 'ecr number', value: _props.ecr.ercNo },
      { title: 'Date', value: _props.ecr.createdAt },
      { title: 'Company Cylinders', value: _props.ecr.asnlCylinders },
      { title: 'ASNL Cylinders', value: _props.ecr.companyCylinders },
      { title: 'Type', value: _props.ecr.type },
    ]
    return {
      close,
      profile,
      getRandomValue,
    }
  },
})
</script>