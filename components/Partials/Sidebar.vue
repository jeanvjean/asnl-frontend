<template>
  <div class="hidden md:flex md:flex-shrink-0">
    <div class="flex flex-col w-80">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex flex-col h-0 flex-1">
        <div class="h-20 px-4 bg-gray-900 flex items-center justify-between">
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
        <div class="flex-1 flex flex-col overflow-y-auto">
          <nav class="flex-1 px-4 py-4 bg-gray-800 space-y-4">
            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
            <router-link
              to="/dashboard/"
              class="text-white group px-4 py-4 rounded-md flex items-center space-x-6"
            >
              <svg
                class="text-gray-300 mr-3 h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
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
              class="text-white group px-4 py-4 rounded-md flex items-center space-x-6"
            >
              <svg
                class="text-gray-300 mr-3 h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M7 8a4 4 0 110-8 4 4 0 010 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 017 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 11-1.33 7.76 5.96 5.96 0 000-7.52C12.1.1 12.53 0 13 0z"
                />
              </svg>
              <span class="font-light font-xl">User Management</span>
            </router-link>
            <div class="w-full">
              <button
                class="text-white px-4 py-4 rounded-md flex justify-between w-full link-block focus:outline-none"
                @click="toggleCylinder = !toggleCylinder"
              >
                <div class="flex space-x-6">
                  <svg
                    class="text-gray-300 mr-3 h-6 w-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M7 8a4 4 0 110-8 4 4 0 010 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 017 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 11-1.33 7.76 5.96 5.96 0 000-7.52C12.1.1 12.53 0 13 0z"
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
                class="text-white ml-16 px-2 bg-dark-blue bg-opacity-50 link-list"
              >
                <router-link
                  to="/dashboard/cylinder-management/"
                  class="block px-2 py-2"
                  >Analytics</router-link
                >
                <router-link
                  to="/dashboard/cylinder-management/list"
                  class="block px-2 py-2"
                  >Cylinder Transfer Analytics</router-link
                >
                <router-link
                  to="/dashboard/cylinder-management/transfer"
                  class="block px-2 py-2"
                  >Cylinder Transfer</router-link
                >
                <router-link
                  to="/dashboard/cylinder-management/single"
                  class="block px-2 py-2"
                  >Single Cylinder</router-link
                >
              </div>
            </div>
            <div class="w-full">
              <button
                class="text-white px-4 py-4 rounded-md flex justify-between w-full link-block focus:outline-none"
                @click="toggleInventory = !toggleInventory"
              >
                <div class="flex space-x-6">
                  <svg
                    class="text-gray-300 mr-3 h-6 w-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M7 8a4 4 0 110-8 4 4 0 010 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 017 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 11-1.33 7.76 5.96 5.96 0 000-7.52C12.1.1 12.53 0 13 0z"
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
                class="text-white ml-16 px-2 bg-dark-blue bg-opacity-50 link-list"
              >
                <router-link to="/dashboard/inventory/" class="block px-2 py-2"
                  >Analytics</router-link
                >
                <router-link
                  to="/dashboard/inventory/suppliers"
                  class="block px-2 py-2"
                  >Supplier</router-link
                >
              </div>
            </div>
            <div class="w-full">
              <button
                class="text-white px-4 py-4 rounded-md flex justify-between w-full link-block focus:outline-none"
                @click="toggleVehicle = !toggleVehicle"
              >
                <div class="flex space-x-6">
                  <svg
                    class="text-gray-300 mr-3 h-6 w-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M7 8a4 4 0 110-8 4 4 0 010 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 017 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 11-1.33 7.76 5.96 5.96 0 000-7.52C12.1.1 12.53 0 13 0z"
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
                v-if="toggleVehicle"
                class="text-white ml-16 px-2 bg-dark-blue bg-opacity-50 link-list"
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
                class="text-white px-4 py-4 rounded-md flex justify-between w-full link-block focus:outline-none"
                @click="toggleReport = !toggleReport"
              >
                <div class="flex space-x-6">
                  <svg
                    class="text-gray-300 mr-3 h-6 w-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M7 8a4 4 0 110-8 4 4 0 010 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 017 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 11-1.33 7.76 5.96 5.96 0 000-7.52C12.1.1 12.53 0 13 0z"
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
                class="text-white ml-16 px-2 bg-dark-blue bg-opacity-50 link-list"
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
              class="text-white group px-4 py-4 rounded-md flex items-center space-x-6"
            >
              <svg
                class="text-gray-300 mr-3 h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M7 8a4 4 0 110-8 4 4 0 010 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 017 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 11-1.33 7.76 5.96 5.96 0 000-7.52C12.1.1 12.53 0 13 0z"
                />
              </svg>
              <span class="font-light font-xl">Drivers</span>
            </router-link>

            <a
              href="#"
              class="text-white group px-4 py-4 rounded-md flex items-center space-x-6"
            >
              <svg
                class="text-gray-300 mr-3 h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M7 8a4 4 0 110-8 4 4 0 010 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 017 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 11-1.33 7.76 5.96 5.96 0 000-7.52C12.1.1 12.53 0 13 0z"
                />
              </svg>
              <span class="font-light font-xl">Archive</span>
            </a>
            <a
              href="#"
              class="text-white group px-4 py-4 rounded-md flex items-center space-x-6"
            >
              <svg
                class="text-gray-300 mr-3 h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M7 8a4 4 0 110-8 4 4 0 010 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 017 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 11-1.33 7.76 5.96 5.96 0 000-7.52C12.1.1 12.53 0 13 0z"
                />
              </svg>
              <span class="font-light font-xl">Logout</span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
export default defineComponent({
  setup() {
    const toggleCylinder = ref(false)
    const toggleInventory = ref(false)
    const toggleReport = ref(false)
    const toggleVehicle = ref(false)

    return {
      toggleCylinder,
      toggleInventory,
      toggleReport,
      toggleVehicle,
    }
  },
})
</script>
