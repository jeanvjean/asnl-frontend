<template>
  <div
    class="
      lg:col-span-1
      w-full
      bg-weird-purple
      text-white text-sm
      rounded-lg
      px-6
      py-2
      h-full
      flex flex-col
      justify-between
    "
  >
    <div
      class="flex justify-between items-center border-b-2 border-gray-300 py-2"
    >
      <div>{{ statObject.topTitle }}</div>
      <div class="text-white text-xl">{{ statObject.value }}</div>
    </div>
    <div
      v-if="statObject.subCategories && statObject.subCategories.length"
      :class="`grid grid-rows-1 md:grid-cols-${statObject.subCategories.length} gap-x-3 items-center pt-2`"
    >
      <div v-for="(subCategory, j) in statObject.subCategories" :key="j">
        <div
          class="pb-2 w-full"
          :class="{
            'text-left': isEven(j) === true,
            'text-right': isEven(j) === false,
            'flex justify-between items-center':
              subCategory.subCategories && subCategory.subCategories.length,
            'items-start -mt-12': !subCategory.subCategories,
          }"
        >
          <p>{{ subCategory.title }}</p>
          <p class="text-white text-xl">
            {{ subCategory.value }}
          </p>
        </div>
        <div
          v-if="subCategory.subCategories && subCategory.subCategories.length"
          :class="`flex items-center justify-between border-0 border-t-2 border-white`"
        >
          <div
            v-for="(lowerLevel, k) in subCategory.subCategories"
            :key="k"
            class="py-2"
            :class="{
              'text-left':
                subCategory.subCategories.length <= 2 && isEven(j) === true,
              'text-right':
                subCategory.subCategories.length <= 2 && isEven(j) === false,
            }"
          >
            <div>
              <p class="text-xs">{{ lowerLevel.title }}</p>
              <p class="text-white text-xl pl-1 text-center">
                {{ lowerLevel.value }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { CylinderStat } from '@/constants/variables'

export default defineComponent({
  props: {
    statObject: {
      required: true,
      type: Object as () => CylinderStat,
    },
  },
  setup() {
    const isEven = (i: number) => i % 2 === 0

    return {
      isEven,
    }
  },
})
</script>
