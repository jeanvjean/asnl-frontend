<template>
  <div
    class="
      w-full
      overflow-x-hidden
      fixed
      inset-0
      h-full
      bg-white
      flex
      customFontLight
    "
  >
    <div class="hidden md:block w-1/3 lg:w-1/4 bg-btn-purple h-full">
      <div class="cd h-full flex items-center justify-center">
        <h1 class="text-white text-4xl font-semibold customFontRegular">
          Air Separation
        </h1>
      </div>
    </div>
    <div
      class="
        w-full
        sm:w-full
        md:w-2/3
        lg:w-3/4
        h-full
        flex
        justify-center
        items-center
        px-2
        pt-4
      "
    >
      <Nuxt />
    </div>
  </div>
</template>

<style>
.customFontRegular {
  font-family: 'tt_normsregular';
}

.customFontLight {
  font-family: 'tt_normslight';
}

.customFontBold {
  font-family: 'tt_normsbold';
}
</style>
