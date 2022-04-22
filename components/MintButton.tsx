import { ethers } from 'ethers'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { EthersContext } from '../contexts/EthersContextProvider'
import { TOKEN_ADDR, TOKEN_ABI } from '../lib/constants'
import Spinner from './Spinner'

const MintButton: React.FC = () => {
  const { signer } = useContext(EthersContext)
  const [loading, setLoading] = useState(false)

  const mint = async () => {
    setLoading(true)
    const tokenContract = new ethers.Contract(TOKEN_ADDR, TOKEN_ABI, signer)
    try {
      const tx = await tokenContract.mintDigDig()
      await tx.wait()
      setLoading(false)
      toast.success('Successfully minted $DIGDIG tokens!')
    } catch (e) {
      toast.error('Transaction failed, please try again.')
      setLoading(false)
      console.error(e)
    }
  }

  return (
    <button
      onClick={mint}
      className="text-white transition-colors hover:bg-red-600 px-16 uppercase font-bold py-3 rounded-2xl bg-red-500"
    >
      {loading ? (
        <div className="flex items-center">
          Minting <Spinner />
        </div>
      ) : (
        'Mint'
      )}
    </button>
  )
}

export default MintButton
