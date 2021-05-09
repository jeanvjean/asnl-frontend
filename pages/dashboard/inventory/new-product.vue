<template>
  <div :key="keyValue" class="px-6 py-6">
    <div class="bg-white w-full h-full rounded-md">
      <div class="px-6 py-6">
        <div class="mb-4">
          <h1 class="font-medium text-xl text-black">Create Product</h1>
          <p class="text-gray-600 text-sm">Enter Product details below</p>
        </div>
        <div class="grid grid-rows-1 lg:grid-cols-4 gap-4">
          <select-component
            :label-title="'Division'"
            :default-option-text="'Choose a Division'"
            :select-array="divisions"
            @get="form.division = $event.value"
          />

          <input-component
            :label-title="'Supplier'"
            :input-placeholder="'Enter Supplier'"
            @get="form.supplier = $event.value"
          />

          <input-component
            :label-title="'Item Description'"
            :input-placeholder="'Enter description'"
            @get="form.itemDescription = $event.value"
          />

          <input-component
            :label-title="'Equipment Model'"
            :input-placeholder="'Enter Equipment Model'"
            @get="form.equipmentModel = $event.value"
          />

          <input-component
            :label-title="'Equipment Type'"
            :input-placeholder="'Enter Equipment Type'"
            @get="form.equipmentType = $event.value"
          />

          <input-component
            :label-title="'Area of Specialization'"
            :input-placeholder="'Enter Area of Specialization'"
            @get="form.areaOfSpecialization = $event.value"
          />

          <input-component
            :label-title="'ASNL Part No'"
            :input-placeholder="'#######'"
            :input-type="'number'"
            @get="form.asnlNumber = $event.value"
          />

          <input-component
            :label-title="'Part No'"
            :input-placeholder="'########'"
            :input-type="'number'"
            @get="form.partNumber = $event.value"
          />

          <input-component
            :label-title="'Serial No'"
            :input-placeholder="'Enter Serial Number'"
            @get="form.partNumber = $event.value"
          />

          <input-component
            :label-title="'Reorder level'"
            :input-placeholder="'#'"
            :input-type="'number'"
            @get="form.reorderLevel = $event.value"
          />

          <input-component
            :label-title="'Unit Cost'"
            :input-placeholder="'#'"
            :input-type="'number'"
            @get="form.unitCost = $event.value"
          />

          <input-component
            :label-title="'Total Cost'"
            :input-placeholder="'#'"
            :input-type="'number'"
            @get="form.totalCost = $event.value"
          />

          <input-component
            :label-title="'Quantity'"
            :input-placeholder="'Enter Quantity'"
            :input-type="'number'"
            @get="form.quantity = $event.value"
          />
          <input-component
            :label-title="'Location'"
            :input-placeholder="'Enter Location'"
            @get="form.location = $event.value"
          />
          <input-component
            :label-title="'Referrer'"
            :input-placeholder="'Enter Referrer'"
            @get="form.referer = $event.value"
          />
        </div>
        <div class="lg:flex w-full lg:space-x-4 lg:w-2/5">
          <button-component
            :button-text="'Create Product'"
            :button-class="'py-2 bg-purple-500 text-white rounded'"
            :loading-status="loading"
            @buttonClicked="createProduct"
          />
          <button-component
            :button-text="'Cancel'"
            :button-class="'py-2 bg-white text-purple-500 border border-purple-500 rounded'"
            @buttonClicked="reset"
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
  reactive,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import InputComponent from '@/components/Form/Input.vue'
import SelectComponent from '@/components/Form/Select.vue'
import ButtonComponent from '@/components/Form/Button.vue'
import { ProductRepository } from '@/module/Product'
export default defineComponent({
  components: { InputComponent, ButtonComponent, SelectComponent },
  layout: 'dashboard',
  setup() {
    const form = reactive({
      itemDescription: '',
      equipmentModel: '',
      equipmentType: '',
      areaOfSpecialization: '',
      asnlNumber: '',
      partNumber: '',
      serialNumber: '1',
      quantity: '',
      unitCost: '',
      totalCost: '',
      reorderLevel: '',
      location: '',
      referer: '',
      division: '',
      supplier: '',
    })
    const context = useContext()
    const productObj = new ProductRepository()
    const loading = ref(false)
    const divisions = ref([])

    function valuesNotEmpty(obj: Object) {
      return Object.values(obj).every(
        (element) => element !== null && element !== ''
      )
    }

    function fetchBranches() {
      productObj.fetchBranches().then((response) => {
        divisions.value = response.map((element: any) => {
          return {
            name: element.location,
            value: element._id,
          }
        })
      })
    }

    onMounted(() => {
      fetchBranches()
    })

    const createProduct = () => {
      if (valuesNotEmpty(form)) {
        loading.value = true
        productObj
          .createProduct(form)
          .then(() => {
            reset()
          })
          .finally(() => {
            loading.value = false
          })
      } else {
        context.$toast.global.required()
      }
    }

    const reset = () => {
      keyValue.value++
    }
    const keyValue = ref(1)
    return {
      form,
      keyValue,
      reset,
      createProduct,
      loading,
      divisions,
    }
  },
})
</script>
