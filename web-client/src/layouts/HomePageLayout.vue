<template>
  <div class="svg-background-top">
    <div class="icon key-icon"></div>
    <div class="icon hexagon-icon"></div>
    <div class="icon blockchain-icon"></div>
    <div class="icon ethereum-icon"></div>
  </div>
  <div class="svg-background-bottom">
    <div class="icon gear-icon"></div>
    <div class="icon security-icon"></div>
    <div class="icon bitcoin-icon"></div>
  </div>
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
  position: relative;
}

.svg-background-top {
  position: fixed;
  top: 4%;
  right: 5%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: right;
  width: auto;
  height: auto;
  pointer-events: none;
  z-index: 0;
}

.svg-background-bottom {
  position: fixed;
  top: 6%;
  right: 5%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: right;
  width: auto;
  height: auto;
  pointer-events: none;
  z-index: 0;
}

/* Grundstil für Icons */
.icon {
  width: 140px;
  height: 140px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transition: transform 0.3s;
  filter: brightness(0.8) saturate(0.8);
}

/* Spezifische Klassen für Drehungen und Positionen */
.key-icon {
  background-image: url('@/assets/background-icon-key.svg');
  transform: rotate(15deg);
  margin-top: -200px;
  width: 180px;
  height: 180px;
}

.bitcoin-icon {
  background-image: url('@/assets/background-icon-bitcoin.svg');
  transform: rotate(-10deg);
  margin-top: 500px;
  margin-right: -40px;
  width: 180px;
  height: 180px;
}

.blockchain-icon {
  background-image: url('@/assets/background-icon-blockchain.svg');
  transform: rotate(5deg);
  margin-top: 50px;
  margin-right: -40px;
  width: 230px;
  height: 230px;
}

.ethereum-icon {
  background-image: url('@/assets/background-icon-ethereum.svg');
  transform: rotate(-20deg);
  margin-top: 200px;
  margin-right: -100px;
}

.gear-icon {
  background-image: url('@/assets/background-icon-gear.svg');
  transform: rotate(25deg);
  margin-top: 100px;
  margin-right: -320px;
  width: 160px;
  height: 160px;
}

.security-icon {
  background-image: url('@/assets/background-icon-security.svg');
  transform: rotate(-15deg);
  margin-top: 300px;
  margin-right: -100px;
  width: 230px;
  height: 230px;
}

.hexagon-icon {
  background-image: url('@/assets/background-icon-hexagon.svg');
  transform: rotate(10deg);
  margin-top: -230px;
  margin-right: -280px;
  width: 200px;
  height: 200px;
}
</style>
