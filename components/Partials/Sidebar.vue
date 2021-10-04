<template>
  <div class="hidden md:flex md:flex-shrink-0 bg-bg-sidebar">
    <div class="flex flex-col w-80">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex flex-col h-0 flex-1">
        <div class="h-20 px-4 flex items-center">
          <h2 class="text-left font-semibold text-2xl text-white">
            Air Separation
          </h2>
        </div>
        <div class="flex-1 flex flex-col overflow-y-auto">
          <nav class="flex-1 px-4 py-4 bg-bg-sidebar space-y-4 text-gray-400">
            <div
              v-for="(nav, index) in roleNavigations"
              :key="index"
              class="w-full"
            >
              <router-link
                v-if="!nav.subCategories"
                :to="nav.link"
                class="group px-4 py-4 rounded-sm flex items-center space-x-4"
              >
                <component :is="nav.icon" />
                <span class="font-light font-xl">{{ nav.title }}</span>
              </router-link>
              <button
                v-else
                class="
                  px-4
                  py-4
                  rounded-sm
                  flex
                  justify-between
                  w-full
                  link-block
                  focus:outline-none
                "
                :class="nav.showSubCategory ? 'text-white' : ''"
                @click="nav.showSubCategory = !nav.showSubCategory"
              >
                <div class="flex space-x-4">
                  <component :is="nav.icon" />
                  <span class="font-light font-xl">{{ nav.title }}</span>
                </div>
                <caret-up v-if="!nav.showSubCategory" />
                <caret-down v-else />
              </button>
              <div v-if="nav.showSubCategory" class="ml-14 link-list text-sm">
                <div
                  v-for="(subNav, i) in nav.subCategories"
                  :key="i"
                  class="w-full"
                >
                  <button
                    v-if="subNav.type && subNav.type === 'button'"
                    class="block px-2 py-2 focus:outline-none focus:text-white"
                    @click="toggleComponent(subNav.action)"
                  >
                    {{ subNav.title }}
                  </button>
                  <router-link
                    v-else-if="!subNav.subCategories"
                    :to="subNav.link"
                    class="block px-2 py-2"
                    >{{ subNav.title }}</router-link
                  >
                  <button
                    v-else
                    class="
                      px-2
                      py-2
                      rounded-sm
                      flex
                      justify-between
                      w-full
                      link-block
                      focus:outline-none
                    "
                    :class="subNav.showSubCategory ? 'text-white' : ''"
                    @click="subNav.showSubCategory = !subNav.showSubCategory"
                  >
                    <div class="flex space-x-6">
                      <span class="font-light font-xl">{{ subNav.title }}</span>
                    </div>
                    <caret-up v-if="!subNav.showSubCategory" />
                    <caret-down v-else />
                  </button>
                  <div
                    v-if="subNav.showSubCategory"
                    class="ml-2 link-list text-sm"
                  >
                    <router-link
                      v-for="(lowNav, j) in subNav.subCategories"
                      :key="j"
                      :to="lowNav.link"
                      class="block px-2 py-2"
                      >{{ lowNav.title }}</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <new-cylinder
        v-if="showRegiserCylinder"
        @close="showRegiserCylinder = !showRegiserCylinder"
      />
      <new-cylinder-type
        v-if="showRegiserCylinderType"
        @close="showRegiserCylinderType = !showRegiserCylinderType"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import NewCylinder from '@/components/Overlays/NewCylinder.vue'
import NewCylinderType from '@/components/Overlays/NewCylinderType.vue'
import DashboardIcon from '@/components/Icons/DashboardIcon.vue'
import CylinderIcon from '@/components/Icons/CylinderIcon.vue'
import UserIcon from '@/components/Icons/UserIcon.vue'
import ReportIcon from '@/components/Icons/ReportIcon.vue'
import DriverIcon from '@/components/Icons/DriverIcon.vue'
import InventoryIcon from '@/components/Icons/InventoryIcon.vue'
import VehicleIcon from '@/components/Icons/VehicleIcon.vue'
import LogoutIcon from '@/components/Icons/LogoutIcon.vue'
import CaretDown from '@/components/Icons/CaretDown.vue'
import CaretUp from '@/components/Icons/CaretUp.vue'
import CalendarIcon from '@/components/Icons/CalendarIcon.vue'
import CylinderMaintenanceIcon from '@/components/Icons/CylinderMaintenanceIcon.vue'
import TimerIcon from '@/components/Icons/TimerIcon.vue'
import { mainStore } from '@/module/Pinia'

export default defineComponent({
  components: { NewCylinder, NewCylinderType, CaretDown, CaretUp },
  setup() {
    const showRegiserCylinder = ref(false)
    const showRegiserCylinderType = ref(false)
    const { getLoggedInUser: auth }: any = mainStore()

    const role = auth.role
    const roleNavigations = ref<any>([])

    function getNavigations(role: string) {
      const result = navigations[role] ? navigations[role] : navigations.admin
      return result
    }

    function toggleComponent(action: String) {
      if (action === 'register-cylinder') {
        showRegiserCylinder.value = true
      } else if (action === 'register-gas-type') {
        showRegiserCylinderType.value = true
      }
    }

    onMounted(() => {
      roleNavigations.value = getNavigations(role)
    })

    const logout = {
      title: 'Logout',
      icon: LogoutIcon,
      link: '/auth/logout',
    }

    const dashboard = {
      title: 'Dashboard',
      icon: DashboardIcon,
      link: '/dashboard/',
    }

    const navigations: any = {
      admin: [
        dashboard,
        {
          title: 'User Management',
          icon: UserIcon,
          link: '/dashboard/users/',
        },
        {
          title: 'Cylinders',
          icon: CylinderIcon,
          link: '#',
          showSubCategory: false,
          subCategories: [
            {
              title: 'Analytics',
              link: '/dashboard/cylinders/',
            },
            {
              title: 'Transfer Analytics',
              link: '/dashboard/cylinders/transfer-list',
            },
            {
              title: 'Cylinder Type Transfers',
              link: '/dashboard/cylinders/cylinder-type',
            },
            {
              title: 'Pending Condemn Cylinder',
              link: '/dashboard/cylinders/condemn-cylinder',
            },
            {
              title: 'Register Cylinder',
              type: 'button',
              action: 'register-cylinder',
              link: '/dashboard/cylinders/condemn-cylinder',
            },
            {
              title: 'Register Gas Type',
              type: 'button',
              action: 'register-gas-type',
              link: '/dashboard/cylinders/condemn-cylinder',
            },
          ],
        },
        {
          title: 'Inventory',
          icon: InventoryIcon,
          link: '#',
          showSubCategory: false,
          subCategories: [
            {
              title: 'Analytics',
              link: '/dashboard/inventory/',
            },
            {
              title: 'Create Product',
              link: '/dashboard/inventory/new-product',
            },
            {
              title: 'Suppliers',
              link: '/dashboard/inventory/suppliers',
            },
            {
              title: 'Recieved Goods',
              link: '/dashboard/inventory/goods-recieve-note',
            },
            {
              title: 'Issue Products',
              link: '/dashboard/inventory/issue-products',
            },
          ],
        },
        {
          title: 'Vehicle',
          icon: VehicleIcon,
          link: '#',
          showSubCategory: false,
          subCategories: [
            {
              title: 'All Vehicles',
              link: '/dashboard/vehicles/',
            },
            {
              title: 'Route Plan',
              link: '/dashboard/vehicles/route-plan',
            },
            {
              title: 'Corrective Maintenance Requests',
              link: '#',
            },
            {
              title: 'Pre-Inspection Maintenance',
              link: '/dashboard/cylinders/pre-inspection-maintenance',
            },
          ],
        },
        {
          title: 'Reports',
          icon: ReportIcon,
          link: '#',
          showSubCategory: false,
          subCategories: [
            {
              title: 'All Reports',
              link: '/dashboard/reports/',
            },
            {
              title: 'Inventory Mgt. Report',
              link: '/dashboard/reports/inventory',
            },
            {
              title: 'Cylinder Mgt. Report',
              link: '/dashboard/reports/cylinder',
            },
            {
              title: 'Vehicle Performance',
              link: '/dashboard/vehicles/vehicle-performance',
            },
          ],
        },
        {
          title: 'Drivers',
          icon: DriverIcon,
          link: '/dashboard/drivers',
        },
        logout,
      ],
      sales: [
        dashboard,
        {
          title: 'Cylinders',
          icon: CylinderIcon,
          link: '#',
          showSubCategory: false,
          subCategories: [
            {
              title: 'Register',
              link: '#',
              showSubCategory: false,
              subCategories: [
                {
                  title: "Customer's Cylinders",
                  link: '#',
                },
              ],
            },
            {
              title: 'Transfer',
              link: '/dashboard/cylinders/transfer-list',
            },
            {
              title: 'Pending Transfer List',
              link: '#',
              showSubCategory: false,
              subCategories: [
                {
                  title: 'Outright Sales/Transfer',
                  link: '#',
                },
                {
                  title: 'Condemned Cylinders',
                  link: '/dashboard/cylinders/condemn-cylinder',
                },
                {
                  title: 'Cylinder Type Change',
                  link: '/dashboard/cylinders/cylinder-type',
                },
              ],
            },
            {
              title: 'Cylinder Pool',
              link: '/dashboard/cylinders/',
            },
          ],
        },
        {
          title: 'Sales Orders',
          icon: CalendarIcon,
          link: '#',
          showSubCategory: false,
          subCategories: [
            {
              title: 'Customers',
              link: '/dashboard/customers/',
            },
            {
              title: 'Incoming',
              link: '#',
              showSubCategory: false,
              subCategories: [
                {
                  title: 'Walk-in Customers',
                  link: '#',
                },
                {
                  title: 'Driver Pick-ups',
                  link: '#',
                },
                {
                  title: 'Suppliers',
                  link: '#',
                },
              ],
            },
            {
              title: 'Sales Requisition',
              link: '#',
              showSubCategory: false,
              subCategories: [
                {
                  title: 'Customers Cylinders',
                  link: '#',
                },
                {
                  title: 'Company Cylinders',
                  link: '#',
                },
              ],
            },
            {
              title: 'Outgoing',
              link: '#',
              showSubCategory: false,
              subCategories: [
                {
                  title: 'Delivery Waybill',
                  link: '#',
                },
              ],
            },
          ],
        },
        {
          title: 'Inventory',
          icon: InventoryIcon,
          link: '#',
          showSubCategory: false,
          subCategories: [
            {
              title: 'Recieved Goods',
              link: '/dashboard/inventory/goods-recieve-note',
            },
            {
              title: 'Issue Products',
              link: '/dashboard/inventory/issue-products',
            },
          ],
        },
        {
          title: 'Purchase Orders',
          icon: InventoryIcon,
          link: '/dashboard/purchase-orders',
          showSubCategory: false,
          subCategories: [
            {
              title: 'All Orders',
              link: '/dashboard/purchase-orders',
            },
            {
              title: 'Suppliers',
              link: '/dashboard/inventory/suppliers',
            },
          ],
        },
        {
          title: 'Production Scheduling',
          icon: TimerIcon,
          link: '#',
          showSubCategory: false,
          subCategories: [
            {
              title: 'ERC List',
              link: '/dashboard/production/ecr-list',
            },
            {
              title: 'Production Schedule',
              link: '/dashboard/production/production-schedule',
            },
            {
              title: 'Production Delivery',
              link: '#',
              showSubCategory: false,
              subCategories: [
                {
                  title: 'Filled',
                  link: '#',
                },
                {
                  title: 'Work-in Progress',
                  link: '#',
                },
                {
                  title: 'Faulty',
                  link: '#',
                },
              ],
            },
            {
              title: 'Production Pool',
              link: '#',
            },
          ],
        },
        {
          title: 'Cylinder Maintenance',
          icon: CylinderMaintenanceIcon,
          link: '#',
          showSubCategory: false,
          subCategories: [
            {
              title: 'Faulty Cylinders',
              link: '#',
            },
            {
              title: 'Maintain Cylinders',
              link: '#',
            },
          ],
        },
        {
          title: 'Complaints',
          icon: UserIcon,
          link: '#',
          showSubCategory: false,
          subCategories: [
            {
              title: 'All Complaints',
              link: '/dashboard/complaints',
            },
            {
              title: 'Notification',
              link: '#',
            },
            {
              title: 'Resolve',
              link: '#',
            },
          ],
        },
        {
          title: 'Vehicle',
          icon: VehicleIcon,
          link: '#',
          showSubCategory: false,
          subCategories: [
            {
              title: 'All Vehicles',
              link: '/dashboard/vehicles/',
            },
            {
              title: 'Route Plan',
              link: '/dashboard/vehicles/route-plan',
            },
            {
              title: 'Vehicle Maintenance',
              link: '#',
              showSubCategory: false,
              subCategories: [
                {
                  title: 'Pre-inspection Maintenance',
                  link: '/dashboard/vehicles/pre-inspection-maintenance',
                },
                {
                  title: 'Corrective Maintenance Requests',
                  link: '#',
                },
              ],
            },
          ],
        },
        {
          title: 'Reports',
          icon: ReportIcon,
          link: '#',
          showSubCategory: false,
          subCategories: [
            {
              title: 'All Reports',
              link: '/dashboard/reports/',
            },
            {
              title: 'Vehicle Performance',
              link: '/dashboard/vehicles/vehicle-performance',
            },
          ],
        },
        logout,
      ],
    }

    return {
      showRegiserCylinder,
      showRegiserCylinderType,
      roleNavigations,
      toggleComponent,
    }
  },
})
</script>
