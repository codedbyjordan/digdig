import { ethers } from 'ethers'
import React, { createContext, useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Web3Modal from 'web3modal'

interface EthersContextType {
  walletConnected: boolean
  provider: any
  signer: any
}

export const EthersContext = createContext<any>(null)

const EthersContextProvider: React.FC = ({ children }) => {
  const [walletConnected, setWalletConnected] = useState(false)
  const [provider, setProvider] = useState<any>(null)
  const [signer, setSigner] = useState<any>(null)
  const web3ModalRef = useRef<Web3Modal>()

  const connect = async () => {
    const instance = await web3ModalRef?.current?.connect()
    const provider = new ethers.providers.Web3Provider(instance)
    const signer = provider.getSigner()
    const { chainId } = await provider.getNetwork()
    if (chainId !== 3) {
      toast.error("Please change your wallet's network to Ropsten", {
        position: 'bottom-center',
      })
    } else {
      setProvider(provider)
      setSigner(signer)
      setWalletConnected(true)
    }
  }

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: 'ropsten',
        providerOptions: {},
        disableInjectedProvider: false,
      })
      connect()
    }
  }, [walletConnected])

  return (
    <EthersContext.Provider value={{ walletConnected, provider, signer }}>
      <Toaster />
      {children}
    </EthersContext.Provider>
  )
}

export default EthersContextProvider
