import { setupWalletSelector } from '@near-wallet-selector/core'
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { setupModal } from '@near-wallet-selector/modal-ui'
import { distinctUntilChanged, map } from 'rxjs'
import { VITE_TOKEN_CONTRACT_ID } from '../constant/contract'
import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet'
import { setupSender } from '@near-wallet-selector/sender'
import { setupHereWallet } from '@near-wallet-selector/here-wallet'
import { setupNightly } from '@near-wallet-selector/nightly'

const WalletSelectorContext = createContext(null)

const WalletSelectorProvider = ({ children }) => {
  const [selector, setSelector] = useState(null)
  const [modal, setModal] = useState(null)
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)

  const init = useCallback(async () => {
    const _selector = await setupWalletSelector({
      network: 'mainnet',
      debug: true,
      modules: [
        setupMyNearWallet(),
        setupMeteorWallet(),
        setupSender(),
        setupHereWallet(),
        setupNightly(),
      ],
      opts: {
        network: {
          nodeUrls: ['https://rpc.mainnet.near.org'],
        },
      },
    })
    const _modal = setupModal(_selector, {
      contractId: VITE_TOKEN_CONTRACT_ID,
    })
    const state = _selector.store.getState()
    setAccounts(state.accounts)
    setSelector(_selector)
    setModal(_modal)
    setLoading(false)
  }, [])

  useEffect(() => {
    init().catch((err) => {
      console.error(err)
    })
  }, [init])

  useEffect(() => {
    if (!selector) {
      return
    }

    const subscription = selector.store.observable
      .pipe(
        map((state) => state.accounts),
        distinctUntilChanged()
      )
      .subscribe((nextAccounts) => {
        console.log('Accounts Update', nextAccounts)

        setAccounts(nextAccounts)
      })

    const onHideSubscription = modal.on('onHide', ({ hideReason }) => {
      console.log(`The reason for hiding the modal ${hideReason}`)
    })

    return () => {
      subscription.unsubscribe()
      onHideSubscription.remove()
    }
  }, [selector, modal])

  const accountId =
    accounts.find((account) => account.active)?.accountId || null

  const signIn = async () => {
    modal?.show()
  }

  const signOut = async () => {
    const wallet = await selector.wallet()
    await wallet.signOut()
  }

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center animate-pulse">
        <svg
          width="240"
          height="200"
          viewBox="0 0 384 318"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M263 189.17C256.547 200.683 243.053 206.44 222.52 206.44H180.45L187.85 249.7H144.63L120.47 68.47L222.56 86.59C226.9 87.73 230.92 88.65 234.62 89.49C248.53 92.67 258 94.82 263 104C269.44 115.513 272.66 129.69 272.66 146.53C272.66 163.37 269.44 177.583 263 189.17Z"
            fill="white"
          />
          <path
            d="M219.53 117.15C217.53 116.7 215.36 116.21 213.02 115.6L164.23 105.92L176.23 178.41L187.89 179.62H213C224.093 179.62 231.377 176.543 234.85 170.39C238.323 164.237 240.06 156.643 240.06 147.61C240.06 138.617 238.323 131.047 234.85 124.9C232.12 120 227 118.85 219.53 117.15Z"
            fill="#0000BA"
          />
          <path
            d="M381 238.48L270.38 41.48C269.189 39.374 267.53 37.57 265.53 36.2072C263.531 34.8444 261.246 33.9592 258.85 33.62L17.88 0.159976C15.1655 -0.216436 12.3998 0.124241 9.85774 1.14814C7.31572 2.17203 5.08599 3.84348 3.39024 5.99629C1.69448 8.1491 0.591765 10.7083 0.191732 13.4194C-0.208301 16.1305 0.108281 18.8991 1.11 21.45L113.35 307.11C114.511 310.053 116.53 312.58 119.143 314.363C121.757 316.145 124.846 317.103 128.01 317.11C129.181 317.11 130.349 316.976 131.49 316.71L370.83 261.51C373.209 260.964 375.429 259.87 377.311 258.316C379.194 256.762 380.688 254.79 381.676 252.557C382.663 250.324 383.116 247.892 382.999 245.454C382.881 243.015 382.197 240.638 381 238.51V238.48ZM263 189.17C256.547 200.683 243.053 206.44 222.52 206.44H180.45L187.85 249.7H144.63L120.47 68.47L222.56 86.59C226.9 87.73 230.92 88.65 234.62 89.49C248.53 92.67 258 94.82 263 104C269.44 115.513 272.66 129.69 272.66 146.53C272.66 163.37 269.44 177.583 263 189.17Z"
            fill="#0000BA"
          />
        </svg>
      </div>
    )
  }

  return (
    <WalletSelectorContext.Provider
      value={{ selector, modal, accounts, accountId, signIn, signOut }}
    >
      {children}
    </WalletSelectorContext.Provider>
  )
}

export const useWalletSelector = () => useContext(WalletSelectorContext)

export default WalletSelectorProvider
