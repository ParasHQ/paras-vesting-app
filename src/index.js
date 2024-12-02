import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { initContract } from './near/near'
import store from './app/store'
import './index.css'
import WalletSelectorProvider from './contexts/WalletSelectorProvider.js'
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
