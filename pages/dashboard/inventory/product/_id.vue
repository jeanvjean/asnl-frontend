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
            :default-value="product.description"
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
            :label-title="'Area of Specialization'"
            :input-placeholder="'Enter Area of Specialization'"
            :default-value="product.specialization"
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
            :label-title="'Reorder level'"
            :input-placeholder="'#'"
            :input-type="'number'"
            :default-value="product.reorderLevel"
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
            :label-title="'Quantity'"
            :input-placeholder="'Enter Quantity'"
            :input-type="'number'"
            :default-value="product.quantity"
          />
          <input-component
            :label-title="'Location'"
            :input-placeholder="'Enter Location'"
            :default-value="product.location"
          />
          <input-component
            :label-title="'Referrer'"
            :input-placeholder="'Enter Referrer'"
            :default-value="product.referrer"
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
import { ProductObject } from '@/module/Product'
import { ProductDetail } from '~/types/Types'
export default defineComponent({
  components: { InputComponent, SelectComponent },
  layout: 'dashboard',
  setup() {
    const route = useRoute()
    const divisions = ref([])
    const suppliers = ref([])
    const product = ref<ProductDetail>({
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
    })

    async function fetchProduct(productId: String) {
      await ProductObject.fetchProduct(productId).then((response) => {
        const productDetail = response.data.data
        product.value.specialization = String(
          productDetail.areaOfSpecialization
        )
        product.value.asnlNumber = String(productDetail.asnlNumber)
        product.value.division = productDetail.division
        product.value.model = String(productDetail.equipmentModel)
        product.value.type = String(productDetail.equipmentType)
        product.value.description = String(productDetail.itemDescription)
        product.value.location = String(productDetail.location)
        product.value.partNo = String(productDetail.partNumber)
        product.value.quantity = String(productDetail.quantity)
        product.value.referrer = String(productDetail.referer)
        product.value.reorderLevel = String(productDetail.reorderLevel)
        product.value.serialNo = String(productDetail.serialNumber)
        product.value.supplier = String(productDetail.supplier._id)
        product.value.totalCost = String(productDetail.totalCost)
        product.value.unitCost = String(productDetail.unitCost)
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
