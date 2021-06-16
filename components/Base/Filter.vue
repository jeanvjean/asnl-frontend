<template>
  <div class="flex flex-initial items-center space-x-3 py-1 h-full">
    <h1 class="font-medium text-black text-sm h-full">Filter By</h1>
    <div
      class="
        flex
        items-center
        border-2 border-gray-300
        justify-around
        space-x-4
        text-gray-500
        rounded-sm
        h-full
      "
    >
      <svg
        class="w-4 h-4 ml-2 fill-current font-medium filterTransform"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M17 16v4h-2v-4h-2v-3h6v3h-2zM1 9h6v3H1V9zm6-4h6v3H7V5zM3 0h2v8H3V0zm12 0h2v12h-2V0zM9 0h2v4H9V0zM3 12h2v8H3v-8zm6-4h2v12H9V8z"
        />
      </svg>
      <select
        class="
          border-l-2
          px-8
          border-0 border-gray-300
          appearance-none
          outline-none
        "
      >
        <option value="">All</option>
      </select>
    </div>
  </div>
</template>
<style scoped>
.filterTransform {
  transform: rotate(90deg);
}
</style>
