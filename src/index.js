import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom/cjs/react-router-dom.min'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.Fragment>
    <Router>
      <Route path='/' component={App} />
    </Router>
  </React.Fragment>
)
