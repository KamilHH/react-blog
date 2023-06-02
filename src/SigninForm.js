import { useContext, useState, useEffect } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './api/firestore'
import { useHistory, Redirect } from 'react-router-dom'
import { DataContext } from './context/DataContext'
import { Link } from 'react-router-dom'

const SignInForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const { currentUser, setCurrentUser, loading } = useContext(DataContext)
  const [error, setError] = useState(null)

  const handleSignIn = async (e) => {
    e.preventDefault()

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user
      console.log('User signed in:', user.email)
      setCurrentUser(userCredential.user)
      // Add any additional logic or redirection after successful sign-in
      history.push('/')
    } catch (error) {
      console.log('Sign-in error:', error)
      // Handle sign-in error
      setError(error)
    }
  }

  if (currentUser) {
    return <Redirect to='/' />
  }

  return (
    <main className='SignIn'>
      {loading ? (
        <div className='spinner'></div>
      ) : (
        !currentUser && (
          <form className='signUpForm' onSubmit={handleSignIn}>
            <input
              placeholder='Enter email...'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              placeholder='Enter password...'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type='submit' disabled={currentUser}>
              Log In
            </button>
            <p style={{ marginTop: '0.5rem' }}>
              Don't have an account? <Link to='/register'>Register</Link>
            </p>
          </form>
        )
      )}

      {error && (
        <p style={{ color: 'red', textAlign: 'center' }}>{error.message}</p>
      )}
    </main>
  )
}

export default SignInForm
