import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'spa',
  server: {
    port: 3000, // 默认: 3000
    host: '0.0.0.0', // 默认: localhost
    timing: { // 直接跟踪服务器端渲染所花费的全部时间
      total: true
    }
  },
  router: {
    base: '/app/'
  },
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Global middleware
  */
  router: {
    middleware: 'auth'
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/toast'
  ],
  /*
  ** toast configuration
  */
  toast: {
    duration: 1000,
    position: 'top-center',
    register: [ // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true,
    // baseURL: 'http://localhost:3001/api',
    // prefix: '/api/',
    // credentials: true
  },
  /*
  ** Proxy module configuration
  ** See https://axios.nuxtjs.org/ https://zh.nuxtjs.org/faq/http-proxy https://github.com/nuxt-community/proxy-module
  */
  proxy: {
    '/api/auth': {
      target: 'http://localhost:3001/api/auth',
      pathRewrite: {
        '^/api/auth': '/',
        changeOrigin: true
      }
    },
    '/api/rest': {
      target: 'http://localhost:3001/api/rest',
      pathRewrite: {
        '^/api/rest': '/',
        changeOrigin: true
      }
    },
    '/api/file': {
      target: 'http://localhost:3001/api/file',
      pathRewrite: {
        '^/api/file': '/',
        changeOrigin: true
      }
    },
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
