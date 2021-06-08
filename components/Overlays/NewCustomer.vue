<template>
  <back-drop :centralize="false">
    <div
      class="
        w-full
        sm:w-full
        md:w-1/2
        bg-white
        py-4
        px-8
        rounded-sm-md
        overflow-y-auto
      "
    >
      <div class="flex justify-between items-center my-2">
        <div>
          <p class="text-xl font-medium">Add New Customer</p>
          <p class="font-light text-sm text-gray-500">
            Enter Customer Details below.
          </p>
        </div>
        <svg
          class="w-6 h-6 fill-current text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          @click="close"
        >
          <path
            d="M2.93 17.07A10 10 0 1117.07 2.93 10 10 0 012.93 17.07zM11.4 10l2.83-2.83-1.41-1.41L10 8.59 7.17 5.76 5.76 7.17 8.59 10l-2.83 2.83 1.41 1.41L10 11.41l2.83 2.83 1.41-1.41L11.41 10z"
          />
        </svg>
      </div>
      <div class="grid grid-rows-1 md:grid-cols-2 gap-x-4">
        <select-component
          :label-title="'Customer Type'"
          :select-array="[]"
          :default-option-text="'Select a Customer Type'"
        />
        <input-component
          :label-title="'Mode of Service'"
          :input-placeholder="'Enter Mode of Service'"
        />

        <input-component
          :label-title="'Customer Name'"
          :input-placeholder="'Enter Customer Name'"
        />

        <input-component
          :label-title="'Nick Name'"
          :input-placeholder="'Enter Nick Name'"
        />

        <input-component
          :label-title="'Address'"
          :input-placeholder="'Enter Customer Address'"
        />

        <input-component
          :label-title="'Name of Contact Person'"
          :input-placeholder="'Enter Name of Contact Person'"
        />

        <input-component
          :label-title="'Email Address'"
          :input-placeholder="'Enter Email Address'"
        />

        <input-component
          :label-title="'Tax I.D Number (Optional)'"
          :default-option-text="'Enter Tax I.D Number (Optional)'"
        />

        <input-component
          :label-title="'Phone Number'"
          :input-placeholder="'Enter Phone Number'"
        />

        <input-component
          :label-title="'R.C Number (Optional)'"
          :input-placeholder="'Enter R.C Number (Optional)'"
        />

        <input-component
          :label-title="'Cylinder Holding Time'"
          :input-placeholder="'Enter Cylinder Holding Time'"
        />

        <input-component
          :label-title="'Territory'"
          :input-placeholder="'Enter Cylinder Holding Time'"
        />

        <input-component
          :label-title="'Upload CAC Document'"
          :input-type="'file'"
          :input-placeholder="'CAC (Companies)'"
        />

        <input-component
          :label-title="'Valid ID'"
          :input-type="'file'"
          :input-placeholder="'Valid ID (Individual)'"
        />
      </div>

      <div
        class="
          border-t border-b-0 border-l-0 border-r-0
          pt-3
          my-2
          border-2 border-gray-300
          flex
          justify-between
          items-center
          px-3
        "
      >
        <h4>Products Section</h4>
        <button
          class="
            flex
            justify-center
            items-center
            bg-btn-purple
            text-white
            px-4
            py-2
            rounded-sm
          "
          @click="count++"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            /></svg
          ><span class="text-white">Add Product</span>
        </button>
      </div>
      <div
        v-for="i in count"
        :key="i"
        class="grid grid-rows-1 md:grid-cols-2 gap-x-4"
      >
        <select-component
          :label-title="'Products'"
          :select-array="[]"
          :default-option-text="'Select a Product'"
        />
        <input-component
          :label-title="'Unit Price'"
          :input-placeholder="'Enter Unit of Price'"
        />
      </div>

      <button
        class="
          rounded-sm-md
          mt-4
          px-8
          py-3
          border border-blue-300
          text-md
          font-semibold
          flex
          justify-between
          bg-blue-500
          text-white
        "
      >
        Add Customer
      </button>
    </div>
  </back-drop>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import BackDrop from '@/components/Base/Backdrop.vue'
import InputComponent from '@/components/Form/Input.vue'
import SelectComponent from '@/components/Form/Select.vue'
export default defineComponent({
  components: { BackDrop, InputComponent, SelectComponent },
  setup(_props, ctx) {
    const close = () => {
      ctx.emit('close')
    }

    const count = ref<number>(0)

    return {
      close,
      count,
    }
  },
})
</script>
