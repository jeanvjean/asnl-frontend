<template>
  <div :key="key" class="py-6 space-y-2">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div
        class="
          bg-white
          shadow-sm
          rounded-sm
          h-full
          px-4
          py-4
          lg:px-12 lg:py-12
          grid grid-rows-1
          lg:grid-cols-3
          sm:gap-y-3
          lg:gap-x-12
        "
      >
        <div class="lg:col-span-1 px-2 py-2 lg:px-8 lg:py-6 w-full">
          <div class="space-y-1 mb-4">
            <h1 class="block font-semibold text-black text-2xl tracking-wide">
              Invite New Members
            </h1>
            <span class="block font-light text-sm text-gray-500 tracking-wider"
              >Send Invitations to members of the company</span
            >
          </div>
          <form class="w-full" autocomplete="off" @submit.prevent="inviteUser">
            <input-field
              :label-title="'Email Address'"
              :input-type="'email'"
              :input-placeholder="'chance@airseparation.com'"
              @get="email = $event.value"
            ></input-field>
            <select-input
              :label-title="'Department'"
              :default-option-text="'Select a Department'"
              :select-array="departments"
              @get="role = $event.value"
            ></select-input>

            <select-input
              :label-title="'Role'"
              :default-option-text="'Select a Role'"
              :select-array="subroles"
              @get="subrole = $event.value"
            ></select-input>
            <div class="mt-4 w-full md:w-7/12">
              <button-icon-component
                :button-text="'Send Invites'"
                :button-class="'border border-btn-purple text-sm font-light bg-btn-purple text-white'"
                :loading-status="isLoading"
                :icon-position="'right'"
              >
                <svg
                  class="fill-current w-6 h-6"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.417 15.181l-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931L23.93 3.821l.001-.001c.321-1.496-.541-2.081-1.527-1.714l-21.29 8.151c-1.453.564-1.431 1.374-.247 1.741l5.443 1.693L18.953 5.78c.595-.394 1.136-.176.691.218z"
                  />
                </svg>
              </button-icon-component>
            </div>
          </form>
        </div>
        <div class="lg:col-span-2 bg-purple-50 w-full rounded-sm py-10">
          <div>
            <h1 class="font-medium text-2xl px-10 py-4 customFontBold">
              Permission
            </h1>
          </div>
          <div v-if="permissions">
            <div
              v-for="(permission, index) in permissions"
              :key="index"
              class="grid grid-cols-2 px-10 py-4 gap-2"
            >
              <div class="my-auto space-x-4">
                <label
                  for=""
                  class="text-black font-medium text-md customFontRegular"
                  >{{ permission.name }}</label
                >
              </div>
              <div class="flex justify-evenly items-center">
                <div
                  v-for="(subrole, i) in permission.sub_permissions"
                  :key="i"
                  class="
                    space-x-2
                    text-black text-md
                    customFontRegular
                    items-center
                  "
                >
                  <input
                    type="checkbox"
                    :value="subrole"
                    class="w-6 h-6 rounded-full"
                    @change="editPermissions(subrole, permission.name)"
                  />
                  <label for="">{{ subrole }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  watch,
  ref,
  useContext,
} from '@nuxtjs/composition-api'
import SelectInput from '@/components/Form/Select.vue'
import InputField from '@/components/Form/Input.vue'
import { UserController } from '@/module/User'
import ButtonIconComponent from '@/components/Form/ButtonIcon.vue'

export default defineComponent({
  name: 'NewUser',
  components: { SelectInput, InputField, ButtonIconComponent },
  layout: 'dashboard',
  setup() {
    const context = useContext()
    const departments = ref([])
    const myResponse: any = ref(null)
    const subroles = ref([])
    const permissions = ref([])

    const requestPermissions = ref()
    const isLoading = ref<Boolean>(false)

    const email = ref('')
    const role = ref('')
    const subrole = ref('')

    watch(role, () => {
      if (role.value !== '') {
        myResponse.value.forEach((element: any) => {
          if (element.role === role.value) {
            if (element.subroles) {
              subroles.value = element.subroles.map((el: any) => {
                return {
                  name: el,
                  value: el,
                }
              })
            } else {
              subroles.value = element.subrole.map((el: any) => {
                return {
                  name: el,
                  value: el,
                }
              })
            }
          }
        })
      }
    })

    const inviteUser = () => {
      requestPermissions.value.forEach((element: any, index: number) => {
        if (!element.sub_permissions.length) {
          requestPermissions.value.splice(index, 1)
        }
      })
      if (!requestPermissions.value.length) {
        context.$toast.error('Please Select at least one Permission')
      } else {
        isLoading.value = true
        const form = {
          email: String(email.value).toLowerCase(),
          role: role.value,
          subrole: subrole.value,
          permissions: requestPermissions.value,
        }
        UserController.inviteUser(form)
          .then(() => {
            email.value = role.value = subrole.value = ''
            key.value++
          })
          .finally(() => {
            isLoading.value = false
          })
      }
    }

    function editPermissions(subrole: string, role: string): void {
      if (!requestPermissions.value.length) {
        requestPermissions.value.push({
          name: role,
          sub_permissions: [subrole],
        })
      } else {
        const exist = ref(false)
        requestPermissions.value.forEach((element: any) => {
          if (element.name === role) {
            if (element.sub_permissions.includes(subrole)) {
              const index = element.sub_permissions.indexOf(subrole)
              element.sub_permissions.splice(index, 1)
              exist.value = true
            } else {
              element.sub_permissions.push(subrole)
              exist.value = true
            }
          }
        })
        if (exist.value === false) {
          requestPermissions.value.push({
            name: role,
            sub_permissions: [subrole],
          })
        }
      }
    }

    onMounted(() => {
      UserController.fetchRoles().then((response: any) => {
        myResponse.value = response.data.data
        const filterRoles = myResponse.value.map((element: any) => {
          return { name: element.role, value: element.role }
        })
        departments.value = filterRoles
      })

      UserController.fetchPermissions().then((response: any) => {
        permissions.value = response.data.data
        requestPermissions.value = []
      })
    })
    const key = ref(1)

    return {
      departments,
      subroles,
      permissions,
      email,
      role,
      subrole,
      inviteUser,
      key,
      requestPermissions,
      editPermissions,
      isLoading,
    }
  },
})
</script>
