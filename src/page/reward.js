import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchReward } from "../app/userSlice"
import { contractClaimVested } from "../near/near"

const Reward = ({ vestingTime }) => {
  const { userReward } = useSelector((state) => state.user)
  const [isClaiming, setIsClaiming] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchReward())
  }, [dispatch])

  const onPressClaim = async () => {
    if (isClaiming) {
      return
    }
    setIsClaiming(true)
    try {
      await contractClaimVested()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
    setIsClaiming(false)
  }

  const buttonText = () => {
    if (isClaiming) {
      return "Processing..."
    }
    if (userReward === "0") {
      return "Reward Claimed"
    }
    return "Claim Reward"
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
          disabled={userReward === "0"}
          onClick={onPressClaim}
          className="outline-none mt-6 w-48 rounded-md bg-primary font-semibold border-2 p-2 text-gray-100 border-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {buttonText()}
        </button>
        <div className="mt-16">
          <p className="text-gray-300">
            {`Start ${vestingTime.start?.toLocaleDateString("en-US")}`}
          </p>
          <p className="text-gray-300">
            {`Cliff ${vestingTime.cliff?.toLocaleDateString("en-US")}`}
          </p>
          <p className="text-gray-300">
            {`Duration ${vestingTime.duration?.toLocaleDateString("en-US")}`}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Reward
