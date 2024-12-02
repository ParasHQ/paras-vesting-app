import { setupWalletSelector } from '@near-wallet-selector/core/index.js'
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { REACT_APP_TOKEN_CONTRACT_ID } from '../constant/contract'
import { setupModal } from '@near-wallet-selector/modal-ui'
import { distinctUntilChanged, map } from 'rxjs'

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
      modules: [setupMyNearWallet()],
    })
    const _modal = setupModal(_selector, {
      contractId: REACT_APP_TOKEN_CONTRACT_ID,
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
      alert('Failed to initialise wallet selector')
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

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <WalletSelectorContext.Provider
      value={{ selector, modal, accounts, accountId }}
    >
      {children}
    </WalletSelectorContext.Provider>
  )
}

export const useWalletSelector = () => useContext(WalletSelectorContext)

export default WalletSelectorProvider
