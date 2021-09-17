<template>
  <div class="overflow-x-auto w-full px-6">
    <table id="users-list" class="w-full table-auto">
      <thead class="bg-gray-100">
        <tr>
          <th
            v-for="(headSingle, index) in head"
            :key="index"
            class="
              uppercase
              text-gray-800
              font-thin
              text-sm
              px-6
              py-2
              text-left
            "
          >
            {{ headSingle }}
          </th>
          <th
            class="
              uppercase
              text-gray-800
              font-thin
              text-sm
              px-6
              py-2
              text-center
            "
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody v-if="!showLoader">
        <tr
          v-for="(bodySingle, index) in body"
          :key="index"
          class="font-extralight hover:bg-gray-100 capitalize text-sm"
        >
          <td class="px-2 text-left py-4">
            <div class="flex items-center space-x-4">
              <img
                v-if="bodySingle.image"
                class="h-8 w-8 rounded-full"
                :src="bodySingle.image"
                alt="Profile Image"
              />
              <img
                v-else
                class="h-8 w-8 rounded-full"
                src="@/assets/images/default-avatar.jpg"
                alt="Profile Image"
              /><span>{{ bodySingle.name }}</span>
            </div>
          </td>
          <td class="px-2 text-left py-4">{{ bodySingle.phoneNumber }}</td>
          <td class="px-2 text-left py-4 lowercase">{{ bodySingle.email }}</td>
          <td class="text-left px-2">
            <span
              class="px-4 py-2 w-full block text-center capitalize"
              :class="getColorCode(bodySingle.role)"
              >{{ bodySingle.role }}</span
            >
          </td>

          <td class="text-left px-2">
            <span
              class="px-2 py-2 w-full block text-center"
              :class="
                !bodySingle.deactivated
                  ? 'bg-green-100 text-green-400'
                  : 'bg-red-100 text-red-400'
              "
              >{{ bodySingle.deactivated ? 'Suspended' : 'Activated' }}</span
            >
          </td>
          <td class="px-2 py-4 icon-button text-center relative">
            <button class="mx-auto text-black w-6 h-6">
              <svg
                class="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M4 12a2 2 0 110-4 2 2 0 010 4zm6 0a2 2 0 110-4 2 2 0 010 4zm6 0a2 2 0 110-4 2 2 0 010 4z"
                />
              </svg>
            </button>
            <div
              class="
                absolute
                bg-gray-50
                border border-gray-300
                w-40
                font-medium
                text-sm
                rounded-sm
                action-menu
                left-12
                z-30
              "
            >
              <button
                class="
                  block
                  px-3
                  py-2
                  text-black
                  focus:outline-none
                  hover:bg-purple-300 hover:text-white
                  w-full
                  overflow-none
                "
                @click="changeUser(index), (showChangeRole = true)"
              >
                Change Role
              </button>
              <button
                class="
                  block
                  px-3
                  py-2
                  text-black
                  focus:outline-none
                  hover:bg-purple-300 hover:text-white
                  w-full
                  overflow-none
                "
                @click="changeUser(index), (showDeleteUser = true)"
              >
                Delete User
              </button>
              <button
                class="
                  block
                  px-3
                  py-2
                  text-black
                  focus:outline-none
                  hover:bg-purple-300 hover:text-white
                  w-full
                  overflow-none
                "
                @click="initiateReason(bodySingle)"
              >
                <span v-if="bodySingle.deactivated">Activate User</span>
                <span v-else>Suspend User</span>
              </button>
              <button
                class="
                  block
                  px-3
                  py-2
                  text-black
                  focus:outline-none
                  hover:bg-purple-300 hover:text-white
                  w-full
                  overflow-none
                "
                @click="resendInvite(bodySingle)"
              >
                <span>Resend Invite</span>
              </button>
              <router-link
                class="
                  block
                  px-3
                  py-2
                  text-center text-black
                  focus:outline-none
                  hover:bg-purple-300 hover:text-white
                  w-full
                  overflow-none
                  font-medium
                "
                :to="
                  '/dashboard/user-management/' +
                  bodySingle.id +
                  '/' +
                  bodySingle.email
                "
              >
                View User</router-link
              >
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <table-loader v-if="showLoader" />
    <delete-user
      v-if="showDeleteUser"
      :user="hoverUser"
      @close="showDeleteUser = false"
      @refresh="emitToParent"
    />
    <change-role
      v-if="showChangeRole"
      :user="hoverUser"
      :roles="roles"
      @refresh="emitToParent"
      @close="showChangeRole = false"
    />
    <reason-component
      v-if="showReason"
      :action="reasonAction"
      @close="showReason = !showReason"
      @reasonGiven="suspendUser(selectedUser.id, selectedUser.status, $event)"
    />
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
import DeleteUser from '@/components/Overlays/DeleteUser.vue'
import ChangeRole from '@/components/Overlays/ChangeRole.vue'
import { UserController } from '@/module/User'
import ReasonComponent from '@/components/Overlays/Reason.vue'
import TableLoader from '@/components/TableLoader.vue'
export default defineComponent({
  components: {
    DeleteUser,
    ChangeRole,
    ReasonComponent,
    TableLoader,
  },
  props: {
    head: {
      type: Array,
      required: true,
    },
    body: {
      type: Array,
      required: true,
    },
    showLoader: {
      type: Boolean,
      required: true,
    },
  },
  setup(_props, ctx) {
    const showDeleteUser = ref(false)
    const showChangeRole = ref(false)
    const hoverUser = ref()
    const roles = ref<any>([])
    const context = useContext()
    const showReason = ref<Boolean>(false)
    const reasonAction = ref<String>('')
    const selectedUser = reactive({
      id: '',
      status: false,
    })

    function changeUser(i: number) {
      hoverUser.value = _props.body[i]
    }

    onMounted(() => {
      getRoles()
    })

    function initiateReason(user: any) {
      selectedUser.id = user.id
      selectedUser.status = !user.deactivated
      reasonAction.value = !user.deactivated
        ? 'Suspending User'
        : 'Activating User'
      showReason.value = true
    }

    function initiateDeleteReason(user: any) {
      selectedUser.id = user.id
      reasonAction.value = 'Deleting User'
      showReason.value = true
    }

    const rolesColor: any = {
      security: 'bg-role-orange text-role-orange bg-opacity-25',
      admin: 'bg-green-100 text-green-400',
      sales: 'bg-role-purple text-role-purple bg-opacity-25',
      default: 'bg-blue-100 text-blue-400',
    }

    function getColorCode(role: any) {
      return rolesColor[role] ?? rolesColor.default
    }

    function suspendUser(userId: String, status: Boolean, reason: String) {
      const message = status === false ? 'User Re-activated' : 'User Suspended'
      UserController.suspendUser(userId, !status, reason).then(() => {
        context.$toast.success(message)
        showReason.value = false
        ctx.emit('refresh')
      })
    }

    function resendInvite(user: any) {
      const requestBody = {
        email: user.email,
        role: user.role,
        subrole: user.subrole,
        permissions: user.permissions.map((el: any) => {
          return {
            name: el.name,
            sub_permissions: el.sub_permissions,
          }
        }),
      }
      UserController.inviteUser(requestBody)
    }

    const getRoles = () => {
      UserController.fetchRoles().then((response: any) => {
        const allRoles: any = response.data.data

        allRoles.forEach((element: any) => {
          let subroles: any
          const role: any = {
            name: element.role,
            value: element.role,
          }
          if (element.subroles) {
            subroles = element.subroles.map((el: any) => {
              return {
                name: el,
                value: el,
              }
            })
          } else {
            subroles = element.subrole.map((el: any) => {
              return {
                name: el,
                value: el,
              }
            })
          }
          role.subroles = subroles
          roles.value.push(role)
        })
      })
    }

    const emitToParent = () => {
      ctx.emit('refresh')
    }

    return {
      showDeleteUser,
      hoverUser,
      changeUser,
      emitToParent,
      showChangeRole,
      getColorCode,
      roles,
      suspendUser,
      resendInvite,
      showReason,
      reasonAction,
      initiateReason,
      selectedUser,
      initiateDeleteReason,
    }
  },
})
</script>
<style scoped>
.action-menu {
  display: none;
}
.icon-button:hover > .action-menu {
  display: block;
  margin-left: -50px;
  z-index: 50;
}
.icon-button:focus > .action-menu {
  display: block;
  margin-left: -50px;
  z-index: 50;
}
</style>
