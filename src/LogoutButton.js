import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { DataContext } from './context/DataContext'
import { auth } from './api/firestore'

const LogoutButton = () => {
  const { currentUser, setCurrentUser } = useContext(DataContext)

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setCurrentUser(null)
    } catch (error) {
      console.log('Logout error:', error)
    }
  }

  return (
    <div>
      <span>Hello, {currentUser.displayName} </span>
      <button className='logout btn' onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default LogoutButton
