import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBalance, fetchReward } from '../app/userSlice'
import { contractVestingBalance } from '../near/near'
import { prettyBalance } from '../utils/common'
import { useWalletSelector } from '../contexts/WalletSelectorProvider'
import contractMap from '../constant/contractMap'

const Reward = ({ vestingTime }) => {
  const { selector, accountId } = useWalletSelector()
  const { userReward } = useSelector((state) => state.user)
  const [isClaiming, setIsClaiming] = useState(false)
  const [remaining, setRemaining] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchReward())
    getRemainingBalance()
  }, [dispatch])

  const getRemainingBalance = async () => {
    const res = await contractVestingBalance()
    console.log(res)
    setRemaining(res)
  }

  const onPressClaim = async () => {
    if (isClaiming) {
      return
    }
    setIsClaiming(true)
    try {
      const wallet = await selector.wallet()

      const mapFound = contractMap.find((x) => x.accountId === accountId)
      const contractId = mapFound
        ? mapFound.contractId
        : `dev-1632741891435-4285231`

      await wallet.signAndSendTransaction({
        receiverId: contractId,
        actions: [
          {
            type: 'FunctionCall',
            params: {
              methodName: 'claim_vested',
              args: {},
              gas: '100000000000000',
              deposit: '1',
            },
          },
        ],
      })
      dispatch(fetchBalance())
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
    setIsClaiming(false)
  }

  const buttonText = () => {
    if (isClaiming) {
      return 'Processing...'
    }
    if (userReward === '0') {
      return 'Reward Claimed'
    }
    return 'Claim Reward'
  }

  return (
    <div className="mx-6">
      <div className="max-w-sm m-auto text-center">
        <h1 className="text-gray-300 text-2xl pt-16 mb-2 font-bold">
          My Reward
        </h1>
        <p className="text-gray-100 font-bold text-4xl">{userReward} Ⓟ</p>
        <button
          type="button"
          disabled={userReward === '0'}
          onClick={onPressClaim}
          className="outline-none mt-6 w-48 rounded-md bg-primary font-semibold border-2 p-2 text-gray-100 border-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {buttonText()}
        </button>
        <p className="text-gray-100 mt-4">
          Remaining: {prettyBalance(remaining, 18, 6)} Ⓟ
        </p>
        <div className="mt-16 flex justify-evenly">
          <div>
            <p className="text-gray-300">Start</p>
            <p className="font-bold text-gray-200">
              {vestingTime.start?.toLocaleDateString('en-US')}
            </p>
          </div>
          <div>
            <p className="text-gray-300">Cliff</p>
            <p className="font-bold text-gray-200">
              {vestingTime.cliff?.toLocaleDateString('en-US')}
            </p>
          </div>
          <div>
            <p className="text-gray-300">End</p>
            <p className="font-bold text-gray-200">
              {vestingTime.duration?.toLocaleDateString('en-US')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reward
