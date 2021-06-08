<template>
  <div class="hidden md:flex md:flex-shrink-0 bg-bg-sidebar">
    <div class="flex flex-col w-80">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex flex-col h-0 flex-1">
        <div class="h-20 px-4 flex items-center justify-between">
          <h2 class="text-white text-left font-semibold text-2xl">
            Air Separation
          </h2>
          <svg
            class="w-6 h-6 fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </div>
        <!-- <div class="flex-1 flex flex-col overflow-y-auto">
          <nav class="flex-1 px-4 py-4 bg-bg-sidebar space-y-4">
            <router-link
              v-for="(nav, index) in navigations"
              :key="index"
              :to="nav.link"
              class="text-white group px-4 py-4 rounded-sm-md flex items-center space-x-6"
            >
              <component :is="nav.icon" class="text-gray-300 mr-3 h-5 w-5" />
              <span class="font-light font-xl">{{ nav.title }}</span>
            </router-link>
          </nav>
        </div> -->
        <div class="flex-1 flex flex-col overflow-y-auto">
          <nav class="flex-1 px-4 py-4 bg-bg-sidebar space-y-4">
            <router-link
              to="/dashboard/"
              class="
                text-white
                group
                px-4
                py-4
                rounded-sm-md
                flex
                items-center
                space-x-6
              "
            >
              <svg
                class="text-gray-300 mr-3 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span class="font-light font-xl">Dashboard</span>
            </router-link>
            <router-link
              to="/dashboard/user-management/"
              class="
                text-white
                group
                px-4
                py-4
                rounded-sm-md
                flex
                items-center
                space-x-6
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="text-gray-300 mr-3 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9 6a3 3 0 11-6 0 3 3 0 016 0zm8 0a3 3 0 11-6 0 3 3 0 016 0zm-4.07 11c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
                />
              </svg>
              <span class="font-light font-xl">User Management</span>
            </router-link>
            <div class="w-full">
              <button
                class="
                  text-white
                  px-4
                  py-4
                  rounded-sm-md
                  flex
                  justify-between
                  w-full
                  link-block
                  focus:outline-none
                "
                @click="toggleCylinder = !toggleCylinder"
              >
                <div class="flex space-x-6">
                  <svg
                    class="text-gray-300 mr-3 h-5 w-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 452.608 452.608"
                  >
                    <path
                      d="M285.184 92.672V63.488h6.656c17.408 0 31.744-14.336 31.744-31.744S309.248 0 291.84 0H160.768c-17.408 0-31.744 14.336-31.744 31.744s14.336 31.744 31.744 31.744h6.656v29.184c-38.912 2.56-69.12 34.816-69.12 73.728v80.384h256V166.4c0-38.912-30.208-71.168-69.12-73.728zm-25.6-.512h-20.48V80.896h-25.6V92.16h-20.48V62.976h66.56V92.16zM98.304 272.384v81.92c0 28.16 15.872 53.76 40.96 66.56v31.744h174.08v-31.744c25.088-12.8 40.96-38.4 40.96-66.56v-81.92h-256z"
                    />
                  </svg>

                  <span class="font-light font-xl">Cylinders</span>
                </div>
                <svg
                  v-if="!toggleCylinder"
                  class="w-6 h-6 fill-current text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
                <svg
                  v-else
                  class="w-6 h-6 fill-current text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z"
                  />
                </svg>
              </button>
              <div
                v-if="toggleCylinder"
                class="
                  text-white
                  ml-16
                  px-2
                  bg-dark-blue bg-opacity-50
                  link-list
                "
              >
                <router-link
                  to="/dashboard/cylinder-management/"
                  class="block px-2 py-2"
                  >Analytics</router-link
                >
                <router-link
                  to="/dashboard/cylinder-management/transfer-list"
                  class="block px-2 py-2"
                  >Cylinder Transfer Analytics</router-link
                >
                <router-link
                  to="/dashboard/cylinder-management/transfer"
                  class="block px-2 py-2"
                  >Cylinder Transfer</router-link
                >
              </div>
            </div>
            <div class="w-full">
              <button
                class="
                  text-white
                  px-4
                  py-4
                  rounded-sm-md
                  flex
                  justify-between
                  w-full
                  link-block
                  focus:outline-none
                "
                @click="toggleInventory = !toggleInventory"
              >
                <div class="flex space-x-6">
                  <svg
                    class="text-gray-300 mr-3 h-5 w-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M0 10V2l2-2h8l10 10-10 10L0 10zm4.5-4a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                    />
                  </svg>

                  <span class="font-light font-xl">Inventory</span>
                </div>
                <svg
                  v-if="!toggleInventory"
                  class="w-6 h-6 fill-current text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
                <svg
                  v-else
                  class="w-6 h-6 fill-current text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z"
                  />
                </svg>
              </button>
              <div
                v-if="toggleInventory"
                class="
                  text-white
                  ml-16
                  px-2
                  bg-dark-blue bg-opacity-50
                  link-list
                "
              >
                <router-link to="/dashboard/inventory/" class="block px-2 py-2"
                  >Analytics</router-link
                >
                <router-link
                  to="/dashboard/inventory/suppliers"
                  class="block px-2 py-2"
                  >Supplier</router-link
                >
                <router-link
                  to="/dashboard/inventory/grn"
                  class="block px-2 py-2"
                  >GRN</router-link
                >
                <router-link
                  to="/dashboard/inventory/issue-products"
                  class="block px-2 py-2"
                  >Issue Products</router-link
                >
              </div>
            </div>
            <div class="w-full">
              <button
                class="
                  text-white
                  px-4
                  py-4
                  rounded-sm-md
                  flex
                  justify-between
                  w-full
                  link-block
                  focus:outline-none
                "
                @click="toggleVehicle = !toggleVehicle"
              >
                <div class="flex space-x-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="text-gray-300 mr-3 h-5 w-5 fill-current"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm7 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                    />
                    <path
                      d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zm11 3a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"
                    />
                  </svg>

                  <span class="font-light font-xl">Vehicle</span>
                </div>
                <svg
                  v-if="!toggleVehicle"
                  class="w-6 h-6 fill-current text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
                <svg
                  v-else
                  class="w-6 h-6 fill-current text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z"
                  />
                </svg>
              </button>
              <div
                v-if="toggleVehicle"
                class="
                  text-white
                  ml-16
                  px-2
                  bg-dark-blue bg-opacity-50
                  link-list
                "
              >
                <router-link
                  to="/dashboard/vehicle-management/"
                  class="block px-2 py-2"
                  >All Vehicles</router-link
                >
                <router-link
                  to="/dashboard/vehicle-management/route-plan"
                  class="block px-2 py-2"
                  >Route Plan</router-link
                >
                <router-link
                  to="/dashboard/vehicle-management/vehicle-performance"
                  class="block px-2 py-2"
                  >Vehicle Performance</router-link
                >
                <router-link
                  to="/dashboard/vehicle-management/corrective-maintenance"
                  class="block px-2 py-2"
                  >Corrective Maintenace</router-link
                >
              </div>
            </div>
            <div class="w-full">
              <button
                class="
                  text-white
                  px-4
                  py-4
                  rounded-sm-md
                  flex
                  justify-between
                  w-full
                  link-block
                  focus:outline-none
                "
                @click="toggleReport = !toggleReport"
              >
                <div class="flex space-x-6">
                  <svg
                    class="w-8 h-8 fill-current text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"
                      fill="rgba(209, 213, 219, 1)"
                    />
                  </svg>

                  <span class="font-light font-xl">Reports</span>
                </div>
                <svg
                  v-if="!toggleReport"
                  class="w-6 h-6 fill-current text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
                <svg
                  v-else
                  class="w-6 h-6 fill-current text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z"
                  />
                </svg>
              </button>
              <div
                v-if="toggleReport"
                class="
                  text-white
                  ml-16
                  px-2
                  bg-dark-blue bg-opacity-50
                  link-list
                "
              >
                <router-link to="/dashboard/reports/" class="block px-2 py-2"
                  >All Reports</router-link
                >
                <router-link
                  to="/dashboard/reports/inventory"
                  class="block px-2 py-2"
                  >Inventory Mgt. Report</router-link
                >
                <router-link
                  to="/dashboard/reports/cylinder"
                  class="block px-2 py-2"
                  >Cylinder Mgt. Report</router-link
                >
              </div>
            </div>
            <router-link
              to="/dashboard/drivers"
              class="
                text-white
                group
                px-4
                py-4
                rounded-sm-md
                flex
                items-center
                space-x-6
              "
            >
              <svg
                class="mr-3 h-5 w-5 fill-current text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 490.667 490.667"
              >
                <path
                  d="M245.333 0C110.059 0 0 110.059 0 245.333s110.059 245.333 245.333 245.333 245.333-110.059 245.333-245.333S380.608 0 245.333 0zm0 448c-111.744 0-202.667-90.923-202.667-202.667S133.589 42.667 245.333 42.667 448 133.589 448 245.333 357.077 448 245.333 448z"
                />
                <path
                  d="M359.552 131.136c-3.093-3.115-7.765-4.011-11.755-2.261l-149.333 64c-2.517 1.067-4.523 3.093-5.611 5.611l-64 149.333a10.653 10.653 0 002.261 11.755 10.82 10.82 0 007.552 3.093c1.408 0 2.837-.299 4.203-.853l149.333-64a10.761 10.761 0 005.611-5.611l64-149.333a10.687 10.687 0 00-2.261-11.734zM245.333 266.667c-11.755 0-21.333-9.579-21.333-21.333 0-11.755 9.579-21.333 21.333-21.333 11.755 0 21.333 9.579 21.333 21.333.001 11.754-9.578 21.333-21.333 21.333z"
                />
              </svg>
              <span class="font-light font-xl">Drivers</span>
            </router-link>

            <router-link
              to="/dashboard/customer-management/"
              class="
                text-white
                group
                px-4
                py-4
                rounded-sm-md
                flex
                items-center
                space-x-6
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-3 h-5 w-5 fill-current text-transparent"
                viewBox="0 0 24 24"
                stroke="rgba(209, 213, 219, 1)"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <span class="font-light font-xl">Customers</span>
            </router-link>

            <div class="w-full">
              <button
                class="
                  text-white
                  px-4
                  py-4
                  rounded-sm-md
                  flex
                  justify-between
                  w-full
                  link-block
                  focus:outline-none
                "
                @click="toggleProduction = !toggleProduction"
              >
                <div class="flex space-x-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-3 h-5 w-5 fill-current text-transparent"
                    viewBox="0 0 24 24"
                    stroke="rgba(209, 213, 219, 1)"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>

                  <span class="font-light font-xl">Production</span>
                </div>
                <svg
                  v-if="!toggleProduction"
                  class="w-6 h-6 fill-current text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
                <svg
                  v-else
                  class="w-6 h-6 fill-current text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z"
                  />
                </svg>
              </button>
              <div
                v-if="toggleProduction"
                class="
                  text-white
                  ml-16
                  px-2
                  bg-dark-blue bg-opacity-50
                  link-list
                "
              >
                <router-link
                  to="/dashboard/production/erc-list"
                  class="block px-2 py-2"
                  >ERC List</router-link
                >
                <router-link
                  to="/dashboard/production/production-schedule"
                  class="block px-2 py-2"
                  >Production Schedule</router-link
                >
                <router-link
                  to="/dashboard/production/sales-requisition"
                  class="block px-2 py-2"
                  >Sales Requisition List</router-link
                >
                <router-link
                  to="/dashboard/production/production-schedule-status"
                  class="block px-2 py-2"
                  >Production Schedule Status</router-link
                >
                <router-link
                  to="/dashboard/production/internal-purchase-requisition"
                  class="block px-2 py-2"
                  >Internal Purchase Requisition</router-link
                >
              </div>
            </div>
            <router-link
              class="
                text-white
                group
                px-4
                py-4
                rounded-sm-md
                flex
                items-center
                space-x-6
              "
              to="/auth/logout"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-3 h-5 w-5 fill-current text-transparent"
                viewBox="0 0 24 24"
                stroke="rgba(209, 213, 219, 1)"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span class="font-light font-xl">Logout</span>
            </router-link>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
// import { getNavigations } from '@/constants/navigation'
// import { mainStore } from '@/module/Pinia'

export default defineComponent({
  setup() {
    const toggleCylinder = ref(false)
    const toggleInventory = ref(false)
    const toggleReport = ref(false)
    const toggleVehicle = ref(false)
    const toggleProduction = ref(false)
    // const appStore = mainStore()

    // const auth: any = appStore.getLoggedInUser

    // const role = auth?.role ?? 'admin'
    // const navigations = getNavigations(role)

    return {
      toggleCylinder,
      toggleInventory,
      toggleReport,
      toggleVehicle,
      toggleProduction,
      // navigations,
    }
  },
})
</script>
