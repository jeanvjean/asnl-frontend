<template>
  <div class="py-6 px-6">
    <h1>Create Report</h1>

    <div
      class="bg-white flex flex-col lg:flex-row justify-center items-center w-full h-96 px-4 py-4 space-y-4 lg:space-y-0 lg:space-x-8 mt-4"
    >
      <div>
        <button class="border-2 border-gray-200 px-10 py-12 rounded-sm-md">
          <svg
            class="w-8 h-8 fill-current text-gray-600 mx-auto"
            viewBox="0 0 30 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.7492 19.8003H11.2492C10.2124 19.8003 9.37424 20.6067 9.37424 21.6003C9.37424 22.5939 10.2124 23.4003 11.2492 23.4003H18.7492C19.7861 23.4003 20.6242 22.5939 20.6242 21.6003C20.6242 20.6067 19.7861 19.8003 18.7492 19.8003ZM25.2078 32.4001H4.79088C4.21713 32.4001 3.75025 31.9969 3.75025 31.5001V4.5001C3.75025 4.0033 4.21713 3.6001 4.79088 3.6001H15.0003V9.2701C15.0003 12.0997 17.2821 14.4001 20.089 14.4001H26.2503V31.5001C26.2503 31.9969 25.7834 32.4001 25.2078 32.4001ZM18.7496 5.36084L23.8908 10.8004H20.0883C19.3496 10.8004 18.7496 10.1146 18.7496 9.27044V5.36084ZM29.5125 11.3904L19.305 0.5904C18.9487 0.2142 18.4463 0 17.9156 0H4.79063C2.14875 0 0 2.0196 0 4.5V31.5C0 33.9804 2.14875 36 4.79063 36H25.2075C27.8494 36 30 33.9804 30 31.5V12.6C30 12.1518 29.8256 11.7216 29.5125 11.3904Z"
              fill="#7D829C"
            />
          </svg>
          <span class="text-sm font-medium text-gray-800 mt-4 block"
            >Inventory Management
          </span>
        </button>
      </div>
      <div>
        <button class="border-2 border-gray-200 px-10 py-12 rounded-sm-md">
          <svg
            class="w-8 h-8 fill-current text-gray-600 mx-auto"
            viewBox="0 0 30 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.7492 19.8003H11.2492C10.2124 19.8003 9.37424 20.6067 9.37424 21.6003C9.37424 22.5939 10.2124 23.4003 11.2492 23.4003H18.7492C19.7861 23.4003 20.6242 22.5939 20.6242 21.6003C20.6242 20.6067 19.7861 19.8003 18.7492 19.8003ZM25.2078 32.4001H4.79088C4.21713 32.4001 3.75025 31.9969 3.75025 31.5001V4.5001C3.75025 4.0033 4.21713 3.6001 4.79088 3.6001H15.0003V9.2701C15.0003 12.0997 17.2821 14.4001 20.089 14.4001H26.2503V31.5001C26.2503 31.9969 25.7834 32.4001 25.2078 32.4001ZM18.7496 5.36084L23.8908 10.8004H20.0883C19.3496 10.8004 18.7496 10.1146 18.7496 9.27044V5.36084ZM29.5125 11.3904L19.305 0.5904C18.9487 0.2142 18.4463 0 17.9156 0H4.79063C2.14875 0 0 2.0196 0 4.5V31.5C0 33.9804 2.14875 36 4.79063 36H25.2075C27.8494 36 30 33.9804 30 31.5V12.6C30 12.1518 29.8256 11.7216 29.5125 11.3904Z"
              fill="#7D829C"
            />
          </svg>
          <span class="text-sm font-medium text-gray-800 mt-4 block"
            >Cylinder Management
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CreateReport',
  layout: 'dashboard',
})
</script>
