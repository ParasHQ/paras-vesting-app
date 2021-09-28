import Modal from './Modal'

const NotRecipientModal = ({ onClickLogout }) => {
  return (
    <Modal>
      <div className="bg-white w-full p-4 rounded-md mx-4 md:m-auto max-w-sm">
        <div>You are not recipient of paras vesting token</div>
        <button
          type="button"
          onClick={onClickLogout}
          className="mt-4 bg-primary font-semibold rounded-md py-2 px-6 text-gray-100"
        >
          Logout
        </button>
      </div>
    </Modal>
  )
}

export default NotRecipientModal
