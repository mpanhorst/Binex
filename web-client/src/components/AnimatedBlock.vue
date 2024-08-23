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
        :style="{
          transform: n < currentStep ? 'translateY(0)' : 'translateY(-50px)',
        }"
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
const finish = defineEmits(['finishAnimation'])

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
      finish('finishAnimation')

      setTimeout(() => {
        isCompleted.value = false
        emit('restartAnimation')
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
  background: #0d1117;
  justify-content: center;
  align-items: center;
}

.block-segment {
  width: 15px;
  height: 15px;
  opacity: 0;
  transition: opacity 0.3s, transform 0.3s ease-out;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(-50px);
}

.block-segment.active {
  opacity: 1;
  transform: translateY(0); /* Endposition */
  background-color: #30363d;
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
