<template>
  <div class="w-full sm:w-full md:w-3/5">
    <div>
      <div class="text-center">
        <h1 class="font-bold text-2xl">Complete your Account Setup</h1>
      </div>
      <div class="text-center">
        <span class="font-thin text-md text-gray-400"
          >Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </span>
      </div>
    </div>
    <form class="mt-2 px-4" autocomplete="off">
      <div class="grid grid-rows-1 md:grid-cols-2 sm:gap-y-4 md:gap-x-4">
        <Input
          :input-placeholder="'Durodola Caroline'"
          :label-title="'Full Name'"
          @get="form.name = $event.value"
        />
        <Input
          :input-placeholder="'Email Address'"
          :label-title="'Email Address'"
          :default-value="form.email"
          @get="form.email = $event.value"
        />
        <select-input
          :label-title="'Gender'"
          :select-array="genders"
          :default-option-text="'Select a Gender'"
          @get="form.gender = $event.value"
        />
        <Input
          :input-placeholder="'Enter Phone Number'"
          :label-title="'Phone Number'"
          @get="form.phoneNumber = $event.value"
        />
        <Input
          :input-placeholder="'Enter Location'"
          :label-title="'Location'"
          @get="form.location = $event.value"
        />
      </div>
      <div class="w-full mt-2">
        <div class="w-full sm:w-full md:w-1/3 mx-auto">
          <Button
            :button-text="'Update Profile'"
            :loading-status="loading"
            :button-class="'bg-gray-400 text-white'"
            @buttonClicked="updateProfile"
          />
        </div>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  useContext,
  useRouter,
} from '@nuxtjs/composition-api'
import Input from '@/components/Form/Input.vue'
import SelectInput from '@/components/Form/Select.vue'
import Button from '@/components/Form/Button.vue'
import { UserController } from '@/module/User'
import { mainStore } from '~/module/Pinia'
export default defineComponent({
  name: 'Landing',
  components: { Input, Button, SelectInput },
  layout: 'auth',
  setup() {
    const genders = [
      { name: 'Male', value: 'male' },
      { name: 'Female', value: 'female' },
    ]
    const appStore = mainStore()

    const context = useContext()
    const router = useRouter()
    const user: any = appStore.getLoggedInUser

    const form = reactive({
      email: user.email ?? '',
      name: '',
      gender: '',
      phoneNumber: '',
      location: '',
    })

    const loading = ref(false)

    const updateProfile = () => {
      if (
        !form.email ||
        !form.name ||
        !form.gender ||
        !form.phoneNumber ||
        !form.location
      ) {
        context.$toast.global.required()
      } else {
        loading.value = true
        UserController.updateUser(form, user._id)
          .then(() => {
            UserController.getUser(user._id, form.email).then(
              (response: any) => {
                appStore.saveUser(response.data.data)
                router.push('/dashboard')
              }
            )
          })
          .finally(() => {
            loading.value = false
          })
      }
    }

    return {
      genders,
      form,
      loading,
      updateProfile,
    }
  },
})
</script>
