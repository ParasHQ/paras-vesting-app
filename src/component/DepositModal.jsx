import Modal from './Modal.jsx'

const DepositModal = ({ onClickDeposit, onClickLogout }) => {
  return (
    <Modal>
      <div className="bg-white w-full p-4 rounded-md mx-4 md:m-auto max-w-sm">
        <p>
          In order to claim reward you need to deposit <b>0.0125 NEAR</b> for
          storage
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
            className="mt-4 font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default DepositModal
