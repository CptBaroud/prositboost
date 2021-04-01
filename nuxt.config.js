import colors from 'vuetify/es5/util/colors'

export default {
  env: {
    baseUrl: 'http://localhost:8000',
    api_url: 'http://localhost:3000'
  },

  server: {
    port: 8000 // par défaut: 3000
  },

  router: {
    middleware: ['auth']
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - prositboost',
    title: 'prositboost',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://go.nuxtjs.dev/auth
    '@nuxtjs/auth',
    // Socket
    'nuxt-socket-io',
    // Plugin pour les notifs
    'vue-toastification/nuxt'
  ],

  // Socket.io
  io: {
    // module options
    sockets: [
      {
        name: 'main',
        url: 'http://localhost:3000/',
        default: true
      }
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    baseURL: 'http://localhost:3000'
  },

  /*
  ** Auth module configuration
  ** See https://axios.nuxtjs.org/options
  */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/login/', method: 'post', propertyName: 'token' },
          logout: { url: '/login/', method: 'delete' },
          user: { url: '/users/getuser', method: 'get', propertyName: 'user' }
        },
        // tokenRequired: true,
        tokenType: ''
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      user: '/profile',
      callback: '/login'
    }
  },

  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      options: {
        customProperties: true
      },
      dark: true,
      themes: {
        dark: {
          background: '#1C1C1E',
          secondary: '#242426',
          primary: '#E44634',
          accent: '#EA6D5D',
          text: '#F9F9FB',
          text_light: '#1C1C1E',
          text_dark: '#F9F9FB',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          prussianBlue: '#1D3557',
          steelBlue: '#457B9D',
          smokyBlack: '#121212',
          pantoneGreen: '#53A548'
        },
        light: {
          background: '#F9F9FB',
          secondary: '#FFFFFF',
          primary: '#E44634',
          accent: '#EA6D5D',
          text: '#1C1C1E',
          text_light: '#1C1C1E',
          text_dark: '#F9F9FB',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          prussianBlue: '#1D3557',
          steelBlue: '#457B9D',
          smokyBlack: '#121212',
          pantoneGreen: '#53A548'
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
