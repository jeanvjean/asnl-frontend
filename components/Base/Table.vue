<template>
  <div class="overflow-x-auto w-full py-4">
    <div class="w-full mb-4">
      <div
        class="
          flex
          items-center
          justify-between
          px-2
          py-2
          space-x-4
          w-full
          h-full
        "
      >
        <filter-component />
        <search-component :place-holder="'Search for User'" />
        <AddUserButton />
      </div>
    </div>
    <table class="w-full table-auto">
      <thead class="bg-gray-100">
        <tr>
          <th class="w-6 px-6 py-4">
            <input type="checkbox" class="border border-gray-500 rounded-sm" />
          </th>
          <th
            v-for="(headSingle, index) in head"
            :key="index"
            class="
              uppercase
              text-gray-800
              font-thin
              text-sm
              px-4
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
              px-4
              py-2
              text-left
            "
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(bodySingle, index) in body"
          :key="index"
          class="font-light hover:bg-gray-200"
        >
          <td class="w-6 px-6 py-4">
            <input
              type="checkbox"
              class="border-2 border-gray-400 rounded-sm"
            />
          </td>
          <td class="px-4 text-left py-4">
            <div class="flex items-center space-x-4">
              <img
                class="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=ZIOeP15SMT&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              /><span>{{ bodySingle.name }}</span>
            </div>
          </td>
          <td class="px-4 text-left py-4">{{ bodySingle.phoneNumber }}</td>
          <td class="px-4 text-left py-4">{{ bodySingle.email }}</td>
          <td class="px-4 text-left py-4">
            <span class="px-8 py-2 bg-green-100 text-green-400">{{
              bodySingle.role
            }}</span>
          </td>
          <td class="px-4 py-4 icon-button">
            <button class="mx-auto text-black w-6 h-6 relative">
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
                -ml-16
                bg-gray-50
                border border-gray-300
                w-40
                font-medium
                text-sm
                rounded-sm-md
                action-menu
                z-10
              "
            >
              <button
                class="
                  block
                  px-3
                  py-4
                  text-black
                  focus:outline-none
                  hover:bg-btn-purple
                  hover:text-white
                  w-full
                  overflow-none
                "
                @click="
                  changeUser(index)
                  showChangeRole = true
                "
              >
                Change Role
              </button>
              <button
                class="
                  block
                  px-3
                  py-4
                  text-black
                  focus:outline-none
                  hover:bg-btn-purple
                  hover:text-white
                  w-full
                  overflow-none
                "
                @click="
                  changeUser(index)
                  showDeleteUser = true
                "
              >
                Delete User
              </button>
              <button
                class="
                  block
                  px-3
                  py-4
                  text-black
                  focus:outline-none
                  hover:bg-btn-purple
                  hover:text-white
                  w-full
                  overflow-none
                "
              >
                Suspend User
              </button>
              <router-link
                class="
                  block
                  px-3
                  py-4
                  text-center text-black
                  focus:outline-none
                  hover:bg-btn-purple
                  hover:text-white
                  w-full
                  overflow-none
                  font-medium
                "
                :to="
                  '/dashboard/user-management/' +
                  bodySingle._id +
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
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import AddUserButton from '@/components/Clickables/AddUser.vue'
import SearchComponent from '@/components/Base/Search.vue'
import FilterComponent from '@/components/Base/Filter.vue'
import DeleteUser from '@/components/Overlays/DeleteUser.vue'
import ChangeRole from '@/components/Overlays/ChangeRole.vue'
import { UserRepository } from '@/module/User'

export default defineComponent({
  components: {
    AddUserButton,
    SearchComponent,
    DeleteUser,
    ChangeRole,
    FilterComponent,
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
  },
  setup(_props, ctx) {
    const showDeleteUser = ref(false)
    const showChangeRole = ref(false)
    const hoverUser = ref()
    const roles = ref<any>([])
    const userObject = new UserRepository()

    function changeUser(i: number) {
      hoverUser.value = _props.body[i]
    }

    onMounted(() => {
      getRoles()
    })

    const getRoles = () => {
      userObject.fetchRoles().then((response: any) => {
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
      roles,
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
}
.icon-button:focus > .action-menu {
  display: block;
}
</style>
