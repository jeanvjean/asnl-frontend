<template>
  <div class="bg-dark-blue px-6 py-6 rounded-sm relative">
    <transition :name="transitionAnimation" mode="out-in">
      <div :key="currentIndex">
        <div
          class="
            grid grid-rows-1
            lg:grid-cols-3
            gap-y-4 gap-x-0
            md:gap-y-0 md:gap-x-8
          "
        >
          <span
            v-for="(stat, index) in analytics[currentIndex]"
            :key="index"
            class="inline-block"
          >
            <card :stat-object="stat"> </card>
          </span>
        </div>
      </div>
    </transition>
    <div class="absolute flex justify-between items-center w-full inset-y-1/2">
      <div
        :class="currentIndex === 0 ? 'invisible' : ' visible'"
        class="
          flex
          justify-center
          items-center
          w-8
          h-8
          rounded-full
          bg-dark-blue
          -ml-10
        "
      >
        <svg
          class="w-6 h-6 fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          @click="prevSlide"
        >
          <path
            d="M0 10a10 10 0 1120 0 10 10 0 01-20 0zm10 8a8 8 0 100-16 8 8 0 000 16zm.7-10.54L14.25 11l-1.41 1.41L10 9.6l-2.83 2.8L5.76 11 10 6.76l.7.7z"
          />
        </svg>
      </div>
      <div
        :class="
          currentIndex === analytics.length - 1 ? 'invisible' : ' visible'
        "
        class="
          flex
          justify-center
          items-center
          w-8
          h-8
          rounded-full
          bg-dark-blue
          mr-3
        "
      >
        <svg
          class="w-6 h-6 fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          @click="nextSlide"
        >
          <path
            d="M20 10a10 10 0 11-20 0 10 10 0 0120 0zM10 2a8 8 0 100 16 8 8 0 000-16zm-.7 10.54L5.75 9l1.41-1.41L10 10.4l2.83-2.82L14.24 9 10 13.24l-.7-.7z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import Card from '@/components/Base/Card.vue'

export default defineComponent({
  components: { Card },
  props: {
    analytics: {
      type: Array,
      required: true,
    },
  },
  setup(_props) {
    const currentIndex = ref(0)
    const transitionAnimation = ref()

    const prevSlide = () => {
      transitionAnimation.value = 'fade-in-up'

      if (currentIndex.value === 0) {
        currentIndex.value = _props.analytics.length - 1
      } else {
        currentIndex.value -= 1
      }
    }
    const nextSlide = () => {
      transitionAnimation.value = 'fade-in-down'
      if (currentIndex.value === _props.analytics.length - 1) {
        currentIndex.value = 0
      } else {
        currentIndex.value += 1
      }
    }

    return {
      nextSlide,
      prevSlide,
      currentIndex,
      transitionAnimation,
    }
  },
})
</script>
