<template>
  <div class="home-layout">
    <navbar />
    <block-chain-navigation />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import BlockChainNavigation from '@/components/BlockChainNavigation.vue'
</script>

<style scoped>
.home-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
}
</style>
