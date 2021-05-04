import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Balance = () => {
  const { userBalance } = useSelector((state) => state.user)

  return (
    <div className="mx-6">
      <div className="max-w-sm m-auto text-center">
        <h1 className="text-gray-300 text-2xl pt-16 mb-2 font-bold">
          My Balance
        </h1>
        <p className="text-gray-100 font-bold text-4xl">{userBalance} Ⓟ</p>
        <div className="flex justify-center">
          <Link to="/reward">
            <p className="text-gray-300 mt-24 border-b-2 border-gray-300">
              See rewards
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Balance
