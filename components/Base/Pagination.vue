<template>
  <div class="flex items-center space-x-4">
    <div class="flex items-center space-x-4">
      <span class="text-sm text-btn-purple">Page</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        class="
          w-6
          h-6
          fill-current
          text-gray-500
          font-semibold
          focus:text-purple-600
          cursor-pointer
        "
        @click="prev"
      >
        <path
          fill-rule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
      <span class="px-2 border border-gray-500 w-8 text-center">
        <span>{{ $props.paginationDetails.currentPage }}</span>
      </span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        class="
          w-6
          h-6
          fill-current
          text-gray-500
          font-semibold
          focus:text-purple-600
          cursor-pointer
        "
        @click="next"
      >
        <path
          fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        />
      </svg>
      <!-- <button
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
      </button> -->
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    paginationDetails: {
      type: Object,
      required: true,
    },
  },
  setup(_props, ctx) {
    const context = useContext()
    const nextPage = ref<number>()
    const prev = () => {
      if (_props.paginationDetails.hasPrevPage) {
        nextPage.value = _props.paginationDetails.currentPage - 1
        ctx.emit('prev', nextPage)
      } else {
        context.$toast.info('First Page')
      }
    }

    const next = () => {
      if (_props.paginationDetails.hasNextPage) {
        nextPage.value = _props.paginationDetails.currentPage + 1
        ctx.emit('next', nextPage)
      } else {
        context.$toast.info('Last Page')
      }
    }

    return {
      prev,
      next,
    }
  },
})
</script>
