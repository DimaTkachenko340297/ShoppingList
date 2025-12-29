<template>
  <div class="app-shell d-flex flex-column">
    <AppHeader />

    <main class="container py-4 flex-grow-1">
      <router-view />
    </main>

    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'

export default {
  name: 'App',
  components: {
    AppFooter,
    AppHeader
  }
}
</script>