import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import App from './Components/App';
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from './Styles/Styles'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import allReducers from './Reducers'
import thunk from 'redux-thunk'

const store = createStore(allReducers, applyMiddleware(thunk))

ReactDOM.render(
  // <React.StrictMode >
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
