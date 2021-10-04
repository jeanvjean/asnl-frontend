<template>
  <div :key="keyValue" class="px-6 py-6">
    <div class="bg-white w-full h-full rounded-sm">
      <div class="px-6 py-6">
        <div class="mb-4">
          <h1 class="font-medium text-xl text-black">Product Details</h1>
        </div>
        <div class="grid grid-rows-1 lg:grid-cols-4 gap-4">
          <select-component
            :label-title="'Division'"
            :default-option-text="'Choose a Division'"
            :select-array="divisions"
            :init-value="product.division"
          />

          <select-component
            :label-title="'Supplier'"
            :default-option-text="'Choose a Supplier'"
            :select-array="suppliers"
            :init-value="product.supplier"
          />

          <input-component
            :label-title="'Product Name'"
            :input-placeholder="'Enter description'"
            :default-value="product.productName"
          />

          <input-component
            :label-title="'Equipment Model'"
            :input-placeholder="'Enter Equipment Model'"
            :default-value="product.model"
          />

          <input-component
            :label-title="'Equipment Type'"
            :input-placeholder="'Enter Equipment Type'"
            :default-value="product.type"
          />

          <input-component
            :label-title="'ASNL Part Number'"
            :input-placeholder="'#######'"
            :input-type="'number'"
            :default-value="product.asnlNumber"
          />

          <input-component
            :label-title="'Part Number'"
            :input-placeholder="'########'"
            :input-type="'number'"
            :default-value="product.partNo"
          />

          <input-component
            :label-title="'Serial No'"
            :input-placeholder="'Enter Serial Number'"
            :default-value="product.serialNo"
          />

          <input-component
            :label-title="'Quantity'"
            :input-placeholder="'Enter Quantity'"
            :input-type="'number'"
            :default-value="product.quantity"
          />

          <input-component
            :label-title="'Unit Cost'"
            :input-placeholder="'#'"
            :input-type="'number'"
            :default-value="product.unitCost"
          />

          <input-component
            :label-title="'Total Cost'"
            :input-placeholder="'#'"
            :input-type="'number'"
            :default-value="product.totalCost"
          />

          <input-component
            :label-title="'Location'"
            :input-placeholder="'Enter Location'"
            :default-value="product.location"
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
  useRoute,
} from '@nuxtjs/composition-api'
import InputComponent from '@/components/Form/Input.vue'
import SelectComponent from '@/components/Form/Select.vue'
import { ProductObject } from '@/module/Product'
export default defineComponent({
  components: { InputComponent, SelectComponent },
  layout: 'dashboard',
  setup() {
    const route = useRoute()
    const divisions = ref([])
    const suppliers = ref([])
    const product = reactive({
      division: '',
      supplier: '',
      description: '',
      model: '',
      type: '',
      specialization: '',
      asnlNumber: '',
      partNo: '',
      serialNo: '',
      reorderLevel: '',
      unitCost: '',
      totalCost: '',
      quantity: '',
      location: '',
      referrer: '',
      productName: '',
    })

    async function fetchProduct(productId: String) {
      await ProductObject.fetchProduct(productId).then((response) => {
        const productDetail = response.data.data
        product.asnlNumber = String(productDetail.asnlNumber)
        product.productName = String(productDetail.productName)
        product.division = productDetail.branch._id
        product.model = String(productDetail.equipmentModel)
        product.type = String(productDetail.equipmentType)
        product.description = String(productDetail.itemDescription)
        product.location = String(productDetail.location)
        product.partNo = String(productDetail.partNumber)
        product.quantity = String(productDetail.quantity)
        product.referrer = String(productDetail.referer)
        product.reorderLevel = String(productDetail.reorderLevel)
        product.serialNo = String(productDetail.serialNumber)
        // product.supplier = String(productDetail.supplier._id)
        product.totalCost = String(productDetail.totalCost)
        product.unitCost = String(productDetail.unitCost)
        reset()
      })
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
      divisions,
      suppliers,
      product,
    }
  },
})
</script>
