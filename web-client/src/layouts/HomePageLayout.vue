<template>
  <div class="home-layout">
    <navbar />
    <header class="home-header">
      <h1>{{ $t('home.title') }}</h1>
      <p>{{ $t('home.subtitle') }}</p>
    </header>
    <div class="home-container">
      <button @click="goToNfts" class="cta-button">
        {{ $t('home.goToNfts') }}
      </button>
    </div>
    <block-chain-navigation />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import BlockChainNavigation from '@/components/BlockChainNavigation.vue'
import { useRouter } from 'vue-router'
import { ROUTE_NAMES } from '@/enums'

const router = useRouter()

const goToNfts = () => {
  router.push({ name: ROUTE_NAMES.nfts })
}
</script>

<style scoped>
.home-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
}

.home-header {
  margin-bottom: 40px;
}

.home-header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.home-header p {
  font-size: 1.2rem;
  color: #666;
}

.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.cta-button {
  padding: 15px 30px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.cta-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.cta-button:active {
  background-color: #003f7f;
  transform: scale(1);
}
</style>
