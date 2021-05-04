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
import {
  getAccountId,
  isLoggedIn,
  contractGetStorageBalance,
  contractStorageDeposit,
  logout,
} from "./near/near"
import { fetchBalance, fetchReward, setUser } from "./app/userSlice"

const App = () => {
  const [deposited, setDeposited] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(setUser(getAccountId()))
      dispatch(fetchBalance())
      dispatch(fetchReward())
      setDeposited((await contractGetStorageBalance()) !== null)
    }

    if (isLoggedIn()) {
      fetchUser()
    } else {
      dispatch(setUser(null))
    }
  }, [dispatch])

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
              <Reward />
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
