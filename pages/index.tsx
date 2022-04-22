import { ethers } from 'ethers'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useContext, useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Web3Modal from 'web3modal'
import MintButton from '../components/MintButton'
import { EthersContext } from '../contexts/EthersContextProvider'

const Home: NextPage = () => {
  const { walletConnected } = useContext(EthersContext)

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <img
        src="dig.webp"
        alt="Elmo (Digital) on the moon"
        width={200}
        className="rounded-full"
      />
      <div className="my-8">
        <h1 className="text-7xl font-bold">Mint $DIGDIG</h1>
        <span className="text-2xl">
          DigDig (pronounced didge-didge) The most annoying token on the
          blockchain
        </span>
      </div>
      {walletConnected && <MintButton />}
    </div>
  )
}

export default Home
