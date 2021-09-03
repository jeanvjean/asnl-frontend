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

      <div class="w-full px-4 py-10 space-y-2 border-b-2 border-gray-200 my-10">
        <div class="w-full">
          <div class="w-full flex items-center justify-center">
            <div class="w-full flex justify-center items-center">
              <div class="relative">
                <img
                  v-if="userProfile.image"
                  class="h-40 w-40 rounded-full object-center object-cover"
                  :src="userProfile.image"
                  alt=""
                />
                <img
                  v-else
                  class="h-40 w-40 rounded-full object-center object-cover"
                  src="@/assets/images/default-avatar.jpg"
                  alt=""
                />
                <span
                  class="
                    bg-gray-700
                    text-white
                    px-2
                    py-3
                    absolute
                    bottom-1.5
                    rounded-md
                    left-1/2
                  "
                >
                  <label
                    title="Choose an Image"
                    for="file-upload"
                    class="cursor-pointer"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      class="w-3 h-3 fill-current"
                      fill="currentColor"
                    >
                      <path
                        d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z"
                      /></svg
                  ></label>
                </span>
              </div>
            </div>
          </div>
          <div
            v-if="userProfile.id === auth._id"
            class="w-full flex items-center justify-center space-x-3"
          >
            <span
              v-if="form.image"
              title="Remove Image"
              class="bg-red-600 text-white px-2 py-3 rounded-md"
              @click="removeImage()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                class="w-3 h-3 fill-current"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>

            <span
              v-if="form.image"
              title="Upload Image"
              class="bg-green-600 text-white px-2 py-3 rounded-md"
              @click="submit"
            >
              <svg
                v-if="loading"
                class="animate-spin w-3 h-3 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M14.66 15.66A8 8 0 1117 10h-2a6 6 0 10-1.76 4.24l1.42 1.42zM12 10h8l-4 4-4-4z"
                />
              </svg>

              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                class="w-3 h-3 fill-current"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>

            <input id="file-upload" type="file" @change="processFile($event)" />
          </div>
          <div class="text-center w-full">
            {{ form.image.name ? form.image.name : '' }}
          </div>
        </div>
        <div class="w-full">
          <h2
            class="
              text-center text-2xl text-black
              font-medium
              tracking-wider
              capitalize
            "
          >
            {{ userProfile.name | isValue }}
          </h2>
        </div>
        <div class="w-full">
          <p class="text-center space-x-2 capitalize">
            <span class="text-black">{{ userProfile.role }} Department</span>
            <span class="text-btn-purple">{{ userProfile.subrole }}</span>
          </p>
        </div>
      </div>

      <div class="py-8 space-y-4">
        <h1 class="inline-block text-xl font-medium">Contact Information</h1>

        <div class="space-y-1">
          <p class="text-gray-400 capitalize">Full Name</p>
          <p class="text-black capitalize">
            {{ userProfile.name | isValue }}
          </p>
        </div>
        <div class="space-y-1">
          <p class="text-gray-400 capitalize">Email Address</p>
          <p class="text-black">{{ userProfile.email | isValue }}</p>
        </div>
        <div class="space-y-1">
          <p class="text-gray-400 capitalize">Phone Number</p>
          <p class="text-black">
            {{ userProfile.phone | isValue }}
          </p>
        </div>
      </div>
    </div>
    <div class="lg:col-span-3 bg-white px-6 py-4 h-screen overflow-y-auto">
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
            {{ formatDate(log.time) }}
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
  reactive,
  ref,
  useRoute,
  useRouter,
} from '@nuxtjs/composition-api'
import { UserController } from '@/module/User'
import { mainStore } from '@/module/Pinia'

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
    const appStore = mainStore()
    const auth: any = appStore.getLoggedInUser

    const user = ref()
    const logs = ref([])
    onBeforeMount(() => {
      if (!userId || !email) {
        router.push('/user-management/')
      }
    })

    const userProfile = reactive({
      name: '',
      email: '',
      phone: '',
      role: '',
      subrole: '',
      image: '',
      id: userId,
    })

    const form = reactive({
      image: '',
    })

    function processFile(event: any) {
      const file = event.target.files[0]
      form.image = file
    }

    function removeImage() {
      form.image = ''
    }

    const loading = ref<Boolean>(false)

    const submit = () => {
      loading.value = true
      const formData = new FormData()
      formData.append('image', form.image)
      formData.append('name', auth.name)
      formData.append('email', auth.email)
      formData.append('location', auth.location)
      formData.append('gender', auth.gender)
      formData.append('phoneNumber', `+${auth.phoneNumber}`)

      UserController.updateUser(formData, auth._id)
        .then((response: any) => {
          form.image = ''
          appStore.saveUser(response.data.data)
          location.reload()
        })
        .catch(() => {})
        .finally(() => {
          loading.value = false
        })
    }

    onMounted(() => {
      UserController.getUser(userId, email).then((response) => {
        const userData = response.data.data
        userProfile.name = userData.name
        userProfile.email = userData.email
        userProfile.phone = userData.phoneNumber
        userProfile.role = userData.role
        userProfile.subrole = userData.subrole
        userProfile.image = userData.image
      })

      UserController.fetchActivityLogs(userId).then((response) => {
        logs.value = response.data.data.activities
      })
    })

    function formatDate(logDate: string) {
      const response = new Date(logDate)

      return response.toUTCString()
    }

    return {
      user,
      logs,
      auth,
      processFile,
      form,
      removeImage,
      submit,
      loading,
      userProfile,
      userId,
      formatDate,
    }
  },
})
</script>
<style scoped>
input[type='file'] {
  display: none;
}
</style>
