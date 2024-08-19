<template>
  <div class="default-layout">
    <navbar />
    <main class="content">
      <router-view />
    </main>
    <footer />
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
/* eslint-enable @typescript-eslint/no-unused-vars */
</script>

<style scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
