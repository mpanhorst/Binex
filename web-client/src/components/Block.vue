<template>
  <div
    class="block-real"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    @click="selectBlock"
    :class="{ active: isActive, hovered: isHovered }"
  >
    <!-- Schattenblock hinzufügen -->
    <div class="block-shadow"></div>

    <!-- Eigentlicher Blockinhalt -->
    <div class="block-content-wrapper">
      <div class="block-number">
        {{ blockNumber }}
      </div>
      <div class="block-content">
        <div class="block-title">
          {{ title }}
        </div>
        <div class="block-description">
          {{ description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface BlockProps {
  title: string
  description: string
  blockNumber: number | null
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<BlockProps>()

const isHovered = ref(false)
const isActive = ref(false)

const selectBlock = () => {
  isActive.value = !isActive.value
  // emit('select', blockId)
}
</script>

<style scoped>
.block-real {
  width: 150px;
  height: 150px;
  background-color: #30363d;
  border: 1px #30363d solid;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 194, 255, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
}

.block-shadow {
  position: absolute;
  top: -10px;
  right: -18px;
  width: 100%;
  height: 100%;
  background-color: rgba(48, 54, 61, 0.4);
  border-radius: 8px;
  z-index: -20;
  transition: none;
  transform: scale(1.05);
}

.block-content-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #30363d;
  border-radius: 8px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.block-number {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 0.8rem;
  color: #888888;
  display: flex;
  align-items: center;
  justify-content: center;
}

.block-content {
  text-align: center;
}

.block-title {
  font-size: 1.2rem;
  color: #ffffff;
}

.block-description {
  font-size: 0.9rem;
  color: #888888;
}

.block-real:hover .block-content-wrapper {
  transform: scale(1.1);
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0, 194, 255, 0.5);
}

.block-real.active .block-content-wrapper {
  transform: scale(1.15);
  border-radius: 8px;
  box-shadow: 0 0 25px rgba(0, 194, 255, 1);
}
</style>
