<template>
  <div :key="componentKey" class="w-full md:w-10/12 lg:w-8/12 md:mx-auto mt-10">
    <div class="bg-white px-6 md:px-10 py-6">
      <div class="float-right">
        <div class="flex space-x-4 items-center">
          <span>{{ new Date().toDateString() }}</span
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            class="fill-current w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
      <form autocomplete="off" method="POST" @submit.prevent="submit">
        <div
          class="
            flex
            items-center
            justify-between
            mt-10
            divide-x-2 divide-gray-300
          "
        >
          <div
            class="
              w-full
              justify-between
              items-center
              grid grid-rows-1
              md:grid-cols-2 md:gap-x-2
            "
          >
            <select-component
              :label-title="'Branch'"
              :default-option-text="'Select Branch'"
              :select-array="branchesArray"
              :init-value="form.fromBranch"
              @get="form.fromBranch = $event.value"
            />
            <select-component
              :label-title="'Gas Type'"
              :default-option-text="'Select Gas Type'"
              :select-array="gasTypes"
              :init-value="form.gasType"
              @get="form.gasType = $event.value"
            />
          </div>
        </div>

        <div class="w-full overflow-x-auto mt-10 mb-5">
          <table class="table w-full border-collapse text-gray-500">
            <thead>
              <tr>
                <th class="w-auto text-center"></th>
                <th class="w-6/12 border border-black">Cylinder No</th>
                <th class="w-5/12 border border-black">Volume</th>
                <th class="w-auto"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cylinder, i) in form.cylinders" :key="i">
                <td class="text-center">{{ i + 1 }}</td>
                <td>
                  <select-component
                    :input-placeholder="'Enter Cylinder No'"
                    :init-value="cylinder.cylinderNo"
                    :select-array="cylinderArray"
                    :default-option-text="'Select Cylinder'"
                    @get="cylinder.cylinderNo = $event.value"
                  />
                </td>
                <td>
                  <input-component
                    :input-placeholder="'Enter Volume'"
                    :default-value="cylinder.volume"
                    @get="cylinder.volume = $event.value"
                  />
                </td>
                <td>
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      class="fill-current text-gray-600 w-4 h-4"
                      @click="removeCylinders(i)"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="inline-block">
          <button
            type="button"
            class="flex justify-evenly items-center"
            @click="increaseCounter()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 fill-current text-transparent mr-2"
              viewBox="0 0 24 24"
              stroke="gray"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span class="text-md text-gray-400 underline"
              >Add New Cylinder</span
            >
          </button>
        </div>

        <div class="flex md:space-x-4 flex-col md:flex-row items-center my-8">
          <div class="w-full">
            <text-area-component
              :input-placeholder="'Comment'"
              :label-title="'Comment'"
              :default-value="form.comment"
              @get="form.comment = $event.value"
            />
          </div>
        </div>

        <div class="flex items-center w-1/2 space-x-4 my-10">
          <button-component
            :button-class="'bg-btn-purple text-white w-auto'"
            :button-text="'Create order'"
            :loading-status="buttonLoading"
          />
          <button-component
            :button-class="'text-btn-purple border border-btn-purple bg-white w-auto'"
            :button-text="'Cancel'"
          />
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  reactive,
  ref,
  useContext,
  useRouter,
} from '@nuxtjs/composition-api'
import Validator from 'validatorjs'
import ButtonComponent from '@/components/Form/Button.vue'
import InputComponent from '@/components/Form/Input.vue'
import SelectComponent from '@/components/Form/Select.vue'
import TextAreaComponent from '@/components/Form/TextArea.vue'
import { getRandomValue } from '@/constants/utils'
import { CylinderController } from '@/module/Cylinder'
import { CustomerController } from '@/module/Customer'
import { ValidatorObject } from '@/module/Validation'
import { fetchBranches } from '@/module/Branch'
import { mainStore } from '@/module/Pinia'
export default defineComponent({
  components: {
    SelectComponent,
    ButtonComponent,
    InputComponent,
    TextAreaComponent,
  },
  layout: 'dashboard',
  setup() {
    const form = reactive<any>({
      cylinders: [],
      fromBranch: '',
      date: new Date().toISOString(),
      comment: '',
      gasType: '',
      type: 'internal',
    })
    const { getLoggedInUser: auth }: any = mainStore()
    const userBranch = auth.branch

    const componentKey = ref<Number>()
    const cylinderArray = ref<any>([])
    const branchesArray = ref<any>([])
    const context = useContext()
    const router = useRouter()
    const increaseCounter = () => {
      form.cylinders.push({
        cylinderNo: '',
        volume: '',
      })
    }
    const buttonLoading = ref<Boolean>(false)

    const removeCylinders = (index: any) => {
      form.cylinders.splice(index, 1)
      changeComponentKey()
    }

    const changeComponentKey = () => {
      componentKey.value = getRandomValue()
    }

    const fetchCylinders = () => {
      CylinderController.getRegisteredCylindersUnPaginated().then(
        (response) => {
          cylinderArray.value = response.data.map((element: any) => {
            return {
              name: element.cylinderNumber,
              value: element.cylinderNumber,
            }
          })
        }
      )
    }

    const getBranches = () => {
      fetchBranches().then((response: any) => {
        branchesArray.value = response.map((element: any) => {
          return {
            name: `${element.name} - ${element.location}`,
            value: element._id,
          }
        })
        branchesArray.value = branchesArray.value.filter(
          (branch: any) => branch.value !== userBranch
        )
      })
    }

    const gasTypes = ref([])

    const fetchGasTypes = () => {
      CylinderController.getCylinders().then((response) => {
        const myResponse = response.data.data.cylinders
        gasTypes.value = myResponse.map((element: any) => {
          return {
            name: element.gasName,
            value: element.gasName,
          }
        })
      })
    }

    onBeforeMount(() => {
      changeComponentKey()
      Promise.all([fetchCylinders(), getBranches(), fetchGasTypes()])
    })

    const submit = () => {
      const rules = {
        fromBranch: 'required|string',
        date: 'required|date',
        cylinders: 'required|array',
        'cylinders.*.cylinderNo': 'required|string',
        'cylinders.*.volume': 'required|string|min:1',
        gasType: 'required',
      }

      const validation: any = new Validator(form, rules)
      if (validation.fails()) {
        let messages: string[] = []

        messages = ValidatorObject.getMessages(validation.errors)
        messages.forEach((error: string) => {
          context.$toast.error(error)
        })
      } else {
        buttonLoading.value = true
        CustomerController.createPurchaseOrder(form)
          .then(() => {
            router.push('/dashboard/purchase-orders')
          })
          .finally(() => {
            buttonLoading.value = false
          })
      }
    }

    return {
      form,
      increaseCounter,
      removeCylinders,
      branchesArray,
      cylinderArray,
      componentKey,
      submit,
      buttonLoading,
      gasTypes,
    }
  },
})
</script>
