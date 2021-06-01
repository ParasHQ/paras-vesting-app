import { useEffect, useState } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import { useDispatch } from "react-redux"

import Balance from "./page/balance"
import Reward from "./page/reward"
import Login from "./page/login"
import Nav from "./component/Nav"
import Footer from "./component/Footer"
import DepositModal from "./component/DepositModal"
import NotRecipientModal from "./component/NotRecipientModal"
import {
  getAccountId,
  isLoggedIn,
  contractGetStorageBalance,
  contractStorageDeposit,
  logout,
  contractVestingTime,
  contractGetRecepient,
} from "./near/near"
import { fetchBalance, fetchReward, setUser } from "./app/userSlice"

const App = () => {
  const [deposited, setDeposited] = useState(true)
  const [vestingTime, setVestingTime] = useState({})
  const [isRecipient, setIsRecipient] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUser = async () => {
      const isAccRecipient = (await contractGetRecepient()) === getAccountId()
      if (isAccRecipient) {
        dispatch(setUser(getAccountId()))
        dispatch(fetchBalance())
        dispatch(fetchReward())
        setVestingTime(await contractVestingTime())
        setDeposited((await contractGetStorageBalance()) !== null)
      }
      setIsRecipient(isAccRecipient)
    }

    if (isLoggedIn()) {
      fetchUser()
    } else {
      dispatch(setUser(null))
    }
  }, [dispatch])

  if (isLoggedIn() && !isRecipient) {
    return <NotRecipientModal onClickLogout={logout} />
  }

  return (
    <Router>
      {isLoggedIn() && !deposited && (
        <DepositModal
          onClickDeposit={contractStorageDeposit}
          onClickLogout={logout}
        />
      )}
      <Nav isLoggedIn={isLoggedIn()} />
      <Switch>
        {isLoggedIn() ? (
          <>
            <Route exact path="/balance">
              <Balance />
            </Route>
            <Route exact path="/reward">
              <Reward vestingTime={vestingTime} />
            </Route>
            <Route exact path="/">
              <Redirect to="/balance" />
            </Route>
          </>
        ) : (
          <>
            <Route exact path="/">
              <Login />
            </Route>
            <Redirect to="/" />
          </>
        )}
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
