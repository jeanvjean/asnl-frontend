<template>
  <div class="flex flex-none items-center space-x-4">
    <div class="flex items-center space-x-2">
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
      <span class="border border-gray-500 w-6 text-center">
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
      <div
        class="flex items-center space-x-2 text-sm font-medium tracking-tight"
      >
        <label for="">Rows Per Page</label>
        <select
          v-model="limit"
          class="pr-8 pl-2 py-2 rounded-sm"
          @change="limitChanged()"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="500">500</option>
        </select>
      </div>
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
    const limit = ref<number>(10)
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

    const limitChanged = () => {
      ctx.emit('limitChanged', limit.value)
    }

    return {
      prev,
      next,
      limit,
      limitChanged,
    }
  },
})
</script>
