import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { DataContext } from './context/DataContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useContext(DataContext)

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  )
}

export default PrivateRoute
