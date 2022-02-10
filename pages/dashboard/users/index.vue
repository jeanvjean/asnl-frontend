<template>
  <div>
    <div class="py-6 space-y-4">
      <div class="mx-auto px-4 sm:px-6 md:px-8 w-full">
        <h1 class="text-black font-thin text-xl mb-4">User Statistics</h1>
        <div class="grid grid-rows-1 xl:grid-cols-3 gap-4 mb-6">
          <div class="bg-white px-10 pt-10 pb-24">
            <p class="font-medium text-black tracking-wide pb-4">Total Staff</p>
            <div class="relative space-x-4 flex justify-between">
              <p class="absolute bottom-0 left-0 top-4 font-medium text-5xl">
                {{ userStatistics.totalUser }}
              </p>
              <svg
                width="120"
                height="69"
                class="absolute bottom-0 right-0 top-0"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity=".2"
                  d="M85 19a2 2 0 012-2h10a2 2 0 012 2v50H85V19zM103 43a2 2 0 012-2h10a2 2 0 012 2v26h-14V43z"
                  fill="#FFA958"
                />
                <path
                  d="M68 32a2 2 0 012-2h10a2 2 0 012 2v37H68V32z"
                  fill="#FFA958"
                />
                <path
                  opacity=".2"
                  d="M51 2a2 2 0 012-2h10a2 2 0 012 2v67H51V2zM34 24a2 2 0 012-2h10a2 2 0 012 2v45H34V24zM17 35a2 2 0 012-2h10a2 2 0 012 2v34H17V35zM0 64a2 2 0 012-2h10a2 2 0 012 2v5H0v-5z"
                  fill="#FFA958"
                />
              </svg>
            </div>
          </div>
          <div class="bg-white px-10 pt-10 pb-24">
            <p class="font-medium text-black tracking-wide pb-4">
              Active Staff
            </p>
            <div class="relative space-x-4 flex justify-between">
              <p class="absolute bottom-0 left-0 top-4 font-medium text-5xl">
                {{ userStatistics.activeUser }}
              </p>
              <svg
                width="120"
                height="69"
                class="absolute bottom-0 right-0 top-0"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity=".2"
                  d="M85 19a2 2 0 012-2h10a2 2 0 012 2v50H85V19zM103 43a2 2 0 012-2h10a2 2 0 012 2v26h-14V43zM68 32a2 2 0 012-2h10a2 2 0 012 2v37H68V32zM51 2a2 2 0 012-2h10a2 2 0 012 2v67H51V2z"
                  fill="#61A4E4"
                />
                <path
                  d="M34 24a2 2 0 012-2h10a2 2 0 012 2v45H34V24z"
                  fill="#61A4E4"
                />
                <path
                  opacity=".2"
                  d="M17 35a2 2 0 012-2h10a2 2 0 012 2v34H17V35zM0 64a2 2 0 012-2h10a2 2 0 012 2v5H0v-5z"
                  fill="#61A4E4"
                />
              </svg>
            </div>
          </div>
          <div class="bg-white px-10 pt-10 pb-24">
            <p class="font-medium text-black tracking-wide pb-4">
              Deleted Staff
            </p>
            <div class="relative space-x-4 flex justify-between">
              <p class="absolute bottom-0 left-0 top-4 font-medium text-5xl">
                {{ userStatistics.deletedUser }}
              </p>
              <svg
                width="120"
                height="69"
                class="absolute bottom-0 right-0 top-0"
                viewBox="0 0 117 69"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.2"
                  d="M85 19C85 17.8954 85.8954 17 87 17H97C98.1046 17 99 17.8954 99 19V69H85V19Z"
                  fill="#FFC5C5"
                />
                <path
                  opacity="0.2"
                  d="M103 43C103 41.8954 103.895 41 105 41H115C116.105 41 117 41.8954 117 43V69H103V43Z"
                  fill="#FFC5C5"
                />
                <path
                  opacity="0.2"
                  d="M68 32C68 30.8954 68.8954 30 70 30H80C81.1046 30 82 30.8954 82 32V69H68V32Z"
                  fill="#FFC5C5"
                />
                <path
                  d="M51 2C51 0.89543 51.8954 0 53 0H63C64.1046 0 65 0.895431 65 2V69H51V2Z"
                  fill="#FFC5C5"
                />
                <path
                  opacity="0.2"
                  d="M34 24C34 22.8954 34.8954 22 36 22H46C47.1046 22 48 22.8954 48 24V69H34V24Z"
                  fill="#FFC5C5"
                />
                <path
                  opacity="0.2"
                  d="M17 35C17 33.8954 17.8954 33 19 33H29C30.1046 33 31 33.8954 31 35V69H17V35Z"
                  fill="#FFC5C5"
                />
                <path
                  opacity="0.2"
                  d="M0 64C0 62.8954 0.895431 62 2 62H12C13.1046 62 14 62.8954 14 64V69H0V64Z"
                  fill="#FFC5C5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div v-if="defaultState" class="mx-auto px-4 sm:px-6 md:px-8 w-full">
        <div
          class="
            bg-white
            shadow-sm
            rounded-sm
            h-96
            px-4
            flex
            justify-center
            items-center
          "
        >
          <div class="w-full sm:w-full md:w-3/5 space-y-6">
            <svg
              class="block mx-auto"
              width="139"
              height="111"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity=".7">
                <path
                  opacity=".8"
                  d="M125.764 11.578a7.562 7.562 0 01-5.254 2.425 7.543 7.543 0 01-5.425-2.008 7.541 7.541 0 018.165-1.962c.931.345 1.785.87 2.514 1.545zM114.067 24.24a7.586 7.586 0 01-.413-10.702 7.581 7.581 0 01.413 10.702z"
                  fill="#666A72"
                />
                <path
                  d="M113.797 10.798a7.576 7.576 0 01-2.418-5.265 7.577 7.577 0 012.006-5.437 7.582 7.582 0 01.412 10.702z"
                  fill="#98A0AA"
                />
                <path
                  opacity=".8"
                  d="M112.369 12.343a7.547 7.547 0 01-10.679.413 7.548 7.548 0 0110.679-.413z"
                  fill="#666A72"
                />
                <path
                  d="M36.43 54.263l.005.001.001.004.024 32.792a8.971 8.971 0 01-2.038 5.701 8.936 8.936 0 01-5.191 3.1 8.466 8.466 0 01-1.71.174 8.94 8.94 0 01-6.33-2.622 8.978 8.978 0 01-2.626-6.34l-.017-23.829a8.984 8.984 0 00-2.626-6.34 8.945 8.945 0 00-6.33-2.622l26.839-.02z"
                  fill="#C7C7C7"
                />
                <path
                  d="M18.547 63.244l.01 12.912-17.898.013-.01-12.912a8.978 8.978 0 012.617-6.344 8.939 8.939 0 0112.655-.009 8.978 8.978 0 012.626 6.34z"
                  fill="#98A0AA"
                />
                <path
                  d="M103.784 37.378l.053 72.724-38.145.028a8.898 8.898 0 01-6.298-2.609 8.936 8.936 0 01-2.613-6.308l-.045-62.545v-.263c-.145-5.5-4.64-9.913-10.159-9.909l48.3-.035a8.893 8.893 0 016.295 2.61 8.933 8.933 0 012.612 6.307z"
                  fill="#C7C7C7"
                />
                <path
                  d="M56.783 96.013v.032l-29.26.022a8.652 8.652 0 001.708-.174 8.937 8.937 0 005.191-3.099 8.972 8.972 0 002.04-5.7l-.036-48.411c-.004-5.622 4.54-10.183 10.147-10.187 5.337-.004 9.72 4.125 10.129 9.375.004.237.08 57.662.08 58.142zM123.126 94.868l.004 5.809a9.425 9.425 0 01-2.746 6.657 9.38 9.38 0 01-6.639 2.762l-47.814.035c1.282-.13 3.279-.653 4.86-1.879l.007-.006a8.632 8.632 0 003.266-6.785l-.005-6.556 49.067-.037z"
                  fill="#98A0AA"
                />
                <path
                  d="M97.433 44.83l-32.209.023.003 3.716 32.209-.024-.003-3.715zM97.445 61.443l-32.209.024.003 3.716 32.209-.024-.003-3.716zM97.457 78.589l-32.208.023.002 3.716 32.21-.023-.004-3.716z"
                  fill="#F4FCFC"
                />
                <path
                  d="M130.621 51.793l-40.284.03.017 23.949 40.285-.03-.018-23.95z"
                  fill="#CDCDCD"
                />
                <path
                  d="M99.096 67.295a2.66 2.66 0 002.629-2.691 2.66 2.66 0 00-2.685-2.635 2.66 2.66 0 00-2.63 2.69 2.66 2.66 0 002.686 2.636zM121.911 67.278a2.66 2.66 0 002.629-2.69 2.66 2.66 0 00-2.685-2.636 2.661 2.661 0 00-2.63 2.691 2.66 2.66 0 002.686 2.635zM115.438 63.734c.034 2.976-2.078 5.408-4.718 5.437-2.639.029-4.807-2.364-4.841-5.34-.034-2.977 2.078-5.408 4.718-5.437 2.639-.029 4.806 2.364 4.841 5.34z"
                  fill="#C2C2C2"
                />
                <path
                  d="M73.89 8.442l.502.92a6.758 6.758 0 002.686 2.687l.918.504-.917.504a6.757 6.757 0 00-2.682 2.691l-.502.92-.503-.92a6.758 6.758 0 00-2.686-2.686l-.918-.503.918-.505a6.758 6.758 0 002.681-2.691l.502-.92zM135.684 88.88l.366.67a4.91 4.91 0 001.952 1.954l.669.366-.668.367a4.908 4.908 0 00-1.95 1.956l-.365.67-.366-.67a4.912 4.912 0 00-1.953-1.953l-.668-.366.668-.367a4.914 4.914 0 001.95-1.957l.365-.67zM9.622 96.048l.529.967a7.093 7.093 0 002.819 2.82l.965.529-.965.529a7.096 7.096 0 00-2.814 2.825l-.527.968-.529-.967a7.095 7.095 0 00-2.819-2.821l-.965-.528.965-.53a7.093 7.093 0 002.814-2.827l.527-.965z"
                  fill="#98A0AA"
                />
              </g>
            </svg>
            <span
              class="inline-block text-center text-gray-500 text-sm leading-6"
              >Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium voluptatem sed ea explicabo. Aperiam rerum voluptatum,
              soluta laudantium similique doloribus ex dicta recusandae,
              nesciunt consequatur.</span
            >
            <AddUserButton
              class="mx-auto w-48"
              @addUser="defaultState = !defaultState"
            />
          </div>
        </div>
      </div>
      <div v-else class="mx-auto px-4 sm:px-6 md:px-8 w-full">
        <div class="bg-white shadow-sm rounded-sm h-full">
          <div class="py-2">
            <div
              class="
                flex
                justify-between
                items-center
                pr-6
                pl-6
                border-0 border-l-4 border-black
                mt-4
              "
            >
              <h1 class="font-semibold text-black text-lg">Users</h1>
              <div class="flex items-center space-x-6">
                <pagination
                  :pagination-details="paginationProp"
                  @next="changePage($event.value)"
                  @prev="changePage($event.value)"
                  @limitChanged="adjustPageLimit($event)"
                />
                <button
                  class="
                    bg-btn-purple
                    text-white
                    px-4
                    py-2
                    rounded-sm
                    font-semibold
                  "
                  @click="downloadTable()"
                >
                  Download Users
                </button>
              </div>
            </div>
          </div>
          <div class="w-full px-6 py-2">
            <div
              class="flex items-center justify-between space-x-4 w-full h-full"
            >
              <filter-component @filter="showFilter = true" />
              <search-component
                :place-holder="'Search for User'"
                @search="searchUsers($event)"
              />
              <AddUserButton />
            </div>
          </div>
          <div class="w-full flex items-center space-x-4 px-6 py-2">
            <div
              v-for="(selectedFilter, j) in displayedFilters"
              :key="j"
              class="
                bg-purple-400 bg-opacity-10
                text-purple-700
                font-medium
                capitalize
                flex
                items-center
                space-x-2
                px-4
                py-2
                rounded-lg
                text-xs
              "
            >
              <span class="rounded-md">{{ selectedFilter }}</span>
            </div>
          </div>
          <TableComponent
            :show-loader="isLoading"
            :head="headers"
            :body="body"
            @refresh="getUsers(1)"
          />
        </div>
      </div>
    </div>
    <user-filter
      v-if="showFilter"
      :filters="userFilters"
      @close="showFilter = false"
      @filterAdded="filterUsers($event)"
    />
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  reactive,
  ref,
} from '@nuxtjs/composition-api'
// eslint-disable-next-line import/no-named-as-default
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import TableComponent from '@/components/Base/Table.vue'
import AddUserButton from '@/components/Clickables/AddUser.vue'
import { UserController } from '@/module/User'
import Pagination from '@/components/Base/Pagination.vue'
import SearchComponent from '@/components/Base/Search.vue'
import FilterComponent from '@/components/Base/FilterButton.vue'
import UserFilter from '@/components/Overlays/Filter.vue'
import { getFilters, getQueryString } from '@/constants/utils'
export default defineComponent({
  name: 'Home',
  components: {
    TableComponent,
    AddUserButton,
    Pagination,
    SearchComponent,
    FilterComponent,
    UserFilter,
  },
  layout: 'dashboard',

  setup() {
    const headers = ['Name', 'Phone', 'Email', 'Department', 'Status']
    const page = ref<number>(1)
    const pageLimit = ref<number>(10)
    const showFilter = ref<Boolean>(false)
    const displayedFilters = ref<Array<String>>([])
    const queryString = ref<String>('')

    const paginationProp = reactive({
      hasNextPage: false,
      hasPrevPage: false,
      currentPage: 1,
    })

    const userStatistics = reactive({
      totalUser: 0,
      activeUser: 0,
      deletedUser: 0,
    })

    function downloadTable() {
      // eslint-disable-next-line new-cap
      const doc = new jsPDF({ orientation: 'landscape' })
      const tableBody: any = body.value.map((row: any) => {
        return [
          row.name,
          row.phoneNumber,
          row.email,
          row.role,
          row.deactivated ? 'Suspended' : 'Activated',
        ]
      })

      autoTable(doc, {
        head: [headers],
        theme: 'grid',
        styles: { cellWidth: 'wrap', font: 'courier' },
        body: tableBody,
      })
      doc.save('users.pdf')
    }

    const userFilters = reactive({
      departments: { type: 'checkbox', list: [] },
      status: {
        list: [
          {
            title: 'active',
            type: 'checkbox',
            selected: false,
            value: true,
            identifier: 'active',
          },
          {
            title: 'suspended',
            type: 'checkbox',
            selected: false,
            value: true,
            identifier: 'suspended',
          },
          {
            title: 'deleted',
            type: 'checkbox',
            selected: false,
            value: true,
            identifier: 'deleted',
          },
        ],
      },
    })

    const body = ref([])

    function changePage(nextPage: number) {
      getUsers(nextPage, pageLimit.value)
    }

    function adjustPageLimit(newLimit: number) {
      pageLimit.value = newLimit
      getUsers(1, pageLimit.value)
    }

    const isLoading = ref<Boolean>(true)

    function getUsers(pageValue: number, limit: number, query: String = '') {
      isLoading.value = true
      UserController.getUsers(pageValue, limit, query)
        .then((response: any) => {
          const myResponse = response.data.data
          console.log(response.data)

          paginationProp.hasNextPage = myResponse.hasNextPage
          paginationProp.hasPrevPage = myResponse.hasPrevPage
          paginationProp.currentPage = myResponse.page

          body.value = myResponse.docs.map((element: any) => {
            return {
              name: element.name,
              phoneNumber: element.phoneNumber,
              email: element.email,
              role: element.role,
              id: element._id,
              subrole: element.subrole,
              deactivated: element.deactivated,
              permissions: element.permissions,
              image: element.image,
            }
          })
        })
        .finally(() => {
          isLoading.value = false
        })
    }

    const searchUsers = (searchValue: String) => {
      if (searchValue) {
        displayedFilters.value = []
        queryString.value = ''
        const searchString = `&search=${searchValue}`
        getUsers(1, pageLimit.value, searchString)
      } else {
        getUsers(1, pageLimit.value)
      }
    }

    function filterUsers(filters: any) {
      queryString.value = getQueryString(filters)
      displayedFilters.value = getFilters(filters)
      if (displayedFilters.value.includes('deleted')) {
        fetchDeleted()
      }
      getUsers(1, pageLimit.value, queryString.value)
    }

    function fetchUserStat() {
      UserController.fetchUserStatistics().then((response) => {
        const mainResponse: any = response.data
        userStatistics.totalUser = mainResponse.totalUsers
        userStatistics.deletedUser = mainResponse.deletedUsers
        userStatistics.activeUser = mainResponse.activeUsers
      })
    }

    function fetchDeleted() {
      UserController.fetchDeletedUsers(1, 10).then((response) => {
        console.log(response)
      })
    }

    function fetchRoles() {
      UserController.fetchRoles().then((response: any) => {
        const roles = response.data.data
        const sortedRoles = roles.map((role: any) => {
          return {
            title: role.role,
            type: 'checkbox',
            selected: false,
            value: role.role,
            identifier: 'departments[]',
          }
        })
        userFilters.departments.list = sortedRoles
      })
    }

    onBeforeMount(() => {
      Promise.all([
        getUsers(page.value, pageLimit.value),
        fetchUserStat(),
        fetchRoles(),
      ])
    })

    const defaultState = ref(false)
    return {
      headers,
      body,
      defaultState,
      getUsers,
      paginationProp,
      changePage,
      userStatistics,
      showFilter,
      userFilters,
      downloadTable,
      adjustPageLimit,
      filterUsers,
      displayedFilters,
      isLoading,
      searchUsers,
    }
  },
})
</script>
