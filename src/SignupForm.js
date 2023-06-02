import { useContext, useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from './api/firestore'
import { useHistory, Redirect } from 'react-router-dom'
import { DataContext } from './context/DataContext'

const SignUpForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')
  const [login, setLogin] = useState('')
  const history = useHistory()
  const { currentUser, setCurrentUser, loading } = useContext(DataContext)
  const [error, setError] = useState(null)

  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      if (password === repassword) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
        // Add any additional logic or redirection after successful sign-up
        await updateProfile(userCredential.user, { displayName: login })
        console.log('User signed up:', userCredential.user)
        setCurrentUser(userCredential.user)
        history.push('/')
      } else throw new Error("Passwords don't match!")
    } catch (error) {
      console.log('Sign-up error:', error)
      setError(error)
      // Handle sign-up error
    }
  }

  if (currentUser) {
    return <Redirect to='/' />
  }

  return loading ? (
    <div className='spinner'></div>
  ) : (
    <main className='SignUp'>
      {!currentUser && (
        <form className='signUpForm' onSubmit={handleSignUp}>
          <input
            placeholder='Enter email...'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder='Enter login...'
            type='text'
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
          <input
            placeholder='Enter password...'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            placeholder='Re-Enter password...'
            type='password'
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
            required
          />

          <div className='checkbox-container'>
            <input type='checkbox' id='chbox' required />
            <label htmlFor='chbox'>I'm not a robot</label>
          </div>
          <button type='submit' disabled={currentUser}>
            Register
          </button>
        </form>
      )}

      {error && (
        <p style={{ color: 'red', textAlign: 'center' }}>{error.message}</p>
      )}
    </main>
  )
}

export default SignUpForm
