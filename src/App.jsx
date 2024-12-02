import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Balance from './page/balance.jsx'
import Reward from './page/reward.jsx'
import Login from './page/login.jsx'
import Nav from './component/Nav.jsx'
import DepositModal from './component/DepositModal.jsx'
import NotRecipientModal from './component/NotRecipientModal.jsx'
import {
  getAccountId,
  isLoggedIn,
  contractGetStorageBalance,
  contractStorageDeposit,
  logout,
  contractVestingTime,
  contractGetRecepient,
} from './near/near'
import { fetchBalance, fetchReward, setUser } from './app/userSlice'

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
      <div className="min-h-screen">
        {isLoggedIn() && !deposited && (
          <DepositModal
            onClickDeposit={contractStorageDeposit}
            onClickLogout={logout}
          />
        )}
        <Switch>
          {isLoggedIn() ? (
            <>
              <Nav isLoggedIn={isLoggedIn()} />
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
      </div>
    </Router>
  )
}

export default App
