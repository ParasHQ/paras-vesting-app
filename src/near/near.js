import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
import { parseNearAmount } from 'near-api-js/lib/utils/format'
import getConfigToken from './configToken'
import contractMap from '../constant/contractMap'

const nearConfigToken = getConfigToken(process.env.NODE_ENV || 'development')

export async function initContract() {
  const near = await connect(
    // eslint-disable-next-line prefer-object-spread
    Object.assign(
      { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
      nearConfigToken
    )
  )

  window.walletConnection = new WalletConnection(near)
  window.accountId = window.walletConnection.getAccountId()
  window.account = window.walletConnection.account()

  window.tokenContract = new Contract(
    window.account,
    process.env.REACT_APP_TOKEN_CONTRACT_ID,
    {
      viewMethods: [
        'ft_balance_of',
        'ft_metadata',
        'ft_total_supply',
        'storage_balance_of',
      ],
      changeMethods: ['storage_deposit', 'ft_transfer', 'ft_transfer_call'],
    }
  )

  const mapFound = contractMap.find((x) => x.accountId === window.accountId)
  const contractId = mapFound
    ? mapFound.contractId
    : `dev-1632741891435-4285231`

  window.vestingContract = new Contract(window.account, contractId, {
    viewMethods: [
      'recipient',
      'amount',
      'amount_claimed',
      'cliff',
      'start',
      'duration',
      'revocable',
      'releasable_amount',
      'calculate_amount_vested',
    ],
    changeMethods: ['claim_vested'],
  })
}

export function logout() {
  window.walletConnection.signOut()
  window.location.replace(window.location.origin + window.location.pathname)
}

export function login() {
  window.walletConnection.requestSignIn(
    process.env.REACT_APP_TOKEN_CONTRACT_ID,
    'Vesting Paras'
  )
}

export function isLoggedIn() {
  return window.walletConnection.isSignedIn()
}

export function getAccountId() {
  return window.accountId
}

export function contractGetBalance() {
  return window.tokenContract.ft_balance_of({ account_id: window.accountId })
}

export function contractGetMetadata() {
  return window.tokenContract.ft_metadata()
}

export function contractGetTotalSupply() {
  return window.tokenContract.ft_total_supply()
}

export function contractGetStorageBalance() {
  return window.tokenContract.storage_balance_of({
    account_id: window.accountId,
  })
}

export function contractGetAmountClaimed() {
  return window.vestingContract.get_amount_claimed()
}

export function contractGetAmountVested() {
  return window.vestingContract.calculate_amount_vested()
}

export function contractGetReleasableAmount() {
  return window.vestingContract.releasable_amount()
}

export function contractGetRecepient() {
  return window.vestingContract.recipient()
}

export async function contractVestingTime() {
  const cliff = parseInt(await window.vestingContract.cliff()) / 10 ** 6
  const start = parseInt(await window.vestingContract.start()) / 10 ** 6
  const duration = parseInt(await window.vestingContract.duration()) / 10 ** 6
  return {
    start: new Date(start),
    cliff: new Date(cliff),
    duration: new Date(start + duration),
  }
}

export async function contractClaimVested() {
  const mapFound = contractMap.find((x) => x.accountId === window.accountId)
  const contractId = mapFound
    ? mapFound.contractId
    : `dev-1632741891435-4285231`

  return await window.account.functionCall({
    contractId: contractId,
    methodName: 'claim_vested',
    args: {},
    gas: '300000000000000',
    attachedDeposit: '1',
  })
}

export function contractStorageDeposit() {
  return window.tokenContract.storage_deposit(
    { account_id: window.accountId },
    '100000000000000',
    parseNearAmount('0.0125')
  )
}
