export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  loading: {
    color: 'black',
    height: '10px',
    continuous: true,
    duration: 3000,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Air Separation',
    htmlAttrs: {
      lang: 'en',
    },
    env: {
      paginationLimit: 10,
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    head: {
      script: [{
        src: "JsBarcode.all.min.js",
      }],
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/transitions.css', '~/assets/webfonts/stylesheet.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/axios'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api/module',
    'pinia/nuxt',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/toast',
  ],
  router: {
    linkExactActiveClass: 'text-white',
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://asnl.natterbase.com',
  },
  toast: {
    position: 'top-right',
    duration: 3000,
    theme: 'bubble',
    register: [
      {
        name: 'required',
        message: 'All Fields are Required',
        options: {
          type: 'error',
        },
      },
    ],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  generate: {
    interval: 2000,
  },
}
