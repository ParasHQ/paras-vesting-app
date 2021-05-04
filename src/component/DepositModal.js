import Modal from "./Modal"

const DepositModal = ({ onClickDeposit, onClickLogout }) => {
  return (
    <Modal>
      <div className="bg-white w-full p-4 rounded-md mx-4 md:m-auto max-w-md">
        <p>
          In order to claim reward you need to deposit 0.0125 NEAR for storage
        </p>
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={onClickDeposit}
            className="mt-4 bg-primary font-semibold rounded-md py-2 px-6 text-gray-100"
          >
            Deposit
          </button>
          <button
            type="button"
            onClick={onClickLogout}
            className="mt-4 border-b-2 border-black"
          >
            Logout
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default DepositModal
