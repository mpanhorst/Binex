<template>
  <div class="blockchain-navigation">
    <block
      v-for="(block, index) in blocks"
      :key="index"
      :title="block.title"
      :description="block.description"
      :block-number="index + 1"
      @click="selectBlock(index)"
      :ref="el => setBlockRef(el, index)"
      class="block"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, ComponentPublicInstance } from 'vue'
import Block from '@/components/Block.vue'
import { useRouter } from 'vue-router'
import { ROUTE_NAMES } from '@/enums'
import { router } from '@/router'

// Referenzen zu den Block-Elementen
const blockRefs = ref<HTMLElement[]>([])

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
    title: 'About Us',
    description: 'Learn more about us',
  },
  {
    title: 'Blockchain',
    description: 'Explore Blockchain',
  },
  {
    title: 'Events',
    description: 'Upcoming Events',
  },
  {
    title: 'Contact',
    description: 'Get in touch with us',
  },
  {
    title: 'NFT Game',
    description: 'Explore our NFT Game',
  },
])

const selectedBlockIndex = ref<number | null>(null)

const selectBlock = (index: number) => {
  selectedBlockIndex.value = index

  if (blocks.value[index].title === 'NFT Game') {
    router.push({ name: ROUTE_NAMES.nfts })
  }
}
</script>

<style scoped>
.blockchain-navigation {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
}

.block {
  width: 250px;
  height: 250px;
  margin: 50px;
  background-color: #1c1c1e;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
