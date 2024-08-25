<template>
  <div class="blockchain-navigation">
    <div
      v-for="(row, rowIndex) in blockRows"
      :key="'row-' + rowIndex"
      :class="[
        'block-row',
        rowIndex % 2 === 0 ? 'left-to-right' : 'right-to-left',
      ]"
    >
      <template v-for="(block, index) in row.blocks" :key="'block-' + index">
        <div
          v-if="
            index > 0 &&
            !block.isPlaceholder &&
            !row.blocks[index - 1].isPlaceholder &&
            !(
              (block.blockNumber === 314 &&
                row.blocks[index - 1].blockNumber === 315) ||
              (block.blockNumber === 315 &&
                row.blocks[index - 1].blockNumber === 314)
            )
          "
          class="horizontal-line pulsing-line"
        >
          <div class="pulse-horizontal"></div>
        </div>
        <div
          v-if="
            ((rowIndex % 4 === 1 || rowIndex % 4 === 3) &&
              row.blocks[index].blockNumber === 314 &&
              row.blocks[index - 1].blockNumber === 315) ||
            ((rowIndex % 4 === 0 || rowIndex % 4 === 2) &&
              row.blocks[index].blockNumber === 315 &&
              row.blocks[index - 1].blockNumber === 314)
          "
          :class="[
            isLineAnimated
              ? 'horizontal-line pulsing-line'
              : 'horizontal-line-animation',
            { 'horizontal-line-animation-visible': showHorizontallLine },
          ]"
        >
          <div v-if="isLineAnimated" class="pulse-horizontal"></div>
        </div>
        <block
          v-if="!block.isAnimated"
          :title="block.title"
          :description="block.description"
          :block-number="block.blockNumber"
          @click="!block.isPlaceholder && selectBlock(index)"
          :ref="el => setBlockRef(el, block.blockNumber)"
          :class="['block', { placeholder: block.isPlaceholder }]"
        ></block>

        <animated-block
          v-else
          class="animated"
          @restart-block-animation="restartBlockAnimation"
          @finish-block-animation="finishBlockAnimation"
        ></animated-block>

        <div class="vertical-line-container">
          <div
            v-if="
              rowIndex < blockRows.length - 1 &&
              !block.isPlaceholder &&
              ((rowIndex % 2 === 0 && index === row.blocks.length - 1) ||
                (rowIndex % 2 !== 0 && index === 0)) &&
              rowIndex !== 6
            "
            class="vertical-line pulsing-line"
          >
            <div class="pulse-vertical"></div>
          </div>
          <div
            v-if="rowIndex === 6"
            :class="[
              isLineAnimated
                ? 'vertical-line pulsing-line'
                : 'vertical-line-animation',
              { 'vertical-line-animation-visible': showHorizontallLine },
            ]"
          >
            <div v-if="isLineAnimated" class="pulse-vertical"></div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, ComponentPublicInstance, onMounted } from 'vue'
import Block from '@/components/Block.vue'
import AnimatedBlock from '@/components/AnimatedBlock.vue'
import { ROUTE_NAMES } from '@/enums'
import { router } from '@/router'

const blockRefs = ref<HTMLElement[]>([])
const showVerticalLine = ref(false)
const showHorizontallLine = ref(false)

// Reaktive Variable für den Zustand der animierten Linie
const isLineAnimated = ref(false)

const setBlockRef = (
  el: Element | ComponentPublicInstance | null,
  index: number,
) => {
  if (el instanceof HTMLElement) {
    blockRefs.value[index] = el
  }
}

const blocks = ref([
  {
    title: 'NFT',
    description: 'What are NFTs?',
    blockNumber: 308,
    isPlaceholder: false,
  },
  {
    title: 'Blockchain',
    description: 'Explore Blockchain',
    blockNumber: 309,
    isPlaceholder: false,
  },
  {
    title: 'MetaMask',
    description: 'What is MetaMask?',
    blockNumber: 310,
    isPlaceholder: false,
  },
  {
    title: 'Events',
    description: 'Upcoming Events',
    blockNumber: 311,
    isPlaceholder: false,
  },
  {
    title: 'NFT Game',
    description: 'Explore our NFT Game',
    blockNumber: 312,
    isPlaceholder: false,
  },
  {
    title: 'Contact',
    description: 'Get in touch with us',
    blockNumber: 313,
    isPlaceholder: false,
  },
  {
    title: 'About Us',
    description: 'Learn more about us',
    blockNumber: 314,
    isPlaceholder: false,
  },
  {
    title: 'Animated Block',
    description: '',
    blockNumber: 315,
    isPlaceholder: false,
    isAnimated: true,
  },
])

const selectedBlockIndex = ref<number | null>(null)

const selectBlock = (index: number) => {
  selectedBlockIndex.value = index
  if (blocks.value[index].title === 'NFT Game') {
    router.push({ name: ROUTE_NAMES.nfts })
  }
}

const computeBlockRows = () => {
  const maxBlocksPerRow = Math.floor(window.innerWidth / 300) || 1
  const rows = []
  let startIndex = 0

  while (startIndex < blocks.value.length) {
    const endIndex = Math.min(startIndex + maxBlocksPerRow, blocks.value.length)
    const currentRowBlocks = blocks.value.slice(startIndex, endIndex)

    if (rows.length % 2 === 1) {
      currentRowBlocks.reverse()
    }

    const placeholdersToAdd = maxBlocksPerRow - currentRowBlocks.length
    if (placeholdersToAdd > 0) {
      for (let i = 0; i < placeholdersToAdd; i++) {
        const placeholderBlock = {
          title: '',
          description: '',
          blockNumber: 100,
          isPlaceholder: true,
        }

        if (rows.length % 2 === 1) {
          currentRowBlocks.unshift(placeholderBlock)
        } else {
          currentRowBlocks.push(placeholderBlock)
        }
      }
    }

    rows.push({
      blocks: currentRowBlocks,
    })

    startIndex = endIndex
  }

  return rows
}

const blockRows = ref(computeBlockRows())

const restartBlockAnimation = () => {
  console.log('Restarting block animation...')
  isLineAnimated.value = false
  setTimeout(() => {
    showVerticalLine.value = true
    showHorizontallLine.value = true
  }, 7000)
}

const finishBlockAnimation = () => {
  console.log('Finishing block animation...')
  isLineAnimated.value = true
  showVerticalLine.value = false
  showHorizontallLine.value = false
}

onMounted(() => {
  setTimeout(() => {
    showVerticalLine.value = true
  }, 7000)
  setTimeout(() => {
    showHorizontallLine.value = true
  }, 7000)
})

window.addEventListener('resize', () => {
  blockRows.value = computeBlockRows()
})
</script>

<style scoped>
.blockchain-navigation {
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  padding-bottom: 20px;
  width: 100%;
  z-index: 0;
  margin: 0 auto;
}

.block-row {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 230px;
}

.horizontal-line {
  width: 80px;
  height: 5px;
  background-color: #00c2ff;
  margin: 135px -40px;
  position: relative;
  overflow: visible;
}

.vertical-line-container {
  display: flex;
  justify-content: center;
  width: 6px;
  position: relative;
}

.vertical-line {
  width: 6px;
  height: 120px;
  background-color: #00c2ff;
  margin-top: 200px;
  margin-left: -220px;
  position: relative;
  overflow: visible;
}

.pulse-horizontal {
  width: 30px;
  height: 4px;
  background-color: #00c2ff;
  border-radius: 50%;
  box-shadow: 0 0 10px 10px rgba(0, 194, 255, 0.8);
  position: absolute;
  z-index: 1;
}

.pulse-vertical {
  width: 4px;
  height: 30px;
  background-color: #00c2ff;
  border-radius: 50%;
  box-shadow: 0 0 15px 10px rgba(0, 194, 255, 0.8);
  position: absolute;
  z-index: 0;
}

.left-to-right .pulse-horizontal {
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  animation: pulse-horizontal 2s linear infinite;
}

.right-to-left .pulse-horizontal {
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  animation: pulse-horizontal-reverse 2s linear infinite;
}

.vertical-line .pulse-vertical {
  left: 50%;
  transform: translateX(-50%);
  top: 0; /* Startet am oberen Rand der Linie */
  animation: pulse-vertical 2s linear infinite;
}

@keyframes pulse-horizontal {
  0% {
    left: 0;
  }
  100% {
    left: 100%;
  }
}

@keyframes pulse-horizontal-reverse {
  0% {
    left: 100%;
  }
  100% {
    left: 0;
  }
}

@keyframes pulse-vertical {
  0% {
    top: 0;
  }
  100% {
    top: 100%;
  }
}

.horizontal-line-animation {
  width: 90px;
  height: 5px;
  background-color: #00c2ff;
  margin: 135px -40px;
  flex-shrink: 0;
  opacity: 0;
}

.vertical-line-animation {
  width: 6px;
  height: 120px;
  background-color: #00c2ff;
  margin-top: 200px;
  margin-left: -220px;
  flex-shrink: 0;
  opacity: 0;
}

.horizontal-line-animation-visible {
  opacity: 1;
  transition: opacity 6.3s ease-in;
}

.vertical-line-animation-visible {
  opacity: 1;
  transition: opacity 6.3s ease-in;
}

.block {
  width: 150px;
  height: 150px;
  margin-left: 35px;
  margin-right: 35px;
  margin-top: 60px;
  background-color: #30363d;
  border: 1px #30363d solid;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  z-index: 2;
}

.animated {
  width: 150px;
  height: 150px;
  margin-left: 35px;
  margin-right: 35px;
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  z-index: 0;
}

.block.placeholder {
  visibility: hidden;
}

.pulsing-line {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    stroke-dashoffset: 100;
  }
  100% {
    stroke-dashoffset: 0;
  }
}
</style>
