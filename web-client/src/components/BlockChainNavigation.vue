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
      <block
        v-for="(block, index) in row.blocks"
        :key="index"
        :title="block.title"
        :description="block.description"
        :block-number="block.isPlaceholder ? null : block.blockNumber"
        @click="!block.isPlaceholder && selectBlock(block.blockNumber)"
        :ref="el => setBlockRef(el, block.blockNumber)"
        :class="['block', { placeholder: block.isPlaceholder }]"
      >
      </block>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, ComponentPublicInstance } from 'vue'
import Block from '@/components/Block.vue'
import { ROUTE_NAMES } from '@/enums'
import { router } from '@/router'

// Referenzen zu den Block-Elementen
const blockRefs = ref<HTMLElement[]>([])

const setBlockRef = (
  el: Element | ComponentPublicInstance | null,
  index: number | null, // Index kann jetzt auch null sein für Platzhalter
) => {
  if (el instanceof HTMLElement && index !== null) {
    blockRefs.value[index] = el
  }
}

const blocks = ref([
  {
    title: 'NFT',
    description: 'What are NFTs?',
    blockNumber: 1,
    isPlaceholder: false,
  },
  {
    title: 'Blockchain',
    description: 'Explore Blockchain',
    blockNumber: 2,
    isPlaceholder: false,
  },
  {
    title: 'MetaMask',
    description: 'What is MetaMask?',
    blockNumber: 3,
    isPlaceholder: false,
  },
  {
    title: 'Events',
    description: 'Upcoming Events',
    blockNumber: 4,
    isPlaceholder: false,
  },
  {
    title: 'NFT Game',
    description: 'Explore our NFT Game',
    blockNumber: 5,
    isPlaceholder: false,
  },
  {
    title: 'Contact',
    description: 'Get in touch with us',
    blockNumber: 6,
    isPlaceholder: false,
  },
  {
    title: 'About Us',
    description: 'Learn more about us',
    blockNumber: 7,
    isPlaceholder: false,
  },
])

const selectedBlockIndex = ref<number | null>(null)

const selectBlock = (index: number) => {
  selectedBlockIndex.value = index

  if (blocks.value[index - 1].title === 'NFT Game') {
    router.push({ name: ROUTE_NAMES.nfts })
  }
}

// Berechnung der Reihen basierend auf der Bildschirmbreite
const computeBlockRows = () => {
  const maxBlocksPerRow = Math.floor(window.innerWidth / 300) || 1
  const rows = []
  let startIndex = 0

  while (startIndex < blocks.value.length) {
    const endIndex = Math.min(startIndex + maxBlocksPerRow, blocks.value.length)
    const currentRowBlocks = blocks.value.slice(startIndex, endIndex)

    // Blocknummern zuweisen
    currentRowBlocks.forEach((block, i) => {
      block.blockNumber = startIndex + i + 1
    })

    // Wenn es eine gerade Reihe ist, umkehren
    if (rows.length % 2 === 1) {
      currentRowBlocks.reverse()
    }

    // Platzhalter-Blöcke hinzufügen, wenn die Reihe nicht voll ist
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
          // Gerade Reihe: Platzhalter am Anfang hinzufügen
          currentRowBlocks.unshift(placeholderBlock)
        } else {
          // Ungerade Reihe: Platzhalter am Ende hinzufügen
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

window.addEventListener('resize', () => {
  blockRows.value = computeBlockRows()
})
</script>

<style scoped>
.blockchain-navigation {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  width: 100%;
}

.block-row {
  display: flex;
  justify-content: center;
  width: 100%;
}

.block {
  width: 200px;
  height: 200px;
  margin-left: 35px;
  margin-right: 35px;
  margin-top: 60px;
  margin-bottom: -40px;
  background-color: #1c1c1e;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
}

.block.placeholder {
  visibility: hidden;
}
</style>
