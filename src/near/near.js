import { connect, Contract, keyStores, WalletConnection } from "near-api-js"
import { parseNearAmount } from "near-api-js/lib/utils/format"
import getConfigVesting from "./configVesting"
import getConfigToken from "./configToken"

const nearConfigToken = getConfigToken(process.env.NODE_ENV || "development")
const nearConfigVesting = getConfigVesting(
  process.env.NODE_ENV || "development"
)

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
    nearConfigToken.contractName,
    {
      viewMethods: [
        "ft_balance_of",
        "ft_metadata",
        "ft_total_supply",
        "storage_balance_of",
      ],
      changeMethods: ["storage_deposit", "ft_transfer", "ft_transfer_call"],
    }
  )

  window.vestingContract = new Contract(
    window.account,
    nearConfigVesting.contractName,
    {
      viewMethods: [
        "recipient",
        "amount",
        "amount_claimed",
        "cliff",
        "start",
        "duration",
        "revocable",
        "releasable_amount",
        "calculate_amount_vested",
      ],
      changeMethods: ["claim_vested"],
    }
  )
}

export function logout() {
  window.walletConnection.signOut()
  window.location.replace(window.location.origin + window.location.pathname)
}

export function login() {
  window.walletConnection.requestSignIn(
    nearConfigVesting.contractName,
    "Vesting Paras"
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

export function contractClaimVested() {
  return window.vestingContract.claim_vested()
}

export function contractStorageDeposit() {
  return window.tokenContract.storage_deposit(
    { account_id: window.accountId },
    "100000000000000",
    parseNearAmount("0.0125")
  )
}
