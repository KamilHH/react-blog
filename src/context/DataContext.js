import { createContext, useState, useEffect } from 'react'
import useFirestore from '../hooks/useFirestore'
import { auth } from '../api/firestore'

export const DataContext = createContext({})

const DataProvider = ({ children }) => {
  const [search, setSearch] = useState('')
  const [posts, setPosts] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  // custom hooks
  // const { data, isLoading, fetchError } = useAxiosFetch(
  //   api.defaults.baseURL + '/posts'
  // )

  const { data, isLoading, fetchError } = useFirestore('/posts')

  useEffect(() => {
    if (currentUser) setPosts(data)
  }, [currentUser, data])

  useEffect(() => {
    const searchPosts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    )
    setSearchResults(searchPosts.reverse())
  }, [posts, search])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    console.log('use effect runs')
    return () => unsubscribe()
  }, [])

  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        searchResults,
        fetchError,
        isLoading,
        posts,
        setPosts,
        currentUser,
        setCurrentUser,
        loading,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider
