import { createContext, useState, useEffect } from 'react'
import useAxiosFetch from '../hooks/useAxiosFetch'
import useFirestore from '../hooks/useFirestore'
import api from '../api/posts'

const DataContext = createContext({})

export const DataProvider = ({ children }) => {
  const [search, setSearch] = useState('')
  const [posts, setPosts] = useState([])
  const [searchResults, setSearchResults] = useState([])

  // custom hooks
  // const { data, isLoading, fetchError } = useAxiosFetch(
  //   api.defaults.baseURL + '/posts'
  // )
  const { data, isLoading, fetchError } = useFirestore('/posts')

  useEffect(() => {
    setPosts(data)
  }, [data])

  useEffect(() => {
    const searchPosts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    )
    setSearchResults(searchPosts.reverse())
  }, [posts, search])

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
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export default DataContext
