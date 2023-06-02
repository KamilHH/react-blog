import Feed from './Feed'
import { useContext } from 'react'
import { DataContext } from './context/DataContext'

const Home = () => {
  const { searchResults, fetchError, isLoading } = useContext(DataContext)
  return (
    <main className='Home'>
      {isLoading && <p>Loading data...</p>}
      {!isLoading && fetchError && (
        <p className='fetchErrorMsg'>{fetchError}</p>
      )}
      {!isLoading &&
        !fetchError &&
        (searchResults.length ? (
          <Feed posts={searchResults} />
        ) : (
          <p>No posts to display</p>
        ))}
    </main>
  )
}

export default Home
