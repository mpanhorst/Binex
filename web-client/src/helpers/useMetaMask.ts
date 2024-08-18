import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ethers } from 'ethers'

export function useMetaMaskConnection() {
  const router = useRouter()

  onMounted(async () => {
    const ethereumProvider = window.ethereum
    if (ethereumProvider) {
      try {
        const provider = new ethers.providers.Web3Provider(ethereumProvider)
        const accounts = await provider.listAccounts()

        if (accounts.length === 0) {
          router.push({ name: 'Connect' })
        }
      } catch (error) {
        console.error('MetaMask Verbindung fehlgeschlagen', error)
        router.push({ name: 'Connect' })
      }
    } else {
      console.error('Kein Ethereum-Provider gefunden')
      router.push({ name: 'Connect' })
    }
  })
}
