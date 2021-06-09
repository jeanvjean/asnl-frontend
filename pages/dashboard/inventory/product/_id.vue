<template>
  <div :key="keyValue" class="px-6 py-6">
    <div class="bg-white w-full h-full rounded-sm">
      <div class="px-6 py-6">
        <div class="mb-4">
          <h1 class="font-medium text-xl text-black">Create Product</h1>
          <p class="text-gray-600 text-sm">Enter Product details below</p>
        </div>
        <div class="grid grid-rows-1 lg:grid-cols-4 gap-4">
          <select-component
            :label-title="'Division'"
            :default-option-text="'Choose a Division'"
            :select-array="[]"
          />

          <select-component
            :label-title="'Supplier'"
            :default-option-text="'Choose a Supplier'"
            :select-array="[]"
          />

          <input-component
            :label-title="'Item Description'"
            :input-placeholder="'Enter description'"
          />

          <input-component
            :label-title="'Equipment Model'"
            :input-placeholder="'Enter Equipment Model'"
          />

          <input-component
            :label-title="'Equipment Type'"
            :input-placeholder="'Enter Equipment Type'"
          />

          <input-component
            :label-title="'Area of Specialization'"
            :input-placeholder="'Enter Area of Specialization'"
          />

          <input-component
            :label-title="'ASNL Part No'"
            :input-placeholder="'#######'"
            :input-type="'number'"
          />

          <input-component
            :label-title="'Part No'"
            :input-placeholder="'########'"
            :input-type="'number'"
          />

          <input-component
            :label-title="'Serial No'"
            :input-placeholder="'Enter Serial Number'"
          />

          <input-component
            :label-title="'Reorder level'"
            :input-placeholder="'#'"
            :input-type="'number'"
          />

          <input-component
            :label-title="'Unit Cost'"
            :input-placeholder="'#'"
            :input-type="'number'"
          />

          <input-component
            :label-title="'Total Cost'"
            :input-placeholder="'#'"
            :input-type="'number'"
          />

          <input-component
            :label-title="'Quantity'"
            :input-placeholder="'Enter Quantity'"
            :input-type="'number'"
          />
          <input-component
            :label-title="'Location'"
            :input-placeholder="'Enter Location'"
          />
          <input-component
            :label-title="'Referrer'"
            :input-placeholder="'Enter Referrer'"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  useRoute,
} from '@nuxtjs/composition-api'
import InputComponent from '@/components/Form/Input.vue'
import SelectComponent from '@/components/Form/Select.vue'
import { ProductRepository } from '@/module/Product'
export default defineComponent({
  components: { InputComponent, SelectComponent },
  layout: 'dashboard',
  setup() {
    const route = useRoute()
    const productObj = new ProductRepository()

    async function fetchProduct(productId: String) {
      await productObj.fetchProduct(productId).then((response) => {
        console.log(response)
      })
    }

    onMounted(() => {
      fetchProduct(route.value.params.id)
    })

    const reset = () => {
      keyValue.value++
    }
    const keyValue = ref(1)
    return {
      keyValue,
      reset,
    }
  },
})
</script>
