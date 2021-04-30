<template>
  <div :key="key" class="py-6 space-y-2">
    <div class="px-4 sm:px-6 md:px-8 w-full text-black font-semibold text-lg">
      User Management
    </div>
    <div class="mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div
        class="bg-white shadow-sm rounded h-full px-4 py-4 lg:px-12 lg:py-12 grid grid-rows-1 lg:grid-cols-3 sm:gap-y-3 lg:gap-x-12"
      >
        <div class="lg:col-span-1 px-2 py-2 lg:px-8 lg:py-6 w-full">
          <div class="space-y-1 mb-4">
            <div
              class="rounded-full bg-purple-300 w-10 h-10 flex justify-center items-center mb-3"
            >
              <svg
                width="41"
                height="41"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  opacity=".1"
                  cx="20.514"
                  cy="20.345"
                  r="20"
                  transform="rotate(-.042 20.514 20.345)"
                  fill="#5C53FF"
                />
                <path
                  d="M17.847 19.459a3.556 3.556 0 10-.005-7.112 3.556 3.556 0 00.005 7.112zm-.004-5.334a1.777 1.777 0 11.003 3.554 1.777 1.777 0 01-.003-3.554zM24.959 21.231a2.667 2.667 0 10-.005-5.334 2.667 2.667 0 00.005 5.334zm-.003-3.555a.889.889 0 11.001 1.777.889.889 0 010-1.777zM24.96 22.12a4.445 4.445 0 00-2.72.936 6.222 6.222 0 00-10.61 4.407.89.89 0 001.778-.001 4.445 4.445 0 018.89-.006.889.889 0 101.777-.002 6.133 6.133 0 00-.767-2.977 2.667 2.667 0 014.322 2.086.888.888 0 101.778-.002 4.444 4.444 0 00-4.448-4.44z"
                  fill="#5C53FF"
                />
              </svg>
            </div>

            <h1 class="block font-semibold text-black text-2xl tracking-wide">
              Invite New Members
            </h1>
            <span class="block font-light text-sm text-gray-500 tracking-wider"
              >Send Invitations to members of the company</span
            >
          </div>
          <form action="" class="w-full">
            <input-field
              :label-title="'Name'"
              :input-placeholder="'Chance Collins'"
              @get="name = $event.value"
            ></input-field>
            <input-field
              :label-title="'Email Address'"
              :input-type="'email'"
              :input-placeholder="'chance@airseparation.com'"
              @get="email = $event.value"
            ></input-field>
            <input-field
              :label-title="'Phone Number'"
              :input-type="'text'"
              :input-placeholder="'Enter Phone Number'"
              @get="phone = $event.value"
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

            <button
              type="button"
              class="bg-purple-600 flex justify-around space-x-2 items-center text-white max-w-3/5 py-3 px-4 my-4 rounded"
              @click="inviteUser"
            >
              <span class="tracking-wide">Send Invites</span
              ><svg
                class="fill-current w-6 h-6"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.417 15.181l-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931L23.93 3.821l.001-.001c.321-1.496-.541-2.081-1.527-1.714l-21.29 8.151c-1.453.564-1.431 1.374-.247 1.741l5.443 1.693L18.953 5.78c.595-.394 1.136-.176.691.218z"
                />
              </svg>
            </button>
          </form>
        </div>
        <div class="lg:col-span-2 bg-purple-50 w-full rounded-md py-10">
          <div>
            <h1 class="font-medium text-2xl px-10 py-4">Permission</h1>
          </div>
          <div
            v-for="(permission, index) in permissions"
            :key="index"
            class="grid grid-cols-2 px-10 py-4 gap-2"
          >
            <div class="my-auto space-x-4">
              <input
                type="checkbox"
                class="w-6 h-6 rounded border-black border"
              />
              <label for="" class="text-black font-medium text-md">{{
                permission
              }}</label>
            </div>
            <div class="flex justify-evenly items-center">
              <div class="space-x-2 text-black text-md font-light items-center">
                <input type="radio" class="w-6 h-6" />
                <label for="">Read</label>
              </div>
              <div class="space-x-2 text-black text-lg font-light items-center">
                <input type="radio" checked class="w-6 h-6" />
                <label for="">Edit</label>
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
import { UserRepository } from '@/module/User'
export default defineComponent({
  name: 'NewUser',
  components: { SelectInput, InputField },
  layout: 'dashboard',
  setup() {
    const userObject = new UserRepository()
    const context = useContext()
    const departments = ref([])
    const myResponse: any = ref(null)
    const subroles = ref([])
    const permissions = [
      'User Management',
      'Cylinders',
      'Inventory Management',
      'Vehicle Management',
      'Complaint',
      'Report',
    ]

    const name = ref('')
    const email = ref('')
    const role = ref('')
    const subrole = ref('')
    const phone = ref('')

    watch(role, () => {
      if (role.value !== '') {
        myResponse.value.forEach((element: any) => {
          if (element.role === role.value) {
            subroles.value = element.subroles.map((el: any) => {
              return {
                name: el,
                value: el,
              }
            })
          }
        })
      }
    })

    const inviteUser = () => {
      if (
        !name.value ||
        !email.value ||
        !role.value ||
        !subrole.value ||
        !phone.value
      ) {
        context.$toast.global.required()
      } else {
        const form = {
          name: name.value,
          email: email.value,
          role: role.value,
          subrole: subrole.value,
          phoneNumber: phone.value,
        }
        userObject.inviteUser(form).then(() => {
          name.value = email.value = role.value = subrole.value = ''
          key.value++
        })
      }
    }

    onMounted(() => {
      userObject.fetchRoles().then((response: any) => {
        myResponse.value = response.data.data
        const filterRoles = myResponse.value.map((element: any) => {
          return { name: element.role, value: element.role }
        })
        departments.value = filterRoles
      })
    })
    const key = ref(1)

    return {
      departments,
      subroles,
      permissions,
      name,
      email,
      role,
      subrole,
      inviteUser,
      key,
      phone,
    }
  },
})
</script>
