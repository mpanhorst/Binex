<template>
  <div class="home-layout">
    <navbar />
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
  text-align: center;
  width: 100%;
}

.home-header h1 {
  font-size: 3rem; /* Größere Schriftgröße */
  margin-bottom: 20px;
}

.home-header p {
  font-size: 1.5rem; /* Größere Schriftgröße */
  color: #ccc;
}

.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
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
