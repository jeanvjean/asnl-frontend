<template>
  <div :key="componentKey" class="px-6 py-6">
    <div class="bg-white w-full h-full rounded-sm">
      <div class="px-6 py-6">
        <div class="mb-4">
          <h1 class="font-medium text-xl text-black">Create Product</h1>
          <p class="text-gray-600 text-sm">Enter Product details below</p>
        </div>
        <form autocomplete="off" @submit.prevent="createProduct">
          <div class="grid grid-rows-1 lg:grid-cols-4 gap-4">
            <select-component
              :label-title="'Division'"
              :default-option-text="'Choose a Division'"
              :select-array="divisions"
              :init-value="form.division"
              @get="form.division = $event.value"
            />

            <select-component
              :label-title="'Supplier'"
              :default-option-text="'Choose a Supplier'"
              :select-array="suppliers"
              :init-value="form.supplier"
              @get="form.supplier = $event.value"
            />

            <input-component
              :label-title="'Product Name'"
              :input-placeholder="'Enter Product Name'"
              :default-value="form.productName"
              @get="form.productName = $event.value"
            />

            <input-component
              :label-title="'Equipment Model'"
              :input-placeholder="'Enter Equipment Model'"
              :default-value="form.equipmentModel"
              :is-required="false"
              @get="form.equipmentModel = $event.value"
            />

            <input-component
              :label-title="'Equipment Type'"
              :input-placeholder="'Enter Equipment Type'"
              :default-value="form.equipmentType"
              :is-required="false"
              @get="form.equipmentType = $event.value"
            />

            <input-component
              :label-title="'ASNL Number'"
              :input-placeholder="'#######'"
              :default-value="form.asnlNumber"
              @get="form.asnlNumber = $event.value"
            />

            <input-component
              :label-title="'Part Number'"
              :input-placeholder="'########'"
              :default-value="form.partNumber"
              @get="form.partNumber = $event.value"
            />

            <input-component
              :label-title="'Reorder level'"
              :input-placeholder="'#'"
              :input-type="'number'"
              :default-value="form.reorderLevel"
              @get="form.reorderLevel = $event.value"
            />

            <input-component
              :label-title="'Quantity'"
              :input-placeholder="'Enter Quantity'"
              :input-type="'number'"
              :default-value="form.quantity"
              @get="
                ;(form.quantity = $event.value),
                  (form.totalCost = String(form.quantity * form.unitCost)),
                  reset()
              "
            />

            <input-component
              :label-title="'Unit Cost'"
              :input-placeholder="'#'"
              :input-type="'number'"
              :default-value="form.unitCost"
              @get="
                ;(form.unitCost = $event.value),
                  (form.totalCost = String(form.quantity * form.unitCost)),
                  reset()
              "
            />

            <input-component
              :label-title="'Total Cost'"
              :input-placeholder="'#'"
              :input-type="'number'"
              :is-disabled="true"
              :default-value="form.totalCost"
              @get="form.totalCost = $event.value"
            />

            <input-component
              :label-title="'Location'"
              :input-placeholder="'Enter Location'"
              :default-value="form.location"
              @get="form.location = $event.value"
            />
          </div>
          <div class="lg:flex w-full lg:space-x-4 lg:w-2/5 mt-4">
            <button-component
              :button-text="'Create Product'"
              :button-class="'py-2 bg-btn-purple text-white rounded-sm'"
              :loading-status="loading"
            />
            <button-component
              :button-text="'Cancel'"
              :button-class="'py-2 bg-white text-btn-purple border border-btn-purple rounded-sm'"
              @buttonClicked="goBack()"
            />
          </div>
        </form>
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
import Validator from 'validatorjs'
import InputComponent from '@/components/Form/Input.vue'
import SelectComponent from '@/components/Form/Select.vue'
import ButtonComponent from '@/components/Form/Button.vue'
import { ProductObject } from '@/module/Product'
import { ValidatorObject } from '@/module/Validation'
export default defineComponent({
  components: { InputComponent, ButtonComponent, SelectComponent },
  layout: 'dashboard',
  setup() {
    const form = reactive({
      equipmentModel: '',
      equipmentType: '',
      asnlNumber: '',
      partNumber: '',
      quantity: '1',
      unitCost: '1',
      totalCost: '1',
      reorderLevel: '',
      location: '',
      division: '',
      supplier: '',
      productName: '',
    })
    const context = useContext()

    const loading = ref(false)
    const divisions = ref([])
    const suppliers = ref([])
    const router = useRouter()

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
      const rules = {
        equipmentModel: 'string',
        equipmentType: 'string',
        asnlNumber: 'required|string',
        partNumber: 'required|string',
        quantity: 'required|numeric|min:1',
        unitCost: 'required|numeric|min:0',
        totalCost: 'required|numeric',
        reorderLevel: 'numeric',
        location: 'required|string',
        division: 'required|string',
        supplier: 'required|string',
        productName: 'required|string',
      }

      const validation = new Validator(form, rules)
      if (validation.fails()) {
        let messages: string[] = []
        messages = ValidatorObject.getMessages(validation.errors)
        messages.forEach((error: string) => {
          context.$toast.error(error)
        })
      } else {
        loading.value = true
        ProductObject.createProduct(form)
          .then(() => {
            reset()
            goBack()
          })
          .finally(() => {
            loading.value = false
          })
      }
    }

    const reset = () => {
      componentKey.value++
    }
    const componentKey = ref(1)
    return {
      form,
      componentKey,
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
