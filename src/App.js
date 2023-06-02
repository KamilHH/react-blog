import Header from './Header'
import Nav from './Nav'
import About from './About'
import Missing from './Missing'
import Footer from './Footer'
import Home from './Home'
import PostPage from './SinglePostPage'
import CreatePost from './CreatePost'
import EditPost from './EditPost'
import { Route, Switch } from 'react-router-dom'
import { DataProvider } from './context/DataContext'

const App = () => {
  return (
    <div className='App'>
      <Header title='ReactJS Blog' />
      <DataProvider>
        <Nav />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/create' component={CreatePost} />
          <Route path='/edit/:id' component={EditPost} />
          <Route path='/post/:id' component={PostPage} />
          <Route path='/about' component={About} />
          <Route path='*' component={Missing} />
        </Switch>
        <Footer />
      </DataProvider>
    </div>
  )
}

export default App
