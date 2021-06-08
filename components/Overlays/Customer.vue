<template>
  <back-drop>
    <div class="w-full h-full bg-gray-200 relative pt-8 px-10">
      <svg
        class="
          w-6
          h-6
          fill-current
          text-gray-400
          absolute
          top-0
          right-0
          mr-10
          mt-6
        "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        @click="close"
      >
        <path
          d="M2.93 17.07A10 10 0 1117.07 2.93 10 10 0 012.93 17.07zM11.4 10l2.83-2.83-1.41-1.41L10 8.59 7.17 5.76 5.76 7.17 8.59 10l-2.83 2.83 1.41 1.41L10 11.41l2.83 2.83 1.41-1.41L11.41 10z"
        />
      </svg>

      <div class="flex items-start space-x-4">
        <div class="flex-initial">
          <svg
            class="
              text-purple-600
              mr-3
              h-10
              w-10
              fill-current
              bg-purple-200
              rounded-full
              p-2
            "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 452.608 452.608"
          >
            <path
              d="M285.184 92.672V63.488h6.656c17.408 0 31.744-14.336 31.744-31.744S309.248 0 291.84 0H160.768c-17.408 0-31.744 14.336-31.744 31.744s14.336 31.744 31.744 31.744h6.656v29.184c-38.912 2.56-69.12 34.816-69.12 73.728v80.384h256V166.4c0-38.912-30.208-71.168-69.12-73.728zm-25.6-.512h-20.48V80.896h-25.6V92.16h-20.48V62.976h66.56V92.16zM98.304 272.384v81.92c0 28.16 15.872 53.76 40.96 66.56v31.744h174.08v-31.744c25.088-12.8 40.96-38.4 40.96-66.56v-81.92h-256z"
            />
          </svg>
        </div>
        <div class="flex-1">
          <h3 class="font-semibold text-lg">Lagos State Teaching Hospital</h3>
          <span class="font-medium text-sm"
            >2, Herbert Macauly Way, Yaba, Lagos</span
          >
          <div class="w-full flex justify-between items-center mt-3">
            <button
              class="
                flex
                justify-between
                space-x-2
                items-center
                bg-gray-300
                px-3
                py-2
                rounded-sm-md
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="fill-current text-gray-500 w-6 h-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                />
                <path
                  d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                /></svg
              ><span>gas@luth.org</span>
            </button>
            <button
              class="
                flex
                justify-between
                space-x-2
                items-center
                bg-gray-300
                px-3
                py-2
                rounded-sm-md
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="fill-current text-gray-500 w-6 h-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                /></svg
              ><span>09085678987</span>
            </button>
            <button
              v-if="sections.cylinder"
              class="
                bg-purple-600
                text-white
                rounded-sm-md
                px-6
                py-2
                font-medium
              "
            >
              Add Cylinder
            </button>
            <button
              v-else-if="sections.pickup || sections.pickupForm"
              class="
                bg-purple-600
                text-white
                rounded-sm-md
                px-6
                py-2
                font-medium
              "
              @click="changeSection('pickupForm')"
            >
              Request Pickup
            </button>
            <button
              v-else-if="sections.complaint || sections.complaintForm"
              class="
                bg-purple-600
                text-white
                rounded-sm-md
                px-6
                py-2
                font-medium
              "
              @click="changeSection('complaintForm')"
            >
              Create Complaint
            </button>
            <button
              v-else
              class="
                bg-purple-600
                text-white
                rounded-sm-md
                px-6
                py-2
                font-medium
              "
            >
              Create Order
            </button>
          </div>
        </div>
      </div>

      <div class="flex justify-between items-center mt-8 px-2 text-lg mb-4">
        <button
          :class="
            sections.profile ? ' border-0 border-b-2 border-purple-500' : ''
          "
          class="focus:outline-none"
          @click="changeSection('profile')"
        >
          Profile
        </button>
        <button
          :class="
            sections.order ? ' border-0 border-b-2 border-purple-500' : ''
          "
          class="focus:outline-none"
          @click="changeSection('order')"
        >
          Order History
        </button>
        <button
          :class="
            sections.transaction ? ' border-0 border-b-2 border-purple-500' : ''
          "
          class="focus:outline-none"
          @click="changeSection('transaction')"
        >
          Transaction
        </button>
        <button
          :class="
            sections.complaint || sections.complaintForm
              ? ' border-0 border-b-2 border-purple-500'
              : ''
          "
          class="focus:outline-none"
          @click="changeSection('complaint')"
        >
          Complaint
        </button>
        <button
          :class="
            sections.pickup || sections.pickupForm
              ? ' border-0 border-b-2 border-purple-500'
              : ''
          "
          class="focus:outline-none"
          @click="changeSection('pickup')"
        >
          Pick up
        </button>
        <button
          :class="
            sections.cylinder ? ' border-0 border-b-2 border-purple-500' : ''
          "
          class="focus:outline-none"
          @click="changeSection('cylinder')"
        >
          Cylinders
        </button>
      </div>

      <section v-if="sections.profile" class="w-full bg-white px-4 py-4">
        <div
          v-for="(profileDetail, index) in profile"
          :key="index"
          class="w-full grid grid-cols-3 gap-x-6 items-center py-3.5"
          :class="index % 2 == 1 ? ' bg-transparent' : ' bg-indigo-100'"
        >
          <div class="col-span-1 text-right font-semibold text-md">
            {{ profileDetail.title }}:
          </div>
          <div class="col-span-2">{{ profileDetail.value }}</div>
        </div>
      </section>

      <section v-if="sections.order" class="w-full space-y-3">
        <div
          class="flex justify-between items-center w-full bg-white px-4 py-3"
        >
          <span>Order ASORO985</span>
          <span class="text-gray-500 bg-gray-200 rounded-sm-sm px-4 py-2"
            >Pending</span
          >
          <span>01 Aug 2019. 04:55pm</span>
        </div>

        <div
          class="flex justify-between items-center w-full bg-white px-4 py-3"
        >
          <span>Order ASORO985</span>
          <span class="text-green-500 bg-green-100 rounded-sm-sm px-4 py-2"
            >Delivered</span
          >
          <span>01 Aug 2019. 04:55pm</span>
        </div>
      </section>

      <section v-if="sections.pickup" class="w-full space-y-3">
        <div
          class="flex justify-between items-center w-full bg-white px-4 py-3"
        >
          <span>#PU2323221</span>
          <span class="text-gray-500 bg-gray-200 rounded-sm-sm px-4 py-2"
            >Pending</span
          >
          <span>01 Aug 2019. 04:55pm</span>
        </div>

        <div
          class="flex justify-between items-center w-full bg-white px-4 py-3"
        >
          <span>#PU2323221</span>
          <span class="text-green-500 bg-green-100 rounded-sm-sm px-4 py-2"
            >Delivered</span
          >
          <span>01 Aug 2019. 04:55pm</span>
        </div>
      </section>

      <section v-if="sections.transaction" class="w-full space-y-3">
        <div
          class="flex justify-between items-center w-full bg-white px-4 py-3"
        >
          <span>#2323221</span>
          <span class="text-gray-500 bg-gray-200 rounded-sm-sm px-4 py-2"
            >Pending</span
          >
          <span>01 Aug 2019. 04:55pm</span>
        </div>

        <div
          class="flex justify-between items-center w-full bg-white px-4 py-2"
        >
          <span>#2323221</span>
          <span class="text-green-500 bg-green-100 rounded-sm-sm px-4 py-2"
            >Delivered</span
          >
          <span>01 Aug 2019. 04:55pm</span>
        </div>
      </section>

      <section v-if="sections.complaint" class="w-full space-y-3">
        <div
          v-for="(accordion, index) in accordions"
          :key="index"
          class="w-full bg-white px-3 py-2"
          @click="toggleAccordion(index)"
        >
          <button
            class="
              flex
              justify-between
              items-center
              w-full
              px-4
              py-3
              focus:outline-none
            "
          >
            <span>{{ accordion.title }}</span>
            <span :class="accordion.class" class="trounded-sm px-4 py-2">{{
              accordion.status
            }}</span>
            <span>01 Jul 2019. 03:05am</span>
          </button>
          <div
            v-if="accordion.show"
            class="border-0 border-t-2 border-gray-300 py-2"
          >
            <p>
              {{ accordion.body }}
            </p>
          </div>
        </div>
      </section>

      <section v-if="sections.pickupForm" class="w-full space-y-3">
        <div class="bg-white px-8 py-4">
          <div
            class="
              flex
              justify-between
              items-center
              border-0 border-b border-gray-400
              py-3
            "
          >
            <h2 class="font-semibold text-black text-lg">Request Pickup</h2>
            <button
              class="
                text-sm
                border border-purple-600
                rounded-sm-sm
                px-4
                py-2
                text-purple-500
              "
              @click="changeSection('pickup')"
            >
              Pickup List
            </button>
          </div>

          <div class="my-6">
            <div class="w-1/2">
              <input-component
                :label-title="'Select Pickup Date'"
                :input-type="'date'"
                :input-placeholder="'Select Pickup Date'"
              />

              <input-component
                :label-title="'Number of Cylinders'"
                :input-placeholder="'Number of Cylinders'"
              />

              <select-component
                :label-title="'Pickup Type'"
                :select-array="[]"
                :default-option-text="'Select Pickup Type'"
              />

              <button-component
                :button-class="'bg-purple-600 text-white rounded-sm-sm'"
                :button-text="'Request Pickup'"
              />
            </div>
          </div>
        </div>
      </section>

      <section v-if="sections.complaintForm" class="w-full space-y-3">
        <div class="bg-white px-8 py-4">
          <div
            class="
              flex
              justify-between
              items-center
              border-0 border-b border-gray-400
              py-3
            "
          >
            <h2 class="font-semibold text-black text-lg">New Complaint</h2>
            <button
              class="
                text-sm
                border border-purple-600
                rounded-sm-sm
                px-4
                py-2
                text-purple-500
              "
              @click="changeSection('complaint')"
            >
              Complaint List
            </button>
          </div>

          <div class="my-6">
            <div class="w-1/2">
              <input-component
                :label-title="'Complaint title'"
                :input-placeholder="'Enter Complaint title'"
              />

              <input-component
                :label-title="'Enter Issue'"
                :input-placeholder="'Enter Issue'"
              />

              <text-area-component
                :label-title="'Add Comment'"
                :input-placeholder="'Enter Comment'"
              />

              <button-component
                :button-class="'bg-purple-600 text-white rounded-sm-sm'"
                :button-text="'Request Pickup'"
              />
            </div>
          </div>
        </div>
      </section>

      <section v-if="sections.cylinder" class="w-full space-y-3">
        <filter-component />

        <div
          class="flex justify-between items-center w-full bg-white px-4 py-3"
        >
          <div class="flex items-center space-x-4">
            <span> Cylinder2-1 </span>
            <svg
              class="text-purple-600 mr-3 h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 452.608 452.608"
            >
              <path
                d="M285.184 92.672V63.488h6.656c17.408 0 31.744-14.336 31.744-31.744S309.248 0 291.84 0H160.768c-17.408 0-31.744 14.336-31.744 31.744s14.336 31.744 31.744 31.744h6.656v29.184c-38.912 2.56-69.12 34.816-69.12 73.728v80.384h256V166.4c0-38.912-30.208-71.168-69.12-73.728zm-25.6-.512h-20.48V80.896h-25.6V92.16h-20.48V62.976h66.56V92.16zM98.304 272.384v81.92c0 28.16 15.872 53.76 40.96 66.56v31.744h174.08v-31.744c25.088-12.8 40.96-38.4 40.96-66.56v-81.92h-256z"
              />
            </svg>
          </div>
          <span>Oxygen</span>
          <span>23kg</span>
          <div class="flex-initial icon-button">
            <button class="text-black w-6 h-6 relative">
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
                right-0
                -mb-32
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
                  hover:bg-purple-300
                  hover:text-purple-500
                  w-full
                  overflow-none
                "
              >
                View Details
              </button>
              <button
                class="
                  block
                  px-3
                  py-4
                  text-black
                  focus:outline-none
                  hover:bg-purple-300
                  hover:text-purple-500
                  w-full
                  overflow-none
                "
              >
                Remove
              </button>
            </div>
          </div>
        </div>
        <div
          class="flex justify-between items-center w-full bg-white px-4 py-3"
        >
          <div class="flex items-center space-x-4">
            <span> Cylinder2-1 </span>
            <svg
              class="text-gray-300 mr-3 h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 452.608 452.608"
            >
              <path
                d="M285.184 92.672V63.488h6.656c17.408 0 31.744-14.336 31.744-31.744S309.248 0 291.84 0H160.768c-17.408 0-31.744 14.336-31.744 31.744s14.336 31.744 31.744 31.744h6.656v29.184c-38.912 2.56-69.12 34.816-69.12 73.728v80.384h256V166.4c0-38.912-30.208-71.168-69.12-73.728zm-25.6-.512h-20.48V80.896h-25.6V92.16h-20.48V62.976h66.56V92.16zM98.304 272.384v81.92c0 28.16 15.872 53.76 40.96 66.56v31.744h174.08v-31.744c25.088-12.8 40.96-38.4 40.96-66.56v-81.92h-256z"
              />
            </svg>
          </div>
          <span>Oxygen</span>
          <span>23kg</span>
          <div class="flex-initial icon-button">
            <button class="text-black w-6 h-6 relative">
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
                right-0
                -mb-32
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
                  hover:bg-purple-300
                  hover:text-purple-500
                  w-full
                  overflow-none
                "
              >
                View Details
              </button>
              <button
                class="
                  block
                  px-3
                  py-4
                  text-black
                  focus:outline-none
                  hover:bg-purple-300
                  hover:text-purple-500
                  w-full
                  overflow-none
                "
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </back-drop>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import BackDrop from '@/components/Base/SecondBackDrop.vue'
import InputComponent from '@/components/Form/Input.vue'
import SelectComponent from '@/components/Form/Select.vue'
import ButtonComponent from '@/components/Form/Button.vue'
import TextAreaComponent from '@/components/Form/TextArea.vue'
import FilterComponent from '@/components/Base/Filter.vue'

export default defineComponent({
  components: {
    BackDrop,
    InputComponent,
    SelectComponent,
    ButtonComponent,
    TextAreaComponent,
    FilterComponent,
  },
  setup(_props, ctx) {
    const close = () => {
      ctx.emit('close')
    }

    const sections = ref<any>({
      profile: true,
      order: false,
      transaction: false,
      complaint: false,
      pickup: false,
      cylinder: false,
      pickupForm: false,
      complaintForm: false,
    })

    const accordions = ref([
      {
        title: 'Gas Issues Unresolved',
        status: 'Pending',
        class: 'text-red-400 bg-yellow-100',
        show: true,
        body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animisint atque tempore quia nisi, eum doloremque non voluptatum.Perspiciatis obcaecati nesciunt tempora dolores. Dicta ipsam admagni possimus fuga sequi?',
      },
      {
        title: 'Support Complain',
        status: 'Resolved',
        class: 'text-green-400 bg-green-100',
        show: false,
        body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animisint atque tempore quia nisi, eum doloremque non voluptatum.Perspiciatis obcaecati nesciunt tempora dolores. Dicta ipsam admagni possimus fuga sequi?',
      },
      {
        title: 'Delivery Complain',
        status: 'Resolved',
        class: 'text-green-400 bg-green-100',
        show: false,
        body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animisint atque tempore quia nisi, eum doloremque non voluptatum.Perspiciatis obcaecati nesciunt tempora dolores. Dicta ipsam admagni possimus fuga sequi?',
      },
    ])

    onMounted(() => {
      if (accordions.value.length) {
        accordions.value[0].show = true
      }
    })

    function toggleAccordion(index: number) {
      accordions.value.forEach((element, i) => {
        if (i !== index) element.show = false
      })
      accordions.value[index].show = !accordions.value[index].show
    }

    function changeSection(sectionName: string): void {
      for (const index in sections.value) {
        sections.value[index] = false
      }
      sections.value[sectionName] = true
    }

    const profile = [
      {
        title: 'Customer Name',
        value: 'Luth Martha',
      },
      {
        title: 'Email Address',
        value: 'gas.luth@gmail.com',
      },
      {
        title: 'Telephone No',
        value: '09034232342',
      },
      {
        title: 'Address',
        value: '2, Herbert Macauly Way, Yaba, Lagos',
      },
      {
        title: 'Name of Contact Person',
        value: 'Prince Oghene',
      },
      {
        title: 'R.C. Number',
        value: '342423',
      },
      {
        title: 'Tax I.D Number',
        value: '233232',
      },
      {
        title: 'Customer Type',
        value: 'Premium',
      },
      {
        title: 'Mode of Service',
        value: 'Premium',
      },
      {
        title: 'Territory',
        value: 'Premium',
      },
      {
        title: 'Cylinder Holding Time',
        value: 'Premium',
      },
      {
        title: 'Products',
        value: 'Premium',
      },
      {
        title: 'Unit Price',
        value: 'Premium',
      },
    ]

    return {
      close,
      profile,
      sections,
      changeSection,
      accordions,
      toggleAccordion,
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
