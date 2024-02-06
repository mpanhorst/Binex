<template>
  <div class="nfts-page">
    <nfts-page-actions
      :owner="contractOwner"
      @save="loadNftData"
      @filter="filterNftList"
    />

    <template v-if="isLoaded">
      <template v-if="isLoadFailed">
        <error-message
          class="app__page-error-message"
          :message="$t('nfts-page.loading-error-msg')"
        />
      </template>
      <template v-else-if="filteredNftList?.length">
        <nfts-page-list :nfts="filteredNftList" />
      </template>
      <template v-else>
        <no-data-message
          class="app__page-no-data-message"
          :message="$t('nfts-page.no-data-msg')"
          :icon-name="$icons.noData"
        />
      </template>
    </template>
    <template v-else>
      <loader class="app__page-loader" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import NftsPageList from '@/pages/NftsPage/NftsPageList.vue'
import NftsPageActions from '@/pages/NftsPage/NftsPageActions.vue'
import { NoDataMessage, Loader, ErrorMessage } from '@/common'

import { useErc721Store } from '@/store'
import { ErrorHandler } from '@/helpers'
import { ref, computed } from 'vue'
import { NftItem } from '@/types'
import { utils } from 'ethers'
import { useWeb3ProvidersStore } from '@/store'

const { erc721 } = useErc721Store()
const { provider } = useWeb3ProvidersStore()

const nftList = ref<NftItem[]>([])
const search = ref('')
const contractOwner = ref('')
const isLoaded = ref(false)
const isLoadFailed = ref(false)

const filteredNftList = computed(() => {
  return search.value
    ? utils.isAddress(search.value)
      ? nftList.value.filter(item => item.owner === search.value)
      : []
    : nftList.value.filter(item => item.owner === provider.selectedAddress)
})

const loadNftData = async () => {
  isLoaded.value = false
  isLoadFailed.value = false
  try {
    contractOwner.value = (await erc721.getOwner()) || ''
    const totalSupply = await erc721.getTotalSupply()
    const nftListId = await Promise.all(
      new Array(totalSupply?.toNumber()).fill(null).map(async (_, index) => {
        const nft = await erc721.getTokenByIndex(index)
        return nft?.toString() || ''
      }),
    )
    const tokenOwners = await Promise.all(
      nftListId.map(async id => {
        return erc721.getOwnerOfNft(id)
      }),
    )
    const tokensURIs = await erc721.getTokensURIs(nftListId)
    nftList.value = tokensURIs.map((item, index) => ({
      link: item,
      title: nftListId[index],
      owner: tokenOwners[index],
    }))
  } catch (error) {
    ErrorHandler.process(error)
    isLoadFailed.value = true
  }
  isLoaded.value = true
}

const filterNftList = async (address: string) => {
  search.value = address
  loadNftData()
}

loadNftData()
</script>

<style lang="scss" scoped>
.nfts-page {
  display: flex;
  flex-direction: column;
  gap: toRem(30);
  width: 100%;
}
</style>
