<template>
  <div class="grid grid-rows-1 lg:grid-cols-5 w-full py-6 px-6 gap-4 h-screen">
    <div class="lg:col-span-2 bg-white px-6 py-4 h-full">
      <h1
        class="
          inline-block
          text-2xl
          font-medium
          border-b-2 border-btn-purple
          mb-4
        "
      >
        User Details
      </h1>

      <div class="w-full px-4 py-10 space-y-2 border-b-2 border-gray-200">
        <div class="w-full">
          <div class="h-40 w-40 mx-auto">
            <img
              class="w-full"
              src="@/assets/images/default-avatar.jpg"
              alt=""
            />
          </div>
        </div>
        <div class="w-full">
          <h2
            v-if="user"
            class="
              text-center text-2xl text-black
              font-medium
              tracking-wider
              capitalize
            "
          >
            {{ user['name'] | isValue }}
          </h2>
        </div>
        <div v-if="user" class="w-full">
          <p class="text-center space-x-2 capitalize">
            <span class="text-black">{{ user['role'] }} Department</span>
            <span class="text-btn-purple">{{ user['subrole'] }}</span>
          </p>
        </div>
      </div>

      <div class="py-8 space-y-4">
        <h1 class="inline-block text-xl font-medium">Contact Information</h1>

        <div class="space-y-1">
          <p class="text-gray-400 capitalize">Full Name</p>
          <p v-if="user" class="text-black capitalize">
            {{ user['name'] | isValue }}
          </p>
        </div>
        <div class="space-y-1">
          <p class="text-gray-400 capitalize">Email Address</p>
          <p v-if="user" class="text-black">{{ user['email'] | isValue }}</p>
        </div>
        <div class="space-y-1">
          <p class="text-gray-400 capitalize">Phone Number</p>
          <p v-if="user" class="text-black">
            {{ user['phoneNumber'] | isValue }}
          </p>
        </div>
      </div>
    </div>
    <div class="lg:col-span-3 bg-white px-6 py-4">
      <h1
        class="
          inline-block
          text-2xl
          font-medium
          border-b-2 border-btn-purple
          mb-4
        "
      >
        Activity Logs
      </h1>
      <div class="space-y-6">
        <div v-for="(log, i) in logs" :key="i">
          <p class="text-md text-black font-light">
            {{ log.activity }}
          </p>
          <p class="text-gray-700 text-sm font-thin">
            {{ getTimeDifference(log.time) }} ago
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  onMounted,
  ref,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'
import { UserController } from '@/module/User'
import datetimeDifference from 'datetime-difference'

export default defineComponent({
  name: 'Profile',
  filters: {
    isValue(value: string) {
      let result: string
      if (value) {
        result = value
      } else {
        result = 'Not Specified By User'
      }

      return result
    },
  },
  layout: 'dashboard',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const userId = route.value.params.id
    const email = route.value.params.email

    const user = ref()
    const logs = ref([])
    onBeforeMount(() => {
      if (!userId || !email) {
        router.push('/user-management/')
      }
    })

    onMounted(() => {
      UserController.getUser(userId, email).then((response) => {
        user.value = response.data.data
      })

      UserController.fetchActivityLogs(userId).then((response) => {
        logs.value = response.data.data.activities
      })
    })

    function getTimeDifference(date: Date) {
      const now = new Date()
      const past = new Date(date)
      const difference = datetimeDifference(now, past)
      let result: String = ''

      if (difference.years) {
        result += `${difference.years} years, `
      }

      if (difference.months) {
        result += `${difference.months} months, `
      }

      if (difference.days) {
        result += `${difference.days} days, `
      }

      if (difference.hours) {
        result += `${difference.hours} hours, `
      }

      if (difference.minutes) {
        result += `${difference.minutes} minutes `
      }

      return result
    }

    return {
      user,
      logs,
      getTimeDifference,
    }
  },
})
</script>
