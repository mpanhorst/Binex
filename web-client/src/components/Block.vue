<template>
  <div
    class="block-real"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    @click="selectBlock"
    :class="{ active: isActive, hovered: isHovered }"
  >
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
.block {
  width: 150px;
  height: 150px;
  background-color: #30363d;
  border: 1px #30363d solid;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
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

.block:hover {
  transform: scale(1.15);
  box-shadow: 0 0 15px rgba(0, 194, 255, 0.5);
}

.block.active {
  transform: scale(1.2);
  box-shadow: 0 0 25px rgba(0, 194, 255, 1);
}
</style>
