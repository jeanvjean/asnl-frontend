<template>
  <back-drop>
    <div class="w-1/5 bg-white rounded-sm px-4 py-4 text-black font-light">
      <div>
        <h1 class="text-xl font-medium">Delete User</h1>
        <span class="block text-md">Are you sure you want to delete</span>
      </div>
      <div
        class="
          flex
          space-x-4
          items-center
          w-full
          my-4
          px-2
          bg-gray-200
          py-2
          rounded-sm
        "
      >
        <img
          class="h-20 w-20 rounded-full"
          src="@/assets/images/default-avatar.jpg"
          alt=""
        />
        <div class="flex-1 capitalize">
          <h4>{{ user.name }}</h4>
          <p>
            <span>Role:</span> <span>{{ user.role }}</span>
          </p>
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <button-component
          :button-text="'Delete'"
          :loading-status="loading"
          :loading-text="loadingText"
          :button-class="'text-white bg-btn-purple'"
          @buttonClicked="deleteUser"
        />
        <button-component
          :button-text="'Cancel'"
          :button-class="'text-black bg-white border border-btn-purple'"
          @buttonClicked="close"
        />
      </div>
    </div>
  </back-drop>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import BackDrop from '@/components/Base/Backdrop.vue'
import ButtonComponent from '@/components/Form/Button.vue'
import { UserController } from '@/module/User'
export default defineComponent({
  components: { BackDrop, ButtonComponent },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup(_props, ctx) {
    const close = () => {
      ctx.emit('close')
    }
    const loading = ref(false)
    const loadingText = 'Deleting'
    const deleteUser = () => {
      loading.value = true
      UserController.deleteUser(_props.user.id)
        .then(() => {
          ctx.emit('refresh')
          close()
        })
        .finally(() => {
          loading.value = false
        })
    }
    return {
      close,
      loading,
      loadingText,
      deleteUser,
    }
  },
})
</script>
