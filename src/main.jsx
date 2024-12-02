import './init'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App.jsx'
import reportWebVitals from './reportWebVitals.js'
import { initContract } from './near/near.js'
import store from './app/store.js'
import './index.css'
import WalletSelectorProvider from './contexts/WalletSelectorProvider.jsx'
import '@near-wallet-selector/modal-ui/styles.css'

window.nearInitPromise = initContract().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <WalletSelectorProvider>
          <App />
        </WalletSelectorProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )
})

reportWebVitals()
