import { prettyBalance } from '../utils/common'

const Activity = ({ amount, memo }) => (
  <div className="my-4 break-all">
    <p className="text-gray-300">
      Received{' '}
      <span className="text-gray-100 font-semibold">
        {prettyBalance(amount, 18, 4)} Ⓟ
      </span>{' '}
      from <span className="text-gray-100 font-semibold">Paras</span>
    </p>
    <p className="text-gray-400 text-sm">{memo}</p>
  </div>
)

export default Activity
