export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules:['@pinia/nuxt'],
  runtimeConfig: {
    // Private keys (only available on server)
    jwtSecret: process.env.JWT_SECRET,
    
    // Public keys (available on both client and server)
    public: {
      apiBase: '/api'
    }
  }
})
