import './init'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import reportWebVitals from './reportWebVitals.js'
import { initContract } from './near/near.js'
import store from './app/store.js'
import './index.css'
import WalletSelectorProvider from './contexts/WalletSelectorProvider.jsx'
import '@near-wallet-selector/modal-ui/styles.css'

window.nearInitPromise = initContract().then(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'))

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <WalletSelectorProvider>
          <App />
        </WalletSelectorProvider>
      </Provider>
    </React.StrictMode>
  )
})

reportWebVitals()
