import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'normalize.css'
import { GlobalStyles } from './styles/globalStyles'
import configureStore from './store'
import App from './App'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <GlobalStyles />
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)
