<template>
  <div>
    <!-- Animated Block Segment -->
    <div v-if="!isCompleted" class="animated-block">
      <div
        v-for="n in [...Array(totalSteps).keys()].reverse()"
        :key="n"
        :class="[
          'block-segment',
          {
            active: n < currentStep,
            'corner-bottom-right': n === 0,
            'corner-bottom-left': n === 9,
            'corner-top-right': n === 90,
            'corner-top-left': n === 99,
          },
        ]"
      ></div>
    </div>

    <!-- Real Block After Animation Completes -->
    <block
      v-else
      class="block"
      title="New"
      description="A new block"
      :block-number="315"
    ></block>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue'
import Block from '@/components/Block.vue'

// Event Emitter definieren
const emit = defineEmits(['restartAnimation'])

const totalSteps = 100
const currentStep = ref(0)
const isCompleted = ref(false)

const startAnimation = () => {
  currentStep.value = 0
  isCompleted.value = false

  const interval = setInterval(() => {
    currentStep.value++
    if (currentStep.value > totalSteps) {
      clearInterval(interval)
      isCompleted.value = true

      setTimeout(() => {
        isCompleted.value = false
        emit('restartAnimation') // Event auslösen
        startAnimation()
      }, 5000)
    }
  }, 100)
}

onMounted(() => {
  startAnimation()
})
</script>

<style scoped>
.animated-block {
  display: flex;
  flex-wrap: wrap;
  width: 150px;
  height: 150px;
  background: var(--app-bg);
  justify-content: center;
  align-items: center;
}

.block-segment {
  width: 15px;
  height: 15px;
  opacity: 0;
  transition: opacity 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.block-segment.active {
  opacity: 1;
  background-color: #1c1c1e;
}

.block-segment.corner-top-left {
  border-top-left-radius: 8px;
}

.block-segment.corner-top-right {
  border-top-right-radius: 8px;
}

.block-segment.corner-bottom-left {
  border-bottom-left-radius: 8px;
}

.block-segment.corner-bottom-right {
  border-bottom-right-radius: 8px;
}
</style>
