import Header from './Header'
import Nav from './Nav'
import About from './About'
import Missing from './Missing'
import Footer from './Footer'
import Home from './Home'
import PostPage from './SinglePostPage'
import CreatePost from './CreatePost'
import EditPost from './EditPost'
import SignUpForm from './SignupForm'
import SignInForm from './SigninForm'
import { Route, Switch } from 'react-router-dom'
import DataProvider from './context/DataContext'
import PrivateRoute from './PrivateRoute'

const App = () => {
  return (
    <div className='App'>
      <DataProvider>
        <Header title='ReactJS Blog' />
        <Nav />
        <Switch>
          <PrivateRoute exact path='/' component={Home} />
          <Route path='/register' component={SignUpForm} />
          <Route path='/login' component={SignInForm} />
          <PrivateRoute path='/create' component={CreatePost} />
          <PrivateRoute path='/edit/:id' component={EditPost} />
          <PrivateRoute path='/post/:id' component={PostPage} />
          <Route path='/about' component={About} />
          <Route path='*' component={Missing} />
        </Switch>
      </DataProvider>
      <Footer />
    </div>
  )
}

export default App
