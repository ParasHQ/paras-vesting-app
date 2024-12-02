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
    return <div className="text-white">Loading...</div>
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
