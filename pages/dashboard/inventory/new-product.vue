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
            :select-array="divisions"
            @get="form.division = $event.value"
          />

          <select-component
            :label-title="'Supplier'"
            :default-option-text="'Choose a Supplier'"
            :select-array="suppliers"
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
            :button-class="'py-2 bg-btn-purple text-white rounded-sm'"
            :loading-status="loading"
            @buttonClicked="createProduct"
          />
          <button-component
            :button-text="'Cancel'"
            :button-class="'py-2 bg-white text-btn-purple border border-btn-purple rounded-sm'"
            @buttonClicked="goBack()"
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
  useRouter,
} from '@nuxtjs/composition-api'
import InputComponent from '@/components/Form/Input.vue'
import SelectComponent from '@/components/Form/Select.vue'
import ButtonComponent from '@/components/Form/Button.vue'
import { ProductObject } from '@/module/Product'
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

    const loading = ref(false)
    const divisions = ref([])
    const suppliers = ref([])
    const router = useRouter()

    function valuesNotEmpty(obj: Object) {
      return Object.values(obj).every(
        (element) => element !== null && element !== ''
      )
    }

    function fetchBranches() {
      ProductObject.fetchBranches().then((response) => {
        divisions.value = response.map((element: any) => {
          return {
            name: element.location,
            value: element._id,
          }
        })
      })
    }
    const goBack = () => {
      router.go(-1)
    }

    function fetchSuppliers() {
      ProductObject.fetchSuppliers(1).then((response: any) => {
        suppliers.value = response.docs.map((element: any) => {
          return {
            name: element.name,
            value: element._id,
          }
        })
      })
    }

    onMounted(() => {
      fetchBranches()
      fetchSuppliers()
    })

    const createProduct = () => {
      if (valuesNotEmpty(form)) {
        loading.value = true
        ProductObject.createProduct(form)
          .then(() => {
            reset()
            goBack()
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
      suppliers,
      goBack,
    }
  },
})
</script>
