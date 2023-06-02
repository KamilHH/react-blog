import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from './context/DataContext'
import LogoutButton from './LogoutButton'

const Header = ({ title }) => {
  const { currentUser } = useContext(DataContext)

  return (
    <header className='Header'>
      <h1>{title}</h1>
      <section className='container'>
        {!currentUser && (
          <ul>
            <li>
              <Link to='/register'>Register</Link>
            </li>
            <li>
              <Link to='/login'>Log In</Link>
            </li>
          </ul>
        )}
        {currentUser && <LogoutButton />}
      </section>
    </header>
  )
}

export default Header
