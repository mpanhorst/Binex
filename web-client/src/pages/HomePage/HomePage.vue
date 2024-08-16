<template>
  <div class="home-container">
    <button @click="goToNfts">
      {{ $t('home.goToNfts') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ROUTE_NAMES } from '@/enums'

const router = useRouter()

const goToNfts = () => {
  router.push({ name: ROUTE_NAMES.nfts })
}
</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
